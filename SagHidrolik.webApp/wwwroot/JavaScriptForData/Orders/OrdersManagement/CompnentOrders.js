let totalStokList = [];
let InProgresList = [];
let componentOrderslist = [];
let requestQueryForComponentOrders = {
    pageNumber: 1,
    pageSize: 5000000,
    Stk: "",
    pid: "",
    month:""
};
let pagination = {
    pageNumber: 1,
    pageSize: 6,
}
$('#tab-componentOrders').click((e) => {
    e.preventDefault();
    //GetAllTotalStokAjaxCall();
    //  GetAllInProgresAjaxCall();
    $('#select-componentOrders-selectMonth').val(today.split('/')[1]);
    ShowLoader();
    $.when($.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetStokAll,
        data: JSON.stringify(requestQueryForComponentOrders),
        success: (list) => {
            totalStokList = list;
        }
    }), $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetInProgress,
        success: (list) => {
            InProgresList = list;
            console.log(list);
        }
    }), $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForComponentOrders),
        url: HttpUrls.GetComponentOrders,
        success: (list) => {
            componentOrderslist = list;
            console.log(componentOrderslist);
        }
    })
    ).done(function (a1, a2, a3) {
        CreateComponetOrdersTable();
        GetComponentOrdersCount();
    });

})
function GetComponentOrdersCount() {
    $('#select-componentOrders-selectRowCount').empty();
    let num = componentOrderslist.length;
        $('#select-componentOrders-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">20</option>
                    <option value="15">50</option>
                    <option value="20">100</option>
                    <option value="${num}">(${num}) All Records</option>
`);
        $('#span-componentOrders-rowCount').text(num)
}
function GetAllTotalStokAjaxCall() {

    requestQueryForComponentOrders.pageSize = 500000;
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetStokAll,
        data: JSON.stringify(requestQueryForComponentOrders),
        success: (list) => {
            totalStokList = list;
            return list;
        }
    });
}
function GetAllInProgresAjaxCall() {

    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetInProgress,
        success: (list) => {
            InProgresList = list;
            return list;
        }
    });
}
function GetComponentOrdersAJaxCall() {

    if (requestQueryForComponentOrders.pageNumber === 1) {
        disableButton(PreviousButtons.componentOrders);
        ActiveButton(NextButtons.componentOrders);
    }
    else {
        ActiveButton(PreviousButtons.componentOrders);
        ActiveButton(NextButtons.componentOrders);
    }
    ShowLoader();
    console.log($(Inputs.componentOrders_searchStk).val());
    requestQueryForComponentOrders.Stk= $(Inputs.componentOrders_searchStk).val();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForComponentOrders),
        url: HttpUrls.GetComponentOrders,
        success: (list) => {
            if (list.length !== 0) {
                $('#recordNotFoundDiv_componentOrders').css('display', 'none');
                componentOrderslist = list;
                CreateComponetOrdersTable();
            }
            else {
                disableButton(NextButtons.componentOrders);
                $(TablesId.componentOrders).empty();
                $(`#recordNotFoundDiv_componentOrders h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $('#recordNotFoundDiv_componentOrders').css('display', 'block');
                HideLoader();
            }
        }
    });
}
function getTotalStokByStk(stk) {
    let matched = totalStokList.filter((el) => {
        return stk == el.stk;
    });
    return matched;
}
function getInProgresByStk(stk) {
    let matched = InProgresList.filter((el) => {
        return stk == el.stk;
    });
    return matched;
}

//#region select  row count

$('#select-componentOrders-selectRowCount').on('change', () => {
    pagination.pageSize = parseInt($('#select-componentOrders-selectRowCount').val());
    pagination.pageNumber = 1;
    $('#num-componentOrders-pageNumber').text(pagination.pageNumber);
    CreateComponetOrdersTable();
});
//#endregion


//#region select Month
$('#select-componentOrders-selectMonth').on('change', () => {
    ShowLoader();
    requestQueryForComponentOrders.month = $('#select-componentOrders-selectMonth').val();
    pagination.pageNumber = 1;
    $('#num-customerOrders-pageNumber').text(pagination.pageNumber);
    GetComponentOrdersAJaxCall();
});
//#endregion


function CreateComponetOrdersTable() {
    ShowLoader();
    let pageSize = pagination.pageSize * pagination.pageNumber;
    let pageNumber =  (pagination.pageNumber-1)*pagination.pageSize;
    let slicedList = componentOrderslist.slice(pageNumber, pageSize);
    $(TablesId.componentOrders).empty();
    $('#table-componentOrders-dateHeaders').empty();
    if (slicedList.length <= 0) {
        disableButton(NextButtons.componentOrders);
        ActiveButton(PreviousButtons.componentOrders);
        $(`#recordNotFoundDiv_componentOrders h3`).text('Hiç Bir Kayit Bulunmamaktadır');
        $('#recordNotFoundDiv_componentOrders').css('display', 'block');
    }
    else {
        $('#recordNotFoundDiv_componentOrders').css('display', 'none');
        let headerKeys = Object.keys(slicedList[0]);
        let headers = "";
        for (let i = 0; i < headerKeys.length; i++) {
            if (headerKeys[i] !== 'CARIREF' && headerKeys[i] !== 'InProgress' && headerKeys[i] !== 'STA' && headerKeys[i] !== 'STK' && headerKeys[i] !== 'totalStok' && headerKeys[i] !== 'carigenSta') {
                console.log(headerKeys[i]);
                headers += `<th scope="col">${headerKeys[i]}</th>`;
            }
        }

        $('#table-componentOrders-dateHeaders').append(`
   <tr>
                            <th scope="col">STK</th>
            <th scope="col">Carigen STA</th>
            <th scope="col">STA</th>
            <th scope="col">Total Stok</th>
            <th scope="col">InProgres</th>
${headers}
                        </tr>`);
        let dataWithTime = "";
        slicedList.map((element, index) => {
            let matchedTotlaStok = getTotalStokByStk(element.STK);
            let matchedInProgress = getInProgresByStk(element.STK);
            matchedTotlaStok.length <= 0 ? element['totalStok'] = "" : element['totalStok'] = matchedTotlaStok[0].totalStok;
            matchedInProgress.length <= 0 ? element['InProgress'] = "" : element['InProgress'] = matchedInProgress[0].total;
            for (let i = 0; i < headerKeys.length; i++) {
                if (headerKeys[i] !== 'CARIREF' && headerKeys[i] !== 'InProgress' && headerKeys[i] !== 'STA' && headerKeys[i] !== 'STK' && headerKeys[i] !== 'totalStok' & headerKeys[i] !== 'carigenSta')
                    dataWithTime += `<td >${element[headerKeys[i]] ? element[headerKeys[i]] : ""}</td>`;
            }
            $(TablesId.componentOrders).append(`
<tr>
    <td>${element.STK}</td>
    <td>${element.carigenSta}</td>
    <td>${element.STA}</td>
    <td>${element.totalStok}</td>
    <td>${element.InProgress}</td>
${dataWithTime}
             </tr>
`);

            dataWithTime = "";
            matchedInProgress, matchedTotlaStok = [];
        });
    }
    HideLoader();
}


//#region Next-Previous Hanldler
$(PreviousButtons.componentOrders).on('click', (event) => {
    event.preventDefault();
    if (pagination.pageNumber > 1) { pagination.pageNumber -= 1; }
    $('#num-componentOrders-pageNumber').text(pagination.pageNumber);
    CreateComponetOrdersTable();
});
$(NextButtons.componentOrders).on('click', (event) => {
    event.preventDefault();
    pagination.pageNumber += 1;
    $('#num-componentOrders-pageNumber').text(pagination.pageNumber);
    console.log(pagination);
    CreateComponetOrdersTable();
});
// #region search
$(Inputs.componentOrders_searchStk).keyup(function () {
    clearTimeout(timer);
    pagination.pageNumber = 1;
    $('#num-componentOrders-pageNumber').text(pagination.pageNumber);
    timer = setTimeout(GetComponentOrdersAJaxCall, doneTypingInterval);
    
});
// #endregion 


//#region  reset
$('#btn-componentOrders-reset').click(() => {
    requestQueryForComponentOrders.pageNumber = 1;
    pagination.pageNumber = 1;
    pagination.pageSize = 6;
    $('#num-componentOrders-pageNumber').text(requestQueryForComponentOrders.pageNumber);
    $(Inputs.componentOrders_searchStk).val('');
    $('#select-componentOrders-selectRowCount').val('6');
    $('#select-componentOrders-selectMonth').val(today.split('/')[1]);
    GetComponentOrdersAJaxCall();
})
//#endregion


//#region Export to Excel
$('#btn-componentOrders-exportToExcel').click((e) => {
    const ws = XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('table-componentOrders-xls'));
    const wb = XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Component Orders');
    XLSX.writeFile(wb, 'Component Orders.xlsx');
})
//#endregion
