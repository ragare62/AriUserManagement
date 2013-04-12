// Load templates
var tNewProduct;
var tEditProduct;

//
function templateProductGrid() {
    tNewProduct = kendo.template($("#tNewProduct").html());
    tEditProduct = kendo.template($("#tEditProduct").html());
    if (mode == "S") {
        tNewProduct = kendo.template($("#tNewProductS").html());
        tEditProduct = kendo.template($("#tEditProductS").html());
        $("#ProductGridTitle").html("Productos <i class='icon-search'></i>");
    }
}

// gridProduct datasource
var gridProductDS = new kendo.data.DataSource({
    transport: {
        read: {
            url: controller_url.Products,
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
            id: "ProductId",
            fields: {
                ProductId: { type: "number" },
                Name: { type: "string" },
                Price: { type: "number" }
            }
        }
    },
    pageSize: 5
});


//
function loadProductGrid() {
    $.ajax({
        type: 'GET',
        url: "ProductGrid.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#ProductGridContainer").html(html);
            templateProductGrid();
            builProductGrid();
        },
    });
}

// build gridProduct
function builProductGrid() {
    $("#gridProduct").kendoGrid({
        dataSource: gridProductDS,
        columns: [
            { field: "ProductId", title: "ID" },
            { field: "Name", title: "Name" },
            { field:"Price", title: "Precio"},
            {
                template: tEditProduct
            }
        ],
        toolbar: [{ template: tNewProduct }],
        pageable: ari_pageable_es_ES,
        sortable: true,
        groupable: ari_groupable_es_ES,
        filterable: ari_filterable_es_ES,
        columnMenu: ari_columnMenu_es_ES
    });
}
function gridProductRefresh() {
    var c = "#ProductGridContainer ";
    var ds = $(c + "#gridProduct").data("kendoGrid").dataSource;
    var totalPages = ds.totalPages();
    ds.read();
    if (isNew)
        ds.page(totalPages);
}
function gridProductDelete(id, name) {
    deleteId = id;
    bootbox.confirm("<h4>¿Desea eliminar este registro? (" + name + ")</h4>", "Cancelar", "Aceptar", deleteResponse);
}
function deleteResponse(arg) {
    if (arg) {
        var url = controller_url.Products + deleteId;
        var options = {
            type: 'DELETE',
            url: url,
            dataType: 'json',
            success: function (data, textStatus) {
                gridProductRefresh();
            }
        };
        $.ajax(options);
    }
}
function gridProductSelect(id, name) {
    switch (caller) {

    }
    caller = "";
}
function gridProductExit() {
    switch (caller) {
    }
    caller = "";
}