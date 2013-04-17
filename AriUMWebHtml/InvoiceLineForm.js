// Form datasources (Autocomplete fields)
var InvoiceLineProductAutoDS = new kendo.data.DataSource({
    transport: {
        read: {
            url: controller_url.Products + "?order=name",
            dataType: "json",
            type: "GET",
            contentType: "application/json",
            silverFiltering: true,
            serverPaging: true
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
                Name: { type: "string" }
            }
        }
    },
});

// Build user form
function buildInvoiceLineForm() {
    var c = "#InvoiceLineFormContainer ";
    // building autocomplete
    $(c + "#txtProduct").kendoAutoComplete({
        dataTextField: "Name",
        dataSource: InvoiceLineProductAutoDS,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            $(c + "#txtProduct").val(dataItem.Name);
            $(c + "#txtProductId").val(dataItem.ProductId);
            formInvoiceLineProductLostFocus();
        }
    });
}

function loadInvoiceLineForm() {
    $.ajax({
        type: 'GET',
        url: "InvoiceLineForm.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#InvoiceLineFormContainer").html(html);
            buildInvoiceLineForm();
            $("#txtProduct").focusout(function () {
                formInvoiceLineProductLostFocus();
            });
            $("#txtQuantity").focusout(function () {
                formInvoiceLineQuantityLostFocus();
            });
        },
    });
}

function formInvoiceLineNew(invoiceId) {
    var c = "#InvoiceLineFormContainer ";
    $(c + "#txtInvoiceId").val(invoiceId);
    $("#InvoiceFormContainer").hide();
    // Hide the grid show the form
    $("#InvoiceLineGridContainer").hide();
    $("#InvoiceLineFormContainer").show();
    isNew = true;
    $(c + "#txtId").val("");
    $(c + "#txtProduct").val("");
    $(c + "#txtPrice").val("");
    $(c + "#txtQuantity").val("");
    $(c + "#txtAmount").val("");
    $(c + "#txtProduct").focus();
}
function formInvoiceLineEdit(id, invoiceId) {
    var c = "#InvoiceLineFormContainer ";
    $("#InvoiceFormContainer").hide();
    // Hide the grid show the form
    $("#InvoiceLineGridContainer").hide();
    $("#InvoiceLineFormContainer").show();
    isNew = false;
    var url = controller_url.InvoiceLines + id;
    var options = {
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data, textStatus) {
            formInvoiceLineLoadData(data);
            $(c + "#txtInvoiceId").val(invoiceId);
            $(c + "#txtProduct").focus();
        }
    };
    $.ajax(options);
}
function formInvoiceLineAccept() {
    var c = "#InvoiceLineFormContainer ";
    var validator = $(c + "#formInvoiceLine").kendoValidator().data("kendoValidator");
    if (validator.validate()) {
        var InvoiceLine = formInvoiceLineUnloadData();
        var url = controller_url.InvoiceLines;
        var type = "";
        if (isNew)
            type = "POST";
        else {
            type = "PUT";
            url += InvoiceLine.InvoiceLineId;
        }
        var options = {
            type: type,
            url: url,
            dataType: 'json',
            data: InvoiceLine,
            success: function (data, textStatus) {
                gridInvoiceLineRefresh();
            }
        }
        $.ajax(options);
        $("#InvoiceFormContainer").show();
        // Hide the form show the grid
        $("#InvoiceLineFormContainer").hide();
        $("#InvoiceLineGridContainer").show();
    }
}
function formInvoiceLineCancel() {
    $("#InvoiceFormContainer").show();
    // Hide the form show the grid
    $("#InvoiceLineFormContainer").hide();
    $("#InvoiceLineGridContainer").show();
}
function formInvoiceLineUnloadData() {
    var c = "#InvoiceLineFormContainer ";
    var InvoiceLine = new Object();
    InvoiceLine.InvoiceLineId = $(c + "#txtId").val();
    // related invoice id is in a hidden field
    InvoiceLine.Invoice = new Object();
    InvoiceLine.Invoice.InvoiceId = $(c + "#txtInvoiceId").val();
    var v = $(c + "#txtProductId").val();
    var t = $(c + "#txtProduct").val();
    if (v != "" && t != "") {
        InvoiceLine.Product = new Object();
        InvoiceLine.Product.ProductId = parseInt(v);
        InvoiceLine.Product.Name = t;
    }
    InvoiceLine.Price = parseFloat($(c + "#txtPrice").val());
    InvoiceLine.Quantity = parseInt($(c + "#txtQuantity").val());
    InvoiceLine.Amount = parseFloat($(c + "#txtAmount").val());
    return InvoiceLine;
}
function formInvoiceLineLoadData(InvoiceLine) {
    var c = "#InvoiceLineFormContainer ";
    $(c + "#txtId").val(InvoiceLine.InvoiceLineId);
    if (InvoiceLine.Product != null) {
        $(c + "#txtProduct").val(InvoiceLine.Product.Name);
        $(c + "#txtProductId").val(InvoiceLine.Product.ProductId);
    }
    $(c + "#txtPrice").val(InvoiceLine.Price);
    $(c + "#txtQuantity").val(InvoiceLine.Quantity);
    $(c + "#txtAmount").val(InvoiceLine.Amount);
}
function formInvoiceLineDataOk() {
    return true;
}
function formInvoiceLineSearch(entitity) {
    switch (entitity) {
        case "Product":
            mode = "S";
            caller = "InvoiceLineForm";
            loadProductGrid();
            $("#InvoiceLineFormContainer").hide();
            $("#ProductGridContainer").show()
            break;
    }
}
//
function formInvoiceLineProductLostFocus() {
    var c = "#InvoiceLineFormContainer ";
    var productId = $(c + "#txtProductId").val();
    if (productId != "" && $(c + "#txtProduct").val() != "") {
        $.ajax({
            type: "GET",
            url: controller_url.Products + productId,
            dataType: "json",
            success: function (data, textStatus) {
                $(c + "#txtPrice").val(data.Price);
                formInvoiceLineQuantityLostFocus();
                $(c + "#txtQuantity").focus();
            }
        });
    }
}
function formInvoiceLineQuantityLostFocus() {
    var c = "#InvoiceLineFormContainer ";
    var quantity = parseInt($(c + "#txtQuantity").val(), 10);
    if (quantity != 0) {
        var price = parseFloat($(c + "#txtPrice").val(), 10);
        if (price != 0) {
            var amount = parseFloat(quantity * price,10).toFixed(2);
            $(c + "#txtAmount").val(amount);
        }
    }
}