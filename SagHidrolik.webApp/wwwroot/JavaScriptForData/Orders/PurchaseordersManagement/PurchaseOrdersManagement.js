let WoLastInprogressList = [];
let WoLastOpenList = [];
$(function () {
    let b = BaseUrl + "Home/PurchaseOrderMangement";
    if (window.location.href === b) {
        if ($('body').hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
            $('body').toggleClass('nav-md nav-sm');
            $('.dataTable').each(function () { $(this).dataTable().fnDraw(); });
            GetwoStatuslastInprogress();
            GetWoStatusLastOpen();
            GetAllTotalStokAjaxCall();
            $.getJSON(HttpUrls.DropAllPurcahseOrdersTable).then(mes => console.log(mes));
        }
    }
});
let excelName = "";

function GetwoStatuslastInprogress() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetwoStatuslastInprogress,
        success: (list) => {
            WoLastInprogressList = list;
        }
    });
}

function GetWoStatusLastOpen() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetWoStatusLastOpen,
        success: (list) => {
            WoLastOpenList = list;
        }
    });
}

let AllPurchaseOrdersList = [];
$('#btn-purchaseOrderMangemnet-getAllPurchase').click(() => {
    ShowLoader();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllPurchaseOrders,
        success: (list) => {
            $('#span-purchaseOrderMangemnet-toplamRows').text(list.length);
            AllPurchaseOrdersList = list;
            CreatePurchaseOrdersTable(list, TablesId.purchaseOrderMangemnet);
        }
    });
})

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
//#region Export to Excel
$('#btn-purchaseOrderMangemnet-exportToExcel').click((e) => {
    const ws = XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('table-purchaseOrderMangemnet-xls'));
    const wb = XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Purchase Orders');
    XLSX.writeFile(wb, 'Purchase Orders.xlsx');
})

$('#btn-purchaseOrderMangemnet-modal-exportToExcel').click((e) => {
    const ws = XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('table-purchaseOrderMangemnet-modal-xls'));
    const wb = XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `sheet`);
    XLSX.writeFile(wb, `${excelName}.xlsx`);
})

//#endregion

// #region Reset and delete
$('#btn-purchaseOrderMangemnet-deletePurchasOrdersTable').click(e => {
    e.preventDefault();
    $(TablesId.purchaseOrderMangemnet).empty();
})
//#endregion


//#region Mrp
$('#btn-purchaseOrderMangemnet-runMrp').click(() => {

    let lotSize = $("#inp-purchaseOrderMangemnet-lotSize").val();

    if (lotSize === "") Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'lot size is empty',
        timer: 5000
    });
    //else if (AllPurchaseOrdersList.length === 0) Swal.fire({
    //    type: 'error',
    //    title: 'Oops...',
    //    text: 'Purcahse table is empty',
    //    timer: 5000
    //});
    else {
        ShowLoader();
        $.ajax({
            type: "GET",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.RunMrp + lotSize,
            success: (list) => {
                CreateTTfixOrdersTable(list, TablesId.purchaseOrderMangemnet)
                HideLoader();
                Swal.fire({
                    type: 'success',
                    title: 'Done',
                    text: 'Date is ready',
                    timer: 5000
                });
            },
            error: (error) => console.log(error)
        });
    }

})


function CreateTTfixOrdersTable(list, tableId) {
    $(tableId).empty();
    list.map(element => {
        $(tableId).append(`
<tr>
<td>${element.partNo}</td>
<td>${element.location}</td>
<td>${element.requireDate}</td>
<td>${element.requireQTY}</td>
</tr>
`);
    });
}
//#endregion


//#region partOrderSummary
let TTfixOrdersOrderSummaryList = [];
$('#btn-purchaseOrderMangemnet-partOrderSummary').click(e => {
    e.preventDefault();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetTTfixOrdersOrderSummary,
        success: (list) => {
            TTfixOrdersOrderSummaryList = list;
            CreateTTfixOrdersOrderSummaryTable(list);
            excelName = "Part Order Summary";
            $('.modal').modal('show');
        }
    });
})
function CreateTTfixOrdersOrderSummaryTable(list) {
    $('#tabel-purchaseOrderMangemnet-headers').empty();
    $('#tabel-purchaseOrderMangemnet-body').empty();
    if (list.length > 0) {
        $('#table-purchaseOrderMangemnet-modal-recordCount').text(list.length)
        let m = list[0];
        let headerKeys = Object.keys(list[0]);
        let headers = "";
        for (let i = 0; i < headerKeys.length; i++) {
            if (headerKeys[i] !== 'ASSTOK' && headerKeys[i] !== 'PartNo') {
                headers += `<th scope="col">${headerKeys[i]}</th>`;
            }
        }

        $('#tabel-purchaseOrderMangemnet-headers').append(`
   <tr>
                            <th scope="col">PartNo</th>
            <th scope="col">Total Stok</th>
            <th scope="col">ASSTOK</th>
            <th scope="col">WO Open</th>
            <th scope="col">WOInProgress</th>
           <th scope="col">Total Of RequireQty</th>
${headers}
                        </tr>`);

        let dataWithTime = "";
        let totalOfRequireQty = 0;
        list.map((element, index) => {
            let matchedTotlaStok = getTotalStokByStk(element.PartNo);
            let matchedInLastOpen = GetlastOpen(element.PartNo);
            let matchedInPrgress = GetlastProgress(element.PartNo);
            matchedTotlaStok.length <= 0 ? element['totalStok'] = "" : element['totalStok'] = matchedTotlaStok[0].totalStok;
            matchedInLastOpen.length <= 0 ? element['WoOpen'] = "" : element['WoOpen'] = matchedInLastOpen[0].sumOfQty;
            matchedInPrgress.length <= 0 ? element['woInProgress'] = "" : element['woInProgress'] = matchedInPrgress[0].woInProgress;
            for (let i = 0; i < headerKeys.length; i++) {
                if (headerKeys[i] !== 'PartNo' && headerKeys[i] !== 'ASSTOK' && headerKeys[i] !== 'totalStok' && headerKeys[i] !== 'WoOpen' && headerKeys[i] !== 'woInProgress') {
                    dataWithTime += `<td >${element[headerKeys[i]] ? element[headerKeys[i]] : ""}</td>`;
                    totalOfRequireQty += element[headerKeys[i]] ? element[headerKeys[i]] : 0;
                }

            }
            $('#tabel-purchaseOrderMangemnet-body').append(`
<tr>
    <td>${element.PartNo}</td>
    <td>${element.totalStok}</td>
    <td>${element.ASSTOK ? element.ASSTOK : 0}</td>
    <td>${element.WoOpen}</td>
    <td>${element.woInProgress}</td>
    <td>${totalOfRequireQty}</td>
   
${dataWithTime}
             </tr>
`);

            dataWithTime = "";
            matchedInLastOpen, matchedInPrgress = [];
            totalOfRequireQty = 0;
        });
    }


}


function GetlastOpen(partNo) {
    let matched = WoLastOpenList.filter((el) => {
        return partNo == el.partNo_ID;
    });
    return matched;
}

function GetlastProgress(partNo) {
    let matched = WoLastInprogressList.filter((el) => {
        return partNo == el.partNo_ID;
    });
    return matched;
}



//#endregion





//#region Monthly Weekly 


let WeeklyMonthlyFilterModel = {
    bakcOrders: "",
    onlyMissing: "",
    safetyStok: ""
}
$("#btn-purchaseOrderMangemnet-monthlyMaterial").click(e => {
    ShowLoader();
    WeeklyMonthlyFilterModel.bakcOrders = $("#select-purchaseOrderMangemnet-backOrders option:selected").val();
    WeeklyMonthlyFilterModel.onlyMissing = $("#select-purchaseOrderMangemnet-missingComponent option:selected").val();
    WeeklyMonthlyFilterModel.safetyStok = $("#select-purchaseOrderMangemnet-safetyStok option:selected").val();
    console.log(WeeklyMonthlyFilterModel);
    e.preventDefault();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(WeeklyMonthlyFilterModel),
        url: HttpUrls.GetMonthlyMaterialUsage,
        success: (list) => {
            excelName = " Montly Material usage";
            console.log('monthly', list);
            CreateMonthlyWeeklyMaterialUsage(list);
        }
    });
})

$("#btn-purchaseOrderMangemnet-weeklyMaterial").click(e => {
    ShowLoader();
    WeeklyMonthlyFilterModel.bakcOrders = $("#select-purchaseOrderMangemnet-backOrders option:selected").val();
    WeeklyMonthlyFilterModel.onlyMissing = $("#select-purchaseOrderMangemnet-missingComponent option:selected").val();
    WeeklyMonthlyFilterModel.safetyStok = $("#select-purchaseOrderMangemnet-safetyStok option:selected").val();
    console.log(WeeklyMonthlyFilterModel);
    e.preventDefault();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(WeeklyMonthlyFilterModel),
        url: HttpUrls.GetWeeklyMaterialUsage,
        success: (list) => {
            excelName = " Weekly Material usage";
            console.log('weekly', list);
            CreateMonthlyWeeklyMaterialUsage(list);
        }
    });
})
function CreateMonthlyWeeklyMaterialUsage(list) {
    $('#tabel-purchaseOrderMangemnet-headers').empty();
    $('#tabel-purchaseOrderMangemnet-body').empty();
    if (list.length > 0) {
        $('#table-purchaseOrderMangemnet-modal-recordCount').text(list.length);
        let m = list[0];
        let headerKeys = Object.keys(list[0]);
        let headers = "";
        for (let i = 0; i < headerKeys.length; i++) {
            if (headerKeys[i] !== 'ASSTOK' && headerKeys[i] !== 'Currentweek' && headerKeys[i] !== 'STA' && headerKeys[i] !== 'STK' && headerKeys[i] !== 'TUR' && headerKeys[i] !== 'TotalStock') {
                headers += `<th scope="col">${headerKeys[i]}</th>`;
            }
        }
        $('#tabel-purchaseOrderMangemnet-headers').append(`
   <tr>
            <th scope="col">STK</th>
            <th scope="col">STA</th>
            <th scope="col">ASSTOK</th>
            <th scope="col">TotalStok</th>
            <th scope="col">Current Week</th>
           <th scope="col">Tur</th>
${headers}
                        </tr>`);
        let dataWithTime = "";
        list.map((element, index) => {
            for (let i = 0; i < headerKeys.length; i++) {
                if (headerKeys[i] !== 'ASSTOK' && headerKeys[i] !== 'Currentweek' && headerKeys[i] !== 'STA' && headerKeys[i] !== 'STK' && headerKeys[i] !== 'TUR' && headerKeys[i] !== 'TotalStock') {
                    dataWithTime += `<td >${element[headerKeys[i]] ? element[headerKeys[i]] : ""}</td>`;
                }
            }
            $('#tabel-purchaseOrderMangemnet-body').append(`
<tr>
    <td>${element.STK}</td>
    <td>${element.STA}</td>
    <td>${element.ASSTOK ? element.ASSTOK : 0}</td>
    <td>${element.TotalStock}</td>
    <td>${element.Currentweek}</td>
    <td>${element.TUR}</td>
${dataWithTime}
             </tr>
`);
            dataWithTime = "";
        });
        HideLoader();
        $('.modal').modal('show');
    }
}
//#endregion


// #region NewWo  - WoPlan
// new Wo
$("#btn-purchaseOrderMangemnet-newWoList").click(e => {
    ShowLoader();
    e.preventDefault();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetNewWoListInPurchaseOrders,
        success: (list) => {
            excelName = "New Wo List (Weekly)";
            console.log('tesssss', list);
            CreateNewWoListInPurchaseOrders(list);
        }
    });
})
function CreateNewWoListInPurchaseOrders(list) {

    $('#tabel-purchaseOrderMangemnet-headers').empty();
    $('#tabel-purchaseOrderMangemnet-body').empty();
    if (list.length > 0) {
        $('#table-purchaseOrderMangemnet-modal-recordCount').text(list.length);
        let m = list[0];
        let headerKeys = Object.keys(list[0]);
        let headers = "";
        for (let i = 0; i < headerKeys.length; i++) {
            {
                headers += `<th scope="col">${headerKeys[i]}</th>`;
            }
        }
        $('#tabel-purchaseOrderMangemnet-headers').append(`
   <tr>
${headers}
  </tr>`);
        let data = "";
        list.map((element, index) => {
            for (let i = 0; i < headerKeys.length; i++) {
                {
                    data += `<td >${element[headerKeys[i]] ? element[headerKeys[i]] : ""}</td>`;
                }
            }
            $('#tabel-purchaseOrderMangemnet-body').append(`
<tr>
   ${data}
             </tr>
`);
            data = "";
        });
    
    }
    HideLoader();
    $('.modal').modal('show');
}



// WoPlan

$("#btn-purchaseOrderMangemnet-woPlanWeekly").click(e => {
    ShowLoader();
    e.preventDefault();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetWoPlanListInPurchaseOrders,
        success: (list) => {
            excelName = "Wo Plan (Weekly)";
            CreateWoPlanListInPurchaseOrders(list);
        }
    });
})
function CreateWoPlanListInPurchaseOrders(list) {
    $('#tabel-purchaseOrderMangemnet-headers').empty();
    $('#tabel-purchaseOrderMangemnet-body').empty();
    if (list.length > 0) {
        $('#table-purchaseOrderMangemnet-modal-recordCount').text(list.length);
        let m = list[0];
        let headerKeys = Object.keys(list[0]);
        let headers = "";
        for (let i = 0; i < headerKeys.length; i++) {
            if (headerKeys[i] !== 'InProgress' && headerKeys[i] !== 'PartNo' && headerKeys[i] !== 'Prod' && headerKeys[i] !== 'WODate' && headerKeys[i] !== 'WOPlanned' && headerKeys[i] !== 'WoInProgress') {
                headers += `<th scope="col">${headerKeys[i]}</th>`;
            }
        }
        $('#tabel-purchaseOrderMangemnet-headers').append(`
   <tr>
            <th scope="col">PartNo</th>
            <th scope="col">Inprogrss</th>
            <th scope="col">TotalWo</th>
${headers}
                        </tr>`);
        let dataWithTime = "";
        let totalOfRequireQty = 0;
        list.map((element, index) => {
            for (let i = 0; i < headerKeys.length; i++) {
                if (headerKeys[i] !== 'InProgress' && headerKeys[i] !== 'PartNo' && headerKeys[i] !== 'Prod' && headerKeys[i] !== 'WODate' && headerKeys[i] !== 'WOPlanned' && headerKeys[i] !== 'WoInProgress') {
                    dataWithTime += `<td >${element[headerKeys[i]] ? element[headerKeys[i]] : ""}</td>`;
                    totalOfRequireQty += element[headerKeys[i]] ? element[headerKeys[i]] : 0;
                }
            }
            $('#tabel-purchaseOrderMangemnet-body').append(`
<tr>
    <td>${element.PartNo}</td>
    <td>${element.InProgress}</td>
    <td>${totalOfRequireQty}</td>
${dataWithTime}
             </tr>
`);
            dataWithTime = "";
            totalOfRequireQty = 0;
        });
    
    }
    HideLoader();
    $('.modal').modal('show');
}

// #endregion

//const checkReload = window.addEventListener('beforeunload', function (e) {

//    let b = BaseUrl + "Home/PurchaseOrderMangement";
//    if (window.location.href === b) {
//        let confirmationMessage = 'Exit message';
//        e.returnValue = confirmationMessage;
//        this.console.log(e);
//        this.console.log(confirmationMessage);
//        return confirmationMessage;
//        }

//});





