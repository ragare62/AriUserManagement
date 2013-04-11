// General variables
var mode = "";
var isNew = false;



// gup stands from Get Url Parameters
function gup(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}

// Función común en el arranque de cualqueir página
function loadDefaults() {
    // culture Spanish - Spain
    kendo.culture("es-ES");
    // tratamiento común de AJAX
    $.ajaxSetup({
        error: function (xhr, textStatus, errorThrown) {
            var message = "<h4 class='text-error'>Se ha producido un error:</h4>" +
                          "<p classs='text-warning'>" + xhr.responseText + "</p>";
            bootbox.alert(message, "Aceptar");
        }
    });
}

function loadHeaderFooter() {
    // load header
    $.ajax({
        type: 'GET',
        url: "Header.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#header").append(html);
        },
    });
    // load footer
    $.ajax({
        type: 'GET',
        url: "Footer.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#footer").append(html);
        },
    });
}

function ari_windowOpen(url) {
    window.open(url, '_self');
}

function ari_generalLinker(entity) {
    var linker = { url: "", html: "" };
    switch (entity) {
        case "UserGroup":
            linker.url = "http://localhost:50827/api/usergroups/";
            linker.html = "UserGroupGrid.shtml";
            break;
    }
    return linker;
}

/*
*   Set and Get Cookies
*   this funtions come from http://www.w3schools.com/js/js_cookies.asp
*   they are used in forms in order to and retrieve
*   field's values in a cookie
*/
function setCookie(c_name, value, exdays) {
    if (!are_cookies_enabled()) {
        alert("NO COOKIES");
    }
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}
function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function are_cookies_enabled() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
        document.cookie = "testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled);
}