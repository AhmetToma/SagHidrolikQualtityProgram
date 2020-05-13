$(function () {
    let dataUrl = "Home/SettignsReject";

    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllsettingsRejectsAjaxCall();
        GetAllsettingsRejectsCount();
    }
});

let requestQueryForSettingsReject = {
    pageSize: 6,
    pageNumber: 1,
    processAdi: "",
    Group: ""
};
let settingsRejectModel = {
    REject_Name: "",
    Reject_Code: "",
    Reject_ID:0,
};
let settingsRejectList = [];


// #region ajaxcall ,create table ,records count  
function GetAllsettingsRejectsAjaxCall() {
    requestQueryForSettingsReject.rejectName = $(Inputs.settingsReject_searchRejectName).val();
    ShowLoader();
    if (requestQueryForSettingsReject.pageNumber === 1) {
        disableButton(PreviousButtons.settingsReject);
        ActiveButton(NextButtons.settingsReject);
    }
    else {
        ActiveButton(PreviousButtons.settingsReject);
        ActiveButton(NextButtons.settingsReject);
    }
    $(TablesId.settingsReject).empty();
    $(`${pageNumbers.settingsReject}`).text(requestQueryForSettingsReject.pageNumber);

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetSettingsReject,
        data: JSON.stringify(requestQueryForSettingsReject),
        success: (list) => {
            console.log(list);
            settingsRejectList = list;
            if (list.length !== 0) {

                $(`${recordsNotFound.settingsReject}`).css('display', 'none');
                CreateSettingsRejectsTable(list, TablesId.settingsReject);
            }
            else {
                disableButton(NextButtons.settingsReject);
                $(`${recordsNotFound.settingsReject}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateSettingsRejectsTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.reject_ID}</td>
    <td>${element.reject_Code}</td>
    <td>${element.rEject_Name} </td>
    <td><i onclick="editsettingsReject(${element.reject_ID})" class="fas fa-edit fa-2x  text-primary"  aria-hidden="true"></td>
 <td><i onclick="deletesettingsReject(${element.reject_ID},'${element.rEject_Name}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}

function GetAllsettingsRejectsCount() {
    $('#selectRowCount-settingsReject').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetSettingsRejectCount,
        success: (number) => {
            $('#settingsRejectTableCount').text(number);
            $('#selectRowCount-settingsReject').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#selectRowCount-settingsReject').on('change', () => {
    let selectedRowCount = $("#selectRowCount-settingsReject option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForSettingsReject.pageSize = selectedRowCount;
    requestQueryForSettingsReject.pageNumber = 1;

    GetAllsettingsRejectsAjaxCall();
});



$('#selectGroup-settingsReject').on('change', () => {
    let selectedVal = $("#selectGroup-settingsReject option:selected").val();
    requestQueryForSettingsReject.pageNumber = 1;
    requestQueryForSettingsReject.Group = selectedVal;
    GetAllsettingsRejectsAjaxCall();
});
//#endregion


//#region search

let timerForsettingsReject;
$(Inputs.settingsReject_searchRejectName).keyup(function () {
    requestQueryForSettingsReject.pageNumber = 1;
    $(pageNumbers.settingsReject).text(requestQueryForSettingsReject.pageNumber);
    clearTimeout(timer);
    timer = setTimeout(GetAllsettingsRejectsAjaxCall, typingInterval);
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.settingsReject).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForSettingsReject.pageNumber > 1) requestQueryForSettingsReject.pageNumber -= 1;
    $(`${pageNumbers.settingsReject}`).text(requestQueryForSettingsReject.pageNumber);
    GetAllsettingsRejectsAjaxCall();
});
$(NextButtons.settingsReject).on('click', (event) => {
    event.preventDefault();
    requestQueryForSettingsReject.pageNumber += 1;
    $(`${pageNumbers.settingsReject}`).text(requestQueryForSettingsReject.pageNumber);
    GetAllsettingsRejectsAjaxCall();
});
//#endregion




//#region Add New settingsReject


$('#btn-settingsReject-add').click((event) => {
    $('#settingsReject-AddModel').modal('show');

});
$('#btn-settingsReject-confirmAdd').click((event) => {

    let recjetCode = $('#inp-settingsReject-recjetCode').val();
    let recjetName = $('#inp-settingsReject-recjetName').val();
    if (recjetCode === "" || recjetName === "") {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500

        });
    }
    else {


        settingsRejectModel.REject_Name = recjetName;
        settingsRejectModel.Reject_Code = recjetCode;
        console.log(settingsRejectModel);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddSettingsReject,
            data: JSON.stringify(settingsRejectModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetAllsettingsRejectsAjaxCall();
                    GetAllsettingsRejectsCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'yeni Reject  Başarı ile eklendi',
                        type: 'success',
                        timer: 2000
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Beklenmeyen bir hata oluştu',
                        timer: 2000

                    });
                }
            }
        });
        $('#settingsReject-AddModel').modal('hide');
        $('#inp-settingsReject-recjetCode').val('');
        $('#inp-settingsReject-recjetName').val('');
    }
});

//#endregion


// #region delete settingsReject
function deletesettingsReject(rejectId, rejectName) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${rejectName}' silenecek!`,
        text: `'${rejectName}' silmek iseter misiniz?`,
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
                url: HttpUrls.DeleteSettingsReject + rejectId,
                success: (num) => {
                    if (num !== 0) {
                        GetAllsettingsRejectsAjaxCall();
                        GetAllsettingsRejectsCount();
                        Swal.fire({
                            title: 'Başarılı!',
                            text: 'process Başarı ile Silendi',
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


//#region Edit settingsReject

function editsettingsReject(settingsRejectID) {
    let match = settingsRejectList.filter((Element) => {
        return settingsRejectID == Element.reject_ID;
    });
    match = match[0];

    $('#settingsReject-editModel').modal('show');
    settingsRejectModel.Reject_ID = match.reject_ID
    $('#edt-inp-settingsReject-recjetCode').val(match.reject_Code);
    $('#edt-inp-settingsReject-recjetName').val(match.rEject_Name);
}


$('#edt-btn-settingsReject-confirmEdit').click((event) => {
    event.preventDefault();


    let recjetCode = $('#edt-inp-settingsReject-recjetCode').val();
    let recjetName = $('#edt-inp-settingsReject-recjetName').val();
    if (recjetCode === "" || recjetName === "") {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500

        });
    }
    else {
            settingsRejectModel.Reject_Code = recjetCode
            settingsRejectModel.REject_Name = recjetName;
        console.log(settingsRejectModel);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.EditSettingsReject,
            data: JSON.stringify(settingsRejectModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetAllsettingsRejectsAjaxCall();
                   
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Reject  Başarı ile düzeltildi',
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
        $('#settingsReject-editModel').modal('hide');
    }
});
//#endregion




//#region  reset
$('#btn-settingsReject-reset').click(() => {
    requestQueryForSettingsReject.pageNumber = 1;
    requestQueryForSettingsReject.pageSize = 6;
    requestQueryForSettingsReject.Group = "";
    requestQueryForSettingsReject.processAdi = "";
    $('#selectGroup-settingsReject').val('');
    $('#selectRowCount-settingsReject').val('6');
    $(Inputs.settingsReject_processAdi).val('');
    GetAllsettingsRejectsAjaxCall();
})
//#endregion




