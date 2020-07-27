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
    sorumluId: 0,
    departman: "",
    bakimSorumlusu: ""
}
let bakimSorumlulariList = [];
// #region ajaxcall ,create table ,records count  
function GetAllBakimSorumlulariAjaxCall(create = true) {
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
                console.log('bakimSorumlulariList', bakimSorumlulariList);
                $(`${recordsNotFound.bakimSorumlulari}`).css('display', 'none');
                if (create)
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
    <td>${element.departman ? element.departman : ""}</td>
 <td><i onclick="EditBakimSorumlusu(${index})" class="fas fa-edit fa-2x  text-primary"  aria-hidden="true"></td>
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
    GetAllBakimSorumlulariAjaxCall(true);
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
    GetAllBakimSorumlulariAjaxCall(true);
});
$(NextButtons.bakimSorumlulari).on('click', (event) => {
    event.preventDefault();
    requestQueryForBakimSorumlu.pageNumber += 1;
    $(`${pageNumbers.bakimSorumlulari}`).text(requestQueryForBakimSorumlu.pageNumber);
    GetAllBakimSorumlulariAjaxCall(true);
});
//#endregion




//#region Add New bakimSorumlulari
$('#btn-bakimSorumlulari-addNewBakimSorumlu').click((event) => {
    $('#BakimSorumluModal').modal('show');
});
$('#btn-bakimSorumlulari-confrimAdd').click((event) => {
    let bakimSorumlusu = $('#inp-bakimSorumlulari-add-bakimSorumlusu').val();
    let departman =     $('#inp-bakimSorumlulari-add-departman').val();
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
        bakimSorumlulariModel.bakimSorumlusu = bakimSorumlusu;
        bakimSorumlulariModel.departman = departman;
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddBakimSorumlu,
            data: JSON.stringify(bakimSorumlulariModel),
            success: (message) => {
                HideLoader();
                if (message==="done") {
                    GetAllBakimSorumlulariAjaxCall(true);
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
        $('#BakimSorumluModal').modal('hide');
        $('#inp-bakimSorumlulari-add-bakimSorumlusu').val('');
        $('#inp-bakimSorumlulari-add-departman').val('');
    };
});
//#endregion
// #region delete bakimSorumlulari
function deletebakimSorumlulari(index) {
    let matched;
    if (bakimSorumlulariList.length > 0) {
        matched = bakimSorumlulariList[index];
    }
    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${matched.bakimSorumlusu}' silenecek!`,
        text: `'${matched.bakimSorumlusu}' silmek iseter misiniz?`,
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
                url: HttpUrls.DeleteBakimSorumlu + matched.sorumluId,
                success: (message) => {
                    if (message === "done") {
                        GetAllBakimSorumlulariAjaxCall();
                        GetAllBakimSorumlulariCount();
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
    console.log(bakimSorumlulariList);
    if (bakimSorumlulariList.length > 0) {
        matched = bakimSorumlulariList[index];
        $('#inp-bakimSorumlulari-edt-bakimSorumlusu').val(matched.bakimSorumlusu);
        $('#inp-bakimSorumlulari-edt-departman').val(matched.departman);
        $('#edt-BakimSorumluModal').modal('show');
        bakimSorumlulariModel.sorumluId = matched.sorumluId;
    }
}
$('#btn-bakimSorumlulari-confirmEdit').click((e) => {
    let bakimSorumlusu = $('#inp-bakimSorumlulari-edt-bakimSorumlusu').val();
    let departman = $('#inp-bakimSorumlulari-edt-departman').val();
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
        bakimSorumlulariModel.bakimSorumlusu = bakimSorumlusu;
        bakimSorumlulariModel.departman = departman;
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.EditBakimSorumlu,
            data: JSON.stringify(bakimSorumlulariModel),
            success: (message) => {
                HideLoader();
                if (message === "done") {
                    GetAllBakimSorumlulariAjaxCall(true);
                    GetAllBakimSorumlulariCount();
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
        $('#inp-bakimSorumlulari-edt-bakimSorumlusu').val('');
        $('#inp-bakimSorumlulari-edt-departman').val('');
    };
})
//#endregion