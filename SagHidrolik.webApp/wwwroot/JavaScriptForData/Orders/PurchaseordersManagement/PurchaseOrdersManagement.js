$('#btn-purchaseOrderMangemnet-getAllPurchase').click(() => {
    ShowLoader();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllPurchaseOrders,
        success: (list) => {
            $('#span-purchaseOrderMangemnet-toplamRows').text(list.length);
            CreatePurchaseOrdersTable(list, TablesId.purchaseOrderMangemnet);
        }
    });
})
$(function () {

    let b = BaseUrl + "Home/PurchaseOrderMangement";
    if (window.location.href === b) {
        if ($('body').hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
            $('body').toggleClass('nav-md nav-sm');
            $('.dataTable').each(function () { $(this).dataTable().fnDraw(); });
        }
    }
});
function CreatePurchaseOrdersTable(list, tableId) {
    $(tableId).empty();
    list.map(element => {
        $(tableId).append(`
<tr>
<td>${element.stk}</td>
<td>${element.sta}</td>
<td>${element.requireDate}</td>
<td>${element.remainQty}</td>
</tr>
`);
    });
    HideLoader();
}

$('#btn-purchaseOrderMangemnet-deletePurchasOrdersTable').click(e => {
    e.preventDefault();
    $(TablesId.purchaseOrderMangemnet).empty();
})

//#region Export to Excel
$('#btn-purchaseOrderMangemnet-exportToExcel').click((e) => {
    const ws = XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('table-purchaseOrderMangemnet-xls'));
    const wb = XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Purchase Orders');
    XLSX.writeFile(wb, 'Purchase Orders.xlsx');
})
//#endregion