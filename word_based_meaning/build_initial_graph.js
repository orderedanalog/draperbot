/*SCRIPT: build_initial_graph.js
PURPOSE: This script is designed to recursively call the required API sequence calls to Merriam Webster's dictionary service to build a 2 level graph DB based on the configured core human driver framework (default listed below is based on Josh Kaufman's theory
*/

/*MANDATORY CONFIG*/
var merriam_webster_api_key = 'INSERT MERRIAM WEBSTER API KEY STRING';
var neo4j_user = 'INSERT USER';
var neo4j_password = 'INSERT PASSWORD';

var coredrivers = ["acquire","defend","learn","experience","bond"];
/*----------------*/
var apiurl = "http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/";



var request = require('request');
var neo4j = require('neo4j');
 var util = require('util');
 var async = require('async');
 var inspect = require('eyes').inspector({maxLength: false});
var db = new neo4j.GraphDatabase('http://'+neo4j_user+':'+neo4j_password+'@localhost:7474');
var html_strip = require('htmlstrip-native');
var apikey = "?key="+merriam_webster_api_key;

var uselesswords = ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "except", "few", "fifteen", "fifty", "fill", "find", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];

//TODO INSERT USER PROMPT (with prompt library)

//THEN WIPE GRAPH DB PRIOR TO START OF SEQUENCE





async.eachSeries(coredrivers, function(item, callback_outer) {

	insertWordTree(item,true,callback_outer);
		
});



function insertWordTree(driver_or_syn,isParent,callback_outer){
	if(driver_or_syn.indexOf(" ")>0){
		driver_or_syn = driver_or_syn.split(" ")[0];
	}
	var fullapiurl = apiurl+driver_or_syn+apikey;
console.log(fullapiurl);
async.waterfall([
  function(callback){ //make api call
	  request(fullapiurl, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		  callback(null,body);
	  }
	  });
	  },
  function(apiresult,callback){ //pull important data
	  var parseString = require('xml2js').parseString;
	  parseString(apiresult, function (err, result) {
	  	//console.log(inspect(result, false, null));
	  	array = [];
	  	if(result.entry_list.entry){
	  	for (var i = 0; i < result.entry_list.entry.length; i++) {
			if(result.entry_list.entry[i].sens){
			for (var j = 0; j < result.entry_list.entry[i].sens.length; j++) {	
				console.log(inspect(result.entry_list.entry[i].sens[j].syn));
				if(result.entry_list.entry[i].sens[j].syn[0]._){
					var synonyms_string = JSON.stringify(result.entry_list.entry[i].sens[j].syn[0]._);
					synonyms_string = synonyms_string.slice(1,synonyms_string.length-1);
				}else{
			  		var synonyms_string = JSON.stringify(result.entry_list.entry[i].sens[j].syn);
			  		synonyms_string = synonyms_string.slice(2,synonyms_string.length-2);
			  	}
			  	
		  		
		  		var options = {
				    include_script : false,
				    include_style : false,
				    compact_whitespace : true,
					include_attributes : { '*': false }
				};

				// Strip tags and decode HTML entities
				var synonyms_string = html_strip.html_strip(synonyms_string,options);
		  		
		  		synonyms_string = synonyms_string.replace(/<\/?[^>]+(>|$)/g, "");
		  		synonyms_string = synonyms_string.replace(";",",");
		  		synonyms_string = synonyms_string.match(/\w+(?![^\x28]*\x29)(?![^[]*])/g,"");
		  		array = array.concat(synonyms_string);
		  	
		  	}
		  	}
	  	}
	  	}
	  	//trim whitespace
	  	for (var i = 0; i < array.length; i++)
	  		array[i] = array[i].trim();
	  	//console.log(array);

	  	//remove dups
	  	array = uniq(array);
	  	
	  	//remove parent from child array
	  	var index = array.indexOf(driver_or_syn);
	  	while(index > -1){
		  	array.splice(index, 1);
		  	index = array.indexOf(driver_or_syn, index+1);
		}
	  	console.log(array);
	  	callback(null,array)
		});
    },
    function(synonyms,callback){ //now insert driver into graph
	    
	    if(isParent){
		    var querystring = 'CREATE (a:CoreDriver { name: "'+driver_or_syn+'"})';
		    console.log(querystring);
		    
		    db.cypher(querystring
			  , function (err, result) {
			    if (err) {
				    callback(err);
			      return console.log(err);
			    }
			   // console.log(result.data); // delivers an array of query results
			   // console.log(result.columns); // delivers an array of names of objects getting returned
			      callback(null,synonyms);
			  }
			);
		}else{
			callback(null,synonyms);
		}
	},
    function(synonyms,callback){ //now insert synonyms into graph
	    if(isParent){ childVal = 100; }
	    else { childVal = 10; }
	    async.eachSeries(synonyms, function(item, callback_inner) {
		 
		 //First, is NOT a useless word?
		 if(uselesswords.indexOf(item)===-1){
		 
		 if(isParent){
		var querystring = 'MATCH (a:CoreDriver) WHERE a.name = "'+driver_or_syn+'"\n';
		}else{
			var querystring = 'MATCH (a:CoreDriverChild) WHERE a.name = "'+driver_or_syn+'"\n';
		}
			querystring = querystring+'OPTIONAL MATCH (b:CoreDriverChild) WHERE b.name = "'+item+'"\nCREATE';
			querystring = querystring+'(b)-[:SYNONYM { value: '+childVal+'} ]->(a)';

			//console.log(querystring);
	    
			db.cypher(querystring
			, function (err, result) {
		   		 //console.log("dude");
		   		 //console.log(err);
		   		 if (err) {
			   		 if(isParent){
						var querystring = 'MATCH (a:CoreDriver) WHERE a.name = "'+driver_or_syn+'"\nCREATE';
						}else{
							var querystring = 'MATCH (a:CoreDriverChild) WHERE a.name = "'+driver_or_syn+'"\nCREATE';
						}
			   		 	querystring = querystring+'(ee:CoreDriverChild { name: "'+item+'" }),(ee)-[:SYNONYM { value: '+childVal+'}]->(a)';
	    			//console.log(querystring);
	    		db.cypher(querystring
	    		, function (err, result) {
					if (err) {
						console.log(err);
						callback_inner(err);
					}
					
			  		callback_inner(null);
		    }); //inner cypher call
		    
		    }
		    //console.log(result.data); // delivers an array of query results
		    //console.log(result.columns); // delivers an array of names of objects getting returned	
		    if(isParent){
			    insertWordTree(item,false,callback_inner);
			}else{
			    callback_inner(null);
			}
			
		  } //outer cypher callback
		); //outer cypher call
	    }//endif useless words
	    else{ 
		    //it is useless
		     callback_inner(null);
		} 
	    
    });
    callback(null);

    }
    ], function (err, result){
	    callback_outer(null);
    });
}

    

function uniq(a) {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}