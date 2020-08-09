$(function () {
   
    let BakimArizaUrl = BaseUrl + "Home/UretimPlani";
    if (window.location.href === BakimArizaUrl) {
        GetAllUretimPlaniAjaxCall();
    }
});
let requestQueryForUretimPlani = {
    pageNumber: 1,
    pageSize: 10,
    Stk: "",
    uretimPlaniType:""
};

// #region Ajax Call And create All Uretim Plani 
function GetAllUretimPlaniAjaxCall() {
    requestQueryForUretimPlani.Stk = $(Inputs.uretimplani_searchByStk).val();
    ShowLoader();
    $(TablesId.UretimPlani_allUretimPlani).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.uretimPlani_GetAllUretimPlani,
        data: JSON.stringify(requestQueryForUretimPlani),
        success: (list) => {
            if (list.length !== 0) {
                $('#recordNotFoundDiv_bakimAriza_AllMachines').css('display', 'none');
                CreateAllUretimPlaniTable(list, TablesId.UretimPlani_allUretimPlani);
            }
            else {

                $(`#recordNotFoundDiv_bakimAriza_AllMachines h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $('#recordNotFoundDiv_bakimAriza_AllMachines').css('display', 'block');
                HideLoader();
            }
        }
    });
};
function CreateAllUretimPlaniTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr data-stk="${element.partNo}">
  <td>${element.processDate}</td>
    <td>${element.group}</td>
    <td>${element.prosesAdi} </td>
    <td>${element.partNo}</td>
    <td>${element.woLot}</td>
    <td>${element.remainProcessqty}</td>
    <td>${element.woNewDate}</td>
    <td>${element.balance}</td>
             </tr>
`);
    });
    HideLoader();
}
//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.uretimPlani_allUretimPlani).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForUretimPlani.pageNumber > 1) requestQueryForUretimPlani.pageNumber -= 1;
    $('#num-uretimPalni-pageNumber').text(requestQueryForUretimPlani.pageNumber);
    GetAllUretimPlaniAjaxCall();
});
$(NextButtons.uretimPlani_allUretimPlani).on('click', (event) => {
    event.preventDefault();
    requestQueryForUretimPlani.pageNumber += 1;
    $('#num-uretimPalni-pageNumber').text(requestQueryForUretimPlani.pageNumber);
    GetAllUretimPlaniAjaxCall();
});
//#endregion
// #region search
let uretimPlaniypingTimer;
let uretimPlanidoneTypingInterval = 500;
$(Inputs.uretimplani_searchByStk).keyup(function () {
 
    clearTimeout(uretimPlaniypingTimer);
    if ($(Inputs.uretimplani_searchByStk).val()) {
        requestQueryForUretimPlani.pageNumber = 1;
        $('#num-uretimPalni-pageNumber').text(requestQueryForUretimPlani.pageNumber);
        uretimPlaniypingTimer = setTimeout(SearchInAllUretimPlani, uretimPlanidoneTypingInterval);
    }
    else if ($(Inputs.uretimplani_searchByStk).val() === '') {
        requestQueryForUretimPlani.pageNumber = 1;
        requestQueryForUretimPlani.Stk = '';
        $('#num-uretimPalni-pageNumber').text(requestQueryForUretimPlani.pageNumber);
        GetAllUretimPlaniAjaxCall();
    }
});
//user is "finished typing," do something
function SearchInAllUretimPlani() {
    requestQueryForUretimPlani.Stk = $(Inputs.uretimplani_searchByStk).val();
    GetAllUretimPlaniAjaxCall();
}
// #endregion 
//#region Select uretim plani type And filter results

$("#select-uretimPlani-selectUretimPlaniType").change(function () {
    var selcteduretimPlaniType = $(this).children("option:selected").val();
    requestQueryForUretimPlani.uretimPlaniType = selcteduretimPlaniType;
    requestQueryForUretimPlani.pageNumber = 1;
    $('#num-uretimPalni-pageNumber').text(requestQueryForUretimPlani.pageNumber);
    GetAllUretimPlaniAjaxCall();
});
//#endregion
// #region reset 
$('#btn-uretimPlani-reset').click((event) => {
    event.preventDefault();
    $("#select-uretimPlani-selectUretimPlaniType").val('');
    $(Inputs.uretimplani_searchByStk).val('');
    requestQueryForUretimPlani.Stk = '';
    requestQueryForUretimPlani.uretimPlaniType = '';
    requestQueryForUretimPlani.pageNumber = 1;
    $('#num-uretimPalni-pageNumber').text(requestQueryForUretimPlani.pageNumber);
    GetAllUretimPlaniAjaxCall();
});

//#endregion