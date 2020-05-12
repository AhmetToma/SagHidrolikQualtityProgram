$(function () {
    $(Inputs.tmairIsEmri_tarih).datepicker({
        dateFormat: 'dd/mm/yy'
    });


    let dataUrl = "Home/TamirIsEmri";
    let tamirIsUrl = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === tamirIsUrl || window.location.href === serverUrl) {
        GetTamirIsEmriAdimlari();
        $(Inputs.tmairIsEmri_tarih).val(today);
        $(".limitedNumbSelect2").select2({
            maximumSelectionLength: 1
        });
    }
});

let tamirIsEmriModel = {
    stk: "",
    lotNo: "",
    p_id: "",
    tamirMiktari: "",
    tarih: "",
 
    tamir1: {
        ProcessNo: null,
        ProsesAdi: "",
        processName: ""

    },
    tamir2: {
        ProcessNo: null,
        ProsesAdi: "",
        processName:""
    },
    tamir3: {
        ProcessNo: null,
        ProsesAdi: "",
        processName: ""

    },
    tamir4: {
        ProcessNo: null,
        ProsesAdi: "",
        processName: ""
    },
    tamir5: {
        ProcessNo: 28,
        ProsesAdi: "Basınç Testi",
        processName: ""
    },
    tamir6: {
        ProcessNo: 55,
        ProsesAdi: "Paketleme",
        processName: ""
    },
    newLotNo:""
};


// #region search and select row from stokgen 
let tamir_typingTimer;
let tamir_doneTypingInterval = 500;
$(Inputs.tamirIsEmri_searchByStk).keyup(function () {
    $('.tamirIsEmriProdcutionOrders').css('opacity', '0');
    $('.tamirIsEmriCard').css('opacity', '0');
    clearTimeout(tamir_typingTimer);
    if ($(Inputs.tamirIsEmri_searchByStk).val()) {
        localStorage.setItem('searchedStk', $(Inputs.tamirIsEmri_searchByStk).val());
        localStorage.setItem('stkTableId', TablesId.tamirIsEmri_searchStk);
        tamir_typingTimer = setTimeout(searchStok, tamir_doneTypingInterval);
    }
    else if ($(Inputs.tamirIsEmri_searchByStk).val() === '') {
        localStorage.setItem('searchedStk', '');
        localStorage.setItem('stkTableId', '');
        HideLoader();
        $(TablesId.tamirIsEmri_searchStk).empty();
    }
});

$(TablesId.tamirIsEmri_searchStk).on('click', 'tr', function () {
    $('.tamirIsEmriCard').css('opacity', '0');
    ShowLoader();
    $('.tamirIsEmriProdcutionOrders').css('opacity', '1');
    tamirIsEmriModel.stk = $(this).data('id');
    tamirIsEmriModel.p_id = $(this).data('p_id');
    requstQueryForProductOrders.stk = `${tamirIsEmriModel.stk}`;
    requstQueryForProductOrders.pid = tamirIsEmriModel.p_id;
    requstQueryForProductOrders.pageSize = 8;
    requstQueryForProductOrders.pageNumber = 1;
    console.log(requstQueryForProductOrders);
    $('.number-tamirIsEmri-pageNumber').text(requstQueryForProductOrders.pageNumber);
    getproductOrdersAjaxCall(TablesId.tmairIsEmri_productionOrders, recordsNotFound.productionOrders);
    HideLoader();
});
// #endregion


//#region   production Orders

$(PreviousButtons.tamirIsEmri_productionOrders).click((event) => {
    event.preventDefault();
    previousProductionOrders();
    $('.number-tamirIsEmri-pageNumber').text(requstQueryForProductOrders.pageNumber);
    getproductOrdersAjaxCall(TablesId.tmairIsEmri_productionOrders, recordsNotFound.productionOrders);
});
$('#btn-urunEtiketi-next').click((event) => {
    event.preventDefault();
    nextProductionOrders();
    $('.number-tamirIsEmri-pageNumber').text(requstQueryForProductOrders.pageNumber);
    getproductOrdersAjaxCall(TablesId.tmairIsEmri_productionOrders, recordsNotFound.productionOrders);
});
$(TablesId.tmairIsEmri_productionOrders).on('click', 'tr', function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".tamirIsEmriCard .btn-danger").offset().top
    }, 700);
    ShowLoader();
    tamirIsEmriModel.stk = $(this).attr('data-stk');
    tamirIsEmriModel.lotNo = $(this).attr('data-lotno');
    $('.tamirIsEmriCard').css('opacity', '1');
    $(Inputs.tmairIsEmri_stk).val(tamirIsEmriModel.stk);
    $(Inputs.tmairIsEmri_LotNo).val(tamirIsEmriModel.lotNo);
    $(Inputs.tmairIsEmri_tarih).val(today);
    HideLoader();
});
//#endregion
//#region Tamir is emri adimlari select and unselect
function GetTamirIsEmriAdimlari() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.tamirIsEmri_GetTamirIsEmriAdimlari,
        success: (list) => {
            console.log('adimlar', list)
;            $('#select-tamirIsEmri-tamir1').empty();
            $('#select-tamirIsEmri-tamir2').empty();
            $('#select-tamirIsEmri-tamir3').empty();
            $('#select-tamirIsEmri-tamir4').empty();
            list.map((element) => {
                $("#select-tamirIsEmri-tamir1").append(`<option data-processName='${element.processName}' value="${element.processNo}"> ${element.prosesAdi} </option>`);

                $("#select-tamirIsEmri-tamir2").append(`<option data-processName='${element.processName}' value="${element.processNo}"> ${element.prosesAdi} </option>`);

                $("#select-tamirIsEmri-tamir3").append(`<option data-processName='${element.processName}' value="${element.processNo}"> ${element.prosesAdi} </option>`);

                $("#select-tamirIsEmri-tamir4").append(`<option data-processName='${element.processName}' value="${element.processNo}"> ${element.prosesAdi} </option>`);
             
            });
        }
    });
}

//select 

$("#select-tamirIsEmri-tamir1").select2()
    .on("select2:select", function (e) {
        let data = $('#select-tamirIsEmri-tamir1').select2('data');
        let selected_element = $(e.currentTarget);
        let tamir = selected_element.val();
        tamirIsEmriModel.tamir1.ProsesAdi = data[0].text;
        tamirIsEmriModel.tamir1.ProcessNo = parseInt(tamir[0]);
        tamirIsEmriModel.tamir1.processName = $("#select-tamirIsEmri-tamir1").select2().find(":selected").attr("data-processName");
 
        console.log();
    });

$("#select-tamirIsEmri-tamir2").select2()
    .on("select2:select", function (e) {
        let data = $('#select-tamirIsEmri-tamir2').select2('data');
        let selected_element = $(e.currentTarget);
        let tamir = selected_element.val();
        tamirIsEmriModel.tamir2.ProsesAdi = data[0].text;
        tamirIsEmriModel.tamir2.ProcessNo = parseInt(tamir[0]);
        tamirIsEmriModel.tamir2.processName = $("#select-tamirIsEmri-tamir2").select2().find(":selected").attr("data-processName");
    });
$("#select-tamirIsEmri-tamir3").select2()
    .on("select2:select", function (e) {
        let data = $('#select-tamirIsEmri-tamir3').select2('data');
        let selected_element = $(e.currentTarget);
        let tamir = selected_element.val();
        tamirIsEmriModel.tamir3.ProsesAdi = data[0].text;
        tamirIsEmriModel.tamir3.ProcessNo = parseInt(tamir[0]);
        tamirIsEmriModel.tamir3.processName = $("#select-tamirIsEmri-tamir3").select2().find(":selected").attr("data-processName");
    });
$("#select-tamirIsEmri-tamir4").select2()
    .on("select2:select", function (e) {
        let data = $('#select-tamirIsEmri-tamir4').select2('data');
        let selected_element = $(e.currentTarget);
        let tamir = selected_element.val();
        tamirIsEmriModel.tamir4.ProsesAdi = data[0].text;
        tamirIsEmriModel.tamir4.ProcessNo = parseInt(tamir[0]);
        tamirIsEmriModel.tamir4.processName = $("#select-tamirIsEmri-tamir4").select2().find(":selected").attr("data-processName");
    });


// unscelect
$("#select-tamirIsEmri-tamir1").select2()
    .on("select2:unselecting", function (e) {
        tamirIsEmriModel.tamir1.ProcessNo = 0;
        tamirIsEmriModel.tamir1.ProsesAdi = "";
        tamirIsEmriModel.tamir1.processName = "";
    });
$("#select-tamirIsEmri-tamir2").select2()
    .on("select2:unselecting", function (e) {
        tamirIsEmriModel.tamir2.ProcessNo = 0;
        tamirIsEmriModel.tamir2.ProsesAdi = "";
        tamirIsEmriModel.tamir2.processName = "";

    });
$("#select-tamirIsEmri-tamir3").select2()
        .on("select2:unselecting", function (e) {
            tamirIsEmriModel.tamir3.ProcessNo = 0;
            tamirIsEmriModel.tamir3.ProsesAdi = "";
            tamirIsEmriModel.tamir3.processName = "";

    });
$("#select-tamirIsEmri-tamir4").select2()
        .on("select2:unselecting", function (e) {
            tamirIsEmriModel.tamir4.ProcessNo = 0;
            tamirIsEmriModel.tamir4.ProsesAdi = "";
            tamirIsEmriModel.tamir4.processName = "";
    });
//#endregion
// #region tamir is emri Hazirla
$('#btn-tamirIsEmri-isEmriHazirla').click((event) => {
    let tamirArray = [tamirIsEmriModel.tamir1.ProsesAdi,
    tamirIsEmriModel.tamir2.ProsesAdi, tamirIsEmriModel.tamir3.ProsesAdi,
    tamirIsEmriModel.tamir4.ProsesAdi,
    tamirIsEmriModel.tamir5.ProsesAdi, tamirIsEmriModel.tamir6.ProsesAdi];
    tamirIsEmriModel.tamirMiktari = $(Inputs.tmairIsEmri_tamirMiktar).val();
    tamirIsEmriModel.tarih = $(Inputs.tmairIsEmri_tarih).val();
    event.preventDefault();
    if (tamirIsEmriModel.stk === "" || tamirIsEmriModel.lotNo === "") {
        Swal.fire({
            type: 'error',
            title: 'STK veya LotNot Girilmemiş'
        });
    }
    else if ($(Inputs.tmairIsEmri_tamirMiktar).val() === "" || $(Inputs.tmairIsEmri_tamirMiktar).val()<0) {
        Swal.fire({
            type: 'error',
            title: 'Tamir Miktari Girilmemiş veya yanlış girilmiş'
        });
    }
   else if (checkTamirlerIfEmpty(tamirArray) === false) {
        Swal.fire({
            type: 'error',
            title: 'en azından bir tamir işlemi girmeniz gerekiyor'
        });
    }
    else if (checkTamirlerIfEqual(tamirArray) === false) {
        Swal.fire({
            type: 'error',
            title: 'Tamir Değerler farkılı olması gerekiyor'
        });
    }
    else {
        InsertTamirIsEmri();
    }
});

function checkTamirlerIfEqual(tamirArray) {
    let result = true;
    for (let i = 0; i < tamirArray.length; i++) {
        if (tamirArray[i] === "") continue;
        for (let j = 0; j < tamirArray.length; j++) {
            if (tamirArray[i] === tamirArray[j] && i!==j) {
                result = false;
                break;
            }
        }
    }
    return result;
}
function checkTamirlerIfEmpty(tamirArray) {
    let result = true;
    if (tamirArray[0] === "" && tamirArray[1] === "" && tamirArray[2] === "" && tamirArray[3] === "")result = false;
    return result;
};

function InsertTamirIsEmri() {
    ShowLoader();
    console.log(tamirIsEmriModel);
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.tamirIsEmri_InsertTamirIsEmri,
        data: JSON.stringify(tamirIsEmriModel),
        success: (newLotNo) => {
      
            tamirIsEmriModel.newLotNo = newLotNo;
            $(Inputs.tamirIsEmri_newLotNo).val(newLotNo);
            Swal.fire(
                'Tamir iş emri başarıyla kayıt edilidi',
                '',
                'success'
            ); 
            
        },
        error: () => {
            Swal.fire({
                type: 'error',
                title: 'Beklenmeyen bir hata oluştu'
            });
        }
    });
HideLoader();
}


//#endregion


//#region Reset Every think

function tamirIsEmriReset() {

    ShowLoader();
    $(TablesId.tamirIsEmri_searchStk).empty();
    $('.tamirIsEmriProdcutionOrders').css('opacity', '0');
    $('.tamirIsEmriCard').css('opacity', '0');
    $([document.documentElement, document.body]).animate({
        scrollTop: $('.top_nav').offset().top
    }, 500);
    tamirIsEmriModel.lotNo = "";
    tamirIsEmriModel.stk = "";
    tamirIsEmriModel.p_id = "";
    tamirIsEmriModel.tarih = "";
    tamirIsEmriModel.tamirMiktari = "";
    tamirIsEmriModel.newLotNo = "";
    tamirIsEmriModel.tamir1.ProcessNo = null;
    tamirIsEmriModel.tamir1.ProsesAdi = "";
    tamirIsEmriModel.tamir2.ProcessNo = null;
    tamirIsEmriModel.tamir2.ProsesAdi = "";
    tamirIsEmriModel.tamir3.ProcessNo = null;
    tamirIsEmriModel.tamir3.ProsesAdi = "";
    tamirIsEmriModel.tamir4.ProcessNo = null;
    tamirIsEmriModel.tamir4.ProsesAdi = "";
    $(Inputs.tmairIsEmri_tarih).val("");
    $(Inputs.tmairIsEmri_tamirMiktar).val("");
    $(Inputs.tmairIsEmri_stk).val("");
    $(Inputs.tamirIsEmri_searchByStk).val("");
    $(Inputs.tmairIsEmri_LotNo).val("");
    $(Inputs.tamirIsEmri_newLotNo).val("");
    $("select").val(null).trigger("change");



    console.log(tamirIsEmriModel);
    HideLoader();
}
$('#btn-tamirIsEmri-reset').click((event) => {
    event.preventDefault();
    tamirIsEmriReset();
})
// #endregion

//#region Print out 

$('#btn-tamirIsEmri-cikiti').click((event) => {
    console.log(tamirIsEmriModel);
    $('.isEmriCiktiModel').empty();
    event.preventDefault();
    let model = tamirIsEmriCiktisiHazirla(tamirIsEmriModel);
    $('.isEmriCiktiModel').css('opacity', '1');
    $('.isEmriCiktiModel').append(model);
    JsBarcode("#newLotNoBarcode", `${tamirIsEmriModel.newLotNo}`, { format: "CODE128", text: "" });
    $('.isEmriCiktiModel').printThis({
        afterPrint: HideModel,
        loadCSS: "css/tamirIsEmriCiktisi.css"
    });
});
function HideModel() {
  //$('.isEmriCiktiModel').empty();
// $('.isEmriCiktiModel').css('opacity', '0');
}
//#endregion

