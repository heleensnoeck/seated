!function(){"use strict";var e={init:function(){t.hide(),o.selectData(),a.events(),c.room()}},t={hide:function(){var e=document.querySelector(".bookDeskToolBar");console.log(e),e.classList.add("hide")}},o={selectData:function(){for(var e=document.querySelectorAll(".day"),t=document.querySelector(".bookDeskToolBar"),o=document.querySelector(".booked"),c=document.querySelector(".remove"),n=document.querySelector(".checkmark"),a=0;a<e.length;a++)e[a].addEventListener("click",function(e){t.classList.remove("hide"),o.classList.remove("hide"),c.classList.remove("hide");var a=document.querySelectorAll(".day:checked");a.length>=6?(t.classList.add("hide"),o.classList.add("hide"),c.classList.add("hide"),n.classList.add("hide"),l.toMany()):0===a.length&&(t.classList.add("hide"),o.classList.add("hide"),c.classList.add("hide"),n.classList.add("hide"))})}},c={room:function(){var e,t=[].slice.call(document.querySelectorAll(".number")),o=([].slice.call(document.querySelectorAll(".book")),[]);t.forEach(function(e){var t=e.getAttribute("max"),c=e.value;o.push({element:e,value:t-c})});var c=Math.max.apply(Math,o.map(function(e){return e.value}));o.forEach(function(t){t.value===c&&(e=t.element)}),e.parentElement.querySelector(".book").checked=!0}},n={filterCheckedRadio:function(e){var t,o,c=[].slice.call(e);return c.forEach(function(e){e.checked&&(t=e,o=document.querySelector('input[name="'+e.value+'"]'))}),{selected:t,element:o}},filterCheckedInput:function(e){var t=[].slice.call(e),o=[];return t.forEach(function(e){e.checked&&o.push(e)}),o},createUrl:function(e,t){var o;if(o="&radio="+e,t)for(var c=0;c<t.length;c++)o+="&dates="+t[c].value;return o}},a={events:function(){var e,o,a,r,i=(document.querySelectorAll('input[type="radio"]'),document.querySelector(".checkmark")),s=document.querySelector(".booked"),d="/",u=new XMLHttpRequest;s.addEventListener("click",function(m){return m.preventDefault(),e=document.querySelectorAll('input[type="radio"]'),o=document.querySelectorAll('input[name="dates"]'),a=n.filterCheckedRadio(e),r=n.filterCheckedInput(o),Number(a.element.value)+1>a.element.getAttribute("max")?(l.toMany(),void a.element.parentElement.setAttribute("disabled",!0)):(u.open("POST",d,!0),u.onload=function(){if(this.status>=200&&this.status<300){var e,t=document.createElement("div");t.innerHTML=u.response,e=t.querySelector('input[name="'+a.selected.value+'"]'),a.element.value=e.value,r.forEach(function(e){e.checked=!1,e.parentElement.setAttribute("class",""),e.parentElement.classList.add("is--booked")});var o=document.querySelector(".radio-toolbar.is--active"),n=document.querySelectorAll(".book");o&&o.classList.remove("is--active"),n.checked&&0==n.checked,c.room()}else{var l={status:this.status,message:u.statusText};console.log(l)}},u.setRequestHeader("Content-type","application/x-www-form-urlencoded"),u.send(n.createUrl(a.selected.value,r)),i.classList.remove("hide"),s.style.backgroundColor="#1A3755",s.value="Booked",void setTimeout(function(){i.classList.add("hide"),s.style.backgroundColor="#14B8FF",s.value="Booked",t.hide()},1500))})}},l={toMany:function(){var e=document.querySelector(".notification_toMany"),t=document.querySelector(".message-close");e.classList.remove("hide"),setTimeout(function(){e.classList.add("hide")},5e3),t.addEventListener("click",function(e){t.closest(".notification_toMany").classList.add("hide")})}};e.init()}();