##The client
De opdracht komt van Damco. Damco is een internationaal bedrijf gespecialiseert in logistiek. 

##The assignment
Damco heeft zins kort een kantoor geopend in Nederland (Den Haag). In het gebouw zijn meer werknemers dan desks aanwezig. Dus mensen komen naar het kantoor voor niks. Om dit te voorkomen hebben ze mij gevraagt een web app te ontwikkelen

##The solution
Ik heb een applicatie ontwikkeld waar werknemers van damco een desk in kunnen boeken. 

##The application
sorry nog niet online

##Application
Op het homescherm zie je een overzicht een calender van de maand waarin je nu zit. Standaart werk je thuis en als je op kantoor wil werken moet je boeken. De boek button is eerst nog disabled maar als je een datum aanklinkt enabeld hij.  

###Home screen
![alt tag](https://github.com/heleensnoeck/seated/blob/final/screenshots/home.png) 
  
##Technical structure
De applicatie is gebouwd met:

- html
- sass
- javascript
- node/express
- ejs

##File structuur
```
|--Meesterproef
|	|--bin
|	|--data
|		|--april.json
|		|--august.json
|		|--december.json
|		|--february.json
|		|--january.json
|		|--july.json
|		|--june.json
|		|--march.json
|		|--may.json
|		|--november.json
|		|--october.json
|		|--september.json			
|   |--node-modules
|   |--public
|   	|--dist
|		|--img
|		|--javascripts
|			|--script.js
|		|--sass
|      	|--partials
|           |--base
|				|--_colors.scss
|				|--_reset.scss
|				|--_setup.scss
|           |--base_elements
|           	|--_buttons.scss
|           |--content_elements
|           	|--_animations.scss
|           	|--_calender.scss
|       		|--_month_bar.scss
|       		|--_toolbar.scss
|       |--main.css
|       |--main.css.map
|       |--main.scss
|	|--routes
|       |--index.js
|	|--views
|       |--error.ejs
|       |--index.ejs
|   |--app.js
|   |--gulpfile.js
|   |--package.json
```

##Code
De app is server-side opgebouwd de structuur is als volgd.

###json 
Er zijn 12 json files die dienen als database. 

```
[
	{
      "date":"01-04-16",
      "amountOfBookings":0,
      "day":"1"
   },
   {  
      "date":"02-04-16",
      "amountOfBookings":0,
      "day":"2"
   },
   {  
      "date":"03-04-16",
      "amountOfBookings":0,
      "day":"3"
   }
]
```

###routes
Een rout file die de json files uitlezen en updaten met het get en post.
 
```
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

```

###html
Er word door de json file dates geloopt en vanuit daar content in html geplaatst 

```
		<form class="agenda_content" action="/" method="post">

			<div class="agenda">
				<ul class="agenda_dates active">
					<li></li>
					<li></li>
					<% dates.forEach(function(date) { %>
				
					<!-- <%- date.amountOfBookings %> -->						
						<% if(date.amountOfBookings == 0) { %>
							<li class="is--available">
								<input id="<%- date.date %>" class="day" type="checkbox" name="dates" value="<%- date.date %>">
								<label for="<%- date.date %>">
									<span class="<%- date.class %>"><%- date.day %></span>
								</label>
							</li>						

						<% } else if(date.amountOfBookings > 0 && date.amountOfBookings <= 14) { %>
							<li class="is--booked">
								<input id="<%- date.date %>" class="day" type="checkbox" name="dates" value="<%- date.date %>" >
								<label for="<%- date.date %>">
									<span class="<%- date.class %>"><%- date.day %></span>
								</label>
							</li>

						<% } else { %>
							<li class="is--full">
								<input id="<%- date.date %>" class="day" type="checkbox" name="dates" value="<%- date.date %>" disabled>
								<label for="<%- date.date %>">
									<span class="<%- date.class %>"><%- date.day %></span>
								</label>
							</li>
						<% } %>
					
					<% }); %>	
				</ul>
			</div>
```


### SASS
Een sass opbouw 

```
// sass nesting
.agenda {
margin: 0 auto;
width: 90%;
margin-left: 3%;
margin-bottom: 0.5em;

	.agenda_dates {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		    -ms-flex-direction: row;
		        flex-direction: row;
		-ms-flex-wrap: wrap;
		    flex-wrap: wrap;

		li {
			list-style: none;
			display: inline-block;
			margin: 1.3em 0.7em -5em 0.5em;
			height: 100px;
			width: calc(100% * (1/7) - 0.625em - 0.6em);
		}
	}
}

//variable kleuren

//base
$bg-blue:#285483;
$black: #000000;
$white: #ffffff;
$light-grey: #F6F6F6;

// checkbox
$booked-date: #1A3755;
$booked-numbers: #14B8FF;
$booked-full: #888888;

// disabled radio-toolbar
$disabled-font: #6f6f6f;
$disabled-bg: #7c8084;

// borders
$border: #3F79B7;
$border-bottom: #CCDEF0;

$hr: #3CC4FF;
$selected: #F2F6F9;


//build alle scss files to 1 css file 
@import "partials/base/_colors";
@import "partials/base/_images";
@import "partials/base/_reset";
@import "partials/base/_setup";

// base elements
@import "partials/base_elements/_buttons";
@import "partials/base_elements/_icons";

// content elements
@import "partials/content_elements/_animations";
@import "partials/content_elements/_calender";
@import "partials/content_elements/_month_bar";
@import "partials/content_elements/_notification";
@import "partials/content_elements/_toolbar";
@import "partials/content_elements/_tooltips";


```

### Javascript
In objects opgebouwt + xhr die een post afhandeld met javascript.

```
(function() {
  'use strict';
 
  var app = {
  };

  var pageLoad = { 
  };

  var planner = {
  };

  var helpers = {
  };

  var click = {
  };

  app.init();

})();
```

##Vakken
CSS to the rescue

The application includes CSS techniques like modals, checkboxes and backgrounds.

###CSS to the rescue
De site is natuurlijk gestyled met css(SASS). 

###Browser technologies
Zonder css en javascript werkt de kernfunctionaliteit het boeken nog steeds, dit geld ook als je alleen javascript uitschakeld.
- Er is rekening gehouden met het taben door de site.
- Ook is het kleurencontrast aanwezig
- verder is er in de css code uit gecommend die als vervanging kan dienen voor ie9 als calc en flexbox niet werken
- Ook is de cutting the mustard techniek toegevoed. 

###Web-app from scratch
Een beetje vanwegen de javascript.

##Enhancements

#### font number (h1) in the right way

### Js only loads in when the browser sees a querySelector & 'addEventListener' in the window/document
```
**From**

script.js

**To**


	var cutsTheMustard = ('querySelector' in document && 'addEventListener' in window)
			var js; 

			if(cutsTheMustard) {
				js = document.createElement('script');
				js.src = '/javascripts/script.js';
				js.async = true; 
				document.querySelector('script').parentNode.appendChild(js);
			}
```

###Javascript rendering on the server. 

##Kleurenblind
Bekijk het via > systeemsvoorkeuren > toegankelijkheid > gebruik grijstinten

##Tab true
![alt tag](https://github.com/heleensnoeck/seated/blob/final/screenshots/tab.png) 

 
