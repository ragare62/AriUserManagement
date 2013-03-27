//This JavaScript code includes the functions coded by Ariadna 
//in order to deal with kendo controls in our projects

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

// Menu management
function ari_onMenuSelect(e) {
	var url = "MainMenuPage.shtml";
	var vText = $(e.item).children(".k-link").text();
	switch (vText) {
		case "User groups":
		    url = "UserGroupGrid.shtml";
		    window.open(url, '_self');
			break;
		case "Users":
		    url = "UserGrid.shtml";
		    window.open(url, '_self');
		    break;
	    case "Home":
	        url = "MainMenuPage.shtml";
	        window.open(url, '_self');
	        break;
	    default:
	        alert(vText);
	        break;
	}
}



function ari_delete(id, entity) {
    var r = confirm("¿Realmente quiere eliminar el registro?");
    if (r == true) {
        var linker = ari_generalLinker(entity);
        var url = linker.url + id;
        var html = linker.html;
        var options = {
            type: 'DELETE',
            url: url,
            dataType: 'json',
            success: function (data, textStatus) {
                alert("<h1>El registro se ha eliminado correctamente</h1>");
                ari_windowOpen(html);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("<h1>Se produjo un error en la eliminación del registro</h1>");
                alert("JqXHR: " + kendo.stringify(jqXHR));
                alert("Status: " + textStatus);
                alert("ErrorThrown: " + errorThrown);
            }
        };
        $.ajax(options);
    } else {
        alert("NO");
    }
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

function ari_windowOpen(url) {
    window.open(url, '_self');
}



// USER GROUP MANAGEMENT (UGM)
// UGM DataSource: It's binding to a webapi
