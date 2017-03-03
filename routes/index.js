// bron Heleen Snoeck & charlotte gieltjes

var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');

var fs = require('fs');

router.get('/', function(req, res, next) {

	var params = req.query; // alles wat achter de ? komt (querystring) 
	var request = req.body; // je html
	var monthArray = ["january","february","march","april","may","june","july","august","september","october","november","december"];
	var monthParam = params.month; // haalt de maand uit de querystring
	// Controleer of een maand is doorgegeven aan de querystring
	if(!(monthParam >= 1 && monthParam <= 12) || !monthParam) { // als dit niet zo is OF de maand niet valide is, haal dan de maand die het nu is op

		var d = new Date(); // je maakt de datum van vandaag aan
		var n = d.getMonth();  // haalt de index van de maand op 
		var month = monthArray[n]; // haal de text op

		jsonfile.readFile('./data/' + month + '.json', function(error, obj){ // zoek de naam van de maand op uit de json file in map data
			var dates = obj; // sla object uit json file op
			res.render('index', { dates: dates }); // render het via het html template
		});

    } else { // als er al een maand is meegegeven dan

		var month = monthArray[monthParam-1]; // haal de maand op (params zijn based op 1 en arrays op 0)

		jsonfile.readFile('./data/' + month + '.json', function(error, obj){
			var dates = obj;
			res.render('index', { dates: dates });
		});

	}

});

router.post('/book', function(req, res, next){ 
	
	var request = req.body;  

	if(request.dates && request.month) { // welke dates heb je aangeklikt en in welke maand zit het

		// haal de json file op van de maand die meegegeven is (in de queystring(post request))
		var monthArray = ["january","february","march","april","may","june","july","august","september","october","november","december"];
		var month = monthArray[request.month-1];
		var maxBookings = 15;

		jsonfile.readFile('./data/' + month + '.json', function(error, dates) {  // leest eerst de file uit en voert daarna de functie error/dates uit
			if (request.dates instanceof Array) { // zijn er meerderen dingen aangeklikt of is er 1 ding aangklikt
				
				for(var i = 0; i < request.dates.length; i++) {  // hier loop je door de geposte dates
					
					var requestDate = request.dates[i]; 
					
					for(var j = 0; j < dates.length; j++) { // hier loop je door de dates uit de json file
						
						var jsonDate = dates[j];

						if (requestDate === jsonDate.date) {  // als de date die aangeklikt is overeen komt met een date in de json file
							
							if (dates[j].amountOfBookings >= 0 || dates[j].amountOfBookings < maxBookings) { dates[j].amountOfBookings++; } // Als het aantal boekings van de datum >= 0 of minder dan het maximaal aantal boekingen tel dan 1 op 
							
						}
					}
				}

			} else { 

				var requestDate = request.dates;

				for(var j = 0; j < dates.length; j++) {

					var jsonDate = dates[j];

					if (requestDate === jsonDate.date) {  

						if (dates[j].amountOfBookings >= 0 || dates[j].amountOfBookings < maxBookings) { dates[j].amountOfBookings++; }
						
					}
				}

			}	

			jsonfile.writeFile('./data/' + month + '.json', dates, function (err) { // hier schrijft hij het ook daadwerkelijk weg
				if (err) throw err;
			});
		
		});

	}

	res.redirect('/');
	
});

router.post('/remove', function(req, res, next){
	
	var request = req.body;

	if(request.dates && request.month) {

		var monthArray = ["january","february","march","april","may","june","july","august","september","october","november","december"];
		var month = monthArray[request.month-1];
		var maxBookings = 15;

		jsonfile.readFile('./data/' + month + '.json', function(error, dates) {

			if (request.dates instanceof Array) {
			  	
				for(var i = 0; i < request.dates.length; i++) { 
					
					var requestDate = request.dates[i];
					
					for(var j = 0; j < dates.length; j++) {
						
						var jsonDate = dates[j];

						if (requestDate === jsonDate.date) {  
							
							if (dates[j].amountOfBookings > 0 && dates[j].amountOfBookings <= maxBookings) { dates[j].amountOfBookings--; }
							
						}
					}
				}

			} else {

				var requestDate = request.dates;

				for(var j = 0; j < dates.length; j++) {

					var jsonDate = dates[j];

					if (requestDate === jsonDate.date) {  

						if (dates[j].amountOfBookings > 0 && dates[j].amountOfBookings <= maxBookings) { dates[j].amountOfBookings--; }
						
					}
				}

			}	

			jsonfile.writeFile('./data/' + month + '.json', dates, function (err) {
				if (err) throw err;
			});
		
		});

	}

	res.redirect('/');
	
});

module.exports = router;
