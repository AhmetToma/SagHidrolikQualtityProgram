let requestQueryForStokRecetesi = {
    stk: "",
    pid: "",
    pageSize: 10,
    pageNumber: 1
};
function getStokRecetesi(stk,pid) {
    requestQueryForStokRecetesi.stk = `${stk}`;
    requestQueryForStokRecetesi.pid = pid;
    requestQueryForStokRecetesi.pageNumber = 1;
    requestQueryForStokRecetesi.pageSize = 10;
    $(pageNumbers.stok_stokRecetesi).text(requestQueryForStokRecetesi.pageNumber);
    GetstokRecetsiAjaxCall();
}
$('#next-table-stokRecetesi').on('click', (event) => {
    ShowLoader();
    event.preventDefault();
    event.stopImmediatePropagation();
    requestQueryForStokRecetesi.pageNumber += 1;
    $(pageNumbers.stok_stokRecetesi).text(requestQueryForStokRecetesi.pageNumber);
    GetstokRecetsiAjaxCall();
});
$('#previous-table-stokRecetesi').click((e) => {
 ShowLoader();
    e.preventDefault();
    e.stopImmediatePropagation;

    if (requestQueryForStokRecetesi.pageNumber > 1)
        requestQueryForStokRecetesi.pageNumber -= 1;
    $(pageNumbers.stok_stokRecetesi).text(requestQueryForStokRecetesi.pageNumber);
    GetstokRecetsiAjaxCall();
});
function GetstokRecetsiAjaxCall() {
    if (requestQueryForBomProcessInStok.pageNumber === 1) {
        disableButton('#previous-table-stokRecetesi');
        ActiveButton('#next-table-stokRecetesi');
    }
    else {
        ActiveButton('#previous-table-stokRecetesi');
        ActiveButton('#next-table-stokRecetesi');
    }
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetStokRecetesi,
        data: JSON.stringify(requestQueryForStokRecetesi),
        success: (list) => {

            if (list.length !== 0) {
                $('#table-stokRecetesi').empty();
                console.log('hereee', list);
                CreateAltStokTable(list, requestQueryForStokRecetesi.stk);
                $(recordsNotFound.stokRecetesi).css('display', 'none');

            }
            else {
                disableButton('#next-table-stokRecetesi');
                ActiveButton('#previous-table-stokRecetesi');
                $('#table-stokRecetesi').empty();
                HideLoader();
                $(`${recordsNotFound.stokRecetesi} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.stokRecetesi).css('display', 'block');
            }
        },
        error: (er) => {
            console.log(er);
        }
    });
}
function CreateAltStokTable(list, stk) {
    $('#table-stokRecetesi').empty();
    if (list !== null) list.map((element, index) => {
        let tarih = "";
        let lotNo = "";
        element.tarih ? tarih = element.tarih.slice(0, 10) : tarih = "";
        element.lotno ? lotNo = element.lotno : lotNo = "";
        $('#table-stokRecetesi').append(`
<tr>
  <td>${element.stk}</td>
    <td>${element.sta}</td>
    <td>${element.stb} </td>
<td> ${element.miktar}</td>
    <td>${element.stoktur} </td>
             </tr>
`);
    });
    HideLoader();
}


