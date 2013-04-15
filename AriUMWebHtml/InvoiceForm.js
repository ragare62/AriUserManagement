// Form datasources (Autocomplete fields)
var CustomerAutoDS = new kendo.data.DataSource({
    transport: {
        read: {
            url: controller_url.Customers + "?order=name",
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
            id: "CustomerId",
            fields: {
                CustomerId: { type: "number" },
                Name: { type: "string" }
            }
        }
    },
});
// Build user form
function buildInvoiceForm() {
    var c = "#InvoiceFormContainer ";
    // building autocomplete
    $(c + "#txtCustomer").kendoAutoComplete({
        dataTextField: "Name",
        dataSource: CustomerAutoDS,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            $("#txtCustomerId").val(dataItem.CustomerId);
        }
    });
    // build date picker
    $(c + "#txtInvoiceDate").kendoDatePicker({
        format: "dd/MM/yyyy",
        change: function (e) {
            formInvoiceDateTreatment(this.value());
        }
    });
}

function loadInvoiceForm() {
    $.ajax({
        type: 'GET',
        url: "InvoiceForm.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#InvoiceFormContainer").html(html);
            buildInvoiceForm();
        },
    });
}


function formInvoiceNew() {
    var c = "#InvoiceFormContainer ";
    // Hide the grid show the form
    $("#InvoiceGridContainer").hide();
    $("#InvoiceFormContainer").show();
    isNew = true;
    $(c + "#txtId").val("");
    $(c + "#txtCustomer").val("");
    $(c + "#txtCustomerId").val("");
    $(c + "#txtInvoiceDate").val(moment().format("DD/MM/YYYY"));
    $(c + "#txtYear").val(moment().year());
    $(c + "#txtSerial").val("F");
    $(c + "#txtInvoiceNumber").val("");
    $(c + "#txtTotal").val("");
    $(c + "#txtCustomer").focus();
}
function formInvoiceEdit(id) {
    var c = "#InvoiceFormContainer ";
    // Hide the grid show the form
    $("#InvoiceGridContainer").hide();
    $("#InvoiceFormContainer").show();
    isNew = false;
    var url = controller_url.Invoices + id;
    var options = {
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data, textStatus) {
            formInvoiceLoadData(data);
            $(c + "#txtCustomer").focus();
        }
    };
    $.ajax(options);
}
function formInvoiceAccept() {
    var c = "#InvoiceFormContainer ";
    var validator = $(c + "#formInvoice").kendoValidator().data("kendoValidator");
    if (validator.validate()) {
        var Invoice = formInvoiceUnloadData();
        var url = controller_url.Invoices;
        var type = "";
        if (isNew)
            type = "POST";
        else {
            type = "PUT";
            url += Invoice.InvoiceId;
        }
        var options = {
            type: type,
            url: url,
            dataType: 'json',
            data: Invoice,
            success: function (data, textStatus) {
                gridInvoiceRefresh();
            }
        }
        $.ajax(options);
        // Hide the form show the grid
        $("#InvoiceFormContainer").hide();
        $("#InvoiceGridContainer").show();
    }
}
function formInvoiceCancel() {
    // Hide the form show the grid
    $("#InvoiceFormContainer").hide();
    $("#InvoiceGridContainer").show();
}
function formInvoiceUnloadData() {
    var c = "#InvoiceFormContainer ";
    var Invoice = new Object();
    Invoice.InvoiceId = $(c + "#txtId").val();
    var v = $(c + "#txtCustomerId").val();
    var t = $(c + "#txtCustomer").val();
    if (v != "" && t != "") {
        Invoice.Customer = new Object();
        Invoice.Customer.CustomerId = parseInt(v);
        Invoice.Customer.Name = t;
    }
    //Invoice.InvoiceDate = new Date.parse($(c + "#txtInvoiceDate").val());
    //Invoice.InvoiceDate = moment($(c + "#txtInvoiceDate").val(),"DD/MM/YYYY").toDate();
    //Invoice.InvoiceDate = $(c + "#txtInvoiceDate").val();
    //Invoice.InvoiceDate = new Date(2013, 4, 25);
    Invoice.InvoiceDate = moment($(c + "#txtInvoiceDate").val(), "DD/MM/YYYY").format("YYYY-MM-DD");
    Invoice.Year = $(c + "#txtYear").val();
    Invoice.Serial = $(c + "#txtSerial").val();
    Invoice.InvoiceNumber = $(c + "#txtInvoiceNumber").val();
    Invoice.Total = $(c + "#txtTotal").val();
    return Invoice;
}
function formInvoiceLoadData(Invoice) {
    var c = "#InvoiceFormContainer ";
    $(c + "#txtId").val(Invoice.InvoiceId);
    if (Invoice.Customer != null) {
        $(c + "#txtCustomer").val(Invoice.Customer.Name);
        $(c + "#txtCustomerId").val(InvoiceCustomer.CustomerId);
    }
    $(c + "#txtInvoiceDate").val(moment(Invoice.InvoiceDate).format("DD/MM/YYYY"));
    $(c + "#txtInvoiceDate").prop("diasable", true); // better than attr??
    $(c + "#txtYear").val(Invoice.Year);
    $(c + "#txtSerial").val(Invoice.Serial);
    $(c + "#txtInvoiceNumber").val(Invoice.InvoiceNumber);
    $(c + "#txtTotal").val(Invoice.Total);
}
function formInvoiceDataOk() {
    return true;
}
function formInvoiceSearch(entitity) {
    switch (entitity) {
        case "Customer":
            mode = "S";
            caller = "InvoiceForm";
            loadCustomerGrid();
            $("#InvoiceFormContainer").hide();
            $("#CustomerGridContainer").show()
            break;
    }
}
function formInvoiceDateTreatment(date) {
    var c = "#InvoiceFormContainer ";
    var mDate = new Date(date);
    $(c + "#txtYear").val(mDate.getFullYear());
}
