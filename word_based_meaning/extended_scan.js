/*SCRIPT: extended_scan.js
PURPOSE: This script is designed to call a series of activites to compile a composite score across all driversrequired API sequence calls to Merriam Webster's dictionary service to build a 2 level graph DB based on the configured core human driver framework (default listed below is based on Josh Kaufman's theory
*/

/*MANDATORY CONFIG*/
var coredrivers = ["acquire","defend","learn","experience","bond"];

var neo4j_user = 'INSERT USER';
var neo4j_password = 'INSERT PASSWORD';

var apikey = 'INSERT FAROO API KEY STRING'; //FAROO KEY AVAILABE FROM FAROO.com

var min_relevancy = 5; //MAY NEED TO BE ADJUSTED, recommended range (3-7)

/*IMPORTANT!!!!! ENTER DESIRED TARGET INFORMATION HERE!*/
var brandwords = ["apple,iPhone"];
var brandurl = ["http://en.wikipedia.org/wiki/AppleInc"];
////////////


/********************/


/*Setup*/
var newsurl = "http://www.faroo.com/api?length=10&l=en&src=web&f=json";
var weburl = "http://www.faroo.com/api?length=10&l=en&src=news&f=json"

var request = require('request');
var async = require('async');
var neo4j = require('neo4j');
var htmlToText = require('html-to-text');

var db = new neo4j.GraphDatabase('http://'+neo4j_user+':'+neo4j_password+'@localhost:7474');


var uselesswords = ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "except", "few", "fifteen", "fifty", "fill", "find", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the","this","com","buy"];



var finalscoring =[];

var wordsdb = [];
 
/**
* Entry into async-based series call, which waits for each activity to callback before proceeding
*
** @param {Array} brandwords - array of brand words you want to search the internet for
* @return {Array} - returns an array of the key values
*/
async.eachSeries(brandwords, function(brandword, callback_outer) {

	async.series([
	function(callback_middle){
		insertContentFromPages(brandurl,callback_middle);
	},
	function(callback_middle){
		insertWordTree(brandword,3,"news",true,callback_middle);
	},
	function(callback_middle){
		insertWordTree(brandword,3,"web",true,callback_middle);
	}],function(err,results){
		callback_outer();
	});
		
},function(err){

	var wordsuniques = array_counter(wordsdb);

	//console.log(wordsuniques);	
	
	var testwords = arrayKeys(wordsuniques);
		console.log('hello');
	//console.log(testwords)
	async.eachSeries(testwords, function(testword, cb) {
	var querystring = 'MATCH (a:CoreDriver) WHERE a.name = "'+testword+'" return a.name as coredriver,100 as score';
		db.cypher(querystring
			, function (err, result) {
		   		 //console.log("dude");
		   		 //console.log(err);
		   		
			   	if(result.length && result.length>0){
				   	console.log(querystring)
				   	console.log(result); // delivers an array of query results
			   	}
				var querystring = "MATCH p = (n:CoreDriverChild)-[:SYNONYM*1..2]->(x:CoreDriver) WHERE n.name IN ['"+testword+"'] RETURN x.name as coredriver, sum(reduce(totalscore=0, n in RELATIONSHIPS(p)| totalscore+n.value)) as score";
						
			   		 	
	    			//console.log(querystring);
	    		db.cypher(querystring
	    		, function (err, result) {
					
					if(result.length){
				   		//console.log(querystring)
				   		//console.log(result); // delivers an array of query results
				   		for(i=0;i<result.length;i++)
				   		{
					   		if( finalscoring[result[i].coredriver] === undefined) {
					   			finalscoring[result[i].coredriver] = result[i].score*wordsuniques[testword];
					   		}else{
						   		finalscoring[result[i].coredriver] += result[i].score*wordsuniques[testword];
					   		}
				   		}
			   		}

			  		//console.log(result.columns); // delivers an array of names of objects getting returned
			  		cb(null);
		    });

	
										  		//console.log(result.columns); // delivers an array of names of objects getting returned
	
			
			});
			
	},function(err){
		console.log("FINAL BRAND SCORE:");
		
		var keys = arrayKeys(finalscoring);
		keys = keys.sort();
			
		var total = 0;
	
		for(i=0;i<keys.length;i++)
		{
			total += finalscoring[keys[i]];
		}
		var finaldisplayraw = [];
		var finaldisplayperct = [];
		for(i=0;i<keys.length;i++)
		{
			finaldisplayraw[keys[i]] = finalscoring[keys[i]];
			finaldisplayperct[keys[i]] = Math.round((finalscoring[keys[i]]/total)*100);
		}
		console.log(finaldisplayraw);
		console.log(finaldisplayperct);
	}
	);
	
	
}
);


/**
* helper function to get an arrays keys in an array 
*
* @method arrayKeys
* @param {Array} input - array you want the keys of
* @return {Array} - returns an array of the key values
*/
function arrayKeys(input) {
    var output = new Array();
    var counter = 0;
    for (i in input) {
        output[counter++] = i;
    } 
    return output; 
}


/**
* Scrape from webpages in a loop upon array brandurl
*	insert results into worddb for scoring 
*
* @method insertContentFromPages
* @param {String} brandurl - URL you want to scrape
* @param {Object} callback_middle - internal callback handler
*/
function insertContentFromPages(brandurl,callback_middle){
	var urlcount=0;
	async.whilst(function () { return urlcount < brandurl.length; },
	 function(callback){
		 request(brandurl[urlcount++], function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			  var text = htmlToText.fromString(body, {
    wordwrap: 130
});
			 addscrapetodb(text,callback);
		  }
		  });

	 },
	 function (err) {
        // finished
        console.log(wordsdb);
    	callback_middle();
		}
	 );


}


/**
* helper function to scrape from FAROO API in a loop upon array brandword for either news or web searches
	insert results into worddb for scoring 
*
* @method insertWordTree
* @param {String} brandword - word to search for 
* @param {Integer >0} numpages - number of pages of results to retrieve
* @param {enum/String} news_or_web - enum indicator to method for news or web results
* @param {Boolean} isParent - used in recursive calls
* @param {function} callback_middle - callback method to call upon completion
*/
function insertWordTree(brandword,numpages,news_or_web,isParent,callback_middle){
	
	//console.log(fullapiurl);

var page=0;
var pagesize=10;
var firstpage=1;

async.whilst(
	function () { return page < numpages; },
	function(callback){ //make news api call
	  
	  var pagenum = firstpage + (pagesize*page);
	  if(news_or_web=="news"){
	  	var fullapiurl = newsurl+"&start="+pagenum+"&q="+encodeURIComponent(brandword)+apikey;
	  }else{
		var fullapiurl = weburl+"&start="+pagenum+"&q="+encodeURIComponent(brandword)+apikey;
	  }
	  page++;
	  console.log(fullapiurl);
	  request(fullapiurl, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		  addtodb(body,callback);
	  }
	  });
	 },
	 function (err) {
        // finished
        console.log(wordsdb.length);
    	callback_middle();
     }
);


}

/**
* Add words to temporary word aggregation arrays with some filtering (for scraper)
*
* @method addscrapetodb
* @param {String} string - word to add to the existing word listing
* @param {Object} callback - internal callback handler
*/	
function addscrapetodb(string, callback){
	
		 newwords = string.match(/(?!the\b)\b(?!and\b)\b\w+/g);
		 oldwords = wordsdb;
		 wordsdb = oldwords.concat( newwords);

	 callback(null);
}

/**
* Add words to temporary word aggregation arrays with some filtering (for FAROO searchs)
*
* @method addtodb
* @param {JSON String} apiresult_string - word results from FAROO to add to the existing word listing
* @param {Object} callback - internal callback handler
*/	
function addtodb(apiresult_string, callback){
	apiresult = JSON.parse(apiresult_string);
	 for(i=0;i<apiresult.results.length;i++){
		 newwords = apiresult.results[i].title.match(/(?!the\b)\b(?!and\b)\b\w+/g);
		 oldwords = wordsdb;
		 wordsdb = oldwords.concat( newwords);
		 newwords = apiresult.results[i].kwic.match(/(?!the\b)\b(?!and\b)\b\w+/g);
		 oldwords = wordsdb;
		 wordsdb = oldwords.concat( newwords);
	 }
	 setTimeout(callback, 1000);
	 //callback(null);
}

/**
* Helper function used by getScores that dedups records prior to counting
*
* @method array_counter
* @param {Array} a - array of all words prior to de-duping
* @param {Array} counts - returns array with word frequency information
*/	
function array_counter(a) {
    var counts = [];
    var localcounts = [];
    
    for(var i = 0; i <= a.length; i++) {
	    var word = a[i];
	    
	    if(word != undefined && word.length>2 && uselesswords.indexOf(word.toLowerCase())===-1 && brandwords.indexOf(word.toLowerCase())===-1){
	        word = word.toLowerCase();
	        if( localcounts[word] === undefined) {
	            localcounts[word] = 1;
	        } else {
	            localcounts[word]++;
	            if(localcounts[word]>=min_relevancy){
		            console.log(word+":"+localcounts[word]);
		            counts[word] = localcounts[word];
	            }
	        }
		}
		
    }
    console.log('done with array cleaning');
    //console.log(counts);
    return counts;
}