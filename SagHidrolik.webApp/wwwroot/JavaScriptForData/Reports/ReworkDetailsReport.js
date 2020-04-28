$('#reworkDetails-tab').click((e) => {
    e.preventDefault
    GetReworkDetailsReportAjaxCall();
    GetReworkDetailsReportCount();
})
let requestQueryForReworkDetailsReport = {
    pageSize: 6,
    pageNumber: 1,
    year: "",
    month: "",
    Stk:"",
};

// #region ajaxcall ,create table ,records count  
function GetReworkDetailsReportAjaxCall() {
    if (requestQueryForReworkDetailsReport.pageNumber === 1) {
        disableButton(PreviousButtons.reworkDetailsReport);
        ActiveButton(NextButtons.reworkDetailsReport);
    }
    else {
        ActiveButton(PreviousButtons.reworkDetailsReport);
        ActiveButton(NextButtons.reworkDetailsReport);
    }
    $(TablesId.reworkDetailsReport).empty();
    $(`${pageNumbers.reworkDetailsReport}`).text(requestQueryForReworkDetailsReport.pageNumber);
    requestQueryForReworkDetailsReport.Stk = $(Inputs.reworkDetailsReport_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetReworkDetailsReport,
        data: JSON.stringify(requestQueryForReworkDetailsReport),
        success: (list) => {
            if (list.length !== 0) {
                console.log('det',list);
                $(`${recordsNotFound.reworkDetailsReport}`).css('display', 'none');
            CreatereworkDetailsReportTable(list, TablesId.reworkDetailsReport);
            }
            else {
                $(TablesId.reworkDetailsReport).empty();
                disableButton(NextButtons.reworkDetailsReport);
                $(`${recordsNotFound.reworkDetailsReport}`).css('display', 'block');
                HideLoader();
            }
        },
        error: () => {
            alert('err');
        }
    });
}
function CreatereworkDetailsReportTable(list, tableId) {
    $(tableId).empty();
    console.log(list);
    list.map((element, index) => {
            $(tableId).append(`
<tr >
  <td>${element.stk}</td>
  <td>${element.finishTimeAsString}</td>
  <td>${element.rejectName ? element.rejectName :""}</td>
  <td>${element.prosesAdi}</td>
  <td>${element.reworkQty}</td>
             </tr>
`);

    });
    HideLoader();
}
function GetReworkDetailsReportCount() {
    $('#selectRowCount-reworkDetailsReport').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetReworkDetailsReportCount,
        success: (number) => {
            $('#reworkDetailsReportTableCount').text(number);
            $('#selectRowCount-reworkDetailsReport').append(`
<option value="6" selected>6</option>
<option value="10">10</option>
<option value="20">20</option>
<option value="50">50</option>
<option value="100">100</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}

//#endregion

// #region selects


// rowCount
$('#selectRowCount-reworkDetailsReport').on('change', () => {
    let selectedRowCount = $("#selectRowCount-reworkDetailsReport option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForReworkDetailsReport.pageSize = selectedRowCount;
    requestQueryForReworkDetailsReport.pageNumber = 1;
    GetReworkDetailsReportAjaxCall();
});
//year
$('#select-reworkDetailsReport-year').on('change', () => {
    let selectedYear = $("#select-reworkDetailsReport-year option:selected").val();
    requestQueryForReworkDetailsReport.year = selectedYear;
    requestQueryForReworkDetailsReport.pageNumber = 1;
    $(`${pageNumbers.reworkDetailsReport}`).text(requestQueryForReworkDetailsReport.pageNumber);
    GetReworkDetailsReportAjaxCall();
});

//month
$('#select-reworkDetailsReport-month').on('change', () => {
    let selectedMonth = $("#select-reworkDetailsReport-month option:selected").val();
    requestQueryForReworkDetailsReport.month = selectedMonth;
    requestQueryForReworkDetailsReport.pageNumber = 1;
    $(`${pageNumbers.reworkDetailsReport}`).text(requestQueryForReworkDetailsReport.pageNumber);
    GetReworkDetailsReportAjaxCall();
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.reworkDetailsReport).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForReworkDetailsReport.pageNumber > 1) requestQueryForReworkDetailsReport.pageNumber -= 1;
    $(`${pageNumbers.reworkDetailsReport}`).text(requestQueryForReworkDetailsReport.pageNumber);
    GetReworkDetailsReportAjaxCall();
});
$(NextButtons.reworkDetailsReport).on('click', (event) => {
    event.preventDefault();
    requestQueryForReworkDetailsReport.pageNumber += 1;
    $(`${pageNumbers.reworkDetailsReport}`).text(requestQueryForReworkDetailsReport.pageNumber);
    GetReworkDetailsReportAjaxCall();
});
//#endregion

// #region search
$(Inputs.reworkDetailsReport_searchStk).keyup(function () {
    clearTimeout(timer);
        requestQueryForReworkDetailsReport.pageNumber = 1;
        $(`${pageNumbers.reworkDetailsReport}`).text(requestQueryForReworkDetailsReport.pageNumber);
    timer = setTimeout(GetReworkDetailsReportAjaxCall, typingInterval);
});
//user is "finished typing," do something

// #endregion 
//#region  Reset
$('#btn-reworkDetailsReport-resetSearch').click(() => {
    requestQueryForReworkDetailsReport.pageNumber = 1;
    requestQueryForReworkDetailsReport.pageSize = 6;
    requestQueryForReworkDetailsReport.year = "";
    requestQueryForReworkDetailsReport.month = "";
    requestQueryForReworkDetailsReport.Stk = "";
    $('#select-reworkDetailsReport-year').val('');
    $('#select-reworkDetailsReport-month').val('');
    $('#selectRowCount-reworkDetailsReport').val("6");
    GetReworkDetailsReportAjaxCall();
})
//#endregion









