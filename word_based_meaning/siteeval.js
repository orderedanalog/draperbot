
var request = require('request');
var async = require('async');
var htmlToText = require('html-to-text');
var validUrl = require('valid-url');

var uselesswords = ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "except", "few", "fifteen", "fifty", "fill", "find", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the","this","com","buy"];

var graphdb = {
  "abandon": {
    "scores":"acquire:10"
  },
  "abate": {
    "scores":"acquire:10"
  },
  "abet": {
    "scores":"defend:10; learn:10"
  },
  "abetment": {
    "scores":"defend:10"
  },
  "abide": {
    "scores":"defend:10; feel:10"
  },
  "able": {
    "scores":"feel:10"
  },
  "abolish": {
    "scores":"learn:10"
  },
  "abscond": {
    "scores":"learn:10"
  },
  "absorb": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "abundance": {
    "scores":"bond:10"
  },
  "accelerate": {
    "scores":"acquire:10; learn:10"
  },
  "accentuate": {
    "scores":"acquire:10"
  },
  "accept": {
    "scores":"defend:10; feel:10"
  },
  "access": {
    "scores":"learn:10"
  },
  "acclimate": {
    "scores":"acquire:10; feel:10"
  },
  "acclimatize": {
    "scores":"acquire:10; feel:10"
  },
  "accommodate": {
    "scores":"acquire:10; feel:10"
  },
  "accomplish": {
    "scores":"acquire:10; feel:10"
  },
  "accomplished": {
    "scores":"learn:10"
  },
  "accomplishment": {
    "scores":"feel:10"
  },
  "accord": {
    "scores":"bond:10"
  },
  "account": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "accretion": {
    "scores":"acquire:10"
  },
  "accrual": {
    "scores":"acquire:10"
  },
  "accumulate": {
    "scores":"acquire:10; learn:10"
  },
  "ace": {
    "scores":"learn:10; feel:10"
  },
  "ache": {
    "scores":"feel:10"
  },
  "achieve": {
    "scores":"acquire:10; feel:10"
  },
  "achievement": {
    "scores":"feel:10"
  },
  "acknowledge": {
    "scores":"feel:10"
  },
  "acquaint": {
    "scores":"learn:10"
  },
  "acquire": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "acquit": {
    "scores":"acquire:10"
  },
  "act": {
    "scores":"acquire:10; feel:10; bond:10"
  },
  "action": {
    "scores":"feel:10"
  },
  "actuality": {
    "scores":"feel:10"
  },
  "actualization": {
    "scores":"feel:10"
  },
  "actualize": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "actuate": {
    "scores":"learn:10"
  },
  "ad": {
    "scores":"bond:10"
  },
  "add": {
    "scores":"acquire:10; feel:10"
  },
  "addendum": {
    "scores":"acquire:10"
  },
  "addition": {
    "scores":"acquire:10"
  },
  "addle": {
    "scores":"feel:10"
  },
  "address": {
    "scores":"feel:10"
  },
  "adept": {
    "scores":"learn:10"
  },
  "adhere": {
    "scores":"learn:10"
  },
  "adherent": {
    "scores":"bond:10"
  },
  "adhesive": {
    "scores":"bond:10"
  },
  "adjudge": {
    "scores":"learn:10; feel:10"
  },
  "adjudicate": {
    "scores":"learn:10; feel:10"
  },
  "adjudicator": {
    "scores":"feel:10"
  },
  "adjust": {
    "scores":"acquire:10; feel:10"
  },
  "administer": {
    "scores":"acquire:10; learn:10"
  },
  "administrate": {
    "scores":"acquire:10; learn:10"
  },
  "admiration": {
    "scores":"feel:10"
  },
  "admit": {
    "scores":"feel:10"
  },
  "adore": {
    "scores":"learn:10"
  },
  "advance": {
    "scores":"acquire:100; acquire:10; feel:10"
  },
  "adversity": {
    "scores":"acquire:10"
  },
  "advertise": {
    "scores":"feel:10"
  },
  "advisable": {
    "scores":"learn:10"
  },
  "advise": {
    "scores":"learn:10"
  },
  "advisement": {
    "scores":"learn:10"
  },
  "advocate": {
    "scores":"defend:10"
  },
  "aegis": {
    "scores":"defend:10"
  },
  "aesthetics": {
    "scores":"feel:10"
  },
  "affair": {
    "scores":"feel:10"
  },
  "affect": {
    "scores":"feel:10"
  },
  "affection": {
    "scores":"learn:10"
  },
  "affiliation": {
    "scores":"bond:10"
  },
  "affinity": {
    "scores":"learn:10"
  },
  "affright": {
    "scores":"learn:10"
  },
  "affront": {
    "scores":"learn:10"
  },
  "agglomerate": {
    "scores":"acquire:10; learn:10"
  },
  "agglomeration": {
    "scores":"acquire:10; learn:10"
  },
  "aggravate": {
    "scores":"feel:10"
  },
  "aggregate": {
    "scores":"acquire:10; feel:10"
  },
  "agonize": {
    "scores":"feel:10"
  },
  "agree": {
    "scores":"feel:10"
  },
  "aid": {
    "scores":"defend:10"
  },
  "ailing": {
    "scores":"learn:10"
  },
  "aim": {
    "scores":"feel:10"
  },
  "aimless": {
    "scores":"learn:10"
  },
  "aimlessly": {
    "scores":"learn:10"
  },
  "air": {
    "scores":"feel:10"
  },
  "airhead": {
    "scores":"feel:10"
  },
  "airs": {
    "scores":"feel:10"
  },
  "alarm": {
    "scores":"learn:10"
  },
  "alchemize": {
    "scores":"acquire:10; feel:10"
  },
  "aleck": {
    "scores":"learn:10"
  },
  "alecky": {
    "scores":"learn:10"
  },
  "alien": {
    "scores":"acquire:10; feel:10"
  },
  "alienate": {
    "scores":"acquire:10; feel:10"
  },
  "alike": {
    "scores":"feel:10"
  },
  "alliance": {
    "scores":"bond:10"
  },
  "allocate": {
    "scores":"feel:10; bond:10"
  },
  "allow": {
    "scores":"acquire:10; feel:10"
  },
  "alphabet": {
    "scores":"acquire:10; learn:10"
  },
  "alright": {
    "scores":"acquire:10; defend:10"
  },
  "alter": {
    "scores":"acquire:10; feel:10"
  },
  "alternative": {
    "scores":"learn:10"
  },
  "amass": {
    "scores":"acquire:10; learn:10"
  },
  "ambience": {
    "scores":"feel:10"
  },
  "amble": {
    "scores":"learn:10"
  },
  "ammunition": {
    "scores":"defend:10"
  },
  "amour": {
    "scores":"feel:10"
  },
  "analytic": {
    "scores":"feel:10"
  },
  "anatomize": {
    "scores":"bond:10"
  },
  "anchor": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "angel": {
    "scores":"defend:10"
  },
  "angle": {
    "scores":"learn:10"
  },
  "anguish": {
    "scores":"feel:10"
  },
  "annihilate": {
    "scores":"acquire:10; learn:10"
  },
  "annoy": {
    "scores":"feel:10"
  },
  "annul": {
    "scores":"acquire:10; feel:10"
  },
  "annunciate": {
    "scores":"feel:10"
  },
  "answer": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "ante": {
    "scores":"learn:10; feel:10"
  },
  "anxiety": {
    "scores":"learn:10"
  },
  "anywise": {
    "scores":"learn:10"
  },
  "apex": {
    "scores":"learn:10"
  },
  "aplomb": {
    "scores":"feel:10"
  },
  "appear": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "appertain": {
    "scores":"bond:10"
  },
  "appetite": {
    "scores":"feel:10"
  },
  "apportion": {
    "scores":"feel:10; bond:10"
  },
  "appreciate": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "appreciation": {
    "scores":"feel:10"
  },
  "apprehend": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "apprehension": {
    "scores":"feel:10"
  },
  "apprise": {
    "scores":"learn:10"
  },
  "approach": {
    "scores":"acquire:10; feel:10"
  },
  "aptitude": {
    "scores":"learn:10"
  },
  "arbiter": {
    "scores":"feel:10"
  },
  "arbitrary": {
    "scores":"learn:10"
  },
  "arbitrate": {
    "scores":"learn:10; feel:10"
  },
  "arbitrator": {
    "scores":"feel:10"
  },
  "arc": {
    "scores":"learn:10; bond:10"
  },
  "arch": {
    "scores":"learn:10; bond:10"
  },
  "arduous": {
    "scores":"learn:10"
  },
  "argue": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "arise": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "aristocracy": {
    "scores":"learn:10"
  },
  "arithmetic": {
    "scores":"feel:10"
  },
  "arm": {
    "scores":"feel:10; bond:10"
  },
  "armor": {
    "scores":"defend:10"
  },
  "army": {
    "scores":"learn:10; bond:10"
  },
  "aroma": {
    "scores":"feel:10"
  },
  "arouse": {
    "scores":"acquire:10"
  },
  "arrange": {
    "scores":"acquire:10"
  },
  "arrangement": {
    "scores":"acquire:10; learn:10"
  },
  "array": {
    "scores":"acquire:10; bond:10"
  },
  "arrest": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "arrive": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "arterial": {
    "scores":"feel:10"
  },
  "artery": {
    "scores":"feel:10"
  },
  "articulate": {
    "scores":"acquire:10; feel:10"
  },
  "artist": {
    "scores":"learn:10"
  },
  "ascertain": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "aside": {
    "scores":"acquire:10"
  },
  "aspect": {
    "scores":"feel:10"
  },
  "aspire": {
    "scores":"feel:10"
  },
  "ass": {
    "scores":"learn:10"
  },
  "assail": {
    "scores":"learn:10"
  },
  "assassinate": {
    "scores":"acquire:10; feel:10"
  },
  "assault": {
    "scores":"learn:10"
  },
  "assay": {
    "scores":"feel:10; bond:10"
  },
  "assed": {
    "scores":"learn:10"
  },
  "assemblage": {
    "scores":"bond:10"
  },
  "assemble": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "asserting": {
    "scores":"acquire:10; defend:10"
  },
  "assess": {
    "scores":"acquire:10; feel:10"
  },
  "assign": {
    "scores":"acquire:10; feel:10"
  },
  "assimilate": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "assist": {
    "scores":"defend:10"
  },
  "assistance": {
    "scores":"defend:10"
  },
  "associate": {
    "scores":"bond:10"
  },
  "assortment": {
    "scores":"acquire:10; learn:10"
  },
  "assume": {
    "scores":"learn:10; feel:10"
  },
  "assumption": {
    "scores":"feel:10"
  },
  "assurance": {
    "scores":"feel:10; bond:10"
  },
  "assure": {
    "scores":"acquire:10; defend:10; bond:10"
  },
  "assured": {
    "scores":"acquire:10; defend:10"
  },
  "assuredness": {
    "scores":"feel:10; bond:10"
  },
  "astronomical": {
    "scores":"bond:10"
  },
  "atmosphere": {
    "scores":"feel:10"
  },
  "attain": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "attainment": {
    "scores":"feel:10"
  },
  "attar": {
    "scores":"feel:10"
  },
  "attend": {
    "scores":"learn:10"
  },
  "attendant": {
    "scores":"defend:10"
  },
  "attenuate": {
    "scores":"defend:10"
  },
  "attest": {
    "scores":"defend:10; feel:10"
  },
  "attestation": {
    "scores":"feel:10"
  },
  "attraction": {
    "scores":"acquire:10"
  },
  "attractiveness": {
    "scores":"feel:10"
  },
  "audacious": {
    "scores":"learn:10"
  },
  "audit": {
    "scores":"feel:10"
  },
  "Augean": {
    "scores":"learn:10"
  },
  "augmentation": {
    "scores":"acquire:10"
  },
  "augur": {
    "scores":"feel:10"
  },
  "authenticate": {
    "scores":"defend:10; feel:10"
  },
  "authority": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "authorization": {
    "scores":"learn:10"
  },
  "avenue": {
    "scores":"feel:10"
  },
  "avouch": {
    "scores":"feel:10"
  },
  "await": {
    "scores":"feel:10"
  },
  "awake": {
    "scores":"acquire:10"
  },
  "awaken": {
    "scores":"acquire:10"
  },
  "away": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "awning": {
    "scores":"defend:10"
  },
  "ax": {
    "scores":"learn:10"
  },
  "babbler": {
    "scores":"feel:10"
  },
  "baby": {
    "scores":"learn:10; feel:10"
  },
  "backbreaking": {
    "scores":"learn:10"
  },
  "backer": {
    "scores":"bond:10"
  },
  "backing": {
    "scores":"defend:10"
  },
  "backpack": {
    "scores":"acquire:10"
  },
  "backstop": {
    "scores":"defend:10"
  },
  "backup": {
    "scores":"defend:10; bond:10"
  },
  "bad": {
    "scores":"learn:10"
  },
  "baffle": {
    "scores":"feel:10"
  },
  "bag": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "bail": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "balance": {
    "scores":"learn:10"
  },
  "balk": {
    "scores":"learn:10; feel:10; bond:10"
  },
  "ball": {
    "scores":"bond:10"
  },
  "balloon": {
    "scores":"acquire:10"
  },
  "balm": {
    "scores":"feel:10"
  },
  "bamboozle": {
    "scores":"learn:10; feel:10"
  },
  "band": {
    "scores":"bond:10"
  },
  "bang": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "banger": {
    "scores":"bond:10"
  },
  "banish": {
    "scores":"learn:10"
  },
  "bank": {
    "scores":"bond:10"
  },
  "bankrupt": {
    "scores":"defend:10"
  },
  "bantam": {
    "scores":"bond:10"
  },
  "bar": {
    "scores":"defend:10; bond:10"
  },
  "barb": {
    "scores":"learn:10"
  },
  "bare": {
    "scores":"learn:10"
  },
  "bargain": {
    "scores":"bond:10"
  },
  "barrel": {
    "scores":"defend:10; learn:10; bond:10"
  },
  "barren": {
    "scores":"acquire:10"
  },
  "barricade": {
    "scores":"defend:10"
  },
  "bash": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "basis": {
    "scores":"learn:10"
  },
  "basketful": {
    "scores":"bond:10"
  },
  "bastille": {
    "scores":"feel:10"
  },
  "bastion": {
    "scores":"feel:10"
  },
  "bat": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "batch": {
    "scores":"bond:10"
  },
  "battery": {
    "scores":"bond:10"
  },
  "battle": {
    "scores":"feel:10"
  },
  "bawl": {
    "scores":"feel:10"
  },
  "bay": {
    "scores":"feel:10"
  },
  "beak": {
    "scores":"learn:10; feel:10"
  },
  "bear": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "beat": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "beater": {
    "scores":"learn:10"
  },
  "beating": {
    "scores":"learn:10"
  },
  "beauteousness": {
    "scores":"feel:10"
  },
  "beautifulness": {
    "scores":"feel:10"
  },
  "beaver": {
    "scores":"learn:10"
  },
  "beck": {
    "scores":"learn:10"
  },
  "bed": {
    "scores":"learn:10"
  },
  "bedazzle": {
    "scores":"learn:10"
  },
  "bedrock": {
    "scores":"learn:10"
  },
  "beetle": {
    "scores":"acquire:10"
  },
  "befall": {
    "scores":"acquire:10; feel:10"
  },
  "befog": {
    "scores":"feel:10"
  },
  "befuddle": {
    "scores":"feel:10"
  },
  "beget": {
    "scores":"acquire:10; feel:10"
  },
  "begird": {
    "scores":"bond:10"
  },
  "begone": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "beguile": {
    "scores":"learn:10"
  },
  "behold": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "belie": {
    "scores":"defend:10"
  },
  "belief": {
    "scores":"feel:10"
  },
  "believe": {
    "scores":"acquire:10; feel:10"
  },
  "belittle": {
    "scores":"learn:10"
  },
  "bellow": {
    "scores":"feel:10"
  },
  "belly": {
    "scores":"acquire:10; learn:10"
  },
  "belt": {
    "scores":"acquire:10; defend:10; learn:10; bond:10"
  },
  "bemuse": {
    "scores":"learn:10; feel:10"
  },
  "bench": {
    "scores":"feel:10"
  },
  "bend": {
    "scores":"acquire:10; feel:10; bond:10"
  },
  "beneficent": {
    "scores":"feel:10"
  },
  "benevolence": {
    "scores":"learn:10"
  },
  "benevolent": {
    "scores":"feel:10"
  },
  "benignant": {
    "scores":"feel:10"
  },
  "bent": {
    "scores":"learn:10"
  },
  "beset": {
    "scores":"learn:10"
  },
  "best": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "bet": {
    "scores":"learn:10"
  },
  "betide": {
    "scores":"acquire:10; feel:10"
  },
  "better": {
    "scores":"acquire:10; learn:10"
  },
  "bewilder": {
    "scores":"feel:10"
  },
  "bias": {
    "scores":"learn:10"
  },
  "bid": {
    "scores":"feel:10"
  },
  "bide": {
    "scores":"defend:10; feel:10"
  },
  "biff": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "big": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "bighead": {
    "scores":"feel:10"
  },
  "bigheartedness": {
    "scores":"feel:10"
  },
  "bike": {
    "scores":"learn:10"
  },
  "bilk": {
    "scores":"feel:10"
  },
  "bill": {
    "scores":"feel:10"
  },
  "billow": {
    "scores":"acquire:10"
  },
  "bind": {
    "scores":"learn:10; bond:10"
  },
  "bird": {
    "scores":"learn:10; feel:10"
  },
  "birdbrain": {
    "scores":"feel:10"
  },
  "bisect": {
    "scores":"bond:10"
  },
  "bit": {
    "scores":"learn:10; feel:10"
  },
  "bite": {
    "scores":"feel:10"
  },
  "blabber": {
    "scores":"feel:10"
  },
  "blabbermouth": {
    "scores":"feel:10"
  },
  "black": {
    "scores":"learn:10; feel:10"
  },
  "blackjack": {
    "scores":"acquire:10; feel:10"
  },
  "blame": {
    "scores":"acquire:10"
  },
  "blank": {
    "scores":"acquire:10"
  },
  "blanket": {
    "scores":"defend:10"
  },
  "blare": {
    "scores":"feel:10"
  },
  "blast": {
    "scores":"defend:10; learn:10"
  },
  "blaze": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "blazon": {
    "scores":"feel:10"
  },
  "bleed": {
    "scores":"acquire:10; feel:10"
  },
  "blemish": {
    "scores":"defend:10"
  },
  "blink": {
    "scores":"feel:10"
  },
  "block": {
    "scores":"defend:10; learn:10; bond:10"
  },
  "blockade": {
    "scores":"defend:10"
  },
  "blockbuster": {
    "scores":"learn:10"
  },
  "blockhead": {
    "scores":"feel:10"
  },
  "blood": {
    "scores":"acquire:10"
  },
  "bloody": {
    "scores":"defend:10"
  },
  "blossom": {
    "scores":"defend:10"
  },
  "blot": {
    "scores":"defend:10; learn:10"
  },
  "blow": {
    "scores":"defend:10; learn:10; feel:10; bond:10"
  },
  "blowhard": {
    "scores":"feel:10"
  },
  "bludgeon": {
    "scores":"acquire:10; learn:10"
  },
  "blueprint": {
    "scores":"learn:10"
  },
  "bluff": {
    "scores":"learn:10; feel:10"
  },
  "blunder": {
    "scores":"feel:10"
  },
  "boast": {
    "scores":"acquire:10; feel:10"
  },
  "boatload": {
    "scores":"bond:10"
  },
  "bob": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "bobble": {
    "scores":"defend:10; feel:10"
  },
  "bobtail": {
    "scores":"learn:10"
  },
  "bod": {
    "scores":"learn:10; feel:10"
  },
  "bodied": {
    "scores":"feel:10"
  },
  "body": {
    "scores":"learn:10; feel:10; bond:10"
  },
  "boggle": {
    "scores":"defend:10; feel:10"
  },
  "bold": {
    "scores":"learn:10"
  },
  "bollix": {
    "scores":"defend:10; feel:10"
  },
  "bolster": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "bolt": {
    "scores":"defend:10; learn:10"
  },
  "bomb": {
    "scores":"defend:10; learn:10"
  },
  "bombed": {
    "scores":"learn:10"
  },
  "bombproof": {
    "scores":"feel:10"
  },
  "bond": {
    "scores":"bond:10"
  },
  "bone": {
    "scores":"learn:10"
  },
  "bonehead": {
    "scores":"feel:10"
  },
  "bonk": {
    "scores":"acquire:10; learn:10"
  },
  "boo": {
    "scores":"feel:10"
  },
  "boob": {
    "scores":"feel:10"
  },
  "booby": {
    "scores":"acquire:10; learn:10"
  },
  "boodle": {
    "scores":"bond:10"
  },
  "book": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "boom": {
    "scores":"acquire:10"
  },
  "boon": {
    "scores":"learn:10"
  },
  "boost": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "boot": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "bop": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "boss": {
    "scores":"learn:10"
  },
  "botch": {
    "scores":"acquire:10; learn:10"
  },
  "bother": {
    "scores":"feel:10"
  },
  "bottleneck": {
    "scores":"bond:10"
  },
  "boulevard": {
    "scores":"feel:10"
  },
  "bounce": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "bouncing": {
    "scores":"feel:10"
  },
  "bounty": {
    "scores":"learn:10"
  },
  "bouquet": {
    "scores":"feel:10"
  },
  "bourn": {
    "scores":"learn:10"
  },
  "bout": {
    "scores":"learn:10"
  },
  "bow": {
    "scores":"learn:10; bond:10"
  },
  "bowl": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "box": {
    "scores":"acquire:10; defend:10; learn:10; bond:10"
  },
  "brace": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "bracelet": {
    "scores":"bond:10"
  },
  "brag": {
    "scores":"defend:10"
  },
  "brain": {
    "scores":"feel:10"
  },
  "brainiac": {
    "scores":"feel:10"
  },
  "brainpower": {
    "scores":"feel:10"
  },
  "brash": {
    "scores":"learn:10"
  },
  "brassbound": {
    "scores":"learn:10"
  },
  "brassy": {
    "scores":"learn:10"
  },
  "brazen": {
    "scores":"learn:10"
  },
  "bre": {
    "scores":"feel:10"
  },
  "breach": {
    "scores":"defend:10"
  },
  "break": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "breakout": {
    "scores":"learn:10"
  },
  "breathe": {
    "scores":"defend:10"
  },
  "breed": {
    "scores":"acquire:10; feel:10"
  },
  "breeze": {
    "scores":"defend:10; learn:10"
  },
  "brew": {
    "scores":"learn:10"
  },
  "brick": {
    "scores":"feel:10"
  },
  "brickbat": {
    "scores":"learn:10"
  },
  "bridewell": {
    "scores":"feel:10"
  },
  "bridle": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "brief": {
    "scores":"learn:10"
  },
  "brig": {
    "scores":"feel:10"
  },
  "brigade": {
    "scores":"bond:10"
  },
  "bring": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "broach": {
    "scores":"acquire:10"
  },
  "broad": {
    "scores":"defend:10"
  },
  "broadcast": {
    "scores":"feel:10"
  },
  "Brobdingnagian": {
    "scores":"bond:10"
  },
  "brook": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "brooklet": {
    "scores":"learn:10"
  },
  "brush": {
    "scores":"learn:10; feel:10"
  },
  "bubblehead": {
    "scores":"feel:10"
  },
  "buck": {
    "scores":"feel:10"
  },
  "bucket": {
    "scores":"bond:10"
  },
  "buckler": {
    "scores":"defend:10"
  },
  "buff": {
    "scores":"learn:10"
  },
  "buffalo": {
    "scores":"learn:10; feel:10"
  },
  "buffet": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "bug": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "bugger": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "build": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "bulb": {
    "scores":"feel:10"
  },
  "bulge": {
    "scores":"acquire:10; learn:10"
  },
  "bulk": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "bull": {
    "scores":"defend:10; learn:10"
  },
  "bulwark": {
    "scores":"acquire:10; defend:100; defend:10; learn:10"
  },
  "bumble": {
    "scores":"defend:10; feel:10"
  },
  "bump": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "bumper": {
    "scores":"bond:10"
  },
  "bunch": {
    "scores":"acquire:10; bond:10"
  },
  "bundle": {
    "scores":"defend:10; learn:10; bond:10"
  },
  "bungle": {
    "scores":"defend:10; feel:10"
  },
  "bunk": {
    "scores":"learn:10"
  },
  "burgeon": {
    "scores":"acquire:10; defend:10"
  },
  "burglarize": {
    "scores":"acquire:10"
  },
  "burgle": {
    "scores":"acquire:10"
  },
  "burke": {
    "scores":"defend:10"
  },
  "burn": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "burnish": {
    "scores":"learn:10"
  },
  "burst": {
    "scores":"defend:10"
  },
  "bury": {
    "scores":"learn:10"
  },
  "bushel": {
    "scores":"bond:10"
  },
  "bushwhack": {
    "scores":"learn:10"
  },
  "bust": {
    "scores":"acquire:10; defend:10; learn:10; bond:10"
  },
  "bustle": {
    "scores":"defend:10; learn:10"
  },
  "busy": {
    "scores":"learn:10"
  },
  "butcher": {
    "scores":"defend:10; feel:10"
  },
  "butt": {
    "scores":"learn:10"
  },
  "buttress": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "buy": {
    "scores":"bond:10"
  },
  "buzz": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "bypass": {
    "scores":"feel:10"
  },
  "cable": {
    "scores":"bond:10"
  },
  "cackler": {
    "scores":"feel:10"
  },
  "cage": {
    "scores":"defend:10"
  },
  "calaboose": {
    "scores":"feel:10"
  },
  "calculable": {
    "scores":"acquire:10; defend:10"
  },
  "calculate": {
    "scores":"acquire:10; feel:10"
  },
  "calculus": {
    "scores":"feel:10"
  },
  "Camelot": {
    "scores":"acquire:10"
  },
  "cancel": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "cannonball": {
    "scores":"defend:10; learn:10"
  },
  "cap": {
    "scores":"defend:10; feel:10"
  },
  "capital": {
    "scores":"learn:10"
  },
  "capsule": {
    "scores":"defend:10; bond:10"
  },
  "capsulize": {
    "scores":"bond:10"
  },
  "captain": {
    "scores":"learn:10"
  },
  "capture": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "carbon": {
    "scores":"feel:10"
  },
  "cardinal": {
    "scores":"learn:10"
  },
  "care": {
    "scores":"defend:10"
  },
  "careen": {
    "scores":"defend:10; learn:10"
  },
  "career": {
    "scores":"defend:10; learn:10"
  },
  "carload": {
    "scores":"bond:10"
  },
  "carpet": {
    "scores":"defend:10"
  },
  "carriageway": {
    "scores":"feel:10"
  },
  "carry": {
    "scores":"acquire:10; acquire:100; defend:10; learn:10; feel:10"
  },
  "carryall": {
    "scores":"acquire:10"
  },
  "cart": {
    "scores":"acquire:10"
  },
  "case": {
    "scores":"learn:10; bond:10"
  },
  "cashier": {
    "scores":"learn:10"
  },
  "casing": {
    "scores":"defend:10"
  },
  "cast": {
    "scores":"acquire:100; acquire:10; learn:10; feel:10"
  },
  "castle": {
    "scores":"feel:10"
  },
  "cat": {
    "scores":"feel:10"
  },
  "catalyze": {
    "scores":"acquire:10; feel:10"
  },
  "catbird": {
    "scores":"acquire:10; learn:10"
  },
  "catch": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "catena": {
    "scores":"bond:10"
  },
  "catenate": {
    "scores":"bond:10"
  },
  "catenation": {
    "scores":"bond:10"
  },
  "cause": {
    "scores":"acquire:10; feel:10"
  },
  "caution": {
    "scores":"defend:10"
  },
  "cease": {
    "scores":"acquire:10; defend:10"
  },
  "cede": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "ceiling": {
    "scores":"defend:10"
  },
  "celeb": {
    "scores":"feel:10"
  },
  "celebrate": {
    "scores":"learn:10"
  },
  "cement": {
    "scores":"bond:10"
  },
  "censure": {
    "scores":"acquire:10"
  },
  "centerpiece": {
    "scores":"learn:10"
  },
  "central": {
    "scores":"learn:10"
  },
  "cerebrum": {
    "scores":"feel:10"
  },
  "ceremonial": {
    "scores":"acquire:10"
  },
  "ceremony": {
    "scores":"acquire:10"
  },
  "certainty": {
    "scores":"bond:10"
  },
  "certify": {
    "scores":"defend:10"
  },
  "certitude": {
    "scores":"bond:10"
  },
  "chafe": {
    "scores":"learn:10; feel:10"
  },
  "chaffer": {
    "scores":"bond:10"
  },
  "chain": {
    "scores":"bond:10"
  },
  "chalk": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "challenge": {
    "scores":"bond:10"
  },
  "challenging": {
    "scores":"learn:10"
  },
  "champion": {
    "scores":"defend:10"
  },
  "chance": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "character": {
    "scores":"learn:10; feel:10"
  },
  "charade": {
    "scores":"feel:10"
  },
  "charge": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "charity": {
    "scores":"feel:10"
  },
  "chart": {
    "scores":"bond:10"
  },
  "chase": {
    "scores":"defend:10; learn:10"
  },
  "chatterer": {
    "scores":"feel:10"
  },
  "cheapen": {
    "scores":"defend:10"
  },
  "cheat": {
    "scores":"feel:10"
  },
  "check": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "checkup": {
    "scores":"feel:10"
  },
  "cheeky": {
    "scores":"learn:10"
  },
  "cherish": {
    "scores":"acquire:10; feel:10"
  },
  "cherry": {
    "scores":"learn:10"
  },
  "chew": {
    "scores":"learn:10; feel:10"
  },
  "chief": {
    "scores":"learn:10"
  },
  "chimerical": {
    "scores":"acquire:10; feel:10"
  },
  "chisel": {
    "scores":"feel:10"
  },
  "choice": {
    "scores":"learn:10"
  },
  "choke": {
    "scores":"feel:10"
  },
  "choose": {
    "scores":"learn:10; feel:10"
  },
  "chop": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "chops": {
    "scores":"feel:10"
  },
  "chord": {
    "scores":"feel:10"
  },
  "chosen": {
    "scores":"learn:10"
  },
  "chouse": {
    "scores":"feel:10"
  },
  "chowderhead": {
    "scores":"feel:10"
  },
  "chronicle": {
    "scores":"bond:10"
  },
  "chuck": {
    "scores":"acquire:10"
  },
  "chucklehead": {
    "scores":"feel:10"
  },
  "chum": {
    "scores":"learn:10"
  },
  "chunk": {
    "scores":"bond:10"
  },
  "cinch": {
    "scores":"acquire:10; defend:10; bond:10"
  },
  "cinema": {
    "scores":"defend:10"
  },
  "cipher": {
    "scores":"feel:10"
  },
  "ciphering": {
    "scores":"feel:10"
  },
  "circle": {
    "scores":"bond:10"
  },
  "circuit": {
    "scores":"feel:10; bond:10"
  },
  "circulate": {
    "scores":"defend:10"
  },
  "circumscribe": {
    "scores":"feel:10"
  },
  "circumscription": {
    "scores":"bond:10"
  },
  "citadel": {
    "scores":"feel:10"
  },
  "claim": {
    "scores":"acquire:10"
  },
  "clamber": {
    "scores":"feel:10"
  },
  "clamp": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "clanger": {
    "scores":"feel:10"
  },
  "clap": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "clasp": {
    "scores":"acquire:10; feel:10"
  },
  "classify": {
    "scores":"acquire:10"
  },
  "clean": {
    "scores":"acquire:10; learn:10"
  },
  "clear": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "clench": {
    "scores":"acquire:10; feel:10"
  },
  "click": {
    "scores":"acquire:10; feel:10; bond:10"
  },
  "climate": {
    "scores":"feel:10"
  },
  "climb": {
    "scores":"acquire:10"
  },
  "cling": {
    "scores":"acquire:10; feel:10"
  },
  "clingy": {
    "scores":"bond:10"
  },
  "clink": {
    "scores":"feel:10"
  },
  "clinker": {
    "scores":"feel:10"
  },
  "clip": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "cloak": {
    "scores":"defend:10"
  },
  "clobber": {
    "scores":"acquire:10; learn:10"
  },
  "clock": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "clodpoll": {
    "scores":"feel:10"
  },
  "clog": {
    "scores":"feel:10; bond:10"
  },
  "clone": {
    "scores":"feel:10"
  },
  "close": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "closet": {
    "scores":"defend:10"
  },
  "clot": {
    "scores":"feel:10; bond:10"
  },
  "clothe": {
    "scores":"acquire:10; feel:10"
  },
  "clout": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "clown": {
    "scores":"feel:10"
  },
  "club": {
    "scores":"bond:10"
  },
  "cluck": {
    "scores":"feel:10"
  },
  "clue": {
    "scores":"learn:10"
  },
  "clump": {
    "scores":"bond:10"
  },
  "clunk": {
    "scores":"feel:10"
  },
  "cluster": {
    "scores":"bond:10"
  },
  "clutch": {
    "scores":"acquire:10; feel:10; bond:10"
  },
  "clutter": {
    "scores":"acquire:10; learn:10"
  },
  "coalesce": {
    "scores":"bond:10"
  },
  "coat": {
    "scores":"defend:10"
  },
  "cocksure": {
    "scores":"learn:10"
  },
  "cocksureness": {
    "scores":"bond:10"
  },
  "cocky": {
    "scores":"learn:10"
  },
  "cocoon": {
    "scores":"defend:10"
  },
  "codify": {
    "scores":"acquire:10"
  },
  "coerce": {
    "scores":"acquire:10; feel:10"
  },
  "cogitate": {
    "scores":"learn:10; feel:10"
  },
  "cognize": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "cognoscente": {
    "scores":"learn:10"
  },
  "cohere": {
    "scores":"bond:10"
  },
  "coherent": {
    "scores":"feel:10"
  },
  "coition": {
    "scores":"feel:10"
  },
  "coitus": {
    "scores":"feel:10"
  },
  "col": {
    "scores":"feel:10"
  },
  "cold": {
    "scores":"feel:10; bond:10"
  },
  "collaborate": {
    "scores":"bond:10"
  },
  "collaboration": {
    "scores":"bond:10"
  },
  "collage": {
    "scores":"acquire:10; learn:10"
  },
  "collapse": {
    "scores":"bond:10"
  },
  "collar": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "collect": {
    "scores":"acquire:10; learn:10"
  },
  "collection": {
    "scores":"bond:10"
  },
  "collide": {
    "scores":"acquire:10; learn:10"
  },
  "colossal": {
    "scores":"bond:10"
  },
  "comb": {
    "scores":"learn:10"
  },
  "combine": {
    "scores":"bond:10"
  },
  "come": {
    "scores":"acquire:10; acquire:100; defend:10; learn:10; feel:10; bond:10"
  },
  "comeliness": {
    "scores":"feel:10"
  },
  "command": {
    "scores":"acquire:10; feel:10"
  },
  "commemorate": {
    "scores":"learn:10"
  },
  "commence": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "commend": {
    "scores":"feel:10"
  },
  "comment": {
    "scores":"feel:10"
  },
  "commerce": {
    "scores":"feel:10"
  },
  "commination": {
    "scores":"feel:10"
  },
  "commiserate": {
    "scores":"feel:10"
  },
  "commiseration": {
    "scores":"feel:10"
  },
  "commiserative": {
    "scores":"feel:10"
  },
  "commit": {
    "scores":"acquire:10; feel:10"
  },
  "commonwealth": {
    "scores":"acquire:10"
  },
  "communicate": {
    "scores":"feel:10"
  },
  "communication": {
    "scores":"feel:10"
  },
  "compact": {
    "scores":"bond:10"
  },
  "companion": {
    "scores":"defend:10"
  },
  "company": {
    "scores":"learn:10; bond:10"
  },
  "compass": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "compassion": {
    "scores":"feel:10"
  },
  "compassionate": {
    "scores":"feel:10"
  },
  "compel": {
    "scores":"acquire:10; feel:10"
  },
  "compendious": {
    "scores":"defend:10"
  },
  "compensate": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "complacency": {
    "scores":"feel:10"
  },
  "compleat": {
    "scores":"learn:10"
  },
  "complete": {
    "scores":"defend:10; learn:10"
  },
  "comply": {
    "scores":"learn:10"
  },
  "comport": {
    "scores":"acquire:10"
  },
  "compose": {
    "scores":"acquire:10; feel:10"
  },
  "compound": {
    "scores":"bond:10"
  },
  "comprehend": {
    "scores":"acquire:10; feel:10"
  },
  "comprehensive": {
    "scores":"defend:10"
  },
  "compress": {
    "scores":"bond:10"
  },
  "comprise": {
    "scores":"acquire:10; feel:10"
  },
  "compromise": {
    "scores":"defend:10"
  },
  "computation": {
    "scores":"feel:10"
  },
  "compute": {
    "scores":"feel:10"
  },
  "concatenate": {
    "scores":"bond:10"
  },
  "concatenation": {
    "scores":"bond:10"
  },
  "conceal": {
    "scores":"defend:10"
  },
  "concede": {
    "scores":"feel:10"
  },
  "conceit": {
    "scores":"feel:10"
  },
  "conceitedness": {
    "scores":"feel:10"
  },
  "conceive": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "concentrate": {
    "scores":"acquire:10; learn:10"
  },
  "concert": {
    "scores":"bond:10"
  },
  "conclude": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "concoct": {
    "scores":"acquire:10; feel:10"
  },
  "concur": {
    "scores":"bond:10"
  },
  "condemn": {
    "scores":"acquire:10"
  },
  "condemnation": {
    "scores":"feel:10"
  },
  "condense": {
    "scores":"bond:10"
  },
  "condition": {
    "scores":"acquire:10; feel:10; bond:10"
  },
  "conditioned": {
    "scores":"feel:10"
  },
  "condole": {
    "scores":"feel:10"
  },
  "condone": {
    "scores":"feel:10"
  },
  "conduct": {
    "scores":"acquire:10"
  },
  "confect": {
    "scores":"acquire:10; feel:10"
  },
  "confederate": {
    "scores":"bond:10"
  },
  "confederation": {
    "scores":"bond:10"
  },
  "confess": {
    "scores":"feel:10"
  },
  "confide": {
    "scores":"feel:10"
  },
  "confidence": {
    "scores":"feel:10"
  },
  "confident": {
    "scores":"acquire:10; defend:10"
  },
  "configuration": {
    "scores":"acquire:10; feel:10"
  },
  "confine": {
    "scores":"feel:10"
  },
  "confirmation": {
    "scores":"feel:10"
  },
  "conform": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "conformation": {
    "scores":"acquire:10; feel:10"
  },
  "confound": {
    "scores":"feel:10"
  },
  "congratulation": {
    "scores":"feel:10"
  },
  "congregate": {
    "scores":"acquire:10; learn:10"
  },
  "congress": {
    "scores":"feel:10"
  },
  "conjecture": {
    "scores":"acquire:10; feel:10"
  },
  "conjoin": {
    "scores":"bond:10"
  },
  "conjugate": {
    "scores":"bond:10"
  },
  "conjure": {
    "scores":"feel:10"
  },
  "conk": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "connect": {
    "scores":"bond:10"
  },
  "connection": {
    "scores":"bond:10"
  },
  "connoisseur": {
    "scores":"learn:10"
  },
  "conquer": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "conqueror": {
    "scores":"learn:10"
  },
  "consecution": {
    "scores":"bond:10"
  },
  "consequent": {
    "scores":"feel:10"
  },
  "consider": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "consign": {
    "scores":"feel:10"
  },
  "consociate": {
    "scores":"learn:10"
  },
  "consort": {
    "scores":"learn:10; bond:10"
  },
  "conspire": {
    "scores":"bond:10"
  },
  "constellate": {
    "scores":"acquire:10; learn:10"
  },
  "constellation": {
    "scores":"acquire:10; bond:10"
  },
  "constitute": {
    "scores":"acquire:10; feel:10"
  },
  "constitution": {
    "scores":"acquire:10; feel:10"
  },
  "constitutional": {
    "scores":"learn:10"
  },
  "constrain": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "constraint": {
    "scores":"bond:10"
  },
  "constrict": {
    "scores":"bond:10"
  },
  "constringe": {
    "scores":"bond:10"
  },
  "construct": {
    "scores":"acquire:10; feel:10"
  },
  "consult": {
    "scores":"learn:10"
  },
  "consume": {
    "scores":"acquire:10"
  },
  "consummate": {
    "scores":"learn:10"
  },
  "consummation": {
    "scores":"feel:10"
  },
  "contact": {
    "scores":"feel:10"
  },
  "contain": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "contemn": {
    "scores":"feel:10"
  },
  "contemplate": {
    "scores":"learn:10; feel:10"
  },
  "content": {
    "scores":"feel:10"
  },
  "continuance": {
    "scores":"learn:10"
  },
  "continue": {
    "scores":"learn:10"
  },
  "contour": {
    "scores":"feel:10"
  },
  "contract": {
    "scores":"bond:10"
  },
  "contravene": {
    "scores":"defend:10"
  },
  "contrive": {
    "scores":"acquire:10; feel:10"
  },
  "control": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "convention": {
    "scores":"bond:10"
  },
  "conversationalist": {
    "scores":"feel:10"
  },
  "convert": {
    "scores":"acquire:10; feel:10"
  },
  "convey": {
    "scores":"acquire:10; feel:10"
  },
  "conviction": {
    "scores":"feel:10; bond:10"
  },
  "convince": {
    "scores":"acquire:10; feel:10"
  },
  "convulsive": {
    "scores":"acquire:10"
  },
  "cook": {
    "scores":"acquire:10; feel:10"
  },
  "cookie": {
    "scores":"learn:10; feel:10"
  },
  "cooler": {
    "scores":"feel:10"
  },
  "coop": {
    "scores":"defend:10; feel:10"
  },
  "cooperate": {
    "scores":"bond:10"
  },
  "cooperation": {
    "scores":"bond:10"
  },
  "cop": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "cope": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "copulating": {
    "scores":"feel:10"
  },
  "copulation": {
    "scores":"feel:10"
  },
  "copy": {
    "scores":"feel:10"
  },
  "cord": {
    "scores":"bond:10"
  },
  "core": {
    "scores":"learn:10"
  },
  "corkscrew": {
    "scores":"acquire:10; learn:10"
  },
  "corner": {
    "scores":"learn:10; bond:10"
  },
  "cornerstone": {
    "scores":"learn:10"
  },
  "corps": {
    "scores":"learn:10"
  },
  "corrade": {
    "scores":"learn:10"
  },
  "corral": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "correct": {
    "scores":"acquire:10; feel:10"
  },
  "correlate": {
    "scores":"bond:10"
  },
  "correspond": {
    "scores":"acquire:10; feel:10"
  },
  "corridor": {
    "scores":"acquire:10"
  },
  "corroborate": {
    "scores":"defend:10"
  },
  "corroboration": {
    "scores":"feel:10"
  },
  "cosmic": {
    "scores":"bond:10"
  },
  "cosmopolitan": {
    "scores":"learn:10"
  },
  "cost": {
    "scores":"feel:10"
  },
  "cotton": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "couch": {
    "scores":"acquire:10; feel:10"
  },
  "cough": {
    "scores":"learn:10"
  },
  "couloir": {
    "scores":"feel:10"
  },
  "count": {
    "scores":"acquire:10; feel:10"
  },
  "countenance": {
    "scores":"defend:10; feel:10"
  },
  "counteract": {
    "scores":"acquire:10; feel:10"
  },
  "counterbalance": {
    "scores":"acquire:10; feel:10"
  },
  "counterfeit": {
    "scores":"feel:10"
  },
  "counterpart": {
    "scores":"feel:10"
  },
  "counterpoise": {
    "scores":"acquire:10; feel:10"
  },
  "country": {
    "scores":"acquire:10"
  },
  "couple": {
    "scores":"bond:10"
  },
  "coupling": {
    "scores":"feel:10"
  },
  "coupon": {
    "scores":"feel:10"
  },
  "course": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "court": {
    "scores":"feel:10"
  },
  "courtesy": {
    "scores":"learn:10"
  },
  "covenant": {
    "scores":"bond:10"
  },
  "cover": {
    "scores":"acquire:10; defend:100; defend:10; learn:10; feel:10; bond:10"
  },
  "covering": {
    "scores":"defend:10"
  },
  "coverture": {
    "scores":"defend:10"
  },
  "covet": {
    "scores":"feel:10"
  },
  "cozen": {
    "scores":"learn:10; feel:10"
  },
  "cr": {
    "scores":"learn:10"
  },
  "crab": {
    "scores":"defend:10"
  },
  "crack": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "crackerjack": {
    "scores":"learn:10"
  },
  "cradle": {
    "scores":"learn:10"
  },
  "craft": {
    "scores":"acquire:10"
  },
  "cram": {
    "scores":"learn:10"
  },
  "cramp": {
    "scores":"feel:10; bond:10"
  },
  "crane": {
    "scores":"defend:10; learn:10"
  },
  "crank": {
    "scores":"learn:10"
  },
  "crash": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "crater": {
    "scores":"learn:10"
  },
  "crave": {
    "scores":"feel:10"
  },
  "crazy": {
    "scores":"acquire:10; learn:10"
  },
  "creak": {
    "scores":"learn:10"
  },
  "cream": {
    "scores":"acquire:10; learn:10"
  },
  "create": {
    "scores":"acquire:10; feel:10"
  },
  "creature": {
    "scores":"learn:10; feel:10"
  },
  "credit": {
    "scores":"acquire:10"
  },
  "creep": {
    "scores":"learn:10"
  },
  "cretin": {
    "scores":"feel:10"
  },
  "crew": {
    "scores":"bond:10"
  },
  "crimp": {
    "scores":"bond:10"
  },
  "cripple": {
    "scores":"defend:10"
  },
  "croak": {
    "scores":"acquire:10; feel:10"
  },
  "crook": {
    "scores":"learn:10; bond:10"
  },
  "crop": {
    "scores":"acquire:10; bond:10"
  },
  "cross": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "crow": {
    "scores":"defend:10"
  },
  "cruise": {
    "scores":"acquire:10"
  },
  "crumb": {
    "scores":"feel:10"
  },
  "crump": {
    "scores":"defend:10"
  },
  "crunching": {
    "scores":"feel:10"
  },
  "crush": {
    "scores":"learn:10"
  },
  "crust": {
    "scores":"learn:10"
  },
  "crystallize": {
    "scores":"acquire:10"
  },
  "cuddy": {
    "scores":"feel:10"
  },
  "cuff": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "cull": {
    "scores":"learn:10"
  },
  "cultivate": {
    "scores":"acquire:100; acquire:10"
  },
  "culture": {
    "scores":"acquire:10"
  },
  "curb": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "current": {
    "scores":"learn:10"
  },
  "curtain": {
    "scores":"defend:10"
  },
  "curvature": {
    "scores":"learn:10"
  },
  "curve": {
    "scores":"learn:10"
  },
  "cusp": {
    "scores":"learn:10"
  },
  "custodian": {
    "scores":"defend:10"
  },
  "custodianship": {
    "scores":"defend:10"
  },
  "customer": {
    "scores":"learn:10; feel:10"
  },
  "cut": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "cute": {
    "scores":"learn:10"
  },
  "cuteness": {
    "scores":"feel:10"
  },
  "cyclonic": {
    "scores":"acquire:10"
  },
  "cyclopean": {
    "scores":"bond:10"
  },
  "cyclopedic": {
    "scores":"defend:10"
  },
  "dab": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "damage": {
    "scores":"feel:10"
  },
  "daresay": {
    "scores":"feel:10"
  },
  "dart": {
    "scores":"learn:10"
  },
  "dash": {
    "scores":"defend:10; learn:10"
  },
  "date": {
    "scores":"learn:10"
  },
  "dawn": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "daydreaming": {
    "scores":"learn:10"
  },
  "dead": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "deadhead": {
    "scores":"feel:10"
  },
  "deal": {
    "scores":"defend:10; feel:10; bond:10"
  },
  "death": {
    "scores":"feel:10"
  },
  "debark": {
    "scores":"acquire:10"
  },
  "debate": {
    "scores":"learn:10; feel:10"
  },
  "decease": {
    "scores":"feel:10"
  },
  "decide": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "decimate": {
    "scores":"acquire:10"
  },
  "decipher": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "declare": {
    "scores":"feel:10"
  },
  "decline": {
    "scores":"learn:10"
  },
  "decode": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "deconstruct": {
    "scores":"bond:10"
  },
  "decorum": {
    "scores":"acquire:10"
  },
  "decrypt": {
    "scores":"defend:10; learn:10"
  },
  "deduce": {
    "scores":"acquire:10; feel:10"
  },
  "deduct": {
    "scores":"acquire:10"
  },
  "deed": {
    "scores":"acquire:10; feel:10"
  },
  "deem": {
    "scores":"acquire:10; feel:10"
  },
  "deface": {
    "scores":"defend:10"
  },
  "defeat": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "defend": {
    "scores":"defend:10"
  },
  "defender": {
    "scores":"defend:10"
  },
  "defer": {
    "scores":"feel:10"
  },
  "defile": {
    "scores":"feel:10"
  },
  "deflect": {
    "scores":"learn:10; bond:10"
  },
  "defraud": {
    "scores":"feel:10"
  },
  "degrade": {
    "scores":"defend:10"
  },
  "delay": {
    "scores":"feel:10"
  },
  "delegate": {
    "scores":"feel:10"
  },
  "Delhi": {
    "scores":"learn:10"
  },
  "deliberate": {
    "scores":"learn:10; feel:10"
  },
  "deliberation": {
    "scores":"learn:10"
  },
  "delight": {
    "scores":"learn:10"
  },
  "delineate": {
    "scores":"acquire:10"
  },
  "deliquesce": {
    "scores":"learn:10"
  },
  "deliver": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "delude": {
    "scores":"learn:10"
  },
  "delve": {
    "scores":"learn:10; feel:10"
  },
  "delving": {
    "scores":"learn:10"
  },
  "demanding": {
    "scores":"learn:10"
  },
  "demean": {
    "scores":"acquire:10"
  },
  "demise": {
    "scores":"feel:10"
  },
  "demolish": {
    "scores":"acquire:10; defend:10"
  },
  "demount": {
    "scores":"acquire:10"
  },
  "denigrate": {
    "scores":"learn:10"
  },
  "denotation": {
    "scores":"feel:10"
  },
  "denounce": {
    "scores":"acquire:10"
  },
  "dent": {
    "scores":"acquire:10"
  },
  "denunciation": {
    "scores":"feel:10"
  },
  "depart": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "dependence": {
    "scores":"defend:10"
  },
  "depict": {
    "scores":"acquire:10"
  },
  "deplete": {
    "scores":"acquire:10"
  },
  "deport": {
    "scores":"acquire:10"
  },
  "depose": {
    "scores":"acquire:10; feel:10"
  },
  "deposit": {
    "scores":"acquire:10; feel:10"
  },
  "deprecate": {
    "scores":"learn:10"
  },
  "depreciate": {
    "scores":"learn:10"
  },
  "depress": {
    "scores":"defend:10"
  },
  "depth": {
    "scores":"defend:10"
  },
  "derange": {
    "scores":"learn:10"
  },
  "deride": {
    "scores":"learn:10"
  },
  "derive": {
    "scores":"acquire:10; feel:10"
  },
  "derogate": {
    "scores":"learn:10"
  },
  "descend": {
    "scores":"learn:10"
  },
  "descry": {
    "scores":"learn:10; feel:10"
  },
  "deselect": {
    "scores":"learn:10; feel:10"
  },
  "desert": {
    "scores":"acquire:10"
  },
  "desiderate": {
    "scores":"feel:10"
  },
  "design": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "designated": {
    "scores":"defend:10"
  },
  "desirable": {
    "scores":"learn:10"
  },
  "desist": {
    "scores":"acquire:10; defend:10"
  },
  "desolate": {
    "scores":"acquire:10"
  },
  "desolation": {
    "scores":"acquire:10"
  },
  "destroy": {
    "scores":"acquire:10"
  },
  "desultorily": {
    "scores":"learn:10"
  },
  "desultory": {
    "scores":"learn:10"
  },
  "detainer": {
    "scores":"feel:10"
  },
  "detainment": {
    "scores":"feel:10"
  },
  "detect": {
    "scores":"learn:10; feel:10"
  },
  "determine": {
    "scores":"learn:10; feel:10"
  },
  "deterrent": {
    "scores":"bond:10"
  },
  "detonate": {
    "scores":"defend:10"
  },
  "detour": {
    "scores":"learn:10; bond:10"
  },
  "devaluate": {
    "scores":"defend:10"
  },
  "devalue": {
    "scores":"defend:10"
  },
  "devastate": {
    "scores":"acquire:10"
  },
  "deviate": {
    "scores":"learn:10; bond:10"
  },
  "devices": {
    "scores":"learn:10"
  },
  "devil": {
    "scores":"learn:10; feel:10"
  },
  "devise": {
    "scores":"acquire:10; feel:10"
  },
  "devour": {
    "scores":"acquire:10"
  },
  "diagram": {
    "scores":"feel:10"
  },
  "dicker": {
    "scores":"bond:10"
  },
  "diddle": {
    "scores":"feel:10"
  },
  "die": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "difficult": {
    "scores":"learn:10"
  },
  "dig": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "diggings": {
    "scores":"learn:10"
  },
  "digit": {
    "scores":"feel:10"
  },
  "digs": {
    "scores":"learn:10"
  },
  "dilapidated": {
    "scores":"learn:10"
  },
  "dilemma": {
    "scores":"learn:10; bond:10"
  },
  "dilute": {
    "scores":"bond:10"
  },
  "dim": {
    "scores":"feel:10"
  },
  "dimension": {
    "scores":"bond:10"
  },
  "diminish": {
    "scores":"acquire:10; learn:10"
  },
  "diminutive": {
    "scores":"bond:10"
  },
  "dimwit": {
    "scores":"feel:10"
  },
  "dinky": {
    "scores":"bond:10"
  },
  "dip": {
    "scores":"learn:10; feel:10"
  },
  "direct": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "direction": {
    "scores":"learn:10"
  },
  "dirt": {
    "scores":"acquire:10"
  },
  "dirty": {
    "scores":"bond:10"
  },
  "dis": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "disapprove": {
    "scores":"learn:10; feel:10"
  },
  "disburse": {
    "scores":"learn:10"
  },
  "discern": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "discerning": {
    "scores":"learn:10"
  },
  "discharge": {
    "scores":"learn:10"
  },
  "disclose": {
    "scores":"learn:10"
  },
  "discombobulate": {
    "scores":"feel:10"
  },
  "discontinue": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "discount": {
    "scores":"learn:10; feel:10"
  },
  "discover": {
    "scores":"learn:10; feel:10"
  },
  "discreetness": {
    "scores":"feel:10"
  },
  "discretion": {
    "scores":"learn:10; feel:10"
  },
  "disdain": {
    "scores":"feel:10"
  },
  "disembowel": {
    "scores":"acquire:10"
  },
  "disfigure": {
    "scores":"defend:10"
  },
  "disguise": {
    "scores":"defend:10; feel:10"
  },
  "dismantle": {
    "scores":"acquire:10"
  },
  "dismember": {
    "scores":"acquire:10; defend:10"
  },
  "dismiss": {
    "scores":"learn:10"
  },
  "dismount": {
    "scores":"acquire:10"
  },
  "disorient": {
    "scores":"feel:10"
  },
  "disparage": {
    "scores":"learn:10"
  },
  "dispatch": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "dispense": {
    "scores":"bond:10"
  },
  "dispose": {
    "scores":"acquire:10; feel:10"
  },
  "disposition": {
    "scores":"learn:10; bond:10"
  },
  "dispraise": {
    "scores":"acquire:10"
  },
  "disquisition": {
    "scores":"learn:10"
  },
  "disrate": {
    "scores":"defend:10"
  },
  "disregard": {
    "scores":"feel:10"
  },
  "disrespect": {
    "scores":"feel:10"
  },
  "disrupt": {
    "scores":"defend:10"
  },
  "dissect": {
    "scores":"bond:10"
  },
  "dissemble": {
    "scores":"acquire:10; feel:10"
  },
  "dissimulate": {
    "scores":"acquire:10; feel:10"
  },
  "dissipate": {
    "scores":"defend:10"
  },
  "distinguish": {
    "scores":"learn:10; feel:10"
  },
  "distintegrate": {
    "scores":"defend:10"
  },
  "distribute": {
    "scores":"feel:10; bond:10"
  },
  "dive": {
    "scores":"learn:10"
  },
  "diverge": {
    "scores":"learn:10; bond:10"
  },
  "divert": {
    "scores":"learn:10; bond:10"
  },
  "divulge": {
    "scores":"learn:10"
  },
  "dock": {
    "scores":"acquire:10; bond:10"
  },
  "doctor": {
    "scores":"acquire:10; feel:10"
  },
  "document": {
    "scores":"acquire:10"
  },
  "documentation": {
    "scores":"feel:10"
  },
  "dodo": {
    "scores":"feel:10"
  },
  "dog": {
    "scores":"learn:10"
  },
  "doine": {
    "scores":"acquire:10; learn:10"
  },
  "doing": {
    "scores":"feel:10"
  },
  "dole": {
    "scores":"bond:10"
  },
  "dolly": {
    "scores":"feel:10"
  },
  "dolt": {
    "scores":"feel:10"
  },
  "dominant": {
    "scores":"learn:10"
  },
  "dominion": {
    "scores":"feel:10"
  },
  "donkey": {
    "scores":"feel:10"
  },
  "doofus": {
    "scores":"feel:10"
  },
  "dope": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "doppelg": {
    "scores":"feel:10"
  },
  "dork": {
    "scores":"feel:10"
  },
  "doss": {
    "scores":"learn:10"
  },
  "double": {
    "scores":"learn:10; feel:10; bond:10"
  },
  "doubtlessness": {
    "scores":"bond:10"
  },
  "douse": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "downgrade": {
    "scores":"defend:10"
  },
  "downscale": {
    "scores":"acquire:10"
  },
  "downsize": {
    "scores":"acquire:10"
  },
  "dozen": {
    "scores":"bond:10"
  },
  "draft": {
    "scores":"acquire:10; feel:10"
  },
  "drag": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "dragoon": {
    "scores":"acquire:10; feel:10"
  },
  "drain": {
    "scores":"acquire:10; defend:10"
  },
  "dram": {
    "scores":"feel:10"
  },
  "draw": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "dread": {
    "scores":"learn:10"
  },
  "dream": {
    "scores":"feel:10"
  },
  "dredge": {
    "scores":"learn:10; feel:10"
  },
  "dress": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "driblet": {
    "scores":"feel:10"
  },
  "drift": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "drive": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "drop": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "drove": {
    "scores":"learn:10"
  },
  "drub": {
    "scores":"learn:10"
  },
  "drubbing": {
    "scores":"learn:10"
  },
  "drudge": {
    "scores":"learn:10"
  },
  "drum": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "druthers": {
    "scores":"learn:10"
  },
  "dub": {
    "scores":"defend:10; feel:10"
  },
  "duck": {
    "scores":"learn:10; feel:10"
  },
  "dullard": {
    "scores":"feel:10"
  },
  "dum": {
    "scores":"feel:10"
  },
  "dumbbell": {
    "scores":"feel:10"
  },
  "dumbhead": {
    "scores":"feel:10"
  },
  "dummkopf": {
    "scores":"feel:10"
  },
  "dummy": {
    "scores":"acquire:10; feel:10"
  },
  "dumpy": {
    "scores":"learn:10"
  },
  "dunce": {
    "scores":"feel:10"
  },
  "dunderhead": {
    "scores":"feel:10"
  },
  "dupe": {
    "scores":"learn:10"
  },
  "duper": {
    "scores":"bond:10"
  },
  "duplicate": {
    "scores":"feel:10"
  },
  "duplication": {
    "scores":"feel:10"
  },
  "dust": {
    "scores":"acquire:10; learn:10"
  },
  "dwarfish": {
    "scores":"bond:10"
  },
  "dwindle": {
    "scores":"acquire:10"
  },
  "eared": {
    "scores":"learn:10"
  },
  "earnings": {
    "scores":"acquire:10"
  },
  "ease": {
    "scores":"acquire:10"
  },
  "eat": {
    "scores":"feel:10"
  },
  "eaten": {
    "scores":"learn:10"
  },
  "echo": {
    "scores":"feel:10"
  },
  "Eden": {
    "scores":"acquire:10"
  },
  "edge": {
    "scores":"acquire:10; learn:10"
  },
  "edit": {
    "scores":"acquire:10; feel:10"
  },
  "editorialize": {
    "scores":"feel:10"
  },
  "educated": {
    "scores":"learn:10"
  },
  "efface": {
    "scores":"learn:10"
  },
  "effectuate": {
    "scores":"acquire:10; feel:10"
  },
  "effloresce": {
    "scores":"defend:10"
  },
  "effortful": {
    "scores":"learn:10"
  },
  "egg": {
    "scores":"learn:10; feel:10"
  },
  "ego": {
    "scores":"feel:10"
  },
  "egotism": {
    "scores":"feel:10"
  },
  "elapse": {
    "scores":"learn:10; feel:10"
  },
  "elect": {
    "scores":"learn:10"
  },
  "election": {
    "scores":"learn:10"
  },
  "electrify": {
    "scores":"learn:10"
  },
  "elephantine": {
    "scores":"bond:10"
  },
  "elevate": {
    "scores":"defend:10; learn:10"
  },
  "elite": {
    "scores":"learn:10"
  },
  "elongate": {
    "scores":"acquire:10; bond:10"
  },
  "Elysium": {
    "scores":"acquire:10"
  },
  "embarrass": {
    "scores":"feel:10; bond:10"
  },
  "embarrassment": {
    "scores":"bond:10"
  },
  "embed": {
    "scores":"learn:10"
  },
  "embrace": {
    "scores":"acquire:10"
  },
  "embracing": {
    "scores":"defend:10"
  },
  "embracive": {
    "scores":"defend:10"
  },
  "emotion": {
    "scores":"feel:10"
  },
  "empathetic": {
    "scores":"feel:10"
  },
  "empathic": {
    "scores":"feel:10"
  },
  "emplace": {
    "scores":"acquire:10; feel:10"
  },
  "empower": {
    "scores":"acquire:10; feel:10"
  },
  "empyrean": {
    "scores":"acquire:10"
  },
  "emulate": {
    "scores":"acquire:10; feel:10"
  },
  "enactment": {
    "scores":"feel:10"
  },
  "encage": {
    "scores":"defend:10"
  },
  "encase": {
    "scores":"defend:10"
  },
  "encasement": {
    "scores":"defend:10"
  },
  "enchain": {
    "scores":"bond:10"
  },
  "enchant": {
    "scores":"learn:10"
  },
  "encompass": {
    "scores":"acquire:10"
  },
  "encounter": {
    "scores":"learn:10"
  },
  "encourage": {
    "scores":"acquire:100"
  },
  "encumber": {
    "scores":"feel:10; bond:10"
  },
  "end": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "endamage": {
    "scores":"defend:10"
  },
  "endeavor": {
    "scores":"learn:10; feel:10"
  },
  "endorse": {
    "scores":"defend:10"
  },
  "endure": {
    "scores":"defend:10; feel:10"
  },
  "enfetter": {
    "scores":"bond:10"
  },
  "engage": {
    "scores":"learn:10"
  },
  "engender": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "engird": {
    "scores":"bond:10"
  },
  "engirdle": {
    "scores":"bond:10"
  },
  "engross": {
    "scores":"learn:10"
  },
  "enjoy": {
    "scores":"acquire:10; feel:10"
  },
  "enlarge": {
    "scores":"acquire:10"
  },
  "enmesh": {
    "scores":"learn:10"
  },
  "enormous": {
    "scores":"bond:10"
  },
  "enrapture": {
    "scores":"acquire:10"
  },
  "enroot": {
    "scores":"learn:10"
  },
  "enshroud": {
    "scores":"defend:10"
  },
  "ensnare": {
    "scores":"learn:10"
  },
  "ensnarl": {
    "scores":"learn:10"
  },
  "entail": {
    "scores":"acquire:10"
  },
  "entertain": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "enthrall": {
    "scores":"acquire:10; learn:10"
  },
  "entoil": {
    "scores":"learn:10"
  },
  "entrap": {
    "scores":"learn:10"
  },
  "entrust": {
    "scores":"feel:10"
  },
  "enunciate": {
    "scores":"acquire:10; feel:10"
  },
  "envelop": {
    "scores":"defend:10"
  },
  "envisage": {
    "scores":"feel:10"
  },
  "envision": {
    "scores":"feel:10"
  },
  "enwind": {
    "scores":"bond:10"
  },
  "enwrap": {
    "scores":"learn:10"
  },
  "epithet": {
    "scores":"learn:10"
  },
  "equal": {
    "scores":"acquire:10; feel:10"
  },
  "eradicate": {
    "scores":"learn:10"
  },
  "erase": {
    "scores":"learn:10"
  },
  "erect": {
    "scores":"acquire:10; feel:10"
  },
  "erode": {
    "scores":"learn:10"
  },
  "erratic": {
    "scores":"learn:10"
  },
  "erratically": {
    "scores":"learn:10"
  },
  "escalate": {
    "scores":"acquire:10"
  },
  "espy": {
    "scores":"learn:10; feel:10"
  },
  "essay": {
    "scores":"feel:10"
  },
  "essence": {
    "scores":"learn:10"
  },
  "estate": {
    "scores":"acquire:10"
  },
  "esteem": {
    "scores":"acquire:10; feel:10"
  },
  "estimation": {
    "scores":"feel:10"
  },
  "etiquette": {
    "scores":"acquire:10"
  },
  "euchre": {
    "scores":"feel:10"
  },
  "evidence": {
    "scores":"feel:10"
  },
  "eviscerate": {
    "scores":"acquire:10"
  },
  "exact": {
    "scores":"acquire:10; feel:10"
  },
  "exacting": {
    "scores":"learn:10"
  },
  "examen": {
    "scores":"learn:10"
  },
  "examination": {
    "scores":"learn:10; feel:10"
  },
  "examine": {
    "scores":"learn:10; feel:10"
  },
  "exasperate": {
    "scores":"feel:10"
  },
  "excavate": {
    "scores":"learn:10"
  },
  "excite": {
    "scores":"learn:10"
  },
  "excogitate": {
    "scores":"acquire:10; feel:10"
  },
  "excoriation": {
    "scores":"feel:10"
  },
  "excuse": {
    "scores":"defend:10"
  },
  "execute": {
    "scores":"acquire:10; feel:10"
  },
  "exhaust": {
    "scores":"acquire:10"
  },
  "exhaustive": {
    "scores":"defend:10"
  },
  "exhilarate": {
    "scores":"learn:10"
  },
  "exit": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "expand": {
    "scores":"acquire:10"
  },
  "expansion": {
    "scores":"acquire:10"
  },
  "expel": {
    "scores":"defend:10; learn:10"
  },
  "expend": {
    "scores":"acquire:10; learn:10"
  },
  "experienced": {
    "scores":"learn:10"
  },
  "expert": {
    "scores":"learn:10"
  },
  "expertise": {
    "scores":"feel:10"
  },
  "expire": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "explode": {
    "scores":"defend:10"
  },
  "exploit": {
    "scores":"feel:10"
  },
  "exploration": {
    "scores":"learn:10"
  },
  "explosive": {
    "scores":"acquire:10"
  },
  "expose": {
    "scores":"learn:10"
  },
  "expound": {
    "scores":"feel:10"
  },
  "express": {
    "scores":"acquire:10; feel:10"
  },
  "expression": {
    "scores":"feel:10"
  },
  "expressway": {
    "scores":"feel:10"
  },
  "expunge": {
    "scores":"learn:10"
  },
  "extemporary": {
    "scores":"bond:10"
  },
  "extempore": {
    "scores":"bond:10"
  },
  "extend": {
    "scores":"learn:10; bond:10"
  },
  "extended": {
    "scores":"bond:10"
  },
  "extent": {
    "scores":"bond:10"
  },
  "exterminate": {
    "scores":"learn:10"
  },
  "extinguish": {
    "scores":"acquire:10"
  },
  "extirpate": {
    "scores":"learn:10"
  },
  "extrapolate": {
    "scores":"acquire:10; feel:10"
  },
  "extrasensory": {
    "scores":"feel:10"
  },
  "extrude": {
    "scores":"learn:10"
  },
  "eye": {
    "scores":"learn:10; feel:10; bond:10"
  },
  "fabricate": {
    "scores":"acquire:10; feel:10"
  },
  "fabulous": {
    "scores":"acquire:10; feel:10"
  },
  "facade": {
    "scores":"feel:10"
  },
  "face": {
    "scores":"learn:10; feel:10; bond:10"
  },
  "faced": {
    "scores":"learn:10"
  },
  "facetious": {
    "scores":"learn:10"
  },
  "facsimile": {
    "scores":"feel:10"
  },
  "factor": {
    "scores":"feel:10"
  },
  "fag": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "fail": {
    "scores":"defend:10"
  },
  "fairness": {
    "scores":"feel:10"
  },
  "fake": {
    "scores":"learn:10; feel:10"
  },
  "fall": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "faltering": {
    "scores":"defend:10"
  },
  "familiarize": {
    "scores":"learn:10"
  },
  "fanciful": {
    "scores":"acquire:10; feel:10"
  },
  "fancy": {
    "scores":"learn:10; feel:10"
  },
  "fantasied": {
    "scores":"acquire:10; feel:10"
  },
  "fantasize": {
    "scores":"feel:10"
  },
  "fantastic": {
    "scores":"acquire:10; feel:10"
  },
  "fantasy": {
    "scores":"feel:10"
  },
  "fantasyland": {
    "scores":"acquire:10"
  },
  "fare": {
    "scores":"acquire:10; feel:10"
  },
  "farrago": {
    "scores":"acquire:10; learn:10"
  },
  "fascinate": {
    "scores":"learn:10"
  },
  "fashion": {
    "scores":"acquire:10; feel:10"
  },
  "fast": {
    "scores":"learn:10; feel:10"
  },
  "fastness": {
    "scores":"feel:10"
  },
  "fat": {
    "scores":"learn:10"
  },
  "fathead": {
    "scores":"feel:10"
  },
  "fathom": {
    "scores":"feel:10"
  },
  "fatigue": {
    "scores":"acquire:10; defend:10"
  },
  "fault": {
    "scores":"acquire:10; feel:10"
  },
  "favor": {
    "scores":"feel:10"
  },
  "fearfulness": {
    "scores":"learn:10"
  },
  "feat": {
    "scores":"feel:10"
  },
  "feature": {
    "scores":"feel:10"
  },
  "federate": {
    "scores":"bond:10"
  },
  "fee": {
    "scores":"learn:10; feel:10"
  },
  "feel": {
    "scores":"acquire:10; feel:10"
  },
  "feeling": {
    "scores":"feel:10"
  },
  "fell": {
    "scores":"acquire:10"
  },
  "fence": {
    "scores":"acquire:10; defend:100; defend:10; learn:10"
  },
  "fend": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "ferment": {
    "scores":"learn:10"
  },
  "ferocious": {
    "scores":"acquire:10"
  },
  "ferret": {
    "scores":"learn:10; feel:10"
  },
  "ferry": {
    "scores":"acquire:10"
  },
  "fess": {
    "scores":"feel:10"
  },
  "fetch": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "fetter": {
    "scores":"feel:10; bond:10"
  },
  "fettle": {
    "scores":"acquire:10"
  },
  "fictional": {
    "scores":"acquire:10; feel:10"
  },
  "fictitious": {
    "scores":"acquire:10; feel:10"
  },
  "fiddle": {
    "scores":"defend:10; feel:10"
  },
  "fiend": {
    "scores":"learn:10"
  },
  "fierce": {
    "scores":"acquire:10"
  },
  "fight": {
    "scores":"feel:10"
  },
  "figure": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "figures": {
    "scores":"feel:10"
  },
  "figuring": {
    "scores":"feel:10"
  },
  "file": {
    "scores":"learn:10"
  },
  "fillip": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "film": {
    "scores":"defend:10"
  },
  "filmdom": {
    "scores":"defend:10"
  },
  "filmland": {
    "scores":"defend:10"
  },
  "filmmaking": {
    "scores":"defend:10"
  },
  "filter": {
    "scores":"defend:10"
  },
  "fine": {
    "scores":"acquire:10; feel:10; bond:10"
  },
  "finish": {
    "scores":"learn:10; feel:10"
  },
  "fire": {
    "scores":"learn:10"
  },
  "firm": {
    "scores":"feel:10"
  },
  "firma": {
    "scores":"acquire:10"
  },
  "fish": {
    "scores":"learn:10; feel:10"
  },
  "fistful": {
    "scores":"bond:10"
  },
  "fit": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "fix": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "flash": {
    "scores":"feel:10"
  },
  "flat": {
    "scores":"learn:10"
  },
  "flatline": {
    "scores":"feel:10"
  },
  "flatten": {
    "scores":"learn:10"
  },
  "flavor": {
    "scores":"feel:10"
  },
  "flaw": {
    "scores":"defend:10"
  },
  "flee": {
    "scores":"defend:10; learn:10"
  },
  "flight": {
    "scores":"learn:10"
  },
  "flimflam": {
    "scores":"feel:10"
  },
  "fling": {
    "scores":"feel:10"
  },
  "flip": {
    "scores":"learn:10"
  },
  "float": {
    "scores":"acquire:10"
  },
  "flock": {
    "scores":"learn:10"
  },
  "floor": {
    "scores":"acquire:10"
  },
  "flower": {
    "scores":"defend:10; learn:10"
  },
  "flub": {
    "scores":"defend:10; feel:10"
  },
  "fluff": {
    "scores":"defend:10; feel:10"
  },
  "flume": {
    "scores":"feel:10"
  },
  "flummox": {
    "scores":"feel:10"
  },
  "flux": {
    "scores":"learn:10"
  },
  "fly": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "fob": {
    "scores":"feel:10"
  },
  "follow": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "foment": {
    "scores":"learn:10"
  },
  "fondness": {
    "scores":"feel:10"
  },
  "font": {
    "scores":"learn:10"
  },
  "fool": {
    "scores":"learn:10; feel:10"
  },
  "foot": {
    "scores":"learn:10"
  },
  "footing": {
    "scores":"learn:10; bond:10"
  },
  "footpath": {
    "scores":"learn:10"
  },
  "foozle": {
    "scores":"defend:10; feel:10"
  },
  "forage": {
    "scores":"learn:10"
  },
  "forecast": {
    "scores":"feel:10"
  },
  "foreman": {
    "scores":"learn:10"
  },
  "forfend": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "forge": {
    "scores":"acquire:10; feel:10"
  },
  "forget": {
    "scores":"feel:10"
  },
  "forgive": {
    "scores":"feel:10"
  },
  "fork": {
    "scores":"learn:10"
  },
  "form": {
    "scores":"acquire:10; acquire:100; defend:10; feel:10"
  },
  "formality": {
    "scores":"acquire:10"
  },
  "format": {
    "scores":"acquire:10"
  },
  "formidable": {
    "scores":"learn:10"
  },
  "formulate": {
    "scores":"acquire:10; feel:10"
  },
  "fortification": {
    "scores":"feel:10"
  },
  "fortress": {
    "scores":"feel:10"
  },
  "forward": {
    "scores":"acquire:10"
  },
  "foster": {
    "scores":"acquire:10"
  },
  "foul": {
    "scores":"defend:10; feel:10"
  },
  "foundation": {
    "scores":"learn:10"
  },
  "founded": {
    "scores":"feel:10"
  },
  "fountain": {
    "scores":"learn:10"
  },
  "fountainhead": {
    "scores":"learn:10"
  },
  "fox": {
    "scores":"feel:10"
  },
  "fracture": {
    "scores":"defend:10"
  },
  "fragment": {
    "scores":"defend:10"
  },
  "fragrancy": {
    "scores":"feel:10"
  },
  "frame": {
    "scores":"acquire:10; feel:10"
  },
  "fraternize": {
    "scores":"learn:10"
  },
  "fray": {
    "scores":"learn:10; feel:10"
  },
  "frazzle": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "freak": {
    "scores":"learn:10"
  },
  "free": {
    "scores":"learn:10"
  },
  "freeway": {
    "scores":"feel:10"
  },
  "freight": {
    "scores":"feel:10"
  },
  "frenzy": {
    "scores":"learn:10"
  },
  "fresh": {
    "scores":"learn:10"
  },
  "fret": {
    "scores":"learn:10"
  },
  "fright": {
    "scores":"learn:10"
  },
  "fritter": {
    "scores":"defend:10"
  },
  "frost": {
    "scores":"feel:10"
  },
  "fuddle": {
    "scores":"feel:10"
  },
  "fulfill": {
    "scores":"acquire:10; feel:10"
  },
  "fulfillment": {
    "scores":"feel:10"
  },
  "fumble": {
    "scores":"defend:10; feel:10"
  },
  "furbish": {
    "scores":"learn:10"
  },
  "furious": {
    "scores":"acquire:10"
  },
  "furrow": {
    "scores":"defend:10"
  },
  "fuse": {
    "scores":"learn:10; bond:10"
  },
  "gabbler": {
    "scores":"feel:10"
  },
  "gad": {
    "scores":"acquire:10"
  },
  "gaff": {
    "scores":"learn:10; feel:10"
  },
  "gaffe": {
    "scores":"feel:10"
  },
  "gage": {
    "scores":"bond:10"
  },
  "gain": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "galactic": {
    "scores":"bond:10"
  },
  "gall": {
    "scores":"learn:10; feel:10"
  },
  "gallimaufry": {
    "scores":"acquire:10; learn:10"
  },
  "gallivant": {
    "scores":"acquire:10"
  },
  "gallop": {
    "scores":"learn:10"
  },
  "galvanize": {
    "scores":"learn:10"
  },
  "gamble": {
    "scores":"acquire:10; feel:10"
  },
  "game": {
    "scores":"learn:10; bond:10"
  },
  "gammon": {
    "scores":"learn:10"
  },
  "gander": {
    "scores":"feel:10"
  },
  "gap": {
    "scores":"feel:10"
  },
  "garb": {
    "scores":"feel:10"
  },
  "gargantuan": {
    "scores":"bond:10"
  },
  "garner": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "gasbag": {
    "scores":"feel:10"
  },
  "gasconade": {
    "scores":"defend:10"
  },
  "gash": {
    "scores":"bond:10"
  },
  "gather": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "gatherum": {
    "scores":"acquire:10; learn:10"
  },
  "gauge": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "geek": {
    "scores":"learn:10"
  },
  "gem": {
    "scores":"learn:10"
  },
  "generate": {
    "scores":"acquire:10; feel:10"
  },
  "genius": {
    "scores":"learn:10"
  },
  "geometry": {
    "scores":"acquire:10; feel:10"
  },
  "germ": {
    "scores":"learn:10"
  },
  "getaway": {
    "scores":"learn:10"
  },
  "getup": {
    "scores":"acquire:10"
  },
  "giant": {
    "scores":"bond:10"
  },
  "gibe": {
    "scores":"learn:10"
  },
  "gigantesque": {
    "scores":"bond:10"
  },
  "gigantic": {
    "scores":"bond:10"
  },
  "gill": {
    "scores":"learn:10; feel:10"
  },
  "gimmick": {
    "scores":"acquire:10; learn:10"
  },
  "gird": {
    "scores":"learn:10"
  },
  "girdle": {
    "scores":"bond:10"
  },
  "girt": {
    "scores":"bond:10"
  },
  "girth": {
    "scores":"bond:10"
  },
  "gist": {
    "scores":"learn:10"
  },
  "glance": {
    "scores":"feel:10"
  },
  "glimmer": {
    "scores":"feel:10"
  },
  "glimpse": {
    "scores":"feel:10"
  },
  "global": {
    "scores":"defend:10"
  },
  "glom": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "glory": {
    "scores":"feel:10"
  },
  "gloss": {
    "scores":"learn:10; feel:10"
  },
  "gloze": {
    "scores":"feel:10"
  },
  "gluey": {
    "scores":"bond:10"
  },
  "glutinous": {
    "scores":"bond:10"
  },
  "goad": {
    "scores":"learn:10"
  },
  "gobs": {
    "scores":"bond:10"
  },
  "going": {
    "scores":"feel:10"
  },
  "golem": {
    "scores":"feel:10"
  },
  "good": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "goof": {
    "scores":"defend:10; feel:10"
  },
  "goon": {
    "scores":"feel:10"
  },
  "goose": {
    "scores":"learn:10"
  },
  "gore": {
    "scores":"learn:10"
  },
  "gorge": {
    "scores":"feel:10"
  },
  "gorgeousness": {
    "scores":"feel:10"
  },
  "gotcha": {
    "scores":"acquire:10; learn:10"
  },
  "govern": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "grab": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "grace": {
    "scores":"learn:10"
  },
  "grand": {
    "scores":"learn:10; bond:10"
  },
  "grant": {
    "scores":"feel:10"
  },
  "graphic": {
    "scores":"feel:10"
  },
  "grapple": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "grasp": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "grate": {
    "scores":"feel:10"
  },
  "gravel": {
    "scores":"feel:10"
  },
  "gray": {
    "scores":"feel:10"
  },
  "great": {
    "scores":"learn:10"
  },
  "greatest": {
    "scores":"learn:10"
  },
  "green": {
    "scores":"feel:10"
  },
  "grind": {
    "scores":"learn:10"
  },
  "grip": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "gripe": {
    "scores":"feel:10"
  },
  "grok": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "groove": {
    "scores":"learn:10"
  },
  "gross": {
    "scores":"learn:10"
  },
  "ground": {
    "scores":"acquire:10; learn:10"
  },
  "grounded": {
    "scores":"feel:10"
  },
  "groundwork": {
    "scores":"learn:10"
  },
  "group": {
    "scores":"acquire:10; learn:10"
  },
  "grouping": {
    "scores":"bond:10"
  },
  "grow": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "grub": {
    "scores":"learn:10"
  },
  "grueling": {
    "scores":"learn:10"
  },
  "grungy": {
    "scores":"learn:10"
  },
  "guarantee": {
    "scores":"acquire:10; defend:10; bond:10"
  },
  "guarantor": {
    "scores":"bond:10"
  },
  "guaranty": {
    "scores":"acquire:10; defend:10; bond:10"
  },
  "guard": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "guardian": {
    "scores":"defend:10"
  },
  "guardianship": {
    "scores":"defend:10"
  },
  "guardroom": {
    "scores":"feel:10"
  },
  "guess": {
    "scores":"acquire:10; feel:10"
  },
  "guide": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "guise": {
    "scores":"feel:10"
  },
  "gulch": {
    "scores":"feel:10"
  },
  "gulf": {
    "scores":"feel:10"
  },
  "gull": {
    "scores":"learn:10"
  },
  "gulp": {
    "scores":"acquire:10"
  },
  "gumbo": {
    "scores":"acquire:10; learn:10"
  },
  "gummy": {
    "scores":"bond:10"
  },
  "gumption": {
    "scores":"feel:10"
  },
  "guru": {
    "scores":"learn:10"
  },
  "guts": {
    "scores":"acquire:10"
  },
  "guy": {
    "scores":"learn:10; feel:10"
  },
  "guzzle": {
    "scores":"acquire:10"
  },
  "gyp": {
    "scores":"feel:10"
  },
  "gyrate": {
    "scores":"learn:10; bond:10"
  },
  "gyve": {
    "scores":"bond:10"
  },
  "habit": {
    "scores":"acquire:10; feel:10"
  },
  "habitude": {
    "scores":"learn:10"
  },
  "hack": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "haggle": {
    "scores":"bond:10"
  },
  "hail": {
    "scores":"feel:10"
  },
  "hale": {
    "scores":"acquire:10; feel:10"
  },
  "half": {
    "scores":"feel:10; bond:10"
  },
  "halo": {
    "scores":"feel:10"
  },
  "halt": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "hammer": {
    "scores":"acquire:10; learn:10"
  },
  "hammerhead": {
    "scores":"feel:10"
  },
  "hand": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "handbag": {
    "scores":"acquire:10"
  },
  "handcuff": {
    "scores":"feel:10; bond:10"
  },
  "handgrip": {
    "scores":"feel:10"
  },
  "handhold": {
    "scores":"feel:10"
  },
  "handicap": {
    "scores":"feel:10; bond:10"
  },
  "handle": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "handpick": {
    "scores":"learn:10"
  },
  "handsomeness": {
    "scores":"feel:10"
  },
  "hang": {
    "scores":"learn:10"
  },
  "hanker": {
    "scores":"feel:10"
  },
  "hap": {
    "scores":"acquire:10; feel:10"
  },
  "haphazard": {
    "scores":"learn:10"
  },
  "haphazardly": {
    "scores":"learn:10"
  },
  "happen": {
    "scores":"learn:10"
  },
  "harass": {
    "scores":"acquire:10; defend:10"
  },
  "hardhead": {
    "scores":"feel:10"
  },
  "hare": {
    "scores":"defend:10; learn:10"
  },
  "hark": {
    "scores":"learn:10; feel:10"
  },
  "harken": {
    "scores":"learn:10; feel:10"
  },
  "harm": {
    "scores":"defend:10"
  },
  "harpoon": {
    "scores":"learn:10"
  },
  "hash": {
    "scores":"acquire:10; learn:10"
  },
  "hassle": {
    "scores":"learn:10"
  },
  "hasten": {
    "scores":"defend:10; learn:10"
  },
  "hat": {
    "scores":"feel:10; bond:10"
  },
  "haul": {
    "scores":"acquire:10"
  },
  "haymaker": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "head": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "headman": {
    "scores":"learn:10"
  },
  "headpiece": {
    "scores":"feel:10"
  },
  "heal": {
    "scores":"acquire:10; feel:10"
  },
  "health": {
    "scores":"acquire:10"
  },
  "heap": {
    "scores":"bond:10"
  },
  "hear": {
    "scores":"acquire:10; learn:10"
  },
  "hearing": {
    "scores":"feel:10"
  },
  "hearken": {
    "scores":"learn:10; feel:10"
  },
  "heart": {
    "scores":"learn:10"
  },
  "hearted": {
    "scores":"feel:10"
  },
  "heartedness": {
    "scores":"feel:10"
  },
  "heartstrings": {
    "scores":"feel:10"
  },
  "hearty": {
    "scores":"feel:10"
  },
  "heat": {
    "scores":"acquire:10; bond:10"
  },
  "heath": {
    "scores":"acquire:10"
  },
  "heave": {
    "scores":"defend:10; learn:10"
  },
  "heaven": {
    "scores":"acquire:10"
  },
  "heavy": {
    "scores":"learn:10"
  },
  "hedge": {
    "scores":"defend:10"
  },
  "heed": {
    "scores":"learn:10"
  },
  "heels": {
    "scores":"learn:10"
  },
  "heft": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "heighten": {
    "scores":"defend:10; learn:10"
  },
  "hellacious": {
    "scores":"learn:10"
  },
  "helmsman": {
    "scores":"learn:10"
  },
  "helping": {
    "scores":"defend:10"
  },
  "helter": {
    "scores":"learn:10"
  },
  "hem": {
    "scores":"defend:10"
  },
  "herald": {
    "scores":"feel:10"
  },
  "herculean": {
    "scores":"learn:10; bond:10"
  },
  "herd": {
    "scores":"learn:10"
  },
  "heroic": {
    "scores":"bond:10"
  },
  "hesitance": {
    "scores":"defend:10"
  },
  "hesitancy": {
    "scores":"defend:10"
  },
  "hie": {
    "scores":"defend:10; learn:10"
  },
  "high": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "highball": {
    "scores":"defend:10; learn:10"
  },
  "highest": {
    "scores":"learn:10"
  },
  "hightail": {
    "scores":"defend:10; learn:10"
  },
  "highway": {
    "scores":"feel:10"
  },
  "hike": {
    "scores":"defend:10; learn:10"
  },
  "Himalayan": {
    "scores":"bond:10"
  },
  "hinder": {
    "scores":"feel:10; bond:10"
  },
  "hindrance": {
    "scores":"bond:10"
  },
  "hinge": {
    "scores":"learn:10"
  },
  "hint": {
    "scores":"feel:10"
  },
  "hip": {
    "scores":"learn:10"
  },
  "hire": {
    "scores":"learn:10"
  },
  "hit": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "hitch": {
    "scores":"acquire:10; defend:10; learn:10; bond:10"
  },
  "hitter": {
    "scores":"defend:10"
  },
  "hoax": {
    "scores":"learn:10"
  },
  "hobble": {
    "scores":"feel:10; bond:10"
  },
  "hobnob": {
    "scores":"learn:10"
  },
  "hoc": {
    "scores":"bond:10"
  },
  "hock": {
    "scores":"feel:10"
  },
  "hodgepodge": {
    "scores":"acquire:10; learn:10"
  },
  "hog": {
    "scores":"feel:10; bond:10"
  },
  "hoist": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "hold": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "holdall": {
    "scores":"acquire:10"
  },
  "holdback": {
    "scores":"bond:10"
  },
  "hole": {
    "scores":"learn:10; bond:10"
  },
  "holler": {
    "scores":"feel:10"
  },
  "hollo": {
    "scores":"feel:10"
  },
  "honcho": {
    "scores":"learn:10"
  },
  "hone": {
    "scores":"learn:10"
  },
  "honker": {
    "scores":"learn:10; feel:10"
  },
  "hood": {
    "scores":"defend:10"
  },
  "hoodwink": {
    "scores":"learn:10"
  },
  "hook": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "hookup": {
    "scores":"bond:10"
  },
  "hoop": {
    "scores":"bond:10"
  },
  "hoosegow": {
    "scores":"feel:10"
  },
  "horde": {
    "scores":"learn:10"
  },
  "hornswoggle": {
    "scores":"learn:10"
  },
  "horrify": {
    "scores":"learn:10"
  },
  "horror": {
    "scores":"learn:10"
  },
  "horse": {
    "scores":"feel:10; bond:10"
  },
  "hose": {
    "scores":"feel:10"
  },
  "host": {
    "scores":"learn:10"
  },
  "hot": {
    "scores":"acquire:10"
  },
  "hotchpotch": {
    "scores":"acquire:10; learn:10"
  },
  "hotdog": {
    "scores":"feel:10"
  },
  "hotfoot": {
    "scores":"defend:10; learn:10"
  },
  "hotshot": {
    "scores":"learn:10"
  },
  "hound": {
    "scores":"learn:10"
  },
  "house": {
    "scores":"defend:10; feel:10"
  },
  "housing": {
    "scores":"defend:10"
  },
  "huddle": {
    "scores":"bond:10"
  },
  "hull": {
    "scores":"defend:10"
  },
  "human": {
    "scores":"learn:10; feel:10"
  },
  "humane": {
    "scores":"feel:10"
  },
  "humanity": {
    "scores":"feel:10"
  },
  "humbug": {
    "scores":"learn:10"
  },
  "humongous": {
    "scores":"bond:10"
  },
  "hump": {
    "scores":"defend:10; learn:10"
  },
  "hunger": {
    "scores":"feel:10"
  },
  "hunt": {
    "scores":"learn:10; feel:10"
  },
  "hurdle": {
    "scores":"bond:10"
  },
  "hurl": {
    "scores":"defend:10; learn:10"
  },
  "hurt": {
    "scores":"defend:10; feel:10"
  },
  "hurtle": {
    "scores":"defend:10; learn:10"
  },
  "hush": {
    "scores":"defend:10"
  },
  "husk": {
    "scores":"defend:10"
  },
  "hustle": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "hyperventilate": {
    "scores":"defend:10"
  },
  "hypnotize": {
    "scores":"learn:10"
  },
  "hypothecate": {
    "scores":"feel:10"
  },
  "hypothesize": {
    "scores":"feel:10"
  },
  "ice": {
    "scores":"acquire:10; defend:10; feel:10; bond:10"
  },
  "iceberg": {
    "scores":"feel:10"
  },
  "icicle": {
    "scores":"feel:10"
  },
  "icon": {
    "scores":"feel:10"
  },
  "ideal": {
    "scores":"acquire:10; feel:10"
  },
  "ideate": {
    "scores":"feel:10"
  },
  "identify": {
    "scores":"bond:10"
  },
  "ignoramus": {
    "scores":"feel:10"
  },
  "ignore": {
    "scores":"feel:10"
  },
  "ill": {
    "scores":"acquire:10; learn:10"
  },
  "illuminati": {
    "scores":"learn:10"
  },
  "image": {
    "scores":"acquire:10; feel:10"
  },
  "imaginal": {
    "scores":"acquire:10; feel:10"
  },
  "imagine": {
    "scores":"acquire:10; feel:10"
  },
  "imagined": {
    "scores":"acquire:10; feel:10"
  },
  "imbecile": {
    "scores":"feel:10"
  },
  "imbibe": {
    "scores":"acquire:10"
  },
  "immense": {
    "scores":"bond:10"
  },
  "immerse": {
    "scores":"learn:10"
  },
  "immure": {
    "scores":"defend:10"
  },
  "immurement": {
    "scores":"feel:10"
  },
  "impact": {
    "scores":"acquire:10; learn:10"
  },
  "impair": {
    "scores":"defend:10"
  },
  "impasse": {
    "scores":"learn:10; bond:10"
  },
  "impede": {
    "scores":"feel:10; bond:10"
  },
  "impediment": {
    "scores":"bond:10"
  },
  "impel": {
    "scores":"acquire:10; feel:10"
  },
  "impersonate": {
    "scores":"feel:10"
  },
  "impertinent": {
    "scores":"learn:10"
  },
  "impinge": {
    "scores":"acquire:10; learn:10"
  },
  "implant": {
    "scores":"learn:10"
  },
  "import": {
    "scores":"feel:10"
  },
  "importance": {
    "scores":"feel:10"
  },
  "impress": {
    "scores":"acquire:10; feel:10"
  },
  "imprint": {
    "scores":"learn:10"
  },
  "imprisonment": {
    "scores":"feel:10"
  },
  "impromptu": {
    "scores":"bond:10"
  },
  "improvisational": {
    "scores":"bond:10"
  },
  "improvised": {
    "scores":"bond:10"
  },
  "impudent": {
    "scores":"learn:10"
  },
  "impulse": {
    "scores":"learn:10"
  },
  "inaccuracy": {
    "scores":"feel:10"
  },
  "incarceration": {
    "scores":"feel:10"
  },
  "incense": {
    "scores":"feel:10"
  },
  "inch": {
    "scores":"learn:10"
  },
  "incise": {
    "scores":"bond:10"
  },
  "incline": {
    "scores":"learn:10"
  },
  "include": {
    "scores":"defend:10"
  },
  "inclusive": {
    "scores":"defend:10"
  },
  "incoming": {
    "scores":"acquire:10"
  },
  "increment": {
    "scores":"acquire:10"
  },
  "incubate": {
    "scores":"acquire:10"
  },
  "indecision": {
    "scores":"defend:10"
  },
  "independence": {
    "scores":"defend:10"
  },
  "indignity": {
    "scores":"learn:10"
  },
  "indisposed": {
    "scores":"learn:10"
  },
  "individual": {
    "scores":"learn:10; feel:10"
  },
  "induce": {
    "scores":"acquire:10; feel:10"
  },
  "indulgence": {
    "scores":"learn:10"
  },
  "inequity": {
    "scores":"bond:10"
  },
  "inflection": {
    "scores":"learn:10"
  },
  "inform": {
    "scores":"learn:10"
  },
  "infringe": {
    "scores":"defend:10"
  },
  "ingrain": {
    "scores":"learn:10"
  },
  "inhibit": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "inhibition": {
    "scores":"bond:10"
  },
  "injure": {
    "scores":"defend:10"
  },
  "injury": {
    "scores":"bond:10"
  },
  "injustice": {
    "scores":"bond:10"
  },
  "inquest": {
    "scores":"learn:10"
  },
  "inquire": {
    "scores":"learn:10; feel:10"
  },
  "inquisition": {
    "scores":"learn:10"
  },
  "inside": {
    "scores":"acquire:10; learn:10"
  },
  "insightful": {
    "scores":"learn:10"
  },
  "insolent": {
    "scores":"learn:10"
  },
  "instigate": {
    "scores":"learn:10"
  },
  "instruct": {
    "scores":"learn:10"
  },
  "instrument": {
    "scores":"feel:10"
  },
  "insure": {
    "scores":"acquire:10; defend:10; bond:10"
  },
  "integer": {
    "scores":"feel:10"
  },
  "intellect": {
    "scores":"feel:10"
  },
  "intellection": {
    "scores":"feel:10"
  },
  "intellectuality": {
    "scores":"feel:10"
  },
  "intent": {
    "scores":"feel:10"
  },
  "intention": {
    "scores":"feel:10"
  },
  "interconnect": {
    "scores":"bond:10"
  },
  "intercourse": {
    "scores":"feel:10"
  },
  "interdict": {
    "scores":"learn:10"
  },
  "interfere": {
    "scores":"feel:10; bond:10"
  },
  "interference": {
    "scores":"bond:10"
  },
  "interfuse": {
    "scores":"bond:10"
  },
  "interlace": {
    "scores":"bond:10"
  },
  "interlink": {
    "scores":"bond:10"
  },
  "interlope": {
    "scores":"learn:10"
  },
  "intermeddle": {
    "scores":"learn:10"
  },
  "internee": {
    "scores":"acquire:10"
  },
  "interpret": {
    "scores":"feel:10"
  },
  "intertwine": {
    "scores":"bond:10"
  },
  "intertwist": {
    "scores":"bond:10"
  },
  "interweave": {
    "scores":"bond:10"
  },
  "intoxicate": {
    "scores":"learn:10"
  },
  "intrigue": {
    "scores":"learn:10"
  },
  "intrude": {
    "scores":"learn:10"
  },
  "intuit": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "invented": {
    "scores":"acquire:10; feel:10"
  },
  "investigate": {
    "scores":"learn:10; feel:10"
  },
  "investigation": {
    "scores":"learn:10"
  },
  "invoke": {
    "scores":"acquire:10; feel:10"
  },
  "involve": {
    "scores":"acquire:10; learn:10"
  },
  "irk": {
    "scores":"feel:10"
  },
  "irons": {
    "scores":"bond:10"
  },
  "irregularly": {
    "scores":"learn:10"
  },
  "irresolution": {
    "scores":"defend:10"
  },
  "italicize": {
    "scores":"acquire:10"
  },
  "itch": {
    "scores":"feel:10"
  },
  "jab": {
    "scores":"learn:10"
  },
  "jabberer": {
    "scores":"feel:10"
  },
  "jack": {
    "scores":"defend:10; learn:10"
  },
  "jackass": {
    "scores":"feel:10"
  },
  "jacket": {
    "scores":"defend:10"
  },
  "jackpot": {
    "scores":"learn:10; bond:10"
  },
  "jailhouse": {
    "scores":"feel:10"
  },
  "jam": {
    "scores":"learn:10; bond:10"
  },
  "jambalaya": {
    "scores":"acquire:10; learn:10"
  },
  "jay": {
    "scores":"feel:10"
  },
  "jeer": {
    "scores":"learn:10"
  },
  "jefe": {
    "scores":"learn:10"
  },
  "jell": {
    "scores":"acquire:10"
  },
  "jerk": {
    "scores":"acquire:10"
  },
  "jet": {
    "scores":"defend:10; learn:10"
  },
  "jewel": {
    "scores":"learn:10"
  },
  "jog": {
    "scores":"learn:10"
  },
  "join": {
    "scores":"bond:10"
  },
  "joint": {
    "scores":"feel:10"
  },
  "joker": {
    "scores":"acquire:10; learn:10"
  },
  "jones": {
    "scores":"feel:10"
  },
  "judge": {
    "scores":"acquire:10; feel:10"
  },
  "judgment": {
    "scores":"feel:10"
  },
  "judicious": {
    "scores":"learn:10"
  },
  "jug": {
    "scores":"feel:10"
  },
  "juggle": {
    "scores":"learn:10"
  },
  "juice": {
    "scores":"acquire:10"
  },
  "jumble": {
    "scores":"acquire:10; learn:10"
  },
  "jumbo": {
    "scores":"bond:10"
  },
  "jump": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "jungle": {
    "scores":"acquire:10; learn:10"
  },
  "jurist": {
    "scores":"feel:10"
  },
  "justice": {
    "scores":"feel:10"
  },
  "justify": {
    "scores":"defend:10"
  },
  "jut": {
    "scores":"acquire:10"
  },
  "karma": {
    "scores":"feel:10"
  },
  "keel": {
    "scores":"feel:10"
  },
  "keeper": {
    "scores":"defend:10"
  },
  "keeping": {
    "scores":"acquire:10; defend:10"
  },
  "kernel": {
    "scores":"learn:10"
  },
  "key": {
    "scores":"learn:10"
  },
  "keynote": {
    "scores":"learn:10"
  },
  "keystone": {
    "scores":"learn:10"
  },
  "kick": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "kill": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "killer": {
    "scores":"learn:10"
  },
  "kilter": {
    "scores":"acquire:10"
  },
  "kind": {
    "scores":"feel:10"
  },
  "kindhearted": {
    "scores":"feel:10"
  },
  "kindheartedness": {
    "scores":"feel:10"
  },
  "kindliness": {
    "scores":"feel:10"
  },
  "kindly": {
    "scores":"feel:10"
  },
  "kindness": {
    "scores":"learn:10; feel:10"
  },
  "king": {
    "scores":"bond:10"
  },
  "kingpin": {
    "scores":"learn:10"
  },
  "kiss": {
    "scores":"learn:10"
  },
  "kit": {
    "scores":"acquire:10"
  },
  "kloof": {
    "scores":"feel:10"
  },
  "knapsack": {
    "scores":"acquire:10"
  },
  "knock": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "knot": {
    "scores":"bond:10"
  },
  "know": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "knowing": {
    "scores":"learn:10"
  },
  "knucklehead": {
    "scores":"feel:10"
  },
  "la": {
    "scores":"acquire:10; learn:10"
  },
  "laborious": {
    "scores":"learn:10"
  },
  "lace": {
    "scores":"bond:10"
  },
  "lacing": {
    "scores":"bond:10"
  },
  "lam": {
    "scores":"learn:10"
  },
  "lamebrain": {
    "scores":"feel:10"
  },
  "lance": {
    "scores":"learn:10"
  },
  "land": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "lange": {
    "scores":"acquire:10; learn:10"
  },
  "lapse": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "largeheartedness": {
    "scores":"feel:10"
  },
  "larrup": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "lash": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "lashings": {
    "scores":"bond:10"
  },
  "latitude": {
    "scores":"learn:10"
  },
  "laugh": {
    "scores":"learn:10"
  },
  "lavish": {
    "scores":"defend:10"
  },
  "lay": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "layout": {
    "scores":"acquire:10"
  },
  "lead": {
    "scores":"learn:10"
  },
  "leader": {
    "scores":"learn:10"
  },
  "leading": {
    "scores":"learn:10"
  },
  "leaf": {
    "scores":"learn:10"
  },
  "league": {
    "scores":"bond:10"
  },
  "leak": {
    "scores":"defend:10"
  },
  "lean": {
    "scores":"feel:10"
  },
  "leaning": {
    "scores":"learn:10"
  },
  "learn": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "lease": {
    "scores":"acquire:10"
  },
  "leave": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "leg": {
    "scores":"defend:10"
  },
  "legion": {
    "scores":"learn:10"
  },
  "legislate": {
    "scores":"acquire:10; feel:10"
  },
  "lengthen": {
    "scores":"acquire:10"
  },
  "lengthy": {
    "scores":"bond:10"
  },
  "lessen": {
    "scores":"acquire:10"
  },
  "let": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "level": {
    "scores":"acquire:10; feel:10"
  },
  "levelheadedness": {
    "scores":"feel:10"
  },
  "leverage": {
    "scores":"acquire:10"
  },
  "leviathan": {
    "scores":"bond:10"
  },
  "levy": {
    "scores":"acquire:10; feel:10"
  },
  "liaison": {
    "scores":"bond:10"
  },
  "lib": {
    "scores":"bond:10"
  },
  "liberty": {
    "scores":"learn:10"
  },
  "license": {
    "scores":"learn:10"
  },
  "lick": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "licking": {
    "scores":"learn:10"
  },
  "lid": {
    "scores":"defend:10"
  },
  "lie": {
    "scores":"learn:10"
  },
  "life": {
    "scores":"learn:10; feel:10"
  },
  "lifetime": {
    "scores":"learn:10"
  },
  "lift": {
    "scores":"defend:10; learn:10"
  },
  "ligature": {
    "scores":"bond:10"
  },
  "light": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "like": {
    "scores":"learn:10; feel:10"
  },
  "likeness": {
    "scores":"feel:10"
  },
  "Lilliputian": {
    "scores":"bond:10"
  },
  "limitation": {
    "scores":"bond:10"
  },
  "limn": {
    "scores":"acquire:10"
  },
  "limp": {
    "scores":"learn:10"
  },
  "line": {
    "scores":"learn:10; bond:10"
  },
  "link": {
    "scores":"bond:10"
  },
  "linkup": {
    "scores":"bond:10"
  },
  "linn": {
    "scores":"feel:10"
  },
  "liquidate": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "list": {
    "scores":"learn:10"
  },
  "listen": {
    "scores":"learn:10"
  },
  "litter": {
    "scores":"acquire:10; learn:10"
  },
  "little": {
    "scores":"feel:10; bond:10"
  },
  "loads": {
    "scores":"bond:10"
  },
  "locate": {
    "scores":"learn:10; feel:10"
  },
  "lockup": {
    "scores":"feel:10"
  },
  "loco": {
    "scores":"learn:10"
  },
  "locum": {
    "scores":"defend:10"
  },
  "lodestone": {
    "scores":"acquire:10"
  },
  "lodge": {
    "scores":"learn:10"
  },
  "lodgings": {
    "scores":"learn:10"
  },
  "log": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "loggerhead": {
    "scores":"feel:10"
  },
  "logjam": {
    "scores":"bond:10"
  },
  "long": {
    "scores":"feel:10"
  },
  "look": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "lookout": {
    "scores":"defend:10"
  },
  "looks": {
    "scores":"feel:10"
  },
  "loon": {
    "scores":"feel:10"
  },
  "loop": {
    "scores":"bond:10"
  },
  "lop": {
    "scores":"bond:10"
  },
  "lose": {
    "scores":"defend:10"
  },
  "loss": {
    "scores":"learn:10"
  },
  "lot": {
    "scores":"feel:10; bond:10"
  },
  "lotusland": {
    "scores":"acquire:10"
  },
  "louse": {
    "scores":"defend:10; feel:10"
  },
  "love": {
    "scores":"learn:10; feel:10"
  },
  "loveliness": {
    "scores":"feel:10"
  },
  "lovemaking": {
    "scores":"feel:10"
  },
  "lower": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "lucre": {
    "scores":"acquire:10"
  },
  "lug": {
    "scores":"acquire:10"
  },
  "luminary": {
    "scores":"feel:10"
  },
  "lump": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "lunge": {
    "scores":"learn:10"
  },
  "lunkhead": {
    "scores":"feel:10"
  },
  "lust": {
    "scores":"feel:10"
  },
  "mac": {
    "scores":"acquire:10; learn:10"
  },
  "madden": {
    "scores":"learn:10"
  },
  "maestro": {
    "scores":"learn:10"
  },
  "magistrate": {
    "scores":"feel:10"
  },
  "magnitude": {
    "scores":"bond:10"
  },
  "magpie": {
    "scores":"feel:10"
  },
  "main": {
    "scores":"learn:10"
  },
  "maintain": {
    "scores":"defend:10; learn:10"
  },
  "make": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "makeup": {
    "scores":"acquire:10"
  },
  "male": {
    "scores":"bond:10"
  },
  "mammoth": {
    "scores":"bond:10"
  },
  "man": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "manacle": {
    "scores":"feel:10; bond:10"
  },
  "manage": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "mangle": {
    "scores":"defend:10; feel:10"
  },
  "mangy": {
    "scores":"learn:10"
  },
  "manikin": {
    "scores":"acquire:10; feel:10"
  },
  "manlike": {
    "scores":"bond:10"
  },
  "manly": {
    "scores":"bond:10"
  },
  "manner": {
    "scores":"acquire:10"
  },
  "mannish": {
    "scores":"bond:10"
  },
  "mantle": {
    "scores":"defend:10"
  },
  "manufacture": {
    "scores":"acquire:10; feel:10"
  },
  "map": {
    "scores":"learn:10"
  },
  "mar": {
    "scores":"defend:10"
  },
  "march": {
    "scores":"acquire:10; feel:10"
  },
  "mark": {
    "scores":"defend:10"
  },
  "marry": {
    "scores":"bond:10"
  },
  "marshal": {
    "scores":"acquire:10"
  },
  "mask": {
    "scores":"defend:10"
  },
  "masquerade": {
    "scores":"feel:10"
  },
  "mass": {
    "scores":"learn:10; bond:10"
  },
  "massive": {
    "scores":"bond:10"
  },
  "master": {
    "scores":"acquire:10; learn:100; learn:10; feel:10"
  },
  "masterful": {
    "scores":"learn:10"
  },
  "masterly": {
    "scores":"learn:10"
  },
  "mastery": {
    "scores":"feel:10"
  },
  "match": {
    "scores":"feel:10; bond:10"
  },
  "materialize": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "math": {
    "scores":"feel:10"
  },
  "mathematics": {
    "scores":"feel:10"
  },
  "mating": {
    "scores":"feel:10"
  },
  "matter": {
    "scores":"feel:10; bond:10"
  },
  "maunder": {
    "scores":"acquire:10"
  },
  "maven": {
    "scores":"learn:10"
  },
  "maze": {
    "scores":"feel:10"
  },
  "mean": {
    "scores":"learn:10; feel:10"
  },
  "meander": {
    "scores":"acquire:10"
  },
  "measure": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "measurement": {
    "scores":"bond:10"
  },
  "meat": {
    "scores":"learn:10"
  },
  "meathead": {
    "scores":"feel:10"
  },
  "meddle": {
    "scores":"learn:10"
  },
  "meditate": {
    "scores":"learn:10; feel:10"
  },
  "medley": {
    "scores":"acquire:10; learn:10"
  },
  "meet": {
    "scores":"defend:10; learn:10; feel:10; bond:10"
  },
  "mega": {
    "scores":"bond:10"
  },
  "megahit": {
    "scores":"learn:10"
  },
  "megastar": {
    "scores":"feel:10"
  },
  "meister": {
    "scores":"learn:10"
  },
  "melt": {
    "scores":"learn:10"
  },
  "menagerie": {
    "scores":"acquire:10; learn:10"
  },
  "mend": {
    "scores":"acquire:10; feel:10"
  },
  "mentality": {
    "scores":"feel:10"
  },
  "merchandise": {
    "scores":"bond:10"
  },
  "mercy": {
    "scores":"learn:10; feel:10"
  },
  "mesh": {
    "scores":"learn:10"
  },
  "mesmerize": {
    "scores":"learn:10"
  },
  "mess": {
    "scores":"defend:10; learn:10; feel:10; bond:10"
  },
  "metamorphose": {
    "scores":"acquire:10; feel:10"
  },
  "mete": {
    "scores":"bond:10"
  },
  "methodology": {
    "scores":"acquire:10"
  },
  "mew": {
    "scores":"defend:10"
  },
  "mien": {
    "scores":"feel:10"
  },
  "mighty": {
    "scores":"bond:10"
  },
  "mind": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "minder": {
    "scores":"defend:10"
  },
  "minimize": {
    "scores":"learn:10"
  },
  "mire": {
    "scores":"learn:10; bond:10"
  },
  "mirror": {
    "scores":"feel:10"
  },
  "misadventure": {
    "scores":"acquire:10"
  },
  "miscellanea": {
    "scores":"acquire:10; learn:10"
  },
  "mischance": {
    "scores":"acquire:10"
  },
  "miscue": {
    "scores":"feel:10"
  },
  "miserable": {
    "scores":"learn:10"
  },
  "misguide": {
    "scores":"learn:10"
  },
  "mishap": {
    "scores":"acquire:10"
  },
  "mishmash": {
    "scores":"acquire:10; learn:10"
  },
  "misinform": {
    "scores":"learn:10"
  },
  "mislead": {
    "scores":"learn:10"
  },
  "miss": {
    "scores":"learn:10; bond:10"
  },
  "misspend": {
    "scores":"defend:10"
  },
  "misstep": {
    "scores":"feel:10"
  },
  "mistake": {
    "scores":"feel:10"
  },
  "mite": {
    "scores":"feel:10"
  },
  "mixed": {
    "scores":"acquire:10; learn:10"
  },
  "mob": {
    "scores":"learn:10"
  },
  "mock": {
    "scores":"learn:10"
  },
  "modify": {
    "scores":"acquire:10; feel:10"
  },
  "moil": {
    "scores":"learn:10"
  },
  "moiling": {
    "scores":"learn:10"
  },
  "mome": {
    "scores":"feel:10"
  },
  "moment": {
    "scores":"bond:10"
  },
  "monkey": {
    "scores":"feel:10"
  },
  "monster": {
    "scores":"bond:10"
  },
  "monstrous": {
    "scores":"bond:10"
  },
  "montage": {
    "scores":"acquire:10; learn:10"
  },
  "Montezuma": {
    "scores":"learn:10"
  },
  "monumental": {
    "scores":"bond:10"
  },
  "mooch": {
    "scores":"acquire:10"
  },
  "mood": {
    "scores":"feel:10"
  },
  "moor": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "moot": {
    "scores":"acquire:10"
  },
  "mores": {
    "scores":"acquire:10"
  },
  "moron": {
    "scores":"feel:10"
  },
  "mortal": {
    "scores":"learn:10; feel:10"
  },
  "moth": {
    "scores":"learn:10"
  },
  "motif": {
    "scores":"feel:10"
  },
  "motive": {
    "scores":"feel:10"
  },
  "motley": {
    "scores":"acquire:10; learn:10"
  },
  "motor": {
    "scores":"defend:10; learn:10"
  },
  "motormouth": {
    "scores":"feel:10"
  },
  "mount": {
    "scores":"acquire:10; defend:10"
  },
  "mountain": {
    "scores":"bond:10"
  },
  "mountainous": {
    "scores":"bond:10"
  },
  "mounting": {
    "scores":"defend:10"
  },
  "mourn": {
    "scores":"feel:10"
  },
  "mouth": {
    "scores":"learn:10"
  },
  "mouthful": {
    "scores":"feel:10"
  },
  "moviemaking": {
    "scores":"defend:10"
  },
  "mow": {
    "scores":"acquire:10"
  },
  "moxie": {
    "scores":"feel:10"
  },
  "muck": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "muddle": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "muddy": {
    "scores":"feel:10"
  },
  "muff": {
    "scores":"defend:10; feel:10"
  },
  "mug": {
    "scores":"feel:10"
  },
  "mulct": {
    "scores":"feel:10"
  },
  "mull": {
    "scores":"learn:10; feel:10"
  },
  "multiplicity": {
    "scores":"bond:10"
  },
  "multiply": {
    "scores":"acquire:10"
  },
  "multitude": {
    "scores":"learn:10"
  },
  "murder": {
    "scores":"defend:10; feel:10"
  },
  "murderous": {
    "scores":"learn:10"
  },
  "muscle": {
    "scores":"acquire:10; feel:10"
  },
  "mushroom": {
    "scores":"acquire:10"
  },
  "muster": {
    "scores":"learn:10; bond:10"
  },
  "mutt": {
    "scores":"feel:10"
  },
  "myriad": {
    "scores":"bond:10"
  },
  "mystify": {
    "scores":"feel:10"
  },
  "mythical": {
    "scores":"acquire:10; feel:10"
  },
  "nab": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "nail": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "nark": {
    "scores":"feel:10"
  },
  "narrate": {
    "scores":"bond:10"
  },
  "narrow": {
    "scores":"bond:10"
  },
  "narrows": {
    "scores":"feel:10"
  },
  "natural": {
    "scores":"feel:10"
  },
  "nauseate": {
    "scores":"learn:10"
  },
  "navigate": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "near": {
    "scores":"acquire:10; feel:10"
  },
  "neb": {
    "scores":"learn:10; feel:10"
  },
  "neck": {
    "scores":"acquire:10; feel:10"
  },
  "negative": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "neglected": {
    "scores":"learn:10"
  },
  "negotiate": {
    "scores":"acquire:10; feel:10; bond:10"
  },
  "net": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "nettle": {
    "scores":"feel:10"
  },
  "neutralize": {
    "scores":"acquire:10; feel:10"
  },
  "nexus": {
    "scores":"bond:10"
  },
  "nger": {
    "scores":"feel:10"
  },
  "nib": {
    "scores":"learn:10"
  },
  "nibble": {
    "scores":"feel:10"
  },
  "nick": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "nigh": {
    "scores":"acquire:10; feel:10"
  },
  "nilly": {
    "scores":"learn:10"
  },
  "nimbus": {
    "scores":"feel:10"
  },
  "nimrod": {
    "scores":"feel:10"
  },
  "nincompoop": {
    "scores":"feel:10"
  },
  "ninny": {
    "scores":"feel:10"
  },
  "ninnyhammer": {
    "scores":"feel:10"
  },
  "nip": {
    "scores":"defend:10; learn:10; feel:10; bond:10"
  },
  "nirvana": {
    "scores":"acquire:10"
  },
  "nit": {
    "scores":"feel:10"
  },
  "nitwit": {
    "scores":"feel:10"
  },
  "nix": {
    "scores":"learn:10; feel:10"
  },
  "nobble": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "noddy": {
    "scores":"feel:10"
  },
  "node": {
    "scores":"bond:10"
  },
  "nodule": {
    "scores":"bond:10"
  },
  "noodle": {
    "scores":"feel:10"
  },
  "nose": {
    "scores":"learn:10; feel:10"
  },
  "notability": {
    "scores":"feel:10"
  },
  "notable": {
    "scores":"feel:10"
  },
  "notch": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "note": {
    "scores":"learn:10; feel:10"
  },
  "notice": {
    "scores":"learn:10; feel:10"
  },
  "notion": {
    "scores":"feel:10"
  },
  "notional": {
    "scores":"acquire:10; feel:10"
  },
  "notoriety": {
    "scores":"feel:10"
  },
  "nourish": {
    "scores":"acquire:10; feel:10"
  },
  "nous": {
    "scores":"feel:10"
  },
  "nozzle": {
    "scores":"learn:10; feel:10"
  },
  "nub": {
    "scores":"learn:10"
  },
  "nubbin": {
    "scores":"learn:10"
  },
  "nucleus": {
    "scores":"learn:10"
  },
  "nugget": {
    "scores":"feel:10"
  },
  "nuke": {
    "scores":"acquire:10"
  },
  "number": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "numbers": {
    "scores":"feel:10"
  },
  "numeral": {
    "scores":"feel:10"
  },
  "numeric": {
    "scores":"feel:10"
  },
  "numero": {
    "scores":"learn:10"
  },
  "numskull": {
    "scores":"feel:10"
  },
  "nurse": {
    "scores":"acquire:10; feel:10"
  },
  "nurture": {
    "scores":"acquire:10; feel:10"
  },
  "nut": {
    "scores":"bond:10"
  },
  "oaf": {
    "scores":"feel:10"
  },
  "objurgation": {
    "scores":"feel:10"
  },
  "obligate": {
    "scores":"acquire:10; feel:10"
  },
  "oblige": {
    "scores":"acquire:10; feel:10"
  },
  "obliterate": {
    "scores":"learn:10"
  },
  "obscure": {
    "scores":"defend:10"
  },
  "observance": {
    "scores":"acquire:10"
  },
  "observe": {
    "scores":"learn:10; feel:10"
  },
  "obstacle": {
    "scores":"bond:10"
  },
  "obstruct": {
    "scores":"feel:10; bond:10"
  },
  "obstruction": {
    "scores":"bond:10"
  },
  "obtain": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "obtrude": {
    "scores":"learn:10"
  },
  "occasion": {
    "scores":"acquire:10; feel:10"
  },
  "occult": {
    "scores":"defend:10"
  },
  "occupy": {
    "scores":"learn:10"
  },
  "occur": {
    "scores":"acquire:10; feel:10"
  },
  "oceanic": {
    "scores":"bond:10"
  },
  "odor": {
    "scores":"feel:10"
  },
  "odorize": {
    "scores":"feel:10"
  },
  "offend": {
    "scores":"defend:10"
  },
  "offense": {
    "scores":"learn:10"
  },
  "offer": {
    "scores":"acquire:10; feel:10"
  },
  "offhand": {
    "scores":"bond:10"
  },
  "offhanded": {
    "scores":"bond:10"
  },
  "olio": {
    "scores":"acquire:10; learn:10"
  },
  "olla": {
    "scores":"acquire:10; learn:10"
  },
  "omnibus": {
    "scores":"defend:10"
  },
  "omnium": {
    "scores":"acquire:10; learn:10"
  },
  "oodles": {
    "scores":"bond:10"
  },
  "ooze": {
    "scores":"learn:10; feel:10"
  },
  "operate": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "opine": {
    "scores":"feel:10"
  },
  "opinion": {
    "scores":"feel:10"
  },
  "opt": {
    "scores":"learn:10; feel:10"
  },
  "option": {
    "scores":"learn:10"
  },
  "orchestra": {
    "scores":"bond:10"
  },
  "ordain": {
    "scores":"acquire:10; feel:10"
  },
  "order": {
    "scores":"acquire:10"
  },
  "ordinance": {
    "scores":"feel:10"
  },
  "ordonnance": {
    "scores":"acquire:10"
  },
  "organize": {
    "scores":"acquire:10"
  },
  "origin": {
    "scores":"learn:10"
  },
  "originate": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "ounce": {
    "scores":"feel:10"
  },
  "oust": {
    "scores":"learn:10"
  },
  "outfit": {
    "scores":"bond:10"
  },
  "outlay": {
    "scores":"learn:10"
  },
  "outrage": {
    "scores":"learn:10"
  },
  "outreach": {
    "scores":"defend:10"
  },
  "outrun": {
    "scores":"defend:10"
  },
  "outside": {
    "scores":"feel:10"
  },
  "outstretch": {
    "scores":"acquire:10"
  },
  "outwear": {
    "scores":"acquire:10; defend:10"
  },
  "overbear": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "overbearing": {
    "scores":"learn:10"
  },
  "overcome": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "overhang": {
    "scores":"acquire:10"
  },
  "overhaul": {
    "scores":"learn:10"
  },
  "overlay": {
    "scores":"defend:10"
  },
  "overlie": {
    "scores":"defend:10"
  },
  "overlook": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "overmastering": {
    "scores":"learn:10"
  },
  "overmatch": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "overpass": {
    "scores":"defend:10; feel:10"
  },
  "overreach": {
    "scores":"defend:10"
  },
  "overriding": {
    "scores":"learn:10"
  },
  "overrun": {
    "scores":"defend:10"
  },
  "oversee": {
    "scores":"acquire:10; learn:10"
  },
  "overshoot": {
    "scores":"defend:10"
  },
  "oversight": {
    "scores":"feel:10"
  },
  "overspread": {
    "scores":"defend:10"
  },
  "overstep": {
    "scores":"defend:10"
  },
  "overthrow": {
    "scores":"learn:10"
  },
  "pace": {
    "scores":"acquire:10; feel:10"
  },
  "pack": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "package": {
    "scores":"bond:10"
  },
  "packsack": {
    "scores":"acquire:10"
  },
  "pact": {
    "scores":"bond:10"
  },
  "pain": {
    "scores":"feel:10"
  },
  "paint": {
    "scores":"acquire:10"
  },
  "pal": {
    "scores":"learn:10"
  },
  "pall": {
    "scores":"defend:10"
  },
  "palladium": {
    "scores":"defend:10"
  },
  "palm": {
    "scores":"acquire:10; feel:10"
  },
  "palter": {
    "scores":"bond:10"
  },
  "pan": {
    "scores":"acquire:10; feel:10; bond:10"
  },
  "pang": {
    "scores":"feel:10"
  },
  "panic": {
    "scores":"learn:10"
  },
  "panoramic": {
    "scores":"defend:10"
  },
  "pant": {
    "scores":"defend:10; feel:10"
  },
  "pants": {
    "scores":"learn:10"
  },
  "paper": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "paramount": {
    "scores":"learn:10"
  },
  "parcel": {
    "scores":"bond:10"
  },
  "pardon": {
    "scores":"feel:10"
  },
  "pare": {
    "scores":"bond:10"
  },
  "paroxysmal": {
    "scores":"acquire:10"
  },
  "partiality": {
    "scores":"learn:10; feel:10"
  },
  "partnership": {
    "scores":"bond:10"
  },
  "party": {
    "scores":"learn:10; feel:10; bond:10"
  },
  "pass": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "passel": {
    "scores":"bond:10"
  },
  "passion": {
    "scores":"feel:10"
  },
  "passions": {
    "scores":"feel:10"
  },
  "past": {
    "scores":"learn:10"
  },
  "paste": {
    "scores":"acquire:10; learn:10"
  },
  "pasteboard": {
    "scores":"feel:10"
  },
  "pastiche": {
    "scores":"acquire:10; learn:10"
  },
  "patchwork": {
    "scores":"acquire:10; learn:10"
  },
  "path": {
    "scores":"learn:10"
  },
  "pathway": {
    "scores":"learn:10"
  },
  "patina": {
    "scores":"feel:10"
  },
  "patron": {
    "scores":"bond:10"
  },
  "patronize": {
    "scores":"defend:10"
  },
  "pattern": {
    "scores":"acquire:10"
  },
  "pause": {
    "scores":"defend:10"
  },
  "paw": {
    "scores":"feel:10"
  },
  "pawn": {
    "scores":"bond:10"
  },
  "pay": {
    "scores":"learn:10"
  },
  "payoff": {
    "scores":"acquire:10"
  },
  "peaked": {
    "scores":"learn:10"
  },
  "peaky": {
    "scores":"learn:10"
  },
  "peanuts": {
    "scores":"feel:10"
  },
  "pearl": {
    "scores":"learn:10"
  },
  "peck": {
    "scores":"learn:10; bond:10"
  },
  "peek": {
    "scores":"feel:10"
  },
  "peel": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "peep": {
    "scores":"feel:10"
  },
  "peeve": {
    "scores":"feel:10"
  },
  "peg": {
    "scores":"learn:10; feel:10"
  },
  "pelt": {
    "scores":"acquire:10; defend:10; learn:10; bond:10"
  },
  "pen": {
    "scores":"defend:10; feel:10"
  },
  "penchant": {
    "scores":"learn:10"
  },
  "penitentiary": {
    "scores":"feel:10"
  },
  "pennyworth": {
    "scores":"bond:10"
  },
  "penumbra": {
    "scores":"defend:10"
  },
  "perambulate": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "perambulation": {
    "scores":"learn:10"
  },
  "perceive": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "perception": {
    "scores":"feel:10"
  },
  "perceptive": {
    "scores":"learn:10"
  },
  "perch": {
    "scores":"acquire:10"
  },
  "percipience": {
    "scores":"feel:10"
  },
  "percolate": {
    "scores":"feel:10"
  },
  "perdure": {
    "scores":"feel:10"
  },
  "peregrinate": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "perform": {
    "scores":"feel:10"
  },
  "perfume": {
    "scores":"feel:10"
  },
  "perish": {
    "scores":"feel:10"
  },
  "perk": {
    "scores":"defend:10; learn:10"
  },
  "permit": {
    "scores":"acquire:10; feel:10"
  },
  "perpend": {
    "scores":"learn:10; feel:10"
  },
  "perpetrate": {
    "scores":"acquire:10; feel:10"
  },
  "perplex": {
    "scores":"feel:10"
  },
  "persecute": {
    "scores":"feel:10"
  },
  "persist": {
    "scores":"acquire:10; feel:10"
  },
  "person": {
    "scores":"learn:10; feel:10"
  },
  "personage": {
    "scores":"learn:10; feel:10"
  },
  "personality": {
    "scores":"learn:10; feel:10"
  },
  "personate": {
    "scores":"feel:10"
  },
  "persuasion": {
    "scores":"feel:10"
  },
  "pert": {
    "scores":"learn:10"
  },
  "pertain": {
    "scores":"defend:10; bond:10"
  },
  "peruse": {
    "scores":"feel:10"
  },
  "phantasmal": {
    "scores":"acquire:10; feel:10"
  },
  "phantasmic": {
    "scores":"acquire:10; feel:10"
  },
  "phantom": {
    "scores":"acquire:10; feel:10"
  },
  "pharaonic": {
    "scores":"bond:10"
  },
  "philharmonic": {
    "scores":"bond:10"
  },
  "pick": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "picket": {
    "scores":"defend:10"
  },
  "pickle": {
    "scores":"learn:10; bond:10"
  },
  "picture": {
    "scores":"acquire:10; feel:10; bond:10"
  },
  "pictures": {
    "scores":"defend:10"
  },
  "piece": {
    "scores":"acquire:10; feel:10"
  },
  "pierce": {
    "scores":"learn:10"
  },
  "pike": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "pile": {
    "scores":"bond:10"
  },
  "pinch": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "pine": {
    "scores":"feel:10"
  },
  "pinhead": {
    "scores":"feel:10"
  },
  "pinion": {
    "scores":"bond:10"
  },
  "pink": {
    "scores":"learn:10"
  },
  "pinpoint": {
    "scores":"acquire:10; feel:10"
  },
  "pint": {
    "scores":"bond:10"
  },
  "pinwheel": {
    "scores":"learn:10; bond:10"
  },
  "pipe": {
    "scores":"feel:10"
  },
  "pique": {
    "scores":"feel:10"
  },
  "pirouette": {
    "scores":"learn:10; bond:10"
  },
  "pitch": {
    "scores":"learn:10; feel:10"
  },
  "pith": {
    "scores":"learn:10"
  },
  "pity": {
    "scores":"feel:10"
  },
  "pivot": {
    "scores":"learn:10; bond:10"
  },
  "placard": {
    "scores":"feel:10"
  },
  "place": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "plan": {
    "scores":"learn:10; feel:10"
  },
  "planetary": {
    "scores":"bond:10"
  },
  "plastering": {
    "scores":"learn:10"
  },
  "plate": {
    "scores":"feel:10"
  },
  "plateful": {
    "scores":"bond:10"
  },
  "platoon": {
    "scores":"bond:10"
  },
  "play": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "playacting": {
    "scores":"feel:10"
  },
  "pledge": {
    "scores":"bond:10"
  },
  "plenitude": {
    "scores":"bond:10"
  },
  "plentitude": {
    "scores":"bond:10"
  },
  "plenty": {
    "scores":"bond:10"
  },
  "plod": {
    "scores":"learn:10"
  },
  "plonk": {
    "scores":"defend:10"
  },
  "plow": {
    "scores":"learn:10"
  },
  "pluck": {
    "scores":"acquire:10; feel:10"
  },
  "plug": {
    "scores":"learn:10"
  },
  "plum": {
    "scores":"learn:10"
  },
  "plumb": {
    "scores":"feel:10"
  },
  "plummet": {
    "scores":"learn:10"
  },
  "plump": {
    "scores":"acquire:10; defend:10; learn:10; bond:10"
  },
  "plunge": {
    "scores":"learn:10; feel:10"
  },
  "plunk": {
    "scores":"defend:10"
  },
  "plus": {
    "scores":"acquire:10"
  },
  "pocket": {
    "scores":"defend:10; feel:10; bond:10"
  },
  "pocketbook": {
    "scores":"acquire:10"
  },
  "pod": {
    "scores":"defend:10"
  },
  "podrida": {
    "scores":"acquire:10; learn:10"
  },
  "point": {
    "scores":"learn:10; feel:10"
  },
  "poison": {
    "scores":"learn:10"
  },
  "poke": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "pokey": {
    "scores":"feel:10"
  },
  "policy": {
    "scores":"feel:10"
  },
  "politic": {
    "scores":"learn:10"
  },
  "poll": {
    "scores":"bond:10"
  },
  "pomposity": {
    "scores":"feel:10"
  },
  "pompousness": {
    "scores":"feel:10"
  },
  "pony": {
    "scores":"learn:10"
  },
  "pooch": {
    "scores":"acquire:10"
  },
  "poor": {
    "scores":"learn:10"
  },
  "poorly": {
    "scores":"learn:10"
  },
  "pop": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "poppet": {
    "scores":"feel:10"
  },
  "pore": {
    "scores":"learn:10; feel:10"
  },
  "portion": {
    "scores":"bond:10"
  },
  "portmanteau": {
    "scores":"acquire:10"
  },
  "portray": {
    "scores":"acquire:10; feel:10"
  },
  "pose": {
    "scores":"feel:10"
  },
  "position": {
    "scores":"acquire:10; feel:10"
  },
  "positiveness": {
    "scores":"bond:10"
  },
  "possess": {
    "scores":"acquire:10; feel:10"
  },
  "post": {
    "scores":"feel:10"
  },
  "postdate": {
    "scores":"learn:10"
  },
  "postulate": {
    "scores":"feel:10"
  },
  "posture": {
    "scores":"bond:10"
  },
  "pot": {
    "scores":"bond:10"
  },
  "potatoes": {
    "scores":"learn:10"
  },
  "potful": {
    "scores":"bond:10"
  },
  "potpourri": {
    "scores":"acquire:10; learn:10"
  },
  "pouch": {
    "scores":"acquire:10"
  },
  "pounce": {
    "scores":"learn:10"
  },
  "pound": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "pour": {
    "scores":"learn:10"
  },
  "pout": {
    "scores":"acquire:10"
  },
  "practiced": {
    "scores":"learn:10"
  },
  "prat": {
    "scores":"feel:10"
  },
  "prattler": {
    "scores":"feel:10"
  },
  "predict": {
    "scores":"feel:10"
  },
  "predilection": {
    "scores":"learn:10"
  },
  "predisposition": {
    "scores":"learn:10"
  },
  "predominant": {
    "scores":"learn:10"
  },
  "preeminent": {
    "scores":"learn:10"
  },
  "prefer": {
    "scores":"learn:10"
  },
  "preference": {
    "scores":"learn:10; feel:10"
  },
  "premier": {
    "scores":"learn:10"
  },
  "premise": {
    "scores":"feel:10"
  },
  "prepare": {
    "scores":"acquire:10"
  },
  "presage": {
    "scores":"feel:10"
  },
  "presence": {
    "scores":"feel:10"
  },
  "preside": {
    "scores":"acquire:10; learn:10"
  },
  "press": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "pressure": {
    "scores":"acquire:10; feel:10"
  },
  "presume": {
    "scores":"feel:10"
  },
  "presuppose": {
    "scores":"feel:10"
  },
  "pretend": {
    "scores":"acquire:10; feel:10"
  },
  "pretense": {
    "scores":"feel:10"
  },
  "prettiness": {
    "scores":"feel:10"
  },
  "prevail": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "preventive": {
    "scores":"defend:10"
  },
  "price": {
    "scores":"feel:10"
  },
  "prick": {
    "scores":"feel:10"
  },
  "pride": {
    "scores":"learn:10; feel:10"
  },
  "pridefulness": {
    "scores":"feel:10"
  },
  "priesthood": {
    "scores":"learn:10"
  },
  "primal": {
    "scores":"learn:10"
  },
  "primary": {
    "scores":"learn:10"
  },
  "prime": {
    "scores":"learn:10"
  },
  "principal": {
    "scores":"learn:10"
  },
  "prior": {
    "scores":"learn:10"
  },
  "prison": {
    "scores":"feel:10"
  },
  "prisoner": {
    "scores":"acquire:10"
  },
  "prize": {
    "scores":"acquire:10; learn:10"
  },
  "probation": {
    "scores":"learn:10"
  },
  "probe": {
    "scores":"learn:10; feel:10"
  },
  "probing": {
    "scores":"learn:10"
  },
  "proboscis": {
    "scores":"learn:10; feel:10"
  },
  "proceed": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "proceeds": {
    "scores":"acquire:10"
  },
  "proclaim": {
    "scores":"feel:10"
  },
  "proclivity": {
    "scores":"learn:10"
  },
  "procure": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "prodigious": {
    "scores":"bond:10"
  },
  "produce": {
    "scores":"acquire:10; feel:10"
  },
  "profess": {
    "scores":"feel:10"
  },
  "professed": {
    "scores":"learn:10"
  },
  "proficiency": {
    "scores":"feel:10"
  },
  "proficient": {
    "scores":"learn:10"
  },
  "profit": {
    "scores":"acquire:10"
  },
  "profusion": {
    "scores":"bond:10"
  },
  "prognosticate": {
    "scores":"feel:10"
  },
  "program": {
    "scores":"learn:10"
  },
  "progress": {
    "scores":"acquire:10; feel:10"
  },
  "progression": {
    "scores":"bond:10"
  },
  "project": {
    "scores":"acquire:10; learn:10"
  },
  "proletariat": {
    "scores":"learn:10"
  },
  "proliferate": {
    "scores":"acquire:10"
  },
  "proliferation": {
    "scores":"acquire:10"
  },
  "prolong": {
    "scores":"acquire:10"
  },
  "promised": {
    "scores":"acquire:10"
  },
  "promote": {
    "scores":"acquire:10"
  },
  "prompt": {
    "scores":"acquire:10; feel:10"
  },
  "promulgate": {
    "scores":"feel:10"
  },
  "prop": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "propensity": {
    "scores":"learn:10"
  },
  "prophesy": {
    "scores":"feel:10"
  },
  "proportion": {
    "scores":"bond:10"
  },
  "propose": {
    "scores":"feel:10"
  },
  "propre": {
    "scores":"feel:10"
  },
  "proprieties": {
    "scores":"acquire:10"
  },
  "propriety": {
    "scores":"acquire:10"
  },
  "prorate": {
    "scores":"bond:10"
  },
  "prosecute": {
    "scores":"acquire:10; feel:10"
  },
  "prospect": {
    "scores":"learn:10"
  },
  "prostrate": {
    "scores":"acquire:10"
  },
  "protect": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "protection": {
    "scores":"defend:10"
  },
  "protract": {
    "scores":"acquire:10"
  },
  "protrude": {
    "scores":"acquire:10"
  },
  "provide": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "provoke": {
    "scores":"learn:10"
  },
  "prudence": {
    "scores":"feel:10"
  },
  "prudent": {
    "scores":"learn:10"
  },
  "prune": {
    "scores":"bond:10"
  },
  "pry": {
    "scores":"acquire:10; learn:10"
  },
  "psyche": {
    "scores":"feel:10"
  },
  "publicize": {
    "scores":"feel:10"
  },
  "publish": {
    "scores":"feel:10"
  },
  "puff": {
    "scores":"defend:10"
  },
  "pull": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "pulverize": {
    "scores":"acquire:10"
  },
  "pump": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "punch": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "puncture": {
    "scores":"learn:10"
  },
  "punk": {
    "scores":"learn:10"
  },
  "puny": {
    "scores":"bond:10"
  },
  "puppet": {
    "scores":"feel:10"
  },
  "purchase": {
    "scores":"learn:10"
  },
  "purport": {
    "scores":"feel:10"
  },
  "purpose": {
    "scores":"feel:10"
  },
  "pursue": {
    "scores":"learn:10"
  },
  "push": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "puzzle": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "pygmy": {
    "scores":"bond:10"
  },
  "quaff": {
    "scores":"acquire:10"
  },
  "quagmire": {
    "scores":"learn:10; bond:10"
  },
  "quandary": {
    "scores":"learn:10; bond:10"
  },
  "quantity": {
    "scores":"bond:10"
  },
  "quest": {
    "scores":"learn:10"
  },
  "question": {
    "scores":"learn:10; feel:10"
  },
  "quicken": {
    "scores":"learn:10"
  },
  "quilt": {
    "scores":"acquire:10; learn:10"
  },
  "quit": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "quod": {
    "scores":"feel:10"
  },
  "rabbit": {
    "scores":"learn:10; bond:10"
  },
  "rabblement": {
    "scores":"learn:10"
  },
  "rabid": {
    "scores":"acquire:10"
  },
  "race": {
    "scores":"defend:10; learn:10"
  },
  "rack": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "raft": {
    "scores":"bond:10"
  },
  "rag": {
    "scores":"learn:10"
  },
  "ragbag": {
    "scores":"acquire:10; learn:10"
  },
  "ragout": {
    "scores":"acquire:10; learn:10"
  },
  "ragtag": {
    "scores":"learn:10"
  },
  "raid": {
    "scores":"learn:10"
  },
  "raise": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "rake": {
    "scores":"learn:10"
  },
  "rally": {
    "scores":"acquire:10; feel:10"
  },
  "ram": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "ramble": {
    "scores":"acquire:10; learn:10"
  },
  "randomly": {
    "scores":"learn:10"
  },
  "range": {
    "scores":"acquire:10; learn:10"
  },
  "ransack": {
    "scores":"learn:10"
  },
  "rap": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "rapture": {
    "scores":"acquire:10"
  },
  "rasp": {
    "scores":"learn:10; feel:10"
  },
  "ratbag": {
    "scores":"feel:10"
  },
  "rate": {
    "scores":"acquire:10; feel:10"
  },
  "ratiocination": {
    "scores":"feel:10"
  },
  "ration": {
    "scores":"feel:10"
  },
  "rational": {
    "scores":"feel:10"
  },
  "rattrap": {
    "scores":"learn:10; bond:10"
  },
  "ratty": {
    "scores":"learn:10"
  },
  "ravine": {
    "scores":"feel:10"
  },
  "ravish": {
    "scores":"acquire:10"
  },
  "raw": {
    "scores":"bond:10"
  },
  "ray": {
    "scores":"feel:10"
  },
  "raze": {
    "scores":"acquire:10"
  },
  "reach": {
    "scores":"feel:10"
  },
  "read": {
    "scores":"feel:10"
  },
  "realization": {
    "scores":"feel:10"
  },
  "realize": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "ream": {
    "scores":"feel:10"
  },
  "reams": {
    "scores":"bond:10"
  },
  "reap": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "rear": {
    "scores":"acquire:10; feel:10"
  },
  "reason": {
    "scores":"acquire:10; feel:10"
  },
  "reasonable": {
    "scores":"feel:10"
  },
  "reasoning": {
    "scores":"feel:10"
  },
  "rebound": {
    "scores":"acquire:10; feel:10"
  },
  "rebuke": {
    "scores":"feel:10"
  },
  "rebut": {
    "scores":"defend:10; learn:10"
  },
  "recall": {
    "scores":"feel:10"
  },
  "recast": {
    "scores":"acquire:10; feel:10"
  },
  "recede": {
    "scores":"acquire:10"
  },
  "recipe": {
    "scores":"acquire:10"
  },
  "recite": {
    "scores":"bond:10"
  },
  "reckon": {
    "scores":"acquire:10; feel:10"
  },
  "reckoning": {
    "scores":"feel:10"
  },
  "recognize": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "recollect": {
    "scores":"feel:10"
  },
  "recommend": {
    "scores":"feel:10"
  },
  "recompense": {
    "scores":"learn:10"
  },
  "recount": {
    "scores":"bond:10"
  },
  "recoup": {
    "scores":"acquire:10; feel:10"
  },
  "recover": {
    "scores":"acquire:10; feel:10"
  },
  "recruit": {
    "scores":"learn:10"
  },
  "recuperate": {
    "scores":"acquire:10; feel:10"
  },
  "redd": {
    "scores":"learn:10"
  },
  "redeem": {
    "scores":"learn:10"
  },
  "redirect": {
    "scores":"learn:10; bond:10"
  },
  "redo": {
    "scores":"acquire:10; feel:10"
  },
  "redolence": {
    "scores":"feel:10"
  },
  "redoubt": {
    "scores":"feel:10"
  },
  "reduce": {
    "scores":"acquire:10; defend:10"
  },
  "reecho": {
    "scores":"feel:10"
  },
  "reel": {
    "scores":"learn:10"
  },
  "refashion": {
    "scores":"acquire:10; feel:10"
  },
  "refer": {
    "scores":"learn:10; bond:10"
  },
  "referee": {
    "scores":"learn:10; feel:10"
  },
  "reflect": {
    "scores":"feel:10"
  },
  "reflection": {
    "scores":"learn:10"
  },
  "refuse": {
    "scores":"learn:10; feel:10"
  },
  "regard": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "register": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "regulate": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "rehearse": {
    "scores":"bond:10"
  },
  "reign": {
    "scores":"feel:10"
  },
  "rein": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "reinforce": {
    "scores":"defend:10"
  },
  "reinforcement": {
    "scores":"defend:10"
  },
  "reject": {
    "scores":"learn:10; feel:10"
  },
  "rejoice": {
    "scores":"learn:10"
  },
  "rejoin": {
    "scores":"acquire:10; feel:10"
  },
  "relate": {
    "scores":"bond:10"
  },
  "relation": {
    "scores":"bond:10"
  },
  "relations": {
    "scores":"feel:10"
  },
  "relationship": {
    "scores":"bond:10"
  },
  "release": {
    "scores":"learn:10; feel:10"
  },
  "reliable": {
    "scores":"acquire:10; defend:10"
  },
  "reliance": {
    "scores":"defend:10"
  },
  "relief": {
    "scores":"defend:10"
  },
  "relinquish": {
    "scores":"learn:10"
  },
  "relish": {
    "scores":"learn:10; feel:10"
  },
  "rely": {
    "scores":"feel:10"
  },
  "remain": {
    "scores":"feel:10"
  },
  "remake": {
    "scores":"acquire:10; feel:10"
  },
  "remark": {
    "scores":"learn:10; feel:10"
  },
  "reminisce": {
    "scores":"feel:10"
  },
  "remit": {
    "scores":"feel:10"
  },
  "remodel": {
    "scores":"acquire:10; feel:10"
  },
  "remove": {
    "scores":"learn:10"
  },
  "remunerate": {
    "scores":"learn:10"
  },
  "render": {
    "scores":"acquire:10; learn:10"
  },
  "renew": {
    "scores":"learn:10"
  },
  "reopen": {
    "scores":"learn:10"
  },
  "repair": {
    "scores":"acquire:10"
  },
  "repel": {
    "scores":"learn:10"
  },
  "repine": {
    "scores":"feel:10"
  },
  "replacement": {
    "scores":"defend:10"
  },
  "replica": {
    "scores":"feel:10"
  },
  "reply": {
    "scores":"acquire:10; feel:10"
  },
  "report": {
    "scores":"bond:10"
  },
  "repose": {
    "scores":"feel:10"
  },
  "reposit": {
    "scores":"learn:10"
  },
  "reprehend": {
    "scores":"acquire:10"
  },
  "repress": {
    "scores":"feel:10"
  },
  "reprimand": {
    "scores":"feel:10"
  },
  "reproach": {
    "scores":"feel:10"
  },
  "reprobate": {
    "scores":"learn:10; feel:10"
  },
  "reproduce": {
    "scores":"feel:10"
  },
  "reproof": {
    "scores":"feel:10"
  },
  "repudiate": {
    "scores":"learn:10; feel:10"
  },
  "repulse": {
    "scores":"defend:10; learn:10"
  },
  "request": {
    "scores":"learn:10"
  },
  "rescue": {
    "scores":"acquire:10"
  },
  "research": {
    "scores":"learn:10; feel:10"
  },
  "reserve": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "resign": {
    "scores":"acquire:10"
  },
  "resolve": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "resonate": {
    "scores":"feel:10"
  },
  "resound": {
    "scores":"feel:10"
  },
  "respect": {
    "scores":"feel:10"
  },
  "respond": {
    "scores":"acquire:10; feel:10"
  },
  "responsible": {
    "scores":"acquire:10; defend:10"
  },
  "restart": {
    "scores":"learn:10"
  },
  "restrain": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "restraint": {
    "scores":"bond:10"
  },
  "restrict": {
    "scores":"feel:10"
  },
  "result": {
    "scores":"acquire:10; feel:10"
  },
  "retail": {
    "scores":"bond:10"
  },
  "retain": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "retire": {
    "scores":"acquire:10; learn:10"
  },
  "retort": {
    "scores":"acquire:10; feel:10"
  },
  "retreat": {
    "scores":"defend:10; learn:10"
  },
  "return": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "revamp": {
    "scores":"acquire:10; feel:10"
  },
  "revel": {
    "scores":"learn:10"
  },
  "revenge": {
    "scores":"learn:10"
  },
  "revenue": {
    "scores":"acquire:10"
  },
  "reversal": {
    "scores":"acquire:10"
  },
  "review": {
    "scores":"feel:10"
  },
  "revise": {
    "scores":"acquire:10; feel:10"
  },
  "revive": {
    "scores":"acquire:10; feel:10"
  },
  "revolt": {
    "scores":"learn:10"
  },
  "revolve": {
    "scores":"learn:10; feel:10; bond:10"
  },
  "rework": {
    "scores":"acquire:10; feel:10"
  },
  "riddle": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "ride": {
    "scores":"learn:10"
  },
  "riffle": {
    "scores":"learn:10"
  },
  "riffraff": {
    "scores":"learn:10"
  },
  "rifle": {
    "scores":"learn:10"
  },
  "right": {
    "scores":"acquire:10; defend:10"
  },
  "rigorous": {
    "scores":"learn:10"
  },
  "rile": {
    "scores":"feel:10"
  },
  "rill": {
    "scores":"learn:10"
  },
  "ring": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "ringer": {
    "scores":"feel:10"
  },
  "riot": {
    "scores":"feel:10"
  },
  "rip": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "riposte": {
    "scores":"acquire:10; feel:10"
  },
  "rise": {
    "scores":"acquire:10"
  },
  "ritual": {
    "scores":"acquire:10"
  },
  "rive": {
    "scores":"defend:10"
  },
  "rivulet": {
    "scores":"learn:10"
  },
  "road": {
    "scores":"learn:10; feel:10"
  },
  "roadway": {
    "scores":"feel:10"
  },
  "roam": {
    "scores":"acquire:10"
  },
  "roar": {
    "scores":"feel:10"
  },
  "robe": {
    "scores":"defend:10"
  },
  "robust": {
    "scores":"feel:10"
  },
  "rocket": {
    "scores":"defend:10; learn:10"
  },
  "roll": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "roof": {
    "scores":"defend:10"
  },
  "rook": {
    "scores":"feel:10"
  },
  "roost": {
    "scores":"acquire:10"
  },
  "root": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "rope": {
    "scores":"bond:10"
  },
  "rotate": {
    "scores":"learn:10; bond:10"
  },
  "rough": {
    "scores":"acquire:10; learn:10"
  },
  "round": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "rouse": {
    "scores":"acquire:10"
  },
  "rout": {
    "scores":"learn:10; feel:10"
  },
  "route": {
    "scores":"learn:10; feel:10"
  },
  "routeway": {
    "scores":"learn:10"
  },
  "routine": {
    "scores":"learn:10; feel:10"
  },
  "rove": {
    "scores":"acquire:10"
  },
  "row": {
    "scores":"feel:10"
  },
  "royalty": {
    "scores":"learn:10"
  },
  "rub": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "rucksack": {
    "scores":"acquire:10"
  },
  "ruffle": {
    "scores":"feel:10"
  },
  "rugged": {
    "scores":"learn:10"
  },
  "ruin": {
    "scores":"acquire:10"
  },
  "rule": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "ruminate": {
    "scores":"learn:10; feel:10"
  },
  "rummage": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "run": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "runlet": {
    "scores":"learn:10"
  },
  "runnel": {
    "scores":"learn:10"
  },
  "runs": {
    "scores":"learn:10"
  },
  "rush": {
    "scores":"defend:10; learn:10"
  },
  "rustle": {
    "scores":"defend:10; learn:10"
  },
  "ruth": {
    "scores":"feel:10"
  },
  "sack": {
    "scores":"acquire:10; learn:10"
  },
  "saddle": {
    "scores":"feel:10"
  },
  "safe": {
    "scores":"acquire:10; defend:10"
  },
  "safeguard": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "safekeeping": {
    "scores":"defend:10"
  },
  "sagacious": {
    "scores":"learn:10"
  },
  "sage": {
    "scores":"learn:10"
  },
  "salad": {
    "scores":"acquire:10; learn:10"
  },
  "salivate": {
    "scores":"feel:10"
  },
  "sally": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "salmagundi": {
    "scores":"acquire:10; learn:10"
  },
  "sand": {
    "scores":"learn:10"
  },
  "sandbag": {
    "scores":"acquire:10; feel:10"
  },
  "saphead": {
    "scores":"feel:10"
  },
  "sapient": {
    "scores":"learn:10"
  },
  "sarcasm": {
    "scores":"learn:10"
  },
  "sassy": {
    "scores":"learn:10"
  },
  "satisfaction": {
    "scores":"feel:10; bond:10"
  },
  "satisfy": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "saucy": {
    "scores":"learn:10"
  },
  "saunter": {
    "scores":"learn:10"
  },
  "savor": {
    "scores":"learn:10; feel:10"
  },
  "savvy": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "say": {
    "scores":"acquire:10; feel:10"
  },
  "scads": {
    "scores":"bond:10"
  },
  "scamper": {
    "scores":"learn:10"
  },
  "scan": {
    "scores":"feel:10"
  },
  "scare": {
    "scores":"learn:10; feel:10"
  },
  "scarify": {
    "scores":"learn:10"
  },
  "scarper": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "scattered": {
    "scores":"learn:10"
  },
  "scene": {
    "scores":"bond:10"
  },
  "scent": {
    "scores":"learn:10; feel:10"
  },
  "scheme": {
    "scores":"learn:10"
  },
  "schlub": {
    "scores":"feel:10"
  },
  "schnook": {
    "scores":"feel:10"
  },
  "schnoz": {
    "scores":"learn:10; feel:10"
  },
  "schnozzle": {
    "scores":"learn:10; feel:10"
  },
  "scholar": {
    "scores":"learn:10"
  },
  "scintilla": {
    "scores":"feel:10"
  },
  "scoot": {
    "scores":"defend:10; learn:10"
  },
  "score": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "scour": {
    "scores":"learn:10"
  },
  "scout": {
    "scores":"learn:10; feel:10"
  },
  "scrabble": {
    "scores":"feel:10"
  },
  "scramble": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "scrape": {
    "scores":"learn:10"
  },
  "screen": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "screw": {
    "scores":"defend:10; feel:10"
  },
  "screwup": {
    "scores":"feel:10"
  },
  "scrubby": {
    "scores":"learn:10"
  },
  "scruffy": {
    "scores":"learn:10"
  },
  "scrum": {
    "scores":"learn:10"
  },
  "scruple": {
    "scores":"feel:10"
  },
  "scrutiny": {
    "scores":"feel:10"
  },
  "scum": {
    "scores":"learn:10"
  },
  "scurry": {
    "scores":"defend:10; learn:10"
  },
  "scuttle": {
    "scores":"defend:10; learn:10"
  },
  "search": {
    "scores":"learn:10"
  },
  "seat": {
    "scores":"acquire:10; learn:10"
  },
  "second": {
    "scores":"feel:10"
  },
  "secure": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "security": {
    "scores":"defend:10; bond:10"
  },
  "seedbed": {
    "scores":"learn:10"
  },
  "seedy": {
    "scores":"learn:10"
  },
  "seep": {
    "scores":"feel:10"
  },
  "seize": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "seizure": {
    "scores":"learn:10"
  },
  "select": {
    "scores":"learn:10"
  },
  "selection": {
    "scores":"learn:10"
  },
  "self": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "sell": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "semblance": {
    "scores":"feel:10"
  },
  "sense": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "sensibilities": {
    "scores":"feel:10"
  },
  "sensible": {
    "scores":"feel:10"
  },
  "sensibleness": {
    "scores":"feel:10"
  },
  "sentiment": {
    "scores":"feel:10"
  },
  "sentinel": {
    "scores":"defend:10"
  },
  "sentry": {
    "scores":"defend:10"
  },
  "sequence": {
    "scores":"bond:10"
  },
  "serve": {
    "scores":"feel:10; bond:10"
  },
  "service": {
    "scores":"learn:10"
  },
  "set": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "setback": {
    "scores":"acquire:10"
  },
  "settle": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "settlement": {
    "scores":"bond:10"
  },
  "severe": {
    "scores":"learn:10"
  },
  "sex": {
    "scores":"feel:10"
  },
  "sexual": {
    "scores":"feel:10"
  },
  "shackle": {
    "scores":"feel:10; bond:10"
  },
  "shackles": {
    "scores":"bond:10"
  },
  "shade": {
    "scores":"feel:10"
  },
  "shadow": {
    "scores":"learn:10; feel:10"
  },
  "shaft": {
    "scores":"bond:10"
  },
  "shake": {
    "scores":"feel:10"
  },
  "shally": {
    "scores":"defend:10"
  },
  "shallying": {
    "scores":"defend:10"
  },
  "sham": {
    "scores":"feel:10"
  },
  "shape": {
    "scores":"acquire:10; feel:10"
  },
  "shark": {
    "scores":"learn:10"
  },
  "sharp": {
    "scores":"learn:10"
  },
  "shatter": {
    "scores":"acquire:10; defend:10"
  },
  "shave": {
    "scores":"bond:10"
  },
  "sheaf": {
    "scores":"bond:10"
  },
  "shear": {
    "scores":"bond:10"
  },
  "sheath": {
    "scores":"defend:10"
  },
  "sheer": {
    "scores":"defend:10; learn:10; bond:10"
  },
  "sheet": {
    "scores":"defend:10"
  },
  "shell": {
    "scores":"defend:10; learn:10"
  },
  "shellac": {
    "scores":"learn:10"
  },
  "shellacking": {
    "scores":"learn:10"
  },
  "shelve": {
    "scores":"feel:10"
  },
  "shield": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "shift": {
    "scores":"acquire:10; feel:10"
  },
  "shilly": {
    "scores":"defend:10"
  },
  "shine": {
    "scores":"learn:10; feel:10"
  },
  "shipload": {
    "scores":"bond:10"
  },
  "shock": {
    "scores":"learn:10"
  },
  "shoot": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "shop": {
    "scores":"learn:10"
  },
  "shore": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "short": {
    "scores":"feel:10; bond:10"
  },
  "shortchange": {
    "scores":"feel:10"
  },
  "shot": {
    "scores":"feel:10"
  },
  "shoulder": {
    "scores":"bond:10"
  },
  "shout": {
    "scores":"feel:10"
  },
  "shove": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "shovel": {
    "scores":"learn:10"
  },
  "showboat": {
    "scores":"feel:10"
  },
  "shred": {
    "scores":"feel:10"
  },
  "shrimpy": {
    "scores":"bond:10"
  },
  "shrink": {
    "scores":"bond:10"
  },
  "shroud": {
    "scores":"defend:10"
  },
  "shrug": {
    "scores":"feel:10"
  },
  "shtick": {
    "scores":"learn:10; feel:10"
  },
  "shuffle": {
    "scores":"acquire:10; learn:10"
  },
  "shut": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "sic": {
    "scores":"learn:10"
  },
  "sicken": {
    "scores":"learn:10; feel:10; bond:10"
  },
  "sickened": {
    "scores":"learn:10"
  },
  "siege": {
    "scores":"learn:10"
  },
  "sigh": {
    "scores":"feel:10"
  },
  "sight": {
    "scores":"learn:10; feel:10; bond:10"
  },
  "sightliness": {
    "scores":"feel:10"
  },
  "sign": {
    "scores":"learn:10"
  },
  "significance": {
    "scores":"feel:10"
  },
  "signification": {
    "scores":"feel:10"
  },
  "silhouette": {
    "scores":"feel:10"
  },
  "silver": {
    "scores":"defend:10"
  },
  "simpleton": {
    "scores":"feel:10"
  },
  "simulate": {
    "scores":"feel:10"
  },
  "single": {
    "scores":"learn:10"
  },
  "sink": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "sip": {
    "scores":"acquire:10"
  },
  "siphon": {
    "scores":"acquire:10; feel:10"
  },
  "sire": {
    "scores":"feel:10"
  },
  "sitting": {
    "scores":"defend:10"
  },
  "situate": {
    "scores":"acquire:10; feel:10"
  },
  "sixth": {
    "scores":"feel:10"
  },
  "size": {
    "scores":"bond:10"
  },
  "skedaddle": {
    "scores":"defend:10; learn:10"
  },
  "skelter": {
    "scores":"learn:10"
  },
  "sketch": {
    "scores":"acquire:10"
  },
  "skewer": {
    "scores":"learn:10"
  },
  "skid": {
    "scores":"learn:10"
  },
  "skilled": {
    "scores":"learn:10"
  },
  "skillful": {
    "scores":"learn:10"
  },
  "skills": {
    "scores":"feel:10"
  },
  "skin": {
    "scores":"learn:10; feel:10"
  },
  "skip": {
    "scores":"bond:10"
  },
  "skirmish": {
    "scores":"learn:10"
  },
  "skirr": {
    "scores":"learn:10"
  },
  "skosh": {
    "scores":"feel:10"
  },
  "skunk": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "skylark": {
    "scores":"feel:10"
  },
  "slag": {
    "scores":"acquire:10"
  },
  "slam": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "slammer": {
    "scores":"feel:10"
  },
  "slap": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "slapdash": {
    "scores":"learn:10"
  },
  "slash": {
    "scores":"bond:10"
  },
  "slave": {
    "scores":"learn:10"
  },
  "slay": {
    "scores":"acquire:10; feel:10"
  },
  "sleazy": {
    "scores":"learn:10"
  },
  "slew": {
    "scores":"bond:10"
  },
  "slice": {
    "scores":"bond:10"
  },
  "slight": {
    "scores":"learn:10; feel:10; bond:10"
  },
  "slip": {
    "scores":"learn:10; feel:10"
  },
  "slipup": {
    "scores":"feel:10"
  },
  "slit": {
    "scores":"bond:10"
  },
  "slob": {
    "scores":"learn:10; feel:10"
  },
  "slog": {
    "scores":"acquire:10; learn:10"
  },
  "slouch": {
    "scores":"learn:10"
  },
  "slug": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "slur": {
    "scores":"learn:10; feel:10"
  },
  "slurp": {
    "scores":"acquire:10"
  },
  "smack": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "smallish": {
    "scores":"bond:10"
  },
  "smart": {
    "scores":"learn:10; feel:10"
  },
  "smarts": {
    "scores":"feel:10"
  },
  "smarty": {
    "scores":"learn:10"
  },
  "smash": {
    "scores":"acquire:10; defend:10; learn:10; bond:10"
  },
  "smell": {
    "scores":"feel:10"
  },
  "smeller": {
    "scores":"learn:10; feel:10"
  },
  "smidgen": {
    "scores":"feel:10"
  },
  "smite": {
    "scores":"acquire:10; learn:10"
  },
  "smoke": {
    "scores":"learn:10"
  },
  "smooth": {
    "scores":"learn:10"
  },
  "smoothen": {
    "scores":"learn:10"
  },
  "smorgasbord": {
    "scores":"acquire:10; learn:10"
  },
  "smother": {
    "scores":"learn:10; feel:10"
  },
  "smugness": {
    "scores":"feel:10"
  },
  "snag": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "snail": {
    "scores":"learn:10"
  },
  "snap": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "snare": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "snarl": {
    "scores":"bond:10"
  },
  "snatch": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "sniff": {
    "scores":"learn:10; feel:10"
  },
  "snip": {
    "scores":"bond:10"
  },
  "snooker": {
    "scores":"learn:10"
  },
  "snoop": {
    "scores":"learn:10"
  },
  "snoot": {
    "scores":"learn:10; feel:10"
  },
  "snout": {
    "scores":"learn:10; feel:10"
  },
  "snow": {
    "scores":"learn:10"
  },
  "snowball": {
    "scores":"acquire:10"
  },
  "snub": {
    "scores":"feel:10"
  },
  "snuff": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "snug": {
    "scores":"acquire:10; defend:10"
  },
  "sock": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "softhearted": {
    "scores":"feel:10"
  },
  "softheartedness": {
    "scores":"feel:10"
  },
  "soil": {
    "scores":"acquire:10"
  },
  "solemnity": {
    "scores":"acquire:10"
  },
  "solicit": {
    "scores":"learn:10"
  },
  "solid": {
    "scores":"acquire:10; defend:10"
  },
  "solidify": {
    "scores":"acquire:10"
  },
  "somebody": {
    "scores":"feel:10"
  },
  "sophisticate": {
    "scores":"bond:10"
  },
  "sophisticated": {
    "scores":"learn:10"
  },
  "sorrow": {
    "scores":"feel:10"
  },
  "sort": {
    "scores":"learn:10; feel:10"
  },
  "soul": {
    "scores":"learn:10; feel:10"
  },
  "sound": {
    "scores":"acquire:10; feel:10"
  },
  "soup": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "sovereign": {
    "scores":"learn:10"
  },
  "sovereignty": {
    "scores":"acquire:10"
  },
  "span": {
    "scores":"learn:10"
  },
  "spank": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "spark": {
    "scores":"learn:10; feel:10"
  },
  "spate": {
    "scores":"bond:10"
  },
  "spatter": {
    "scores":"feel:10"
  },
  "spawn": {
    "scores":"acquire:10; feel:10"
  },
  "speak": {
    "scores":"acquire:10; feel:10"
  },
  "spear": {
    "scores":"learn:10"
  },
  "specimen": {
    "scores":"learn:10; feel:10"
  },
  "speck": {
    "scores":"feel:10"
  },
  "speculate": {
    "scores":"feel:10"
  },
  "speed": {
    "scores":"defend:10; learn:10"
  },
  "spell": {
    "scores":"learn:10"
  },
  "spellbind": {
    "scores":"learn:10"
  },
  "spend": {
    "scores":"acquire:10; defend:10"
  },
  "spice": {
    "scores":"feel:10"
  },
  "spike": {
    "scores":"learn:10"
  },
  "spill": {
    "scores":"learn:10"
  },
  "spin": {
    "scores":"learn:10; bond:10"
  },
  "spit": {
    "scores":"learn:10; feel:10"
  },
  "spite": {
    "scores":"feel:10"
  },
  "spitting": {
    "scores":"feel:10"
  },
  "splash": {
    "scores":"feel:10"
  },
  "spoil": {
    "scores":"defend:10"
  },
  "spoof": {
    "scores":"learn:10"
  },
  "spook": {
    "scores":"learn:10"
  },
  "spot": {
    "scores":"learn:10; feel:10; bond:10"
  },
  "spout": {
    "scores":"feel:10"
  },
  "spread": {
    "scores":"acquire:10; defend:10"
  },
  "spring": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "sprinkling": {
    "scores":"feel:10"
  },
  "sprint": {
    "scores":"learn:10"
  },
  "spruce": {
    "scores":"learn:10"
  },
  "spur": {
    "scores":"defend:10; learn:10; bond:10"
  },
  "spurn": {
    "scores":"learn:10; feel:10"
  },
  "spy": {
    "scores":"learn:10; feel:10"
  },
  "squad": {
    "scores":"bond:10"
  },
  "squander": {
    "scores":"defend:10"
  },
  "squeeze": {
    "scores":"feel:10; bond:10"
  },
  "stab": {
    "scores":"learn:10; feel:10"
  },
  "stack": {
    "scores":"bond:10"
  },
  "stage": {
    "scores":"acquire:10"
  },
  "stake": {
    "scores":"acquire:10; feel:10"
  },
  "stalemate": {
    "scores":"acquire:10; bond:10"
  },
  "stalk": {
    "scores":"learn:10"
  },
  "stall": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "stalwart": {
    "scores":"feel:10"
  },
  "stamp": {
    "scores":"learn:10"
  },
  "stand": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "standing": {
    "scores":"learn:10"
  },
  "standoff": {
    "scores":"acquire:10; bond:10"
  },
  "standout": {
    "scores":"feel:10"
  },
  "star": {
    "scores":"feel:10"
  },
  "start": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "startle": {
    "scores":"learn:10"
  },
  "state": {
    "scores":"acquire:10; feel:10"
  },
  "statuette": {
    "scores":"feel:10"
  },
  "status": {
    "scores":"bond:10"
  },
  "statute": {
    "scores":"feel:10"
  },
  "stave": {
    "scores":"defend:10; learn:10"
  },
  "stay": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "stead": {
    "scores":"acquire:10; learn:10"
  },
  "steady": {
    "scores":"acquire:10; defend:10"
  },
  "steal": {
    "scores":"acquire:10; bond:10"
  },
  "steek": {
    "scores":"acquire:10; feel:10"
  },
  "step": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "steps": {
    "scores":"learn:10"
  },
  "stew": {
    "scores":"acquire:10; learn:10"
  },
  "steward": {
    "scores":"acquire:10; learn:10"
  },
  "stick": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "sticky": {
    "scores":"learn:10; bond:10"
  },
  "stiff": {
    "scores":"learn:10; feel:10; bond:10"
  },
  "stifle": {
    "scores":"feel:10"
  },
  "sting": {
    "scores":"feel:10"
  },
  "stinger": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "stir": {
    "scores":"learn:10; feel:10"
  },
  "stitch": {
    "scores":"feel:10"
  },
  "stock": {
    "scores":"feel:10"
  },
  "stockade": {
    "scores":"feel:10"
  },
  "stomach": {
    "scores":"defend:10; feel:10"
  },
  "stop": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "store": {
    "scores":"bond:10"
  },
  "storm": {
    "scores":"learn:10"
  },
  "stormy": {
    "scores":"acquire:10"
  },
  "story": {
    "scores":"bond:10"
  },
  "stow": {
    "scores":"learn:10"
  },
  "straighten": {
    "scores":"learn:10"
  },
  "strain": {
    "scores":"learn:10; feel:10"
  },
  "strait": {
    "scores":"feel:10"
  },
  "strangle": {
    "scores":"feel:10"
  },
  "strategy": {
    "scores":"acquire:10; learn:10"
  },
  "stray": {
    "scores":"learn:10"
  },
  "streak": {
    "scores":"feel:10; bond:10"
  },
  "stream": {
    "scores":"learn:10"
  },
  "streamlet": {
    "scores":"learn:10"
  },
  "street": {
    "scores":"feel:10"
  },
  "strenuous": {
    "scores":"learn:10"
  },
  "stress": {
    "scores":"acquire:10"
  },
  "stretch": {
    "scores":"acquire:10"
  },
  "stricture": {
    "scores":"feel:10; bond:10"
  },
  "strike": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "string": {
    "scores":"learn:10; bond:10"
  },
  "stripe": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "strive": {
    "scores":"learn:10"
  },
  "stroke": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "stroll": {
    "scores":"learn:10"
  },
  "strong": {
    "scores":"feel:10"
  },
  "stronghold": {
    "scores":"feel:10"
  },
  "struggle": {
    "scores":"learn:10"
  },
  "study": {
    "scores":"learn:10; feel:10"
  },
  "stumble": {
    "scores":"learn:10; feel:10"
  },
  "stumbling": {
    "scores":"bond:10"
  },
  "stupe": {
    "scores":"feel:10"
  },
  "stupid": {
    "scores":"feel:10"
  },
  "sturdy": {
    "scores":"feel:10"
  },
  "style": {
    "scores":"acquire:10"
  },
  "stymie": {
    "scores":"feel:10; bond:10"
  },
  "sub": {
    "scores":"defend:10; learn:10"
  },
  "subdue": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "subduer": {
    "scores":"learn:10"
  },
  "submerge": {
    "scores":"feel:10"
  },
  "subnormal": {
    "scores":"bond:10"
  },
  "subsistence": {
    "scores":"defend:10"
  },
  "substantiate": {
    "scores":"defend:10"
  },
  "substantiation": {
    "scores":"feel:10"
  },
  "substitute": {
    "scores":"defend:10; learn:10"
  },
  "subsume": {
    "scores":"acquire:10"
  },
  "succeed": {
    "scores":"learn:10"
  },
  "success": {
    "scores":"learn:10"
  },
  "succumb": {
    "scores":"feel:10"
  },
  "suck": {
    "scores":"learn:10; feel:10"
  },
  "sucker": {
    "scores":"learn:10; feel:10"
  },
  "suffer": {
    "scores":"acquire:10; feel:10"
  },
  "suit": {
    "scores":"acquire:10; feel:10"
  },
  "suitcase": {
    "scores":"acquire:10"
  },
  "suite": {
    "scores":"learn:10; bond:10"
  },
  "sum": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "sup": {
    "scores":"acquire:10"
  },
  "super": {
    "scores":"bond:10"
  },
  "superintend": {
    "scores":"acquire:10; learn:10"
  },
  "supernova": {
    "scores":"learn:10"
  },
  "supersize": {
    "scores":"bond:10"
  },
  "supersized": {
    "scores":"bond:10"
  },
  "superstar": {
    "scores":"feel:10"
  },
  "supervene": {
    "scores":"learn:10"
  },
  "supervise": {
    "scores":"acquire:10; learn:10"
  },
  "supplement": {
    "scores":"acquire:10"
  },
  "support": {
    "scores":"defend:10; feel:10"
  },
  "suppose": {
    "scores":"acquire:10; feel:10"
  },
  "supposition": {
    "scores":"feel:10"
  },
  "suppress": {
    "scores":"defend:10"
  },
  "supreme": {
    "scores":"learn:10"
  },
  "sure": {
    "scores":"acquire:10; defend:10"
  },
  "sureness": {
    "scores":"bond:10"
  },
  "surety": {
    "scores":"bond:10"
  },
  "surface": {
    "scores":"defend:10"
  },
  "surmise": {
    "scores":"feel:10"
  },
  "surmount": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "surpass": {
    "scores":"defend:10"
  },
  "survey": {
    "scores":"feel:10"
  },
  "survive": {
    "scores":"feel:10"
  },
  "suspect": {
    "scores":"feel:10"
  },
  "suspicion": {
    "scores":"feel:10"
  },
  "sustain": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "swagger": {
    "scores":"defend:10"
  },
  "swallow": {
    "scores":"feel:10"
  },
  "swamp": {
    "scores":"learn:10; bond:10"
  },
  "swarm": {
    "scores":"learn:10; feel:10"
  },
  "swat": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "swathe": {
    "scores":"bond:10"
  },
  "sway": {
    "scores":"acquire:10; feel:10"
  },
  "swear": {
    "scores":"feel:10; bond:10"
  },
  "sweat": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "sweaty": {
    "scores":"learn:10"
  },
  "sweep": {
    "scores":"learn:10; bond:10"
  },
  "swell": {
    "scores":"acquire:10"
  },
  "swelled": {
    "scores":"feel:10"
  },
  "swellheadedness": {
    "scores":"feel:10"
  },
  "swelling": {
    "scores":"bond:10"
  },
  "swerve": {
    "scores":"learn:10; bond:10"
  },
  "swig": {
    "scores":"acquire:10"
  },
  "swill": {
    "scores":"acquire:10"
  },
  "swim": {
    "scores":"learn:10"
  },
  "swindle": {
    "scores":"feel:10"
  },
  "swing": {
    "scores":"learn:10; bond:10"
  },
  "swipe": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "swirl": {
    "scores":"learn:10; bond:10"
  },
  "switch": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "swivel": {
    "scores":"learn:10; bond:10"
  },
  "swoon": {
    "scores":"feel:10"
  },
  "sympathetic": {
    "scores":"feel:10"
  },
  "sympathize": {
    "scores":"feel:10"
  },
  "sympathy": {
    "scores":"feel:10"
  },
  "symphony": {
    "scores":"bond:10"
  },
  "systematize": {
    "scores":"acquire:10"
  },
  "tack": {
    "scores":"acquire:10"
  },
  "tacky": {
    "scores":"learn:10; bond:10"
  },
  "tactical": {
    "scores":"learn:10"
  },
  "tactics": {
    "scores":"acquire:10"
  },
  "tad": {
    "scores":"feel:10"
  },
  "tag": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "tail": {
    "scores":"learn:10"
  },
  "tailback": {
    "scores":"bond:10"
  },
  "tailor": {
    "scores":"acquire:10; feel:10"
  },
  "talk": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "talker": {
    "scores":"feel:10"
  },
  "tall": {
    "scores":"learn:10"
  },
  "tame": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "tangle": {
    "scores":"learn:10; bond:10"
  },
  "tap": {
    "scores":"acquire:10; feel:10"
  },
  "taskmaster": {
    "scores":"learn:10"
  },
  "taste": {
    "scores":"feel:10"
  },
  "tatterdemalion": {
    "scores":"learn:10"
  },
  "tatty": {
    "scores":"learn:10"
  },
  "team": {
    "scores":"bond:10"
  },
  "tear": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "technique": {
    "scores":"acquire:10"
  },
  "telescope": {
    "scores":"bond:10"
  },
  "tell": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "temper": {
    "scores":"feel:10"
  },
  "tempestuous": {
    "scores":"acquire:10"
  },
  "tenacious": {
    "scores":"bond:10"
  },
  "tend": {
    "scores":"acquire:10; learn:10"
  },
  "tendency": {
    "scores":"learn:10"
  },
  "tender": {
    "scores":"feel:10"
  },
  "tenderhearted": {
    "scores":"feel:10"
  },
  "tenement": {
    "scores":"learn:10"
  },
  "tenens": {
    "scores":"defend:10"
  },
  "tent": {
    "scores":"defend:10"
  },
  "terminate": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "terra": {
    "scores":"acquire:10"
  },
  "terrify": {
    "scores":"learn:10"
  },
  "terror": {
    "scores":"learn:10"
  },
  "terrorize": {
    "scores":"learn:10"
  },
  "testament": {
    "scores":"feel:10"
  },
  "testify": {
    "scores":"feel:10"
  },
  "testimonial": {
    "scores":"feel:10"
  },
  "testimony": {
    "scores":"feel:10"
  },
  "testing": {
    "scores":"learn:10"
  },
  "thaw": {
    "scores":"learn:10"
  },
  "thickhead": {
    "scores":"feel:10"
  },
  "thimblerig": {
    "scores":"feel:10"
  },
  "thing": {
    "scores":"learn:10; feel:10"
  },
  "think": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "thinker": {
    "scores":"feel:10"
  },
  "thirst": {
    "scores":"feel:10"
  },
  "thorough": {
    "scores":"defend:10"
  },
  "thoroughfare": {
    "scores":"feel:10"
  },
  "thought": {
    "scores":"learn:10"
  },
  "thrash": {
    "scores":"learn:10"
  },
  "threadbare": {
    "scores":"learn:10"
  },
  "throe": {
    "scores":"feel:10"
  },
  "throes": {
    "scores":"feel:10"
  },
  "throng": {
    "scores":"learn:10"
  },
  "throw": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "thruway": {
    "scores":"feel:10"
  },
  "thud": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "thumb": {
    "scores":"learn:10"
  },
  "thump": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "thunder": {
    "scores":"feel:10"
  },
  "thwack": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "tidbit": {
    "scores":"feel:10"
  },
  "tide": {
    "scores":"learn:10"
  },
  "tidy": {
    "scores":"learn:10"
  },
  "tie": {
    "scores":"feel:10; bond:10"
  },
  "till": {
    "scores":"acquire:10"
  },
  "time": {
    "scores":"learn:10"
  },
  "timeworn": {
    "scores":"learn:10"
  },
  "tingle": {
    "scores":"feel:10"
  },
  "tip": {
    "scores":"learn:10"
  },
  "tire": {
    "scores":"acquire:10; defend:10"
  },
  "titanic": {
    "scores":"bond:10"
  },
  "titillate": {
    "scores":"learn:10"
  },
  "toil": {
    "scores":"learn:10"
  },
  "toilsome": {
    "scores":"learn:10"
  },
  "tolbooth": {
    "scores":"feel:10"
  },
  "tolerate": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "ton": {
    "scores":"bond:10"
  },
  "tongs": {
    "scores":"acquire:10"
  },
  "tool": {
    "scores":"feel:10"
  },
  "toss": {
    "scores":"acquire:10"
  },
  "total": {
    "scores":"acquire:10; feel:10"
  },
  "tote": {
    "scores":"acquire:10"
  },
  "touch": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "tough": {
    "scores":"learn:10"
  },
  "tow": {
    "scores":"acquire:10"
  },
  "toylike": {
    "scores":"bond:10"
  },
  "trace": {
    "scores":"learn:10; feel:10"
  },
  "track": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "trackless": {
    "scores":"learn:10"
  },
  "tract": {
    "scores":"acquire:10"
  },
  "trade": {
    "scores":"bond:10"
  },
  "traduce": {
    "scores":"defend:10"
  },
  "traffic": {
    "scores":"bond:10"
  },
  "tragedy": {
    "scores":"acquire:10"
  },
  "trail": {
    "scores":"learn:10"
  },
  "train": {
    "scores":"acquire:10; feel:10; bond:10"
  },
  "traipse": {
    "scores":"acquire:10"
  },
  "trammel": {
    "scores":"feel:10; bond:10"
  },
  "trance": {
    "scores":"learn:10"
  },
  "transaction": {
    "scores":"bond:10"
  },
  "transcend": {
    "scores":"defend:10"
  },
  "transfer": {
    "scores":"feel:10"
  },
  "transfigure": {
    "scores":"acquire:10; feel:10"
  },
  "transfix": {
    "scores":"learn:10"
  },
  "transform": {
    "scores":"acquire:10; feel:10"
  },
  "transgress": {
    "scores":"defend:10"
  },
  "transit": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "translate": {
    "scores":"acquire:10; feel:10"
  },
  "transmit": {
    "scores":"feel:10"
  },
  "transmute": {
    "scores":"acquire:10; feel:10"
  },
  "transpierce": {
    "scores":"learn:10"
  },
  "transpire": {
    "scores":"acquire:10; feel:10"
  },
  "transport": {
    "scores":"acquire:10"
  },
  "transpose": {
    "scores":"acquire:10; feel:10"
  },
  "transubstantiate": {
    "scores":"acquire:10; feel:10"
  },
  "transude": {
    "scores":"feel:10"
  },
  "trap": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "trash": {
    "scores":"learn:10"
  },
  "travail": {
    "scores":"learn:10"
  },
  "travel": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "treasure": {
    "scores":"learn:10"
  },
  "treat": {
    "scores":"defend:10; bond:10"
  },
  "tremendous": {
    "scores":"bond:10"
  },
  "trend": {
    "scores":"learn:10; bond:10"
  },
  "trepidation": {
    "scores":"learn:10"
  },
  "trial": {
    "scores":"feel:10"
  },
  "trick": {
    "scores":"learn:10"
  },
  "tried": {
    "scores":"acquire:10; defend:10"
  },
  "trifle": {
    "scores":"defend:10"
  },
  "trigger": {
    "scores":"learn:10"
  },
  "trim": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "trimmer": {
    "scores":"learn:10"
  },
  "trimming": {
    "scores":"learn:10"
  },
  "trip": {
    "scores":"learn:10; feel:10"
  },
  "triumph": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "troll": {
    "scores":"learn:10"
  },
  "tromp": {
    "scores":"learn:10"
  },
  "trot": {
    "scores":"defend:10; learn:10"
  },
  "trots": {
    "scores":"learn:10"
  },
  "trouble": {
    "scores":"bond:10"
  },
  "trounce": {
    "scores":"learn:10"
  },
  "trouncing": {
    "scores":"learn:10"
  },
  "truckload": {
    "scores":"bond:10"
  },
  "trump": {
    "scores":"acquire:10; feel:10"
  },
  "trumpet": {
    "scores":"feel:10"
  },
  "truss": {
    "scores":"bond:10"
  },
  "trust": {
    "scores":"defend:10; feel:10"
  },
  "trustable": {
    "scores":"acquire:10; defend:10"
  },
  "trustworthy": {
    "scores":"acquire:10; defend:10"
  },
  "trusty": {
    "scores":"acquire:10; defend:10"
  },
  "try": {
    "scores":"feel:10"
  },
  "tucker": {
    "scores":"acquire:10; defend:10"
  },
  "tug": {
    "scores":"acquire:10; learn:10"
  },
  "tumble": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "tumbledown": {
    "scores":"learn:10"
  },
  "tumultuous": {
    "scores":"acquire:10"
  },
  "turbulent": {
    "scores":"acquire:10"
  },
  "turf": {
    "scores":"learn:10"
  },
  "turista": {
    "scores":"learn:10"
  },
  "turkey": {
    "scores":"feel:10"
  },
  "turn": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "turnpike": {
    "scores":"feel:10"
  },
  "twig": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "twin": {
    "scores":"feel:10"
  },
  "twinge": {
    "scores":"feel:10"
  },
  "twirl": {
    "scores":"learn:10; bond:10"
  },
  "twist": {
    "scores":"learn:10; bond:10"
  },
  "umpire": {
    "scores":"learn:10; feel:10"
  },
  "unbalance": {
    "scores":"learn:10"
  },
  "unbosom": {
    "scores":"learn:10"
  },
  "unbuild": {
    "scores":"acquire:10"
  },
  "uncloak": {
    "scores":"learn:10"
  },
  "unconsidered": {
    "scores":"bond:10"
  },
  "uncover": {
    "scores":"learn:10"
  },
  "undergird": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "undergo": {
    "scores":"feel:10"
  },
  "underline": {
    "scores":"acquire:10"
  },
  "underpin": {
    "scores":"acquire:10; defend:10; feel:10"
  },
  "underpinning": {
    "scores":"defend:10; learn:10"
  },
  "underscore": {
    "scores":"acquire:10"
  },
  "undersized": {
    "scores":"bond:10"
  },
  "understand": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "understanding": {
    "scores":"feel:10; bond:10"
  },
  "unfairness": {
    "scores":"bond:10"
  },
  "unfold": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "unhealthy": {
    "scores":"learn:10"
  },
  "unhinge": {
    "scores":"learn:10"
  },
  "unify": {
    "scores":"bond:10"
  },
  "union": {
    "scores":"bond:10"
  },
  "unite": {
    "scores":"bond:10"
  },
  "universal": {
    "scores":"defend:10"
  },
  "unjustness": {
    "scores":"bond:10"
  },
  "unmask": {
    "scores":"learn:10"
  },
  "uno": {
    "scores":"learn:10"
  },
  "unplanned": {
    "scores":"bond:10"
  },
  "unpremeditated": {
    "scores":"bond:10"
  },
  "unprepared": {
    "scores":"bond:10"
  },
  "unravel": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "unreal": {
    "scores":"acquire:10; feel:10"
  },
  "unrehearsed": {
    "scores":"bond:10"
  },
  "unriddle": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "unsound": {
    "scores":"learn:10"
  },
  "unstring": {
    "scores":"learn:10"
  },
  "unstudied": {
    "scores":"bond:10"
  },
  "untraveled": {
    "scores":"learn:10"
  },
  "untraversed": {
    "scores":"learn:10"
  },
  "untrodden": {
    "scores":"learn:10"
  },
  "unveil": {
    "scores":"learn:10"
  },
  "unwashed": {
    "scores":"learn:10"
  },
  "unwell": {
    "scores":"learn:10"
  },
  "upend": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "uphill": {
    "scores":"learn:10"
  },
  "uphold": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "uplift": {
    "scores":"defend:10; learn:10"
  },
  "upper": {
    "scores":"acquire:10; learn:10"
  },
  "upraise": {
    "scores":"defend:10; learn:10"
  },
  "uproot": {
    "scores":"acquire:10; learn:10"
  },
  "uptick": {
    "scores":"acquire:10"
  },
  "use": {
    "scores":"acquire:10; feel:10; bond:10"
  },
  "utopia": {
    "scores":"acquire:10"
  },
  "utter": {
    "scores":"acquire:10; feel:10"
  },
  "vacillation": {
    "scores":"defend:10"
  },
  "vaingloriousness": {
    "scores":"feel:10"
  },
  "vainglory": {
    "scores":"feel:10"
  },
  "vainness": {
    "scores":"feel:10"
  },
  "valid": {
    "scores":"feel:10"
  },
  "validate": {
    "scores":"defend:10"
  },
  "validation": {
    "scores":"feel:10"
  },
  "vamoose": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "vamp": {
    "scores":"acquire:10; feel:10"
  },
  "vanity": {
    "scores":"feel:10"
  },
  "vanquisher": {
    "scores":"learn:10"
  },
  "vantage": {
    "scores":"acquire:10; learn:10"
  },
  "vapor": {
    "scores":"defend:10"
  },
  "vaporize": {
    "scores":"acquire:10"
  },
  "variety": {
    "scores":"acquire:10; learn:10"
  },
  "vary": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "vast": {
    "scores":"bond:10"
  },
  "vasty": {
    "scores":"bond:10"
  },
  "vaticinate": {
    "scores":"feel:10"
  },
  "vaunt": {
    "scores":"defend:10"
  },
  "veer": {
    "scores":"defend:10; learn:10; bond:10"
  },
  "veil": {
    "scores":"defend:10"
  },
  "vend": {
    "scores":"bond:10"
  },
  "vent": {
    "scores":"feel:10"
  },
  "ventilate": {
    "scores":"feel:10"
  },
  "verbalize": {
    "scores":"acquire:10; feel:10"
  },
  "verdict": {
    "scores":"feel:10"
  },
  "verify": {
    "scores":"defend:10"
  },
  "verse": {
    "scores":"learn:10"
  },
  "versed": {
    "scores":"learn:10"
  },
  "vest": {
    "scores":"feel:10"
  },
  "veteran": {
    "scores":"learn:10"
  },
  "vex": {
    "scores":"feel:10"
  },
  "vibration": {
    "scores":"feel:10"
  },
  "victimize": {
    "scores":"feel:10"
  },
  "view": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "vilipend": {
    "scores":"learn:10"
  },
  "vindicate": {
    "scores":"defend:10"
  },
  "VIP": {
    "scores":"feel:10"
  },
  "virile": {
    "scores":"bond:10"
  },
  "virtuoso": {
    "scores":"learn:10"
  },
  "visage": {
    "scores":"feel:10"
  },
  "viscid": {
    "scores":"bond:10"
  },
  "vision": {
    "scores":"feel:10"
  },
  "visit": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "visonary": {
    "scores":"acquire:10; feel:10"
  },
  "visual": {
    "scores":"feel:10"
  },
  "visualize": {
    "scores":"feel:10"
  },
  "vitiate": {
    "scores":"defend:10"
  },
  "vocalize": {
    "scores":"acquire:10; feel:10"
  },
  "vociferate": {
    "scores":"feel:10"
  },
  "voice": {
    "scores":"feel:10"
  },
  "volcanic": {
    "scores":"acquire:10"
  },
  "volition": {
    "scores":"learn:10"
  },
  "volume": {
    "scores":"bond:10"
  },
  "vouch": {
    "scores":"feel:10"
  },
  "voucher": {
    "scores":"feel:10"
  },
  "vow": {
    "scores":"bond:10"
  },
  "wad": {
    "scores":"bond:10"
  },
  "wager": {
    "scores":"acquire:10; feel:10"
  },
  "waken": {
    "scores":"acquire:10"
  },
  "walk": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "wall": {
    "scores":"defend:10"
  },
  "wallet": {
    "scores":"acquire:10"
  },
  "wallop": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "walloping": {
    "scores":"bond:10"
  },
  "wander": {
    "scores":"learn:10"
  },
  "want": {
    "scores":"feel:10"
  },
  "ward": {
    "scores":"acquire:10; defend:10; learn:10"
  },
  "warden": {
    "scores":"defend:10"
  },
  "warder": {
    "scores":"defend:10"
  },
  "ware": {
    "scores":"defend:10; feel:10"
  },
  "warmhearted": {
    "scores":"feel:10"
  },
  "warmheartedness": {
    "scores":"feel:10"
  },
  "warp": {
    "scores":"learn:10"
  },
  "warranty": {
    "scores":"bond:10"
  },
  "wash": {
    "scores":"acquire:10; defend:10"
  },
  "waste": {
    "scores":"acquire:10"
  },
  "watch": {
    "scores":"defend:10; learn:10; feel:10"
  },
  "watcher": {
    "scores":"defend:10"
  },
  "watchman": {
    "scores":"defend:10"
  },
  "water": {
    "scores":"bond:10"
  },
  "wavering": {
    "scores":"defend:10"
  },
  "wax": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "way": {
    "scores":"acquire:10; learn:10"
  },
  "weaken": {
    "scores":"bond:10"
  },
  "wealth": {
    "scores":"bond:10"
  },
  "wear": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "weary": {
    "scores":"acquire:10; defend:10"
  },
  "weep": {
    "scores":"feel:10"
  },
  "weigh": {
    "scores":"learn:10; feel:10"
  },
  "weight": {
    "scores":"acquire:10"
  },
  "wellspring": {
    "scores":"learn:10"
  },
  "welt": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "welter": {
    "scores":"acquire:10; learn:10"
  },
  "whack": {
    "scores":"acquire:10; learn:10; feel:10; bond:10"
  },
  "whacking": {
    "scores":"bond:10"
  },
  "whale": {
    "scores":"acquire:10; learn:10"
  },
  "wham": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "wheel": {
    "scores":"learn:10; bond:10"
  },
  "wheeze": {
    "scores":"defend:10"
  },
  "whiff": {
    "scores":"learn:10; feel:10"
  },
  "whip": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "whipper": {
    "scores":"learn:10"
  },
  "whipping": {
    "scores":"learn:10"
  },
  "whirl": {
    "scores":"defend:10; learn:10; feel:10; bond:10"
  },
  "whisk": {
    "scores":"defend:10; learn:10"
  },
  "whitewash": {
    "scores":"feel:10"
  },
  "whiz": {
    "scores":"learn:10; feel:10"
  },
  "wholesome": {
    "scores":"feel:10"
  },
  "whomp": {
    "scores":"learn:10"
  },
  "whop": {
    "scores":"acquire:10; learn:10; bond:10"
  },
  "whopping": {
    "scores":"bond:10"
  },
  "whup": {
    "scores":"learn:10"
  },
  "wicket": {
    "scores":"learn:10; bond:10"
  },
  "wig": {
    "scores":"learn:10"
  },
  "wight": {
    "scores":"learn:10; feel:10"
  },
  "willy": {
    "scores":"learn:10"
  },
  "win": {
    "scores":"acquire:10; defend:10; learn:10; feel:10"
  },
  "wind": {
    "scores":"learn:10; feel:10"
  },
  "windbag": {
    "scores":"feel:10"
  },
  "wink": {
    "scores":"learn:10; feel:10"
  },
  "winner": {
    "scores":"learn:10"
  },
  "wipe": {
    "scores":"learn:10"
  },
  "wire": {
    "scores":"bond:10"
  },
  "wisdom": {
    "scores":"feel:10"
  },
  "wise": {
    "scores":"acquire:10; learn:10"
  },
  "wiseacre": {
    "scores":"learn:10"
  },
  "wiseass": {
    "scores":"learn:10"
  },
  "wisenheimer": {
    "scores":"learn:10"
  },
  "wish": {
    "scores":"feel:10"
  },
  "wit": {
    "scores":"feel:10"
  },
  "withdraw": {
    "scores":"acquire:10"
  },
  "withhold": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "witness": {
    "scores":"learn:10; feel:10"
  },
  "wiz": {
    "scores":"feel:10"
  },
  "wizard": {
    "scores":"learn:10; feel:10"
  },
  "wobbling": {
    "scores":"defend:10"
  },
  "woodenhead": {
    "scores":"feel:10"
  },
  "woof": {
    "scores":"learn:10"
  },
  "woolgathering": {
    "scores":"learn:10"
  },
  "word": {
    "scores":"acquire:10; feel:10"
  },
  "work": {
    "scores":"acquire:10; defend:10; learn:10; feel:10; bond:10"
  },
  "worldly": {
    "scores":"learn:10"
  },
  "worst": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "wrack": {
    "scores":"acquire:10"
  },
  "wrap": {
    "scores":"bond:10"
  },
  "wraps": {
    "scores":"defend:10"
  },
  "wreck": {
    "scores":"acquire:10"
  },
  "wrench": {
    "scores":"acquire:10"
  },
  "wrest": {
    "scores":"acquire:10; learn:10"
  },
  "wrestle": {
    "scores":"learn:10; feel:10"
  },
  "wring": {
    "scores":"acquire:10; learn:10"
  },
  "write": {
    "scores":"defend:10; learn:10"
  },
  "wrong": {
    "scores":"bond:10"
  },
  "wurst": {
    "scores":"bond:10"
  },
  "yahoo": {
    "scores":"feel:10"
  },
  "yank": {
    "scores":"acquire:10; learn:10"
  },
  "yard": {
    "scores":"bond:10"
  },
  "yaw": {
    "scores":"defend:10; bond:10"
  },
  "yearn": {
    "scores":"feel:10"
  },
  "yell": {
    "scores":"feel:10"
  },
  "yen": {
    "scores":"feel:10"
  },
  "yield": {
    "scores":"acquire:10; learn:10; feel:10"
  },
  "yo": {
    "scores":"feel:10"
  },
  "yoke": {
    "scores":"bond:10"
  },
  "zag": {
    "scores":"defend:10; bond:10"
  },
  "zap": {
    "scores":"acquire:10; learn:10"
  },
  "zig": {
    "scores":"defend:10; bond:10"
  },
  "zip": {
    "scores":"defend:10; learn:10"
  },
  "zone": {
    "scores":"acquire:10"
  },
  "zoom": {
    "scores":"defend:10; learn:10"
  }
};

var min_relevancy = 5;

var finalscoring = new Array();
var exportarray = new Array();

var wordsdb = new Array();

var desires = ['learn','feel','acquire','defend','bond'];

/**
* Primary AWS Lambda call
*
* @method handler
* @param {Object} event - must contain siteurl param
* @param {Object} context - AWS callback object and handler
*/
exports.handler = function(event, context) {


if(event.siteurl === undefined){
	context.done('error','invalid url provided');
}else{
	if (!validUrl.isUri(event.siteurl)){
        
        event.siteurl = "http://"+event.siteurl;
        if (!validUrl.isUri(event.siteurl))
		{
			context.done('error','invalid url provided.');
			return;	
		}
    } 
    
    console.log('Looks like a valid URL '+event.siteurl);
    


var brandurl = event.siteurl;

async.series([
	function(callback_middle){
		wordsdb.splice(0,wordsdb.length);
		insertContentFromPages(brandurl,callback_middle);
	},
	function(callback_middle){
		getScores(callback_middle);
	}
	],function(err,results){
		tallyScores(context);
	});

}
};

/**
* Sifts through large JSON object (graphdb defined up above) to aggregrate score values 
*
* @method getScores
* @param {Object} callback - internal callback handler
*/
function getScores(callback){
	var wordsuniques = new Array();
	wordsuniques.splice(0,wordsuniques.length);
	wordsuniques = array_counter(wordsdb);
	
	var testwords = new Array();
	testwords.splice(0,testwords.length);
	testwords = arrayKeys(wordsuniques);
	console.log(testwords);
	//Clean arrays, since AWS Lambda leaks memory like a sieve
	finalscoring.splice(0,finalscoring.length);
	for(var i=0;i<desires.length;i++){
		finalscoring[desires[i]]=0;
	}

	async.eachSeries(testwords, function(testword, cb) {
		
		
		
		if(graphdb[testword] != undefined && graphdb[testword].scores != undefined){
			var scores = graphdb[testword].scores;
			if(scores.indexOf(";")>-1){
				var scoresarray = scores.split(";");
				for(var i=0; i<scoresarray.length;i++){
					var scorearray = scoresarray[i].split(":");
					
					if( finalscoring[scorearray[0].trim()] === undefined) {
						finalscoring[scorearray[0].trim()] = scorearray[1]*wordsuniques[testword];
				   	}else{
					   	finalscoring[scorearray[0].trim()] += scorearray[1]*wordsuniques[testword];
				   	}
				}
			}else{
				var scorearray = scores.split(":");
				
				if( finalscoring[scorearray[0].trim()] === undefined) {
					finalscoring[scorearray[0].trim()] = scorearray[1]*wordsuniques[testword];
			   	}else{
				   	finalscoring[scorearray[0].trim()] += scorearray[1]*wordsuniques[testword];
			   	}
			}
			console.log(finalscoring); 
		}
	     
	        cb(null);
	    
	}, function done(){
		callback();
	});
}
		
		
/**
* computes outputed driver scores 
*
* @method tallyScores
* @param {Object} context - AWS callback handler
*/	
function tallyScores(context){
		
		
		var keys = arrayKeys(finalscoring);
		keys = keys.sort();
			
		var total = 0;
	
		
		for(i=0;i<keys.length;i++)
		{
			total += finalscoring[keys[i]];
		}
		var finaldisplayraw = new Array();
		finaldisplayraw.splice(0,finaldisplayraw.length);
		var finaldisplayperct = new Array();
		finaldisplayperct.splice(0,finaldisplayperct.length);
		var outputstring = "";
		for(i=0;i<keys.length;i++)
		{
			finaldisplayraw[keys[i]] = finalscoring[keys[i]];
			finaldisplayperct[keys[i]] = Math.round((finalscoring[keys[i]]/total)*100);
			if(i==0){
				outputstring = '{ \''+keys[i]+'\':'+finaldisplayperct[keys[i]]+'';
			}else{
				outputstring = outputstring+',\''+keys[i]+'\':'+finaldisplayperct[keys[i]]+'';
			}
		}
		console.log("BRAND SCORE:");
		console.log(finaldisplayraw);
		console.log(finaldisplayperct);
		outputstring = outputstring+"}";
		context.done(null,outputstring);
}
	


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
	console.log('Retrieving content from:'+brandurl);
	request(brandurl, {followAllRedirects:true}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		var text = htmlToText.fromString(body, {
		  wordwrap: false
		});
		addscrapetodb(text,callback_middle);
	  }

	});

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
* Helper function used by getScores that dedups records prior to counting
*
* @method array_counter
* @param {Array} a - array of all words prior to de-duping
* @param {Array} counts - returns array with word frequency information
*/	
function array_counter(a) {
    console.log("a length:"+a.length);
    var counts = new Array();
    var localcounts = new Array();
    counts.splice(0,counts.length);
    localcounts.splice(0,localcounts.length);
    
    for(var i = 0; i <= a.length; i++) {
	    var word = a[i];
	    
	    if(word != undefined && word.length>2 && uselesswords.indexOf(word.toLowerCase())===-1 && !isNumber(word)){
	        word = word.toLowerCase();
	        if( localcounts[word] === undefined) {
	            localcounts[word] = 1;
	        } else {
	            localcounts[word]++;
	            if(localcounts[word]>=min_relevancy){
		            //console.log(word+":"+localcounts[word]);
		            counts[word] = localcounts[word];
	            }
	        }
		}
		
    }
    console.log('done with array cleaning');
    //console.log(counts);
    return counts;
}

function isNumber(obj) { return !isNaN(parseFloat(obj)) }