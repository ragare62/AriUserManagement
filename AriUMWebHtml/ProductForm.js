function loadProductForm() {
    $.ajax({
        type: 'GET',
        url: "ProductForm.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#ProductFormContainer").html(html);
            buildProductForm();
        },
    });
}
function buildProductForm() {
    //var c = "#ProductFormContainer ";
    //$(c + "#txtPrice").kendoNumericTextBox();
}

function formProductNew() {
    var c = "#ProductFormContainer ";
    // Hide the grid show the form
    $("#ProductGridContainer").hide();
    $("#ProductFormContainer").show();
    isNew = true;
    $(c + "#txtId").val("");
    $(c + "#txtName").val("");
    $(c + "#txtPrice").val("");
    $(c + "#txtPrice").focus();
    $(c + "#txtName").focus();
}
function formProductEdit(id) {
    // Hide the grid show the form
    $("#ProductGridContainer").hide();
    $("#ProductFormContainer").show();
    isNew = false;
    var url = controller_url.Products + id;
    var options = {
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data, textStatus) {
            formProductLoadData(data);
            $("#txtName").focus();
        }
    };
    $.ajax(options);
}
function formProductAccept() {
    var validator = $("#formProduct").kendoValidator().data("kendoValidator");
    if (validator.validate()) {
        var Product = formProductUnloadData();
        var url = controller_url.Products;
        var type = "";
        if (isNew)
            type = "POST";
        else {
            type = "PUT";
            url += Product.ProductId;
        }
        var options = {
            type: type,
            url: url,
            dataType: 'json',
            data: Product,
            success: function (data, textStatus) {
                gridProductRefresh();
            }
        }
        $.ajax(options);
        // Hide the form show the grid
        $("#ProductFormContainer").hide();
        $("#ProductGridContainer").show();
    }
}
function formProductCancel() {
    // Hide the form show the grid
    $("#ProductFormContainer").hide();
    $("#ProductGridContainer").show();
}
function formProductUnloadData() {
    var c = "#ProductFormContainer ";
    var Product = new Object();
    Product.ProductId = $(c + "#txtId").val();
    Product.Name = $(c + "#txtName").val();
    var p = $(c + "#txtPrice").val().replace(",",".");
    Product.Price = parseFloat(p);
    return Product;
}
function formProductLoadData(Product) {
    var c = "#ProductFormContainer ";
    $(c +"#txtId").val(Product.ProductId);
    $(c + "#txtName").val(Product.Name);
    $(c + "#txtPrice").val(Product.Price);
}
