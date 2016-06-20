(function() {
  'use strict';
  
  var app = {
    init: function() {      
      planner.selectData();
      planner.events();

      booking.room();

      office.atOffice();


      reverse.test();

    }
  };

  // als je klikt op een datum buttons
  // planner
  // als je klikt op een datum buttons
  var planner = { // schrijf nog even een loop
    selectData: function() {
      var dateClick = document.querySelectorAll('.day');

      var planDesk = document.querySelector('.book_desk');
      var office = document.querySelector('.office');

      var desk = document.querySelector('.bookDesk');

      for(var i = 0; i < dateClick.length; i++) {
          dateClick[i].onclick = function() {
              planDesk.classList.remove('hide');
              office.classList.remove('hide');

              setTimeout(function() { 
                desk.classList.remove('hide');
              }, 900);

              var checkedDays = document.querySelectorAll('.day:checked');
        
              if (checkedDays.length >  0) { // hier nog zorgen dat de animatie showed en hide
                  console.log('show');
              } else {
                  console.log('hide');
              }
          };
      };
    }, 

    events: function() {
      var bookDeskButton = document.querySelector('.book_desk');
      var desk = document.querySelector('.bookDesk');

      // attOfficeButtonClick
      var attOfficeButton = document.querySelector('.office');
      var attOffice = document.querySelector('.addOffice');

      // vink animation
      var vinkBook = document.querySelector('.vink_book');
      // var vinkBookDesk = document.querySelector('.vink_bookDesk');
      var vink = document.querySelector('.vink');
      var newone = vink.cloneNode(true);

      //Click on book desk
      var bookButton = document.querySelector('.booked');
      
      attOfficeButton.onclick = function(ev) {
        desk.classList.add('hide');
        ev.preventDefault();
          attOffice.classList.remove('hide');
      };

      // de animatie is al afgespeeld al de pagina geladen is. Je kan niet de animatie class eraf halen en hem er weer op zetten 
      // daarom moet je via webkitanimationEnd werken.
       
      // animatie voor de vink   
      bookDeskButton.addEventListener('webkitAnimationEnd', function(){
          this.style.webkitAnimationName = '';
      }, false); // reset animation

      bookButton.onclick = function(ev) {
        ev.preventDefault();
        var inputElems = document.getElementsByTagName("input");
        var count = 0;
          
        for (var i=0; i<inputElems.length; i++) { 

          if (inputElems[i].type == "checkbox" && inputElems[i].checked === true) {
            count++;
            inputElems[i].classList.add('active'); // hij werkt ik moet alleen nog het label vinden

            vinkBook.classList.remove('hide');
            // vinkBookDesk.classList.remove('hide');
            bookDeskButton.style.webkitAnimationName = 'vink';

          } else if (count > 10) {
            alert('teveel');

          } else {
            // alert('boe');
            // inputElems[i].style.backgroundColor = "#bff0a1";
            // of we voegen hier een class door die de bg kleur aanpast!
          }
        } 
      }; // close bookButton
    } //close selectButton
  }; //close planner



 // als je op bookt hebt geklikt 
 var booking = {
     room: function() {
         // reference to booking object        
         var bookingObj = this;
         // store rooms in nodelist (this is not an array!)
         var rooms = document.querySelectorAll('.book');
         var bookButton = document.querySelector('.booked');

         // loop through rooms
         [].forEach.call(rooms, function(room, i) {
             room.addEventListener('click', function (ev) {
                 ev.preventDefault();

                 bookButton.classList.remove('hide');
                 // reference to clicked element
                 var clickedElement = this;
                 // copy/convert the rooms nodelist into an new array
                 var copyRooms = [].slice.call(rooms);
                 // remove the clicked room from the array
                 var otherRooms = copyRooms.filter(function(x) { return x !== clickedElement; });
                 // toggle state of all non-clicked rooms
                 for (i = 0; i < otherRooms.length; i++) {
                     // get state from data-state attribute
                     var state = otherRooms[i].dataset.state;
                     
                     // toggle state if 'booked'
                     if (state === 'booked') {
                         bookingObj.toggleState(otherRooms[i]);                  
                     }
                 };
                 // toggle clicked room state
                 bookingObj.toggleState(this);
             });
         });
     },
     // toggle state of passed element
     toggleState: function (element) {
         // get values from data attributes
         var state = element.dataset.state;
         var defaultSeats = element.dataset.seats;
         var indicator = element.querySelector('.plus-minus-toggle');
         var availableSeats = element.querySelector('.number');
         var iterator = availableSeats.textContent;
         
         if (state === 'available') {
             iterator--;
             availableSeats.textContent = iterator;
             //toggle indicator
             indicator.classList.toggle('collapsed');
             //toggle state
             element.setAttribute('data-state', 'booked');
         } else { //state === 'booked'
             iterator++
             availableSeats.textContent = iterator;
             //toggle indicator
             indicator.classList.toggle('collapsed');
             //toggle state
             element.setAttribute('data-state', 'available');
         }
     }
 };


// als je op office hebt geklikt 
var office = {
  atOffice: function() {      
    var slider = document.querySelectorAll('.slider');
    var content = document.querySelectorAll('.content');
    var toggle = document.querySelectorAll('.arrow');
    var collapsed = document.querySelectorAll('.collapsed');


    [].forEach.call(slider, function(s, i) {
      s.onclick = function(ev) {
        ev.preventDefault();   
        content[i].classList.toggle('hide');
        toggle[i].classList.toggle('collapsed');
      };
    });       
  }
};

  var reverse = {
    test: function () {
      var planDesk = document.querySelector('.book_desk');
      var office = document.querySelector('.office');
      var desk = document.querySelector('.bookDesk');
      var booked = document.querySelector('.booked');

      booked.addEventListener('webkitAnimationEnd', function(){
          this.style.webkitAnimationName = '';
      }, false); // reset animation

      var allClasses = [planDesk, office, desk, booked];

          booked.onclick = function(ev) {
            
            ev.preventDefault();
            
            booked.classList.add('reverse');

            booked.style.webkitAnimationName = 'desk';
            
          }
        
  //     // allClasses.forEach(function(el) {

  //     //     booked.onclick = function(ev) {
            
  //     //       ev.preventDefault();
            
  //     //       allClasses[i].classList.add('reverse');
            
  //     //     }
  //     // });
    }
  }
  
    app.init();

 })();
