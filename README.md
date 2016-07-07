##The client
The assignment comes from a company called Damco. Damco is a internation Danish company and specialized in logistics.

##The assignment
Damco recently opend an office in the Netherlands (the Hague). In this office there are more employees then desks available. So there are people coming to the office for nothing. To avoid this, they asked me to develop a application.

##The solution
I developed a application were employees can book a desk. My goal for this application was a simple interface that is fast to use and easy to understand.

##The application
sorry not online yet.

##Application
Op het homescherm zie je een overzicht van de eerste twee weken van de maand Juli. Flexwerkers kunnen steeds twee weken vooruit boeken en dan max. 5 dagen. (dit is omdat er veel minder bureaus zijn dan werknemers en we de kansen gelijk willen houden.)  

##Select date (met js)
Als je een datum selecteerd, zie je het boekings schema verschijnen. In het bookings schema is een selected default state te zien. Deze state geeft de beste room aan (room met het minste mensen) ook is deze room al checked zodat de gebruiker direct kan boeken. 

###First state
![alt tag](https://github.com/heleensnoeck/seated/blob/final/screenshots/colapsed.png) 

###Second state
![alt tag](https://github.com/heleensnoeck/seated/blob/final/screenshots/selected.png) 

##Zonder (js)
Zonder js zijn er twee dingen anders.
Je hebt geen default state en het boekings schema is direct te zien. 
  
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
|		|--data.json
|		|--dates.json			
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
|				|--_images.scss
|				|--_reset.scss
|				|--_setup.scss
|           |--base_elements
|           	|--_buttons.scss
|           	|--_icons.scss
|           |--content_elements
|           	|--_animations.scss
|           	|--_calender.scss
|       		|--_month_bar.scss
|       		|--_notification.scss
|       		|--_toolbar.scss
|       		|--_tooltips.scss
|       |--main.css
|       |--main.css.map
|       |--main.scss
|	|--routes
|       |--index.js
|	|--views
|       |--error.ejs
|       |--index.ejs
|       |--app.js
|       |--npm-debug.log
|       |--package.json
```

##Code
De app is server-side opgebouwd de structuur is als volgd.

###json 
Twee json files dienen als database. 

```
[{
	"title": "Room 1:",
	"animation": "fade-in three",
	"availableDesks": 15,
	"bookedDesks": 5,
	"id": "room_one",
	"images": [{
		"src": "img/people1.jpg",
		"name": "Gerret"
	}, {
		"src": "img/people2.jpg",
		"name": "Marisska"
	}, {
		"src": "img/people3.jpg",
		"name": "Jan"
	}, {
		"src": "img/people4.jpg",
		"name": "Elle"
	}]
}
```

###routes
Een rout file die de json files uitlezen en updaten met het get en post.
 
```
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
								<input id="<%- date.date %>" class="day" type="checkbox" name="dates" value="<%- date.date %>">
								<label for="<%- date.date %>">
									<span class="<%- date.class %>"><%- date.day %></span>
								</label>
							</li>

						<% } else { %>
							<li class="is--full">
								<input id="<%- date.date %>" class="day" type="checkbox" name="dates" value="<%- date.date %>">
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
 
  var pageLoad = {
  };

  var planner = { 
  };

  var booking = {
  };

  var helpers = {
  };

  var click = {
  };

  var notification = {
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
![alt tag](https://github.com/heleensnoeck/browser_technologie/blob/master/week%204/screenshots1/Schermafbeelding%202016-04-17%20om%2012.11.12.png) 

##Tab true
![alt tag](https://github.com/heleensnoeck/seated/blob/final/screenshots/tab.png) 

## Wanted to/nice to have 
- 1 Json bestand. Het bestand data.json zou dan toegevoed worden aan dates.json zo kan er voor elke datum bijgehouden worden in welke room is geboeked. Als de gebruiker dan weer op een geboekte date klikt word er uit de database de geboekte room gehaald. Om deze vervolgens als een gebookte state te laten zien in de bookroom toolbar. Zo kan de gebruiker makkelijk zien in welke rooms hij ingeboeked is per datum en kan hij zijn boeking ook gemakkelijk ongedaan maken. 

![alt tag](https://github.com/heleensnoeck/browser_technologie/blob/master/week%204/screenshots1/Schermafbeelding%202016-04-17%20om%2012.11.12.png) 

- Het verwijderen van je geboekte room en datum. 
