$(function () {
    let dataUrl = "Home/SettignsProcessNew";

    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllsettingsProcessNewsAjaxCall();
        GetAllsettingsProcessNewsCount();
    }
});

let requestQueryForSettingsProcessNew = {
    pageSize: 6,
    pageNumber: 1,
    processAdi: "",
    Group: ""
};
let settingsProcessNewModel = {
    processNo: 0,
    processAdi: "",
    group: "",
    processName: "",
    processDay: 0,
    manHour: 0,
    ProcessID:0
};
let settingsProcessNewList = [];


// #region ajaxcall ,create table ,records count  
function GetAllsettingsProcessNewsAjaxCall() {
    requestQueryForSettingsProcessNew.processAdi = $(Inputs.settingsProcessNew_processAdi).val();
    ShowLoader();
    if (requestQueryForSettingsProcessNew.pageNumber === 1) {
        disableButton(PreviousButtons.settingsProcessNew);
        ActiveButton(NextButtons.settingsProcessNew);
    }
    else {
        ActiveButton(PreviousButtons.settingsProcessNew);
        ActiveButton(NextButtons.settingsProcessNew);
    }
    $(TablesId.settingsProcessNew).empty();
    $(`${pageNumbers.settingsProcessNew}`).text(requestQueryForSettingsProcessNew.pageNumber);

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcessNew,
        data: JSON.stringify(requestQueryForSettingsProcessNew),
        success: (list) => {
            console.log(list);
            settingsProcessNewList = list;
            if (list.length !== 0) {

                $(`${recordsNotFound.settingsProcessNew}`).css('display', 'none');
                CreatesettingsProcessNewsTable(list, TablesId.settingsProcessNew);
            }
            else {
                disableButton(NextButtons.settingsProcessNew);
                $(`${recordsNotFound.settingsProcessNew}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreatesettingsProcessNewsTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.processNo}</td>
    <td>${element.prosesAdi}</td>
    <td>${element.processName} </td>
    <td>${element.prosessDay} </td>
    <td>${element.manhour} </td>
    <td>${element.group} </td>
    <td><i onclick="editsettingsProcessNew(${element.processId})" class="fas fa-edit fa-2x  text-primary"  aria-hidden="true"></td>
 <td><i onclick="deletesettingsProcessNew(${element.processId},'${element.processName}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}

function GetAllsettingsProcessNewsCount() {
    $('#selectRowCount-settingsProcessNew').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcessNewCount,
        success: (number) => {
            $('#settingsProcessNewTableCount').text(number);
            $('#selectRowCount-settingsProcessNew').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#selectRowCount-settingsProcessNew').on('change', () => {
    let selectedRowCount = $("#selectRowCount-settingsProcessNew option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForSettingsProcessNew.pageSize = selectedRowCount;
    requestQueryForSettingsProcessNew.pageNumber = 1;

    GetAllsettingsProcessNewsAjaxCall();
});



$('#selectGroup-settingsProcessNew').on('change', () => {
    let selectedVal = $("#selectGroup-settingsProcessNew option:selected").val();
    requestQueryForSettingsProcessNew.pageNumber = 1;
    requestQueryForSettingsProcessNew.Group = selectedVal;
    GetAllsettingsProcessNewsAjaxCall();
});
//#endregion


//#region search

let timerForsettingsProcessNew;
$(Inputs.settingsProcessNew_processAdi).keyup(function () {
    requestQueryForSettingsProcessNew.pageNumber = 1;
    $(pageNumbers.settingsProcessNew).text(requestQueryForSettingsProcessNew.pageNumber);
    clearTimeout(timer);
    timer = setTimeout(GetAllsettingsProcessNewsAjaxCall, typingInterval);
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.settingsProcessNew).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForSettingsProcessNew.pageNumber > 1) requestQueryForSettingsProcessNew.pageNumber -= 1;
    $(`${pageNumbers.settingsProcessNew}`).text(requestQueryForSettingsProcessNew.pageNumber);
    GetAllsettingsProcessNewsAjaxCall();
});
$(NextButtons.settingsProcessNew).on('click', (event) => {
    event.preventDefault();
    requestQueryForSettingsProcessNew.pageNumber += 1;
    $(`${pageNumbers.settingsProcessNew}`).text(requestQueryForSettingsProcessNew.pageNumber);
    GetAllsettingsProcessNewsAjaxCall();
});
//#endregion




//#region Add New settingsProcessNew


$('#btn-settingsProcessNew-add').click((event) => {
    $('#settingsProcessNew-AddModel').modal('show');

});
$('#btn-settingsProcessNew-confirmAdd').click((event) => {

    let processNo = $('#inp-settingsProcessNew-processNo').val();
    let processAdi = $('#inp-settingsProcessNew-processAdi').val();
    let processName = $('#inp-settingsProcessNew-processName').val();
    let processDay = $('#inp-settingsProcessNew-processDay').val();
    let manHour = $('#inp-settingsProcessNew-manHour').val();
    let group = $('#select-settingsProcessNew-group option:selected').val();
    if (processNo === "" || processAdi === "" || processName === "" || processDay === "" || manHour === "" || group === "") {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500

        });
    }

    else if (processNo < 0 || manHour < 0 || processDay < 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'processNo,processDay,manHour değerler postive olması gerekmetedir',
            timer: 2000

        });
    }
    else {

        settingsProcessNewModel.processNo = parseInt(processNo);
        settingsProcessNewModel.processAdi = processAdi;
        settingsProcessNewModel.processName = processName;
        settingsProcessNewModel.processDay = parseInt(processDay);
        settingsProcessNewModel.manHour = parseInt(manHour);
        settingsProcessNewModel.group = group;

        console.log(settingsProcessNewModel);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddsettingsProcessNew,
            data: JSON.stringify(settingsProcessNewModel),
            success: (num) => {
                console.log('num', num);
                HideLoader();
                if (num !== 0) {
                    GetAllsettingsProcessNewsAjaxCall();
                    GetAllsettingsProcessNewsCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'yeni process  Başarı ile eklendi',
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
        $('#settingsProcessNew-AddModel').modal('hide');
        $('#inp-settingsProcessNew-processNo').val('');
        $('#inp-settingsProcessNew-processAdi').val('');
        $('#inp-settingsProcessNew-processName').val('');
        $('#inp-settingsProcessNew-processDay').val('');
        $('#inp-settingsProcessNew-manHour').val('');
        $('#select-settingsProcessNew-group').val('');
    }
});

//#endregion


// #region delete settingsProcessNew
function deletesettingsProcessNew(processId, processName) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${processName}' silenecek!`,
        text: `'${processName}' silmek iseter misiniz?`,
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
                url: HttpUrls.DeleteSettingsProcessNew + processId,
                success: (num) => {
                    if (num !== 0) {
                        GetAllsettingsProcessNewsAjaxCall();
                        GetAllsettingsProcessNewsCount();
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


//#region Edit settingsProcessNew

function editsettingsProcessNew(settingsProcessNewID) {
    let match = settingsProcessNewList.filter((Element) => {
        return settingsProcessNewID == Element.processId;
    });
    match = match[0];

    $('#settingsProcessNew-editModel').modal('show');
    settingsProcessNewModel.ProcessID = match.processId
    $('#edt-inp-settingsProcessNew-processNo').val(match.processNo);
    $('#edt-inp-settingsProcessNew-processAdi').val(match.prosesAdi);
    $('#edt-inp-settingsProcessNew-processName').val(match.processName);
    $('#edt-inp-settingsProcessNew-processDay').val(match.prosessDay);
    $('#edt-inp-settingsProcessNew-manHour').val(match.manhour);
    $('#edt-select-settingsProcessNew-group').val(match.group);
}


$('#edt-btn-settingsProcessNew-confirmEdit').click((event) => {
    event.preventDefault();


    let processNo = $('#edt-inp-settingsProcessNew-processNo').val();
    let processAdi = $('#edt-inp-settingsProcessNew-processAdi').val();
    let processName = $('#edt-inp-settingsProcessNew-processName').val();
    let processDay = $('#edt-inp-settingsProcessNew-processDay').val();
    let manHour = $('#edt-inp-settingsProcessNew-manHour').val();
    let group = $('#edt-select-settingsProcessNew-group option:selected').val();
    if (processNo === "" || processAdi === "" || processName === "" || processDay === "" || manHour === "" || group === "") {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 2000

        });
    }
    else if (processNo < 0 || manHour < 0 || processDay < 0)
    {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'processNo,processDay,manHour değerler postive olması gerekmetedir',
            timer: 2000

        });
    }
    else {

        settingsProcessNewModel.processNo = parseInt(processNo);
        settingsProcessNewModel.processAdi = processAdi;
        settingsProcessNewModel.processName = processName;
        settingsProcessNewModel.processDay = parseInt(processDay);
        settingsProcessNewModel.manHour = parseInt(manHour);
        settingsProcessNewModel.group = group;
        console.log(settingsProcessNewModel);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.EditSettingsProcessNew,
            data: JSON.stringify(settingsProcessNewModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetAllsettingsProcessNewsAjaxCall();
                   
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'process New Başarı ile düzeltildi',
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
        $('#settingsProcessNew-editModel').modal('hide');
    }
});
//#endregion




//#region  reset
$('#btn-settingsProcessNew-reset').click(() => {
    requestQueryForSettingsProcessNew.pageNumber = 1;
    requestQueryForSettingsProcessNew.pageSize = 6;
    requestQueryForSettingsProcessNew.Group = "";
    requestQueryForSettingsProcessNew.processAdi = "";
    $('#selectGroup-settingsProcessNew').val('');
    $('#selectRowCount-settingsProcessNew').val('6');
    $(Inputs.settingsProcessNew_processAdi).val('');
    GetAllsettingsProcessNewsAjaxCall();
})
//#endregion




