$(function () {

    let b = BaseUrl + "Home/TTFTeslimat";
    if (window.location.href === b) {
        GetTeslimatDurumuAjaxCall();
        GetTeslimatDurumuCount();

    }
});
let requestQueryForTeslimatDurumu = {
    pageNumber: 1,
    pageSize: 6,
    Stk: "",
};

// #region Ajax Call And create  table
function GetTeslimatDurumuAjaxCall() {
    requestQueryForTeslimatDurumu.Stk = $(Inputs.teslimatDurumu_searchStk).val();
    ShowLoader();
    $(TablesId.teslimatDurumu).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetTeslimatDurumu,
        data: JSON.stringify(requestQueryForTeslimatDurumu),
        success: (list) => {
            if (list.length !== 0) {
                $('#recordNotFoundDiv_teslimatDurumu').css('display', 'none');
                console.log('teslim', list);
                CreateTeslimatDurumu(list, TablesId.teslimatDurumu);
            }
            else {
                $(`#recordNotFoundDiv_teslimatDurumu h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $('#recordNotFoundDiv_teslimatDurumu').css('display', 'block');
                HideLoader();
            }
        }
    });
};
function CreateTeslimatDurumu(list, tableId) {

    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr id="t${index}" >
    <td>${element.urunKodu}</td>
    <td>${element.siparisBlturu}</td>
    <td>${element.sprsblgno} </td>
    <td>${element.klmno}</td>
    <td>${element.mstrlok}</td>
    <td>${element.olcuBirimi}</td>
    <td>${element.gondtrh.slice(0,-11)}</td>
             </tr>
`);
    });
    HideLoader();
}
function GetTeslimatDurumuCount() {
    $('#select-teslimatDurumu-selectRowCount').empty();
    $.getJSON(`${HttpUrls.GetTeslimatDurumuCount}`, function (num) {
        $('#select-teslimatDurumu-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="${num}">(${num}) All Records</option>

`);
        $('#span-teslimatDurumu-rowCount').text(num)
    })
}

$('#select-teslimatDurumu-selectRowCount').on('change', () => {
    requestQueryForTeslimatDurumu.pageSize = parseInt($('#select-teslimatDurumu-selectRowCount').val());
    requestQueryForTeslimatDurumu.pageNumber = 1;
    $('#num-teslimatDurumu-pageNumber').text(requestQueryForTeslimatDurumu.pageNumber);
    GetTeslimatDurumuAjaxCall();
});
//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.teslimatDurumu).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForTeslimatDurumu.pageNumber > 1) requestQueryForTeslimatDurumu.pageNumber -= 1;
    $('#num-teslimatDurumu-pageNumber').text(requestQueryForTeslimatDurumu.pageNumber);
    GetTeslimatDurumuAjaxCall();
});
$(NextButtons.teslimatDurumu).on('click', (event) => {
    event.preventDefault();
    requestQueryForTeslimatDurumu.pageNumber += 1;
    $('#num-teslimatDurumu-pageNumber').text(requestQueryForTeslimatDurumu.pageNumber);
    GetTeslimatDurumuAjaxCall();
});
//#endregion
// #region search
$(Inputs.teslimatDurumu_searchStk).keyup(function () {
    clearTimeout(timer);
        requestQueryForTeslimatDurumu.pageNumber = 1;
    $('#num-teslimatDurumu-pageNumber').text(requestQueryForTeslimatDurumu.pageNumber);
    timer = setTimeout(GetTeslimatDurumuAjaxCall, doneTypingInterval);
});
// #endregion 
// #region reset 
$('#btn-teslimatDurumu-reset').click((event) => {
    event.preventDefault();
    $(Inputs.teslimatDurumu_searchStk).val('');
    requestQueryForTeslimatDurumu.Stk = '';
    requestQueryForTeslimatDurumu.pageNumber = 1;
    requestQueryForTeslimatDurumu.pageSize = 6;
    $('#select-teslimatDurumu-selectRowCount').val('6');
    $('#num-teslimatDurumu-pageNumber').text(requestQueryForTeslimatDurumu.pageNumber);
    GetTeslimatDurumuAjaxCall();
});

//#endregion