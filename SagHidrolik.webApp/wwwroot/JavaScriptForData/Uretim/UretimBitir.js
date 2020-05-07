$(function () {

    let urtetimBitirUrl = BaseUrl + "Home/UretimBitir";
    if (window.location.href === urtetimBitirUrl) {
        Getfire();
        GetProcessFlowClose();
        GetAktiveOperatorsInUretimBitir();
    }
});


let requestQueryForUretimBitir = {
    pageSize: 10,
    pageNumber: 1,
    Pid: "",
    lotNo: "",
    Stk:""
};
var uretimBitirObject = {
    urunKodu: 0,
    lotNo: 0,
    flow_Id: "",
    FlowDetailsId:"",
    MakineId:0,
    baslaUretimOperatorId: 0,
    uretimBitirOpertorId: -1,
    Miktar: 0,
    fire1: {
        selected: 0,
        id: 0,
        inpValue:""
    },
    fire2: {
        selected: 0,
        id: 0,
        inpValue:""
    },
    tamir: {
        selected: 0,
        id: 0,
        inpValue:""
    },
    durus: {
        dk: 0,
        note:""
    }
}
let uretimBitirfire1 = $('#inp-uretimBitir-fire1');
let uretimBitirfire2 = $('#inp-uretimBitir-fire2');
let uretimBitirTamir = $('#inp-uretimBitir-tamir');
$('#urtimBitir-PageSize').text(requestQueryForUretimBitir.pageNumber);
// #region  paginantion
$('#previous-table-ProcessFlowClose').on('click', (event) => {
    event.preventDefault();
    if (requestQueryForUretimBitir.pageNumber > 1) requestQueryForUretimBitir.pageNumber -= 1;
    $('#urtimBitir-PageSize').text(requestQueryForUretimBitir.pageNumber);
    GetProcessFlowClose();

});
$('#next-table-ProcessFlowClose').on('click', (event) => {
    event.preventDefault();
    requestQueryForUretimBitir.pageNumber += 1;
    $('#urtimBitir-PageSize').text(requestQueryForUretimBitir.pageNumber);
    GetProcessFlowClose();


});
// #endregion

// #region search

let urunNoUretimBitir = $("#inp-uretimBitir-searchUrunNo");
let lotNoUretimBitir = $("#inp-uretimBitir-searchlotNo");
urunNoUretimBitir.keyup(function () {
    clearTimeout(typingTimer);
    if (urunNoUretimBitir.val()) {
        requestQueryForUretimBitir.pageNumber = 1;
        typingTimer = setTimeout(SearchInUretimBitir, doneTypingInterval);
    }
    else if (urunNoUretimBitir.val() === '') {
        requestQueryForUretimBitir.pageNumber = 1;
        requestQueryForUretimBitir.Stk = '';
        $('.cardBitir').css('opacity', '0').fadeIn();
        GetProcessFlowClose();


    }
});


lotNoUretimBitir.keyup(function () {
   

    clearTimeout(typingTimer);
    if (lotNoUretimBitir.val()) {
        requestQueryForUretimBitir.pageNumber = 1;
        typingTimer = setTimeout(SearchInUretimBitir, doneTypingInterval);
    }
    else if (lotNoUretimBitir.val() === '') {
        requestQueryForUretimBitir.pageNumber = 1;
        requestQueryForUretimBitir.lotNo = '';
        $('.cardBitir').css('opacity', '0').fadeIn();
        GetProcessFlowClose();

    }
});
//user is "finished typing," do something
function SearchInUretimBitir() {
    $('.cardBitir').css('opacity', '0');
    requestQueryForUretimBitir.lotNo = lotNoUretimBitir.val();
    requestQueryForUretimBitir.Stk = urunNoUretimBitir.val();
    GetProcessFlowClose();
}

// #endregion 

$('#uretimBitirTable').on('click', 'tr', function () {
    var stk = $(this).data('stk');
    var lot = $(this).data('lot');
    var operatorId = $(this).data('operator');
    var machine_no = $(this).data('machine_no');
    var miktar = $(this).data('miktar');
    var operatorName = $(this).data('operator_name');
    var flow_id = $(this).data('flow_id');
    var FlowDetailsId = $(this).data('flowdetailsid');
    uretimBitirObject.FlowDetailsId = FlowDetailsId;
    uretimBitirObject.Miktar = $(this).data('miktar');
    uretimBitirObject.baslaUretimOperatorId = operatorId;
    uretimBitirObject.flow_Id = flow_id;
    uretimBitirObject.MakineId = machine_no;
    uretimBitirObject.urunKodu = stk;
    uretimBitirObject.lotNo = lot;
    $('#uretimBitir-miktar').text(miktar);
    $('#uretimBitir-operatorId').text(operatorId);
    $('#inp-uretimBitir-stk').val(stk);
    $('#inp-uretimBitir-lot').val(lot);
    $('#inp-uretimBitir-machineId').val(machine_no);
    $('#uretimBitir-operatorName').val(operatorName + " - " + operatorId);
    $('.cardBitir').css("opacity", 1);
    //$("select").val(null).trigger("change");
    //var process = $(this).data('process');
    //var processno_id = $(this).data('processno_id');

    //var machine_Id = $(this).data('machine_Id');
    //var flow_id = $(this).data('flow_id');

    //uretimBaslaObject.Flow_ID = flow_id;
    //$('.card').fadeIn();
    //$('.card').css('opacity', '1').fadeIn();
    //SendStkAndLot(stk, lot, process);
    //uretimBaslaObject.lotNo = lot;
    //uretimBaslaObject.stk = stk;
    //uretimBaslaObject.process = process;
    //uretimBaslaObject.processno_id = processno_id;
});

function Getfire() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetFire+"",
        success: (list) => {
            $('#uretimBitir-fir1-all').empty();
            $('#uretimBitir-fir2-all').empty();
      
            list.map((element) => {
                $("#uretimBitir-fir1-all").append("<option value='" + element.reject_ID + "'>" + element.rEject_Name + "</option>");
                $("#uretimBitir-fir2-all").append("<option value='" + element.reject_ID + "'>" + element.rEject_Name + "</option>");
                $("#uretimBitir-tamir").append("<option value='" + element.reject_ID + "'>" + element.rEject_Name + "</option>");
                //$('#uretimBitir-fir1-all').trigger('change');
                //$('#uretimBitir-fir2-all').trigger('change');
            });
        }
    });
}


function GetProcessFlowClose() {
    requestQueryForUretimBitir.lotNo = $("#inp-uretimBitir-searchlotNo").val();
    requestQueryForUretimBitir.Stk = $("#inp-uretimBitir-searchUrunNo").val();
    $('#urtimBitir-PageSize').text(requestQueryForUretimBitir.pageNumber);
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcessFlowClose,
        data: JSON.stringify(requestQueryForUretimBitir),
        success: (list) => {
            if (list.length !== 0) {
                $(`${recordsNotFound.uretimBitir}`).css('display', 'none');
                $('#uretimBitirTable').empty();
                CreateProcessFlowCloseTable(list);
            }
            else {
                HideLoader();
                $('#uretimBitirTable').empty();
                $(`${recordsNotFound.uretimBitir} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(`${recordsNotFound.uretimBitir}`).css('display', 'block');
            }
         
        }
    });
}

function CreateProcessFlowCloseTable(list) {
    if (list !== null) list.map((element, index) => {
        $('#uretimBitirTable').append(`
<tr data-flowDetailsId="${element.id}" data-flow_id=${element.flow_ID}  data-stk="${element.stk}" data-miktar="${element.process_qty}"
data-operator_Name="${element.operator_Name}" data-lot="${element.lotNo}" data-miktar="${element.process_qty}"  data-process="${element.prosesAdi}" data-machine_no=${element.machine_no} data-operator=${element.operator}>
  <td>${element.stk}</td>
    <td>${element.lotNo}</td>
    <td>${element.prosesAdi} </td>
    <td>${element.operator_Name}</td>
    <td>${element.machine_no} </td>
<td> ${element.process_qty}</td>
             </tr>
`);
    });
    HideLoader();
}
function GetAktiveOperatorsInUretimBitir() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAktiveOperators,
        success: (list) => {
            $('#uretimBitir-activeOpertors').empty();
            if (list.length !== 0) {
                list.map((element) => {
                    $("#uretimBitir-activeOpertors").append("<option value='" + element.operator_ID + "'>" + element.operator_Name + "</option>");
                    $('#uretimBitir-activeOpertors').trigger('change');
                });

            }
        }
    });
}


// #region active operator
$("#uretimBitir-activeOpertors").select2()
    .on("select2:select", function (e) {
        var selected_element = $(e.currentTarget);
        var uretimBitirOpertorId = selected_element.val();

        uretimBitirObject.uretimBitirOpertorId = uretimBitirOpertorId[0];
    });

$("#uretimBitir-activeOpertors").select2()
    .on("select2:unselecting", function (e) {
        uretimBitirObject.uretimBitirOpertorId = -1;
    });
// #endregion


// #region  fire1
$("#uretimBitir-fir1-all").select2()
    .on("select2:select", function (e) {
        var selected_element = $(e.currentTarget);
        var fire1 = selected_element.val();
        uretimBitirObject.fire1.id = fire1[0];
        uretimBitirObject.fire1.selected=1;
    });

$("#uretimBitir-fir1-all").select2()
    .on("select2:unselecting", function (e) {
        uretimBitirObject.fire1.selected = 0;
    });

// #endregion

// #region  fire2

$("#uretimBitir-fir2-all").select2()
    .on("select2:select", function (e) {
        var selected_element = $(e.currentTarget);
        var fire2 = selected_element.val();
        uretimBitirObject.fire2.id = fire2[0];
        uretimBitirObject.fire2.selected = 1;
    });

$("#uretimBitir-fir2-all").select2()
    .on("select2:unselecting", function (e) {
        uretimBitirObject.fire2.selected = 0;
    });
// #endregion

// #region  tamir

$("#uretimBitir-tamir").select2()
    .on("select2:select", function (e) {
        var selected_element = $(e.currentTarget);
        var tamir = selected_element.val();
        uretimBitirObject.tamir.id = tamir[0];
        uretimBitirObject.tamir.selected = 1;
    });

$("#uretimBitir-tamir").select2()
    .on("select2:unselecting", function (e) {
        uretimBitirObject.tamir.selected = 0;
    });
// #endregion



$('#btn-uretimBitir-submit').click((event) => {
    let uretimMiktar = $('#inp-uretimBitir-miktar').val();
    event.preventDefault();
    if (uretimBitirObject.uretimBitirOpertorId === -1 || uretimBitirObject.uretimBitirOpertorId === null) {
        Swal.fire({
            type: 'error',
            title: 'operator Girilmemiş',
            text: ' üretimi Bitirecek olan operator seçmeniz gerekiyor'
        });
        return true;
    }
    if (uretimBitirObject.baslaUretimOperatorId != uretimBitirObject.uretimBitirOpertorId) {
        Swal.fire({
            type: 'error',
            title: 'Yanlış operator',
            text: ' üretimi başlayan operator  aynı operator bitirmesi gerekmektedir'
        });
        return true;
    }
    if (uretimMiktar === "" || uretimMiktar === null || uretimMiktar < 0) {
        Swal.fire({
            type: 'error',
            title: 'Miktar Hatali',
            text: ' Miktart girilmemi veya negatif değer girildi'
        });
        return true;
    }
    //#region fires Controls
    // fire1
    if (uretimBitirfire1.val() ==="" && uretimBitirObject.fire1.selected == 1 ) {
        Swal.fire({
            type: 'error',
            title: 'Fire Hata',
            text: 'Fire1 secilmiş ancak değer girilmemiş'
        });
        return true
    }
    if (uretimBitirfire1.val() !== "" && uretimBitirObject.fire1.selected == 0) {
        Swal.fire({
            type: 'error',
            title: 'Fire Hata',
            text: ' değer girilmiş ancak Fire1 seçilmemiş '
        });
        return true;
    }
    // fire2
    if (uretimBitirfire2.val() === "" && uretimBitirObject.fire2.selected === 1) {
        Swal.fire({
            type: 'error',
            title: 'Fire Hata',
            text: 'Fire2 secilmiş ancak değer girilmemiş'
        });
        return true;
    }
    if (uretimBitirfire2.val() !== "" && uretimBitirObject.fire2.selected === 0) {
        Swal.fire({
            type: 'error',
            title: 'Fire Hata',
            text: ' değer girilmiş ancak Fire2 seçilmemiş '
        });
        return true;
    }
    // tamir
    if (uretimBitirTamir.val() === "" && uretimBitirObject.tamir.selected === 1) {
        Swal.fire({
            type: 'error',
            title: 'Tamir Hata',
            text: 'Tamir secilmiş ancak değer girilmemiş'
        });
        return true;
    }
    if (uretimBitirTamir.val() !== "" && uretimBitirObject.tamir.selected === 0) {
        Swal.fire({
            type: 'error',
            title: 'Tamir Hata',
            text: ' değer girilmiş ancak Tamir seçilmemiş '
        });
        return true;
    }
    //#endregion 
    if (uretimMiktar > (uretimBitirObject.Miktar + 10)) {
        Swal.fire({
            type: 'error',
            title: 'Miktar Fazla',
            text: ' Miktar fazla girdiniz'
        });
        return true;
    }
    if (uretimMiktar < uretimBitirObject.Miktar) {
        $('.modal-content h4').text('Miktar az!');
        $('.modal-body h3').text('Toplam üretilen miktar az. Devam edilsin mi?');
        $('.modal').modal('show');
    }
    else {
        $('.modal-content h4').text('');
        $('.modal-body h3').text('Onyaliyor Musunuz ?');
        $('.modal').modal('show');
    }

});


$('#uretimBitir-confirmSubmiting').click((event) => {
    event.preventDefault();
    uretimBitirObject.Miktar=$('#inp-uretimBitir-miktar').val();
    let dk = $('#uretimBitir-durus-dk');
    let note = $('#uretimBitir-durus-note');
    uretimBitirObject.durus.dk = $('#uretimBitir-durus-dk').val();
    uretimBitirObject.durus.note = $('#uretimBitir-durus-note').val();
    uretimBitirObject.fire1.inpValue = $('#inp-uretimBitir-fire1').val();
    uretimBitirObject.fire2.inpValue = $('#inp-uretimBitir-fire2').val();
    uretimBitirObject.tamir.inpValue = $('#inp-uretimBitir-tamir').val();
    let uretimBitirViewModel = uretimBitirObject;
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.UretimBitirConfirm,
        data: JSON.stringify(uretimBitirViewModel),
        success: (list) => {
            $('.modal').modal('hide');
            Swal.fire(
                'Başarıyla uretim Bitirilid',
                '',
                'success'
            );
            uretimBitirReset();
            GetProcessFlowClose();
        }
    });
})

function uretimBitirReset() {
    $('.cardBitir').css("opacity", 0);
    $("select").val(null).trigger("change");
    //$('#inp-uretimBitir-fire1').val("");
    //$('#inp-uretimBitir-fire2').val("");
    //$('#inp-uretimBitir-tamir').val("");
    $("#inp-uretimBitir-searchUrunNo").val("");
    $("#inp-uretimBitir-searchlotNo").val("");
    $(':input', '#uretimBitirForm')
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .prop('checked', false)
        .prop('selected', false);

  
    uretimBitirObject = {
        urunKodu: 0,
        lotNo: 0,
        flow_Id: "",
        FlowDetailsId: "",
        MakineId: 0,
        baslaUretimOperatorId: 0,
        uretimBitirOpertorId: -1,
        Miktar: 0,
        fire1: {
            selected: 0,
            id: 0,
            inpValue: ""
        },
        fire2: {
            selected: 0,
            id: 0,
            inpValue: ""
        },
        tamir: {
            selected: 0,
            id: 0,
            inpValue: ""
        },
        durus: {
            dk: 0,
            note: ""
        }
    };
    requestQueryForUretimBitir.pageNumber = 1;
    requestQueryForUretimBitir.pageSize = 10;
    requestQueryForUretimBitir.Stk = "";
    requestQueryForUretimBitir.Pid = "";
   
   
}
requestQueryForUretimBitir.lotNo = "";

$('#btn-uretimBitirReset').click((event) => {
    uretimBitirReset();
    event.preventDefault();
    GetProcessFlowClose();

});

//#region on change miktar input set gecerli or not
//let _typingTimer;
//let _doneTypingInterval = 500;
//$('#inp-uretimBitir-miktar').keyup(function () {
//    clearTimeout(_typingTimer);
//    if ($('#inp-uretimBitir-miktar').val()) {
//        typingTimer = setTimeout(setMiktarvalidOrNot, _doneTypingInterval);
//    }
  
//});
//function setMiktarvalidOrNot() {
//    let mkNumber = $('#inp-uretimBitir-miktar').val();
//    let urObMk = uretimBitirObject.Miktar;
//    if (mkNumber == urObMk || mkNumber >= urObMk + 10 || mkNumber==0) {
//        $('#mkNumber').text(`+(${mkNumber - urObMk})`);
//        $('#mkSuccess').css('display', 'block');
//        $('#mkDanger').css('display', 'none');
//    }
//    else  {
//        $('#mkNumber').text(`(${mkNumber})`);
//        $('#mkSuccess').css('display', 'none');
//        $('#mkDanger').css('display', 'block');
//    }
//}
//#endregion