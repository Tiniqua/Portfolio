function toggle(){
    var x = document.getElementById("dropDown")
    if(x.style.display === "none")
        {
            x.style.display = "block";
        }
    else{
        x.style.display = "none";
    }
}

/*not working */
function embolden(x) {
  x.style.fontweight = 'bold';
  x.style.fontweight = 'bold';
}

function normal(x) {
  x.style.fontweight = 'normal';
  x.style.fontweight = 'normal';
}