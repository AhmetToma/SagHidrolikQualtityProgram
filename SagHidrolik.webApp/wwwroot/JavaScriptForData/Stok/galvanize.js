
let requestQueryForGalvanize = {
    pageNumber: 1,
    pageSize: 10,
    stk: "",
    pid: ""
};


function GetGalvanize(stk) {
    requestQueryForGalvanize.stk = `${stk}`;
    requestQueryForGalvanize.pageNumber = 1;
    requestQueryForGalvanize.pageSize = 10;
    requestQueryForGalvanize.pid = "";
    $(pageNumbers.stok_galvanize).text(requestQueryForGalvanize.pageNumber);
    GetGalvanizeAjaxCall();
}
$('#next-table-StokDetailsGalvanize').on('click', (event) => {
    ShowLoader();
    event.preventDefault();
    event.stopImmediatePropagation();
    requestQueryForGalvanize.pageNumber += 1;
    $(pageNumbers.stok_galvanize).text(requestQueryForGalvanize.pageNumber);

    GetGalvanizeAjaxCall();
    
});
$('#previous-table-StokDetailsGalvanize').click((e) => {
    ShowLoader();
    e.preventDefault();
    if (requestQueryForGalvanize.pageNumber > 1)
        requestQueryForGalvanize.pageNumber -= 1;
    $(pageNumbers.stok_galvanize).text(requestQueryForGalvanize.pageNumber);
    GetGalvanizeAjaxCall();
});
function GetGalvanizeAjaxCall() {
    if (requestQueryForBomProcessInStok.pageNumber === 1) {
        disableButton('#previous-table-StokDetailsGalvanize');
        ActiveButton('#next-table-StokDetailsGalvanize');
    }
    else {
        ActiveButton('#previous-table-StokDetailsGalvanize');
        ActiveButton('#next-table-StokDetailsGalvanize');
    }

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetGalvanize,
        data: JSON.stringify(requestQueryForGalvanize),
        success: (list) => {
            if (list.length !== 0) {
                $(recordsNotFound.galvanize).css('display', 'none');
                $('#table-Galvanize').empty();
                CreateGalvanizeTable(list, requestQueryForGalvanize.stk);
            }
            else {
                disableButton('#next-table-StokDetailsGalvanize');
                ActiveButton('#previous-table-StokDetailsGalvanize');
                $('#table-Galvanize').empty();
                HideLoader();
                $(`${recordsNotFound.galvanize} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.galvanize).css('display', 'block');
            }
        }
    });
}
function CreateGalvanizeTable(list, stk) {
    $('#table-Galvanize').empty();
    if (list !== null) list.map((element, index) => {
        let tarih = "";
        let lotNo = "";
        element.tarih ? tarih = element.tarih.slice(0, -9) : tarih = "";
        element.lotno ? lotNo = element.lotno : lotNo = "";
        $('#table-Galvanize').append(`
<tr>
<td>${element.stk} </td >
    <td>${tarih}</td>
    <td>${element.turac} </td>
<td> ${element.miktar}</td>
             </tr>
`);
    });
    HideLoader();

}


