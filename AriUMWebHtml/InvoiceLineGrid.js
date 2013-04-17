// Load templates
var tNewInvoiceLine;
var tEditInvoiceLine;

function templatesInvoiceLineGrid() {
    tNewInvoiceLine = kendo.template($("#tNewInvoiceLine").html());
    tEditInvoiceLine = kendo.template($("#tEditInvoiceLine").html());
    if (mode == "S")
        tEditInvoiceLine = kendo.template($("#tEditInvoiceLineS").html());
}

function loadInvoiceLineGrid(invoiceId) {
    $.ajax({
        type: 'GET',
        url: "InvoiceLineGrid.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#InvoiceLineGridContainer").html(html);
            templatesInvoiceLineGrid();
            builInvoiceLineGrid(invoiceId);
            $("#InvoiceLineGridContainer #txtInvoiceId").val(invoiceId)
        },
    });
}

// gridInvoiceLine datasource
function gridInvoiceLineDS(invoiceId) {
    return new kendo.data.DataSource({
        transport: {
            read: {
                url: controller_url.InvoiceLines + "?InvoiceId=" + invoiceId,
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
                    Invoice: {type:"object"},
                    InvoiceLineId: { type: "number" },
                    Product: { type: "object" },
                    Quantity: { type: "number" },
                    Amount: { type: "number" }
                }
            }
        },
        pageSize: 5
    });
}

// build gridInvoiceLine
function builInvoiceLineGrid(invoiceId) {
    $("#gridInvoiceLine").kendoGrid({
        dataSource: gridInvoiceLineDS(invoiceId),
        columns: [
            { field: "InvoiceLineId", title: "ID" },
            { field: "Product.Name", title: "Producto" },
            { field: "Product.Price", title: "Precio", format: "{0:c}", attributes: { style: "text-align:right;" } },
            { field: "Quantity", title: "Cantidad", attributes: { style: "text-align:right;" } },
            { field: "Amount", title: "Importe", format: "{0:c}", attributes: { style: "text-align:right;" } }, {
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

function gridInvoiceLineNew() {
    formInvoiceLineNew($("#txtInvoiceId").val());
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
    bootbox.confirm("<h4>¿Desea eliminar este registro? (" + name + ")</h4>", "Cancelar", "Aceptar", deleteInvoiceLineResponse);
}
function deleteInvoiceLineResponse(arg) {
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