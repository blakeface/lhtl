const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const SATwords = require('../words').words;

function getRandomWord(){
	return SATwords[parseInt(Math.random() * SATwords.length - 1)]
}

// returns an object { 'word':, 'definition': y }
function setWordPromise(){
	const options = {
		url: `https://od-api.oxforddictionaries.com/api/v1/entries/en/${getRandomWord()}`,
		headers: {
			app_id: process.env.APP_ID,
			app_key: process.env.APP_KEY
		},
		json: true
	}
	return rp(options)
		.then(data => {

			const obj = new Object();
			obj.word = data.results[0].word;
			obj.definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
			// some words don't have examples
			if (data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0])
				obj.example = data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text;
			obj.category = data.results[0].lexicalEntries[0].lexicalCategory;
			return obj;
		})
		.catch(err => console.error(err))
}

// get 5 words via a promise and send to view
let promises = [];
for (var i = 4; i >= 0; i--) {
  promises.push(setWordPromise());
}

Promise.all(promises).then(words => {

	console.log('here are the words:', words)

	/* GET home page. */
	router.get('/', function(req, res, next) {
	  res.render('index', {
	  	words: words,
	  });
	});
}, function(err) {
	console.error('error:', err)
});


module.exports = router;
