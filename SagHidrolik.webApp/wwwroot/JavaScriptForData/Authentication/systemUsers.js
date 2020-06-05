$(function () {
    let dataUrl = "AuthenticationData/AllSystemUsers";
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllSystemUsersAjaxCall();
        GetAllSyetemUsersCount();
        GetAllUsersRoles();
    }
});
let requestQueryForSystemUsers = {
    pageSize: 6,
    pageNumber: 1,
};
let systemUserModel = {
    Email: "",
    PassWord: "",
    RoleName: ""
}
let editSystemUserModel = {
    Email: "",
    PassWord: "",
    RoleName: ""
};
let systemUserList = [];
let RolesList = [];
// #region ajaxcall ,create table ,records count  
function GetAllSystemUsersAjaxCall() {
    requestQueryForSystemUsers.email = $(Inputs.systemUsers_searchEmail).val();
    ShowLoader();
    if (requestQueryForSystemUsers.pageNumber === 1) {
        disableButton(PreviousButtons.systemUser);
        ActiveButton(NextButtons.systemUser);
    }
    else {
        ActiveButton(PreviousButtons.systemUser);
        ActiveButton(NextButtons.systemUser);
    }
    $(TablesId.systemUser).empty();
    $(`${pageNumbers.systemUser}`).text(requestQueryForSystemUsers.pageNumber);

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.AllSystemUsers,
        data: JSON.stringify(requestQueryForSystemUsers),
        success: (list) => {
            systemUserList = list;
            if (list.length !== 0) {

                $(`${recordsNotFound.systemUser}`).css('display', 'none');
                CreateSystemUsersTable(list, TablesId.systemUser);
            }
            else {
                disableButton(NextButtons.systemUser);
                $(`${recordsNotFound.systemUser}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateSystemUsersTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.email}</td>
    <td>${element.roleName}</td>
 <td><i onclick="changeRole('${element.userId}')" class="fas fa-edit fa-2x  text-primary"  aria-hidden="true"></td>
 <td><i onclick="ResetUserPassword('${element.userId}')" class="fas fa-edit fa-2x  text-warning"  aria-hidden="true"></td>
 <td><i onclick="deleteSystemUser('${element.email}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}

function GetAllSyetemUsersCount() {
    $('#selectRowCount-systemUser').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllSyetemUsersCount,
        success: (number) => {
            $('#systemUserTableCount').text(number);
            $('#selectRowCount-systemUser').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#selectRowCount-systemUser').on('change', () => {
    let selectedRowCount = $("#selectRowCount-systemUser option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForSystemUsers.pageSize = selectedRowCount;
    requestQueryForSystemUsers.pageNumber = 1;
    GetAllSystemUsersAjaxCall();
});
//#endregion
//#region search
$(Inputs.systemUsers_searchEmail).keyup(function () {
    requestQueryForSystemUsers.pageNumber = 1;
    $(pageNumbers.systemUser).text(requestQueryForSystemUsers.pageNumber);
    clearTimeout(timer);
    timer = setTimeout(GetAllSystemUsersAjaxCall, doneTypingInterval);
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.systemUser).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForSystemUsers.pageNumber > 1) requestQueryForSystemUsers.pageNumber -= 1;
    $(`${pageNumbers.systemUser}`).text(requestQueryForSystemUsers.pageNumber);
    GetAllSystemUsersAjaxCall();
});
$(NextButtons.systemUser).on('click', (event) => {
    event.preventDefault();
    requestQueryForSystemUsers.pageNumber += 1;
    $(`${pageNumbers.systemUser}`).text(requestQueryForSystemUsers.pageNumber);
    GetAllSystemUsersAjaxCall();
});
//#endregion



//#region users Roles

function GetAllUsersRoles() {
    $('#selectRole-systemUser').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllUsersRoles,
        success: (list) => {
            RolesList = list;
            $('#selectRole-systemUser').append(`<option  value="">...</option>`)
            list.map((element) => {
                $('#selectRole-systemUser').append(`
<option  value="${element.roleId}"> ${element.roleName}</option>
`);
            })

        }
    });
}

$('#selectRole-systemUser').on('change', () => {
    let selectedRole = $("#selectRole-systemUser option:selected").val();
    requestQueryForSystemUsers.roleId = selectedRole;
    requestQueryForSystemUsers.pageNumber = 1;
    GetAllSystemUsersAjaxCall();
});
//#endregion
//#region Add New systemUser
$('#btn-systemUser-add').click((event) => {

    $('#selectRole-systemUser-addModel').empty();
    $('#selectRole-systemUser-addModel').append(`<option  value="">...</option>`)
    RolesList.map((element) => {
        $('#selectRole-systemUser-addModel').append(`
<option  value="${element.roleName}"> ${element.roleName}</option>
`);
    })
    $(Models.systemUser_add).modal('show');
});
$('#btn-systemUser-confirmAdd').click((event) => {
    let email = $('#inp-systemUser-email').val();
    let password = $('#inp-systemUser-password').val();
    let roleName = $('#selectRole-systemUser-addModel').val();
    if (email === '' ||
        password === '' ||
        roleName === ''
    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500
        });
    }
    else if (validateEmail(email) === false) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'please insert a validate email',
            timer: 1500
        });
    }
    else {
        systemUserModel.Email = email;
        systemUserModel.PassWord = password;
        systemUserModel.RoleName = roleName;
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddSystemUser,
            data: JSON.stringify(systemUserModel),
            success: (addedUser) => {
                HideLoader();
                if (addedUser !== "" || addedUser !== null) {
                    GetAllSystemUsersAjaxCall();
                    GetAllSyetemUsersCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'yeni pa Başarı ile eklendi',
                        type: 'success',
                        timer: 3000
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Beklenmeyen bir hata oluştu',
                        timer: 3000
                    });
                }
            }
        });
        $(Models.systemUser_add).modal('hide');
        $('#inp-systemUser-email').val('');
        $('#inp-systemUser-password').val('');
        $('#selectRole-systemUser-addModel').val('');
    };
});
//#endregion
// #region delete systemUser
function deleteSystemUser(email) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${email}' silenecek!`,
        text: `'${email}' silmek iseter misiniz?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil !',
        cancelButtonText: 'Hayır , silme!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "GET",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.deleteSystemUser + email,
                success: (message) => {
                    if (message ==="done" ) {
                        GetAllSystemUsersAjaxCall();
                        GetAllSyetemUsersCount();
                        Swal.fire({
                            title: 'Başarılı!',
                            text: ' Başarı ile Silendi',
                            type: 'success',
                            timer: 3000
                        });
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Beklenmeyen bir hata oluştu',
                            timer: 3000
                        });
                    }
                }

            });
        }
    });
}
//#endregion


//#region change Role
function changeRole(userId) {
    $('#systemUser-editModel .modal-body form').empty();
    $('#systemUser-editHeader').text('changing Role');
    $('#systemUser-editModel .modal-body form').append(`
      </div>  <div class="form-group">
                        <label for="recipient-name" class="col-form-label">New Role : </label>
                        <select class="form-control" id="selectRole-systemUser-editModel"></select>
                    </div>
`)

    $('#selectRole-systemUser-editModel').append(`<option  value="">...</option>`);
    RolesList.map((element) => {
        $('#selectRole-systemUser-editModel').append(`
<option  value="${element.roleName}"> ${element.roleName}</option>
`);
    });
    let match = systemUserList.filter((Element) => {
        return userId == Element.userId;
    });
    match = match[0];
    editSystemUserModel.Email = match.email;
    $('#selectRole-systemUser-editModel').val(match.roleName);
    $('#systemUser-editModel').modal('show');
}
//$(Buttons.systemUser_confirmEdit).click((event) => {
//    event.preventDefault();
//    if ($(Inputs.systemUser_stk_edit).val() === '' ||
//        $(Inputs.systemUser_sta_edit).val() === '' ||
//        $(Inputs.systemUser_type_edit).val() === ''
//    ) {
//        Swal.fire({
//            type: 'error',
//            title: 'Oops...',
//            text: 'Tüm Inputlar Doldurmanız Gerekiyor'
//        });
//    }
//    else {
//        systemUserModel.stk = $(Inputs.systemUser_stk_edit).val();
//        systemUserModel.sta = $(Inputs.systemUser_sta_edit).val();
//        systemUserModel.type = parseInt($(Inputs.systemUser_type_edit).val());
//        $.ajax({
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            url: HttpUrls.UpdatesystemUser,
//            data: JSON.stringify(systemUserModel),
//            success: (num) => {
//                HideLoader();
//                if (num !== 0) {
//                    GetAllSystemUsersAjaxCall();
//                    GetAllSystemUsersCount();
//                    Swal.fire({
//                        title: 'Başarılı!',
//                        text: 'part Number Başarı ile düzeltildi',
//                        type: 'success',
//                        timer: 1500
//                    });
//                }
//                else {
//                    Swal.fire({
//                        type: 'error',
//                        title: 'Oops...',
//                        text: 'Beklenmeyen bir hata oluştu'
//                    });
//                }
//            }
//        });
//        $(Models.systemUser_edit).modal('hide');
//        $(Inputs.systemUser_stk_edit).val('');
//        $(Inputs.systemUser_sta_edit).val('');
//        $(Inputs.systemUser_type_edit).val('');
//    }
//});
//#endregion


//#region 

function ResetUserPassword(userId) {
    $('#systemUser-editModel .modal-body form').empty();
    $('#systemUser-editHeader').text('Reset Password');
    $('#systemUser-editModel .modal-body form').append(`
      </div>  <div class="form-group">
                        <label for="recipient-name" class="col-form-label">New Password : </label>
               <input type="text" class="form-control" id="inp-systemUser-password-edit">
                    </div>
`);
    $('#selectRole-systemUser-editModel').append(`<option  value="">...</option>`);
    let match = systemUserList.filter((Element) => {
        return userId == Element.userId;
    });
    match = match[0];
    editSystemUserModel.Email = match.email;
    $('#systemUser-editModel').modal('show');
}

$('#btn-systemUser-confirmEdit').click((e) => {
    e.preventDefault();
    let edtPassword = $('#inp-systemUser-password-edit').val();
    console.log($('#selectRole-systemUser-editModel').val())
    if ($('#selectRole-systemUser-editModel').val() === undefined) {

        if (edtPassword.length === 0 || edtPassword.length < 5) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'password should be at least 5 chracter or number',
                timer: 4000
            });
        }
        else {
            editSystemUserModel.password = edtPassword;
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.ResetUserPassword,
                data: JSON.stringify(editSystemUserModel),
                success: (response) => {
                    if (response.succeeded) {
                        window.open(`${BaseUrl}`, "_self")
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: "you have  no permission to access to system",
                            timer: 3000
                        });
                    }
                }
            });
        }
    }

})
//#endregion