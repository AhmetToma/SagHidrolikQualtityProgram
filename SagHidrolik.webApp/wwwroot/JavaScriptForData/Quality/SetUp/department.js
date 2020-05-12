$(function () {
    let dataUrl = "Home/SetUp";
    let BakimArizaUrl = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === BakimArizaUrl || window.location.href === serverUrl) {
        GetAllDepartmentAjaxCall();
        GetAllDeprtmentCount();
    }
});
let requestQueryForDepartment= {
    pageSize: 6,
    pageNumber: 1
};
let DeprtmentModel = {
    depT_ID:0 ,
    department_en: "",
    department_tr:""
   
};
let departmentList = [];
// #region ajaxcall ,create table ,records count  
function GetAllDepartmentAjaxCall() {
    if (requestQueryForDepartment.pageNumber === 1) {
        disableButton(PreviousButtons.department);
        ActiveButton(NextButtons.department);
    }
    else {
        ActiveButton(PreviousButtons.department);
        ActiveButton(NextButtons.department);
    }
    $(TablesId.department).empty();
    $(`${pageNumbers.department}`).text(requestQueryForDepartment.pageNumber);
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllDepartments,
        data: JSON.stringify(requestQueryForDepartment),
        success: (list) => {
            departmentList = list;
            if (list.length !== 0) {

                $(`${recordsNotFound.department}`).css('display', 'none');
                CreateDepartmentTable(list, TablesId.department);
            }
            else {
                disableButton(NextButtons.department);
                $(`${recordsNotFound.department}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateDepartmentTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.depT_ID}</td>
    <td>${element.department_en}</td>
    <td>${element.department_tr} </td>
    <td><i onclick="editDepartment(${element.depT_ID})" class="fas fa-edit fa-2x  text-primary"  aria-hidden="true"></td>
 <td><i onclick="deleteDepartment(${element.depT_ID},'${element.department_tr}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}

function GetAllDeprtmentCount() {
    $('#selectRowCount-department').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllDepartmentCount,
        success: (number) => {
            $('#departmentTableCount').text(number);
            $('#selectRowCount-department').append(`
<option value="4">4</option>
<option value="6" selected >6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#selectRowCount-department').on('change', () => {
    let selectedRowCount = $("#selectRowCount-department option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForDepartment.pageSize = selectedRowCount;
    requestQueryForDepartment.pageNumber = 1;
    GetAllDepartmentAjaxCall();
});
//#endregion


//#region Next-Previous Hanldler
$(PreviousButtons.department).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForDepartment.pageNumber > 1) requestQueryForDepartment.pageNumber -= 1;
    $(`${pageNumbers.department}`).text(requestQueryForDepartment.pageNumber);
    GetAllDepartmentAjaxCall();
});
$(NextButtons.department).on('click', (event) => {
    event.preventDefault();
    requestQueryForDepartment.pageNumber += 1;
    $(`${pageNumbers.department}`).text(requestQueryForDepartment.pageNumber);
    GetAllDepartmentAjaxCall();
});
//#endregion


////#region Add New Department 


$(Buttons.department_Add).click((event) => {
    $(Models.department_add).modal('show');
});
$(Buttons.department_confirmAdd).click((event) => {
    if ($(Inputs.department_tr).val() === '' || $(Inputs.department_en).val() === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500
       
        });
    }
    else {
        DeprtmentModel.department_tr = $(Inputs.department_tr).val();
        DeprtmentModel.department_en = $(Inputs.department_en).val();
   
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddDepartment,
            data: JSON.stringify(DeprtmentModel),
            success: (num) => {
                HideLoader();
           
                if (num !== 0) {
                    GetAllDepartmentAjaxCall();
                    GetAllDeprtmentCount();
                    Swal.fire({
                        type: 'success',
                        title: 'Başarılı!',
                        text: 'yeni Department Başarı ile eklendi',
                        timer: 1500
                    } );
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Beklenmeyen bir hata oluştu',
                        timer: 1500
                    });
                }
            }
        });

        $(Models.department_add).modal('hide');
        $(Inputs.department_tr).val('');
        $(Inputs.department_en).val('');
    }
});

//#endregion


// #region delete Department
function deleteDepartment(deptId, department_tr) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${department_tr}' silenecek!`,
        text: `'${department_tr}' silmek iseter misiniz?`,
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
                url: HttpUrls.DeleteDepartment + deptId,
                success: (num) => {
                    if (num !== 0) {
                        GetAllDepartmentAjaxCall();
                        GetAllDeprtmentCount(); 
                        Swal.fire({
                            title: 'Başarılı!',
                            text:  'Department Başarı ile Silendi',
                            type: 'success',
                            timer: 1500

                        });
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Beklenmeyen bir hata oluştu',
                            timer: 1500
                        });
                    }
                }

            });
        }
    
    });
}
//#endregion


//#region Edit Department

function editDepartment(deptId) {
    let match = departmentList.filter((Element) => {
        return deptId == Element.depT_ID;
    });
    match = match[0];
    $(Models.department_edit).modal('show');
    $(Inputs.department_tr_edt).val(match.department_tr);
    $(Inputs.department_en_edt).val(match.department_en);
    DeprtmentModel.depT_ID = match.depT_ID;
}


$(Buttons.department_confirmEdit).click((event) => {
    event.preventDefault();
    if ($(Inputs.department_tr_edt).val() === '' || $(Inputs.department_en_edt).val() === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500

        });
    }
    else {
        DeprtmentModel.department_en = $(Inputs.department_en_edt).val();
        DeprtmentModel.department_tr = $(Inputs.department_tr_edt).val();
   
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.UpdateDepartment,
            data: JSON.stringify(DeprtmentModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetAllDepartmentAjaxCall();
                    GetAllDeprtmentCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text:'Department Başarı ile düzeltildi',
                        type: 'success',
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Beklenmeyen bir hata oluştu',
                        timer: 1500
                    });
                }
            }
        });
        $(Models.department_edit).modal('hide');
        $(Inputs.department_tr).val('');
        $(Inputs.department_en).val('');
    }
});
//#endregion
