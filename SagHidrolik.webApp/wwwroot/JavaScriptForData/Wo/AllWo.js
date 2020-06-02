$(function () {

    let u = BaseUrl + "Home/AllWo";
    if (window.location.href === u) {
        GetAllProductionOrdersInWoAjaxCall();
        GetprocutionOrdersCount();
        GetAllProductionOrdersPrintOutAjaxCall();

        $('#inp-allWo-addModel-issueDate').datepicker({
            dateFormat: 'dd/mm/yy',
            beforeShow: function () {
                setTimeout(function () {
                    $('.ui-datepicker').css('z-index', 99999999999999);
                }, 0);
            }
        });

        $('#inp-allWo-addModel-requireDate').datepicker({
            dateFormat: 'dd/mm/yy',
            beforeShow: function () {
                setTimeout(function () {
                    $('.ui-datepicker').css('z-index', 99999999999999);
                }, 0);
            }
        });

    }
});



let requestQueryForWo = {
    pageNumber: 1,
    pageSize: 6,
    Stk: '',
    uretimPlaniType: ''
};

let requestQueryForPrintOut = {
    pageNumber: 1,
    pageSize: 6,
    Stk: '',
    uretimPlaniType: ''
};
let allWoList = [];
let selectedAlWoArray = [];

// #region Ajax call ,Create Table,search
function GetAllProductionOrdersInWoAjaxCall() {
    $(TablesId.allWo).empty();
    requestQueryForWo.Stk = $(Inputs.allWo_searchStk).val();
    selectedAlWoArray = [];
    $('#cap2-allWo').hide();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForWo),
        url: HttpUrls.GetAllProductionOrders,
        success: (list) => {
            if (list.length !== 0) {
                console.log(list);
                allWoList = list
                $(recordsNotFound.allWo).css('display', 'none');
                createproductionOrdersTable(list, TablesId.allWo);
            }
            else {
                $(`${recordsNotFound.allWo} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.allWo).css('display', 'block');
                HideLoader();
            }
        }
    });
}

function createproductionOrdersTable(list, tableId) {
    $(tableId).empty();
    let status = '';
    list.map((element, index) => {
        if (element.status === 1) status = 'açık';
        if (element.status === 2) status = 'üretimde';
        if (element.status === 3) status = 'kapalı';

        element.issueDate ? element.issueDate = element.issueDate : element.issueDate = '';
        element.requireDate ? element.requireDate = element.requireDate : element.requireDate = '';
        element.closeDate ? element.closeDate = element.closeDate : element.closeDate = '';
        element.completed_Qty ? element.completed_Qty = element.completed_Qty : element.completed_Qty = '';
        element.remark ? element.remark = element.remark : element.remark = '';

        $(tableId).append(`
<tr>
  <td><input style="width:20px;height: 2rem;"  type="checkbox" name='f' id="${element.productOrderId}" /></td>
  <td>${element.stk}</td>
    <td>${element.qty}</td>
    <td>${element.completed_Qty} </td>
    <td>${status}</td>
    <td>${element.lotNo}</td>
    <td>${element.issueDate}</td>
    <td>${element.requireDate}</td>
    <td>${element.closeDate}</td>
    <td>${element.remark}</td>
    <td><i onclick="DeleteWo('${element.productOrderId}','${element.stk}')" class="fas fa-trash-alt fa-2x text-danger"></i></td>
             </tr>
`);
    });

    $("input[type='checkbox'][name='f']").change((e) => {


        SelectRow(e.currentTarget.id);
    })
    HideLoader();
}

let woTimer;
let woInterval = 500;
$(Inputs.allWo_searchStk).keyup(function () {
    clearTimeout(woTimer);
    requestQueryForWo.pageNumber = 1;
    $('#num-allWo-pageNumber').text(requestQueryForWo.pageNumber);
    woTimer = setTimeout(GetAllProductionOrdersInWoAjaxCall, woInterval);
});
//#endregion

// #region selects 

function GetprocutionOrdersCount() {
    $('#select-allWo-selectRowCount').empty();
    $.ajax({
        type: "GET",
        url: HttpUrls.GetprocutionOrdersCount,
        success: (num) => {
            console.log(num);
            $('#select-allWo-selectRowCount').append(`
                    <option value="6" selected>6</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="${num}">${num}</option>
`);


            $('#span-allWo-rowCount').text(num);
        },
    });
}


$('#select-allWo-selectRowCount').on('change', (e) => {
    e.preventDefault();
    requestQueryForWo.pageNumber = 1;
    $('#num-allWo-pageNumber').text(requestQueryForWo.pageNumber);
    requestQueryForWo.pageSize = parseInt($('#select-allWo-selectRowCount').val());
    GetAllProductionOrdersInWoAjaxCall();
})



$('#select-allWo-selectUretimPlaniType').on('change', (e) => {
    e.preventDefault();
    requestQueryForWo.pageNumber = 1;
    $('#num-allWo-pageNumber').text(requestQueryForWo.pageNumber);
    requestQueryForWo.pageSize = parseInt($('#select-allWo-selectRowCount').val());
    requestQueryForWo.uretimPlaniType = $('#select-allWo-selectUretimPlaniType').val();
    console.log(requestQueryForWo);
    GetAllProductionOrdersInWoAjaxCall();
})

//#endregion


//#region Next-Previous Hanldler
$(PreviousButtons.allWo).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForWo.pageNumber > 1) requestQueryForWo.pageNumber -= 1;
    $('#num-allWo-pageNumber').text(requestQueryForWo.pageNumber);
    GetAllProductionOrdersInWoAjaxCall();

});
$(NextButtons.allWo).on('click', (event) => {
    event.preventDefault();
    requestQueryForWo.pageNumber += 1;
    $('#num-allWo-pageNumber').text(requestQueryForWo.pageNumber);
    GetAllProductionOrdersInWoAjaxCall();
});
//#endregion



//#region Delete
function SelectRow(id) {
    $(`#${id}`).parent().parent().toggleClass('selectedRow');

    let selectedItem = allWoList.filter(elem => elem.productOrderId == id);
    selectedItem = selectedItem[0];
    console.log('s', selectedItem);
    let index = selectedAlWoArray.indexOf(selectedItem.productOrderId);

    if (index == -1) {
        selectedAlWoArray.push(selectedItem.productOrderId);
    }
    else {
        selectedAlWoArray.splice(index, 1);
    }
    if (selectedAlWoArray.length <= 0) {
        $('#cap2-allWo').hide();
        $(`#${id}`).parent().removeClass('selectedRow');
        $(`${TablesId.allWo} tr`)
    }
    else {
        $('#cap2-allWo').show();
        $('#span-allWo-selectedRow').text(selectedAlWoArray.length);
    }
    console.log(selectedAlWoArray);
}


$('#span-allWo-UnSelectRows').click((event) => {
    event.preventDefault();
    if (selectedAlWoArray.length != 0) {
        selectedAlWoArray.map((id) => {
            $(`#${id}`).parent().parent().removeClass('selectedRow');
            $(`#${id}`).prop('checked', false);
        })

        $('#cap2-allWo').hide();
        selectedAlWoArray = [];
        $('#span-allWo-selectedRow').text(selectedAlWoArray.length);
    }
})


function DeleteWo(productId, stk) {

    Swal.fire({
        title: `product Order: ${productId}`,
        text: ` stk :${stk} will delete? `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $(`#${productId}`).parent().parent().remove();
            let d = [];
            console.log(typeof (productId));
            d.push(parseInt(productId));
            DeleteWoAjaxCall(d, false);
        }
    })
}



function setDeleteModel(list) {
    $('#table-allWo-delete').empty();
    let status = '';
    list.map((element, index) => {
        if (element.status === 1) status = 'açık';
        if (element.status === 2) status = 'üretimde';
        if (element.status === 3) status = 'kapalı';

        element.issueDate ? element.issueDate = element.issueDate : element.issueDate = '';
        element.requireDate ? element.requireDate = element.requireDate : element.requireDate = '';
        element.closeDate ? element.closeDate = element.closeDate : element.closeDate = '';
        element.completed_Qty ? element.completed_Qty = element.completed_Qty : element.completed_Qty = '';
        element.remark ? element.remark = element.remark : element.remark = '';
        $('#table-allWo-delete').append(`
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
             </tr>
`);
    });
    HideLoader();
}


$('#btn-allWo-deleteSelected').click((e) => {
    e.preventDefault();
    if (selectedAlWoArray.length <= 0) {
        Swal.fire({
            type: 'error',
            title: "you should selected records that will be deleted",
            timer: 2000
        });
    }
    else {
        ShowLoader();
        let ll = [];

        for (var i = 0; i < selectedAlWoArray.length; i++) {
            for (var j = 0; j < allWoList.length; j++) {
                if (selectedAlWoArray[i] == allWoList[j].productOrderId) {
                    ll.push(allWoList[j]);
                }
            }
        }
        setDeleteModel(ll);
        $('#allWo-DeleteModel').modal('show');
    }

})


$('#btn-allWo-confirmDelete').click((e) => {
    e.preventDefault();
    DeleteWoAjaxCall(selectedAlWoArray, true);

})


function DeleteWoAjaxCall(arr, isFromSelected) {
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(arr),
        url: HttpUrls.DeleteWo,
        success: (message) => {
            arr.map((e) => {
                $(`#${e}`).parent().parent().remove();
            })
            Swal.fire({
                type: 'success',
                title: "Done!",
                text: `${message}`,
                timer: 2000
            });
            GetprocutionOrdersCount();
            if (isFromSelected) {
                $('#allWo-DeleteModel').modal('hide');
                $('#table-allWo-delete').empty();
                $('#cap2-allWo').hide();
                selectedAlWoArray = [];
            }
            HideLoader();
        }
    });
}

//#endregion


//#region Add to Work Orders


$('#btn-allWo-addtoWorkOrders').click(e => {
    $('#inp-allWo-addModel-searchStk').val('');
    $('.addModelInputs').find("input[type = 'text']").each(function () {
        $(this).val('');
    });
    $('#allWo-AddModel').modal('show');


})
$('#inp-allWo-addModel-searchStk').keyup(function () {
    clearTimeout(woTimer);
    requestQueryForWo.pageNumber = 1;
    requestQueryForWo.pageSize = 3;
    woTimer = setTimeout(GetSearchedStkInAddModel, woInterval);
});
function GetSearchedStkInAddModel() {
    requestQueryForWo.Stk = $('#inp-allWo-addModel-searchStk').val();
    $("#table-allWo-addModel-stkTable").empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForWo),
        url: HttpUrls.GetStokkenByStkListOnlypageSize,
        success: (list) => {
            if (list.length !== 0) {
                $('#recordNotFoundDiv_AddModelStk').css('display', 'none');
                creatStokgenTable(list, '#table-allWo-addModel-stkTable');
            }
            else {
                $(`#recordNotFoundDiv_AddModelStk h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $('#recordNotFoundDiv_AddModelStk').css('display', 'block');
                HideLoader();
            }
        }
    });
}

$('#table-allWo-addModel-stkTable').on('click', 'tr', function (e) {
    e.preventDefault();
    let stk = $(this).data('id');
    let pId = $(this).data('p_id');
    $('#inp-allWo-addModel-selectedStk').val(`${stk}`);
    productOrderModel.Stk = $('#inp-allWo-addModel-selectedStk').val();
    productOrderModel.PartNo_ID = `${pId}`;
})

let productOrderModel = {

    Stk: "",
    PartNo_ID: "",
    IssueDate: "",
    RequireDate: "",
    Remark: "",
    qty: 0
}
$('#btn-allWo-confrimAdd').click((e) => {
    e.preventDefault();


    let emptyMi = checkInput('addModelInputs');

    if (emptyMi == true) {
        Swal.fire({
            type: 'error',
            title: "you should Fill all inputs",
            timer: 2000
        });
    }
    else {
        productOrderModel.IssueDate = $('#inp-allWo-addModel-issueDate').val();
        productOrderModel.RequireDate = $('#inp-allWo-addModel-requireDate').val();
        productOrderModel.Remark = $('#inp-allWo-addModel-remark').val();
        productOrderModel.qty = parseInt($('#inp-allWo-addModel-qty').val());

        console.log(productOrderModel);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(productOrderModel),
            url: HttpUrls.AddNewWorkOrder,
            success: (model) => {
                Swal.fire({
                    type: 'success',
                    title: "başarıyla yeni product order Eklendi",
                    timer: 2000
                });
                $('#allWo-AddModel').modal('hide');
                requestQueryForWo.pageSize = 6;
                requestQueryForWo.uretimPlaniType = '1';
                GetAllProductionOrdersInWoAjaxCall();
                GetprocutionOrdersCount();
            },
            error: () => {
                Swal.fire({
                    type: 'error',
                    title: "Beklenmeyen Bir Hata oluştu",
                    timer: 2000
                });
                $('#allWo-AddModel').modal('hide');
            }
        });
        $('#inp-allWo-addModel-searchStk').val('');
        $('.addModelInputs').find("input[type = 'text']").each(function () {
            $(this).val('');
        });
    }
});


//#endregion

//#region Reset 

$('#btn-allWo-reset').click((event) => {
    event.preventDefault();
    $(Inputs.allWo_searchStk).val('');
    $('#select-allWo-selectUretimPlaniType').val('');
    $('#select-allWo-selectRowCount').val('6');
    requestQueryForWo.pageNumber = 1;
    requestQueryForWo.pageSize = 6;
    requestQueryForWo.Stk = '';
    requestQueryForWo.uretimPlaniType = '';
    selectedAlWoArray = [];
    $('#num-allWo-pageNumber').text(requestQueryForWo.pageNumber);
    GetAllProductionOrdersInWoAjaxCall();
});

// #endregion



// #region prodcutionOrders PrintOut

function GetAllProductionOrdersPrintOutAjaxCall() {
    $(TablesId.ProductionOrdersPrintout).empty();
    requestQueryForPrintOut.Stk = $(Inputs.allWo_ProductionOrdersPrintout).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForPrintOut),
        url: HttpUrls.GetAllProductionOrdersPrintOut,
        success: (list) => {
            if (list.length !== 0) {
                console.log('xzxzx', list);

                $(recordsNotFound.ProductionOrdersPrintout).css('display', 'none');
                createproductionOrdersPrintOutTable(list, TablesId.ProductionOrdersPrintout);
            }
            else {
                $(`${recordsNotFound.ProductionOrdersPrintout} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.ProductionOrdersPrintout).css('display', 'block');
                HideLoader();
            }
        }
    });
}

function createproductionOrdersPrintOutTable(list, tableId) {
    $(tableId).empty();
    let status = '';
    list.map((element, index) => {
        if (element.status === 1) status = 'açık';
        if (element.status === 2) status = 'üretimde';
        if (element.status === 3) status = 'kapalı';
        let href = "";
        let style = "";
        let icon;
        element.issueDate ? element.issueDate = element.issueDate : element.issueDate = '';
        element.requireDate ? element.requireDate = element.requireDate : element.requireDate = '';
        element.closeDate ? element.closeDate = element.closeDate : element.closeDate = '';
        element.completed_Qty ? element.completed_Qty = element.completed_Qty : element.completed_Qty = '';
        element.remark ? element.remark = element.remark : element.remark = '';
        if (element.dosyaUrl) {
            href = `${BaseUrl}StokGetData/OpenFileFromServer?filePath=${element.dosyaUrl}`;
            style = "cursor: pointer ;"
          
            icon = "far  fa-2x fa-folder-open";
       
        }
        else {
            href = '';
            style = "pointer-events: none;cursor: not-allowed ;"
            icon = "fas fa-2x fa-times-circle text-danger";
        }
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
    <td style="${style}"><a style='${style}' target= "_blank"  href="${href}"> <i class="${icon}"></i> </a></td>
    <td><i onclick="DeleteFromPrintOut('${element.productOrderId}','${element.stk}')" class="fas fa-trash-alt fa-2x text-danger"></i></td>
             </tr>
`);
    });
    HideLoader();



}


$(Inputs.allWo_ProductionOrdersPrintout).keyup(function () {
    clearTimeout(woTimer);
    requestQueryForPrintOut.pageNumber = 1;
    $('#num-allWo-pageNumber').text(requestQueryForPrintOut.pageNumber);
    woTimer = setTimeout(GetAllProductionOrdersPrintOutAjaxCall, woInterval);
});



// #region selects printOut


$('#select-ProductionOrdersPrintout-selectRowCount').on('change', (e) => {
    e.preventDefault();
    requestQueryForPrintOut.pageNumber = 1;
    $('#num-ProductionOrdersPrintout-pageNumber').text(requestQueryForPrintOut.pageNumber);
    requestQueryForPrintOut.pageSize = parseInt($('#select-ProductionOrdersPrintout-selectRowCount').val());
    GetAllProductionOrdersPrintOutAjaxCall();
})



$('#select-ProductionOrdersPrintout-selectUretimPlaniType').on('change', (e) => {
    e.preventDefault();
    requestQueryForPrintOut.pageNumber = 1;
    $('#num-allWo-pageNumber').text(requestQueryForPrintOut.pageNumber);
    requestQueryForPrintOut.pageSize = parseInt($('#select-ProductionOrdersPrintout-selectRowCount').val());
    requestQueryForPrintOut.uretimPlaniType = $('#select-ProductionOrdersPrintout-selectUretimPlaniType').val();
    GetAllProductionOrdersPrintOutAjaxCall();
})




//#endregion



//#region Next-Previous Hanldler printOut
$(PreviousButtons.ProductionOrdersPrintout).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForPrintOut.pageNumber > 1) requestQueryForPrintOut.pageNumber -= 1;
    $('#num-ProductionOrdersPrintout-pageNumber').text(requestQueryForPrintOut.pageNumber);
    GetAllProductionOrdersPrintOutAjaxCall();

});
$(NextButtons.ProductionOrdersPrintout).on('click', (event) => {
    event.preventDefault();
    requestQueryForPrintOut.pageNumber += 1;
    $('#num-ProductionOrdersPrintout-pageNumber').text(requestQueryForPrintOut.pageNumber);
    GetAllProductionOrdersPrintOutAjaxCall();
});
//#endregion


//#region Add to printOut

$('#btn-allWo-addtoTable').click((e) => {
    e.preventDefault();

    if (selectedAlWoArray.length <= 0) {
        Swal.fire({
            type: 'error',
            title: "you should selected records that will be added to printOut table",
            timer: 2000
        });
    }
    else {
        ShowLoader();
        let ll = [];
        for (var i = 0; i < selectedAlWoArray.length; i++) {
            for (var j = 0; j < allWoList.length; j++) {
                if (selectedAlWoArray[i] == allWoList[j].productOrderId) {
                    ll.push(allWoList[j].productOrderId);
                }
            }
        }

        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(ll),
            url: HttpUrls.AddToProductionOrdersPrintOut,
            success: (message) => {
                Swal.fire({
                    type: 'success',
                    title: "Done!",
                    text: `${message}`,
                    timer: 2000
                });
                $('#cap2-allWo').hide();
                selectedAlWoArray = [];
                GetAllProductionOrdersPrintOutAjaxCall();
                GetAllProductionOrdersInWoAjaxCall();
                HideLoader();
            }
        });
    }
})
//#endregion

function DeleteFromPrintOut(productId, stk) {
    Swal.fire({
        title: `product Order: ${productId}`,
        text: ` stk :${stk} from printOut will delete? `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {

            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(requestQueryForPrintOut),
                url: HttpUrls.DeleteFromPrintOut + productId,
                success: (message) => {
                    Swal.fire({
                        type: 'success',
                        title: "Done!",
                        text: `${message}`,
                        timer: 2000
                    });
                    GetAllProductionOrdersPrintOutAjaxCall();
                }
            });
        }
    })
}


$('#btn-allWo-clearPrintOut').click((e) => {
    e.preventDefault();
    Swal.fire({
        title: `Delete All!`,
        text: `printOut table wil be cleared`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {

            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(requestQueryForPrintOut),
                url: HttpUrls.DeleteAllPrintOut,
                success: (message) => {
                    Swal.fire({
                        type: 'success',
                        title: "Done!",
                        text: `${message}`,
                        timer: 2000
                    });
                    GetAllProductionOrdersPrintOutAjaxCall();
                }
            });
        }
    });

})
//#endregion