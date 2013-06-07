// Load templates
var tNewUserGroup;
var tEditUserGroup;

//
function templateUserGroupGrid() {
    tNewUserGroup = kendo.template($("#tNewUserGroup").html());
    tEditUserGroup = kendo.template($("#tEditUserGroup").html());
    if (mode == "S") {
        tNewUserGroup = kendo.template($("#tNewUserGroupS").html());
        tEditUserGroup = kendo.template($("#tEditUserGroupS").html());
        $("#UserGroupGridTitle").html("Grupos de usuarios <i class='icon-search'></i>");
    }
}

// gridUserGroup datasource
var gridUserGroupDS = new kendo.data.DataSource({
    transport: {
        read: {
            url: controller_url.UserGroups,
            dataType: "json",
            type: "GET",
            contentType: "application/json",
        },
        parameterMap: function (data, type) {
            if (type != "GET")
                return kendo.stringify(data);
        }
    },
    schema: {
        model: {
            id: "UserGroupId",
            fields: {
                UserGroupId: { type: "number" },
                Name: { type: "string" }
            }
        }
    },
    pageSize: 5
});
// gridUserGroup columns
var gridUserGroupCL = [
    { field: "UserGroupId", title: "ID" },
    { field: "Name", title: "Name" }, {
        template: tEditUserGroup
    }
];

//
function loadUserGroupGrid() {
    $.ajax({
        type: 'GET',
        url: "UserGroupGrid.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#UserGroupGridContainer").html(html);
            templateUserGroupGrid();
            builUserGroupGrid();
        },
    });
}

// build gridUserGroup
function builUserGroupGrid() {
    // Handler for error
    function gridUserGroupDS_Error(e) {
        var message = ari_formatErrorMessage(JSON.parse(e.xhr.responseText));
        bootbox.alert(message, "Aceptar");
    }
    //bin the handler to the event
    gridUserGroupDS.bind("error", gridUserGroupDS_Error);

    $("#gridUserGroup").kendoGrid({
        dataSource: gridUserGroupDS,
        columns: [
            { field: "UserGroupId", title: "ID" },
            { field: "Name", title: "Name" }, {
                template: tEditUserGroup
            }
        ],
        toolbar: [{ template: tNewUserGroup }],
        pageable: ari_pageable_es_ES,
        sortable: true,
        groupable: ari_groupable_es_ES,
        filterable: ari_filterable_es_ES,
        columnMenu: ari_columnMenu_es_ES
    });
}
function gridUserGroupRefresh() {
    var c = "#UserGroupGridContainer ";
    var ds = $(c + "#gridUserGroup").data("kendoGrid").dataSource;
    var totalPages = ds.totalPages();
    ds.read();
    if (isNew)
        ds.page(totalPages);
}
function gridUserGroupDelete(id, name) {
    deleteId = id;
    bootbox.confirm("<h4>¿Desea eliminar este registro? (" + name + ")</h4>", "Cancelar", "Aceptar", deleteResponse);
}
function deleteResponse(arg) {
    if (arg) {
        var url = controller_url.UserGroups + deleteId;
        var options = {
            type: 'DELETE',
            url: url,
            dataType: 'json',
            success: function (data, textStatus) {
                gridUserGroupRefresh();
            }
        };
        $.ajax(options);
    }
}
function gridUserGroupSelect(id, name) {
    switch (caller) {
        case "UserForm":
            var c = "#UserFormContainer ";
            $(c + "#txtUserGroup").val(name);
            $(c + "#txtUserGroupId").val(id);
            $("#UserGroupGridContainer").hide();
            $("#UserFormContainer").show();
            break;
    }
    caller = "";
}
function gridUserGroupExit() {
    switch (caller) {
        case "UserForm":
            $("#UserGroupGridContainer").hide();
            $("#UserFormContainer").show();
            break;
    }
    caller = "";
}