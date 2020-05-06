let requestQueryForStokAlt = {
    stk: "",
    pid: "",
    pageSize: 10,
    pageNumber: 1
};

function getStokDetailsSecondTable(stk, pId) {
    requestQueryForStokAlt.stk = `${stk}`;
    requestQueryForStokAlt.pid = pId;
    requestQueryForStokAlt.pageNumber = 1;
    requestQueryForStokAlt.pageSize = 10;
    $(pageNumbers.stok_stokAlt).text(requestQueryForStokAlt.pageNumber);
    GetAltStokAjaxCall();
}
$('#next-table-StokDetailsSecond').on('click', (event) => {
    ShowLoader();
    event.preventDefault();
    requestQueryForStokAlt.pageNumber += 1;
    $(pageNumbers.stok_stokAlt).text(requestQueryForStokAlt.pageNumber);

    GetAltStokAjaxCall();

});
$('#previous-table-StokDetailsSecond').click((e) => {
    ShowLoader();
    e.preventDefault();
    if (requestQueryForStokAlt.pageNumber > 1)
        requestQueryForStokAlt.pageNumber -= 1;
    $(pageNumbers.stok_stokAlt).text(requestQueryForStokAlt.pageNumber);
    GetAltStokAjaxCall();

});
function GetAltStokAjaxCall() {

    if (requestQueryForBomProcessInStok.pageNumber === 1) {
        disableButton('#previous-table-StokDetailsSecond');
        ActiveButton('#next-table-StokDetailsSecond');
    }
    else {
        ActiveButton('#previous-table-StokDetailsSecond');
        ActiveButton('#next-table-StokDetailsSecond');
    }
    HideRecodNotFound("recordNotFoundDiv_altStok");
    $('#table-altStok').empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllStokAlt,
        data: JSON.stringify(requestQueryForStokAlt),
        success: (list) => {
         
            if (list.length !== 0) {
                $('#table-altStok').empty();
                let mylist = list;
                let z = mylist.filter((element) => {
                    let t = new Date(element.tarih);
                    let m = (t.getMonth() + 1);
                    let mymonth = 7;
                    if (mymonth === m)
                      return element;
                });
                console.log(z);
                list.map((element, index) => {
                    let lotNo = "";
                    let tarih = new Date(element.tarih);
                    element.tarih ? tarih = tarih.toLocaleString("en-GB").slice(0, -10) : tarih = "";
                    element.lotno ? lotNo = element.lotno : lotNo = "";
                    $('#table-altStok').append(`
<tr>
   <td>${tarih}</td>
    <td>${element.turac} </td>
<td>${element.toplam}
    <td> ${lotNo} </td>
 

             </tr>
`);
                });
                HideLoader();
                $(recordsNotFound.altStok).css('display', 'none');
            }
            else {
                disableButton('#next-table-StokDetailsSecond');
                ActiveButton('#previous-table-StokDetailsSecond');
                $('#table-altStok').empty();
                $(`${recordsNotFound.altStok} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.altStok).css('display', 'block');
                HideLoader();
            }
}
});
}


//<td>${tarih[0]}/ ${tarih[1]}/${tarih[2]}</td>