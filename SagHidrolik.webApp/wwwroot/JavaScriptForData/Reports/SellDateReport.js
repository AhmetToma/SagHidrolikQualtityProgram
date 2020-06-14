$('#SellDate-tab').click((e) => {
    e.preventDefault()
    GetSellDateReportAjaxCall();
    SetSellDateReportCount();
})
let requestQueryForSellDateReport = {
    pageSize: 6,
    pageNumber: 1,
    year: "",
    month: "",
    Stk:""
};

// #region ajaxcall ,create table ,records count  
function GetSellDateReportAjaxCall() {
    if (requestQueryForSellDateReport.pageNumber === 1) {
        disableButton(PreviousButtons.sellDateReport);
        ActiveButton(NextButtons.sellDateReport);
    }
    else {
        ActiveButton(PreviousButtons.sellDateReport);
        ActiveButton(NextButtons.sellDateReport);
    }
    $(TablesId.sellDateReport).empty();
    $(`${pageNumbers.sellDateReport}`).text(requestQueryForSellDateReport.pageNumber);
    requestQueryForSellDateReport.Stk = $(Inputs.sellDateReport_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetSellDateReport,
        data: JSON.stringify(requestQueryForSellDateReport),
        success: (list) => {
            if (list.length !== 0) {
                console.log('sellDate',list);
                $(`${recordsNotFound.sellDateReport}`).css('display', 'none');
           CreateSellDateReportTable(list, TablesId.sellDateReport);
            }
            else {
                $(TablesId.sellDateReport).empty();
                disableButton(NextButtons.sellDateReport);
                $(`${recordsNotFound.sellDateReport}`).css('display', 'block');
                HideLoader();
            }
        },
        error: () => {
            alert('err');
        }
    });
}
function CreateSellDateReportTable(list, tableId) {
    $(tableId).empty();
    console.log(list);
    list.map((element, index) => {
        
            $(tableId).append(`
<tr >
  <td>${element.stk}</td>
  <td>${element.totalStock}</td>
  <td>${element.tarih ? element.tarih.slice(0,-11):""}</td>
  <td>${element.tur}</td>
             </tr>
`);

    });
    HideLoader();
}
let is = 0;
function SetSellDateReportCount(number) {
    
    $('#selectRowCount-sellDateReport').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetSellDateReportCount,
        success: (number) => {
            $('#sellDateReportTableCount').text(number);
            $('#selectRowCount-sellDateReport').append(`
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
$('#selectRowCount-sellDateReport').on('change', () => {
    let selectedRowCount = $("#selectRowCount-sellDateReport option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForSellDateReport.pageSize = selectedRowCount;
    requestQueryForSellDateReport.pageNumber = 1;
    GetSellDateReportAjaxCall();
});
//year
$('#select-sellDateReport-year').on('change', () => {
    let selectedYear = $("#select-sellDateReport-year option:selected").val();
    requestQueryForSellDateReport.year = selectedYear;
    requestQueryForSellDateReport.pageNumber = 1;
    $(`${pageNumbers.sellDateReport}`).text(requestQueryForSellDateReport.pageNumber);
    GetSellDateReportAjaxCall();
});

//month
$('#select-sellDateReport-month').on('change', () => {
    let selectedMonth = $("#select-sellDateReport-month option:selected").val();
    requestQueryForSellDateReport.month = selectedMonth;
    requestQueryForSellDateReport.pageNumber = 1;
    $(`${pageNumbers.sellDateReport}`).text(requestQueryForSellDateReport.pageNumber);
    GetSellDateReportAjaxCall();
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.sellDateReport).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForSellDateReport.pageNumber > 1) requestQueryForSellDateReport.pageNumber -= 1;
    $(`${pageNumbers.sellDateReport}`).text(requestQueryForSellDateReport.pageNumber);
    GetSellDateReportAjaxCall();
});
$(NextButtons.sellDateReport).on('click', (event) => {
    event.preventDefault();
    requestQueryForSellDateReport.pageNumber += 1;
    $(`${pageNumbers.sellDateReport}`).text(requestQueryForSellDateReport.pageNumber);
    GetSellDateReportAjaxCall();
});
//#endregion

// #region search
$(Inputs.sellDateReport_searchStk).keyup(function () {
    clearTimeout(timer);
        requestQueryForSellDateReport.pageNumber = 1;
        $(`${pageNumbers.sellDateReport}`).text(requestQueryForSellDateReport.pageNumber);
        timer = setTimeout(GetSellDateReportAjaxCall, typingInterval);
});
//user is "finished typing," do something

// #endregion 

//#region  Reset
$('#btn-sellDateReport-resetSearch').click(() => {
    requestQueryForSellDateReport.pageNumber = 1;
    requestQueryForSellDateReport.pageSize = 6;
    requestQueryForSellDateReport.year = "";
    requestQueryForSellDateReport.month = "";
    requestQueryForSellDateReport.Stk = "";
    $('#select-sellDateReport-year').val('');
    $('#select-sellDateReport-month').val('');
    $('#selectRowCount-sellDateReport').val("6");
    $(Inputs.sellDateReport_searchStk).val('');
    GetSellDateReportAjaxCall();
})
//#endregion




//#region Export to Excel
$('#btn-sellDateReport-exportToExcel').click((e) => {
    const ws = XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('table-sellDateReport-xls'));
    const wb = XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sell Date Report');
    XLSX.writeFile(wb, 'sell Date Report.xlsx');
})

//#endregion





