$(function () {
    let dataUrl = "Home/SetUp";
    let BakimArizaUrl = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === BakimArizaUrl || window.location.href === serverUrl) {
       GetAllCompanyAjaxCall();
       GetAllCompanyCount();
    }
});
let requestQueryForCompany = {
    pageSize: 6,
    pageNumber: 1,
    companyType:""
};
let companyModel = {
    id_Cust: 0,
    CompanyName: "",
    CompanyType: ""
};
let companyList = [];
// #region ajaxcall ,create table ,records count  
function GetAllCompanyAjaxCall() {
    if (requestQueryForCompany.pageNumber === 1) {
        disableButton(PreviousButtons.company);
        ActiveButton(NextButtons.company);
    }
    else {
        ActiveButton(PreviousButtons.company);
        ActiveButton(NextButtons.company);
    }
    $(TablesId.company).empty();
    $(`${pageNumbers.company}`).text(requestQueryForCompany.pageNumber);
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllCompany,
        data: JSON.stringify(requestQueryForCompany),
        success: (list) => {
            companyList = list;
            if (list.length !== 0) {
                $(`${recordsNotFound.company}`).css('display', 'none');
                CreateCompanyTable(list, TablesId.company);
            }
            else {
                disableButton(NextButtons.company);
                $(`${recordsNotFound.company}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateCompanyTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.id_Cust}</td>
    <td>${element.companyName}</td>
    <td>${element.companyType} </td>
    <td><i onclick="editCompany(${element.id_Cust})" class="fa fa-2x fa-pencil text-primary"  aria-hidden="true"></td>
 <td><i onclick="deleteCompany(${element.id_Cust},'${element.companyName}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}
function GetAllCompanyCount() {
    $('#selectRowCount-company').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllCompanyCount,
        success: (number) => {
            $('#compnayTableCount').text(number);
            $('#selectRowCount-company').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#selectRowCount-company').on('change', () => {
    let selectedRowCount = $("#selectRowCount-company option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForCompany.pageSize = selectedRowCount;
    requestQueryForCompany.pageNumber = 1;
    GetAllCompanyAjaxCall();
});

$('#selectCompanyType-company').on('change', () => {
    let selectedValue = $("#selectCompanyType-company option:selected").val();
    requestQueryForCompany.pageNumber = 1;
    requestQueryForCompany.companyType = selectedValue;
    GetAllCompanyAjaxCall();
});
//#endregion


//#region Next-Previous Hanldler
$(PreviousButtons.company).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForCompany.pageNumber > 1) requestQueryForCompany.pageNumber -= 1;
    $(`${pageNumbers.claimType}`).text(requestQueryForCompany.pageNumber);
    GetAllCompanyAjaxCall();
});
$(NextButtons.company).on('click', (event) => {
    event.preventDefault();
    requestQueryForCompany.pageNumber += 1;
    $(`${pageNumbers.company}`).text(requestQueryForCompany.pageNumber);
    GetAllCompanyAjaxCall();
});
//#endregion


//#region Add New Company 


$(Buttons.compnay_Add).click((event) => {
    $(Models.company_add).modal('show');
});
$(Buttons.compnay_confrim).click((event) => {
    let selectedValue = $("#select-companyType-add option:selected").val();
    if ($(Inputs.company_name).val() === '' || selectedValue === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500

        });
    }
    else {
        companyModel.CompanyName = $(Inputs.company_name).val();
        companyModel.CompanyType = selectedValue;
        console.log(companyModel);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddCompnay,
            data: JSON.stringify(companyModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetAllCompanyAjaxCall();
                    GetAllCompanyCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'yeni Company Başarı ile eklendi',
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

        $(Models.company_add).modal('hide');
        $(Inputs.company_name).val('');
        $("#select-companyType-add").val('');
    }
});

//#endregion


// #region delete Company
function deleteCompany(companyId, companyName) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${companyName}' silenecek!`,
        text: `'${companyName}' silmek iseter misiniz?`,
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
                url: HttpUrls.DeleteCompany + companyId,
                success: (num) => {
                    if (num !== 0) {
                        GetAllCompanyAjaxCall();
                        GetAllCompanyCount();
                        Swal.fire({
                            title: 'Başarılı!',
                            text: 'company Başarı ile Silendi',
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
        }


    });
}
//#endregion


// #region edit Company

//#region Edit Claim

function editCompany(companyId) {
    let match = companyList.filter((Element) => {
        return companyId == Element.id_Cust;
    });
    match = match[0];
    console.log(match);
    $(Models.company_edit).modal('show');
    $(Inputs.company_edtName).val(match.companyName);
    $('#select-companyType-edt').val(match.companyType);
    companyModel.id_Cust = companyId;
}

$(Buttons.company_confirmEdit).click((event) => {
    event.preventDefault();
    let selectedValue = $("#select-companyType-edt option:selected").val();
    if ($(Inputs.company_edtName).val() === '' || selectedValue === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500

        });
    }
    else {
        companyModel.CompanyName = $(Inputs.company_edtName).val();
        companyModel.CompanyType     = selectedValue;

        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.UpdateCompany,
            data: JSON.stringify(companyModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetAllCompanyAjaxCall();
                    GetAllCompanyCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'company Başarı ile düzeltildi',
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
        $(Models.company_edit).modal('hide');
        $(Inputs.company_edtName).val('');
        $('#select-companyType-edt').val('');
    }
});
//#endregion




//#endregion
