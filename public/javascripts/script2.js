(function() {
  'use strict';
  
  var app = {
    init: function() {      
      
      planner.selectData();
      
      click.events();

      // booking.room();

      office.atOffice();
      
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
          
            // if 0 checkboxes are checked remove toolbar 
          } else if (checkedDays.length === 0) {
            
            // clearRadio.clear();
            
            bookDeskToolBar.classList.add('hide');
            booked.classList.add('hide');
            removeDate.classList.add('hide');
            checkmark.classList.add('hide');

          }
        });  
      }
    }
  }; 

  // var clearRadio = {
  //   clear: function() {
  //     var radios = document.querySelectorAll('.book');
  //     console.log(radios);
  //     for(var i = 0; i < radios.length; i++ ) {
  //         if(document.querySelector('.book').checked === true) {
  //           radios = false;
  //         }
  //     }
  //   }
  // }

  var click = {
    events: function() {      
      var checkmark = document.querySelector('.checkmark');
      var booked = document.querySelector('.booked');

      booked.addEventListener('click', function (ev) {
        ev.preventDefault();
        checkmark.classList.remove('hide');
        booked.style.backgroundColor= "#1A3755";
        booked.value="Booked";
      });
    }
  };

  var office = {
    atOffice: function() {      
      var arrow = document.querySelectorAll('.arrow');
      var content = document.querySelectorAll('.content');
      var toggle = document.querySelectorAll('.arrow');
      var collapsed = document.querySelectorAll('.collapsed');


      [].forEach.call(arrow, function(a, i) {
        a.addEventListener('click', function (ev) {
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