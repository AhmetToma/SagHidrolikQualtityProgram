﻿$(function () {
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
    email: "",


};
let systemUserModel = {
    Email: "",
    PassWord: "",
    RoleName: ""
}
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


////#region Edit systemUser

//function editsystemUser(systemUserID) {
//    let match = systemUserList.filter((Element) => {
//        return systemUserID == Element.id;
//    });
//    match = match[0];
//    $(Models.systemUser_edit).modal('show');
//    $(Inputs.systemUser_stk_edit).val(match.stk);
//    $(Inputs.systemUser_sta_edit).val(match.sta);
//    $(Inputs.systemUser_type_edit).val(match.type);
//    systemUserModel.ID = systemUserID;
//}


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
////#endregion
