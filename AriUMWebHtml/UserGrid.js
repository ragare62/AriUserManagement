// Load templates
var tNewUser;
var tEditUser;

function templatesUserGrid() {
    tNewUser = kendo.template($("#tNewUser").html());
    tEditUser = kendo.template($("#tEditUser").html());
    if (mode == "S")
        tEditUser = kendo.template($("#tEditUserS").html());
}

function loadUserGrid() {
    $.ajax({
        type: 'GET',
        url: "UserGrid.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#UserGridContainer").append(html);
            templatesUserGrid();
            builUserGrid();
        },
    });
}

// gridUser datasource
var gridUserDS = new kendo.data.DataSource({
    transport: {
        read: {
            url: controller_url.Users,
            dataType: "json",
            type: "GET",
            contentType: "application/json"
        },
        parameterMap: function (data, type) {
            if (type != "GET")
                return kendo.stringify(data);
        }
    },
    schema: {
        model: {
            id: "UserId",
            fields: {
                UserId: { type: "number" },
                Name: { type: "string" },
                Email: { type: "string" },
                Password: { type: "string" },
                UserGroup: {}
            }
        }
    },
    pageSize: 5
});

// build gridUser
function builUserGrid() {
    $("#gridUser").kendoGrid({
        dataSource: gridUserDS,
        columns: [
            { field: "UserId", title: "ID" },
            { field: "Name", title: "Name" },
            { field: "Email", titile: "Correo" },
            { field: "UserGroup", title: "Grupo", template: "#=UserGroup?UserGroup.Name:''#" },
            {
                template: tEditUser
            }
        ],
        toolbar:
        [{ template: tNewUser }],
        pageable
        : ari_pageable_es_ES,
        sortable
        : true,
        groupable
        : ari_groupable_es_ES,
        filterable
        : ari_filterable_es_ES,
        columnMenu
        : ari_columnMenu_es_ES
    });
}
function gridUserRefresh() {
    var ds = $("#gridUser").data("kendoGrid").dataSource;
    var totalPages = ds.totalPages();
    ds.read();
    if (isNew)
        ds.page(totalPages);
}
function gridUserDelete(id, name) {
    deleteId = id;
    bootbox.confirm("<h4>¿Desea eliminar este registro? (" + name + ")</h4>", "Cancelar", "Aceptar", deleteResponse);
}
function deleteResponse(arg) {
    if (arg) {
        var url = controller_url.Users + deleteId;
        var options = {
            type: 'DELETE',
            url: url,
            dataType: 'json',
            success: function (data, textStatus) {
                gridUserRefresh();
            }
        };
        $.ajax(options);
    }
}
function gridUserSelect(id) {
    alert("SELECT");
}