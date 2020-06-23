$(function () {

    let u = BaseUrl + "Home/AllWo";
    if (window.location.href === u) {
        GetAllProductionOrdersInWoAjaxCall();
        GetprocutionOrdersCount();
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
let selectItemForPrint;

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

        let href = "";
        let style = "";
        let icon;
        if (element.dosyaUrl) {
            href = `${BaseUrl}StokGetData/OpenFileFromServer?filePath=${element.dosyaUrl}`;
            style = "cursor: pointer ;"

            icon = "far  fa-2x fa-folder-open";
        }
        else {
            href = '';
            style = "pointer-events: none;cursor: not-allowed ;";   
            icon = "fas fa-2x fa-times-circle text-primary";
        }
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
    <td style="${style}"><a style='${style}' target= "_blank"  href="${href}"> <i class="${icon}"></i> </a></td>
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
    selectItemForPrint = selectedItem;
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
}


$('#span-allWo-UnSelectRows').click((event) => {
    event.preventDefault();
    if (selectedAlWoArray.length !== 0) {
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



//#region printOut

$('#btn-allWo-printOut').click(() => {
    if (selectedAlWoArray.length === 0 || selectedAlWoArray.length!==1) 
        Swal.fire({
            type: 'error',
            title: "you should select one row to print Out ",
            timer: 5000
        });
    else {
        let partNoId = selectItemForPrint.partNo_ID;
        let stk = selectItemForPrint.stk;
        let bomList_Print = [];
        console.log(selectItemForPrint);
        ShowLoader();
            $.ajax({
            type: "POST",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.GetBomProcessForPrint + partNoId,
            success: (bomList_Print) => {
                console.log('printBom', bomList_Print);
                bomList_Print = bomList_Print;
                
                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    url: `${HttpUrls.GetTStokReceteForPrint}'${stk}'`,
                    success: (TstokRecet_print) => {
                        console.log('printTstok', TstokRecet_print);

                        createWoPrintOutModel(stk, selectItemForPrint.lotNo, selectItemForPrint.requireDate, bomList_Print, TstokRecet_print, selectItemForPrint.qty);
                    }
                });

            }
        });
       


        }
})
//#endregion



function createWoPrintOutModel(stk, lotNo, reqireDate,bomList,TsokList,qty) {
    $('#woPrintModel').empty();
    $('#woPrintModel').css('opacity', '1');

    $('#woPrintModel').append(createWoCikti(bomList, TsokList, stk, lotNo, reqireDate, qty))
    JsBarcode("#newLotNoBarcode", `${lotNo}`, { format: "CODE128", text: "" });
    HideLoader();
    $('#woPrintModel').printThis({
        afterPrint: HideWoPrintModel,
        loadCSS: "css/tamirIsEmriCiktisi.css"
    });
}

function createWoCikti(bomList,TstokList,stk,lotNo,requireDate,qty) {
    let TstokListBody = "";
    let bomListBody = "";
    if (TstokList.length !== 0) {
        TstokList.map((el) => {
            TstokListBody +=`
<tr>
<td>${el.stk}</td>
<td>${el.sta}</td>
<td>${el.stb}</td>
<td>${el.miktar}</td>
</tr>

`;

        })
    }
    if (bomList.length !== 0) {
        bomList.map((el) => {
            bomListBody += `
<tr>
<td>${el.prosesAdi}</td>
<td>${el.processName}</td>
td>${el.qty}</td>
<td>${el.quality}</td>
<td>tarih</td>
<td>miktar</td>
<td>operator</td>
</tr>
`;
        })
    }
    let cikti = `<div class="tamirIsEmriCiktis">
    <div class="first-header">
        <div class="my_firstRow">
            <div class="one">
                <img src="${BaseUrl}images/tamirLogo.png" />
                <p>Parça No/PartNo:</p>
                <h5>${stk}</h5>
            </div>
            <div class="two">
                <p class="rew">Tamir/Rework</p>
                <div class="p1_p2">
                    <div class="p1">Rev:</div>
                    <div class="p2"><p>0</p></div>
                </div>
                <svg id="newLotNoBarcode" class="p3"></svg>
            </div>
            <div class="three">
                <div class="lot">
                    <p>Lot/Batch No:</p>
    <p>${lotNo}</p>


                </div>
                <div class="tarih">
                      <p>tarih:</p>
    <p>${requireDate}</p>
                </div>
                <div class="adet" style="height: 157px">
                    <p>Adet/Qty:</p>
                    <p>${qty}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="clear">
    </div>
    <div class="second-body">
        <h3>Tamir LotNo:${lotNo} <span></span></h3>

<div class="clear">
    </div>

<table style="margin-bottom:5rem;">
            <thead>
                <tr>
                    <td>STK</td>
                    <td>STA</td>
                    <td>STB</td>
                    <td>miktar</td>
                </tr>
            </thead>'
            <tbody>
                  ${TstokListBody}
            </tbody>
        </table>
<div class="clear">
    </div>
        <table>
            <thead>
                <tr>
                    <td>Proses Adı</td>
                    <td>Process Name</td>
                    <td>qty</td>
                    <td>tarih</td>
                    <td>Miktar</td>
                    <td>Operator</td>
                </tr>
            </thead>'
            <tbody>
                  ${bomListBody}
            </tbody>
        </table>
    </div>
</div>`;


    return cikti;
}
function HideWoPrintModel() {
   $('#woPrintModel').empty();
   $('#woPrintModel').css('opacity', '0');
}














