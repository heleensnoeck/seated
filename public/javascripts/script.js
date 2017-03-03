(function() {
  'use strict';
  
  var app = {
    init: function() {      
      
      pageLoad.hide();
      pageLoad.setMonthName();
      planner.selectData();
      click.events();

    }
  };

  var pageLoad = {
    hide: function() {

      var bookedButton = document.querySelector('.booked');
      var removeButton = document.querySelector('.remove');
      
      bookedButton.disabled = true;
      bookedButton.classList.remove('hide');
      removeButton.classList.add('hide');

    },

    setMonthName: function() {

      var monthLbl = document.querySelector('#monthName');
      var monthIndex = helpers.getCurrentMonth();
      var monthArray = ["january","february","march","april","may","june","july","august","september","october","november","december"];
      var month = monthArray[monthIndex-1];

      monthLbl.innerHTML = month;

    }
  };

  var planner = {   
    selectData: function() {


      var dateClick = document.querySelectorAll('.day');
      var booked = document.querySelector('.booked');
      var remove = document.querySelector('.remove');
      var bookCheckmark = document.querySelector('.bookCheckmark');
      var removeCheckmark = document.querySelector('.removeCheckmark');

      for(var i = 0; i < dateClick.length; i++) {  


        dateClick[i].addEventListener('click', function (ev) {

        // If selected 
        if (ev.target.checked){

          // Deselect others
          var checkedDays = document.querySelectorAll('.day:checked');
          checkedDays.forEach(function(input) {
            if (input != ev.target) input.checked = false;
          });

          // Display correct button
          var parent = ev.target.parentElement;
          if(parent.classList.contains("is--available")){
            remove.classList.add('hide');
            booked.classList.remove('hide');
            booked.disabled = false;
          } else if (parent.classList.contains("is--booked")){
            booked.classList.add('hide');
            remove.classList.remove('hide');
          }

        } else {
          // Hide correct button
          var parent = ev.target.parentElement;
          if(parent.classList.contains("is--available")){
            console.log("AAaaaa");
            booked.classList.add('hide');
          } else if (parent.classList.contains("is--booked")){
            remove.classList.add('hide');
          }
        }
      });  
      }
    }
  };

  // bron charlotte & Heleen Snoeck
  var helpers = {
    // Zet querystring (string) om naar een object ( {} ) zodat parameters makkelijk te bereiken zijn. bijv. queryParams["month"]
    getQueryStrings: function() { 

      var assoc  = {};
      // var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
      var queryString = location.search.substring(1); // haalt de querystring op en verwijdert vraagteken.  
      var keyValues = queryString.split('&'); // spil zodra hij een & tegen komt

      for(var i in keyValues) {  //loopt door de keysvalue's
        var key = keyValues[i].split('='); // split als je de = tegen komt
        if (key.length > 1) { // Als key inhoud heeft dan
          assoc[key[0]] = key[1]; // plaats ze dan in het object
        }
      } 

      return assoc; // geeft waarde terug
    
    },

    getCurrentMonth: function () {

      var queryParams = helpers.getQueryStrings();
      var month = queryParams["month"]; 

      if(!(month >= 1 && month <= 12) | !month) { 
        var d = new Date();
        var n = d.getMonth(); // getMonth is zero based
        month = n+1; // daarom + 1
      }

      return month;

    },

    filterCheckedInput: function(array) {

      var inputs = [].slice.call(array);
      var selected = [];

      inputs.forEach(function(input){ 

        if( input.checked ) { 

          selected.push(input);
          
        }    

      });

      return selected; // geeft een array terug met alle inputes

    },

    createQuerystring: function(inputs) {

      var url = "month=" + helpers.getCurrentMonth(); 

      if(inputs) { 

        for(var i = 0; i < inputs.length; i++) { // loop door de inputs array en 

          url += '&dates=' + inputs[i].value; // voor elke input plak &dates erachter

        }

      }

      return url;

    }
  };

  var click = {
    events: function() {

      var monthBack = document.querySelector('#prevMonth');
      var monthFront = document.querySelector('#nextMonth');
      var booked = document.querySelector('.booked');
      var bookCheckmark = document.querySelector('.bookCheckmark');
      var remove = document.querySelector('.remove');
      var removeCheckmark = document.querySelector('.removeCheckmark');
      var inputs;
      var selectedInputs;

      monthBack.addEventListener('click', function(ev){

        var globalMonth = helpers.getCurrentMonth(); // haal de maand op vanuit de helper getcurrentmonth

        if(globalMonth > 1) globalMonth--; // als hij groter dan 1 is dan mag je een maand terug

        window.open("/?month=" + globalMonth,"_self"); // ga naar de url, en in dezelfde window (_self) 

      });

      monthFront.addEventListener('click', function(ev){ 

        var globalMonth = helpers.getCurrentMonth();

        if(globalMonth < 12) globalMonth++;

        window.open("/?month=" + globalMonth,"_self");

      });

      booked.addEventListener('click', function (ev) {
        
        ev.preventDefault(); 

        inputs = document.querySelectorAll('input[name="dates"]'); // haal alle inputs op met een date
        selectedInputs = helpers.filterCheckedInput(inputs); // haalt alle inputs op die checked zijn

        var url = '/book'; 

        var request = new XMLHttpRequest();

        request.open('POST', url, true); // je openend de post met een url true=asynchrone

        request.onload = function() {  // als het geladen word voer dan deze functie uit

          if (this.status >= 200 && this.status < 300) { // 200=accept 300=aangepast en 400=error
              
              var div = document.createElement('div');
              var input;

              div.innerHTML = request.response; // je maak een div aan met daarbinnen request.response

              selectedInputs.forEach(function(input) { // je loopt nogmaals door al je geselecteerde inputs die geef je nu checked false mee en een class van nul maar wel de class is--booked.

                input.checked = false;
                input.parentElement.setAttribute('class', '');
                input.parentElement.classList.add('is--booked');

              });
            
              var booked = document.querySelectorAll('.book');   // hier checked hij de button als die checked is zet hem naar false  
              
              if (booked.checked) {
                booked.checked == false;
              }

            } else {
              
              var error = {
                status: this.status,
                message: request.statusText
              };

              console.log(error);
          }

        } 

        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); // ik stuur een querystring op
        request.send(helpers.createQuerystring(selectedInputs)); // hier word de request verzonden deze word dan op de server (index.js) opgevangen en gecontroleerd als dit allemaal goed is word dates overschreven

        bookCheckmark.classList.remove('hide');
        booked.classList.add("booking");
        booked.value = "Booked";

        setTimeout(function() { 
          bookCheckmark.classList.add('hide');
          booked.classList.remove("booking");
          booked.value = "Book";
          pageLoad.hide();
        }, 800); 

      });

      remove.addEventListener('click', function (ev) {
        
        ev.preventDefault(); // je moet naar dezelfde url poste met ajax en je moet zorgen dat je met dezelfde data post uit het formier 

        inputs = document.querySelectorAll('input[name="dates"]');
        selectedInputs = helpers.filterCheckedInput(inputs);

        var url = '/remove';

        var request = new XMLHttpRequest();

        request.open('POST', url, true);

        request.onload = function() { 

          if (this.status >= 200 && this.status < 300) {
              
              var div = document.createElement('div');
              var input;

              div.innerHTML = request.response;

              selectedInputs.forEach(function(input) {

                input.checked = false;
                input.parentElement.setAttribute('class', '');
                input.parentElement.classList.remove('is--booked');
                input.parentElement.classList.add('is--available');

              });
            
              var booked = document.querySelectorAll('.book');    
              
              if (booked.checked) {
                booked.checked == false;
              }

            } else {
              
              var error = {
                status: this.status,
                message: request.statusText
              };

              console.log(error);
          }

        } 

        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(helpers.createQuerystring(selectedInputs));

        removeCheckmark.classList.remove('hide');
        remove.classList.add("removing");
        remove.value = "Removed";

        setTimeout(function() { 
          removeCheckmark.classList.add('hide');
          remove.classList.remove("removing");
          remove.value = "Remove";
          pageLoad.hide();
        }, 800); 

      });

    }
  };

  app.init();

})();