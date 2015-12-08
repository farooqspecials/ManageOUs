
window.onload = function(){
var b1 = document.getElementById("btnou");
var b2 = document.getElementById("btnchiefdom");
var b3 = document.getElementById("btndistrict");
var b4 = document.getElementById("btnfacility");


b1.onclick = function() {
     b1.style.background = "green";
     b2.style.background = "";
     b3.style.background = "";
     b4.style.background = "";
        
}

b2.onclick = function() {
     b1.style.background = "";
     b3.style.background = "";
     b4.style.background = "";
     b2.style.background = "green";   
}

b3.onclick = function() {
     b1.style.background = "";
      b2.style.background = "";
     b4.style.background = "";
     b3.style.background = "green";   
}
b4.onclick = function() {
     b1.style.background = "";
     b2.style.background = "";
     b3.style.background = "";
     b4.style.background = "green";   
}
}

