!function(){"use strict";var e={init:function(){t.hide(),t.setMonthName(),n.selectData(),r.events()}},t={hide:function(){var e=document.querySelector(".booked"),t=document.querySelector(".remove");e.disabled=!0,e.classList.remove("hide"),t.classList.add("hide")},setMonthName:function(){var e=document.querySelector("#monthName"),t=o.getCurrentMonth(),n=["january","february","march","april","may","june","july","august","september","october","november","december"],r=n[t-1];e.innerHTML=r}},n={selectData:function(){for(var e=document.querySelectorAll(".day"),t=document.querySelector(".booked"),n=document.querySelector(".remove"),o=(document.querySelector(".bookCheckmark"),document.querySelector(".removeCheckmark"),0);o<e.length;o++)e[o].addEventListener("click",function(e){if(e.target.checked){var o=document.querySelectorAll(".day:checked");o.forEach(function(t){t!=e.target&&(t.checked=!1)});var r=e.target.parentElement;r.classList.contains("is--available")?(n.classList.add("hide"),t.classList.remove("hide"),t.disabled=!1):r.classList.contains("is--booked")&&(t.classList.add("hide"),n.classList.remove("hide"))}else{var r=e.target.parentElement;r.classList.contains("is--available")?(console.log("AAaaaa"),t.classList.add("hide")):r.classList.contains("is--booked")&&n.classList.add("hide")}})}},o={getQueryStrings:function(){var e={},t=location.search.substring(1),n=t.split("&");for(var o in n){var r=n[o].split("=");r.length>1&&(e[r[0]]=r[1])}return e},getCurrentMonth:function(){var e=o.getQueryStrings(),t=e.month;if(!(t>=1&&t<=12)|!t){var n=new Date,r=n.getMonth();t=r+1}return t},filterCheckedInput:function(e){var t=[].slice.call(e),n=[];return t.forEach(function(e){e.checked&&n.push(e)}),n},createQuerystring:function(e){var t="month="+o.getCurrentMonth();if(e)for(var n=0;n<e.length;n++)t+="&dates="+e[n].value;return t}},r={events:function(){var e,n,r=document.querySelector("#prevMonth"),s=document.querySelector("#nextMonth"),a=document.querySelector(".booked"),c=document.querySelector(".bookCheckmark"),i=document.querySelector(".remove"),l=document.querySelector(".removeCheckmark");r.addEventListener("click",function(e){var t=o.getCurrentMonth();t>1&&t--,window.open("/?month="+t,"_self")}),s.addEventListener("click",function(e){var t=o.getCurrentMonth();t<12&&t++,window.open("/?month="+t,"_self")}),a.addEventListener("click",function(r){r.preventDefault(),e=document.querySelectorAll('input[name="dates"]'),n=o.filterCheckedInput(e);var s="/book",i=new XMLHttpRequest;i.open("POST",s,!0),i.onload=function(){if(this.status>=200&&this.status<300){var e=document.createElement("div");e.innerHTML=i.response,n.forEach(function(e){e.checked=!1,e.parentElement.setAttribute("class",""),e.parentElement.classList.add("is--booked")});var t=document.querySelectorAll(".book");t.checked&&0==t.checked}else{var o={status:this.status,message:i.statusText};console.log(o)}},i.setRequestHeader("Content-type","application/x-www-form-urlencoded"),i.send(o.createQuerystring(n)),c.classList.remove("hide"),a.classList.add("booking"),a.value="Booked",setTimeout(function(){c.classList.add("hide"),a.classList.remove("booking"),a.value="Book",t.hide()},800)}),i.addEventListener("click",function(r){r.preventDefault(),e=document.querySelectorAll('input[name="dates"]'),n=o.filterCheckedInput(e);var s="/remove",a=new XMLHttpRequest;a.open("POST",s,!0),a.onload=function(){if(this.status>=200&&this.status<300){var e=document.createElement("div");e.innerHTML=a.response,n.forEach(function(e){e.checked=!1,e.parentElement.setAttribute("class",""),e.parentElement.classList.remove("is--booked"),e.parentElement.classList.add("is--available")});var t=document.querySelectorAll(".book");t.checked&&0==t.checked}else{var o={status:this.status,message:a.statusText};console.log(o)}},a.setRequestHeader("Content-type","application/x-www-form-urlencoded"),a.send(o.createQuerystring(n)),l.classList.remove("hide"),i.classList.add("removing"),i.value="Removed",setTimeout(function(){l.classList.add("hide"),i.classList.remove("removing"),i.value="Remove",t.hide()},800)})}};e.init()}();