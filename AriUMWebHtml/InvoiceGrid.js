// Load templates
var tNewInvoice;
var tEditInvoice;

function templatesInvoiceGrid() {
    tNewInvoice = kendo.template($("#tNewInvoice").html());
    tEditInvoice = kendo.template($("#tEditInvoice").html());
    if (mode == "S")
        tEditInvoice = kendo.template($("#tEditInvoiceS").html());
}

function loadInvoiceGrid() {
    $.ajax({
        type: 'GET',
        url: "InvoiceGrid.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#InvoiceGridContainer").html(html);
            templatesInvoiceGrid();
            builInvoiceGrid();
        },
    });
}

// gridInvoice datasource
var gridInvoiceDS = new kendo.data.DataSource({
    transport: {
        read: {
            url: controller_url.Invoices,
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
            id: "InvoiceId",
            fields: {
                InvoiceId: { type: "number" },
                InvoiceDate: { type: "date" },
                Year: { type: "number" },
                Serial: { type: "string" },
                InvoiceNumber:{type: "number"},
                Customer: {type: "object"}
            }
        }
    },
    pageSize: 5
});

// build gridInvoice
function builInvoiceGrid() {
    $("#gridInvoice").kendoGrid({
        dataSource: gridInvoiceDS,
        columns: [
            { field: "InvoiceId", title: "ID" },
            { field: "InvoiceDate", title: "Fecha", format:"{0:dd/MM/yyyy}"},
            { field: "Year", title: "Año" },
            { field: "Serial", title: "Serie" },
            { field: "InvoiceNumber", title: "Número" },
            { field: "Customer.Name", title: "Cliente", template: "#=Customer?Customer.Name:''#", filterable: false },
            //{ field:"Customer", title: "Cliente", template:"#=Customer?Customer.Name:''#"},
            { field: "Total", title: "Total"},
            {
                template: tEditInvoice
            }
        ],
        toolbar:
        [{ template: tNewInvoice }],
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
function gridInvoiceRefresh() {
    var ds = $("#gridInvoice").data("kendoGrid").dataSource;
    var totalPages = ds.totalPages();
    ds.read();
    if (isNew)
        ds.page(totalPages);
}
function gridInvoiceDelete(id, name) {
    deleteId = id;
    bootbox.confirm("<h4>¿Desea eliminar este registro? (" + name + ")</h4>", "Cancelar", "Aceptar", deleteInvoiceResponse);
}
function deleteInvoiceResponse(arg) {
    if (arg) {
        var url = controller_url.Invoices + deleteId;
        var options = {
            type: 'DELETE',
            url: url,
            dataType: 'json',
            success: function (data, textStatus) {
                gridInvoiceRefresh();
            }
        };
        $.ajax(options);
    }
}
function gridInvoiceSelect(id) {
    alert("SELECT");
}