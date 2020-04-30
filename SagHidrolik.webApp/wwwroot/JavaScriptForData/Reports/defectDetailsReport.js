$('#defectDetails-tab').click((e) => {
    e.preventDefault
    GetDefectDetailsReportAjaxCall();
    GedefectDetailsReportCount();
})
let requestQueryForDefectDetailsReport = {
    pageSize: 6,
    pageNumber: 1,
    year: "",
    month: "",
    Stk:"",
};

// #region ajaxcall ,create table ,records count  
function GetDefectDetailsReportAjaxCall() {
    if (requestQueryForDefectDetailsReport.pageNumber === 1) {
        disableButton(PreviousButtons.defectDetailsReport);
        ActiveButton(NextButtons.defectDetailsReport);
    }
    else {
        ActiveButton(PreviousButtons.defectDetailsReport);
        ActiveButton(NextButtons.defectDetailsReport);
    }
    $(TablesId.defectDetailsReport).empty();
    $(`${pageNumbers.defectDetailsReport}`).text(requestQueryForDefectDetailsReport.pageNumber);
    requestQueryForDefectDetailsReport.Stk = $(Inputs.defectDetailsReport_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetDefectDetails,
        data: JSON.stringify(requestQueryForDefectDetailsReport),
        success: (list) => {
            if (list.length !== 0) {
                console.log('Defect',list);
                $(`${recordsNotFound.defectDetailsReport}`).css('display', 'none');
                CreatedefectDetailsReportTable(list, TablesId.defectDetailsReport);
            }
            else {
                $(TablesId.defectDetailsReport).empty();
                disableButton(NextButtons.defectDetailsReport);
                $(`${recordsNotFound.defectDetailsReport}`).css('display', 'block');
                HideLoader();
            }
        },
        error: () => {
            alert('err');
        }
    });
}
function CreatedefectDetailsReportTable(list, tableId) {
    $(tableId).empty();
    console.log(list);
    list.map((element, index) => {
        
            $(tableId).append(`
<tr >
  <td>${element.stk}</td>
  <td>${element.finishTimeAsString}</td>
  <td>${element.okQty}</td>
  <td>${element.adet}</td>
  <td>${element.rejectName}</td>
  <td>${element.prosesAdi}</td>
             </tr>
`);

    });
    HideLoader();
}
function GedefectDetailsReportCount() {
    $('#selectRowCount-defectDetailsReport').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetDefectDetailsCount,
        success: (number) => {
            $('#defectDetailsReportTableCount').text(number);
            $('#selectRowCount-defectDetailsReport').append(`
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
$('#selectRowCount-defectDetailsReport').on('change', () => {
    let selectedRowCount = $("#selectRowCount-defectDetailsReport option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForDefectDetailsReport.pageSize = selectedRowCount;
    requestQueryForDefectDetailsReport.pageNumber = 1;
    GetDefectDetailsReportAjaxCall();
});
//year
$('#select-defectDetailsReport-year').on('change', () => {
    let selectedYear = $("#select-defectDetailsReport-year option:selected").val();
    requestQueryForDefectDetailsReport.year = selectedYear;
    requestQueryForDefectDetailsReport.pageNumber = 1;
    $(`${pageNumbers.defectDetailsReport}`).text(requestQueryForDefectDetailsReport.pageNumber);
    GetDefectDetailsReportAjaxCall();
});

//month
$('#select-defectDetailsReport-month').on('change', () => {
    let selectedMonth = $("#select-defectDetailsReport-month option:selected").val();
    requestQueryForDefectDetailsReport.month = selectedMonth;
    requestQueryForDefectDetailsReport.pageNumber = 1;
    $(`${pageNumbers.defectDetailsReport}`).text(requestQueryForDefectDetailsReport.pageNumber);
    GetDefectDetailsReportAjaxCall();
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.defectDetailsReport).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForDefectDetailsReport.pageNumber > 1) requestQueryForDefectDetailsReport.pageNumber -= 1;
    $(`${pageNumbers.defectDetailsReport}`).text(requestQueryForDefectDetailsReport.pageNumber);
    GetDefectDetailsReportAjaxCall();
});
$(NextButtons.defectDetailsReport).on('click', (event) => {
    event.preventDefault();
    requestQueryForDefectDetailsReport.pageNumber += 1;
    $(`${pageNumbers.defectDetailsReport}`).text(requestQueryForDefectDetailsReport.pageNumber);
    GetDefectDetailsReportAjaxCall();
});
//#endregion

// #region search
$(Inputs.defectDetailsReport_searchStk).keyup(function () {
    clearTimeout(timer);
        requestQueryForDefectDetailsReport.pageNumber = 1;
        $(`${pageNumbers.defectDetailsReport}`).text(requestQueryForDefectDetailsReport.pageNumber);
        timer = setTimeout(GetDefectDetailsReportAjaxCall, typingInterval);
});
//user is "finished typing," do something

// #endregion 

//#region  Reset
$('#btn-defectDetailsReport-resetSearch').click(() => {
    requestQueryForDefectDetailsReport.pageNumber = 1;
    requestQueryForDefectDetailsReport.pageSize = 6;
    requestQueryForDefectDetailsReport.year = "";
    requestQueryForDefectDetailsReport.month = "";
    requestQueryForDefectDetailsReport.Stk = "";
    $('#select-defectDetailsReport-year').val('');
    $('#select-defectDetailsReport-month').val('');
    $('#selectRowCount-defectDetailsReport').val("6");
    $(Inputs.defectDetailsReport_searchStk).val('');
    GetDefectDetailsReportAjaxCall();
})
//#endregion









