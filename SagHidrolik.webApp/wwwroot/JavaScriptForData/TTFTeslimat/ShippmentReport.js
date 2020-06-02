let ShippmentReportList = []
    ; let requestQueryForShippmentReport = {
        pageNumber: 1,
        pageSize: 500000,
        Stk: "",
        pid: ""
    };
let pagination2 = {
    pageNumber: 1,
    pageSize: 6,
}
$('#tab-shippmentReport').click((e) => {
    e.preventDefault;
    ShowLoader();
    $.when($.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetStokAll,
        data: JSON.stringify(requestQueryForShippmentReport),
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
        data: JSON.stringify(requestQueryForShippmentReport),
        url: HttpUrls.GetShippmentReport,
        success: (list) => {
            ShippmentReportList = list;
        }
    })
    ).done(function (a1, a2, a3) {
        CreateShippmentReportTable();
        GetShippmentReportCount();
    });
})
function GetShippmentReportCount() {
    $('#select-shippmentReport-selectRowCount').empty();
    let num = ShippmentReportList.length;
    $('#select-shippmentReport-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">20</option>
                    <option value="15">50</option>
                    <option value="20">100</option>
                    <option value="${num}">(${num}) All Records</option>
`);
    $('#span-shippmentReport-rowCount').text(num)
}
function GetShippmentReportAJaxCall() {
    ShowLoader();
    requestQueryForShippmentReport.Stk = $(Inputs.shippmentReport_searchStk).val();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForShippmentReport),
        url: HttpUrls.GetShippmentReport,
        success: (list) => {
            if (list.length !== 0) {
                $('#recordNotFoundDiv_shippmentReport').css('display', 'none');
                ShippmentReportList = list;
                CreateShippmentReportTable();
            }
            else {
                $(TablesId.shippmentReport).empty();
                $(`#recordNotFoundDiv_shippmentReport h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $('#recordNotFoundDiv_shippmentReport').css('display', 'block');
                HideLoader();
            }
        }
    });
}

//#region row count
$('#select-shippmentReport-selectRowCount').on('change', () => {
    ShowLoader();
    pagination2.pageSize = parseInt($('#select-shippmentReport-selectRowCount').val());
    pagination2.pageNumber = 1;
    $('#num-shippmentReport-pageNumber').text(pagination2.pageNumber);
    CreateShippmentReportTable();
});
//#endregion

function CreateShippmentReportTable() {
    $('#shippmentReportColumns').empty();
    ShowLoader();
    let pageSize = pagination2.pageSize * pagination2.pageNumber;
    let pageNumber = (pagination2.pageNumber - 1) * pagination2.pageSize;
    let slicedList = ShippmentReportList.slice(pageNumber, pageSize);
    let objKeys = Object.keys(ShippmentReportList[0]);
    let monthArray = [];
    let existedMonth = [];
    let monthCoulmn = "";
    let monthValues = "";
    let monthNames = ['ocak', 'şubat', 'mart', 'nisan', 'mayıs', 'haziran', 'temmuz', 'ağustos', 'eylül', 'ekim', 'kasım', 'aralık']
    for (var i = 1; i < 13; i++) {
        monthArray.push(`${i}`);
    }

    for (var x = 0; x < objKeys.length; x++) {
        let finded = monthArray.filter(el => {
            if (el == objKeys[x]) return el;
        });
        if (finded.length > 0) existedMonth.push(finded[0]);
    }
    for (var i = 0; i < existedMonth.length; i++) {
        monthCoulmn = monthCoulmn + `<th scope='col'>${monthNames[parseInt(existedMonth[i]) - 1]}</th >`
    }
    $('#shippmentReportColumns').append(`
   <tr>
                            <th scope="col">STK</th>
                            <th scope="col">Sipariş Bilgi Türü</th>
                            <th scope="col">Mştrlok</th>
                            <th scope="col">Raf</th>
                            <th scope="col">Kutu Tipi</th>
                            <th scope="col">Total Stok</th>
                            <th scope="col">In Progress</th>
                            <th scope="col">Kutu içi Miktari</th>
                            <th id="" scope="col">Toplam Sevk</th>
${monthCoulmn}
                        </tr>
`
    );

    let d = new Date();
    $(TablesId.shippmentReport).empty();
    slicedList.map((element, index) => {
        let matchedTotlaStok = getTotalStokByStk(element.stk);
        let matchedInProgress = getInProgresByStk(element.stk);
        matchedTotlaStok.length <= 0 ? element['totalStok'] = "" : element['totalStok'] = matchedTotlaStok[0].totalStok;
        matchedInProgress.length <= 0 ? element['InProgress'] = "" : element['InProgress'] = matchedInProgress[0].total;

        for (var i = 0; i < existedMonth.length; i++) {
            element[existedMonth[i]] ? element[existedMonth[i]] = element[existedMonth[i]] : element[existedMonth[i]] = "";
            monthValues = monthValues + `<td>${element[existedMonth[i]]}</td>`
        }
        console.log(monthValues);
        $(TablesId.shippmentReport).append(`
<tr>
    <td>${element.stk}</td>
    <td>${element.BilgiTuru}</td>
    <td>${element.mstrlok}</td>
   <td>${element.Raf}</td>
   <td>${element.kutuTipi}</td>
    <td>${element.totalStok}</td>
   <td>${element.InProgress}</td>
   <td>${element.KutuIciMiktari}</td>
   <td>${element.Toplam}</td>
${monthValues}
             </tr>
`);
        monthValues = "";
        matchedInProgress, matchedTotlaStok = [];
    });
    HideLoader();
}

//#region Next-Previous Hanldler
$(PreviousButtons.shippmentReport).on('click', (event) => {
    event.preventDefault();
    if (pagination2.pageNumber > 1) { pagination2.pageNumber -= 1; }
    $('#num-shippmentReport-pageNumber').text(pagination2.pageNumber);
    CreateShippmentReportTable();
});
$(NextButtons.shippmentReport).on('click', (event) => {
    event.preventDefault();
    pagination2.pageNumber += 1;
    $('#num-shippmentReport-pageNumber').text(pagination2.pageNumber);
    CreateShippmentReportTable();
});
//#endregion
// #region search
$(Inputs.shippmentReport_searchStk).keyup(function () {
    clearTimeout(timer);
    pagination2.pageNumber = 1;
    $('#num-shippmentReport-pageNumber').text(pagination2.pageNumber);
    timer = setTimeout(GetShippmentReportAJaxCall, doneTypingInterval);

});
// #endregion

