var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');

var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  
	jsonfile.readFile('./data/data.json', function(error, obj){
		
		var rooms = obj.rooms;

		jsonfile.readFile('./data/dates.json', function(error, obj){

			var dates = obj.june;
			res.render('index', { rooms: rooms, dates: dates });

		});

	});

});

router.post('/', function(req, res, next){

	// Gets the information out of the form inputs that are checked.
	console.log(req.body);

	jsonfile.readFile('./data/dates.json', function(error, obj){
		
		var fileObj = obj;
		obj.june[0].status = 'notchecked';

		// 

		jsonfile.writeFile('./data/dates.json', fileObj, function(err) {

			if(err) throw err;

		});
		

	});

});

module.exports = router;
