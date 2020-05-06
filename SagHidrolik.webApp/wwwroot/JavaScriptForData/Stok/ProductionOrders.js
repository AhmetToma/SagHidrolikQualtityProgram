let requstQueryForProductOrders = {
    pageNumber: 1,
    pageSize: 10,
    stk: "",
    pid: ""
};
function GetProductionOrders(stk, pId) {
    requstQueryForProductOrders.stk = `${stk}`;
    requstQueryForProductOrders.pid = pId;
    requstQueryForProductOrders.pageNumber = 1;
    requstQueryForProductOrders.pageSize = 10;
    $(pageNumbers.stok_prodcutionOrders).text(requstQueryForProductOrders.pageNumber);
    getproductOrdersAjaxCall(TablesId.productionOrdersInStok, recordsNotFound.productionOrders);
}
$('#next-table-StokDetailsFirst').on('click', (event) => {

    event.preventDefault();
    nextProductionOrders();
    $(pageNumbers.stok_prodcutionOrders).text(requstQueryForProductOrders.pageNumber);
    getproductOrdersAjaxCall(TablesId.productionOrdersInStok, recordsNotFound.productionOrders);
});
$('#previous-table-StokDetailsFirst').click((e) => {
    e.preventDefault();
    previousProductionOrders();
    $(pageNumbers.stok_prodcutionOrders).text(requstQueryForProductOrders.pageNumber);
    getproductOrdersAjaxCall(TablesId.productionOrdersInStok, recordsNotFound.productionOrders);
});
function getproductOrdersAjaxCall(tableId, notFoundId) {



    if (requestQueryForBomProcessInStok.pageNumber === 1) {
        disableButton('#previous-table-StokDetailsFirst');
        ActiveButton('#next-table-StokDetailsFirst');
    }
    else {
        ActiveButton('#previous-table-StokDetailsFirst');
        ActiveButton('#next-table-StokDetailsFirst');
    }


    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProductOrdersByStokgenId,
        data: JSON.stringify(requstQueryForProductOrders),
        success: (list) => {
            if (list.length !== 0) {
                console.log(list);
                HideRecodNotFound(notFoundId);
                $(`${tableId}`).empty();
                CreateProdcutOrderTable(list, tableId, notFoundId);
            }
            else {
                disableButton('#next-table-StokDetailsFirst');
                ActiveButton('#previous-table-StokDetailsFirst');
                $(`${tableId}`).empty();
                HideLoader();
                ShowRecodNotFound(notFoundId);
            }
        }
    });
}
function CreateProdcutOrderTable(list, tableId, notFoundId) {

    if (list !== null) list.map((element, index) => {
      
        let closeDate = "";
        let issueDate = "";
        let requireDate = "";
        let revisedDate = "";
        let completedQty = "";
        let remark = "";
        let status = "";
        element.closeDate ? closeDate = element.closeDate.slice(0, 10) : closeDate = "";
        element.issueDate ? issueDate = element.issueDate.slice(0, 10) : issueDate = "";
        element.requireDate ? requireDate = element.requireDate.slice(0, 10) : requireDate = "";
        element.revisedDate ? revisedDate = element.revisedDate.slice(0, 10) : revisedDate = "";
        element.completed_Qty ? completedQty = element.completed_Qty : completedQty = "";
        element.remark ? remark = element.remark : remark = "";
        if (element.status) {
            if (element.status === 1) status = 'açık';
            if (element.status === 2) status = 'üretimde';
            if (element.status === 3) status = 'kapalı';
        }
      
        $(`${tableId}`).append(`
<tr data-lotNo="${element.lotNo}" data-stk="${requstQueryForProductOrders.stk}" data-productOrderId="${element.productOrderId}" >
  <td>${requstQueryForProductOrders.stk}</td>
    <td>${element.lotNo}</td>
    <td>${element.qty} </td>
<td> ${completedQty}</td>
    <td>${status} </td>
    <td style="font-size:13px"> ${issueDate } </td>
    <td style="font-size:13px"> ${requireDate } </td>
    <td style="font-size:13px"> ${revisedDate } </td>
    <td> ${remark } </td>
    <td style="font-size:13px"> ${closeDate } </td>
`);
    });
   HideLoader();
    HideRecodNotFound(notFoundId);
}

function previousProductionOrders() {
    ShowLoader();
    if (requstQueryForProductOrders.pageNumber > 1)
        requstQueryForProductOrders.pageNumber -= 1;
}
function nextProductionOrders() {
    ShowLoader();
    requstQueryForProductOrders.pageNumber += 1;
}


