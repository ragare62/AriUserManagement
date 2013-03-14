//This JavaScript code includes the functions coded by Ariadna 
//in order to deal with kendo controls in or projects

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
		    url = "MainMenuPage.shtml";
		    window.open(url, '_self');
		    break;
	    case "Home":
	        url = "MainMenuPage.shtml";
	        window.open(url, '_self');
	        break;
	    default:
	        alert(vText + " L:" + vText.lenght());
	        break;
	}
}

// USER GROUP MANAGEMENT (UGM)
// UGM DataSource: It's binding to a webapi
