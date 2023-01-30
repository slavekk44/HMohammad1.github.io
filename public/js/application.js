function myFunction() {
    var x = document.getElementById("myDIV");

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }


}

function myFunction2() {
    var y = document.getElementById("data");
    if (y.style.display === "none") {
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
}

function onPost() {
    document.getElementById("overlay").style.display = "block";
}

function onProfile() {
    document.getElementById("overlayProfile").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("overlayProfile").style.display = "none";
}