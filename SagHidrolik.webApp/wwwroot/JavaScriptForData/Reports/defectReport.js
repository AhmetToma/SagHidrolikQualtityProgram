$('#Defect-tab').click((e) => {
    e.preventDefault
    GetDefectReporttAjaxCall();
    GeDefectReportCount();
})
let requestQueryForDefectReport = {
    pageSize: 6,
    pageNumber: 1,
    year: "",
    month:""
};

// #region ajaxcall ,create table ,records count  
function GetDefectReporttAjaxCall() {
    if (requestQueryForDefectReport.pageNumber === 1) {
        disableButton(PreviousButtons.defectReport);
        ActiveButton(NextButtons.defectReport);
    }
    else {
        ActiveButton(PreviousButtons.defectReport);
        ActiveButton(NextButtons.defectReport);
    }
    $(TablesId.defectReport).empty();
    $(`${pageNumbers.defectReport}`).text(requestQueryForDefectReport.pageNumber);
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GeDefectReport,
        data: JSON.stringify(requestQueryForDefectReport),
        success: (list) => {
            if (list.length !== 0) {
                console.log(list);
                $(`${recordsNotFound.defectReport}`).css('display', 'none');
                CreateDefectReportTable(list, TablesId.defectReport);
            }
            else {
                $(TablesId.defectReport).empty();
                disableButton(NextButtons.defectReport);
                $(`${recordsNotFound.defectReport}`).css('display', 'block');
                HideLoader();
            }
        },
        error: () => {
            alert('err');
        }
    });
}
function CreateDefectReportTable(list, tableId) {
    $(tableId).empty();
    let keys = ['01_Kesim', '02_Büküm', '03_Havşa', '04_Kaynak', '042_Hazirlik', '02_Büküm', '05_Hortum', '06_Paketleme', '06_PaketlemeDiğer','06_test',
        '07_Mercedes', '99_Proto', '09_Kaplama', '08_UçŞekil' ]
    let total = 0;
    console.log(list);

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
  <td>${element.finishTime.slice(0, -9)}</td>
    <td>${element.REject_Name}</td>
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
function GeDefectReportCount() {
    $('#selectRowCount-defectReport').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GeDefectReportCount,
        success: (number) => {
            $('#defectReportTableCount').text(number);
            $('#selectRowCount-defectReport').append(`
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
$('#selectRowCount-defectReport').on('change', () => {
    let selectedRowCount = $("#selectRowCount-defectReport option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForDefectReport.pageSize = selectedRowCount;
    requestQueryForDefectReport.pageNumber = 1;
    GetDefectReporttAjaxCall();
});


//year
$('#select-defectReport-year').on('change', () => {
    let selectedYear = $("#select-defectReport-year option:selected").val();
    requestQueryForDefectReport.year = selectedYear;
    requestQueryForDefectReport.pageNumber = 1;
    $(`${pageNumbers.defectReport}`).text(requestQueryForDefectReport.pageNumber);
    GetDefectReporttAjaxCall();
});

//month
$('#select-defectReport-month').on('change', () => {
    let selectedMonth = $("#select-defectReport-month option:selected").val();
    requestQueryForDefectReport.month = selectedMonth;
    requestQueryForDefectReport.pageNumber = 1;
    $(`${pageNumbers.defectReport}`).text(requestQueryForDefectReport.pageNumber);
    GetDefectReporttAjaxCall();
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.defectReport).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForDefectReport.pageNumber > 1) requestQueryForDefectReport.pageNumber -= 1;
    $(`${pageNumbers.defectReport}`).text(requestQueryForDefectReport.pageNumber);
    GetDefectReporttAjaxCall();
});
$(NextButtons.defectReport).on('click', (event) => {
    event.preventDefault();
    requestQueryForDefectReport.pageNumber += 1;
    $(`${pageNumbers.defectReport}`).text(requestQueryForDefectReport.pageNumber);
    GetDefectReporttAjaxCall();
});
//#endregion


//#region 
$('#btn-defectReport-resetSearch').click(() => {
    requestQueryForDefectReport.pageNumber = 1;
    requestQueryForDefectReport.pageSize = 6;
    requestQueryForDefectReport.year = "";
    requestQueryForDefectReport.month = "";
    $('#select-defectReport-year').val('');
    $('#select-defectReport-month').val('');
    $('#selectRowCount-defectReport').val("6");
    GetDefectReporttAjaxCall();
})
//#endregion









