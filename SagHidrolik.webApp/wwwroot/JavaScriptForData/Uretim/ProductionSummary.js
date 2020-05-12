$(function () {

    let b = BaseUrl + "Home/ProductionSummary";
    if (window.location.href === b) {
        GetProductionSummaryCount();
        GetStkList();
    }
});

let requestQueryProductionSummary = {
    pageNumber: 1,
    pageSize: 6,
    Stk: "",
};
let stkList = [];

// #region Ajax Call And create  table
function GetStkList() {
    ShowLoader();
    let searchStk = $(Inputs.ProductionSummary_searchStk).val();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(searchStk),
        url: HttpUrls.getStokByStk,
        success: (list) => {
            stkList = list;
            GetProductionSummaryAjaxCall();
        }
    });

}
function GetProductionSummaryAjaxCall() {
    if (requestQueryProductionSummary.pageNumber === 1) {
        disableButton(PreviousButtons.productionSummary);
        ActiveButton(NextButtons.productionSummary);
    }
    else {
        ActiveButton(PreviousButtons.productionSummary);
        ActiveButton(NextButtons.productionSummary);
    }

    requestQueryProductionSummary.Stk = $(Inputs.ProductionSummary_searchStk).val();
    ShowLoader();
    $(TablesId.productionSummary).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProductionSummaryReport,
        data: JSON.stringify(requestQueryProductionSummary),
        success: (list) => {
            if (list.length !== 0) {
                $('#recordNotFoundDiv_productionSummary').css('display', 'none');
                console.log('Reprot', list);
                CreateProducttionSummaryTable(list, TablesId.productionSummary);
            }
            else {
                disableButton(NextButtons.productionSummary);
                $(`#recordNotFoundDiv_productionSummary h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $('#recordNotFoundDiv_productionSummary').css('display', 'block');
                HideLoader();
            }
        }
    });
};
function CreateProducttionSummaryTable(list, tableId) {
    $(tableId).empty();
    let keys = ['01_Kesim', '02_Büküm', '03_Havşa', '04_Kaynak', '042_Hazirlik', '02_Büküm', '05_Hortum', '06_Paketleme', '06_PaketlemeDiğer', '06_test',
        '07_Mercedes', '99_Proto', '09_Kaplama', '08_UçŞekil']
    let total = 0;
    let withStk = "";

    list.map((element, index) => {
        if (element.PartNo_ID != null) {

            for (var i = 0; i < keys.length; i++) {

                if (element[keys[i]] != null && element[keys[i]] != "") {
                    total = total + element[keys[i]];
                }
                else element[keys[i]] = "";
            }


            withStk = stkList.filter((item) => {
                return element.PartNo_ID == item.p_ID;
            })
            $(tableId).append(`
<tr >
  <td>${withStk[0].stk}</td>
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
function GetProductionSummaryCount() {

    $('#selectRowCount-productionSummary').empty();
    $.getJSON(`${HttpUrls.GetProductionSummaryCount}`, function (num) {
        $('#selectRowCount-productionSummary').append(`
               <option selected value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="${num}">(${num}) All Records</option>

`);
        $('#span-productionSummary-rowCount').text(num);

    })

}

$('#selectRowCount-productionSummary').on('change', () => {
    requestQueryProductionSummary.pageSize = parseInt($('#selectRowCount-productionSummary option:selected').val());
    requestQueryProductionSummary.pageNumber = 1;
    $('#num-productionSummary-pageNumber').text(requestQueryProductionSummary.pageNumber);

    console.log(requestQueryProductionSummary);
    GetProductionSummaryAjaxCall();
});
//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.productionSummary).on('click', (event) => {
    event.preventDefault();
    if (requestQueryProductionSummary.pageNumber > 1) requestQueryProductionSummary.pageNumber -= 1;
    $('#number-productionSummary-pageNumber').text(requestQueryProductionSummary.pageNumber);
    GetProductionSummaryAjaxCall();
});
$(NextButtons.productionSummary).on('click', (event) => {
    event.preventDefault();
    requestQueryProductionSummary.pageNumber += 1;
    $('#number-productionSummary-pageNumber').text(requestQueryProductionSummary.pageNumber);
    GetProductionSummaryAjaxCall();
});
//#endregion
// #region search

$(Inputs.ProductionSummary_searchStk).keyup(function () {

    clearTimeout(uretimPlaniypingTimer);
    requestQueryProductionSummary.pageNumber = 1;
    $('#number-productionSummary-pageNumber').text(requestQueryProductionSummary.pageNumber);
    uretimPlaniypingTimer = setTimeout(GetProductionSummaryAjaxCall, uretimPlanidoneTypingInterval);
});
//user is "finished typing," do something

// #endregion 
// #region reset 
$('#btn-productionSummary-reset').click((event) => {
    event.preventDefault();
    $(Inputs.ProductionSummary_searchStk).val('');
    requestQueryProductionSummary.Stk = '';
    requestQueryProductionSummary.pageNumber = 1;
    requestQueryProductionSummary.pageSize = 6;
    $('#selectRowCount-productionSummary').val('6');
    $('#number-productionSummary-pageNumber').text(requestQueryProductionSummary.pageNumber);
    GetProductionSummaryAjaxCall();
});

//#endregion


