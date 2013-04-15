// Load templates
var tNewInvoiceLine;
var tEditInvoiceLine;

function templatesInvoiceLineGrid() {
    tNewInvoiceLine = kendo.template($("#tNewInvoiceLine").html());
    tEditInvoiceLine = kendo.template($("#tEditInvoiceLine").html());
    if (mode == "S")
        tEditInvoiceLine = kendo.template($("#tEditInvoiceLineS").html());
}

function loadInvoiceLineGrid() {
    $.ajax({
        type: 'GET',
        url: "InvoiceLineGrid.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#InvoiceLineGridContainer").html(html);
            templatesInvoiceLineGrid();
            builInvoiceLineGrid();
        },
    });
}

// gridInvoiceLine datasource
var gridInvoiceLineDS = new kendo.data.DataSource({
    transport: {
        read: {
            url: controller_url.InvoiceLines,
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
            id: "InvoiceLineId",
            fields: {
                InvoiceLineId: { type: "number" },
                Name: { type: "string" },
                Email: { type: "string" },
                Password: { type: "string" },
                InvoiceLineGroup: {}
            }
        }
    },
    pageSize: 5
});

// build gridInvoiceLine
function builInvoiceLineGrid() {
    $("#gridInvoiceLine").kendoGrid({
        dataSource: gridInvoiceLineDS,
        columns: [
            { field: "InvoiceLineId", title: "ID" },
            { field: "Name", title: "Name" },
            { field: "Email", titile: "Correo" },
            { field: "InvoiceLineGroup", title: "Grupo", template: "#=InvoiceLineGroup?InvoiceLineGroup.Name:''#" },
            {
                template: tEditInvoiceLine
            }
        ],
        toolbar:
        [{ template: tNewInvoiceLine }],
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
function gridInvoiceLineRefresh() {
    var ds = $("#gridInvoiceLine").data("kendoGrid").dataSource;
    var totalPages = ds.totalPages();
    ds.read();
    if (isNew)
        ds.page(totalPages);
}
function gridInvoiceLineDelete(id, name) {
    deleteId = id;
    bootbox.confirm("<h4>¿Desea eliminar este registro? (" + name + ")</h4>", "Cancelar", "Aceptar", deleteResponse);
}
function deleteResponse(arg) {
    if (arg) {
        var url = controller_url.InvoiceLines + deleteId;
        var options = {
            type: 'DELETE',
            url: url,
            dataType: 'json',
            success: function (data, textStatus) {
                gridInvoiceLineRefresh();
            }
        };
        $.ajax(options);
    }
}
function gridInvoiceLineSelect(id) {
    alert("SELECT");
}