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
    ClaimType_a: "",
    ClaimType: ""
};
// #region ajaxcall ,create table ,records count  
function GetAllClaimAjaxCall() {
    $(TablesId.claimType).empty();
    $(`${pageNumbers.claimType}`).text(requestQueryForCalimType.pageNumber);
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllClaim,
        data: JSON.stringify(requestQueryForCalimType),
        success: (list) => {
            if (list.length !== 0) {

                $(`${recordsNotFound.claimType}`).css('display', 'none');
                CreateClaimTypeTable(list, TablesId.claimType);
            }
            else {
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
    <td><i class="fa fa-2x fa-pencil text-primary"  aria-hidden="true"></td>
 <td><i onclick="deleteClaimType(${element.claimTypeID},'${element.claimType}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}

function GetAllClaimCount() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllClaimCount,
        success: (number) => {
            $('#claimtypeTableCount').text(number);
            $('#selectRowCount-claimType').append(`
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#selectRowCount-claimType').on('change', () => {
    let selectedRowCount = $("#selectRowCount-claimType option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForCalimType.pageSize = selectedRowCount;
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
//#endregion//#region Add New Calim $(Buttons.claimType_Add).click((event) => {    $(Models.claimType_add).modal('show');
});
$(Buttons.calimType_confirmAdd).click((event) => {    if ($(Inputs.claimType_tr).val() === '' || $(Inputs.calimType_en).val() === '') {        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor'
        });
    }    else {        ShowLoader();        claimTypeModel.claimType_a = $(Inputs.claimType_tr).val();
        claimTypeModel.claimType = $(Inputs.claimType_tr).val();
        console.log(claimTypeModel);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddClaimType,
            data: JSON.stringify(claimTypeModel),
            success: (num) => {
                HideLoader();
                console.log(num);
                if (num !== 0) {
                    Swal.fire(
                        'Başarılı!',
                        'yeni claim Başarı ile eklendi',
                        'success'
                    );
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

        $(Models.claimType_add).modal('hide');
        $(Inputs.claimType_tr).val('');
        $(Inputs.calimType_en).val('');
    }});

//#endregion


// #region delete claim


function deleteClaimType(claimId, claimType) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
}
//#endregion
