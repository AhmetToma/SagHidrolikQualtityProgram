$(function () {


    let dataUrl = "Home/Review";
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllReviewAjaxCall();
        GetAllReviewCount();
    }
});
let requestQueryForReview = {
    pageSize: 4,
    pageNumber:1
}
let reviewList = [];
// #region ajaxcall ,create table ,records count  
function GetAllReviewAjaxCall() {
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
                CreateReviewTable(list, TablesId.review);
            }
            else {
                disableButton(NextButtons.review);
                $(`${recordsNotFound.review}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateReviewTable(list, tableId) {
    $(tableId).empty();
    let color = "";
    list.map((element, index) => {
        let today = new Date();
        let lastDate = new Date(`${element.nC_TargetDate}`);
        if (element.nC_Status == 1) color = 'greenClass';
        else if (lastDate < today) color = 'redClass';
        else color = '';
        let partNo;
        element.partNo ? partNo = element.partNo : partNo = "";
        $(tableId).append(`
<tr class="${color}">
  <td>${element.nC_ID}</td>
    <td>${element.nC_TargetDate.slice(0,-11)}</td>
    <td>${element.typeName} </td>
    <td>${element.operatorName} </td>
    <td>${partNo}</td>
     <td>${element.nC_OpenDate.slice(0, -11)}</td>
    <td>${element.nonConformity} </td>
    <td>${element.nC_Status} </td>
    <td>${element.companyName} </td>
    <td>${element.departmentName} </td>
             </tr>
`);
    });
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


//#region Next-Previous Hanldler
$(PreviousButtons.review).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForReview.pageNumber > 1) requestQueryForReview.pageNumber -= 1;
    $(`${pageNumbers.review}`).text(requestQueryForReview.pageNumber);
    GetAllReviewAjaxCall();
});
$(NextButtons.review).on('click', (event) => {
    event.preventDefault();
    requestQueryForReview.pageNumber += 1;
    $(`${pageNumbers.review}`).text(requestQueryForReview.review);
    GetAllReviewAjaxCall();
});
//#endregion


//#region radio button Handler

$('input[type=radio][name=colorRadio]').change(function () {
    let filtredList = [];
    $(this).siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': '#28a745', 'opacity': '1' });
    $('input[type="radio"]:not(:checked)').siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': 'black', 'opacity': '1' });

         if ($(this).val() === 'yesil') {
        ShowLoader();
        filtredList = reviewList.filter((element) => {

            if (element.nC_Status == 1) return element;
        })
        console.log(filtredList);
        CreateReviewTable(filtredList, TablesId.review);
    }
    else if ($(this).val() === 'kirmizi') {
        ShowLoader();
        filtredList = reviewList.filter((element) => {
            let today = new Date();
            let lastDate = new Date(`${element.nC_TargetDate}`);
            if (lastDate < today) return element;
        });
        console.log(filtredList);
        CreateReviewTable(filtredList, TablesId.review);
    }



    if ($(this).val() === 'all') CreateReviewTable(reviewList, TablesId.review);

});
//#endregion
