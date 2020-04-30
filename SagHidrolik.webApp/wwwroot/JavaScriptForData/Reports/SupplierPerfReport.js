$('#supplierPerf-tab').click((e) => {
    e.preventDefault
    GetsupplierPerfReportAjaxCall();
    GetsupplierPerfReportCount();

})
let requestQueryForSupplierPerfReport = {
    pageSize: 6,
    pageNumber: 1,
    year: "",
    month: "",
    Stk: "",
};

// #region ajaxcall ,create table ,records count  
function GetsupplierPerfReportAjaxCall() {
    if (requestQueryForSupplierPerfReport.pageNumber === 1) {
        disableButton(PreviousButtons.supplierPerfReport);
        ActiveButton(NextButtons.supplierPerfReport);
    }
    else {
        ActiveButton(PreviousButtons.supplierPerfReport);
        ActiveButton(NextButtons.supplierPerfReport);
    }
    $(TablesId.supplierPerfReport).empty();
    $(`${pageNumbers.supplierPerfReport}`).text(requestQueryForSupplierPerfReport.pageNumber);
    requestQueryForSupplierPerfReport.Stk = $(Inputs.supplierPerfReport_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetSupplierPerfReport,
        data: JSON.stringify(requestQueryForSupplierPerfReport),
        success: (list) => {
            if (list.length !== 0) {
                console.log('suplierPerf', list);
                $(`${recordsNotFound.supplierPerfReport}`).css('display', 'none');
                CreateSupplierPerfReportTable(list, TablesId.supplierPerfReport);
            }
            else {
                $(TablesId.supplierPerfReport).empty();
                disableButton(NextButtons.supplierPerfReport);
                $(`${recordsNotFound.supplierPerfReport}`).css('display', 'block');
                HideLoader();
            }
        },
        error: (er) => {
            console.log(er);
        }
    });
}
function CreateSupplierPerfReportTable(list, tableId) {
    $(tableId).empty();
    console.log(list);
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.stk}</td>
  <td>${element.sta}</td>
  <td>${element.sipevrakno}</td>
  <td>${element.orderQty}</td>
  <td>${element.siparisAltiTestTarihi.slice(0,-11)}</td>
  <td>${element.stokAltTarihi.slice(0, -11)}</td>
  <td>${element.totalInvoice}</td>
  <td>${element.turac}</td>
  <td>${element.tur}</td>
             </tr>
`);

    });
    HideLoader();
}
function GetsupplierPerfReportCount() {
    $('#selectRowCount-supplierPerfReport').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetSupplierPerfReportCount,
        success: (number) => {
            $('#supplierPerfReportTableCount').text(number);
            $('#selectRowCount-supplierPerfReport').append(`
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
$('#selectRowCount-supplierPerfReport').on('change', () => {
    let selectedRowCount = $("#selectRowCount-supplierPerfReport option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForSupplierPerfReport.pageSize = selectedRowCount;
    requestQueryForSupplierPerfReport.pageNumber = 1;
    GetsupplierPerfReportAjaxCall();
});
//year
$('#select-supplierPerfReport-year').on('change', () => {
    let selectedYear = $("#select-supplierPerfReport-year option:selected").val();
    requestQueryForSupplierPerfReport.year = selectedYear;
    requestQueryForSupplierPerfReport.pageNumber = 1;
    $(`${pageNumbers.supplierPerfReport}`).text(requestQueryForSupplierPerfReport.pageNumber);
    GetsupplierPerfReportAjaxCall();
});

//month
$('#select-supplierPerfReport-month').on('change', () => {
    let selectedMonth = $("#select-supplierPerfReport-month option:selected").val();
    requestQueryForSupplierPerfReport.month = selectedMonth;
    requestQueryForSupplierPerfReport.pageNumber = 1;
    $(`${pageNumbers.supplierPerfReport}`).text(requestQueryForSupplierPerfReport.pageNumber);
    GetsupplierPerfReportAjaxCall();
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.supplierPerfReport).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForSupplierPerfReport.pageNumber > 1) requestQueryForSupplierPerfReport.pageNumber -= 1;
    $(`${pageNumbers.supplierPerfReport}`).text(requestQueryForSupplierPerfReport.pageNumber);
    GetsupplierPerfReportAjaxCall();
});
$(NextButtons.supplierPerfReport).on('click', (event) => {
    event.preventDefault();
    requestQueryForSupplierPerfReport.pageNumber += 1;
    $(`${pageNumbers.supplierPerfReport}`).text(requestQueryForSupplierPerfReport.pageNumber);
    GetsupplierPerfReportAjaxCall();
});
//#endregion

// #region search
$(Inputs.supplierPerfReport_searchStk).keyup(function () {
    clearTimeout(timer);
    requestQueryForSupplierPerfReport.pageNumber = 1;
    $(`${pageNumbers.supplierPerfReport}`).text(requestQueryForSupplierPerfReport.pageNumber);
    timer = setTimeout(GetsupplierPerfReportAjaxCall, typingInterval);
});
//user is "finished typing," do something

// #endregion 
//#region  Reset
$('#btn-supplierPerfReport-resetSearch').click(() => {
    requestQueryForSupplierPerfReport.pageNumber = 1;
    requestQueryForSupplierPerfReport.pageSize = 6;
    requestQueryForSupplierPerfReport.year = "";
    requestQueryForSupplierPerfReport.month = "";
    requestQueryForSupplierPerfReport.Stk = "";
    $('#select-supplierPerfReport-year').val('');
    $('#select-supplierPerfReport-month').val('');
    $('#selectRowCount-supplierPerfReport').val("6");
    $(Inputs.supplierPerfReport_searchStk).val('');
    GetsupplierPerfReportAjaxCall();
})
//#endregion









