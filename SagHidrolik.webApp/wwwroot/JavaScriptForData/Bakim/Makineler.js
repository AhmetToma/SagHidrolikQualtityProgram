$(function () {
    let dataUrl = "Home/Makineler";
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllMakineler();
        GetAllmakinelerCount();
    }
});
let requestQueryForMakineler = {
    pageSize: 6,
    pageNumber: 1,
    machineNo: ""
};
let makinelerModel = {
    sorumluId: 0,
    departman: "",
    bakimSorumlusu: ""
}
let makinelerList = [];
// #region ajaxcall ,create table ,records count  
function GetAllMakineler() {
    requestQueryForMakineler.machineNo = $(Inputs.makineler_searchMachineNo).val();
    ShowLoader();
    if (requestQueryForMakineler.pageNumber === 1) {
        disableButton(PreviousButtons.makineler);
        ActiveButton(NextButtons.makineler);
    }
    else {
        ActiveButton(PreviousButtons.makineler);
        ActiveButton(NextButtons.makineler);
    }
    $(TablesId.makineler).empty();
    $(`${pageNumbers.makineler}`).text(requestQueryForMakineler.pageNumber);

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllMakineler,
        data: JSON.stringify(requestQueryForMakineler),
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
 <td><i onclick="EditBakimSorumlusu(${index})" class="fas fa-edit fa-2x  text-primary"  aria-hidden="true"></td>
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
    requestQueryForMakineler.pageSize = selectedRowCount;
    requestQueryForMakineler.pageNumber = 1;
    GetAllMakineler();
});
//#endregion
//#region search
$(Inputs.makineler_searchMachineNo).keyup(function () {
    requestQueryForMakineler.pageNumber = 1;
    $(pageNumbers.makineler).text(requestQueryForMakineler.pageNumber);
    clearTimeout(timer);
    timer = setTimeout(GetAllMakineler, doneTypingInterval);
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.makineler).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForMakineler.pageNumber > 1) requestQueryForMakineler.pageNumber -= 1;
    $(`${pageNumbers.makineler}`).text(requestQueryForMakineler.pageNumber);
    GetAllMakineler();
});
$(NextButtons.makineler).on('click', (event) => {
    event.preventDefault();
    requestQueryForMakineler.pageNumber += 1;
    $(`${pageNumbers.makineler}`).text(requestQueryForMakineler.pageNumber);
    GetAllMakineler();
});
//#endregion




//#region Add New makineler
$('#btn-makineler-addNewBakimSorumlu').click((event) => {
    $('#BakimSorumluModal').modal('show');
});
$('#btn-makineler-confrimAdd').click((event) => {
    let bakimSorumlusu = $('#inp-makineler-add-bakimSorumlusu').val();
    let departman = $('#inp-makineler-add-departman').val();
    if (bakimSorumlusu === '' ||
        departman === ''
    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500
        });
    }
    else {
        makinelerModel.bakimSorumlusu = bakimSorumlusu;
        makinelerModel.departman = departman;
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddBakimSorumlu,
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
        $('#BakimSorumluModal').modal('hide');
        $('#inp-makineler-add-bakimSorumlusu').val('');
        $('#inp-makineler-add-departman').val('');
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
        title: ` machine :'${matched.Machine_Id}' silenecek!`,
        text: `'${matched.Machine_Id}' silmek iseter misiniz?`,
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
function EditBakimSorumlusu(index) {
    let matched;
    console.log(makinelerList.length);
    if (makinelerList.length > 0) {
        matched = makinelerList[index];
        $('#inp-makineler-edt-bakimSorumlusu').val(matched.bakimSorumlusu);
        $('#inp-makineler-edt-departman').val(matched.departman);
        $('#edt-BakimSorumluModal').modal('show');
        makinelerModel.sorumluId = matched.sorumluId;
    }
}
$('#btn-makineler-confirmEdit').click((e) => {
    let bakimSorumlusu = $('#inp-makineler-edt-bakimSorumlusu').val();
    let departman = $('#inp-makineler-edt-departman').val();
    if (bakimSorumlusu === '' ||
        departman === ''
    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500
        });
    }
    else {
        makinelerModel.bakimSorumlusu = bakimSorumlusu;
        makinelerModel.departman = departman;
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.EditBakimSorumlu,
            data: JSON.stringify(makinelerModel),
            success: (message) => {
                HideLoader();
                if (message === "done") {
                    GetAllMakineler(true);
                    GetAllmakinelerCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'yeni pa Başarı ile düzeltildi',
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
        $('#edt-BakimSorumluModal').modal('hide');
        $('#inp-makineler-edt-bakimSorumlusu').val('');
        $('#inp-makineler-edt-departman').val('');
    };
})
//#endregion


// #region reset 

$('#btn-makineler-reset').click(e => {
    e.preventDefault();
    requestQueryForMakineler.machineNo = "";
    requestQueryForMakineler.pageSize = 6;
    requestQueryForMakineler.pageNumber = 1;
    $('#select-makineler-selectRowCount').val(6);
    $(Inputs.makineler_searchMachineNo).val('');
    $('.bakimArizaCard').css('opacity', '0').fadeIn();
    $(`${pageNumbers.makineler}`).text(requestQueryForMakineler.pageNumber);
    GetAllMakineler();
})
//#endregion