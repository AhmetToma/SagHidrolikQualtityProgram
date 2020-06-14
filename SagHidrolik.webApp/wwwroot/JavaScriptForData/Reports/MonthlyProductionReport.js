$('#MonthlyProdution-tab').click((e) => {
    e.preventDefault()
    GetmonthlyProdcutionReportAjaxCall();
    GetMonthlyProductionReportCount();
})
let requestQueryForMonthlyProductionReport = {
    pageSize: 6,
    pageNumber: 1,
    year: "",
    month: "",
    Machine_no:""
};

// #region ajaxcall ,create table ,records count  
function GetmonthlyProdcutionReportAjaxCall() {
    if (requestQueryForMonthlyProductionReport.pageNumber === 1) {
        disableButton(PreviousButtons.monthlyProdcutionReport);
        ActiveButton(NextButtons.monthlyProdcutionReport);
    }
    else {
        ActiveButton(PreviousButtons.monthlyProdcutionReport);
        ActiveButton(NextButtons.monthlyProdcutionReport);
    }
    $(TablesId.monthlyProdcutionReport).empty();
    $(`${pageNumbers.monthlyProdcutionReport}`).text(requestQueryForMonthlyProductionReport.pageNumber);
    requestQueryForMonthlyProductionReport.Machine_no = $(Inputs.monthlyProdcutionReport_searchMachinNo).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetMonthlyProduction,
        data: JSON.stringify(requestQueryForMonthlyProductionReport),
        success: (list) => {
            if (list.length !== 0) {
                console.log('Month',list);
                $(`${recordsNotFound.monthlyProdcutionReport}`).css('display', 'none');
               CreateMonthlyProdcutionReportTable(list, TablesId.monthlyProdcutionReport);
            }
            else {
                $(TablesId.monthlyProdcutionReport).empty();
                disableButton(NextButtons.monthlyProdcutionReport);
                $(`${recordsNotFound.monthlyProdcutionReport}`).css('display', 'block');
                HideLoader();
            }
        },
        error: () => {
            alert('err');
        }
    });
}
function CreateMonthlyProdcutionReportTable(list, tableId) {
    $(tableId).empty();
    console.log(list);
    list.map((element, index) => {
        
            $(tableId).append(`
<tr >
  <td>${element.machineId}</td>
  <td>${element.machine_no}</td>
  <td>${element.model}</td>
  <td>${element.finsihTime}</td>
  <td>${element.total}</td>
             </tr>
`);

    });
    HideLoader();
}
function GetMonthlyProductionReportCount() {
    $('#selectRowCount-monthlyProdcutionReport').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetMonthlyProductionCount,
        success: (number) => {
            $('#monthlyProdcutionReportTableCount').text(number);
            $('#selectRowCount-monthlyProdcutionReport').append(`
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
$('#selectRowCount-monthlyProdcutionReport').on('change', () => {
    let selectedRowCount = $("#selectRowCount-monthlyProdcutionReport option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForMonthlyProductionReport.pageSize = selectedRowCount;
    requestQueryForMonthlyProductionReport.pageNumber = 1;
    GetmonthlyProdcutionReportAjaxCall();
});
//year
$('#select-monthlyProdcutionReport-year').on('change', () => {
    let selectedYear = $("#select-monthlyProdcutionReport-year option:selected").val();
    requestQueryForMonthlyProductionReport.year = selectedYear;
    requestQueryForMonthlyProductionReport.pageNumber = 1;
    $(`${pageNumbers.monthlyProdcutionReport}`).text(requestQueryForMonthlyProductionReport.pageNumber);
    GetmonthlyProdcutionReportAjaxCall();
});

//month
$('#select-monthlyProdcutionReport-month').on('change', () => {
    let selectedMonth = $("#select-monthlyProdcutionReport-month option:selected").val();
    requestQueryForMonthlyProductionReport.month = selectedMonth;
    requestQueryForMonthlyProductionReport.pageNumber = 1;
    $(`${pageNumbers.monthlyProdcutionReport}`).text(requestQueryForMonthlyProductionReport.pageNumber);
    GetmonthlyProdcutionReportAjaxCall();
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.monthlyProdcutionReport).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForMonthlyProductionReport.pageNumber > 1) requestQueryForMonthlyProductionReport.pageNumber -= 1;
    $(`${pageNumbers.monthlyProdcutionReport}`).text(requestQueryForMonthlyProductionReport.pageNumber);
    GetmonthlyProdcutionReportAjaxCall();
});
$(NextButtons.monthlyProdcutionReport).on('click', (event) => {
    event.preventDefault();
    requestQueryForMonthlyProductionReport.pageNumber += 1;
    $(`${pageNumbers.monthlyProdcutionReport}`).text(requestQueryForMonthlyProductionReport.pageNumber);
    GetmonthlyProdcutionReportAjaxCall();
});
//#endregion

// #region search
$(Inputs.monthlyProdcutionReport_searchMachinNo).keyup(function () {
    clearTimeout(timer);
        requestQueryForMonthlyProductionReport.pageNumber = 1;
        $(`${pageNumbers.monthlyProdcutionReport}`).text(requestQueryForMonthlyProductionReport.pageNumber);
        timer = setTimeout(GetmonthlyProdcutionReportAjaxCall, typingInterval);
});
//user is "finished typing," do something

// #endregion 

//#region  Reset
$('#btn-monthlyProdcutionReport-resetSearch').click(() => {
    requestQueryForMonthlyProductionReport.pageNumber = 1;
    requestQueryForMonthlyProductionReport.pageSize = 6;
    requestQueryForMonthlyProductionReport.year = "";
    requestQueryForMonthlyProductionReport.month = "";
    requestQueryForMonthlyProductionReport.Machine_no = "";
    $('#select-monthlyProdcutionReport-year').val('');
    $('#select-monthlyProdcutionReport-month').val('');
    $('#selectRowCount-monthlyProdcutionReport').val("6");
    $(Inputs.monthlyProdcutionReport_searchMachinNo).val('');
    GetmonthlyProdcutionReportAjaxCall();
})
//#endregion



//#region Export to Excel
$('#btn-monthlyProdcutionReport-exportToExcel').click((e) => {
    const ws = XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('table-monthlyProdcutionReport-xls'));
    const wb = XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Monthly Prodcution Report');
    XLSX.writeFile(wb, 'Monthly Prodcution Report.xlsx');
})

//#endregion






