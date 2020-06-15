$(function () {
    let dataUrl = "Home/SevkiyatKutuEtiketi";
    let sevkiyetKutuEtiketiurl = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === sevkiyetKutuEtiketiurl || window.location.href === serverUrl) {
        GetSekviyetKutuEtiketiAjaxCall();
    }
});
let regustQueryForSekiyetKutuEtiketi = {
    Stk: "",
    pageNumber: 1,
    pageSize: 8
};
let sevkiyatKabulEtiketiModel;
let sevkiyetKutuAllRecords;
// #region search
$(Inputs.sevKabulEtiketi_stkSearch).keyup(function () {
    $('.sevkiyatKutuEtiketiUnderSection').css('opacity', '0');
    regustQueryForSekiyetKutuEtiketi.pageNumber = 1;
    $(pageNumbers.sekiyetKutuEtiketi_sekKabul).text(regustQueryForSekiyetKutuEtiketi.pageNumber);
    clearTimeout(timer);
    timer = setTimeout(GetSekviyetKutuEtiketiAjaxCall, doneTypingInterval);
});

// #endregion
//#region Next-Previous Hanldler
$(PreviousButtons.sekiyetKutuEtiketi_sekKabul).on('click', (event) => {
    event.preventDefault();
    if (regustQueryForSekiyetKutuEtiketi.pageNumber > 1) regustQueryForSekiyetKutuEtiketi.pageNumber -= 1;
    $(pageNumbers.sekiyetKutuEtiketi_sekKabul).text(regustQueryForSekiyetKutuEtiketi.pageNumber);
    GetSekviyetKutuEtiketiAjaxCall();

});
$(NextButtons.sekiyetKutuEtiketi_sekKabul).on('click', (event) => {
    event.preventDefault();
    regustQueryForSekiyetKutuEtiketi.pageNumber += 1;
    $(pageNumbers.sekiyetKutuEtiketi_sekKabul).text(regustQueryForSekiyetKutuEtiketi.pageNumber);
    GetSekviyetKutuEtiketiAjaxCall();
});
//#endregion
//#region ajax call ,create table and  select row
function GetSekviyetKutuEtiketiAjaxCall() {
    ShowLoader();

    regustQueryForSekiyetKutuEtiketi.Stk = $(Inputs.sevKabulEtiketi_stkSearch).val();
    $(TablesId.sekiyetKutuEtiketi_sevKabul).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetSevkiyetKutuEtiketiList,
        data: JSON.stringify(regustQueryForSekiyetKutuEtiketi),
        success: (list) => {
            console.log(list);
            if (list.length !== 0) {
                $(`${recordsNotFound.sekiyetKuttEtiketi}`).css('display', 'none');
                CreateSevkiyetKutuEtiketTable(list, TablesId.sekiyetKutuEtiketi_sevKabul);
            }
            else {

                $(`${recordsNotFound.sekiyetKuttEtiketi} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(`${recordsNotFound.sekiyetKuttEtiketi}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateSevkiyetKutuEtiketTable(list, tableId) {
    sevkiyetKutuAllRecords = list;
    $(tableId).empty();
    list.map((element, index) => {
        let tarih = element.tarih.slice(0, -12);
        let siparis = "";
        let fielD18 = "";
        let fielD19 = "";
        let kalitekodu = "";
        element.sipevrakno ? siparis = element.sipevrakno : siparis = "-";
        element.fielD18 ? fielD18 = element.fielD18 : fielD18 = "";
        element.fielD19 ? fielD19 = element.fielD19 : fielD19 = "";
        element.kalitekodu ? kalitekodu = element.kalitekodu : kalitekodu = "-";
        $(tableId).append(`
<tr data-stk="${element.stk}" data-pid="${element.p_ID}" >
  <td>${element.stk}</td>
    <td>${tarih}</td>
    <td>${element.miktar} </td>
    <td>${element.carigen_sta}</td>
    <td>${siparis}</td>
    <td>${kalitekodu}</td>
    <td>${fielD18}-${fielD19}</td>
    <td>${element.turac}</td>
             </tr>
`);
    });
    HideLoader();
}
$(TablesId.sekiyetKutuEtiketi_sevKabul).on('click', 'tr', function () {
    $('.sevkiyatKutuEtiketiUnderSection').css('opacity', '1');
    ShowLoader();
    $([document.documentElement, document.body]).animate({
        scrollTop: $('.sevkiyatKutuEtiketiLastTable').offset().top
    }, 500);
    let stkForSevkabul = $(this).data('stk');
    let pidforSevKabul = $(this).data('pid');
    let matched = sevkiyetKutuAllRecords.filter((element) => {
        if (element.stk == stkForSevkabul && element.p_ID == pidforSevKabul) return element;
    });
    sevkiyatKabulEtiketiModel = matched[0];
    if (sevkiyatKabulEtiketiModel != null) {
        Object.keys(sevkiyatKabulEtiketiModel).map((element) => {
            if (sevkiyatKabulEtiketiModel[element] == null)
                sevkiyatKabulEtiketiModel[element] = "";
        });
    }
    console.log('in',sevkiyatKabulEtiketiModel);
    $(Texts.sevKabulEtiketi_stk).text(sevkiyatKabulEtiketiModel.stk);
    $(Texts.sevKabulEtiketi_kaliteKodu).text(sevkiyatKabulEtiketiModel.kalitekodu);
    $(Texts.sevKabulEtiketi_tarih).text(sevkiyatKabulEtiketiModel.tarih.slice(0, -11));
    $(Texts.sevKabulEtiketi_firmaAdi).text(sevkiyatKabulEtiketiModel.carigen_sta);
    // $(Texts.sevKabulEtiketi_stk).text(sevkiyatKabulEtiketiModel.stk); standart
    $(Texts.sevKabulEtiketi_siparisNo).text(sevkiyatKabulEtiketiModel.sipevrakno);
    $(Texts.sevKabulEtiketi_rafAdres1).text(sevkiyatKabulEtiketiModel.fielD18);
    $(Texts.sevKabulEtiketi_fielD19).text(sevkiyatKabulEtiketiModel.fielD19);
    $(Texts.sevKabulEtiketi_sevAdresi).text(sevkiyatKabulEtiketiModel.adresi);
    $(Texts.sevKabulEtiketi_faturaAdresi).text(`${sevkiyatKabulEtiketiModel.adreS1} / ${sevkiyatKabulEtiketiModel.semt}  ${sevkiyatKabulEtiketiModel.sehir}`);
    $(Texts.sevKabulEtiketi_kutuMiktari).text(sevkiyatKabulEtiketiModel.miktar);
    HideLoader();
});
// #endregion

//#region EtiketEkle and print etiket
let sevkiyetResultTable = [];
$(Buttons.sevkiyetKutuEtiketi_etiketEkle).click((event) => {
    event.preventDefault();
    $(TablesId.sekiyetKutuEtiketi_result).empty();
    let paketlemeMiktari = $(Inputs.sevKabulEtiketi_paketlemeMiktari).val();
    let kutuIciMiktari = parseInt(sevkiyatKabulEtiketiModel.miktar);
    let a = parseInt((kutuIciMiktari / paketlemeMiktari), 10);
    let c = kutuIciMiktari - a * paketlemeMiktari;
    if (paketlemeMiktari > 0) {
       
        for (var i = 1; i <= a; i++) {
            $(TablesId.sekiyetKutuEtiketi_result).append(`
<tr>
<td>${sevkiyatKabulEtiketiModel.stk}</td>
<td>${paketlemeMiktari}</td>
<td>${sevkiyatKabulEtiketiModel.tarih.slice(0, -11)}</td>
<td>${sevkiyatKabulEtiketiModel.sipevrakno}</td>
<td>${i}</td>
<td>${sevkiyatKabulEtiketiModel.cariref}</td>
<td>${sevkiyatKabulEtiketiModel.fielD18}</td>
<td>${sevkiyatKabulEtiketiModel.fielD19}</td>
<td>${sevkiyatKabulEtiketiModel.kalitekodu}</td>
</tr>`);
        }
    }

    if (c > 0) {
        $(TablesId.sekiyetKutuEtiketi_result).append(`
<tr>
<td>${sevkiyatKabulEtiketiModel.stk}</td>
<td>${c}</td>
<td>${sevkiyatKabulEtiketiModel.tarih.slice(0, -11)}</td>
<td>${sevkiyatKabulEtiketiModel.sipevrakno}</td>
<td>${c}</td>
<td>${sevkiyatKabulEtiketiModel.cariref}</td>
<td>${sevkiyatKabulEtiketiModel.fielD18}</td>
<td>${sevkiyatKabulEtiketiModel.fielD19}</td>
<td>${sevkiyatKabulEtiketiModel.kalitekodu}</td>
</tr>`)
    }
    if (paketlemeMiktari =='') {
        Swal.fire({
            type: 'error',
            title: 'Paketleme Miktarı',
            text: 'Paketleme Miktarı girmeniz gerekiyor'
        });
    }


    let rowCount = $(`${TablesId.sekiyetKutuEtiketi_result} tr`).length;


    if (rowCount > 0);
    {
        for (let i = 0; i < rowCount; i++) {
            sevkiyetResultTable[i] = $(`${TablesId.sekiyetKutuEtiketi_result} tr:nth-child(${i + 1}) td:nth-child(${2})`).text();

        }

    }
  
});


$(Buttons.sevkiyetKutuEtiketi_etiket_100_150).click((event) => {
    event.preventDefault();
    let rowCount = $(`${TablesId.sekiyetKutuEtiketi_result} tr`).length;
    if (rowCount > 0) {
        ShowLoader();
        let paketlemeMiktari = 0;
        $('.sevkiyatKutuEtiketi_printModeli').empty();
        for (var i = 0; i < rowCount; i++) {
            paketlemeMiktari = sevkiyetResultTable[i];
            $('.sevkiyatKutuEtiketi_printModeli').append(sevkiyetKutuEtiketiSetEtiket(sevkiyatKabulEtiketiModel
                , paketlemeMiktari, i+1));
            JsBarcode(".sevkiyatKutuEtiketi_stkBarcode", `${sevkiyatKabulEtiketiModel.stk.turkishtoEnglish()}`, { format: "CODE128", text: "" });
            JsBarcode(".sevkiyatKutuEtiketi_adetBarcode", `${paketlemeMiktari}`, { format: "CODE128", text: "" });
        }
        $('.sevkiyatKutuEtiketi_printModeli').css('opacity', '1');
        HideLoader();
        $('.sevkiyatKutuEtiketi_printModeli').printThis({
            afterPrint: HideSeviyatKutEtiketPrintModeli,
            loadCSS: "css/SevKiyetEtiket_150_100.css"
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
function HideSeviyatKutEtiketPrintModeli() {
 $('.sevkiyatKutuEtiketi_printModeli').empty();
    $('.sevkiyatKutuEtiketi_printModeli').css('opacity', '1');
}
//#endregion
//#region  reset 
$(Buttons.sevkiyetkutuEtiketi_reset).click((event) => {
    $('.sevkiyatKutuEtiketiUnderSection').css('opacity', '0');
    event.preventDefault();
    $(Inputs.sevKabulEtiketi_stkSearch).val('');
    ShowLoader();
    sevkiyatKabulEtiketiModel=[];
    $([document.documentElement, document.body]).animate({
        scrollTop: $('.container-sevkiyatKutuEtiketi').offset().top
    }, 500);
    $('#table-sevkiyatKutuEtiketi-result').empty();
    HideLoader();
}); 

//#endregion


