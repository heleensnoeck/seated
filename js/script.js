(function() {
	'use strict';
	
	var app = {
		init: function() {
			// book.bookDesk();
			// book.removeDesk();
			// book.fullDesk();

			planner.selectData();
			planner.selectRemove();
			planner.bookDesk();
			planner.planVacation();
			planner.reset();

			notifications.addNotification();
			notifications.flexNotification();

			closeDropdown.close();

			sw.start();
		}
	};

/*****************************************************************************
 *
 * Event listeners for UI elements
 *
 ****************************************************************************/


 	// var book = {
 	// 	bookDesk: function() { 		
	 // 		var remove = document.querySelector('.remove');
	 // 		var number = document.querySelector('.number');
	 // 		var value = document.querySelector('.number').textContent;	
 			
 	// 		var book = document.querySelector('.book');

 	// 		book.onclick = function(ev) {

 	// 			ev.preventDefault();
 				


 	// 			remove.classList.remove('hide');
 	// 			book.classList.add('hide');

 	// 			if (isNaN(value) || value > 0) {
 	// 				value--;
 	// 				document.querySelector('.number').textContent = value;
 	// 			} 

 	// 		};

 	// 	},

 	// 	removeDesk: function() { 			
 			
 	// 		var remove = document.querySelector('.remove');

 	// 		remove.onclick = function(ev) {

 	// 			ev.preventDefault();
 				
 	// 			var book = document.querySelector('.book');
 	// 			var number = document.querySelector('.number');
 	// 			var value = document.querySelector('.number').textContent;

 	// 			remove.classList.add('hide');
 	// 			book.classList.remove('hide');

 	// 			if (isNaN(value) || value > 0) {
 	// 				value++;
 	// 				var number = document.querySelector('.number').textContent = value;
 	// 				console.log(number);
 	// 			} 
 	// 		};

 	// 	},

 	// 	fullDesk: function() { 

	 // 	// 	var jan = document.querySelector('.book');
	 // 	// 	var value = document.querySelector('.number').textContent;

	 // 	// 	jan.onclick = function(ev) {
	 // 	// 		ev.preventDefault()
	 // 	// 		if (value == 0) {
	 // 	// 			book.setAttribute("disabled", "disabled");
	 // 	// 			value.innerHTML = "Full";
	 // 	// 		}
	 // 	// 	};
	 // 	}	

 	// };


	 var planner = { // schrijf nog even een loop
	 	selectData: function() {
			var dateClick = document.querySelectorAll('.day');

			var planDesk = document.querySelector('.book_desk');
			var vacation = document.querySelector('.vacation');
			var reset = document.querySelector('.reset');

	        for(var i = 0; i < dateClick.length; i++) {
	            var click = dateClick[i];
	            click.onclick = function() {
	               	planDesk.classList.remove('hide');
	               	vacation.classList.remove('hide');
	               	reset.classList.remove('hide');
	            }
	        }
	 	},
	 

	 	selectRemove: function () {
		// var joe = document.querySelectorAll('.day');

		// var planDesk = document.querySelector('.book_desk');
		// var vacation = document.querySelector('.vacation');
		// var reset = document.querySelector('.reset');
	 	
	 // 	joe.onclick = function() {
		//  	for(var i = 0; i < joe.length; i++) {
		//  	    var click = joe[i];
		//  	    if(click.nodeType === 1 && click.tagName === "INPUT" && click.type === "checkbox") {
		//  	        //element node, is an input element, is a checkbox
		//  	        if(click.checked == 0) {
		//  	            planDesk.classList.add('hide');
		//  	            vacation.classList.add('hide');
		//  	            reset.classList.add('hide');
		//  	        }
		//  		}
		//  	}
		//  }


		// VOORBEELD JQUERY
		//  $("#01-12-15").click(function() {
		//    if (document.getElementById("01-12-15").checked) {
		//       $(".book_desk , .vacation , .reset").removeClass('hide');
		//   // not gonna work
		//       $(".book_desk , .vacation , .reset").removeClass(".book_desk , .vacation , .reset").addClass(".book_desk , .vacation , .reset");
		//    } else {
		//       $(".book_desk , .vacation , .reset").addClass('hide');
		//    }
		// })
	
	 	},

	 	// var elm = this,
	 	// var newone = elm.cloneNode(true);
	 	// elm.parentNode.replaceChild(newone, elm);




	 	bookDesk: function () {
	 		var planDesk = document.querySelector('.book_desk');
	 		var vinkBook = document.querySelector('.vink_book');

	 		var vink = document.querySelector('.vink');
	 		var newone = vink.cloneNode(true);

	 		// de animatie is al afgespeeld al de pagina geladen is. Je kan niet de animatie class eraf halen en hem er weer op zetten 
	 		// daarom moet je via webkitanimationEnd werken.
				
			planDesk.addEventListener('webkitAnimationEnd', function(){
			    this.style.webkitAnimationName = '';
			}, false); // reset animation
				
			
			planDesk.onclick = function(ev){
			
				ev.preventDefault();

				vinkBook.classList.remove('hide');
				planDesk.style.webkitAnimationName = 'vink';
				
			};	
	 	}, 

 	 	planVacation: function () {
 	 		var planVacation = document.querySelector('.vacation');
 	 		var vinkVacation = document.querySelector('.vink_vacation');

 	 		planVacation.addEventListener('webkitAnimationEnd', function(){
 	 		    this.style.webkitAnimationName = '';
 	 		}, false); // reset animation
 	 			
 	 		
 	 		planVacation.onclick = function(ev){
 	 		
 	 			ev.preventDefault();

 	 			vinkVacation.classList.remove('hide');
 	 			planVacation.style.webkitAnimationName = 'vink';
 	 			
 	 		};	

 	 	},

 	 	reset: function () {
 	 		var reset = document.querySelector('.reset');
 	 		var vinkReset = document.querySelector('.vink_reset');
 	 		var vinkVacation = document.querySelector('.vink_vacation');
 	 		var vinkBook = document.querySelector('.vink_book');

 	 		reset.addEventListener('webkitAnimationEnd', function(){
 	 		    this.style.webkitAnimationName = '';
 	 		}, false); // reset animation


 	 		reset.onclick = function(ev){
 	 			
 	 			// ev.preventDefault();

 	 			vinkReset.classList.remove('hide');
 	 			vinkReset.style.webkitAnimationName = 'vink';
 	 			
 	 		};	
 	 	}

	 };

	 var notifications = {
	 	addNotification: function () {

		 	var message = document.querySelector('.notification');
		 	var messageFull = document.querySelector('.notification_full');
		 	var closeMessage = document.querySelector('.message-close');

			message.onclick = function (e, el) {
				e.preventDefault();
				
				messageFull.classList.remove('hide');
				
				setTimeout(function() { 
					messageFull.classList.add('hide');
				}, 5000);
			}

			closeMessage.onclick = function (el) {
				closeMessage.closest('.notification_full').classList.add('hide');
			}
	 	},

	 	flexNotification: function () {
	 		var submitDesk = document.querySelector('.notification_desk');
	 		var messageFLex = document.querySelector('.notification_flex');
	 		var closeMessage = document.querySelector('.message-close');

	 		submitDesk.onclick = function (e) {
	 			e.preventDefault();
	 			messageFLex.classList.remove('hide');

	 			setTimeout(function() { 
	 				messageFLex.classList.add('hide');
	 			}, 5000);
	 		}

	 		closeMessage.onclick = function (el) {
	 			closeMessage.closest('.notification_flex').classList.add('hide');
	 		}
	 	}
	 };	

	var closeDropdown = {
		// close: function () {

		// 	var submitDesk = document.querySelector('.notification_desk');
		// 	var dropdown = document.querySelector('#dropdown');	
		// 	console.log(dropdown); 		
		// 	var closeMessage = document.querySelector('.message-close');


		// 	submitDesk.onclick = function () {
				
		// 		console.log('hoi'); 
		// 	    var isOpen = dropdown.getAttribute('open') == 'open';
			    
		// 	    console.log(isOpen);

		// 	    if (isOpen == true){
		// 	     	dropdown.removeAttr('open');

		// 	     	setTimeout(function() { 
		// 	     		submitDesk.classList.add('hide');
		// 	     	}, 5000);

		// 		}

		// 	}    
		// }
	}


		//   $('.notification_desk').click(function () {
		//     var isOpen = ($("#dropdown").attr("open") == "open");
		//     if (isOpen == true){
		//       $("#dropdown").removeAttr( "open" );
		//     }
		//   });

		// $('.notification_desk').on('click', function() {
		//   setTimeout(function() {
		//     closeMessage($('#js-timer2'));
		//   }, 5000);
		// });


		var sw = {
		    start: function() {
		        if ('serviceWorker' in navigator) {
		            navigator.serviceWorker.register('/service-worker.js') // scope is optioneel en verteld de service worker over welke file hij
		            // navigator.serviceWorker.register('/js/sw.js', { scope: '/js/' }) // scope is optioneel en verteld de service worker over welke file hij
		            .then(function() {
		                console.log('serviceWorker registation successful with scope');
		            }).catch(function(err){
		                console.log('serviceWorker registation failed', err); // catch runt als the promise is geweigerd. 
		            });
		        }
		    }
		}



 	app.init();

})();