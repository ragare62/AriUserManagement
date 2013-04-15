// Form datasources (Autocomplete fields)
var InvoiceLineGroupAutoDS = new kendo.data.DataSource({
    transport: {
        read: {
            url: controller_url.InvoiceLineGroups + "?order=name",
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
            id: "InvoiceLineGroupId",
            fields: {
                InvoiceLineGroupId: { type: "number" },
                Name: { type: "string" }
            }
        }
    },
});
// Build user form
function buildInvoiceLineForm() {
    var c = "#InvoiceLineFormContainer ";
    // building autocomplete
    $(c + "#txtInvoiceLineGroup").kendoAutoComplete({
        dataTextField: "Name",
        dataSource: InvoiceLineGroupAutoDS,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            $("#txtInvoiceLineGroupId").val(dataItem.InvoiceLineGroupId);
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
        },
    });
}


function formInvoiceLineNew() {
    var c = "#InvoiceLineFormContainer ";
    // Hide the grid show the form
    $("#InvoiceLineGridContainer").hide();
    $("#InvoiceLineFormContainer").show();
    isNew = true;
    $(c + "#txtId").val("");
    $(c + "#txtName").val("");
    $(c + "#txtEmail").val("");
    $(c + "#txtInvoiceLineGroup").val("");
    $(c + "#txtName").focus();
}
function formInvoiceLineEdit(id) {
    var c = "#InvoiceLineFormContainer ";
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
            $(c + "#txtName").focus();
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
        // Hide the form show the grid
        $("#InvoiceLineFormContainer").hide();
        $("#InvoiceLineGridContainer").show();
    }
}
function formInvoiceLineCancel() {
    // Hide the form show the grid
    $("#InvoiceLineFormContainer").hide();
    $("#InvoiceLineGridContainer").show();
}
function formInvoiceLineUnloadData() {
    var c = "#InvoiceLineFormContainer ";
    var InvoiceLine = new Object();
    InvoiceLine.InvoiceLineId = $(c + "#txtId").val();
    InvoiceLine.Name = $(c + "#txtName").val();
    InvoiceLine.Email = $(c + "#txtEmail").val();
    var v = $(c + "#txtInvoiceLineGroupId").val();
    var t = $(c + "#txtInvoiceLineGroup").val();
    if (v != "" && t != "") {
        InvoiceLine.InvoiceLineGroup = new Object();
        InvoiceLine.InvoiceLineGroup.InvoiceLineGroupId = parseInt(v);
        InvoiceLine.InvoiceLineGroup.Name = t;
    }
    var p = $(c + "#txtPassword1").val();
    if (p != "") {
        InvoiceLine.Password = p;
    }
    return InvoiceLine;
}
function formInvoiceLineLoadData(InvoiceLine) {
    var c = "#InvoiceLineFormContainer ";
    $(c + "#txtId").val(InvoiceLine.InvoiceLineId);
    $(c + "#txtName").val(InvoiceLine.Name);
    $(c + "#txtEmail").val(InvoiceLine.Email);
    if (InvoiceLine.InvoiceLineGroup != null) {
        $(c + "#txtInvoiceLineGroup").val(InvoiceLine.InvoiceLineGroup.Name);
        $(c + "#txtInvoiceLineGroupId").val(InvoiceLine.InvoiceLineGroup.InvoiceLineGroupId);
    }
    $(c + "#txtPassword1").val(InvoiceLine.Password);
    $(c + "#txtPassword2").val(InvoiceLine.Password);
}
function formInvoiceLineDataOk() {
    var c = "#InvoiceLineFormContainer ";
    var pass1 = $(c + "#txtPassword1").val();
    var pass2 = $(c + "#txtPassword2").val();
    if (pass1 != "" || pass2 != "") {
        if (pass1 != pass2) {
            var message = "<h4 class='text-warning'>AVISO:</h4>" +
                          "<p classs='text-warning'> Las contraseñas no coinciden</p>";
            bootbox.alert(message, "Aceptar");
            return false;
        }
    }
    return true;
}
function formInvoiceLineSearch(entitity) {
    switch (entitity) {
        case "InvoiceLineGroup":
            mode = "S";
            caller = "InvoiceLineForm";
            loadInvoiceLineGroupGrid();
            $("#InvoiceLineFormContainer").hide();
            $("#InvoiceLineGroupGridContainer").show()
            break;
    }
}