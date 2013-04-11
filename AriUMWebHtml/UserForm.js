// Form datasources (Autocomplete fields)
var UserGroupAutoDS = new kendo.data.DataSource({
    transport: {
        read: {
            url: controller_url.UserGroups + "?order=name",
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
            id: "UserGroupId",
            fields: {
                UserGroupId: { type: "number" },
                Name: { type: "string" }
            }
        }
    },
});
// Build user form
function buildUserForm() {
    // building autocomplete
    $("#txtUserGroup").kendoAutoComplete({
        dataTextField: "Name",
        dataSource: UserGroupAutoDS,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            $("#txtUserGroupId").val(dataItem.UserGroupId);
        }
    });
}

function loadUserForm() {
    $.ajax({
        type: 'GET',
        url: "UserForm.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#UserFormContainer").append(html);
            buildUserForm();
        },
    });
}


function formUserNew() {
    // Hide the grid show the form
    $("#UserGridContainer").hide();
    $("#UserFormContainer").show();
    isNew = true;
    $("#txtId").val("");
    $("#txtName").val("");
    $("#txtEmail").val("");
    $("#txtUserGroup").val("");
    $("#txtName").focus();
}
function formUserEdit(id) {
    // Hide the grid show the form
    $("#UserGridContainer").hide();
    $("#UserFormContainer").show();
    isNew = false;
    var url = controller_url.Users + id;
    var options = {
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data, textStatus) {
            formUserLoadData(data);
            $("#txtName").focus();
        }
    };
    $.ajax(options);
}
function formUserAccept() {
    var validator = $("#formUser").kendoValidator().data("kendoValidator");
    if (validator.validate()) {
        var User = formUserUnloadData();
        var url = controller_url.Users;
        var type = "";
        if (isNew)
            type = "POST";
        else {
            type = "PUT";
            url += User.UserId;
        }
        var options = {
            type: type,
            url: url,
            dataType: 'json',
            data: User,
            success: function (data, textStatus) {
                gridUserRefresh();
            }
        }
        $.ajax(options);
        // Hide the form show the grid
        $("#UserFormContainer").hide();
        $("#UserGridContainer").show();
    }
}
function formUserCancel() {
    // Hide the form show the grid
    $("#UserFormContainer").hide();
    $("#UserGridContainer").show();
}
function formUserUnloadData() {
    var User = new Object();
    User.UserId = $("#txtId").val();
    User.Name = $("#txtName").val();
    User.Email = $("#txtEmail").val();
    var v = $("#txtUserGroupId").val();
    var t = $("#txtUserGroup").val();
    if (v != "" && t != "") {
        User.UserGroup = new Object();
        User.UserGroup.UserGroupId = parseInt(v);
        User.UserGroup.Name = t;
    }
    var p = $("#txtPassword1").val();
    if (p != "") {
        User.Password = p;
    }
    return User;
}
function formUserLoadData(User) {
    $("#txtId").val(User.UserId);
    $("#txtName").val(User.Name);
    $("#txtEmail").val(User.Email);
    if (User.UserGroup != null) {
        $("#txtUserGroup").val(User.UserGroup.Name);
        $("#txtUserGroupId").val(User.UserGroup.UserGroupId);
    }
    $("#txtPassword1").val(User.Password);
    $("#txtPassword2").val(User.Password);
}
function formUserDataOk() {
    var pass1 = $("#txtPassword1").val();
    var pass2 = $("#txtPassword2").val();
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
function formUserSearch(entitity) {
    switch (entitity) {
        case "UserGroup":
            mode = "S";
            loadUserGroupGrid();
            $("#UserFormContainer").hide();
            $("#UserGroupGridContainer").show()
            break;
    }
}