//  #region start Arama
let processDetailsModel = {
    stk: '',
    p_id: "",
    lotNo: '',
    paketlemeTarihi: today,
    etiketAdet: '',
    paketlemMiktari: ''
};

let requestQueryForProcessFLow = {
    pageNumber: 1,
    pageSize: 6,
    ProductOrderId:0,
};
let requestQueryForProcessFLowDetails = {
    pageNumber: 1,
    pageSize: 6,
    ProductOrderId: 0,
};

$('#inp-processDetails-inputSearch').keyup(function () {
    //$('.urunEtiketiProdcutionOrders').css('opacity', '0');
    //$('#myTabContent').css('opacity', '0');
    //$('.urunImage').css('opacity', '0');
    clearTimeout(timer);
    ResetProcessDetails();
    if ($('#inp-processDetails-inputSearch').val()) {
        timer = setTimeout(SearchInProcessDetails, doneTypingInterval);
    }
    else if ($('#inp-processDetails-inputSearch').val() === '') {
        $(TablesId.processDetails_searchStk).empty();
    }

});
function SearchInProcessDetails() {
    let searchValue = $('#inp-processDetails-inputSearch');
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(searchValue.val()),
        url: HttpUrls.getStokByStk,
        success: (list) => {
            creatStokgenTable(list, TablesId.processDetails_searchStk);
        }
    });
    ShowLoader();
}

$(TablesId.processDetails_searchStk).on('click', 'tr', function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $('.container-setUp').offset().top
    }, 500);
    ResetProcessDetails()
    ShowLoader();
    //$('.urunEtiketiProdcutionOrders').css('opacity', '1');
    let stk = $(this).data('id');
    let pid = $(this).data('p_id');
    processDetailsModel.stk = stk;
    processDetailsModel.p_id = pid;
    requstQueryForProductOrders.stk = stk.toString();
    requstQueryForProductOrders.pid = pid.toString();
    requstQueryForProductOrders.pageSize = 6;
    requstQueryForProductOrders.pageNumber = 1;
    $('#number-processDetails-ProductionOrders').text(requstQueryForProductOrders.pageNumber);
    $(TablesId.processDetails_processFlow).empty();
    $(TablesId.processDetails_processFlowDetails).empty();
    getproductOrdersAjaxCall(TablesId.processDetails_ProductionOrders, recordsNotFound.processDetails_procutionOrders);
    HideLoader();
});
//#endregion end  Arama 

//#region productionOrders

$('#btn-processDetails-previous').click((event) => {

    event.preventDefault();
    previousProductionOrders();
    $('#number-processDetails-ProductionOrders').text(requstQueryForProductOrders.pageNumber);
    getproductOrdersAjaxCall(TablesId.processDetails_ProductionOrders, recordsNotFound.processDetails_procutionOrders);
});
$('#btn-processDetails-next').click((event) => {
    event.preventDefault();
    nextProductionOrders();
    $('#number-processDetails-ProductionOrders').text(requstQueryForProductOrders.pageNumber);
    getproductOrdersAjaxCall(TablesId.processDetails_ProductionOrders, recordsNotFound.processDetails_procutionOrders);
});
$(TablesId.processDetails_ProductionOrders).on('click', 'tr', function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#urunEtiket-scroll").offset().top
    }, 700);
    ShowLoader();
    requestQueryForProcessFLow.ProductOrderId = parseInt($(this).data('productorderid'));
    requestQueryForProcessFLowDetails.ProductOrderId = parseInt($(this).data('productorderid'));
    GetProcessFlowInProcessDetailsAjaxCall(TablesId.processDetails_processFlow, recordsNotFound.processDetails_processFlow);
    GetProcessFlowDetailsInProcessDetailsAjaxCall(TablesId.processDetails_processFlowDetails, recordsNotFound.processDetails_processFlowDetails);

});
//#endregion


// #region Process Flow 
function GetProcessFlowInProcessDetailsAjaxCall(tableId, notFoundId) {
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcessFlowInProcessDetails,
        data: JSON.stringify(requestQueryForProcessFLow),
        success: (list) => {

            if (list.length !== 0) {
                console.log('flow',list);
                HideRecodNotFound(notFoundId);
                $(`${tableId}`).empty();
             CreateProcessFlowTable(list, tableId, notFoundId);
            }
            else {
                $(`${tableId}`).empty();
                HideLoader();
                ShowRecodNotFound(notFoundId);
            }
        }
    });
}
function CreateProcessFlowTable(list, tableId, notFoundId) {

    if (list !== null) list.map((element, index) => {
        $(`${tableId}`).append(`
<tr data-flowId="${element.flow_ID}">
  <td>${element.flow_ID}</td>
    <td>${element.productOrder_ID}</td>
    <td>${element.prosesAdi} </td>
<td> ${element.process_qty}</td>
    <td>${element.ok_Qty} </td>
    <td style="font-size:13px"> ${element.process_reject} </td>
    <td style="font-size:13px"> ${element.process_Rework} </td>
    <td style="font-size:13px"> ${element.order_no} </td>
`);
    });
    HideLoader();
    HideRecodNotFound(notFoundId);
}



$('#btn-processDetails-processFlow-previous').click((event) => {

    event.preventDefault();
    if (requestQueryForProcessFLow.pageNumber > 1)
        requestQueryForProcessFLow.pageNumber -= 1;
    $('#number-processDetails-processFlow-pageNumber').text(requestQueryForProcessFLow.pageNumber);
    GetProcessFlowInProcessDetailsAjaxCall(TablesId.processDetails_processFlow, recordsNotFound.processDetails_processFlow);
});
$('#btn-processDetails-processFlow-next').click((event) => {
    event.preventDefault();
    requestQueryForProcessFLow.pageNumber += 1;
    $('#number-processDetails-processFlow-pageNumber').text(requestQueryForProcessFLow.pageNumber);
    GetProcessFlowInProcessDetailsAjaxCall(TablesId.processDetails_processFlow, recordsNotFound.processDetails_processFlow);
});
//#endregion

// #region Process Flow  Details
function GetProcessFlowDetailsInProcessDetailsAjaxCall(tableId, notFoundId) {
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcessFlowDetailsInProcessDetails,
        data: JSON.stringify(requestQueryForProcessFLowDetails),
        success: (list) => {
            if (list.length !== 0) {
                console.log('detail', list);
                HideRecodNotFound(notFoundId);
                $(`${tableId}`).empty();
             CreateProcessFlowDetailsTable(list, tableId, notFoundId);
            }
            else {
                $(`${tableId}`).empty();
                HideLoader();
                ShowRecodNotFound(notFoundId);
            }
        }
    });
}
function CreateProcessFlowDetailsTable(list, tableId, notFoundId) {

    if (list !== null) list.map((element, index) => {
        $(`${tableId}`).append(`
<tr>
  <td>${element.start_time.slice(0, -11)}</td>
  <td>${element.finishTime.slice(0, -11)}</td>
    <td>${element.np_time} </td>
    <td>${element.ok_Qty} </td>
<td> ${element.machine_no}</td>
    <td>${element.operator_Name} </td>
`);
    });
    HideLoader();
    HideRecodNotFound(notFoundId);
}



$('#btn-processDetails-processFlowDetails-previous').click((event) => {
    event.preventDefault();
    if (requestQueryForProcessFLowDetails.pageNumber > 1)
        requestQueryForProcessFLowDetails.pageNumber -= 1;
    $('#number-processDetails-processFlowDetails-pageNumber').text(requestQueryForProcessFLowDetails.pageNumber);
    GetProcessFlowDetailsInProcessDetailsAjaxCall(TablesId.processDetails_processFlowDetails, recordsNotFound.processDetails_processFlowDetails);

});
$('#btn-processDetails-processFlowDetails-next').click((event) => {
    event.preventDefault();
    requestQueryForProcessFLowDetails.pageNumber += 1;
    $('#number-processDetails-processFlowDetails-pageNumber').text(requestQueryForProcessFLowDetails.pageNumber);
    GetProcessFlowDetailsInProcessDetailsAjaxCall(TablesId.processDetails_processFlowDetails, recordsNotFound.processDetails_processFlowDetails);
});
//#endregion


function ResetProcessDetails() {
    $(TablesId.processDetails_processFlow).empty();
    $(TablesId.processDetails_processFlowDetails).empty();
    $(TablesId.processDetails_ProductionOrders).empty();
    HideRecodNotFound(recordsNotFound.processDetails_processFlow);
    HideRecodNotFound(recordsNotFound.processDetails_processFlowDetails);
    HideRecodNotFound(recordsNotFound.processDetails_procutionOrders);
    requestQueryForProcessFLow.pageSize = 6;
    requestQueryForProcessFLow.pageNumber = 1;
    requestQueryForProcessFLowDetails.pageSize = 6;
    requestQueryForProcessFLowDetails.pageNumber = 1;
    requstQueryForProductOrders.pageNumber = 1;
    $('#number-processDetails-ProductionOrders').text(requstQueryForProductOrders.pageNumber);
    $('#number-processDetails-processFlow-pageNumber').text(requestQueryForProcessFLow.pageNumber);
    $('#number-processDetails-processFlowDetails-pageNumber').text(requestQueryForProcessFLowDetails.pageNumber);



}