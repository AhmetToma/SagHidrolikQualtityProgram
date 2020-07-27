$(function () {
    let dataUrl = "Home/Makineler";
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllMakineler();
        GetAllmakinelerCount();

        $("#makineler-add-yil").datepicker({
            dateFormat: 'yy'
        });
        $("#makineler-edit-yil").datepicker({
            dateFormat: 'yy'
        });
    }
});
let _requestQueryForMakineler = {
    pageSize: 6,
    pageNumber: 1,
    machineNo: ""
};
let makinelerModel = {

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
let makinelerList = [];
// #region ajaxcall ,create table ,records count  
function GetAllMakineler() {
    _requestQueryForMakineler.machineNo = $(Inputs.makineler_searchMachineNo).val();
    ShowLoader();
    if (_requestQueryForMakineler.pageNumber === 1) {
        disableButton(PreviousButtons.makineler);
        ActiveButton(NextButtons.makineler);
    }
    else {
        ActiveButton(PreviousButtons.makineler);
        ActiveButton(NextButtons.makineler);
    }
    $(TablesId.makineler).empty();
    $(`${pageNumbers.makineler}`).text(_requestQueryForMakineler.pageNumber);

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllMakineler,
        data: JSON.stringify(_requestQueryForMakineler),
        success: (list) => {
            makinelerList = list;
            if (list.length !== 0) {
                console.log('makineler', list);
                makinelerList = list;
                $(`${recordsNotFound.makineler}`).css('display', 'none');

                CreateMakinelerTable(list, TablesId.makineler);
            }
            else {
                disableButton(NextButtons.makineler);
                $(`${recordsNotFound.makineler}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateMakinelerTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr>
    <td>${element.Machine_no ? element.Machine_no : ""}</td>
    <td>${element.Machine_Name ? element.Machine_Name : ""}</td>
    <td>${element.model ? element.model : ""}</td>
    <td>${element.bolum ? element.bolum : ""}</td>
    <td>${element.Yil ? element.Yil : ""}</td>
    <td>${element.elec ? element.elec : ""}</td>
    <td>${element.guc ? element.guc : ""}</td>
    <td>${element.Birim ? element.Birim : ""}</td>
 <td><i onclick="EditMakine(${index})" class="fas fa-edit fa-2x  text-primary"  aria-hidden="true"></td>
 <td><i onclick="DeleteMakine(${index})" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}

function GetAllmakinelerCount() {
    $('#select-makineler-selectRowCount').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllMakinelerCount,
        success: (number) => {
            $('#span-makineler-rowCount').text(number);
            $('#select-makineler-selectRowCount').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);

            $('#span-makineler-rowCount').text(number);
        }
    });
}
$('#select-makineler-selectRowCount').on('change', () => {
    let selectedRowCount = $("#select-makineler-selectRowCount option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    _requestQueryForMakineler.pageSize = selectedRowCount;
    _requestQueryForMakineler.pageNumber = 1;
    GetAllMakineler();
});
//#endregion
//#region search
$(Inputs.makineler_searchMachineNo).keyup(function () {
    _requestQueryForMakineler.pageNumber = 1;
    $(pageNumbers.makineler).text(_requestQueryForMakineler.pageNumber);
    clearTimeout(timer);
    timer = setTimeout(GetAllMakineler, doneTypingInterval);
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.makineler).on('click', (event) => {
    event.preventDefault();
    if (_requestQueryForMakineler.pageNumber > 1) _requestQueryForMakineler.pageNumber -= 1;
    $(`${pageNumbers.makineler}`).text(_requestQueryForMakineler.pageNumber);
    GetAllMakineler();
});
$(NextButtons.makineler).on('click', (event) => {
    event.preventDefault();
    _requestQueryForMakineler.pageNumber += 1;
    $(`${pageNumbers.makineler}`).text(_requestQueryForMakineler.pageNumber);
    GetAllMakineler();
});
//#endregion




//#region Add New makineler
$('#btn-makineler-add').click((event) => {
    $([document.documentElement, document.body]).animate({
        scrollTop: $('.tamirIsEmriCard').offset().top
    }, 500);
    $('.tamirIsEmriCard').css('opacity', '1').fadeIn();
    $('#makineler-add-machineNo').val('');
    $('#makineler-add-machineAdi').val('');
    $('#makineler-add-model').val('');
    $('#makineler-add-bolum').val('');
    $('#makineler-add-uretici').val('');
    $('#makineler-add-yil').val('');
    $('#makineler-add-yetkiliServis').val('');
    $('#makineler-add-elec').val('');
    $('#makineler-add-guc').val('');
    $('#makineler-add-birim').val('');
});
$('#makineler-add-confrimAdd').click((event) => {
    let machineNo = $('#makineler-add-machineNo').val();
    let machineAdi = $('#makineler-add-machineAdi').val();
    let model = $('#makineler-add-model').val();
    let bolum = $('#makineler-add-bolum').val();
    let uretici = $('#makineler-add-uretici').val();
    let yil = $('#makineler-add-yil').val();
    let yetkiliServis = $('#makineler-add-yetkiliServis').val();
    let elec = $('#makineler-add-elec').val();
    let guc = parseInt($('#makineler-add-guc').val());
    let birim = $('#makineler-add-birim').val();

    let planliBakim = $('#makineler-add-planliBakim').is(':checked');
    let aktif = $('#makineler-add-aktif').is(':checked');
    let uretimMakinesi = $('#makineler-add-uretimMakinesi').is(':checked');
    if (machineNo === '' ||
        machineAdi === '' ||
        model === '' ||
        bolum === ''
    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Machine No,machine Adi, model,bolum doldurmanız gerekiyor',
            timer: 7000
        });
    }
    else {
        makinelerModel.machineNo = machineNo;
        makinelerModel.machineAdi = machineAdi;
        makinelerModel.model = model;
        makinelerModel.bolum = bolum;
        makinelerModel.uretici = uretici;
        makinelerModel.yil = yil;
        makinelerModel.YetkiliServis = yetkiliServis;
        makinelerModel.elec = elec;
        makinelerModel.guc = guc;
        makinelerModel.birim = birim;
        planliBakim ? makinelerModel.planliBakim = 1 : makinelerModel.planliBakim = 0;
        aktif ? makinelerModel.aktif = 1 : makinelerModel.aktif = 0;
        uretimMakinesi ? makinelerModel.uretimMakinesi = 1 : makinelerModel.uretimMakinesi = 0;
        console.log(makinelerModel);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddNewMakine,
            data: JSON.stringify(makinelerModel),
            success: (message) => {
                HideLoader();
                if (message === "done") {
                    GetAllMakineler();
                    GetAllmakinelerCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'yeni pa Başarı ile eklendi',
                        type: 'success',
                        timer: 3000
                    });
                }

                else if (message === 'exist')
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'machine no kullanılmış',
                        type: 'warning',
                        timer: 5000
                    });

                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Ayn',
                        timer: 3000
                    });
                }
            }
        });
    };
});
//#endregion

// #region delete makineler
function DeleteMakine(index) {
    let matched;
    if (makinelerList.length > 0) {
        matched = makinelerList[index];
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `machine id'si olan: '${matched.Machine_Id}' silenecek!`,
        text: `machine id'si olan:  '${matched.Machine_Id}' silmek iseter misiniz?`,
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
                url: HttpUrls.DeleteMakine + matched.Machine_Id,
                success: (message) => {
                    if (message === "done") {
                        GetAllMakineler();
                        GetAllmakinelerCount();
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


//#region edit
function EditMakine(index) {
    let matched;
    console.log(makinelerList.length);
    if (makinelerList.length > 0) {
        matched = makinelerList[index];
    
        $('#makineler-edit-machineNo').val(matched.Machine_no);
        $('#makineler-edit-machineAdi').val(matched.Machine_Name);
        $('#makineler-edit-model').val(matched.model);
        $('#makineler-edit-bolum').val(matched.bolum);
        $('#makineler-edit-uretici').val(matched.Producer);
        $('#makineler-edit-yil').val(matched.Yil);
        $('#makineler-edit-yetkiliServis').val(matched.YetkiliServis);
        $('#makineler-edit-elec').val(matched.elec);
        $('#makineler-edit-guc').val(matched.guc);
        $('#makineler-edit-planliBakim').prop('checked', matched.planliBakim);
        $('#makineler-edit-aktif').prop('checked', matched.aktif);
        $('#makineler-edit-uretimMakinesi').prop('checked', matched.uretimMakinesi);
        makinelerModel.machineId = matched.Machine_Id;
        $('#edt-MakinlerModel').modal('show');
    }
}
$('#makineler-edit-confirmEdit').click((e) => {
    let machineNo = $('#makineler-edit-machineNo').val();
    let machineAdi = $('#makineler-edit-machineAdi').val();
    let model = $('#makineler-edit-model').val();
    let bolum = $('#makineler-edit-bolum').val();
    let uretici = $('#makineler-edit-uretici').val();
    let yil = $('#makineler-edit-yil').val();
    let yetkiliServis = $('#makineler-edit-yetkiliServis').val();
    let elec = $('#makineler-edit-elec').val();
    let guc = parseInt($('#makineler-edit-guc').val());
    let birim = $('#makineler-edit-birim').val();

    let planliBakim = $('#makineler-edit-planliBakim').is(':checked');
    let aktif = $('#makineler-edit-aktif').is(':checked');
    let uretimMakinesi = $('#makineler-edit-uretimMakinesi').is(':checked');
    if (machineNo === '' ||
        machineAdi === '' ||
        model === '' ||
        bolum === ''
    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Machine No,machine Adi, model,bolum doldurmanız gerekiyor',
            timer: 7000
        });
    }
    else {
        makinelerModel.machineNo = machineNo;
        makinelerModel.machineAdi = machineAdi;
        makinelerModel.model = model;
        makinelerModel.bolum = bolum;
        makinelerModel.uretici = uretici;
        makinelerModel.yil = yil;
        makinelerModel.YetkiliServis = yetkiliServis;
        makinelerModel.elec = elec;
        makinelerModel.guc = guc;
        makinelerModel.birim = birim;
        planliBakim ? makinelerModel.planliBakim = 1 : makinelerModel.planliBakim = 0;
        aktif ? makinelerModel.aktif = 1 : makinelerModel.aktif = 0;
        uretimMakinesi ? makinelerModel.uretimMakinesi = 1 : makinelerModel.uretimMakinesi = 0;
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.UpdateMakine,
            data: JSON.stringify(makinelerModel),
            success: (message) => {
                HideLoader();
                if (message === "done") {
                    GetAllMakineler();
                    GetAllmakinelerCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'düzeltme işlemleri başarıyla yapıldı',
                        type: 'success',
                        timer: 5000
                    });
                }

                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'beklenmyen bir hata oluştu',
                        timer: 3000
                    });
                }
            }
        });
        $('#edt-MakinlerModel').modal('hide');
        HideLoader();
    };
})
//#endregion


// #region reset 

$('#btn-makineler-reset').click(e => {
    e.preventDefault();
    _requestQueryForMakineler.pageSize = 6;
    _requestQueryForMakineler.pageNumber = 1;
    $('#select-makineler-selectRowCount').val('6');
    $(Inputs.makineler_searchMachineNo).val('');
    $('.bakimArizaCard').css('opacity', '0').fadeIn();
    $(`${pageNumbers.makineler}`).text(_requestQueryForMakineler.pageNumber);
    GetAllMakineler();
    console.log(_requestQueryForMakineler);
})
//#endregion