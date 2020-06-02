$(function () {
    let dataUrl = "Home/GirisKabulEtiketi";
    let tamirIsUrl = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === tamirIsUrl || window.location.href === serverUrl) {


        GetAllGirisKabulEtiketiAjaxCall();
    }
});

let requestQueryForGirisKabulEtiketi = {
    pageNumber: 1,
    pageSize: 6,
    Stk: ""
};
let girisKabulEtiketiList = [];
let girisKabulEtiketiModel = {};


// #region Ajax Call And create All stok etiketi and select row
function GetAllGirisKabulEtiketiAjaxCall() {

    requestQueryForGirisKabulEtiketi.Stk = $(Inputs.girisKabulEtiketi_searchStk).val();
    ShowLoader();
    $(TablesId.girisKabulEtiketi_girisKabulEtiketiList).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetGirisKabulEtiketiList,
        data: JSON.stringify(requestQueryForGirisKabulEtiketi),
        success: (list) => {
            girisKabulEtiketiList = list;
            console.log(list);
            if (list.length !== 0) {
                $(NotFoundRecordsId.girisKabulEtiketi).css('display', 'none');
                CreateAllgirisKabulEtiketiTable(list, TablesId.girisKabulEtiketi_girisKabulEtiketiList);
            }
            else {

                $(`${NotFoundRecordsId.girisKabulEtiketi} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(NotFoundRecordsId.girisKabulEtiketi).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateAllgirisKabulEtiketiTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        let fielD18 = "";
        let fielD19 = "";
        let miktar = "";
        let kalitekodu = "";
        element.fielD18 ? fielD18 = element.fielD18 : fielD18 = "";
        element.fielD19 ? fielD19 = element.fielD19 : fielD19 = "";
        element.miktar ? miktar = element.miktar : miktar = "";
        element.kalitekodu ? kalitekodu = element.kalitekodu : kalitekodu = "";
        $(tableId).append(`
<tr data-tarih="${element.tarih}" data-pid="${element.p_ID}" data-miktar="${element.miktar}">
  <td>${element.stk}</td>
    <td>${miktar}</td>
    <td>${element.cariref} </td>
    <td>${kalitekodu}</td>
    <td>${fielD18} / ${fielD19}</td>
    <td>${element.turac}</td>
    <td>${element.tarih.slice(0, -9)}</td>
             </tr>
`);
    });
    HideLoader();
}
$(TablesId.girisKabulEtiketi_girisKabulEtiketiList).on('click', 'tr', function () {
    $(TablesId.stokEtiket_tableResult).empty();
    $('.girisKabulEtiketiUnderSection').css('opacity', '1');
    ShowLoader();
    $([document.documentElement, document.body]).animate({
        scrollTop: $('.girisKabulEtiketiUnderSection').offset().top
    }, 500);

    let pidforgirisKabulEtiketi = $(this).data('pid');
    let tarihForgirisKabulEtiketi = $(this).data('tarih');
    let miktarForGiriKabulEtiketi = $(this).data('miktar');

    let matched = girisKabulEtiketiList.filter((element) => {
        if (element.p_ID == pidforgirisKabulEtiketi && element.tarih == tarihForgirisKabulEtiketi &&
            element.miktar == miktarForGiriKabulEtiketi) return element;
    });

    girisKabulEtiketiModel = matched[0];
    if (girisKabulEtiketiModel != null) {
        Object.keys(girisKabulEtiketiModel).map((element) => {
            if (girisKabulEtiketiModel[element] == null)
                girisKabulEtiketiModel[element] = "";
        });
    }
    $(Texts.girisKabulEtiketi_stk).text(girisKabulEtiketiModel.stk);
    $(Texts.girisKabulEtiketi_tarih).text(girisKabulEtiketiModel.tarih.slice(0, -11));
    $(Texts.girisKabulEtiketi_firmaAdi).text(girisKabulEtiketiModel.carigensta);
    $(Texts.girisKabulEtiketi_kaliteKodu).text(girisKabulEtiketiModel.kalitekodu);
    $(Texts.girisKabulEtiketi_siparisNo).text(girisKabulEtiketiModel.sipevrakno);
    $(Texts.girisKabulEtiketi_kutuMiktari).text(girisKabulEtiketiModel.miktar);
    $(Texts.girisKabulEtiketi_filed18).text(girisKabulEtiketiModel.fielD18);
    $(Texts.girisKabulEtiketi_filed19).text(girisKabulEtiketiModel.fielD19);
    $(Texts.stokEtiketi_kutuMiktari).text(girisKabulEtiketiModel.totalStok);
    HideLoader();
    console.log(girisKabulEtiketiModel);
});

//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.girisKabulEtiketi).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForGirisKabulEtiketi.pageNumber > 1) requestQueryForGirisKabulEtiketi.pageNumber -= 1;
    $(PageNumbers.girisKabulEtiketi).text(requestQueryForGirisKabulEtiketi.pageNumber);
    GetAllGirisKabulEtiketiAjaxCall();
});
$(NextButtons.girisKabulEtiketi).on('click', (event) => {
    event.preventDefault();
    requestQueryForGirisKabulEtiketi.pageNumber += 1;
    $(PageNumbers.girisKabulEtiketi).text(requestQueryForGirisKabulEtiketi.pageNumber);
    GetAllGirisKabulEtiketiAjaxCall();
});
//#endregion
// #region search
let girisKabulTypingTimer;
let girisKabuldoneTypingInterval = 500;
$(Inputs.girisKabulEtiketi_searchStk).keyup(function () {
    clearTimeout(girisKabulTypingTimer);
    requestQueryForGirisKabulEtiketi.pageNumber = 1;
    $(PageNumbers.girisKabulEtiketi).text(requestQueryForGirisKabulEtiketi.pageNumber);
    girisKabulTypingTimer = setTimeout(GetAllGirisKabulEtiketiAjaxCall, girisKabuldoneTypingInterval);
});

// #endregion 
// #region reset

$(Buttons.girisKabulEitketi_reset).click((event) => {
    ShowLoader();
    $('.girisKabulEtiketiUnderSection').css('opacity', '0');
    event.preventDefault();
    $(Inputs.girisKabulEtiketi_searchStk).val('');
    girisKabulEtiketiModel = {};
    $([document.documentElement, document.body]).animate({
        scrollTop: $('.container-girisKabulEtiketi').offset().top
    }, 500);
    $(TablesId.girisKabulEtiketi_tableResult).empty();
    GetAllGirisKabulEtiketiAjaxCall();
    HideLoader();
    $(Texts.girisKabulEtiketi_stk).text('');
    $(Texts.girisKabulEtiketi_tarih).text('');
    $(Texts.girisKabulEtiketi_firmaAdi).text('');
    $(Texts.girisKabulEtiketi_kaliteKodu).text('');
    $(Texts.girisKabulEtiketi_siparisNo).text('');
    $(Texts.girisKabulEtiketi_kutuMiktari).text('');;
    $(Texts.girisKabulEtiketi_filed18).text('');
    $(Texts.girisKabulEtiketi_filed19).text('');
    $(Texts.stokEtiketi_kutuMiktari).text('');
    $(Inputs.girisKabulEtiketi_paketlemeMiktari).val('');
});
//#endregion

//#region EtiketEkle and print etiket
let girisKabulEtiketiResultTable = [];
$(Buttons.girisKabulEitketi_etiketEkle).click((event) => {
    event.preventDefault();
    $(TablesId.girisKabulEtiketi_tableResult).empty();
    let paketlemeMiktari = $(Inputs.girisKabulEtiketi_paketlemeMiktari).val();
    let kutuIciMiktari = parseInt(girisKabulEtiketiModel.miktar);
    let a = parseInt((kutuIciMiktari / paketlemeMiktari), 10);
    let c = kutuIciMiktari - a * paketlemeMiktari;
    if (paketlemeMiktari > 0) {
        for (var i = 1; i <= a; i++) {
            $(TablesId.girisKabulEtiketi_tableResult).append(`
<tr>
<td>${girisKabulEtiketiModel.stk}</td>
<td>${paketlemeMiktari}</td>
<td>${girisKabulEtiketiModel.tarih.slice(0, -11)}</td>
<td>${girisKabulEtiketiModel.sipevrakno}</td>
<td>${i}</td>
<td>${girisKabulEtiketiModel.cariref}</td>
<td>${girisKabulEtiketiModel.fielD18}</td>
<td>${girisKabulEtiketiModel.fielD19}</td>
<td>${girisKabulEtiketiModel.kalitekodu}</td>
</tr>`);

        }
    }

    if (c > 0) {
        $(TablesId.girisKabulEtiketi_tableResult).append(`
<tr>
<td>${girisKabulEtiketiModel.stk}</td>
<td>${c}</td>
<td>${girisKabulEtiketiModel.tarih.slice(0, -11)}</td>
<td>${girisKabulEtiketiModel.sipevrakno}</td>
<td>${c}</td>
<td>${girisKabulEtiketiModel.cariref}</td>
<td>${girisKabulEtiketiModel.fielD18}</td>
<td>${girisKabulEtiketiModel.fielD19}</td>
<td>${girisKabulEtiketiModel.kalitekodu}</td>
</tr>`)
    }
    if (paketlemeMiktari =='') {
        Swal.fire({
            type: 'error',
            title: 'Paketleme Miktarı',
            text: 'Paketleme Miktarı girmeniz gerekiyor'
        });
    }

    let rowCount = $(`${TablesId.girisKabulEtiketi_tableResult} tr`).length;

    if (rowCount > 0);
    {
        for (var i = 0; i < rowCount; i++) {
            girisKabulEtiketiResultTable[i] = $(`${TablesId.girisKabulEtiketi_tableResult} tr:nth-child(${i + 1}) td:nth-child(${2})`).text();

        }

    }
    console.log('giris',girisKabulEtiketiResultTable);
  
});

// print A4 Zirve
$(Buttons.girisKabulEitketi_A4Zirva).click((event) => {
    event.preventDefault();
    let rowCount = $(`${TablesId.girisKabulEtiketi_tableResult} tr`).length;
    if (rowCount > 0) {
        ShowLoader();
       
        let paketlemeMiktari = 0;
        $('.girisKabulEtiketiprintModeli').empty();
        for (var i = 0; i < rowCount; i++) {
            paketlemeMiktari = girisKabulEtiketiResultTable[i];

            $('.girisKabulEtiketiprintModeli').append(girisKabulEtiketi_A4Zirve(girisKabulEtiketiModel
                , paketlemeMiktari, i+1));
            JsBarcode(".girisKabulEtiketi_stkBarcode", `${girisKabulEtiketiModel.stk}`, { format: "CODE128", text: "" });
            JsBarcode(".girisKabulEtiketi_adet", `${paketlemeMiktari}`, { format: "CODE128", text: "" });
        }
        $('.girisKabulEtiketiprintModeli').css('opacity', '1');
        HideLoader();
        $('.girisKabulEtiketiprintModeli').printThis({
            afterPrint: HideGirisKabulEtiketiPrintModeli,
            loadCSS: "css/girisKabulEtiketi_A4Zirve.css"
        });
    }
    else {
        Swal.fire({
            type: 'error',
            title: 'Etiket tablosu Boş.',
            text: "Etiket tablosuna en az bir etiket girmeniz gerekiyor."
        });
    }
});
function HideGirisKabulEtiketiPrintModeli() {
    $('.girisKabulEtiketiprintModeli').empty();
    $('.girisKabulEtiketiprintModeli').css('opacity', '1');
}
//#endregion




