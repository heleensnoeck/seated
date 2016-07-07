// bron Dylan vens & Heleen Snoeck & robert steen

var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');

var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  
	jsonfile.readFile('./data/data.json', function(error, obj){
		
		// in rooms zit het object rooms
		var rooms = obj;

		jsonfile.readFile('./data/dates.json', function(error, obj){
			// in dates zit het object june
			var dates = obj;
			// render beide files 
			res.render('index', { rooms: rooms, dates: dates });

		});

	});

});

router.post('/', function(req, res, next){
	
	var request = req.body;

	if(request.dates) {

		jsonfile.readFile('./data/dates.json', function(error, dates) {

			if (request.dates instanceof Array) {
			  	
			  	// If value is array update all dates
			 	
				for(var i = 0; i < request.dates.length; i++) { 
					
					var requestDate = request.dates[i];
					
					for(var j = 0; j < dates.length; j++) {
						
						var jsonDate = dates[j];

						if (requestDate === jsonDate.date) {  
							
							dates[j].amountOfBookings++;
							
						}
					}
				}

			} else {

				var requestDate = request.dates;

				for(var j = 0; j < dates.length; j++) {
					
					var jsonDate = dates[j];

					if (requestDate === jsonDate.date) {  
						
						dates[j].amountOfBookings++;
						
					}
				}

			}	

			jsonfile.writeFile('./data/dates.json', dates, function (err) {
				if (err) throw err;
			});
			
		});

	}
	
	if(request.radio) { // room3
	
		jsonfile.readFile('./data/data.json', function(error, rooms) {
			
			for(var i = 0; i < rooms.length; i++) {
				
				var jsonDate = rooms[i];

				if (request.radio === rooms[i].title) {
					
					rooms[i].bookedDesks++;

				} 

			}

			jsonfile.writeFile('./data/data.json', rooms, function (err) {
				if (err) throw err;
			});
		
		});

	}

	res.redirect('/');

});

module.exports = router;
