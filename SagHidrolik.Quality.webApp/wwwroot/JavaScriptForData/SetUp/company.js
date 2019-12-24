$(function () {
    let dataUrl = "Home/SetUp";
    let BakimArizaUrl = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === BakimArizaUrl || window.location.href === serverUrl) {
       GetAllCompanyAjaxCall();
       // GetAllCompanyCount();
    }
});
let requestQueryForCompany = {
    pageSize: 6,
    pageNumber: 1
};
let companyModel = {
    claimTypeID: 0,
    claimType_a: "",
    claimType: ""
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
                console.log(list);
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
//function GetAllCompanyCount() {
//    $('#selectRowCount-claimType').empty();
//    $.ajax({
//        type: "GET",
//        contentType: "application/json;charset=utf-8",
//        url: HttpUrls.GetAllClaimCount,
//        success: (number) => {
//            $('#claimtypeTableCount').text(number);
//            $('#selectRowCount-claimType').append(`
//<option value="4">4</option>
//<option value="6">6</option>
//<option value="8">8</option>
//<option value="10">10</option>
//                    <option value="${number}">All Records (${number})</option>
//`);
//        }
//    });
//}
//$('#selectRowCount-claimType').on('change', () => {
//    let selectedRowCount = $("#selectRowCount-claimType option:selected").val();
//    selectedRowCount = parseInt(selectedRowCount);
//    requestQueryForCalimType.pageSize = selectedRowCount;
//    requestQueryForCalimType.pageNumber = 1;
//    GetAllClaimAjaxCall();
//});
//#endregion