$('#Rework-tab').click((e) => {
    e.preventDefault();
    GetReworkReportAjaxCall();
    GeReworkReportCount();
})
let requestQueryForReworkReport = {
    pageSize: 6,
    pageNumber: 1,
    year: "",
    month:""
};

// #region ajaxcall ,create table ,records count  
function GetReworkReportAjaxCall() {
    if (requestQueryForReworkReport.pageNumber === 1) {
        disableButton(PreviousButtons.reworkReport);
        ActiveButton(NextButtons.reworkReport);
    }
    else {
        ActiveButton(PreviousButtons.reworkReport);
        ActiveButton(NextButtons.reworkReport);
    }
    $(TablesId.reworkReport).empty();
    $(`${pageNumbers.reworkReport}`).text(requestQueryForReworkReport.pageNumber);
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetReworkReport,
        data: JSON.stringify(requestQueryForReworkReport),
        success: (list) => {
            if (list.length !== 0) {
                console.log(list);
                $(`${recordsNotFound.reworkReport}`).css('display', 'none');
             CreateReworkReportTable(list, TablesId.reworkReport);
            }
            else {
                $(TablesId.reworkReport).empty();
                disableButton(NextButtons.reworkReport);
                $(`${recordsNotFound.reworkReport}`).css('display', 'block');
                HideLoader();
            }
        },
        error: () => {
            alert('err');
        }
    });
}
function CreateReworkReportTable(list, tableId) {
    $(tableId).empty();
    let keys = ['Basınç Testi', 'Basınç Testi 1', 'Büküm', 'Çinko Kaplama', 'Etiketleme', 'Fikstür Kontrol', 'Hortum Sıkma', 'Hortum Üretim', 'Markalama','Paketleme',
        'Sızdırmazlık', 'Kaynağı' ]
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
    <td>${element.Reject_Code}</td>
    <td>${total}</td>
  <td>${element[keys[0]] ? element[keys[0]] :""} </td>
  <td>${element[keys[1]] ? element[keys[1]] :""} </td>
  <td>${element[keys[2]] ? element[keys[2]] :""} </td>
  <td>${element[keys[3]] ? element[keys[3]] :""} </td>
  <td>${element[keys[4]] ? element[keys[4]] :""} </td>
  <td>${element[keys[5]] ? element[keys[5]] :""} </td>
  <td>${element[keys[6]] ? element[keys[6]] :""} </td>
  <td>${element[keys[7]] ? element[keys[7]] :""} </td>
  <td>${element[keys[8]] ? element[keys[8]] : ""} </td>
  <td>${element[keys[9]] ? element[keys[9]] : ""} </td>
  <td>${element[keys[10]] ? element[keys[10]] : ""} </td>
  <td>${element[keys[11]] ? element[keys[11]] : ""} </td>

             </tr>
`);
            total = 0;
        }

    });
    HideLoader();
}
function GeReworkReportCount() {
    $('#selectRowCount-reworkReport').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetReworkReportCount,
        success: (number) => {
            $('#reworkReportTableCount').text(number);
            $('#selectRowCount-reworkReport').append(`
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
$('#selectRowCount-reworkReport').on('change', () => {
    let selectedRowCount = $("#selectRowCount-reworkReport option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForReworkReport.pageSize = selectedRowCount;
    requestQueryForReworkReport.pageNumber = 1;
    GetReworkReportAjaxCall();
});


//year
$('#select-reworkReport-year').on('change', () => {
    let selectedYear = $("#select-reworkReport-year option:selected").val();
    requestQueryForReworkReport.year = selectedYear;
    requestQueryForReworkReport.pageNumber = 1;
    $(`${pageNumbers.reworkReport}`).text(requestQueryForReworkReport.pageNumber);
    GetReworkReportAjaxCall();
});

//month
$('#select-reworkReport-month').on('change', () => {
    let selectedMonth = $("#select-reworkReport-month option:selected").val();
    requestQueryForReworkReport.month = selectedMonth;
    requestQueryForReworkReport.pageNumber = 1;
    $(`${pageNumbers.reworkReport}`).text(requestQueryForReworkReport.pageNumber);
    GetReworkReportAjaxCall();
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.reworkReport).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForReworkReport.pageNumber > 1) requestQueryForReworkReport.pageNumber -= 1;
    $(`${pageNumbers.reworkReport}`).text(requestQueryForReworkReport.pageNumber);
    GetReworkReportAjaxCall();
});
$(NextButtons.reworkReport).on('click', (event) => {
    event.preventDefault();
    requestQueryForReworkReport.pageNumber += 1;
    $(`${pageNumbers.reworkReport}`).text(requestQueryForReworkReport.pageNumber);
    GetReworkReportAjaxCall();
});
//#endregion


//#region 
$('#btn-reworkReport-resetSearch').click(() => {
    requestQueryForReworkReport.pageNumber = 1;
    requestQueryForReworkReport.pageSize = 6;
    requestQueryForReworkReport.year = "";
    requestQueryForReworkReport.month = "";
    $('#select-reworkReport-year').val('');
    $('#select-reworkReport-month').val('');
    $('#selectRowCount-reworkReport').val("6");
    GetReworkReportAjaxCall();
})
//#endregion









