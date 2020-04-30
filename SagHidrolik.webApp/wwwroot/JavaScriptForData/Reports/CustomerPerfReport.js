$('#CustomerPerf-tab').click((e) => {
    e.preventDefault
    GetCustomerPerfReportAjaxCall();
    GetCustomerPerfReportCount();
})
let requestQueryForCustomerPerfReport = {
    pageSize: 6,
    pageNumber: 1,
    year: "",
    month: "",
    Stk: "",
};

// #region ajaxcall ,create table ,records count  
function GetCustomerPerfReportAjaxCall() {
    if (requestQueryForCustomerPerfReport.pageNumber === 1) {
        disableButton(PreviousButtons.customerPerfReport);
        ActiveButton(NextButtons.customerPerfReport);
    }
    else {
        ActiveButton(PreviousButtons.customerPerfReport);
        ActiveButton(NextButtons.customerPerfReport);
    }
    $(TablesId.customerPerfReport).empty();
    $(`${pageNumbers.customerPerfReport}`).text(requestQueryForCustomerPerfReport.pageNumber);
    requestQueryForCustomerPerfReport.Stk = $(Inputs.customerPerfReport_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetCustomerperfReport,
        data: JSON.stringify(requestQueryForCustomerPerfReport),
        success: (list) => {
            if (list.length !== 0) {
                console.log('customer', list);
                $(`${recordsNotFound.customerPerfReport}`).css('display', 'none');
              CreatecustomerPerfReportTable(list, TablesId.customerPerfReport);
            }
            else {
                $(TablesId.customerPerfReport).empty();
                disableButton(NextButtons.customerPerfReport);
                $(`${recordsNotFound.customerPerfReport}`).css('display', 'block');
                HideLoader();
            }
        },
        error: (er) => {
            console.log(er);
        }
    });
}
function CreatecustomerPerfReportTable(list, tableId) {
    $(tableId).empty();
    console.log(list);
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.stk}</td>
  <td>${element.cariadi}</td>
  <td>${element.sipevrakno}</td>
  <td>${element.orderQty}</td>
  <td>${element.siparisAltiTestTarihi.slice(0,-11)}</td>
  <td>${element.stokAltiTarihi.slice(0, -11)}</td>
  <td>${element.totalInvoice}</td>
  <td>${element.turac}</td>
  <td>${element.tur}</td>
             </tr>
`);

    });
    HideLoader();
}
function GetCustomerPerfReportCount() {
    $('#selectRowCount-customerPerfReport').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetCustomerperfReportCount,
        success: (number) => {
            $('#customerPerfReportTableCount').text(number);
            $('#selectRowCount-customerPerfReport').append(`
<option value="6" selected>6</option>
<option value="10">10</option>
<option value="20">20</option>
<option value="50">50</option>
<option value="100">100</option>
<option value="${number}">${number}</option>
`);
        }
    });
}

//#endregion

// #region selects


// rowCount
$('#selectRowCount-customerPerfReport').on('change', () => {
    let selectedRowCount = $("#selectRowCount-customerPerfReport option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForCustomerPerfReport.pageSize = selectedRowCount;
    requestQueryForCustomerPerfReport.pageNumber = 1;
    GetCustomerPerfReportAjaxCall();
});
//year
$('#select-customerPerfReport-year').on('change', () => {
    let selectedYear = $("#select-customerPerfReport-year option:selected").val();
    requestQueryForCustomerPerfReport.year = selectedYear;
    requestQueryForCustomerPerfReport.pageNumber = 1;
    $(`${pageNumbers.customerPerfReport}`).text(requestQueryForCustomerPerfReport.pageNumber);
    GetCustomerPerfReportAjaxCall();
});

//month
$('#select-customerPerfReport-month').on('change', () => {
    let selectedMonth = $("#select-customerPerfReport-month option:selected").val();
    requestQueryForCustomerPerfReport.month = selectedMonth;
    requestQueryForCustomerPerfReport.pageNumber = 1;
    $(`${pageNumbers.customerPerfReport}`).text(requestQueryForCustomerPerfReport.pageNumber);
    GetCustomerPerfReportAjaxCall();
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.customerPerfReport).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForCustomerPerfReport.pageNumber > 1) requestQueryForCustomerPerfReport.pageNumber -= 1;
    $(`${pageNumbers.customerPerfReport}`).text(requestQueryForCustomerPerfReport.pageNumber);
    GetCustomerPerfReportAjaxCall();
});
$(NextButtons.customerPerfReport).on('click', (event) => {
    event.preventDefault();
    requestQueryForCustomerPerfReport.pageNumber += 1;
    $(`${pageNumbers.customerPerfReport}`).text(requestQueryForCustomerPerfReport.pageNumber);
    GetCustomerPerfReportAjaxCall();
});
//#endregion

// #region search
$(Inputs.customerPerfReport_searchStk).keyup(function () {
    clearTimeout(timer);
    requestQueryForCustomerPerfReport.pageNumber = 1;
    $(`${pageNumbers.customerPerfReport}`).text(requestQueryForCustomerPerfReport.pageNumber);
    timer = setTimeout(GetCustomerPerfReportAjaxCall, typingInterval);
});
//user is "finished typing," do something

// #endregion 
//#region  Reset
$('#btn-customerPerfReport-resetSearch').click(() => {
    requestQueryForCustomerPerfReport.pageNumber = 1;
    requestQueryForCustomerPerfReport.pageSize = 6;
    requestQueryForCustomerPerfReport.year = "";
    requestQueryForCustomerPerfReport.month = "";
    requestQueryForCustomerPerfReport.Stk = "";
    $('#select-customerPerfReport-year').val('');
    $('#select-customerPerfReport-month').val('');
    $('#selectRowCount-customerPerfReport').val("6");
    $(Inputs.customerPerfReport_searchStk).val('');
    GetCustomerPerfReportAjaxCall();
})
//#endregion









