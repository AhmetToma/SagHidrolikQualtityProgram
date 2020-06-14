$('#lostQty-tab').click((e) => {
    e.preventDefault
    GetlostQtyReportAjaxCall();
    GetlostQtyReportCount();

})
let requestQueryForLostQtyReport = {
    pageSize: 6,
    pageNumber: 1,
    Stk: "",
    lotNo:"",
};

// #region ajaxcall ,create table ,records count  
function GetlostQtyReportAjaxCall() {
    if (requestQueryForLostQtyReport.pageNumber === 1) {
        disableButton(PreviousButtons.lostQtyReport);
        ActiveButton(NextButtons.lostQtyReport);
    }
    else {
        ActiveButton(PreviousButtons.lostQtyReport);
        ActiveButton(NextButtons.lostQtyReport);
    }
    $(TablesId.lostQtyReport).empty();
    $(`${pageNumbers.lostQtyReport}`).text(requestQueryForLostQtyReport.pageNumber);
    requestQueryForLostQtyReport.Stk = $(Inputs.lostQtyReport_searchStk).val();
    requestQueryForLostQtyReport.lotNo = $(Inputs.lostQtyReport_searchLotNo).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetLostQtyReport,
        data: JSON.stringify(requestQueryForLostQtyReport),
        success: (list) => {
            if (list.length !== 0) {
                console.log('lost', list);
                $(`${recordsNotFound.lostQtyReport}`).css('display', 'none');
            CreatelostQtyReportTable(list, TablesId.lostQtyReport);
            }
            else {
                $(TablesId.lostQtyReport).empty();
                disableButton(NextButtons.lostQtyReport);
                $(`${recordsNotFound.lostQtyReport}`).css('display', 'block');
                HideLoader();
            }
        },
        error: (er) => {
            console.log(er);
        }
    });
}
function CreatelostQtyReportTable(list, tableId) {
    $(tableId).empty();
    console.log(list);
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.stk}</td>
  <td>${element.lotNo}</td>
  <td>${element.prosesAdi}</td>
  <td>${element.miktar}</td>
             </tr>
`);

    });
    HideLoader();
}
function GetlostQtyReportCount() {
    $('#selectRowCount-lostQtyReport').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetLostQtyReportCount,
        success: (number) => {
            $('#lostQtyReportTableCount').text(number);
            $('#selectRowCount-lostQtyReport').append(`
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
$('#selectRowCount-lostQtyReport').on('change', () => {
    let selectedRowCount = $("#selectRowCount-lostQtyReport option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForLostQtyReport.pageSize = selectedRowCount;
    requestQueryForLostQtyReport.pageNumber = 1;
    GetlostQtyReportAjaxCall();
});


//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.lostQtyReport).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForLostQtyReport.pageNumber > 1) requestQueryForLostQtyReport.pageNumber -= 1;
    $(`${pageNumbers.lostQtyReport}`).text(requestQueryForLostQtyReport.pageNumber);
    GetlostQtyReportAjaxCall();
});
$(NextButtons.lostQtyReport).on('click', (event) => {
    event.preventDefault();
    requestQueryForLostQtyReport.pageNumber += 1;
    $(`${pageNumbers.lostQtyReport}`).text(requestQueryForLostQtyReport.pageNumber);
    GetlostQtyReportAjaxCall();
});
//#endregion

// #region search
$(Inputs.lostQtyReport_searchStk).keyup(function () {
    clearTimeout(timer);
    requestQueryForLostQtyReport.pageNumber = 1;
    $(`${pageNumbers.lostQtyReport}`).text(requestQueryForLostQtyReport.pageNumber);
    timer = setTimeout(GetlostQtyReportAjaxCall, typingInterval);
});
$(Inputs.lostQtyReport_searchLotNo).keyup(function () {
    clearTimeout(timer);
    requestQueryForLostQtyReport.pageNumber = 1;
    $(`${pageNumbers.lostQtyReport}`).text(requestQueryForLostQtyReport.pageNumber);
    timer = setTimeout(GetlostQtyReportAjaxCall, typingInterval);
});
//user is "finished typing," do something

// #endregion 
//#region  Reset
$('#btn-lostQtyReport-resetSearch').click(() => {
    requestQueryForLostQtyReport.pageNumber = 1;
    requestQueryForLostQtyReport.pageSize = 6;
    requestQueryForLostQtyReport.Stk = "";
    requestQueryForLostQtyReport.lotNo = "";
    $('#selectRowCount-lostQtyReport').val("6");
    $(Inputs.lostQtyReport_searchStk).val('');
    $(Inputs.lostQtyReport_searchLotNo).val('');
    GetlostQtyReportAjaxCall();
})
//#endregion


//#region Export to Excel
$('#btn-lostQtyReport-exportToExcel').click((e) => {
    const ws = XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('table-lostQtyReport-xls'));
    const wb = XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'lost Qty Report');
    XLSX.writeFile(wb, 'lost Qty Report.xlsx');
})

//#endregion






