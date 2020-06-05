$(function () {
    let dataUrl = "Home/AllReports";
    let BakimArizaUrl = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === BakimArizaUrl || window.location.href === serverUrl) {
        GetProcutionReportAjaxCall();
        GetProcutionReportCount();
    }
});
let requestQueryForProdutionReport = {
    pageSize: 6,
    pageNumber: 1,
    year: "",
    month:""
};

// #region ajaxcall ,create table ,records count  
function GetProcutionReportAjaxCall() {
    if (requestQueryForProdutionReport.pageNumber === 1) {
        disableButton(PreviousButtons.productionReport);
        ActiveButton(NextButtons.productionReport);
    }
    else {
        ActiveButton(PreviousButtons.productionReport);
        ActiveButton(NextButtons.productionReport);
    }
    $(TablesId.operator).empty();
    $(`${pageNumbers.productionReport}`).text(requestQueryForProdutionReport.pageNumber);
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcutionReport,
        data: JSON.stringify(requestQueryForProdutionReport),
        success: (list) => {
            if (list.length !== 0) {
                //console.log(list);
                $(`${recordsNotFound.productionReport}`).css('display', 'none');
                CreateProdutionReportTable(list, TablesId.productionReport);
            }
            else {
                $(TablesId.productionReport).empty();
                disableButton(NextButtons.productionReport);
                $(`${recordsNotFound.productionReport}`).css('display', 'block');
                HideLoader();
            }
        },
        error: () => {
            alert('err');
        }
    });
}
function CreateProdutionReportTable(list, tableId) {
    $(tableId).empty();

    let keys = ['01_Kesim', '02_Büküm', '03_Havşa', '04_Kaynak', '042_Hazirlik', '02_Büküm', '05_Hortum', '06_Paketleme', '06_PaketlemeDiğer','06_test',
        '07_Mercedes', '99_Proto', '09_Kaplama', '08_UçŞekil' ]
    let total = 0;

    list.map((element, index) => {
        
        if (element.finishTime != null) {

            for (var i = 0; i < keys.length; i++) {

                if (element[keys[i]] != null && element[keys[i]] != "") {
                    total = total + element[keys[i]];
                }
                else element[keys[i]]= "";
            }
        
            $(tableId).append(`
<tr >
  <td>${element.finishTime}</td>
    <td>${total}</td>
  <td>${element[keys[0]]} </td>
  <td>${element[keys[1]]} </td>
  <td>${element[keys[2]]} </td>
  <td>${element[keys[3]]} </td>
  <td>${element[keys[4]]} </td>
  <td>${element[keys[5]]} </td>
  <td>${element[keys[6]]} </td>
  <td>${element[keys[7]]} </td>
  <td>${element[keys[8]]} </td>
  <td>${element[keys[9]]} </td>
  <td>${element[keys[10]]} </td>
  <td>${element[keys[11]]} </td>
  <td>${element[keys[12]]} </td>
  <td>${element[keys[13]]} </td>
             </tr>
`);
            total = 0;
        }

    });
    HideLoader();
}
function GetProcutionReportCount() {
    $('#selectRowCount-productionReport').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcutionReportCount,
        success: (number) => {
            $('#productionReportTableCount').text(number);
            $('#selectRowCount-productionReport').append(`
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
$('#selectRowCount-productionReport').on('change', () => {
    let selectedRowCount = $("#selectRowCount-productionReport option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForProdutionReport.pageSize = selectedRowCount;
    requestQueryForProdutionReport.pageNumber = 1;
    GetProcutionReportAjaxCall();
});


//year
$('#select-productionReport-year').on('change', () => {
    let selectedYear = $("#select-productionReport-year option:selected").val();
    requestQueryForProdutionReport.year = selectedYear;
    requestQueryForProdutionReport.pageNumber = 1;
    $(`${pageNumbers.productionReport}`).text(requestQueryForProdutionReport.pageNumber);
    GetProcutionReportAjaxCall();
});

//month
$('#select-productionReport-month').on('change', () => {
    let selectedMonth = $("#select-productionReport-month option:selected").val();
    requestQueryForProdutionReport.month = selectedMonth;
    requestQueryForProdutionReport.pageNumber = 1;
    $(`${pageNumbers.productionReport}`).text(requestQueryForProdutionReport.pageNumber);
    GetProcutionReportAjaxCall();
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.productionReport).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForProdutionReport.pageNumber > 1) requestQueryForProdutionReport.pageNumber -= 1;
    $(`${pageNumbers.productionReport}`).text(requestQueryForProdutionReport.pageNumber);
    GetProcutionReportAjaxCall();
});
$(NextButtons.productionReport).on('click', (event) => {
    event.preventDefault();
    requestQueryForProdutionReport.pageNumber += 1;
    $(`${pageNumbers.productionReport}`).text(requestQueryForProdutionReport.pageNumber);
    GetProcutionReportAjaxCall();
});
//#endregion


//#region 
$('#btn-productionReport-resetSearch').click(() => {
    requestQueryForProdutionReport.pageNumber = 1;
    requestQueryForProdutionReport.pageSize = 6;
    requestQueryForProdutionReport.year = "";
    requestQueryForProdutionReport.month = "";
    $('#select-productionReport-year').val('');
    $('#select-productionReport-month').val('');
    $('#selectRowCount-productionReport').val("6");
    GetProcutionReportAjaxCall();
})
//#endregion









