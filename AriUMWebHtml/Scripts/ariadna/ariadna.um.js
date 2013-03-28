
// Función común en el arranque de cualqueir página
function cargaCabeceraPie() {
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
    // carga de la cabecera
    $.ajax({
        type: 'GET',
        url: "http://localhost:49903/cabecera.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#cabecera").append(html);
        },
    });
    // carga el pie
    $.ajax({
        type: 'GET',
        url: "http://localhost:49903/pie.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#pie").append(html);
        },
    });
}

function ari_windowOpen(url) {
    alert(url);
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