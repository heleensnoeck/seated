(function() {
  'use strict';
  
  var app = {
    init: function() {      
      
      pageLoad.hide();  

      planner.selectData();
      
      click.events();

      booking.room();
      
    }
  };

  var pageLoad = {
    hide: function() {

      var bookToolBarHide = document.querySelector('.bookDeskToolBar');
      console.log(bookToolBarHide);
      
      bookToolBarHide.classList.add('hide');
    }
  };

  var planner = { 
  selectData: function() {

    var dateClick = document.querySelectorAll('.day');
    var bookDeskToolBar = document.querySelector('.bookDeskToolBar');
    var booked = document.querySelector('.booked');
    var removeDate = document.querySelector('.remove');
    var checkmark = document.querySelector('.checkmark');

    for(var i = 0; i < dateClick.length; i++) {  
        
      dateClick[i].addEventListener('click', function (ev) {
        
        bookDeskToolBar.classList.remove('hide');
        booked.classList.remove('hide');
        removeDate.classList.remove('hide');
        
        var checkedDays = document.querySelectorAll('.day:checked');
        
        // if more then 6 checkboxes are checked remove toolbar 
        if (checkedDays.length >= 6) {
          
          bookDeskToolBar.classList.add('hide');
          booked.classList.add('hide');
          removeDate.classList.add('hide');
          checkmark.classList.add('hide');

          notification.toMany();
        
        } else if (checkedDays.length === 0) {
                      
          bookDeskToolBar.classList.add('hide');
          booked.classList.add('hide');
          removeDate.classList.add('hide');
          checkmark.classList.add('hide');

        }
      });  
    }
  }
  };

  var booking = {
   room: function() {
      
      var numbers = [].slice.call(document.querySelectorAll('.number'));
      var book = [].slice.call(document.querySelectorAll('.book'));
      var numberValues = [];
      var target;
      var targetCurrent;


      numbers.forEach(function(number) {

        var maxValue = number.getAttribute('max');
        var value = number.value;

        numberValues.push({
          element: number, 
          value: (maxValue - value)
        });

      });

      // http://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
      var highestNumber = Math.max.apply( Math, numberValues.map(function(o) { return o.value; }));  

      numberValues.forEach(function(numberValue) {

        if(numberValue.value === highestNumber) {
          target = numberValue.element;
        }

      });

      // target.parentElement.parentNode.classList.add('is--active');
      target.parentElement.querySelector('.book').checked = true;
   }
  };

  // bron Dylan vens & Heleen Snoeck
  var helpers = {

  filterCheckedRadio: function(array) {

    var radioBtns = [].slice.call(array);
    var selected;
    var element;
    
    radioBtns.forEach(function(input){

      if( input.checked ) {

        selected = input;
        element = document.querySelector('input[name="' + input.value + '"]');

      }    

    });

    return {
      // selected radio button
      selected : selected,

      // The number element below the radio button
      element: element
    }

  },

  filterCheckedInput: function(array) {

    var inputs = [].slice.call(array);
    var selected = [];

    inputs.forEach(function(input){

      if( input.checked ) {

        selected.push(input);
        
      }    

    });

    return selected;

  },

  createUrl: function(radio, inputs) {

    var url; 

    url = '&radio=' + radio;

    if(inputs) {

      for(var i = 0; i < inputs.length; i++) {

        url += '&dates=' + inputs[i].value;

      }

    }

    return url;

  }

  };

  var click = {
  events: function() {

    var radio = document.querySelectorAll('input[type="radio"]');     
    var checkmark = document.querySelector('.checkmark');
    var booked = document.querySelector('.booked');
    var url = '/';
    var xhr = new XMLHttpRequest();
    var radioBtns;
    var inputs;
    var selectedRadioBtn;
    var selectedInputs;

    booked.addEventListener('click', function (ev) {
      
      ev.preventDefault(); // je moet naar dezelfde url poste met ajax en je moet zorgen dat je met dezelfde data post uit het formier 

      radioBtns = document.querySelectorAll('input[type="radio"]');
      inputs = document.querySelectorAll('input[name="dates"]');
      selectedRadioBtn = helpers.filterCheckedRadio(radioBtns);
      selectedInputs = helpers.filterCheckedInput(inputs);

      if( Number(selectedRadioBtn.element.value) + 1 > selectedRadioBtn.element.getAttribute('max') ) {
        
        notification.toMany();
        selectedRadioBtn.element.parentElement.setAttribute('disabled', true);
        return;

      } 

      xhr.open('POST', url, true);

      xhr.onload = function() { 

        if (this.status >= 200 && this.status < 300) {
            
            var div = document.createElement('div');
            var input;

            div.innerHTML = xhr.response;

            input = div.querySelector('input[name="' + selectedRadioBtn.selected.value + '"]');
            selectedRadioBtn.element.value = input.value;

            selectedInputs.forEach(function(input) {

              input.checked = false;
              input.parentElement.setAttribute('class', '');
              input.parentElement.classList.add('is--booked');

            });
          
          var test = document.querySelector('.radio-toolbar.is--active');   
           var booked = document.querySelectorAll('.book');    
          
          if (test) {
            test.classList.remove('is--active');
          }

          if (booked.checked) {
            booked.checked == false;
          }

          booking.room();



          } else {
            
            var error = {
              status: this.status,
              message: xhr.statusText
            };

            console.log(error);
        }

      } 

      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(helpers.createUrl(selectedRadioBtn.selected.value, selectedInputs));

      checkmark.classList.remove('hide');
      booked.style.backgroundColor = "#1A3755";
      booked.value = "Booked";

      setTimeout(function() { 
        checkmark.classList.add('hide');
        booked.style.backgroundColor = "#14B8FF";
        booked.value = "Booked";
        pageLoad.hide();
      }, 1500); 

    });
  }
  };

  var notification = {
  toMany: function () {
    var notification = document.querySelector('.notification_toMany');
    var closeMessage = document.querySelector('.message-close');

    notification.classList.remove('hide');

    setTimeout(function() { 
      notification.classList.add('hide');
    }, 5000);

    closeMessage.addEventListener('click', function (ev) {
      closeMessage.closest('.notification_toMany').classList.add('hide');
    });
  }
  };

  app.init();

})();