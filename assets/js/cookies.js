function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0)
            break;
    }
    return null;
}

function SetCookie(name, value) {
    var argv = SetCookie.arguments;
    var argc = SetCookie.arguments.length;
    var expires = (2 < argc) ? argv[2] : null;
    document.cookie = name + "=" + escape(value) +
        ((expires == null) ? "" : ("; expires=" + expires.toGMTString()))
}

function DisplayInfo() {
    var expdate = new Date();
    var visit;
    expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 7));
    if (!(visit = GetCookie("visit"))){
        visit = 0;
    }
    visit++;
    SetCookie("visit", visit, expdate, "/", null, false);
    var vid = document.getElementById("overlayvideo");
    vid.play();
    if (visit == 1){        
        onGif();
    }
    if (visit > 1){
        offGif();
    }        
}

function ResetCounts() {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 7));
    visit = 0;
    SetCookie("visit", visit, expdate, "/", null, false);
    history.go(0);
}

function onGif() {
    document.getElementById("overlay").style.display = "block";
}

function offGif() {
    document.getElementById("overlay").style.display = "none";
    var typed = new Typed('#typed', {
        strings: ["Be a Student", "Be a Doctor", "Be a Reporter", "Be an Entrepreneur", "Be a filmmaker", "Be a celebrity", "Be a leader."],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 600
    });
}

window.onload = DisplayInfo