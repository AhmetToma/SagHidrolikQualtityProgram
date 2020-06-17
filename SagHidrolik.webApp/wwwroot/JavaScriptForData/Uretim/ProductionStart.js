$(function () {

    let u = BaseUrl + "Home/ProductionStart";
    if (window.location.href === u) {
        GetAllOpenProductionOrdersAjaxCall();
        //  GetprocutionOrdersCount();
        GetAllProductionStatusAjaxCall();

        $('#inp-productionStatus-date').datepicker({
            dateFormat: 'dd/mm/yy',
            beforeShow: function () {
                setTimeout(function () {
                    $('.ui-datepicker').css('z-index', 99999999999999);
                }, 0);
            },

        });
        $('#inp-productionStatus-date').val(today);
    }
});
let productionStatusList = [];

let requestQueryForProducTionStart = {
    pageNumber: 1,
    pageSize: 6,
    Stk: '',
    uretimPlaniType: ''
};
let requestQueryForProductionStatus = {
    pageNumber: 1,
    pageSize: 6,
    Stk: '',
    uretimPlaniType: ''
};
let prodcutionordersList = [];
let selectedProductionList = [];

// #region Ajax call ,Create Table,search Open production orders 
function GetAllOpenProductionOrdersAjaxCall() {
   
    $(TablesId.prodcutionStart).empty();
    requestQueryForProducTionStart.Stk = $(Inputs.prodcutionStart_searchStk).val();
    requestQueryForProducTionStart.uretimPlaniType = '1';
    $('#cap2-prodcutionStart').hide();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForProducTionStart),
        url: HttpUrls.GetAllProductionOrders,
        success: (list) => {
            if (list.length !== 0) {
                prodcutionordersList = list;
                $(recordsNotFound.ProductionStart).css('display', 'none');
                createOpenProductionOrdersTable(list, TablesId.prodcutionStart);
            }
            else {
                $(`${recordsNotFound.ProductionStart} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.ProductionStart).css('display', 'block');
                HideLoader();
            }
        }
    });
}

function createOpenProductionOrdersTable(list, tableId) {
    $(tableId).empty();
    let status = '';
    list.map((element, index) => {
        if (element.status === 1) status = 'açık';
        if (element.status === 2) status = 'üretimde';
        if (element.status === 3) status = 'kapalı';

        element.issueDate ? element.issueDate = element.issueDate.slice(0, -9) : element.issueDate = '';
        element.requireDate ? element.requireDate = element.requireDate.slice(0, -9) : element.requireDate = '';
        element.closeDate ? element.closeDate = element.closeDate.slice(0, -9) : element.closeDate = '';
        element.completed_Qty ? element.completed_Qty = element.completed_Qty : element.completed_Qty = '';
        element.remark ? element.remark = element.remark : element.remark = '';

        $(tableId).append(`
<tr>

  <td>${element.stk}</td>
    <td>${element.qty}</td>
    <td>${element.completed_Qty} </td>
    <td>${status}</td>
    <td>${element.lotNo}</td>
    <td>${element.issueDate}</td>
    <td>${element.requireDate}</td>
    <td>${element.closeDate}</td>
    <td>${element.remark}</td>
    <td onclick="DeleteWo('${element.productOrderId}','${element.stk}')"><i  class="fas fa-trash-alt fa-2x text-danger"></i></td>
  <td onclick="AddToProductionStatus('${element.productOrderId}','${element.qty}')" ><i class="fas fa-2x fa-plus-circle text-dark"></i></td>
             </tr>
`);
    });

    //<td><input style="width:20px;height: 93%;" type="checkbox" name='z' id="${element.productOrderId}" /></td>
    //$("input[type='checkbox'][name='z']").change((e) => {


    //    SelectRowInProductionStart(e.currentTarget.id);
    //})
    HideLoader();
}





$(Inputs.prodcutionStart_searchStk).keyup(function () {
    clearTimeout(woTimer);
    requestQueryForProducTionStart.pageNumber = 1;
    $('#num-prodcutionStart-pageNumber').text(requestQueryForProducTionStart.pageNumber);
    woTimer = setTimeout(GetAllOpenProductionOrdersAjaxCall, woInterval);
});
//#endregion 


//#region Next-Previous Hanldler
$(PreviousButtons.prodcutionStart).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForProducTionStart.pageNumber > 1) requestQueryForProducTionStart.pageNumber -= 1;
    $('#num-prodcutionStart-pageNumber').text(requestQueryForProducTionStart.pageNumber);
    GetAllOpenProductionOrdersAjaxCall();

});
$(NextButtons.prodcutionStart).on('click', (event) => {
    event.preventDefault();
    requestQueryForProducTionStart.pageNumber += 1;
    $('#num-prodcutionStart-pageNumber').text(requestQueryForProducTionStart.pageNumber);
    GetAllOpenProductionOrdersAjaxCall();
});
//#endregion

// #region selects 

$('#select-prodcutionStart-selectRowCount').on('change', (e) => {
    e.preventDefault();
    requestQueryForProducTionStart.pageNumber = 1;
    $('#num-prodcutionStart-pageNumber').text(requestQueryForProducTionStart.pageNumber);
    requestQueryForProducTionStart.pageSize = parseInt($('#select-prodcutionStart-selectRowCount').val());
    GetAllOpenProductionOrdersAjaxCall();
})






//function SelectRowInProductionStart(id) {
//    $(`#${id}`).parent().parent().toggleClass('selectedRow');

//    let selectedItem = prodcutionordersList.filter(elem => elem.productOrderId == id);
//    selectedItem = selectedItem[0];
//    let index = selectedProductionList.indexOf(selectedItem.productOrderId);

//    if (index == -1) {
//        selectedProductionList.push(selectedItem.productOrderId);
//    }
//    else {
//        selectedProductionList.splice(index, 1);
//    }
//    if (selectedProductionList.length <= 0) {
//        $('#cap2-prodcutionStart').hide();
//        $(`#${id}`).parent().removeClass('selectedRow');
//        $(`${TablesId.allWo} tr`)
//    }
//    else {
//        $('#cap2-prodcutionStart').show();
//        $('#span-prodcutionStart-selectedRow').text(selectedProductionList.length);
//    }
//}


$('#span-prodcutionStart-UnSelectRows').click((event) => {
    event.preventDefault();
    if (selectedProductionList.length !== 0) {
        selectedProductionList.map((id) => {
            $(`#${id}`).parent().parent().removeClass('selectedRow');
            $(`#${id}`).prop('checked', false);
        })
        $('#cap2-prodcutionStart').hide();
        selectedProductionList = [];
        $('#span-prodcutionStart-selectedRow').text(selectedProductionList.length);
    }
})

//#endregion





// #region Ajax call ,Create Table,search  production Status 
function GetAllProductionStatusAjaxCall() {
    $(TablesId.productionStatus).empty();
    requestQueryForProductionStatus.Stk = $(Inputs.productionStatus_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForProductionStatus),
        url: HttpUrls.GetAllProductionStatus,
        success: (list) => {
            if (list.length !== 0) {
                productionStatusList = list;
                $(recordsNotFound.productionStatus).css('display', 'none');
                CreatProductionStatusTable(list, TablesId.productionStatus);
            }
            else {
                $(`${recordsNotFound.productionStatus} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.productionStatus).css('display', 'block');
                HideLoader();
            }
        }
    });
}

function CreatProductionStatusTable(list, tableId) {
    $(tableId).empty();
    let status = '';
    list.map((element, index) => {
        if (element.status === 1) status = 'açık';
        if (element.status === 2) status = 'üretimde';
        if (element.status === 3) status = 'kapalı';
        $(tableId).append(`
<tr>
  <td>${element.stk}</td>
  <td>${element.lotNo}</td>
    <td>${element.qty} </td>
    <td>${element.prosesAdi}</td>
    <td>${element.inputDate.slice(0, -11)}</td>
    <td>${element.roleName}</td>
    <td><i onclick="DeleteproductionStatus('${element.productionSheet}','${element.stk}')" class="fas fa-trash-alt fa-2x text-danger"></i></td>
             </tr>
`);
    });


    HideLoader();
}




// search
$(Inputs.productionStatus_searchStk).keyup(function () {
    clearTimeout(woTimer);
    requestQueryForProductionStatus.pageNumber = 1;
    $('#num-productionStatus-pageNumber').text(requestQueryForProductionStatus.pageNumber);
    woTimer = setTimeout(GetAllProductionStatusAjaxCall, woInterval);
});

//#region Next-Previous Hanldler
$(PreviousButtons.productionStatus).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForProductionStatus.pageNumber > 1) requestQueryForProductionStatus.pageNumber -= 1;
    $('#num-productionStatus-pageNumber').text(requestQueryForProductionStatus.pageNumber);
    GetAllProductionStatusAjaxCall();

});
$(NextButtons.productionStatus).on('click', (event) => {
    event.preventDefault();
    requestQueryForProductionStatus.pageNumber += 1;
    $('#num-productionStatus-pageNumber').text(requestQueryForProductionStatus.pageNumber);
    GetAllProductionStatusAjaxCall();
});


$('#select-productionStatus-selectRowCount').on('change', (e) => {
    e.preventDefault();
    requestQueryForProductionStatus.pageNumber = 1;
    $('#num-productionStatus-pageNumber').text(requestQueryForProductionStatus.pageNumber);
    requestQueryForProductionStatus.pageSize = parseInt($('#select-productionStatus-selectRowCount').val());
    GetAllProductionStatusAjaxCall();
})
//#endregion


// Delete From Production Status 
function DeleteproductionStatus(sheetId, stk) {
    Swal.fire({
        title: `Sheet Id: ${sheetId}`,
        text: ` stk :${stk} will delete? `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            let sheet_id = parseInt(sheetId);
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.DeleteproductionStatus + sheet_id,
                success: (num) => {
                    if (num !== 0) {
                        Swal.fire({
                            type: 'success',
                            title: 'Başarılı!',
                            text: 'production status silindi',
                            timer: 1500
                        });
                        GetAllProductionStatusAjaxCall();
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'opps!',
                            text: 'Beklenmeyen bir hata oldu',
                            timer: 1500
                        });
                    }
                },
                error: () => {
                    Swal.fire({
                        type: 'error',
                        title: 'opps!',
                        text: 'Beklenmeyen bir hata oldu',
                        timer: 1500
                    });
                }
            });
        }
    })
}


let selectedproductId = 0;
let selectedQty = 0
// add to production Status
function AddToProductionStatus(productId, qty) {
    $('#produtionStatusModal').modal('show');
    selectedproductId = productId;
    selectedQty = qty;
    console.log(selectedproductId, selectedQty)
}
$('#btn-productionStatus-confrimAdd').click(() => {

    let inputDate = $('#inp-productionStatus-date').val();
    if (inputDate === "") Swal.fire({
        type: 'error',
        title: 'empty input!',
        text: 'you should enter date',
        timer: 1500
    });
    else {
        let v = `?inputDate=${inputDate}&productId=${selectedproductId}&qty=${selectedQty}`
        $.ajax({
            type: "GET",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddToProductionStatus + v,
            success: (message) => {
                let type = "";
                message === "there is no order No!" ? type = "error" : type = "success"
                Swal.fire({
                    type: `${type}`,
                    title: 'Done!',
                    text: `${message}`,
                    timer: 2000
                });
                $('#produtionStatusModal').modal('hide');
                GetAllProductionStatusAjaxCall();
            }
        });
    }
})

//#endregion


//#region tranfer to system


$('#btn-productionStatus-tranferToSystemAndClear').click(() => {
    if (productionStatusList.length === 0) {
        Swal.fire({
            type: `error`,
            title: 'NO Records!',
            text: `there is no record to tranfer`,
            timer: 3500
        });
    }


    Swal.fire({
        title: `Tranfer Opeartion!`,
        text: `Are you sure`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "Get",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.TransferToSystem,
                success: (message) => {

                    Swal.fire({
                        type: `success`,
                        title: 'Done!',
                        text: `${message}`,
                        timer: 3500
                    });
                    GetAllProductionStatusAjaxCall();
                }
            });
         
        }
    })




  
})




function TransferToSystem(productId) {
    $.ajax({
        type: "Get",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.TransferToSystem + productId,
        success: (message) => {

            Swal.fire({
                type: `success`,
                title: 'Done!',
                text: `${message}`,
                timer: 2000
            });
            GetAllOpenProductionOrdersAjaxCall();
        }
    });
}
//#endregion