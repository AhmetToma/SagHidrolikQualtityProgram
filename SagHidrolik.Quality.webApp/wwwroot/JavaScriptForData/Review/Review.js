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
    pageNumber: 1,
    STK:"",
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
    requestQueryForReview.STK= $(Inputs.review_searchStk).val();
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
function CreateReviewTable(list, tableId,isFilter) {
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
            element.nC_Status ? status = 'fa fa-2x fa-check-circle' : status ='fa fa-2x fa-ban'
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


//#region search

let timerForReview;
let TypingIntervalForReview = 500;
$(Inputs.review_searchStk).keyup(function () {
    requestQueryForReview.pageNumber = 1;
    $(pageNumbers.review).text(requestQueryForReview.pageNumber);
    clearTimeout(timerForReview);
    timerForReview = setTimeout(GetAllReviewAjaxCall, TypingIntervalForReview);
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
    ShowLoader();
    let filtredList = [];
    $(this).siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': '#28a745', 'opacity': '1' });
    $('input[type="radio"]:not(:checked)').siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': 'black', 'opacity': '1' });

         if ($(this).val() === 'yesil') {
      
        filtredList = reviewList.filter((element) => {

            if (element.nC_Status == 1) return element;
        })

             CreateReviewTable(filtredList, TablesId.review, false);
    }
    else if ($(this).val() === 'kirmizi') {
        filtredList = reviewList.filter((element) => {
            let today = new Date();
            let lastDate = new Date(`${element.nC_TargetDate}`);
            if (lastDate < today) return element;
        });
        console.log(filtredList);
             CreateReviewTable(filtredList, TablesId.review, false);
    }


    if ($(this).val() === 'all') CreateReviewTable(reviewList, TablesId.review,true);

});


//#endregion


function openPage(ncId) {
    window.open(`/Home/ReviewDetails`, '_self');
    window.localStorage.setItem('reviewDetails', ncId);
}