$('#processPlan-tab').click((e) => {
    e.preventDefault
    GetprocessPlanReportAjaxCall();
    GetProcessPlanReportCount();
})
let requestQueryForProcessPlanReport = {
    pageSize: 6,
    pageNumber: 1,
    year: "",
    month: "",
    Stk: "",
    Group:""
};

// #region ajaxcall ,create table ,records count  
function GetprocessPlanReportAjaxCall() {
    if (requestQueryForProcessPlanReport.pageNumber === 1) {
        disableButton(PreviousButtons.processPlanReport);
        ActiveButton(NextButtons.processPlanReport);
    }
    else {
        ActiveButton(PreviousButtons.processPlanReport);
        ActiveButton(NextButtons.processPlanReport);
    }
    $(TablesId.processPlanReport).empty();
    $(`${pageNumbers.processPlanReport}`).text(requestQueryForProcessPlanReport.pageNumber);
    requestQueryForProcessPlanReport.Stk = $(Inputs.processPlanReport_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcessPlanReport,
        data: JSON.stringify(requestQueryForProcessPlanReport),
        success: (list) => {
            if (list.length !== 0) {
                console.log('process', list);
                $(`${recordsNotFound.processPlanReport}`).css('display', 'none');
           CreateProcessPlanReportTable(list, TablesId.processPlanReport);
            }
            else {
                $(TablesId.processPlanReport).empty();
                disableButton(NextButtons.processPlanReport);
                $(`${recordsNotFound.processPlanReport}`).css('display', 'block');
                HideLoader();
            }
        },
        error: (er) => {
            console.log(er);
        }
    });
}
function CreateProcessPlanReportTable(list, tableId) {
    $(tableId).empty();
    console.log(list);
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.partNo}</td>
  <td>${element.processDate.slice(0, -11)}</td>
  <td>${element.group}</td>
  <td>${element.prosesAdi}</td>
  <td>${element.woLot}</td>
  <td>${element.remainProcessqty}</td>
  <td>${element.woNewDate.slice(0, -11)}</td>
  <td>${element.balance}</td>
 <td><i onclick="deleteProcessPlan(${element.id},'${element.partNo}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></
             </tr>
`);

    });
    HideLoader();
}
function GetProcessPlanReportCount() {
    $('#selectRowCount-processPlanReport').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcessPlanReportCount,
        success: (number) => {
            $('#processPlanReportTableCount').text(number);
            $('#selectRowCount-processPlanReport').append(`
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
$('#selectRowCount-processPlanReport').on('change', () => {
    let selectedRowCount = $("#selectRowCount-processPlanReport option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForProcessPlanReport.pageSize = selectedRowCount;
    requestQueryForProcessPlanReport.pageNumber = 1;
    GetprocessPlanReportAjaxCall();
});
//group
$('#selectGroup-processPlanReport').on('change', () => {
    let selectedGroup = $("#selectGroup-processPlanReport option:selected").val();
    requestQueryForProcessPlanReport.Group = selectedGroup;
    requestQueryForProcessPlanReport.pageNumber = 1;
    $(`${pageNumbers.processPlanReport}`).text(requestQueryForProcessPlanReport.pageNumber);
    GetprocessPlanReportAjaxCall();
});
//year
$('#select-processPlanReport-year').on('change', () => {
    let selectedYear = $("#select-processPlanReport-year option:selected").val();
    requestQueryForProcessPlanReport.year = selectedYear;
    requestQueryForProcessPlanReport.pageNumber = 1;
    $(`${pageNumbers.processPlanReport}`).text(requestQueryForProcessPlanReport.pageNumber);
    GetprocessPlanReportAjaxCall();
});

//month
$('#select-processPlanReport-month').on('change', () => {
    let selectedMonth = $("#select-processPlanReport-month option:selected").val();
    requestQueryForProcessPlanReport.month = selectedMonth;
    requestQueryForProcessPlanReport.pageNumber = 1;
    $(`${pageNumbers.processPlanReport}`).text(requestQueryForProcessPlanReport.pageNumber);
    GetprocessPlanReportAjaxCall();
});


//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.processPlanReport).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForProcessPlanReport.pageNumber > 1) requestQueryForProcessPlanReport.pageNumber -= 1;
    $(`${pageNumbers.processPlanReport}`).text(requestQueryForProcessPlanReport.pageNumber);
    GetprocessPlanReportAjaxCall();
});
$(NextButtons.processPlanReport).on('click', (event) => {
    event.preventDefault();
    requestQueryForProcessPlanReport.pageNumber += 1;
    $(`${pageNumbers.processPlanReport}`).text(requestQueryForProcessPlanReport.pageNumber);
    GetprocessPlanReportAjaxCall();
});
//#endregion

// #region search
$(Inputs.processPlanReport_searchStk).keyup(function () {
    clearTimeout(timer);
    requestQueryForProcessPlanReport.pageNumber = 1;
    $(`${pageNumbers.processPlanReport}`).text(requestQueryForProcessPlanReport.pageNumber);
    timer = setTimeout(GetprocessPlanReportAjaxCall, typingInterval);
});
//user is "finished typing," do something

// #endregion 
//#region  Reset
$('#btn-processPlanReport-resetSearch').click(() => {
    requestQueryForProcessPlanReport.pageNumber = 1;
    requestQueryForProcessPlanReport.pageSize = 6;
    requestQueryForProcessPlanReport.year = "";
    requestQueryForProcessPlanReport.month = "";
    requestQueryForProcessPlanReport.Stk = "";
    $('#select-processPlanReport-year').val('');
    $('#select-processPlanReport-month').val('');
    $('#selectRowCount-processPlanReport').val("6");
    $('#selectGroup-processPlanReport').val("");
    $(Inputs.processPlanReport_searchStk).val('');
    GetprocessPlanReportAjaxCall();
})
//#endregion



//#region Delete Process


function deleteProcessPlan(id, partNo)
{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${partNo}' silenecek!`,
        text: `'${partNo}' silmek iseter misiniz?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil !',
        cancelButtonText: 'Hayır , silme!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "GET",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.DeleteProcessplan + id,
                success: (num) => {
                    if (num !== 0) {
                        GetprocessPlanReportAjaxCall();
                        GetProcessPlanReportCount();
                        Swal.fire({
                            title: 'Başarılı!',
                            text: 'process Plan Başarı ile Silendi',
                            type: 'success',
                            timer: 2000
                        });
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Beklenmeyen bir hata oluştu',
                            timer: 2000

                        });
                    }
                }

            });
        }
    });
}
//#endregion








//#region Export to Excel
$('#btn-processPlanReport-exportToExcel').click((e) => {
    const ws = XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('table-processPlanReport-xls'));
    const wb = XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Process Plan Report');
    XLSX.writeFile(wb, 'Process Plan Report.xlsx');
})

//#endregion