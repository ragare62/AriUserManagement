// Load templates
var tNewCustomer;
var tEditCustomer;

//
function templateCustomerGrid() {
    tNewCustomer = kendo.template($("#tNewCustomer").html());
    tEditCustomer = kendo.template($("#tEditCustomer").html());
    if (mode == "S") {
        tNewCustomer = kendo.template($("#tNewCustomerS").html());
        tEditCustomer = kendo.template($("#tEditCustomerS").html());
        $("#CustomerGridTitle").html("Clientes <i class='icon-search'></i>");
    }
}

// gridCustomer datasource
var gridCustomerDS = new kendo.data.DataSource({
    transport: {
        read: {
            url: controller_url.Customers,
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
            id: "CustomerId",
            fields: {
                CustomerId: { type: "number" },
                Name: { type: "string" },
                Nif: { type: "string" },
                SerialInvoice: {type: "string"},
                Email: { type: "string" },
                Address: { type: "string" },
                City: { type: "string" },
                State: { type: "string" },
                City: { type: "string" }
            }
        }
    },
    pageSize: 5
});

//
function loadCustomerGrid() {
    $.ajax({
        type: 'GET',
        url: "CustomerGrid.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#CustomerGridContainer").html(html);
            templateCustomerGrid();
            builCustomerGrid();
        },
    });
}

// build gridCustomer
function builCustomerGrid() {
    $("#gridCustomer").kendoGrid({
        dataSource: gridCustomerDS,
        columns: [
            { field: "CustomerId", title: "ID" },
            {field: "Nif", title:"NIF"},
            { field: "Name", title: "Nombre" },{
                template: tEditCustomer
            }
        ],
        toolbar: [{ template: tNewCustomer }],
        pageable: ari_pageable_es_ES,
        sortable: true,
        groupable: ari_groupable_es_ES,
        filterable: ari_filterable_es_ES,
        columnMenu: ari_columnMenu_es_ES
    });
}
function gridCustomerRefresh() {
    var c = "#CustomerGridContainer ";
    var ds = $(c + "#gridCustomer").data("kendoGrid").dataSource;
    var totalPages = ds.totalPages();
    ds.read();
    if (isNew)
        ds.page(totalPages);
}
function gridCustomerDelete(id, name) {
    deleteId = id;
    bootbox.confirm("<h4>¿Desea eliminar este registro? (" + name + ")</h4>", "Cancelar", "Aceptar", deleteResponse);
}
function deleteResponse(arg) {
    if (arg) {
        var url = controller_url.Customers + deleteId;
        var options = {
            type: 'DELETE',
            url: url,
            dataType: 'json',
            success: function (data, textStatus) {
                gridCustomerRefresh();
            }
        };
        $.ajax(options);
    }
}
function gridCustomerSelect(id, name) {
    switch (caller) {
        case "InvoiceForm":
            var c = "#InvoiceFormContainer ";
            $(c + "#txtCustomer").val(name);
            $(c + "#txtCustomerId").val(id);
            $("#CustomerGridContainer").hide();
            $("#InvoiceFormContainer").show();
            break;
    }
    caller = "";
}
function gridCustomerExit() {
    switch (caller) {
        case "InvoiceForm":
            $("#CustomerGridContainer").hide();
            $("#InvoiceFormContainer").show();
            break;
    }
    caller = "";
}