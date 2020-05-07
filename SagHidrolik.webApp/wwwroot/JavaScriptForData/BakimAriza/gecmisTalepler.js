
$(function () {

    let dataUrl = "Home/BakimAriza";
    let BakimArizaUrl = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === BakimArizaUrl || window.location.href === serverUrl) {
        AllGecmisTaleplerAjaxCall();
    }
});
let requstQueryForGecmisTalepler = {
    pageNumber: 1,
    pageSize:5
}
function AllGecmisTaleplerAjaxCall() {
    $(TablesId.BakimAriza_gecmisTalepler).empty();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.BakimAriza_gecmisTalepler,
        data: JSON.stringify(requstQueryForGecmisTalepler),
        success: (list) => {
            if (list.length !== 0) {
         
                $('#recordNotFoundDiv_gecmisTalepler').css('display', 'none');
                CreateAllGecmisTaleplerTable(list, TablesId.BakimAriza_gecmisTalepler);
            }
            else {
                $(`#recordNotFoundDiv_gecmisTalepler h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $('#recordNotFoundDiv_gecmisTalepler').css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateAllGecmisTaleplerTable(list, tableId) {
    console.log(list);
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr   data-machineId ="${element.makina_ID}">
  <td>${element.machine_Name}</td>
    <td>${element.operator_Name}</td>
    <td>${element.planlananİslem} </td>
    <td>${element.baslamaSaat}</td>
    <td>${element.planlananTarih.slice(0,-11)}</td>
             </tr>
`);
    });
    HideLoader();
}


//#region Next-Previous Hanldler
$(PreviousButtons.bakimAriza_gecmisTalepler).on('click', (event) => {
    event.preventDefault();
    if (requstQueryForGecmisTalepler.pageNumber > 1) requstQueryForGecmisTalepler.pageNumber -= 1;
    $('#num-bakimArizaGecmisTalepler-pageNumber').text(requstQueryForGecmisTalepler.pageNumber);
    AllGecmisTaleplerAjaxCall();

});
$(NextButtons.bakimAriza_gecmisTalepler).on('click', (event) => {
    event.preventDefault();
    requstQueryForGecmisTalepler.pageNumber += 1;
    $('#num-bakimArizaGecmisTalepler-pageNumber').text(requstQueryForGecmisTalepler.pageNumber);
    AllGecmisTaleplerAjaxCall();
});
//#endregion