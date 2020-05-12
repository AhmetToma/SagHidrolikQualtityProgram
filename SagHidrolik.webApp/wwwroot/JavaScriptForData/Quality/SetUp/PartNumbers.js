$(function () {
    let dataUrl = "Home/SetUp";
  
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllPartNumbersAjaxCall();
        GetAllPartNumbersCount();
    }
});

let requestQueryForPartNumbers = {
    pageSize: 6,
    pageNumber: 1,
    Stk:"",
};
let partNumberModel = {
    ID: 0,
    stk: "",
    sta: "",
    type:0
};
let partNumberList = [];


// #region ajaxcall ,create table ,records count  
function GetAllPartNumbersAjaxCall() {
    requestQueryForPartNumbers.Stk=$(Inputs.partNumber_searchStk).val();
    ShowLoader();
    if (requestQueryForPartNumbers.pageNumber === 1) {
        disableButton(PreviousButtons.partNumber);
        ActiveButton(NextButtons.partNumber);
    }
    else {
        ActiveButton(PreviousButtons.partNumber);
        ActiveButton(NextButtons.partNumber);
    }
    $(TablesId.partNumber).empty();
    $(`${pageNumbers.partNumber}`).text(requestQueryForPartNumbers.pageNumber);
   
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllPartNumbers,
        data: JSON.stringify(requestQueryForPartNumbers),
        success: (list) => {
            console.log(list);
            partNumberList = list;
            if (list.length !== 0) {

                $(`${recordsNotFound.partNumber}`).css('display', 'none');
               CreatePartNumbersTable(list, TablesId.partNumber);
            }
            else {
                disableButton(NextButtons.partNumber);
                $(`${recordsNotFound.partNumber}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreatePartNumbersTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.stk}</td>
    <td>${element.sta}</td>
    <td>${element.type} </td>
    <td><i onclick="editPartNumber(${element.id})" class="fas fa-edit fa-2x  text-primary"  aria-hidden="true"></td>
 <td><i onclick="deletePartNumber(${element.id},'${element.stk}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}

function GetAllPartNumbersCount() {
    $('#selectRowCount-partNumber').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllPartNumbersCount,
        success: (number) => {
            $('#partNumberTableCount').text(number);
            $('#selectRowCount-partNumber').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#selectRowCount-partNumber').on('change', () => {
    let selectedRowCount = $("#selectRowCount-partNumber option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForPartNumbers.pageSize = selectedRowCount;
    requestQueryForPartNumbers.pageNumber = 1;

    GetAllPartNumbersAjaxCall();
});
//#endregion


//#region search

let timerForPartNumber;
let TypingIntervalForPartNumber = 500;
$(Inputs.partNumber_searchStk).keyup(function () {
    requestQueryForPartNumbers.pageNumber = 1;
    $(pageNumbers.partNumber).text(requestQueryForPartNumbers.pageNumber);
    clearTimeout(timerForPartNumber);
    timerForPartNumber = setTimeout(GetAllPartNumbersAjaxCall, TypingIntervalForPartNumber);
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.partNumber).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForPartNumbers.pageNumber > 1) requestQueryForPartNumbers.pageNumber -= 1;
    $(`${pageNumbers.partNumber}`).text(requestQueryForPartNumbers.pageNumber);
    GetAllPartNumbersAjaxCall();
});
$(NextButtons.partNumber).on('click', (event) => {
    event.preventDefault();
    requestQueryForPartNumbers.pageNumber += 1;
    $(`${pageNumbers.partNumber}`).text(requestQueryForPartNumbers.pageNumber);
    GetAllPartNumbersAjaxCall();
});
//#endregion




//#region Add New partNumber


$(Buttons.partNumber_Add).click((event) => {
    $(Models.partNumber_add).modal('show');
});
$(Buttons.partNumber_confirmAdd).click((event) => {
    if ($(Inputs.partNumber_stk).val() === '' ||
        $(Inputs.partNumber_sta).val() === '' ||
        $(Inputs.partNumber_type).val() === ''

    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500

        });
    }
    else {

        partNumberModel.stk = $(Inputs.partNumber_stk).val();
        partNumberModel.sta = $(Inputs.partNumber_sta).val();
        partNumberModel.type = parseInt($(Inputs.partNumber_type).val());

        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddPartNumber,
            data: JSON.stringify(partNumberModel),
            success: (num) => {
                HideLoader();

                if (num !== 0) {
                    GetAllPartNumbersAjaxCall();
                    GetAllPartNumbersCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'yeni part Number Başarı ile eklendi',
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

        $(Models.partNumber_add).modal('hide');
        $(Inputs.partNumber_stk).val('');
        $(Inputs.partNumber_sta).val('');
        $(Inputs.partNumber_type).val('');

    
    }
});

//#endregion


// #region delete partNumber
function deletePartNumber(ID, STK) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${STK}' silenecek!`,
        text: `'${STK}' silmek iseter misiniz?`,
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
                url: HttpUrls.DeletePartNumber + ID,
                success: (num) => {
                    if (num !== 0) {
                        GetAllPartNumbersAjaxCall();
                        GetAllPartNumbersCount();
                        Swal.fire({
                            title: 'Başarılı!',
                            text: 'part Number Başarı ile Silendi',
                            type: 'success',
                            timer: 1500
                        });
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Beklenmeyen bir hata oluştu'
                        });
                    }
                }

            });
        }


    });
}
//#endregion


//#region Edit partNumber

function editPartNumber(partNumberID) {
    let match = partNumberList.filter((Element) => {
        return partNumberID == Element.id;
    });
    match = match[0];

    $(Models.partNumber_edit).modal('show');
    $(Inputs.partNumber_stk_edit).val(match.stk);
    $(Inputs.partNumber_sta_edit).val(match.sta);
    $(Inputs.partNumber_type_edit).val(match.type);
    partNumberModel.ID = partNumberID;

}


$(Buttons.partNumber_confirmEdit).click((event) => {
    event.preventDefault();
    if ($(Inputs.partNumber_stk_edit).val() === '' ||
        $(Inputs.partNumber_sta_edit).val() === '' ||
        $(Inputs.partNumber_type_edit).val() === ''

    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor'
        });
    }
    else {
        partNumberModel.stk = $(Inputs.partNumber_stk_edit).val();
        partNumberModel.sta = $(Inputs.partNumber_sta_edit).val();
        partNumberModel.type = parseInt($(Inputs.partNumber_type_edit).val());


        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.UpdatePartNumber,
            data: JSON.stringify(partNumberModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetAllPartNumbersAjaxCall();
                    GetAllPartNumbersCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'part Number Başarı ile düzeltildi',
                        type: 'success',
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Beklenmeyen bir hata oluştu'
                    });
                }
            }
        });
        $(Models.partNumber_edit).modal('hide');
        $(Inputs.partNumber_stk_edit).val('');
        $(Inputs.partNumber_sta_edit).val('');
        $(Inputs.partNumber_type_edit).val('');
    }
});
//#endregion







