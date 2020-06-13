$('#productionDetails-tab').click((e) => {
    e.preventDefault
    GetProductionDetailsReportAjaxCall();
    GetproductionDetailsReportCount();

})
let requestQueryForProductionDetailsReport = {
    pageSize: 6,
    pageNumber: 1,
    year: "",
    month: "",
    Stk: "",
};

// #region ajaxcall ,create table ,records count  
function GetProductionDetailsReportAjaxCall() {
    if (requestQueryForProductionDetailsReport.pageNumber === 1) {
        disableButton(PreviousButtons.productionDetailsReport);
        ActiveButton(NextButtons.productionDetailsReport);
    }
    else {
        ActiveButton(PreviousButtons.productionDetailsReport);
        ActiveButton(NextButtons.productionDetailsReport);
    }
    $(TablesId.productionDetailsReport).empty();
    $(`${pageNumbers.productionDetailsReport}`).text(requestQueryForProductionDetailsReport.pageNumber);
    requestQueryForProductionDetailsReport.Stk = $(Inputs.productionDetailsReport_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcutionDetailsReport,
        data: JSON.stringify(requestQueryForProductionDetailsReport),
        success: (list) => {
            if (list.length !== 0) {
                console.log('proDet', list);
                $(`${recordsNotFound.productionDetailsReport}`).css('display', 'none');
                 CreateProductionDetailsReportTable(list, TablesId.productionDetailsReport);
            }
            else {
                $(TablesId.productionDetailsReport).empty();
                disableButton(NextButtons.productionDetailsReport);
                $(`${recordsNotFound.productionDetailsReport}`).css('display', 'block');
                HideLoader();
            }
        },
        error: (er) => {
            console.log(er);
        }
    });
}
function CreateProductionDetailsReportTable(list, tableId) {
    $(tableId).empty();
    console.log(list);
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.stk}</td>
  <td>${element.finishTime}</td>
  <td>${element.prosesAdi}</td>
  <td>${element.total}</td>
  <td>${element.prosesAdi}</td>
  <td>${element.startTime}</td>
  <td>${element.finishTimeWithHour}</td>
  <td>${element.machine}</td>
             </tr>
`);

    });
    HideLoader();
}
function GetproductionDetailsReportCount() {
    $('#selectRowCount-productionDetailsReport').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcutionDetailsReportCount,
        success: (number) => {
            $('#productionDetailsReportTableCount').text(number);
            $('#selectRowCount-productionDetailsReport').append(`
<option value="6" selected>6</option>
<option value="10">10</option>
<option value="20">20</option>
<option value="50">50</option>
<option value="100">100</option>
<option value="1000">1000</option>
                  
`);
        }
    });
}

//#endregion

// #region selects


// rowCount
$('#selectRowCount-productionDetailsReport').on('change', () => {
    let selectedRowCount = $("#selectRowCount-productionDetailsReport option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForProductionDetailsReport.pageSize = selectedRowCount;
    requestQueryForProductionDetailsReport.pageNumber = 1;
    GetProductionDetailsReportAjaxCall();
});
//year
$('#select-productionDetailsReport-year').on('change', () => {
    let selectedYear = $("#select-productionDetailsReport-year option:selected").val();
    requestQueryForProductionDetailsReport.year = selectedYear;
    requestQueryForProductionDetailsReport.pageNumber = 1;
    $(`${pageNumbers.productionDetailsReport}`).text(requestQueryForProductionDetailsReport.pageNumber);
    GetProductionDetailsReportAjaxCall();
});

//month
$('#select-productionDetailsReport-month').on('change', () => {
    let selectedMonth = $("#select-productionDetailsReport-month option:selected").val();
    requestQueryForProductionDetailsReport.month = selectedMonth;
    requestQueryForProductionDetailsReport.pageNumber = 1;
    $(`${pageNumbers.productionDetailsReport}`).text(requestQueryForProductionDetailsReport.pageNumber);
    GetProductionDetailsReportAjaxCall();
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.productionDetailsReport).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForProductionDetailsReport.pageNumber > 1) requestQueryForProductionDetailsReport.pageNumber -= 1;
    $(`${pageNumbers.productionDetailsReport}`).text(requestQueryForProductionDetailsReport.pageNumber);
    GetProductionDetailsReportAjaxCall();
});
$(NextButtons.productionDetailsReport).on('click', (event) => {
    event.preventDefault();
    requestQueryForProductionDetailsReport.pageNumber += 1;
    $(`${pageNumbers.productionDetailsReport}`).text(requestQueryForProductionDetailsReport.pageNumber);
    GetProductionDetailsReportAjaxCall();
});
//#endregion

// #region search
$(Inputs.productionDetailsReport_searchStk).keyup(function () {
    clearTimeout(timer);
    requestQueryForProductionDetailsReport.pageNumber = 1;
    $(`${pageNumbers.productionDetailsReport}`).text(requestQueryForProductionDetailsReport.pageNumber);
    timer = setTimeout(GetProductionDetailsReportAjaxCall, typingInterval);
});
//user is "finished typing," do something

// #endregion 
//#region  Reset
$('#btn-productionDetailsReport-resetSearch').click(() => {
    requestQueryForProductionDetailsReport.pageNumber = 1;
    requestQueryForProductionDetailsReport.pageSize = 6;
    requestQueryForProductionDetailsReport.year = "";
    requestQueryForProductionDetailsReport.month = "";
    requestQueryForProductionDetailsReport.Stk = "";
    $('#select-productionDetailsReport-year').val('');
    $('#select-productionDetailsReport-month').val('');
    $('#selectRowCount-productionDetailsReport').val("6");
    $(Inputs.productionDetailsReport_searchStk).val('');
    GetProductionDetailsReportAjaxCall();
})
//#endregion







$('#btn-productionDetailsReport-exportToExcel').click((e) => {
    const ws = XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('table-productionDetailsReport-xls'));
    const wb = XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Production Details Report');
    XLSX.writeFile(wb, 'Production Detaisl Report.xlsx');
})



