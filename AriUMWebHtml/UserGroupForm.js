

function loadUserGroupForm() {
    $.ajax({
        type: 'GET',
        url: "UserGroupForm.html",
        dataType: 'html',
        success: function (html, textStatus) {
            $("#UserGroupFormContainer").html(html);
        },
    });
}

function formUserGroupNew() {
    var c = "#UserGroupFormContainer ";
    // Hide the grid show the form
    $("#UserGroupGridContainer").hide();
    $("#UserGroupFormContainer").show();
    isNew = true;
    $(c + "#txtId").val("");
    $(c + "#txtName").val("");
    $(c + "#txtName").focus();
}
function formUserGroupEdit(id) {
    // Hide the grid show the form
    $("#UserGroupGridContainer").hide();
    $("#UserGroupFormContainer").show();
    isNew = false;
    var url = controller_url.UserGroups + id;
    var options = {
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data, textStatus) {
            formUserGroupLoadData(data);
            $("#txtName").focus();
        }
    };
    $.ajax(options);
}
function formUserGroupAccept() {
    var validator = $("#formUserGroup").kendoValidator().data("kendoValidator");
    if (validator.validate()) {
        var UserGroup = formUserGroupUnloadData();
        var url = controller_url.UserGroups;
        var type = "";
        if (isNew)
            type = "POST";
        else {
            type = "PUT";
            url += UserGroup.UserGroupId;
        }
        var options = {
            type: type,
            url: url,
            dataType: 'json',
            data: UserGroup,
            success: function (data, textStatus) {
                gridUserGroupRefresh();
            }
        }
        $.ajax(options);
        // Hide the form show the grid
        $("#UserGroupFormContainer").hide();
        $("#UserGroupGridContainer").show();
    }
}
function formUserGroupCancel() {
    // Hide the form show the grid
    $("#UserGroupFormContainer").hide();
    $("#UserGroupGridContainer").show();
}
function formUserGroupUnloadData() {
    var c = "#UserGroupFormContainer ";
    var UserGroup = new Object();
    UserGroup.UserGroupId = $(c + "#txtId").val();
    UserGroup.Name = $(c + "#txtName").val();
    return UserGroup;
}
function formUserGroupLoadData(UserGroup) {
    var c = "#UserGroupFormContainer ";
    $(c +"#txtId").val(UserGroup.UserGroupId);
    $(c + "#txtName").val(UserGroup.Name);
}
