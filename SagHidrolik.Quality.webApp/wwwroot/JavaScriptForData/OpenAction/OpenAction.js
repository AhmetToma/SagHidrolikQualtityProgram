$(function () {
    let dataUrl = "Home/OpenAction";
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllOpenActionAjaxCall();
    }
});
let requestQueryForReview = {
    pageSize: 4,
    pageNumber: 1,
    STK: "",
}


// #region ajaxcall ,create table ,records count  
function GetAllOpenActionAjaxCall() {
    if (requestQueryForReview.pageNumber === 1) {
        disableButton(PreviousButtons.review);
        ActiveButton(NextButtons.review);
    }
    else {
        ActiveButton(PreviousButtons.review);
        ActiveButton(NextButtons.review);
    }
    $(TablesId.review).empty();
    $(`${pageNumbers.review}`).text(requestQueryForReview.pageNumber);
    requestQueryForReview.STK = $(Inputs.review_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllReview,
        data: JSON.stringify(requestQueryForReview),
        success: (list) => {
            //  calimTypeList = list;
            console.log(list);
            reviewList = list;
            if (list.length !== 0) {

                $(`${recordsNotFound.review}`).css('display', 'none');
                CreateReviewTable(list, TablesId.review, true);
            }
            else {
                disableButton(NextButtons.review);
                $(`${recordsNotFound.review}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateReviewTable(list, tableId, isFilter) {
    $(tableId).empty();
    let color = "";
    let stk;
    if (isFilter) {
        list.map((element, index) => {
            let today = new Date();
            let lastDate = new Date(`${element.nC_TargetDate}`);
            if (element.nC_Status == 1) color = 'greenClass';
            else if (lastDate < today) color = 'redClass';
            else color = '';
            let stk;
            let status = "";
            element.stk ? stk = element.stk : stk = "";
            element.nC_Status ? status = 'fa fa-2x fa-check-circle' : status = 'fa fa-2x fa-ban'
            $(tableId).append(`
<tr onclick='openPage(${element.nC_ID})' class="${color}">
  <td>${element.nC_ID}</td>
    <td>${element.nC_TargetDate.slice(0, -11)}</td>
    <td>${element.typeName} </td>
    <td>${element.resbonsibleName} </td>
    <td>${stk}</td>
     <td>${element.nC_OpenDate.slice(0, -11)}</td>
    <td>${element.nonConformity} </td>
    <td><i class="${status}"></i></td>
    <td>${element.companyName} </td>
    <td>${element.departmentName} </td>
             </tr>
`);
        });
    }
    else {
        list.map((element, index) => {
            element.stk ? stk = element.stk : stk = "";
            element.nC_Status ? status = 'fa fa-2x fa-check-circle' : status = 'fa fa-2x fa-ban'
            $(tableId).append(`
<tr onclick='openPage(${element.nC_ID})'  class="${color}">
  <td>${element.nC_ID}</td>
    <td>${element.nC_TargetDate.slice(0, -11)}</td>
    <td>${element.typeName} </td>
    <td>${element.resbonsibleName} </td>
    <td>${stk}</td>
     <td>${element.nC_OpenDate.slice(0, -11)}</td>
    <td>${element.nonConformity} </td>
    <td><i class="${status}"></i></td>
    <td>${element.companyName} </td>
    <td>${element.departmentName} </td>
             </tr>
`);
        });
    }
    HideLoader();
}

function GetAllReviewCount() {
    $('#selectRowCount-review').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllReviewCount,
        success: (number) => {
            $('#reviewTableCount').text(number);
            $('#selectRowCount-review').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#selectRowCount-review').on('change', () => {
    let selectedRowCount = $("#selectRowCount-review option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForReview.pageSize = selectedRowCount;
    requestQueryForReview.pageNumber = 1;
    GetAllReviewAjaxCall();
});
//#endregion