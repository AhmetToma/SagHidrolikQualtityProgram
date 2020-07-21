$(function () {
    let dataUrl = "Home/BakimSorumlulari";
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllBakimSorumlulariAjaxCall();
        GetAllBakimSorumlulariCount();
    }
});
let requestQueryForBakimSorumlu = {
    pageSize: 6,
    pageNumber: 1,
    operatorName:""
};
let bakimSorumlulariModel = {
    Email: "",
    PassWord: "",
    RoleName: ""
}

let bakimSorumlulariList = [];
// #region ajaxcall ,create table ,records count  
function GetAllBakimSorumlulariAjaxCall() {
    requestQueryForBakimSorumlu.operatorName = $(Inputs.bakimSorumlulari_searchName).val();
    ShowLoader();
    if (requestQueryForBakimSorumlu.pageNumber === 1) {
        disableButton(PreviousButtons.bakimSorumlulari);
        ActiveButton(NextButtons.bakimSorumlulari);
    }
    else {
        ActiveButton(PreviousButtons.bakimSorumlulari);
        ActiveButton(NextButtons.bakimSorumlulari);
    }
    $(TablesId.bakimSorumlulari).empty();
    $(`${pageNumbers.bakimSorumlulari}`).text(requestQueryForBakimSorumlu.pageNumber);

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllBakimSorumlulari,
        data: JSON.stringify(requestQueryForBakimSorumlu),
        success: (list) => {
            bakimSorumlulariList = list;
            if (list.length !== 0) {
                console.log('sorumlu',list);
                $(`${recordsNotFound.bakimSorumlulari}`).css('display', 'none');
             CreateBakimSorumlulariTable(list, TablesId.bakimSorumlulari);
            }
            else {
                disableButton(NextButtons.bakimSorumlulari);
                $(`${recordsNotFound.bakimSorumlulari}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateBakimSorumlulariTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.sorumluId}</td>
    <td>${element.bakimSorumlusu}</td>
    <td>${element.departman ? element.departman :""}</td>
 <td><i onclick="deletebakimSorumlulari(${index})" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}

function GetAllBakimSorumlulariCount() {
    $('#select-bakimSorumlulari-selectRowCount').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllBakimSorumlulariCount,
        success: (number) => {
            $('#span-bakimSorumlulari-rowCount').text(number);
            $('#select-bakimSorumlulari-selectRowCount').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#select-bakimSorumlulari-selectRowCount').on('change', () => {
    let selectedRowCount = $("#select-bakimSorumlulari-selectRowCount option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForBakimSorumlu.pageSize = selectedRowCount;
    requestQueryForBakimSorumlu.pageNumber = 1;
    GetAllBakimSorumlulariAjaxCall();
});
//#endregion
//#region search
$(Inputs.bakimSorumlularis_searchEmail).keyup(function () {
    requestQueryForBakimSorumlu.pageNumber = 1;
    $(pageNumbers.bakimSorumlulari).text(requestQueryForBakimSorumlu.pageNumber);
    clearTimeout(timer);
    timer = setTimeout(GetAllBakimSorumlulariAjaxCall, doneTypingInterval);
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.bakimSorumlulari).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForBakimSorumlu.pageNumber > 1) requestQueryForBakimSorumlu.pageNumber -= 1;
    $(`${pageNumbers.bakimSorumlulari}`).text(requestQueryForBakimSorumlu.pageNumber);
    GetAllBakimSorumlulariAjaxCall();
});
$(NextButtons.bakimSorumlulari).on('click', (event) => {
    event.preventDefault();
    requestQueryForBakimSorumlu.pageNumber += 1;
    $(`${pageNumbers.bakimSorumlulari}`).text(requestQueryForBakimSorumlu.pageNumber);
    GetAllBakimSorumlulariAjaxCall();
});
//#endregion




//#region Add New bakimSorumlulari
$('#btn-bakimSorumlulari-add').click((event) => {

    $('#selectRole-bakimSorumlulari-addModel').empty();
    $('#selectRole-bakimSorumlulari-addModel').append(`<option  value="">...</option>`)
    RolesList.map((element) => {
        $('#selectRole-bakimSorumlulari-addModel').append(`
<option  value="${element.roleName}"> ${element.roleName}</option>
`);
    })
    $(Models.bakimSorumlulari_add).modal('show');
});
$('#btn-bakimSorumlulari-confirmAdd').click((event) => {
    let email = $('#inp-bakimSorumlulari-email').val();
    let password = $('#inp-bakimSorumlulari-password').val();
    let roleName = $('#selectRole-bakimSorumlulari-addModel').val();
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
        bakimSorumlulariModel.Email = email;
        bakimSorumlulariModel.PassWord = password;
        bakimSorumlulariModel.RoleName = roleName;
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddbakimSorumlulari,
            data: JSON.stringify(bakimSorumlulariModel),
            success: (addedUser) => {
                HideLoader();
                if (addedUser !== "" || addedUser !== null) {
                    GetAllBakimSorumlulariAjaxCall();
                    GetAllBakimSorumlulariCount();
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
        $(Models.bakimSorumlulari_add).modal('hide');
        $('#inp-bakimSorumlulari-email').val('');
        $('#inp-bakimSorumlulari-password').val('');
        $('#selectRole-bakimSorumlulari-addModel').val('');
    };
});
//#endregion
// #region delete bakimSorumlulari
function deletebakimSorumlulari(email) {
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
                url: HttpUrls.deletebakimSorumlulari + email,
                success: (message) => {
                    if (message === "done") {
                        GetAllBakimSorumlulariAjaxCall();
                        GetAllBakimSorumlulariCount();
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
    $('#bakimSorumlulari-editModel .modal-body form').empty();
    $('#bakimSorumlulari-editHeader').text('changing Role');
    $('#bakimSorumlulari-editModel .modal-body form').append(`
      </div>  <div class="form-group">
                        <label for="recipient-name" class="col-form-label">New Role : </label>
                        <select class="form-control" id="selectRole-bakimSorumlulari-editModel"></select>
                    </div>
`)

    $('#selectRole-bakimSorumlulari-editModel').append(`<option  value="">...</option>`);
    RolesList.map((element) => {
        $('#selectRole-bakimSorumlulari-editModel').append(`
<option  value="${element.roleName}"> ${element.roleName}</option>
`);
    });
    let match = bakimSorumlulariList.filter((Element) => {
        return userId == Element.userId;
    });
    match = match[0];
    editbakimSorumlulariModel.Email = match.email;
    $('#selectRole-bakimSorumlulari-editModel').val(match.roleName);
    $('#bakimSorumlulari-editModel').modal('show');
}



//#region  rest password

function ResetUserPassword(userId) {
    $('#bakimSorumlulari-editModel .modal-body form').empty();
    $('#bakimSorumlulari-editHeader').text('Reset Password');
    $('#bakimSorumlulari-editModel .modal-body form').append(`
      </div>  <div class="form-group">
                        <label for="recipient-name" class="col-form-label">New Password : </label>
               <input type="text" class="form-control" id="inp-bakimSorumlulari-password-edit">
                    </div>
`);
    $('#selectRole-bakimSorumlulari-editModel').append(`<option  value="">...</option>`);
    let match = bakimSorumlulariList.filter((Element) => {
        return userId == Element.userId;
    });
    match = match[0];
    editbakimSorumlulariModel.Email = match.email;
    $('#bakimSorumlulari-editModel').modal('show');
}
//#endregion


//#region confirm Update
$('#btn-bakimSorumlulari-confirmEdit').click((e) => {
    e.preventDefault();
    let edtPassword = $('#inp-bakimSorumlulari-password-edit').val();
    console.log($('#selectRole-bakimSorumlulari-editModel').val())
    if ($('#selectRole-bakimSorumlulari-editModel').val() === undefined) {

        if (edtPassword.length === 0 || edtPassword.length < 5) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'password should be at least 5 chracter or number',
                timer: 4000
            });
        }
        else {
            editbakimSorumlulariModel.password = edtPassword;
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.ResetUserPassword,
                data: JSON.stringify(editbakimSorumlulariModel),
                success: (response) => {
                    console.log(response);
                    if (response === 'done') {
                        Swal.fire({
                            type: 'success',
                            title: "password has been reset",
                            timer: 3000
                        });
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: "you have  no permission to do this function",
                            timer: 3000
                        });
                    }
                }
            });
        }
    }

    else {
        let RoleName = $('#selectRole-bakimSorumlulari-editModel').val();

        if (RoleName === "") Swal.fire({
            type: 'error',
            title: "You should select role name",
            timer: 3000
        });
        else {
            editbakimSorumlulariModel.RoleName = RoleName;
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.changeRole,
                data: JSON.stringify(editbakimSorumlulariModel),
                success: (response) => {
                    if (response === 'done') {
                        Swal.fire({
                            type: 'success',
                            title: "Role  has been changed",
                            timer: 3000
                        });
                        GetAllBakimSorumlulariAjaxCall();
                        GetAllBakimSorumlulariCount();
                        $('#bakimSorumlulari-editModel').modal('hide');
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: "you have  no permission to do this function",
                            timer: 3000
                        });
                    }
                }
            });
        }

    }
})
//#endregion