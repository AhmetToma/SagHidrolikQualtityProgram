$(function () {
    let dataUrl = "Home/OrderMangement";
    let ur = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === ur || window.location.href === serverUrl) {
        SearchStokInOrderDetails();
    }
});

let requestQueryForOrderDetails = {
    pageNumber: 1,
    pageSize: 10,
    Stk: "",
    pid: ""
};

//#region Search Stok 
$(Inputs.orderDetails_searchStk).keyup(function () {
    $('#orderDetailsSection').css('opacity', '0');
    clearTimeout(timer);
    timer = setTimeout(SearchStokInOrderDetails, doneTypingInterval);
});
function SearchStokInOrderDetails() {
    requestQueryForOrderDetails.Stk = $(Inputs.orderDetails_searchStk).val();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForOrderDetails),
        url: HttpUrls.GetStokkenByStkListOnlypageSize,
        success: (list) => {
            creatStokgenTable(list, TablesId.orderDetails_stok);
        }
    });
    ShowLoader();
}
//#endregion

//#region Order Details
$(TablesId.orderDetails_stok).on('click', 'tr', function () {
    let stk = $(this).data('id').toString();
    let pId = $(this).data('p_id').toString();
    console.log(stk, pId);
    $('#orderDetailsSection').css('opacity', '1');
    requestQueryForOrderDetails.Stk = stk;
    requestQueryForOrderDetails.pid = pId;
    requestQueryForOrderDetails.pageNumber = 1;
    requestQueryForOrderDetails.pageSize = 10;
    $('#num-orderDetails-pageNumber').text(requestQueryForOrderDetails.pageNumber);
    GetOrderDetailsAjaxCall();
});
function GetOrderDetailsAjaxCall() {
    if (requestQueryForOrderDetails.pageNumber === 1) {
        disableButton(PreviousButtons.orderDetails);
        ActiveButton(NextButtons.orderDetails);
    }
    else {
        ActiveButton(PreviousButtons.orderDetails);
        ActiveButton(NextButtons.orderDetails);
    }





    ShowLoader();
    $(TablesId.orderDetails).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForOrderDetails),
        url: HttpUrls.GetOrderDetails,
        success: (list) => {
            if (list.length !== 0) {
                console.log(list);
                $(recordsNotFound.orderDetails).css('display', 'none');
                CreateOrderDetailsTable(list, TablesId.orderDetails);
            }
            else {
                disableButton(NextButtons.orderDetails);
                $(`${recordsNotFound.orderDetails} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.orderDetails).css('display', 'block');
                HideLoader();
            }
        }
    });
}
  
function CreateOrderDetailsTable(list, tablId) {
    $(tablId).empty();
    list.map((el) => {
        el.fatirstur ? el.fatirstur = el.fatirstur : el.fatirstur = "";
        $(tablId).append(`
<tr>
<td>${el.sipevrakno}</td>
<td>${el.stk}</td>
<td>${el.orderQty}</td>
<td>${el.totalInvoice}</td>
<td>${el.turac}</td>
<td>${el.fatirstur}</td>
<td>${el.testarihi.slice(0,-11)}</td>
<td>${el.sta}</td>
</tr>
`)
    })
    HideLoader();
}



//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.orderDetails).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForOrderDetails.pageNumber > 1) requestQueryForOrderDetails.pageNumber -= 1;
    $('#num-orderDetails-pageNumber').text(requestQueryForOrderDetails.pageNumber);
    GetOrderDetailsAjaxCall();
});
$(NextButtons.orderDetails).on('click', (event) => {
    event.preventDefault();
    requestQueryForOrderDetails.pageNumber += 1;
    $('#num-orderDetails-pageNumber').text(requestQueryForOrderDetails.pageNumber);
    GetOrderDetailsAjaxCall();
});
//#endregion


//#region Reset

$('#btn-orderDetails-reset').click((e) => {
    e.preventDefault();
    $(Inputs.orderDetails_searchStk).val('');
    $('#orderDetailsSection').css('opacity', '0');
    SearchStokInOrderDetails();
})
//#endregion