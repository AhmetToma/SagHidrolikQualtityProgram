$(function () {
    let dataUrl = "Home/OpenAction";
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllOpenActionAjaxCall();
        GetAllOpenActionCount();
    }
});
let requestQueryForOpenAction = {
    pageSize: 6,
    pageNumber: 1,
    STK: "",
}

// #region ajaxcall ,create table ,records count  
function GetAllOpenActionAjaxCall() {
    if (requestQueryForOpenAction.pageNumber === 1) {
        disableButton(PreviousButtons.openAction);
        ActiveButton(NextButtons.openAction);
    }
    else {
        ActiveButton(PreviousButtons.openAction);
        ActiveButton(NextButtons.openAction);
    }
    $(TablesId.openAction).empty();
    $(`${pageNumbers.openAction}`).text(requestQueryForOpenAction.pageNumber);
    requestQueryForOpenAction.STK = $(Inputs.openAction_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllOpenAction,
        data: JSON.stringify(requestQueryForOpenAction),
        success: (list) => {
            //  calimTypeList = list;
            console.log(list);
            reviewList = list;
            if (list.length !== 0) {

                $(`${recordsNotFound.openAction}`).css('display', 'none');
                CreateOpenActionTable(list, TablesId.openAction, true);
            }
            else {
                disableButton(NextButtons.openAction);
                $(`${recordsNotFound.openAction}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateOpenActionTable(list, tableId) {
    $(tableId).empty();
    let color = "";
    let stk;
        list.map((element, index) => {
            let today = new Date();
            let lastDate = new Date(`${element.nC_TargetDate}`);
            let status = "";
            element.stk ? stk = element.stk : stk = "";
            element.nC_Status ? status = 'fa fa-2x fa-check-circle text-danger' : status = 'fa fa-2x fa-ban text-danger'
            $(tableId).append(`
<tr onclick='openPage(${element.nC_ID})'>
  <td>${element.nC_ID}</td>
    <td>${element.nC_TargetDate.slice(0, -11)}</td>
    <td>${element.resbonsibleName} </td>
    <td>${stk}</td>
     <td>${element.nC_OpenDate.slice(0, -11)}</td>
    <td>${element.actin_Def} </td>
<td>${element.companyName} </td>
    <td>${element.departmentName} </td>
    <td><i class="${status}"></i></td>
    
             </tr>
`);
        });

    HideLoader();
}
function GetAllOpenActionCount() {
    $('#selectRowCount-review').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllOpenActionCount,
        success: (number) => {
            $('#openActionTableCount').text(number);
            $('#selectRowCount-openAction').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#selectRowCount-openAction').on('change', () => {
    let selectedRowCount = $("#selectRowCount-openAction option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForOpenAction.pageSize = selectedRowCount;
    requestQueryForOpenAction.pageNumber = 1;
    GetAllOpenActionAjaxCall();
});
//#endregion//#region search

let timerForOpenAction;
let TypingIntervalForOpenAction = 500;
$(Inputs.openAction_searchStk).keyup(function () {
    requestQueryForOpenAction.pageNumber = 1;
    $(pageNumbers.openAction).text(requestQueryForOpenAction.pageNumber);
    clearTimeout(timerForOpenAction);
    timerForOpenAction = setTimeout(GetAllOpenActionAjaxCall, TypingIntervalForOpenAction);
});
//#endregion//#region Next-Previous Hanldler
$(PreviousButtons.openAction).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForOpenAction.pageNumber > 1) requestQueryForOpenAction.pageNumber -= 1;
    $(`${pageNumbers.openAction}`).text(requestQueryForOpenAction.pageNumber);
    GetAllOpenActionAjaxCall();
});
$(NextButtons.openAction).on('click', (event) => {
    event.preventDefault();
    requestQueryForOpenAction.pageNumber += 1;
    $(`${pageNumbers.openAction}`).text(requestQueryForOpenAction.review);
    GetAllOpenActionAjaxCall();
});
//#endregion