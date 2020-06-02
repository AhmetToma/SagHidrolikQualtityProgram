//  #region start Arama
let urunEtiketi = {
    stk: '',
    p_id: "",
        lotNo: '',
    paketlemeTarihi: today,
    etiketAdet: '',
    paketlemMiktari: ''
};

$('#inp-urunEtiketi-inputSearch').keyup(function () {
    ResetUrunEtiketi();
    HidePrintModal();
    $('.urunEtiketiProdcutionOrders').css('opacity', '0');
    $('#myTabContent').css('opacity', '0');
    $('.urunImage').css('opacity', '0');
    clearTimeout(timer);
    if ($('#inp-urunEtiketi-inputSearch').val()) {
        timer = setTimeout(searchStokInUrunEtiketi, doneTypingInterval);
    }
    else if ($('#inp-urunEtiketi-inputSearch').val() === '') {
        $(TablesId.UrunEtiketi_searchStkInStokgen).empty();

    }
});
//user is "finished typing," do something
function searchStokInUrunEtiketi() {
    let UreunEtiketiSearcedValue = $('#inp-urunEtiketi-inputSearch');
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(UreunEtiketiSearcedValue.val()),
        url: HttpUrls.getStokByStk,
        success: (list) => {
            creatStokgenTable(list,TablesId.UrunEtiketi_searchStkInStokgen);
        }
    });
    ShowLoader();
}

$(TablesId.UrunEtiketi_searchStkInStokgen).on('click', 'tr', function () {
    HidePrintModal();
    $([document.documentElement, document.body]).animate({
        scrollTop: $('.container').offset().top
    }, 500);
    ShowLoader();
    $('.urunEtiketiProdcutionOrders').css('opacity', '1');
    var stkForUrunEtiketi = $(this).data('id');
    var pIdForUrunEtiketi = $(this).data('p_id');
    urunEtiketi.stk = stkForUrunEtiketi;
    urunEtiketi.p_id = pIdForUrunEtiketi;
    requstQueryForProductOrders.stk = stkForUrunEtiketi.toString();
    requstQueryForProductOrders.pid = pIdForUrunEtiketi.toString();
    requstQueryForProductOrders.pageSize = 6;
    requstQueryForProductOrders.pageNumber = 1;
    $('#number-urunEtiketi-productionOrder-pageNumber').text(requstQueryForProductOrders.pageNumber);
    getproductOrdersAjaxCall(TablesId.productionOrdersInUrunEtketi, recordsNotFound.productionOrders);
    HideLoader();
});
//#endregion end  Arama 

//#region productionOrders

$('#btn-urunEtiketi-productionOrder-previous').click((event) => {

    event.preventDefault();
    previousProductionOrders();
    $('#number-urunEtiketi-productionOrder-pageNumber').text(requstQueryForProductOrders.pageNumber);
    getproductOrdersAjaxCall(TablesId.productionOrdersInUrunEtketi, recordsNotFound.productionOrders);
});
$('#btn-urunEtiketi-productionOrder-next').click((event) => {
    event.preventDefault();
    nextProductionOrders();
    console.log('after click', requstQueryForProductOrders.pageNumber)
    $('#number-urunEtiketi-productionOrder-pageNumber').text(requstQueryForProductOrders.pageNumber);
    getproductOrdersAjaxCall(TablesId.productionOrdersInUrunEtketi, recordsNotFound.productionOrders);
});
$(TablesId.productionOrdersInUrunEtketi).on('click', 'tr', function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#urunEtiket-scroll").offset().top
    }, 700);
    ShowLoader();
    urunEtiketi.stk = $(this).attr('data-stk');
    urunEtiketi.lotNo = $(this).attr('data-lotno');
 ;
    HideLoader();
    ShowPrintModal();
    $(Inputs.urunEtiketi_stk).val(urunEtiketi.stk);
    $(Inputs.urunEtiketi_lotNo).val(urunEtiketi.lotNo);
    $(Inputs.urunEtiketi_paketlemTarihi).val(today);
});

//#endregion 

// #region Etiketler
$(Buttons.urunEtiketi_etiketEkle).click((event) => {
    ShowLoader();
    urunEtiketi.paketlemMiktari = $(Inputs.urunEtiketi_paketlemMiktari).val();
    urunEtiketi.etiketAdet = $(Inputs.urunEtiketi_etiketAdet).val();
 
    if ($(Inputs.urunEtiketi_paketlemTarihi).val())  urunEtiketi.paketlemeTarihi = $(Inputs.urunEtiketi_paketlemTarihi).val();

    event.preventDefault();
    if (urunEtiketi.stk === '' || urunEtiketi.lotNo === '') {
        Swal.fire({
            type: 'error',
            title: 'STK veya LotNot Boş',
            text: 'hangi ürün basakcasınız girmeniz gerekiyor'
        });
    }
    else if (urunEtiketi.paketlemMiktari === '') {
        Swal.fire({
            type: 'error',
            title: 'paketleme Miktarı',
            text: 'paketleme Miktarı girmeniz gerekiyor'
        });
    }
    else if (urunEtiketi.etiketAdet === '') {
        Swal.fire({
            type: 'error',
            title: 'Etiket Adet ',
            text: 'Etiket Adet girmeniz gerekiyor'
        });
    }
    else {
        CreateUrunEtiketTable();
    }
    HideLoader();
});
function CreateUrunEtiketTable() {
    let list = new Array();
    $(TablesId.UrunEtiketTable).empty();
    for (let i = 1; i <= urunEtiketi.etiketAdet; i++) {
        list.push(urunEtiketi);
        $(TablesId.UrunEtiketTable).append(`
<tr>"
  <td>${urunEtiketi.stk}</td>
    <td>${urunEtiketi.paketlemMiktari}</td>
    <td>${i}</td>
    <td>${urunEtiketi.paketlemeTarihi} </td>
    <td>${urunEtiketi.lotNo}</td>
             </tr>
`);
    }
}
//#endregion

// #region  pirnt style

$(Buttons.urunEtiketi_dikey_20_80).click((event) => {
    ShowLoader();
    event.preventDefault();
    let rowsNumber = $(TablesId.UrunEtiketTable).children("tr");
    if (rowsNumber.length > 0) {
        $(Models.urunEtiketi_modelContnet).empty();
        $(Models.urunEtiketi_modelContnet).append(dikey20_80Contnet);
        setDikey_20_80_content(urunEtiketi);
        $('.modal').modal();
    }
    else {
        Swal.fire({
            type: 'error',
            title: 'Etiket Tablosu Boş ',
        });
    }
    HideLoader();
});
$(Buttons.urunEtiketi_yatay_30_60).click((event) => {
    ShowLoader();
    event.preventDefault();
    let rowsNumber = $(TablesId.UrunEtiketTable).children("tr");
    if (rowsNumber.length > 0) {
        $(Models.urunEtiketi_modelContnet).empty();
        $(Models.urunEtiketi_modelContnet).append(yatay_20_60_ModelContent);
        setYatay_30_60_content(urunEtiketi);
        $('.modal').modal();
    }
    else {
        Swal.fire({
            type: 'error',
            title: 'Etiket Tablosu Boş ',
        })
    }
    HideLoader();
});
$(Buttons.urunEtiketi_tekil_20_80).click((event) => {
    ShowLoader();
    event.preventDefault();
    let rowsNumber = $(TablesId.UrunEtiketTable).children("tr");
    if (rowsNumber.length > 0) {
        $(Models.urunEtiketi_modelContnet).empty();
        $(Models.urunEtiketi_modelContnet).append(tekil_20_80_ModelContent);
        setTekil_30_60_content(urunEtiketi);
        $('.modal').modal();
    }
    else {
        Swal.fire({
            type: 'error',
            title: 'Etiket Tablosu Boş'
        });
    }
    HideLoader();
});
//#endregion


//#region PrintOut
function printDikey_20_80() {

    alert(urunEtiketi.paketlemeTarihi.substring(urunEtiketi.paketlemeTarihi.length - 1, 3));
    console.log(urunEtiketi.paketlemeTarihi);
    $(Models.printModeOut).empty();
    $(Models.printModeOut).css('display', 'block');
    for (let i = 1; i <= urunEtiketi.etiketAdet; i++) {
        $(Models.printModeOut).append(`
<div class="dikey_20_80">
        <div class="co rotate co1">
            <img src="${BaseUrl}/images/sag.jpg" alt="">
        </div>
        <div class="co rotate co2">${urunEtiketi.stk}</div>
        <div class="co rotate co3">
            <div>${urunEtiketi.paketlemeTarihi.substring(urunEtiketi.paketlemeTarihi.length - 1, 3)}</div>
            <div>${urunEtiketi.lotNo}</div>
        </div>
    </div>
`);

    }

    $(Models.printModeOut).printThis({
        afterPrint: Hide
    });
}

function printYatat_30_60() {
    $(Models.printModeOut).empty();
    $(Models.printModeOut).css('display', 'block');
    for (let i = 1; i <= urunEtiketi.etiketAdet; i++) {
        $(Models.printModeOut).append(`
<div class="des-yatay_30_60Table">
                            <div class="des-yatay_30_60stk">
                                <p id="yatay_30_60_stk">${urunEtiketi.stk}</p>
                            </div>
                            <div class="des-yatay_30_60alt">
                                <div class="des-yatay_30_60altLeft">
                                    <p id="yatay_30_60_tarih" class="des-yatay_30_60altLeft_tarih">${urunEtiketi.paketlemeTarihi}</p>
                                    <div class="row">
                                        <div class="des-yatay_30_60lot">
                                            <p> Lot# </p>
                                        </div>
                                        <div class="des-yatay_30_60lotNo">
                                            <p id="yatay_30_60_lotno">${urunEtiketi.lotNo}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="des-yatay_30_60altRight">
                                    <p id="yatay_30_60_etiketAdet">${urunEtiketi.etiketAdet}</p>
                                    <span>AD</span>
                                </div>

                            </div>
`);
    }
    $(Models.printModeOut).printThis({
        afterPrint: Hide,
        loadCSS: "css/dikey_20_80.css"
    });
}

function printTekli_20_80() {
    alert(urunEtiketi.paketlemeTarihi.substring(urunEtiketi.paketlemeTarihi.length - 1, 3));
    $(Models.printModeOut).empty();
    $(Models.printModeOut).css('display', 'block');
    for (let i = 1; i <= urunEtiketi.etiketAdet; i++) {
        $(Models.printModeOut).append(`
 <div class="tekli_20_80">
                            <div id="tekli_20_80_stk" class="tekilCol1">${urunEtiketi.stk}</div>
                            <div class="tekilCol2"> ${urunEtiketi.paketlemeTarihi.substring(urunEtiketi.paketlemeTarihi.length - 1, 3)}</div>
                            </div>
                        </div>
`);
    }
    $(Models.printModeOut).printThis({
        afterPrint: Hide,
        loadCSS: "css/tekli_20_80.css"
    });
}
// #endregion 



function Hide() {
    $(Models.printModeOut).empty();
   $(Models.printModeOut).css('display', 'none');
    $('.modal').modal('hide');
}

// #region reset all

function ResetUrunEtiketi() {
    Object.keys(urunEtiketi).map((el) => {
        urunEtiketi[el] = "";
    });
    console.log(urunEtiketi);
}
$(Buttons.urunEtiketi_reset).click(() => {
    ShowLoader();
    $([document.documentElement, document.body]).animate({
        scrollTop: $('.container').offset().top
    }, 500);
    ResetUrunEtiketi();
    HidePrintModal();
    $('.urunEtiketiProdcutionOrders').css('opacity', '0');
    $(TablesId.UrunEtiketTable).empty();
    $(TablesId.productionOrdersInUrunEtketi).empty();
    $(TablesId.UrunEtiketi_searchStkInStokgen).empty();
    $(Inputs.urunEtiketi_lotNo).val("");
    $(Inputs.urunEtiketi_stk).val("");
    $(Inputs.urunEtiketi_paketlemMiktari).val("");
    $(Inputs.urunEtiketi_etiketAdet).val("");
    $(Inputs.urunEtiketi_searchStk).val("");
    HideLoader();
})
// #endregion
