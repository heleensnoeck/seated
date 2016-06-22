// window.onload = function() {
// 		var dateClick = document.querySelectorAll('.day');

// 		var planDesk = document.querySelector('.book_desk');
// 		var vacation = document.querySelector('.vacation');
// 		var reset = document.querySelector('.reset');

// 		       for(var i = 0; i < dateClick.length; i++) {
// 		            var click = dateClick[i];
// 		            click.onclick = function() {
// 		               	planDesk.classList.remove('hide');
// 		               	vacation.classList.remove('hide');
// 		               	reset.classList.remove('hide');
// 		            }
// 		        }
// 		    }


window.onload = function() {
		var dateClick = document.querySelectorAll('.day');

		var planDesk = document.querySelector('.book_desk');
		var vacation = document.querySelector('.vacation');
		var reset = document.querySelector('.reset');

		       for(var i = 0; i < dateClick.length; i++) {
		            var click = dateClick[i];
		            if (click.nodeType === 1 && click.tagName === "INPUT" && click.type === "checkbox") {
		            	if(click.checked) {
		            		planDesk.classList.remove('hide');
		            		vacation.classList.remove('hide');
		            		reset.classList.remove('hide');
		            	}
		            }
		            el = null;
		        }
		    }



		    var foo = document.getElementById("foo"), i = 0, el;
		    for(i;i<foo.elements.length;i++)
		    {
		        el = foo.elements[i];
		        if(el.nodeType === 1 && el.tagName === "INPUT" && el.type === "checkbox") {
		            //element node, is an input element, is a checkbox
		            if(el.checked)
		            {
		                //checkbox is checked  
		            }
		        }
		        el = null;
		    }