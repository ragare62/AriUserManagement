

function loadCustomerForm() {
    $.ajax({
        type: 'GET',
        url: "CustomerForm.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#CustomerFormContainer").html(html);
        },
    });
}

function formCustomerNew() {
    var c = "#CustomerFormContainer ";
    // Hide the grid show the form
    $("#CustomerGridContainer").hide();
    $("#CustomerFormContainer").show();
    isNew = true;
    $(c + "#txtId").val("");
    $(c + "#txtName").val("");
    $(c + "#txtNif").val("");
    $(c + "#txtSerialInvoice").val("");
    $(c + "#txtAddress").val("");
    $(c + "#txtCity").val("");
    $(c + "#txtCodPostal").val("");
    $(c + "#txtState").val("");
    $(c + "#txtCountry").val("");
    $(c + "#txtName").focus();
}
function formCustomerEdit(id) {
    // Hide the grid show the form
    $("#CustomerGridContainer").hide();
    $("#CustomerFormContainer").show();
    isNew = false;
    var url = controller_url.Customers + id;
    var options = {
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data, textStatus) {
            formCustomerLoadData(data);
            $("#txtName").focus();
        }
    };
    $.ajax(options);
}
function formCustomerAccept() {
    var validator = $("#formCustomer").kendoValidator().data("kendoValidator");
    if (validator.validate()) {
        var Customer = formCustomerUnloadData();
        var url = controller_url.Customers;
        var type = "";
        if (isNew)
            type = "POST";
        else {
            type = "PUT";
            url += Customer.CustomerId;
        }
        var options = {
            type: type,
            url: url,
            dataType: 'json',
            data: Customer,
            success: function (data, textStatus) {
                gridCustomerRefresh();
            }
        }
        $.ajax(options);
        // Hide the form show the grid
        $("#CustomerFormContainer").hide();
        $("#CustomerGridContainer").show();
    }
}
function formCustomerCancel() {
    // Hide the form show the grid
    $("#CustomerFormContainer").hide();
    $("#CustomerGridContainer").show();
}
function formCustomerUnloadData() {
    var c = "#CustomerFormContainer ";
    var Customer = new Object();
    Customer.CustomerId = $(c + "#txtId").val();
    Customer.Name = $(c + "#txtName").val();
    Customer.Nif = $(c + "#txtNif").val();
    Customer.SerialInvoice = $(c + "#txtSerialInvoice").val();
    Customer.Address = $(c + "#txtAddress").val();
    Customer.City = $(c + "#txtCity").val();
    Customer.CodPostal = $(c + "#txtCodPostal").val();
    Customer.State = $(c + "#txtState").val();
    Customer.Country = $(c + "#txtCountry").val();
    return Customer;
}
function formCustomerLoadData(Customer) {
    var c = "#CustomerFormContainer ";
    $(c +"#txtId").val(Customer.CustomerId);
    $(c + "#txtName").val(Customer.Name);
    $(c + "#txtNif").val(Customer.Nif);
    $(c + "#txtSerialInvoice").val(Customer.SerialInvoice);
    $(c + "#txtAddress").val(Customer.Address);
    $(c + "#txtCity").val(Customer.City);
    $(c + "#txtCodPostal").val(Customer.CodPostal);
    $(c + "#txtState").val(Customer.State);
    $(c + "#txtCountry").val(Customer.Country);
}
