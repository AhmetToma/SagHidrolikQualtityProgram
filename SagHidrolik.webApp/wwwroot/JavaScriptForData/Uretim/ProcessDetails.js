$(function () {
    let dataUrl = "Home/ProcessDetails";
    let ur = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === ur || window.location.href === serverUrl) {
        if ($('body').hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
            $('body').toggleClass('nav-md nav-sm');
            $('.dataTable').each(function () { $(this).dataTable().fnDraw(); });
        }
        SerachStokInAddOrUpdateProcess();
        GetProcessPlanningInProcessDetails();
        GetAktiveOperators("inp-processFlowDetails-edit-operator");
        GetAktiveMachine("inp-processFlowDetails-edit-machineId");
        //$("#inp-processFlowDetails-edit-inputDate").datepicker({
        //    dateFormat: 'dd/mm/yy',
        //});
        $("#inp-processFlowDetails-edit-startTime").datepicker({
            dateFormat: 'dd/mm/yy',
        });
        $("#inp-processFlowDetails-edit-finishTime").datepicker({
            dateFormat: 'dd/mm/yy',
        });
        $(".limitedNumbSelect2").select2({
            maximumSelectionLength: 1,
            placeholder: "Seçiniz"
        })
    }
});



//  #region start Arama
let processDetailsModel = {
    stk: '',
    p_id: "",
    lotNo: '',
    paketlemeTarihi: today,
    etiketAdet: '',
    paketlemMiktari: ''
};
let processDetailsEditModel = {
    flowId:0,
    productOrderId:0,
    orderNo: 0,
    processNo: 0,
    processQty: 0,
    okQty: 0,
    reject: 0,
    rework:0,
}

let processFLowDetailsEditModel = {
    flowDtailsId:0,
    startTime:"",
    finishTime:"",
    okQty:0,
    machineId:0,
    operatorId:0,
    npTime: 0,
    npDef: "",
    defect1Qty: 0,
    defect1Name:"",
    defect2Qty: 0,
    defect2Name: "",
    reworkQty: 0,
    reworkName: "",
    inputDate:""

}
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
let processFlowList = [];
let processFlowDetailsList = [];
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

function GetProcessPlanningInProcessDetails() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcessPlanning,
        success: (list) => {
            processPlaningList = list;
            $('#inp-processFlow-edit-processName').empty();
            list.map(p => {
                $('#inp-processFlow-edit-processName').append(`
<option value="${p.processNo}" >${p.prosesAdi}</option>
`)
            })
        }

    });
}
function GetProcessFlowInProcessDetailsAjaxCall(tableId, notFoundId) {
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcessFlowInProcessDetails,
        data: JSON.stringify(requestQueryForProcessFLow),
        success: (list) => {

            if (list.length !== 0) {
                processFlowList = list;
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
 <td><i onclick="EditProcessFlow(${index})" class="fas fa-edit fa-2x  text-primary"  aria-hidden="true"></td>
 <td><i onclick="DeleteprocessFlow(${index})" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
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


// delete processFlow
function DeleteprocessFlow(index) {
    let matched;
    if (processFlowList.length > 0) {
        matched = processFlowList[index];
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `flow id'si olan'${matched.flow_ID}' silenecek!`,
        text: `flow id'si olan'${matched.flow_ID}' silmek iseter misiniz?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil !',
        cancelButtonText: 'Hayır , silme!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "GET",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.DeleteFromProceeFlow + matched.flow_ID,
                success: (message) => {
                    if (message === "done") {
                        GetProcessFlowInProcessDetailsAjaxCall(TablesId.processDetails_processFlow, recordsNotFound.processDetails_processFlow);
                        Swal.fire({
                            title: 'Başarılı!',
                            text: ' Başarı ile Silendi',
                            type: 'success',
                            timer: 5000
                        });
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Beklenmeyen bir hata oluştu',
                            timer: 5000
                        });
                    }
                }

            });
        }
    });
}


// edit
function EditProcessFlow(index) {
    let matched;
    if (processFlowList.length > 0) {
        matched = processFlowList[index];
        console.log(matched);
        $('#inp-processFlow-edit-flowId').val(matched.flow_ID);
        $('#inp-processFlow-edit-productOrderId').val(matched.productOrder_ID);
        $('#inp-processFlow-edit-orderNo').val(matched.order_no);
        $('#inp-processFlow-edit-processName').val(`${matched.processNo_ID}`).trigger('change');
        $('#inp-processFlow-edit-processQty').val(matched.process_qty);
        $('#inp-processFlow-edit-okQty').val(matched.ok_Qty);
        $('#inp-processFlow-edit-reject').val(matched.process_reject);
        $('#inp-processFlow-edit-rework').val(matched.process_Rework);
        $("#processFlow-editModel").modal('show');
    }
}
$('#btn-processFlow-edit-saveEdit').click((e) => {
    let flowId = $('#inp-processFlow-edit-flowId').val();
    let productOrderId = $('#inp-processFlow-edit-productOrderId').val();
    let orderNo = $('#inp-processFlow-edit-orderNo').val();
    let processNo = $("#inp-processFlow-edit-processName").val()[0];
    let processQty = $('#inp-processFlow-edit-processQty').val();
    let okQty = $('#inp-processFlow-edit-okQty').val();
    let reject = $('#inp-processFlow-edit-reject').val();
    let rework = $('#inp-processFlow-edit-rework').val();
    if (flowId === '' ||
        productOrderId === '' ||
        orderNo === '' ||
        processNo === '' ||
        processQty === '' ||
        okQty === '' ||
        reject === '' 
    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500
        });
    }
    else {
        processDetailsEditModel.flowId = parseInt(flowId);
        processDetailsEditModel.productOrderId = parseInt(productOrderId);
        processDetailsEditModel.orderNo = parseInt(orderNo);
        processDetailsEditModel.processNo = parseInt(processNo);
        processDetailsEditModel.processQty = parseInt(processQty);
        processDetailsEditModel.okQty = parseInt(okQty);
        processDetailsEditModel.reject = parseInt(reject);
        processDetailsEditModel.rework = parseInt(rework);
        console.log(processDetailsEditModel);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.UpdateProcessFlowInProcessDetails,
            data: JSON.stringify(processDetailsEditModel),
            success: (message) => {
                HideLoader();
                if (message === "done") {
                    GetProcessFlowInProcessDetailsAjaxCall(TablesId.processDetails_processFlow, recordsNotFound.processDetails_processFlow);
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'yeni pa Başarı ile düzeltildi',
                        type: 'success',
                        timer: 5000
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Beklenmeyen bir hata oluştu',
                        timer: 5000
                    });
                }
            }
        });
        $("#processFlow-editModel").modal('hide');
    };
})

// #endregion


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
                console.log(' BEFORE detail', list);
                processFlowDetailsList = list;
                HideRecodNotFound(notFoundId);
                $(`${tableId}`).empty();
                CreateProcessFlowDetailsTable(processFlowDetailsList, tableId, notFoundId);
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
        console.log(element.Defect1_qty);
        element.Defect1_qty !== null ? element.Defect1_qty = element.Defect1_qty : element.Defect1_qty = 0;
        element.Defect2_qty !== null ? element.Defect2_qty = element.Defect2_qty : element.Defect2_qty=0;
        element.Np_time !== null ? element.Np_time = element.Np_time : element.Np_time=0;
        element.Rework_qty !== null ? element.Rework_qty = element.Rework_qty : element.Rework_qty =0;
        $(`${tableId}`).append(`
<tr>
  <td>${element.Start_time}</td>
  <td>${element.FinishTime}</td>
    <td>${element.Ok_Qty} </td>
    <td>${element.Machine_no} </td>
<td> ${element.Operator_Name}</td>
   <td>${element.Np_time}</td>
   <td>${element.Np_Def ? element.Np_Def : " "} </td>
   <td>${element.Defect1_qty} </td>
   <td>${element.Defect1_Name ? element.Defect1_Name : " "} </td>
   <td>${element.Defect2_qty } </td>
   <td>${element.Defect2_Name ? element.Defect2_Name : " "} </td>
   <td>${element.Rework_qty} </td>
   <td>${element.Rework_Name ? element.Rework_Name : ""} </td>
 <td><i onclick="EditProcessFlowDetails(${index})" class="fas fa-edit fa-2x  text-primary"  aria-hidden="true"></td>
 <td><i onclick="DeleteFromProcessFlowDetails(${index})" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
`);
    });
    console.log('detail', processFlowDetailsList);
    HideLoader();
    HideRecodNotFound(notFoundId);
}

// #region next previous
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

// #region Delete from Process Flow Details
function DeleteFromProcessFlowDetails(index) {
    let matched;
    if (processFlowDetailsList.length > 0) {
        matched = processFlowDetailsList[index];
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `flow id'si olan'${matched.FlowDetailsId}' silenecek!`,
        text: `flow id'si olan'${matched.FlowDetailsId}' silmek iseter misiniz?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil !',
        cancelButtonText: 'Hayır , silme!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "GET",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.DeleteFromProceesFlowDetails + matched.FlowDetailsId,
                success: (message) => {
                    if (message === "done") {
                        GetProcessFlowDetailsInProcessDetailsAjaxCall(TablesId.processDetails_processFlowDetails, recordsNotFound.processDetails_processFlowDetails);
                        Swal.fire({
                            title: 'Başarılı!',
                            text: ' Başarı ile Silendi',
                            type: 'success',
                            timer: 5000
                        });
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Beklenmeyen bir hata oluştu',
                            timer: 5000
                        });
                    }
                }

            });
        }
    });
}
//#endregion


// #region edit processFlowDetails
function EditProcessFlowDetails(index) {
    let matched;
    if (processFlowDetailsList.length > 0) {
        matched = processFlowDetailsList[index];
        console.log(matched);
        $('#inp-processFlowDetails-edit-startTime').val(matched.Start_time);
        $('#inp-processFlowDetails-edit-finishTime').val(matched.FinishTime);
        $('#inp-processFlowDetails-edit-okQty').val(matched.Ok_Qty);
        $('#inp-processFlowDetails-edit-machineId').val(`${matched.Machine_Id}`).trigger('change');
        $('#inp-processFlowDetails-edit-operator').val(`${matched.Operator_ID}`).trigger('change');
        $('#inp-processFlowDetails-edit-npTime').val(matched.Np_time);
        $('#inp-processFlowDetails-edit-npDef').val(matched.Np_Def);
        $('#inp-processFlowDetails-edit-defect1Qty').val(matched.Defect1_qty);
        $('#inp-processFlowDetails-edit-defect1Name').val(matched.Defect1_Name);
        $('#inp-processFlowDetails-edit-defect2Qty').val(matched.Defect2_qty);
        $('#inp-processFlowDetails-edit-defect2Name').val(matched.Defect2_Name);
        $('#inp-processFlowDetails-edit-reworkQty').val(matched.Rework_qty);
        $('#inp-processFlowDetails-edit-reworkName').val(matched.Rework_Name);
        //$('#inp-processFlowDetails-edit-inputDate').val(matched.InputDate);
        processFLowDetailsEditModel.flowDtailsId = matched.FlowDetailsId;
        $("#processFlowDetails-editModel").modal('show');
    }
}
$('#btn-processFlowDetails-edit-saveEdit').click((e) => {
    let startTime = $('#inp-processFlowDetails-edit-startTime').val();
    let okQty = $('#inp-processFlowDetails-edit-okQty').val();
    let machineId = $("#inp-processFlowDetails-edit-machineId").val()[0];
    let operatorId = $("#inp-processFlowDetails-edit-operator").val()[0];
   
    if (startTime === '' ||
        okQty === '' ||
        machineId === '' ||
        operatorId === '' 
    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Start Time,okQty,Machine,Operator Inputlar Doldurmanız Gerekiyor',
            timer: 5000
        });
    }
    else {
        processFLowDetailsEditModel.startTime = startTime;
        processFLowDetailsEditModel.finishTime = $('#inp-processFlowDetails-edit-finishTime').val();
        processFLowDetailsEditModel.okQty = parseInt($('#inp-processFlowDetails-edit-okQty').val());
        processFLowDetailsEditModel.machineId = parseInt(machineId);
        processFLowDetailsEditModel.operatorId = parseInt(operatorId);
        processFLowDetailsEditModel.npTime = parseInt($('#inp-processFlowDetails-edit-npTime').val());
        processFLowDetailsEditModel.npDef = $('#inp-processFlowDetails-edit-npDef').val();
        processFLowDetailsEditModel.npDef = $('#inp-processFlowDetails-edit-npDef').val();
        processFLowDetailsEditModel.defect1Qty = parseInt($('#inp-processFlowDetails-edit-defect1Qty').val());
        processFLowDetailsEditModel.defect2Qty = parseInt($('#inp-processFlowDetails-edit-defect2Qty').val());
        processFLowDetailsEditModel.defect1Name = parseInt($('#inp-processFlowDetails-edit-defect1Name').val());
        processFLowDetailsEditModel.defect2Name = parseInt($('#inp-processFlowDetails-edit-defect2Name').val());
        processFLowDetailsEditModel.reworkQty = parseInt($('#inp-processFlowDetails-edit-reworkQty').val());
        processFLowDetailsEditModel.reworkName = parseInt($('#inp-processFlowDetails-edit-reworkName').val());
        ////processFLowDetailsEditModel.inputDate = $('#inp-processFlowDetails-edit-inputDate').val();


        console.log(processFLowDetailsEditModel);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.UpdateProcessFlowDetailsInProcessDetails,
            data: JSON.stringify(processFLowDetailsEditModel),
            success: (message) => {
                HideLoader();
                if (message === "done") {
                    GetProcessFlowDetailsInProcessDetailsAjaxCall(TablesId.processDetails_processFlowDetails, recordsNotFound.processDetails_processFlowDetails);
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'yeni pa Başarı ile düzeltildi',
                        type: 'success',
                        timer: 5000
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Beklenmeyen bir hata oluştu',
                        timer: 5000
                    });
                }
            }
        });
        $("#processFlowDetails-editModel").modal('hide');
    };
})

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