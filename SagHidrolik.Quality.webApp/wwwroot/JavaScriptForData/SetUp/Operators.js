$(function () {
    let dataUrl = "Home/SetUp";
    let BakimArizaUrl = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === BakimArizaUrl || window.location.href === serverUrl) {
       GetAllOperatorsAjaxCall();
        GetAllOperatorsCount();
    }
});
let requestQueryForOpertors= {
    pageSize: 6,
    pageNumber: 1
};
let OperatorModel = {
    op_ID:0 ,
    operatorName: "",
   
};
let OperatorsList = [];
// #region ajaxcall ,create table ,records count  
function GetAllOperatorsAjaxCall() {
    if (requestQueryForOpertors.pageNumber === 1) {
        disableButton(PreviousButtons.operator);
        ActiveButton(NextButtons.operator);
    }
    else {
        ActiveButton(PreviousButtons.operator);
        ActiveButton(NextButtons.operator);
    }
    $(TablesId.operator).empty();
    $(`${pageNumbers.operator}`).text(requestQueryForOpertors.pageNumber);
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllOperators,
        data: JSON.stringify(requestQueryForOpertors),
        success: (list) => {
            OperatorsList = list;
            if (list.length !== 0) {

                $(`${recordsNotFound.operator}`).css('display', 'none');
            CreateOperatorsTable(list, TablesId.operator);
            }
            else {
                disableButton(NextButtons.operator);
                $(`${recordsNotFound.operator}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateOperatorsTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.op_ID}</td>
    <td>${element.operatorName}</td>
    <td><i onclick="editOperator(${element.op_ID})" class="fa fa-2x fa-pencil text-primary"  aria-hidden="true"></td>
 <td><i onclick="deleteOperator(${element.op_ID},'${element.operatorName}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}
function GetAllOperatorsCount() {
    $('#selectRowCount-operator').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllOperatorsCount,
        success: (number) => {
            $('#operatorTableCount').text(number);
            $('#selectRowCount-operator').append(`
<option value="4">4</option>
<option value="6" selected >6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#selectRowCount-operator').on('change', () => {
    let selectedRowCount = $("#selectRowCount-operator option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForOpertors.pageSize = selectedRowCount;
    requestQueryForOpertors.pageNumber = 1;
    GetAllOperatorsAjaxCall();
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.operator).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForOpertors.pageNumber > 1) requestQueryForOpertors.pageNumber -= 1;
    $(`${pageNumbers.operator}`).text(requestQueryForOpertors.pageNumber);
    GetAllOperatorsAjaxCall();
});
$(NextButtons.operator).on('click', (event) => {
    event.preventDefault();
    requestQueryForOpertors.pageNumber += 1;
    $(`${pageNumbers.operator}`).text(requestQueryForOpertors.pageNumber);
    GetAllOperatorsAjaxCall();
});
//#endregion


//#region Add New operator


$(Buttons.operator_Add).click((event) => {
    $(Models.operator_add).modal('show');
});
$(Buttons.operator_confirmAdd).click((event) => {
    if ($(Inputs.operator_name).val() === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500
        });
    }
    else {
        OperatorModel.operatorName = $(Inputs.operator_name).val();

        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddOperator,
            data: JSON.stringify(OperatorModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetAllOperatorsAjaxCall();
                    GetAllOperatorsCount();
                    Swal.fire({
                        type: 'success',
                        title: 'Başarılı!',
                        text: 'yeni operator Başarı ile eklendi',
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

        $(Models.operator_add).modal('hide');
        $(Inputs.operator_name).val('');
    }
});

//#endregion

// #region delete Department
function deleteOperator(operatorId,operatorName) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${operatorName}' silenecek!`,
        text: `'${operatorName}' silmek iseter misiniz?`,
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
                url: HttpUrls.DeleteOperator + operatorId,
                success: (num) => {
                    if (num !== 0) {
                        GetAllOperatorsAjaxCall();
                        GetAllOperatorsCount();
                        Swal.fire({
                            title: 'Başarılı!',
                            text: 'Operator Başarı ile Silendi',
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

function editOperator(operatorId) {
    let match = OperatorsList.filter((Element) => {
        return operatorId == Element.op_ID;
    });
    match = match[0];
    console.log(match);
    $(Models.operator_edit).modal('show');
    $(Inputs.operator_name_edt).val(match.operatorName);
    OperatorModel.op_ID = match.op_ID;
}

$(Buttons.operator_confirmEdit).click((event) => {
    event.preventDefault();
    if ($(Inputs.operator_name_edt).val() === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500

        });
    }
    else {
        OperatorModel.operatorName = $(Inputs.operator_name_edt).val();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.UpdateOperator,
            data: JSON.stringify(OperatorModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetAllOperatorsAjaxCall();
                    GetAllOperatorsCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Operator Başarı ile düzeltildi',
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
        $(Models.operator_edit).modal('hide');
        $(Inputs.operator_name_edt).val('');
    }
});
//#endregion




