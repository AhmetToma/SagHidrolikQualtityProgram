let CustomerOrdersList = []
    ; let requestQueryForCustomerOrders = {
        pageNumber: 1,
        pageSize: 5000000,
        Stk: "",
        pid: ""
    };
let pagination1 = {
    pageNumber: 1,
    pageSize: 6,
}
$('#tab-customerOrders').click((e) => {
    e.preventDefault
    ShowLoader();
    $.when($.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetStokAll,
        data: JSON.stringify(requestQueryForCustomerOrders),
        success: (list) => {
            totalStokList = list;
        }
    }), $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetInProgress,
        success: (list) => {
            InProgresList = list;
        }
    }), $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForCustomerOrders),
        url: HttpUrls.GetCustomerOrders,
        success: (list) => {
            CustomerOrdersList = list;
        }
    })
    ).done(function (a1, a2, a3) {
        CreateCustomerOrdersTable();
        GetCustomerOrdersCount();
    });

})
function GetCustomerOrdersCount() {
    $('#select-customerOrders-selectRowCount').empty();
    let num = CustomerOrdersList.length;
    $('#select-customerOrders-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">20</option>
                    <option value="15">50</option>
                    <option value="20">100</option>
                    <option value="${num}">(${num}) All Records</option>
`);
    $('#span-customerOrders-rowCount').text(num)
}
function GetCustomerOrdersAJaxCall() {
    if (requestQueryForCustomerOrders.pageNumber === 1) {
        disableButton(PreviousButtons.customerOrders);
        ActiveButton(NextButtons.customerOrders);
    }
    else {
        ActiveButton(PreviousButtons.customerOrders);
        ActiveButton(NextButtons.customerOrders);
    }

    ShowLoader();
    requestQueryForCustomerOrders.Stk = $(Inputs.customerOrders_searchStk).val();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForCustomerOrders),
        url: HttpUrls.GetCustomerOrders,
        success: (list) => {
            if (list.length !== 0) {
                $('#recordNotFoundDiv_customerOrders').css('display', 'none');
                CustomerOrdersList = list;
                CreateCustomerOrdersTable();
            }
            else {
                disableButton(NextButtons.customerOrders);
                $(TablesId.customerOrders).empty();
                $(`#recordNotFoundDiv_customerOrders h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $('#recordNotFoundDiv_customerOrders').css('display', 'block');
                HideLoader();
            }
        }
    });
}

//#region row count
$('#select-customerOrders-selectRowCount').on('change', () => {
    ShowLoader();
    pagination1.pageSize = parseInt($('#select-customerOrders-selectRowCount').val());
    pagination1.pageNumber = 1;
    $('#num-customerOrders-pageNumber').text(pagination1.pageNumber);
    CreateCustomerOrdersTable();
});
//#endregion

function CreateCustomerOrdersTable() {
    ShowLoader();
    let pageSize = pagination1.pageSize * pagination1.pageNumber;
    let pageNumber = (pagination1.pageNumber - 1) * pagination1.pageSize;
    let slicedList = CustomerOrdersList.slice(pageNumber, pageSize);
    let d = new Date();
    let yearRows = "";
    let totalAllYear = 0;
    $(TablesId.customerOrders).empty();
    if (slicedList.length <= 0) {
        disableButton(NextButtons.customerOrders);
        ActiveButton(PreviousButtons.customerOrders);
        $(`#recordNotFoundDiv_customerOrders h3`).text('Hiç Bir Kayit Bulunmamaktadır');
        $('#recordNotFoundDiv_customerOrders').css('display', 'block');
    }
    else {
        $('#recordNotFoundDiv_customerOrders').css('display', 'none');
        slicedList.map((element, index) => {

            for (let i = 2017; i <= d.getFullYear(); i++) {
                element[`${i}`] ? element[`${i}`] = element[`${i}`] : element[`${i}`] = 0;
                totalAllYear = totalAllYear + parseInt(element[`${i}`]);
                element[`${i}`] != 0 ? element[`${i}`] = element[`${i}`] : element[`${i}`] = "";
                yearRows = yearRows + `<td>${element[`${i}`]}</td>`
            }
            let matchedTotlaStok = getTotalStokByStk(element.STK);
            let matchedInProgress = getInProgresByStk(element.STK);
            matchedTotlaStok.length <= 0 ? element['totalStok'] = "" : element['totalStok'] = matchedTotlaStok[0].totalStok;
            matchedInProgress.length <= 0 ? element['InProgress'] = "" : element['InProgress'] = matchedInProgress[0].total;
            $(TablesId.customerOrders).append(`
<tr>
    <td>${element.STK}</td>
    <td>${element.CARIREF}</td>
    <td>${element.STA}</td>
    ${yearRows}
    <td>${totalAllYear}</td>
    <td>${element.totalStok}</td>
    <td>${element.InProgress}</td>
             </tr>
`);
            yearRows = "";
            totalAllYear = 0;
            matchedInProgress, matchedTotlaStok = [];
        });
    }
    
        HideLoader();
}

//#region Next-Previous Hanldler
$(PreviousButtons.customerOrders).on('click', (event) => {
    event.preventDefault();
    if (pagination1.pageNumber > 1) { pagination1.pageNumber -= 1; }
    $('#num-customerOrders-pageNumber').text(pagination1.pageNumber);
    CreateCustomerOrdersTable();
});
$(NextButtons.customerOrders).on('click', (event) => {
    event.preventDefault();
    pagination1.pageNumber += 1;
    $('#num-customerOrders-pageNumber').text(pagination1.pageNumber);
    CreateCustomerOrdersTable();
});
//#endregion
// #region search
$(Inputs.customerOrders_searchStk).keyup(function () {
    clearTimeout(uretimPlaniypingTimer);
    pagination1.pageNumber = 1;
    $('#num-customerOrders-pageNumber').text(pagination1.pageNumber);
    uretimPlaniypingTimer = setTimeout(GetCustomerOrdersAJaxCall, uretimPlanidoneTypingInterval);

});
// #endregion

//#region  reset
$('#btn-customerOrders-reset').click(() => {
    requestQueryForCustomerOrders.pageNumber = 1;
    $('#num-customerOrders-pageNumber').text(requestQueryForCustomerOrders.pageNumber);
    $(Inputs.customerOrders_searchStk).val('');
    $('#select-customerOrders-selectRowCount').val('6');
    GetCustomerOrdersAJaxCall();
})
//#endregion


