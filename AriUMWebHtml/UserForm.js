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
    var c = "#UserFormContainer ";
    // building autocomplete
    $(c + "#txtUserGroup").kendoAutoComplete({
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
            $("#UserFormContainer").html(html);
            buildUserForm();
        },
    });
}

function formUserNew() {
    var c = "#UserFormContainer ";
    // Hide the grid show the form
    $("#UserGridContainer").hide();
    $("#UserFormContainer").show();
    isNew = true;
    $(c + "#txtId").val("");
    $(c + "#txtName").val("");
    $(c + "#txtLogin").val("");
    $(c + "#txtEmail").val("");
    $(c + "#txtUserGroup").val("");
    $(c + "#txtName").focus();
}
function formUserEdit(id) {
    var c = "#UserFormContainer ";
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
            $(c + "#txtName").focus();
        }
    };
    $.ajax(options);
}
function formUserAccept() {
    var c = "#UserFormContainer ";
    var validator = $(c + "#formUser").kendoValidator().data("kendoValidator");
    if (!formUserDataOk()) return;
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
    var c = "#UserFormContainer ";
    var User = new Object();
    User.UserId = $(c + "#txtId").val();
    User.Name = $(c + "#txtName").val();
    User.Login = $(c + "#txtLogin").val();
    User.Email = $(c + "#txtEmail").val();
    var v = $(c + "#txtUserGroupId").val();
    var t = $(c + "#txtUserGroup").val();
    if (v != "" && t != "") {
        User.UserGroup = new Object();
        User.UserGroup.UserGroupId = parseInt(v);
        User.UserGroup.Name = t;
    }
    var p = $(c + "#txtPassword1").val();
    User.Password = p;
    return User;
}
function formUserLoadData(User) {
    var c = "#UserFormContainer ";
    $(c + "#txtId").val(User.UserId);
    $(c + "#txtName").val(User.Name);
    $(c + "#txtLogin").val(User.Login);
    $(c + "#txtEmail").val(User.Email);
    if (User.UserGroup != null) {
        $(c + "#txtUserGroup").val(User.UserGroup.Name);
        $(c + "#txtUserGroupId").val(User.UserGroup.UserGroupId);
    }
    $(c + "#txtPassword1").val("");
    $(c + "#txtPassword2").val("");
}
function formUserDataOk() {
    var c = "#UserFormContainer ";
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
function formUserSearch(entitity) {
    switch (entitity) {
        case "UserGroup":
            mode = "S";
            caller = "UserForm";
            loadUserGroupGrid();
            $("#UserFormContainer").hide();
            $("#UserGroupGridContainer").show()
            break;
    }
}