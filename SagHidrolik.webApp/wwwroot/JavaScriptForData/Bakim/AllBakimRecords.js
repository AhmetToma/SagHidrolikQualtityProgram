$(function () {
    let dataUrl = "Home/AllBakimRecords";
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllBakimRecordsAjaxCall();
        GetAllBakimRecordsAjaxCallCount();
    }
});
let _requestQueryForAllBakimRecords = {
    pageSize: 6,
    pageNumber: 1,
    machineNo: ""
};
let allBakimRecordsModel = {
    machineNo: "",
    machineAdi: "",
    model: "",
    bolum: "",
    uretici: "",
    yil: "",
    YetkiliServis: "",
    elec: "",
    guc: 0,
    birim: "",
    planliBakim: 0,
    aktif: 0,
    uretimMakinesi: 0,
    machineId: 0,
}
let allBakimRecordsList = [];
// #region ajaxcall ,create table ,records count  
function GetAllBakimRecordsAjaxCall() {
    _requestQueryForAllBakimRecords.machineNo = $(Inputs.allBakimRecords_searchMachineNo).val();
    ShowLoader();
    if (_requestQueryForAllBakimRecords.pageNumber === 1) {
        disableButton(PreviousButtons.allBakimRecords);
        ActiveButton(NextButtons.allBakimRecords);
    }
    else {
        ActiveButton(PreviousButtons.allBakimRecords);
        ActiveButton(NextButtons.allBakimRecords);
    }
    $(TablesId.allBakimRecords).empty();
    $(`${pageNumbers.allBakimRecords}`).text(_requestQueryForAllBakimRecords.pageNumber);

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllBakimRecords,
        data: JSON.stringify(_requestQueryForAllBakimRecords),
        success: (list) => {
            allBakimRecordsList = list;
            if (list.length !== 0) {
                console.log('allBakimRecords', list);
                allBakimRecordsList = list;
                $(`${recordsNotFound.allBakimRecords}`).css('display', 'none');

                CreateAllBakimRecordsTable(list, TablesId.allBakimRecords);
            }
            else {
                disableButton(NextButtons.allBakimRecords);
                $(`${recordsNotFound.allBakimRecords}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateAllBakimRecordsTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr>
    <td>${element.Bakim_ID ? element.Bakim_ID : ""}</td>
    <td>${element.Machine_no ? element.Machine_no : ""}</td>
    <td>${element.Tarih ? element.Tarih : ""}</td>
    <td>${element.bakimTipi ? element.bakimTipi : ""}</td>
    <td>${element.baslamaSaat ? element.baslamaSaat : ""}</td>
    <td>${element.bitisSaat ? element.bitisSaat : ""}</td>
    <td>${element.arizaTanim ? element.arizaTanim : ""}</td>
    <td>${element.yapilanIslem ? element.yapilanIslem : ""}</td>
    <td>${element.PlanlananTarih ? element.PlanlananTarih : ""}</td>
    <td>${element.planlananIslem ? element.planlananIslem : ""}</td>
    <td>${element.Tamamlanma ? element.Tamamlanma : ""}</td>
    <td>${element.planlananBakimci ? element.planlananBakimci : ""}</td>
    <td>${element.BakimTalepEden ? element.BakimTalepEden : ""}</td>
 <td><i onclick="DeleteBakimKayit(${index})" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}

function GetAllBakimRecordsAjaxCallCount() {
    $('#select-allBakimRecords-selectRowCount').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllBakimRecordsCount,
        success: (number) => {
            $('#span-allBakimRecords-rowCount').text(number);
            $('#select-allBakimRecords-selectRowCount').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);

            $('#span-allBakimRecords-rowCount').text(number);
        }
    });
}
$('#select-allBakimRecords-selectRowCount').on('change', () => {
    let selectedRowCount = $("#select-allBakimRecords-selectRowCount option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    _requestQueryForAllBakimRecords.pageSize = selectedRowCount;
    _requestQueryForAllBakimRecords.pageNumber = 1;
    GetAllBakimRecordsAjaxCall();
});
//#endregion
//#region search
$(Inputs.allBakimRecords_searchMachineNo).keyup(function () {
    _requestQueryForAllBakimRecords.pageNumber = 1;
    $(pageNumbers.allBakimRecords).text(_requestQueryForAllBakimRecords.pageNumber);
    clearTimeout(timer);
    timer = setTimeout(GetAllBakimRecordsAjaxCall, doneTypingInterval);
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.allBakimRecords).on('click', (event) => {
    event.preventDefault();
    if (_requestQueryForAllBakimRecords.pageNumber > 1) _requestQueryForAllBakimRecords.pageNumber -= 1;
    $(`${pageNumbers.allBakimRecords}`).text(_requestQueryForAllBakimRecords.pageNumber);
    GetAllBakimRecordsAjaxCall();
});
$(NextButtons.allBakimRecords).on('click', (event) => {
    event.preventDefault();
    _requestQueryForAllBakimRecords.pageNumber += 1;
    $(`${pageNumbers.allBakimRecords}`).text(_requestQueryForAllBakimRecords.pageNumber);
    GetAllBakimRecordsAjaxCall();
});
//#endregion





// #region delete allBakimRecords
function DeleteBakimKayit(index) {
    let matched;
    if (allBakimRecordsList.length > 0) {
        matched = allBakimRecordsList[index];
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `Bakim id'si olan: '${matched.Bakim_ID}' silenecek!`,
        text: `Bakim id'si olan:  '${matched.Bakim_ID}' silmek iseter misiniz?`,
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
                url: HttpUrls.DeleteFromTbleBakimKayit + matched.Bakim_ID,
                success: (message) => {
                    if (message === "done") {
                        GetAllBakimRecordsAjaxCall();
                        GetAllBakimRecordsAjaxCallCount();
                        Swal.fire({
                            title: 'Başarılı!',
                            text: ' Başarı ile Silendi',
                            type: 'success',
                            timer: 5000
                        });
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Beklenmeyen bir hata oluştu',
                            timer: 5000
                        });
                    }
                }

            });
        }
    });
}
//#endregion


////#region edit
//function EditMakine(index) {
//    let matched;
//    console.log(allBakimRecordsList.length);
//    if (allBakimRecordsList.length > 0) {
//        matched = allBakimRecordsList[index];

//        $('#allBakimRecords-edit-machineNo').val(matched.Machine_no);
//        $('#allBakimRecords-edit-machineAdi').val(matched.Machine_Name);
//        $('#allBakimRecords-edit-model').val(matched.model);
//        $('#allBakimRecords-edit-bolum').val(matched.bolum);
//        $('#allBakimRecords-edit-uretici').val(matched.Producer);
//        $('#allBakimRecords-edit-yil').val(matched.Yil);
//        $('#allBakimRecords-edit-yetkiliServis').val(matched.YetkiliServis);
//        $('#allBakimRecords-edit-elec').val(matched.elec);
//        $('#allBakimRecords-edit-guc').val(matched.guc);
//        $('#allBakimRecords-edit-planliBakim').prop('checked', matched.planliBakim);
//        $('#allBakimRecords-edit-aktif').prop('checked', matched.aktif);
//        $('#allBakimRecords-edit-uretimMakinesi').prop('checked', matched.uretimMakinesi);
//        allBakimRecordsModel.machineId = matched.Machine_Id;
//        $('#edt-MakinlerModel').modal('show');
//    }
//}
//$('#allBakimRecords-edit-confirmEdit').click((e) => {
//    let machineNo = $('#allBakimRecords-edit-machineNo').val();
//    let machineAdi = $('#allBakimRecords-edit-machineAdi').val();
//    let model = $('#allBakimRecords-edit-model').val();
//    let bolum = $('#allBakimRecords-edit-bolum').val();
//    let uretici = $('#allBakimRecords-edit-uretici').val();
//    let yil = $('#allBakimRecords-edit-yil').val();
//    let yetkiliServis = $('#allBakimRecords-edit-yetkiliServis').val();
//    let elec = $('#allBakimRecords-edit-elec').val();
//    let guc = parseInt($('#allBakimRecords-edit-guc').val());
//    let birim = $('#allBakimRecords-edit-birim').val();

//    let planliBakim = $('#allBakimRecords-edit-planliBakim').is(':checked');
//    let aktif = $('#allBakimRecords-edit-aktif').is(':checked');
//    let uretimMakinesi = $('#allBakimRecords-edit-uretimMakinesi').is(':checked');
//    if (machineNo === '' ||
//        machineAdi === '' ||
//        model === '' ||
//        bolum === ''
//    ) {
//        Swal.fire({
//            type: 'error',
//            title: 'Oops...',
//            text: 'Machine No,machine Adi, model,bolum doldurmanız gerekiyor',
//            timer: 7000
//        });
//    }
//    else {
//        allBakimRecordsModel.machineNo = machineNo;
//        allBakimRecordsModel.machineAdi = machineAdi;
//        allBakimRecordsModel.model = model;
//        allBakimRecordsModel.bolum = bolum;
//        allBakimRecordsModel.uretici = uretici;
//        allBakimRecordsModel.yil = yil;
//        allBakimRecordsModel.YetkiliServis = yetkiliServis;
//        allBakimRecordsModel.elec = elec;
//        allBakimRecordsModel.guc = guc;
//        allBakimRecordsModel.birim = birim;
//        planliBakim ? allBakimRecordsModel.planliBakim = 1 : allBakimRecordsModel.planliBakim = 0;
//        aktif ? allBakimRecordsModel.aktif = 1 : allBakimRecordsModel.aktif = 0;
//        uretimMakinesi ? allBakimRecordsModel.uretimMakinesi = 1 : allBakimRecordsModel.uretimMakinesi = 0;
//        $.ajax({
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            url: HttpUrls.UpdateMakine,
//            data: JSON.stringify(allBakimRecordsModel),
//            success: (message) => {
//                HideLoader();
//                if (message === "done") {
//                    GetAllBakimRecordsAjaxCall();
//                    GetAllBakimRecordsAjaxCallCount();
//                    Swal.fire({
//                        title: 'Başarılı!',
//                        text: 'düzeltme işlemleri başarıyla yapıldı',
//                        type: 'success',
//                        timer: 5000
//                    });
//                }

//                else {
//                    Swal.fire({
//                        type: 'error',
//                        title: 'Oops...',
//                        text: 'beklenmyen bir hata oluştu',
//                        timer: 3000
//                    });
//                }
//            }
//        });
//        $('#edt-MakinlerModel').modal('hide');
//        HideLoader();
//    };
//})
////#endregion


// #region reset 

$('#btn-allBakimRecords-reset').click(e => {
    e.preventDefault();
    _requestQueryForAllBakimRecords.pageSize = 6;
    _requestQueryForAllBakimRecords.pageNumber = 1;
    $('#select-allBakimRecords-selectRowCount').val('6');
    $(Inputs.allBakimRecords_searchMachineNo).val('');
    $('.bakimArizaCard').css('opacity', '0').fadeIn();
    $(`${pageNumbers.allBakimRecords}`).text(_requestQueryForAllBakimRecords.pageNumber);
    GetAllBakimRecordsAjaxCall();
    console.log(_requestQueryForAllBakimRecords);
})
//#endregion