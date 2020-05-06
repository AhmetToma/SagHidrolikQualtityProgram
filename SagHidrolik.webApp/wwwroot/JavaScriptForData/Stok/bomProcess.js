let requestQueryForBomProcessInStok = {
    stk: "",
    pid: "",
    pageSize: 10,
    pageNumber: 1
};

function GetBomProcessList(stk, pid) {
    requestQueryForBomProcessInStok.stk = `${stk}`;
    requestQueryForBomProcessInStok.pid = pid;
    requestQueryForBomProcessInStok.pageNumber = 1;
    requestQueryForBomProcessInStok.pageSize = 10;
    $(pageNumbers.stok_bomProcess).text(requestQueryForBomProcessInStok.pageNumber);
    GetBomProcessAjaxCall();
}
$('#next-table-bomProcess').on('click', (event) => {
    ShowLoader();
    event.preventDefault();
    event.stopImmediatePropagation();
    requestQueryForBomProcessInStok.pageNumber += 1;
    $(pageNumbers.stok_bomProcess).text(requestQueryForBomProcessInStok.pageNumber);

    GetBomProcessAjaxCall();

});
$('#previous-table-bomProcess').click((e) => {
    ShowLoader();
    e.preventDefault();
    e.stopImmediatePropagation;
    if (requestQueryForBomProcessInStok.pageNumber > 1)
        requestQueryForBomProcessInStok.pageNumber -= 1;
    $(pageNumbers.stok_bomProcess).text(requestQueryForBomProcessInStok.pageNumber);
    GetBomProcessAjaxCall();
});
function GetBomProcessAjaxCall() {
    if (requestQueryForBomProcessInStok.pageNumber === 1) {
        disableButton('#previous-table-bomProcess');
        ActiveButton('#next-table-bomProcess');
    }
    else {
        ActiveButton('#previous-table-bomProcess');
        ActiveButton('#next-table-bomProcess');
    }
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetBomProcessInStok,
        data: JSON.stringify(requestQueryForBomProcessInStok),
        success: (list) => {
            if (list.length !== 0) {

                $('#table-bomProcess').empty();
                CreateBomProcessTable(list, requestQueryForBomProcessInStok.stk);
                $(recordsNotFound.bomProcess).css('display', 'none');
            }
            else {
                disableButton('#next-table-bomProcess');
                ActiveButton('#previous-table-bomProcess');
                $('#table-bomProcess').empty();
                $(`${recordsNotFound.bomProcess} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.bomProcess).css('display', 'block');
               HideLoader();
            }
        }
    });
}
function CreateBomProcessTable(list, stk) {
    $('#table-bomProcess').empty();
    if (list !== null)
        list.map((element) => {
        let quality = "";
        element.quality ? quality = element.quality : quality = "";
        $('#table-bomProcess').append(`
<tr>
  <td>${element.prosesAdi}</td>
    <td>${element.qty}</td>
    <td>${quality} </td>
             </tr>
`);
    });
    HideLoader();
}


