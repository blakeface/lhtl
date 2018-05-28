const express = require('express');
const wordPromises = require('../helpers/getWordPromises')();
const router = express.Router();

Promise.all(wordPromises).then(words => {
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
