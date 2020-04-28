$(function () {
    let dataUrl = "Home/SetUp";
    let BakimArizaUrl = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === BakimArizaUrl || window.location.href === serverUrl) {
        GetAllClaimAjaxCall();
        GetAllClaimCount();
    }
});
let requestQueryForCalimType = {
    pageSize: 6,
    pageNumber: 1
};
let claimTypeModel = {
    claimTypeID: 0,
    claimType_a: "",
    claimType: ""
};
let calimTypeList = [];
// #region ajaxcall ,create table ,records count  
function GetAllClaimAjaxCall() {
    if (requestQueryForCalimType.pageNumber === 1) {
        disableButton(PreviousButtons.claimType);
        ActiveButton(NextButtons.claimType);
    }
    else {
        ActiveButton(PreviousButtons.claimType);
        ActiveButton(NextButtons.claimType);
    }
    $(TablesId.claimType).empty();
    $(`${pageNumbers.claimType}`).text(requestQueryForCalimType.pageNumber);
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllClaim,
        data: JSON.stringify(requestQueryForCalimType),
        success: (list) => {
            calimTypeList = list;
            if (list.length !== 0) {

                $(`${recordsNotFound.claimType}`).css('display', 'none');
                CreateClaimTypeTable(list, TablesId.claimType);
            }
            else {
                disableButton(NextButtons.claimType);
                $(`${recordsNotFound.claimType}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateClaimTypeTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.claimTypeID}</td>
    <td>${element.claimType_a}</td>
    <td>${element.claimType} </td>
    <td><i onclick="editClaimType(${element.claimTypeID})" class="fa fa-2x fa-pencil text-primary"  aria-hidden="true"></td>
 <td><i onclick="deleteClaimType(${element.claimTypeID},'${element.claimType}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}

function GetAllClaimCount() {
    $('#selectRowCount-claimType').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllClaimCount,
        success: (number) => {
            $('#claimTypeTableCount').text(number);
            $('#selectRowCount-claimType').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#selectRowCount-claimType').on('change', () => {
    let selectedRowCount = $("#selectRowCount-claimType option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForCalimType.pageSize = selectedRowCount;
    requestQueryForCalimType.pageNumber = 1;
    GetAllClaimAjaxCall();
});
//#endregion


//#region Next-Previous Hanldler
$(PreviousButtons.claimType).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForCalimType.pageNumber > 1) requestQueryForCalimType.pageNumber -= 1;
    $(`${pageNumbers.claimType}`).text(requestQueryForCalimType.pageNumber);
    GetAllClaimAjaxCall();
});
$(NextButtons.claimType).on('click', (event) => {
    event.preventDefault();
    requestQueryForCalimType.pageNumber += 1;
    $(`${pageNumbers.claimType}`).text(requestQueryForCalimType.pageNumber);
    GetAllClaimAjaxCall();
});
//#endregion


//#region Add New Calim 


$(Buttons.claimType_Add).click((event) => {
    $(Models.claimType_add).modal('show');
});
$(Buttons.calimType_confirmAdd).click((event) => {
    if ($(Inputs.claimType_tr).val() === '' || $(Inputs.calimType_en).val() === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500

        });
    }
    else {
        claimTypeModel.claimType_a = $(Inputs.claimType_tr).val();
        claimTypeModel.claimType = $(Inputs.calimType_en).val();
   
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddClaimType,
            data: JSON.stringify(claimTypeModel),
            success: (num) => {
                HideLoader();
           
                if (num !== 0) {
                    GetAllClaimAjaxCall();
                    GetAllClaimCount();
                    Swal.fire({
                        title:'Başarılı!',
                        text: 'yeni claim Başarı ile eklendi',
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

        $(Models.claimType_add).modal('hide');
        $(Inputs.claimType_tr).val('');
        $(Inputs.calimType_en).val('');
    }
});

//#endregion


// #region delete claim
function deleteClaimType(claimId, claimType) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${claimType}' silenecek!`,
        text: `'${claimType}' silmek iseter misiniz?`,
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
                url: HttpUrls.DeleteClaimType + claimId,
                success: (num) => {
                    if (num !== 0) {
                        GetAllClaimAjaxCall();
                        GetAllClaimCount();
                        Swal.fire({
                            title: 'Başarılı!',
                            text: 'claim Başarı ile Silendi',
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


//#region Edit Claim

function editClaimType(claimID) {
    let match = calimTypeList.filter((Element) => {
        return claimID == Element.claimTypeID;
    });
    match = match[0];
    $(Models.claimType_edit).modal('show');
    $(Inputs.calimType_en_edt).val(match.claimType);
    $(Inputs.claimType_tr_edt).val(match.claimType_a);
    claimTypeModel.claimTypeID = match.claimTypeID;


}


$(Buttons.calimType_confirmEdit).click((event) => {
    event.preventDefault();
    if ($(Inputs.claimType_tr_edt).val() === '' || $(Inputs.calimType_en_edt).val() === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor'
        });
    }
    else {
        claimTypeModel.claimType_a = $(Inputs.claimType_tr_edt).val();
        claimTypeModel.claimType = $(Inputs.calimType_en_edt).val();
   
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.UpdateClaimType,
            data: JSON.stringify(claimTypeModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetAllClaimAjaxCall();
                    GetAllClaimCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'claim Başarı ile düzeltildi',
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
        $(Models.claimType_edit).modal('hide');
        $(Inputs.claimType_tr_edt).val('');
        $(Inputs.calimType_en_edt).val('');
    }
});
//#endregion
