﻿$(function () {
    let dataUrl = "Home/SettignsOperator";

    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetSettingsOperatorAjaxCall();
        GetAllsettingsOperatorsCount();
        $('#inp-settingsOperator-girisTarihi').datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $('#edt-inp-settingsOperator-girisTarihi').datepicker({
            dateFormat: 'dd/mm/yy'
        });
    }
});

let requestQueryForSettingOperator = {
    pageSize: 6,
    pageNumber: 1,
    operatorName:""
};
let settingsOperatorModel = {
    Operator_ID: 0,
    Operator_Name: "",
    Bolum: "",
    GirisTarihi: "",
    Aktif:""
};
let settingsOperatorList = [];


// #region ajaxcall ,create table ,records count  
function GetSettingsOperatorAjaxCall() {
    $(TablesId.settingsOperatorPolivalance).empty();
    requestQueryForSettingOperator.operatorName = $(Inputs.settingsOperator_searchOperatorName).val();
    ShowLoader();
    if (requestQueryForSettingOperator.pageNumber === 1) {
        disableButton(PreviousButtons.settingsOperator);
        ActiveButton(NextButtons.settingsOperator);
    }
    else {
        ActiveButton(PreviousButtons.settingsOperator);
        ActiveButton(NextButtons.settingsOperator);
    }
    $(TablesId.settingsOperator).empty();
    $(`${pageNumbers.settingsOperator}`).text(requestQueryForSettingOperator.pageNumber);

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetSettingsOperator,
        data: JSON.stringify(requestQueryForSettingOperator),
        success: (list) => {
            console.log(list);
            settingsOperatorList = list;
            if (list.length !== 0) {

                $(`${recordsNotFound.settingsOperator}`).css('display', 'none');
              CreateSettingsOperatorsTable(list, TablesId.settingsOperator);
            }
            else {
                disableButton(NextButtons.settingsOperator);
                $(`${recordsNotFound.settingsOperator}`).css('display', 'block');
                $(`${recordsNotFound.settingsOperator} h3 `).text('Hiç bir kayıt bulunmamaktadır');
                HideLoader();
            }
        }
    });
}
function CreateSettingsOperatorsTable(list, tableId) {
    let status = "";
    $(tableId).empty();
    list.map((element, index) => {
        element.aktif === "True"? status = 'fa  fa-2x fa-check-circle text-success' : status = 'fa fa-2x fa-ban text-warning';
        $(tableId).append(`
<tr id="${element.operator_ID}" >
  <td>${element.operator_ID}</td>
    <td>${element.operator_Name}</td>
    <td>${element.bolum} </td>
    <td>${element.girisTarihi ? element.girisTarihi:""} </td >
    <td><i class="${status}"></i> </td>
    <td><i onclick="editsettingsOperator(${element.operator_ID})" class="fas fa-edit fa-2x  text-primary"  aria-hidden="true"></td>
 <td><i onclick="deletesettingsOperator(${element.operator_ID},'${element.operator_Name}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}

function GetAllsettingsOperatorsCount() {
    $('#selectRowCount-settingsOperator').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetSettingsOperatorCount,
        success: (number) => {
            $('#settingsOperatorTableCount').text(number);
            $('#selectRowCount-settingsOperator').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
            $('#span-settingOperator-rowCount').text(number);
        }
    });

}
$('#selectRowCount-settingsOperator').on('change', () => {
    let selectedRowCount = $("#selectRowCount-settingsOperator option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForSettingOperator.pageSize = selectedRowCount;
    requestQueryForSettingOperator.pageNumber = 1;

    GetSettingsOperatorAjaxCall();
});




//#endregion


//#region OperatorPolivalance
//SelectRow 
$(TablesId.settingsOperator).on('click', 'tr', function () {
    let operatorId = $(this).attr('id');
    GetOperatorPolivalance(operatorId);
});


function GetOperatorPolivalance(operatorId) {
    $(TablesId.settingsOperatorPolivalance).empty();
    $.getJSON(HttpUrls.GetSettingsOperatorPolivalance + operatorId, (list) => {

        if (list.length !== 0) {
            $(`${recordsNotFound.settingsOperatorPolivalance}`).css('display', 'none');
            list.map((element) => {
                let levelDescription = GetLevelDescription(element.level);
                $(TablesId.settingsOperatorPolivalance).append(`

<tr>
<td>${element.processNo}</td>
<td>${element.processName}</td>
<td>${element.level}</td>
<td>${levelDescription}</td>
</tr>
`)
            })
        }
        else {
            $(`${recordsNotFound.settingsOperatorPolivalance}`).css('display', 'block');
            $(`${recordsNotFound.settingsOperatorPolivalance} h3 `).text('Hiç bir kayıt bulunmamaktadır');
            HideLoader();
        }
    })
}

function GetLevelDescription(levelId) {
    switch (levelId) {

        case 1: return "Temel Beceriler / Destek ve kontrol gerekli";
        case 2: return "Önemli bir kontrol olmaksızın yapabilir";
        case 3: return "Proses için yeterli / ek kontrol gerekmez";
        case 4: return "Çalışma alanındaki diğer çalışanlara eğitim verebilir/ süreç iyileştirmelerinin uygulayabilir";
        default: return "----";
    }
}
//#endregion
//#region search

let timerForsettingsOperator;
$(Inputs.settingsOperator_searchOperatorName).keyup(function () {
    requestQueryForSettingOperator.pageNumber = 1;
    $(pageNumbers.settingsOperator).text(requestQueryForSettingOperator.pageNumber);
    clearTimeout(timer);
    timer = setTimeout(GetSettingsOperatorAjaxCall, typingInterval);
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.settingsOperator).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForSettingOperator.pageNumber > 1) requestQueryForSettingOperator.pageNumber -= 1;
    $(`${pageNumbers.settingsOperator}`).text(requestQueryForSettingOperator.pageNumber);
    GetSettingsOperatorAjaxCall();
});
$(NextButtons.settingsOperator).on('click', (event) => {
    event.preventDefault();
    requestQueryForSettingOperator.pageNumber += 1;
    $(`${pageNumbers.settingsOperator}`).text(requestQueryForSettingOperator.pageNumber);
    GetSettingsOperatorAjaxCall();
});
//#endregion




//#region Add New settingsOperator


$('#btn-settingsOperator-addNewOperator').click((event) => {
    $('#settingsOperator-AddModel').modal('show');

});
$('#btn-settingsOperator-confirmAdd').click((event) => {

    let operatorName = $('#inp-settingsOperator-operatorName').val();
    let bolum = $('#inp-settingsOperator-bolum').val();
    let girisTarihi = $('#inp-settingsOperator-girisTarihi').val();
    let aktif = "";
    $('#inp-settingsOperator-aktif').prop('checked') ? aktif = "1" : aktif = "0";

    if (operatorName === "" || bolum === "" || girisTarihi === "") {
        Swal.fire({
         type: 'error',
          title: 'Oops...',
         text: 'Tüm Inputlar Doldurmanız Gerekiyor',
         timer: 1500

    });
    }
    else {

        settingsOperatorModel.Operator_Name = operatorName;
        settingsOperatorModel.Bolum = bolum;
        settingsOperatorModel.GirisTarihi = girisTarihi;
        settingsOperatorModel.Aktif = aktif;
        console.log(settingsOperatorModel);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddToSettingOperator,
            data: JSON.stringify(settingsOperatorModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetSettingsOperatorAjaxCall();
                    GetAllsettingsOperatorsCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'yeni operator  Başarı ile eklendi',
                        type: 'success',
                        timer: 2000
                    });
                    $('#settingsOperator-AddModel').modal('hide');
                    $('#inp-settingsOperator-operatorName').val('');
                    $('#inp-settingsOperator-bolum').val('');
                    $('#inp-settingsOperator-girisTarihi').val('');
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Beklenmeyen bir hata oluştu',
                        timer: 2000

                    });
                }
                $('#settingsOperator-AddModel').modal('hide');
                $('#inp-settingsOperator-operatorName').val('');
                $('#inp-settingsOperator-bolum').val('');
                $('#inp-settingsOperator-girisTarihi').val('');
            }
        });
        
    }
});

//#endregion


// #region delete settingsOperator
function deletesettingsOperator(operatorId, operatorName) {
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
                url: HttpUrls.DeleteSettingOperator + operatorId,
                success: (num) => {
                    if (num !== 0) {
                        GetSettingsOperatorAjaxCall();
                        GetAllsettingsOperatorsCount();
                        Swal.fire({
                            title: 'Başarılı!',
                            text: 'operator Başarı ile Silendi',
                            type: 'success',
                            timer: 2000
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


//#region Edit settingsOperator

function editsettingsOperator(settingsOperatorID) {
    let match = settingsOperatorList.filter((Element) => {
        return settingsOperatorID == Element.operator_ID;
    });
    match = match[0];

    $('#settingsOperator-editModel').modal('show');
    settingsOperatorModel.Operator_ID = match.operator_ID;

    $('#edt-inp-settingsOperator-operatorName').val(match.operator_Name);
    $('#edt-inp-settingsOperator-bolum').val(match.bolum);
    $('#edt-inp-settingsOperator-girisTarihi').val(match.girisTarihi);
    console.log(match);
    match.aktif === "True" ? $('#edt-inp-settingsOperator-aktif').prop('checked', true) : $('#edt-inp-settingsOperator-aktif').prop('checked', false);

}


$('#edt-btn-settingsOperator-confirmEdit').click((event) => {
    event.preventDefault();


    let operatorName = $('#edt-inp-settingsOperator-operatorName').val();
    let bolum = $('#edt-inp-settingsOperator-bolum').val();
    let girisTarihi = $('#edt-inp-settingsOperator-girisTarihi').val();
    let aktif = "";
    $('#edt-inp-settingsOperator-aktif').prop('checked') ? aktif = "1" : aktif = "0";

    if (operatorName === "" || bolum === "" || girisTarihi === "") {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500

        });
    }

    else {
        settingsOperatorModel.Operator_Name = operatorName;
        settingsOperatorModel.Bolum = bolum;
        settingsOperatorModel.GirisTarihi = girisTarihi;
        settingsOperatorModel.Aktif = aktif;
        console.log(settingsOperatorModel);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.EditSettingsOperator,
            data: JSON.stringify(settingsOperatorModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetSettingsOperatorAjaxCall();

                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'operator  Başarı ile düzeltildi',
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
        $('#settingsOperator-editModel').modal('hide');
    }
});
//#endregion




//#region  reset
$('#btn-settingsOperator-reset').click(() => {
    requestQueryForSettingOperator.pageNumber = 1;
    requestQueryForSettingOperator.pageSize = 6;
    requestQueryForSettingOperator.Group = "";
    requestQueryForSettingOperator.processAdi = "";
    $('#selectRowCount-settingsOperator').val('6');
    $(Inputs.settingsOperator_searchOperatorName).val('');
    GetSettingsOperatorAjaxCall();
})
//#endregion




