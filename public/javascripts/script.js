(function() {
  'use strict';
  
var app = {
  init: function() {      
    
    planner.selectData();
    
    click.events();

    booking.room();

    office.atOffice();
    
  }
};

// als je klikt op een datum buttons
// planner
// als je klikt op een datum buttons
var planner = { 
  selectData: function() {
    var dateClick = document.querySelectorAll('.day');
    var bookDeskButton = document.querySelector('.bookDeskButton');
    var officeButton = document.querySelector('.officeButton');
    var bookDeskToolBar = document.querySelector('.bookDeskToolBar');
    var vinkBook = document.querySelector('.vink_book');

    var plus = document.querySelector('.plus-minus-toggle');


    for(var i = 0; i < dateClick.length; i++) {  
        
      dateClick[i].addEventListener('click', function (ev) {
        
        bookDeskButton.classList.remove('hide');
        officeButton.classList.remove('hide');
        bookDeskToolBar.classList.remove('hide');
        
        var checkedDays = document.querySelectorAll('.day:checked');
        
        // if more then 6 checkboxes are checked remove toolbar 
        if (checkedDays.length >= 6) {
          
          setTimeout(function() { 
            bookDeskButton.classList.add('hide');
            officeButton.classList.add('hide');
            bookDeskToolBar.classList.add('hide');
          }, 200); 
          
          notification.toMany();
          
          // if 0 checkboxes are checked remove toolbar 
        } else if (checkedDays.length === 0) {
          
          setTimeout(function() { 
            bookDeskButton.classList.add('hide');
            officeButton.classList.add('hide');
            bookDeskToolBar.classList.add('hide');
          }, 300);

           vinkBook.classList.add('hide'); 
          
        }
      });  
    }
  }
}; 

// herschrijven die functie /////////////////////////////
var click = {
   events: function () {
    var bookDeskButton = document.querySelector('.bookDeskButton');
    var bookDeskToolBar = document.querySelector('.bookDeskToolBar');

    // attOfficeButtonClick
    var attOfficeButton = document.querySelector('.officeButton');
    var attOffice = document.querySelector('.addOffice');

    // vink animation
    var vinkBook = document.querySelector('.vink_book');
    var vink = document.querySelector('.vink');
    var newone = vink.cloneNode(true);

    //Click on book desk
    var bookButton = document.querySelector('.booked');
    var resetButton = document.querySelector('.reset');

    
    attOfficeButton.addEventListener('click', function (ev) {
      bookDeskToolBar.classList.add('hide');
      ev.preventDefault();
        attOffice.classList.remove('hide');
    });

    bookDeskButton.addEventListener('click', function (ev) {
      attOffice.classList.add('hide');
      ev.preventDefault();
        bookDeskToolBar.classList.remove('hide');
    });
    
    // animatie voor de vink   
    bookDeskButton.addEventListener('webkitAnimationEnd', function() {
        this.style.webkitAnimationName = '';
    }, false); // reset animation
   
   
    bookButton.addEventListener('click', function (ev) {  //  voor alle klikt op bookbutton
      //ev.preventDefault();
     
      var dateClick = document.querySelectorAll('.day');
      var count = 0;
     
      for (var i=0; i<dateClick.length; i++) {         
       
        if (dateClick[i].type == "checkbox" && dateClick[i].checked === true) {
         
          count++;
           
           // adds checkbox color
          dateClick[i].classList.add('active'); 

          dateClick[i].classList.add('test'); 
           
          vinkBook.classList.remove('hide');
           
          bookDeskButton.style.webkitAnimationName = 'vink';

        } 
      } 
    }); // close bookButton  
  }
};

 // als je op bookt hebt geklikt 
var booking = {
   room: function() {
       // reference to booking object        
       var bookingObj = this;
       // store rooms in nodelist (this is not an array!)
       var rooms = document.querySelectorAll('.book');
       var bookButton = document.querySelector('.booked');
       var resetButton = document.querySelector('.reset');


       // loop through rooms
       [].forEach.call(rooms, function(room, i) {
           room.addEventListener('click', function (ev) {
               ev.preventDefault();

               bookButton.classList.remove('hide');
               resetButton.classList.remove('hide');

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
               }
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

           availableSeats.classList.add('number_orange');

           availableSeats.textContent = iterator;
           //toggle indicator
           indicator.classList.toggle('collapsed');
           //toggle state
           element.setAttribute('data-state', 'booked');
       } else { //state === 'booked'
           iterator++;
           availableSeats.textContent = iterator;

           availableSeats.classList.remove('number_orange');
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
      s.addEventListener('click', function (ev) {
        ev.preventDefault();   
        content[i].classList.toggle('hide');
        toggle[i].classList.toggle('collapsed');
      });
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