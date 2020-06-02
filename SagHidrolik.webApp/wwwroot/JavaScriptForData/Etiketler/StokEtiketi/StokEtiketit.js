    $(function () {
    let dataUrl = "Home/StokEtiketi";
    let tamirIsUrl = BaseUrl + dataUrl;     let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === tamirIsUrl || window.location.href === serverUrl) {
        GetAllStokEtiketiAjaxCall();
        $(Inputs.stokEtiekt_paketlemeTarihi).datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $(Inputs.stokEtiekt_paketlemeTarihi).val(today);
    }
});
let requestQueryForStokEtiketi = {
    pageNumber: 1,
    pageSize: 6,
    Stk: "" 
};
let stokEtiketiList = [];
let stokEtiketiModel = {};
// #region Ajax Call And create All stok etiketi and select row
function GetAllStokEtiketiAjaxCall() {
    requestQueryForStokEtiketi.Stk = $(Inputs.stokEtiekt_stkSearch).val();
    ShowLoader();
    $(TablesId.stokEtiketi_stokEtiketiList).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllStokEtiketi,
        data: JSON.stringify(requestQueryForStokEtiketi),
        success: (list) => {
            stokEtiketiList = list;
            if (list.length !== 0) {
                $(NotFoundRecordsId.stokEtiketi).css('display', 'none');
                CreateAllStokEtiketiTable(list, TablesId.stokEtiketi_stokEtiketiList);
            }
            else {

                $(`${NotFoundRecordsId.stokEtiketi} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(NotFoundRecordsId.stokEtiketi).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateAllStokEtiketiTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        let fielD18 = "";
        let fielD19 = "";
        let totalStok = "";
        let stokref=""
        element.fielD18 ? fielD18 = element.fielD18 : fielD18 = "";
        element.fielD19 ? fielD19 = element.fielD19 : fielD19 = "";
        element.totalStok ? totalStok = element.totalStok : totalStok = "";
        element.stokref ? stokref = element.stokref : stokref = "";
        $(tableId).append(`
<tr data-stk="${element.stk}" data-pid="${element.p_ID}">
  <td>${element.stk}</td>
    <td>${totalStok}</td>
    <td>${element.tur} </td>
    <td>${element.sta}</td>
    <td>${element.ref}</td>
    <td>${stokref}</td>
    <td>${element.p_ID}</td>
    <td>${fielD18}</td>
    <td>${fielD19}</td>
             </tr>
`);
    });
    HideLoader();
}
$(TablesId.stokEtiketi_stokEtiketiList).on('click', 'tr', function () {
    $(TablesId.stokEtiket_tableResult).empty();
    $('.stokEtiketiUnderSection').css('opacity', '1');
    ShowLoader();
    $([document.documentElement, document.body]).animate({
        scrollTop: $('.stokEtiketiUnderSection').offset().top
    }, 500);

    let pidforStokEiketi = $(this).data('pid');
    let matched = stokEtiketiList.filter((element) => {
        if (element.p_ID == pidforStokEiketi) return element;
    });

    stokEtiketiModel = matched[0];
    if (stokEtiketiModel != null) {
        Object.keys(stokEtiketiModel).map((element) => {
            if (stokEtiketiModel[element] == null)
                stokEtiketiModel[element] = "";
        });
    }
    $(Texts.stokEtiketi_stk).text(stokEtiketiModel.stk);
    $(Texts.stokEtiketi_file18).text(stokEtiketiModel.fielD18);
    $(Texts.stokEtiketi_file19).text(stokEtiketiModel.fielD19);
    $(Texts.stokEtiketi_kutuMiktari).text(stokEtiketiModel.totalStok);
    HideLoader();

    console.log(stokEtiketiModel);
});



//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.stokEtiketi).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForStokEtiketi.pageNumber > 1) requestQueryForStokEtiketi.pageNumber -= 1;
    $(PageNumbers.stokEtiketi).text(requestQueryForStokEtiketi.pageNumber);
    GetAllStokEtiketiAjaxCall();
});
$(NextButtons.stokEtiketi).on('click', (event) => {
    event.preventDefault();
    requestQueryForStokEtiketi.pageNumber += 1;
    $(PageNumbers.stokEtiketi).text(requestQueryForStokEtiketi.pageNumber);
    GetAllStokEtiketiAjaxCall();
});
//#endregion
// #region search
let stokEtiketiTypingTimer;
let stokEtiketidoneTypingInterval = 500;
$(Inputs.stokEtiekt_stkSearch).keyup(function () {

    clearTimeout(stokEtiketiTypingTimer);

        requestQueryForStokEtiketi.pageNumber = 1;
        $(PageNumbers.stokEtiketi).text(requestQueryForStokEtiketi.pageNumber);
        stokEtiketiTypingTimer = setTimeout(GetAllStokEtiketiAjaxCall, stokEtiketidoneTypingInterval);
});

// #endregion 





// #region Tek Toplu Etik

let stokEtiketiResultTable = [];
// tek
$(Buttons.stokEtiketi_tekEtiket).click((event) => {

    $(TablesId.stokEtiket_tableResult).empty();
    let adet = $(Inputs.stokEtiekt_paketlemeMiktari).val();
    let tarih = $(Inputs.stokEtiekt_paketlemeTarihi).val();
    event.preventDefault();
    if ($(Inputs.stokEtiekt_paketlemeMiktari).val() === '' || $(Inputs.stokEtiekt_paketlemeMiktari).val() === "0") {
        Swal.fire({
            type: 'error',
            title: 'Paketleme Miktarı',
            text: 'Paketleme Miktarı girmeniz gerekiyor '
        });
    }
    else {

        $(TablesId.stokEtiket_tableResult).append(`
<tr >
  <td>${stokEtiketiModel.stk}</td>
    <td>${adet}</td>
    <td>${tarih} </td>
    <td>${stokEtiketiModel.totalStok}</td>
    <td>1</td>
    <td>0</td>
    <td>${stokEtiketiModel.fielD18}</td>
    <td>${stokEtiketiModel.fielD19}</td>
             </tr>

`);
    }
    stokEtiketiResultTable = [];
    let rowCount = $(`${TablesId.stokEtiket_tableResult} tr`).length;
    if (rowCount > 0);
    {
        for (var i = 0; i < rowCount; i++) {
            stokEtiketiResultTable[i] = $(`${TablesId.stokEtiket_tableResult} tr:nth-child(${i + 1}) td:nth-child(${2})`).text();

        }
    }


 
});


// toplu



$(Buttons.stokEtiketi_topluEtiket).click((event) => {
    let ii = 0;
    event.preventDefault();
    $(TablesId.stokEtiket_tableResult).empty();
    let paketlemeMiktari = $(Inputs.stokEtiekt_paketlemeMiktari).val();
    let tarih = $(Inputs.stokEtiekt_paketlemeTarihi).val();
    let kutuIciMiktari = parseInt(stokEtiketiModel.totalStok);
    let a = parseInt((kutuIciMiktari / paketlemeMiktari), 10);
    let c = kutuIciMiktari - a * paketlemeMiktari;
    if (paketlemeMiktari > 0) {

        for (var i = 1; i <= a; i++) {
            $(TablesId.stokEtiket_tableResult).append(`
<tr>
<td>${stokEtiketiModel.stk}</td>
<td>${paketlemeMiktari}</td>
<td>${tarih}</td>
<td>${tarih}</td>
<td>${i }</td>
<td>${0}</td>
<td>${stokEtiketiModel.fielD18}</td>
<td>${stokEtiketiModel.fielD19}</td>
</tr>`);
        }
        ii = i;
    }   
    if (c > 0) {
        $(TablesId.stokEtiket_tableResult).append(`
<tr>
<td>${stokEtiketiModel.stk}</td>
<td>${c}</td>
<td>${tarih}</td>
<td>${tarih}</td>
<td>${ii}</td>
<td>0</td>
<td>${stokEtiketiModel.fielD18}</td>
<td>${stokEtiketiModel.fielD19}</td>
</tr>`);
    }
    if (paketlemeMiktari == '') {
        Swal.fire({
            type: 'error',
            title: 'Paketleme Miktarı',
            text: 'Paketleme Miktarı girmeniz gerekiyor'
        });
    }
    stokEtiketiResultTable = [];
    let rowCount = $(`${TablesId.stokEtiket_tableResult} tr`).length;
    if (rowCount > 0);
    {
        for (var i = 0; i < rowCount; i++) {
            stokEtiketiResultTable[i] = $(`${TablesId.stokEtiket_tableResult} tr:nth-child(${i + 1}) td:nth-child(${2})`).text();
        }
    }
});

//#endregion



//#region print A4, A4Mamul


// A4  uretime Sek


$(Buttons.stokEtiketi_A4).click((event) => {
    event.preventDefault();
    ShowLoader();
    let paketlemeMiktari = 0;
    let tarih = $(Inputs.stokEtiekt_paketlemeTarihi).val();
    $('.stokEtiketi_uretimeSevk').empty();
    $('.stokEtiketi_uretimeSevk').css('opacity', '1');
    let rowCount = $(`${TablesId.stokEtiket_tableResult} tr`).length;
    if (rowCount > 0) {


        for (var i = 0; i < rowCount; i++) {
            paketlemeMiktari = stokEtiketiResultTable[i];
            $('.stokEtiketi_uretimeSevk').append(stokEtiketi_setUretimeSevk(stokEtiketiModel, paketlemeMiktari, tarih,
                i + 1));
            JsBarcode(".uretimeSevk_stkBarcode", `${stokEtiketiModel.stk}`, { format: "CODE128", text: "" });
            JsBarcode(".uretimeSevk_adet", `${paketlemeMiktari}`, { format: "CODE128", text: "" });
        }

        $('.stokEtiketi_uretimeSevk').printThis({
            afterPrint: HideA4Model,
            loadCSS: "css/stokEtiketi_A4.css"
        });


    }
    else {
        Swal.fire({
            type: 'error',
            title: 'Etiket tablosu Boş.',
            text: "Etiket tablosuna en az bir etiket girmeniz gerekiyor."
        });
    }
    HideLoader();
});

function HideA4Model() {
    $('.stokEtiketi_uretimeSevk').empty();
    $('.stokEtiketi_uretimeSevk').css('opacity', '1');
}


//A4Mamul
$(Buttons.stokEtiketi_mamulA4).click((event) => {
    let paketlemeMiktari = 0;
    ShowLoader();
    $('.stokEtiketi_mmaulA4PrintModeli').empty();
    $('.stokEtiketi_mmaulA4PrintModeli').css('opacity','1');
    event.preventDefault();
    let rowCount = $(`${TablesId.stokEtiket_tableResult} tr`).length;
  
    
    if (rowCount > 0) {
        let resultMessage = checkRowCount(rowCount);
        if (resultMessage === 'cift') {
            rowCount = rowCount / 2;
            for (var i = 0; i < rowCount; i++) {
                paketlemeMiktari = stokEtiketiResultTable[i];
                $('.stokEtiketi_mmaulA4PrintModeli').append(stokEtiketi_setA4Mamul(resultMessage, stokEtiketiModel, paketlemeMiktari));
            }
            $('#lastAdet').text(stokEtiketiResultTable[stokEtiketiResultTable.length - 1]);
            HideLoader();
            $('.stokEtiketi_mmaulA4PrintModeli').printThis({
                afterPrint: HideA4Mamul,
                loadCSS: "css/stokEtiketi_A4Mamul.css"
            });
        }
       
        else {
            rowCount = rowCount - 1;
            rowCount = rowCount/2;
            for (var i = 0; i < rowCount; i++) {
                paketlemeMiktari = stokEtiketiResultTable[i];
                $('.stokEtiketi_mmaulA4PrintModeli').append(stokEtiketi_setA4Mamul("cift", stokEtiketiModel,paketlemeMiktari));
            }

            $('.stokEtiketi_mmaulA4PrintModeli').append(stokEtiketi_setA4Mamul("tek", stokEtiketiModel, stokEtiketiResultTable[stokEtiketiResultTable.length-1]));
            
            HideLoader();
            $('.stokEtiketi_mmaulA4PrintModeli').printThis({
                afterPrint: HideA4Mamul,
                loadCSS: "css/stokEtiketi_A4Mamul.css"
            });
        }
    }
    else {
        Swal.fire({
            type: 'error',
            title: 'Etiket tablosu Boş.',
            text:"Etiket tablosuna en az bir etiket girmeniz gerekiyor."
        });
        HideLoader();
    }

});


function HideA4Mamul() {
    $('.stokEtiketi_mmaulA4PrintModeli').empty();
    $('.stokEtiketi_mmaulA4PrintModeli').css('opacity', '1');
}
//#endregion




// #region reset

$(Buttons.stokEtiketi_reset).click((event) => {
    $('.stokEtiketiUnderSection').css('opacity', '0');
    event.preventDefault();
    $(Inputs.stokEtiekt_stkSearch).val('');
    ShowLoader();
    stokEtiketiModel = {};
    $([document.documentElement, document.body]).animate({
        scrollTop: $('.container-stokEtiketi').offset().top
    }, 500);
    $(TablesId.stokEtiket_tableResult).empty();
    GetAllStokEtiketiAjaxCall();    
    HideLoader();

});
//#endregion