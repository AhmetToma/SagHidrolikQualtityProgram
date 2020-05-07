
$(function () {
    let date = new Date();
    let today = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

    let dataUrl = "Home/BakimAriza";
    let BakimArizaUrl = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === BakimArizaUrl || window.location.href === serverUrl) {
        $("#select-bakimAriza-operators").select2({
            maximumSelectionLength: 1,
            placeholder: "operator Seçiniz"
        });
        $(Inputs.bakimAriza_tarih).datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $(Inputs.bakimAriza_tarih).val(today);
        AllMachinesAjaxRequest();
        AllGecmisTaleplerAjaxCall();
        GetAktiveOperatorsInBakimAriza();
    }
});
let requestQueryForBakimAriza = {
    pageNumber: 1,
    pageSize: 8,
    machineNo:""
};
let bakimAriza = {
    machineNo: "",
    machineId:"",
    MakineAdi: "",
    Model: "",
    Bolum: "",
    opertatorName: "",
    operatorId: "",
    tarih: "",
    tanim:"",
};
// #region Ajax Call And create All Machines Table
function AllMachinesAjaxRequest() {
    ShowLoader();
    $(TablesId.BakimAriza_AllMachines).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.BakimAriza_GetAllMachines,
        data: JSON.stringify(requestQueryForBakimAriza),
        success: (list) => {
            if (list.length !== 0) {
                $(recordsNotFound.BakimAriaz_AllMachines).css('display', 'none');
                CreateAllMachinesTableInBakimAriza(list, TablesId.BakimAriza_AllMachines);
            }
            else {
                
                $(`${recordsNotFound.BakimAriaz_AllMachines} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.BakimAriaz_AllMachines).css('display','block');

                HideLoader();
            }
        }
    });
};
function CreateAllMachinesTableInBakimAriza(list,tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr data-makineNo="${element.machine_no}"  data-machineId ="${element.machine_Id}">
  <td>${element.machine_no}</td>
    <td>${element.machine_Name}</td>
    <td>${element.model} </td>
    <td>${element.bolum}</td>
             </tr>
`);
    });
    HideLoader();
}
//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.bakimAriza_AllMachines).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForBakimAriza.pageNumber > 1) requestQueryForBakimAriza.pageNumber -= 1;
    $('#num-bakimAriza-pageNumber').text(requestQueryForBakimAriza.pageNumber);
    AllMachinesAjaxRequest();

});
$(NextButtons.bakimAriza_AllMachines).on('click', (event) => {
    event.preventDefault();
    requestQueryForBakimAriza.pageNumber += 1;
    $('#num-bakimAriza-pageNumber').text(requestQueryForBakimAriza.pageNumber);
    AllMachinesAjaxRequest();
});
//#endregion

// #region search
let bakimArizatypingTimer;
let bakimArizadoneTypingInterval = 500;
$(Inputs.bakimAriza_searchMachineNo).keyup(function () {
    $('.bakimArizaCard').css('opacity', '0').fadeIn();
    clearTimeout(bakimArizatypingTimer);
    if ($(Inputs.bakimAriza_searchMachineNo).val()) {
        requestQueryForBakimAriza.pageNumber = 1;
        bakimArizatypingTimer = setTimeout(SearcheInAllMachines, bakimArizadoneTypingInterval);
    }
    else if ($(Inputs.bakimAriza_searchMachineNo).val()=== '') {
        requestQueryForBakimAriza.pageNumber = 1;
        AllMachinesAjaxRequest();

    }
});
//user is "finished typing," do something
function SearcheInAllMachines() {
    requestQueryForBakimAriza.machineNo = $(Inputs.bakimAriza_searchMachineNo).val();
    AllMachinesAjaxRequest();
}

// #endregion 

//#region Select Row 
$(TablesId.BakimAriza_AllMachines).on('click', 'tr', function () {
    $(Inputs.bakimAriza_tarih).val(today);
    $('.bakimArizaCard').css('opacity', '1').fadeIn();
    let machineNo = $(this).data('makineno');
    let machineId = $(this).data('machineid');
    $(Inputs.bakimAriza_selectedMachineNo).val(machineNo);
    bakimAriza.machineNo = machineNo;
    bakimAriza.machineId = machineId;
});
// #endregion

// #region get All operator and hanlde selected One
function GetAktiveOperatorsInBakimAriza() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAktiveOperators,
        success: (list) => {
            $('#select-bakimAriza-operators').empty();
            list.map((element) => {
                $("#select-bakimAriza-operators").append("<option value='" + element.operator_ID + "'>" + element.operator_Name + "</option>");
                $('#select-bakimAriza-operators').trigger('change');
            });
        }
    });
}
$("#select-bakimAriza-operators").select2()
    .on("select2:select", function (e) {
        $('.select2-selection__choice').css('background-color', 'black');
        let opName = $('#select-bakimAriza-operators').select2('data');
        var selectedelem = $(e.currentTarget);
        var operatorId = selectedelem.val();
        bakimAriza.operatorId = operatorId[0];
        bakimAriza.opertatorName = opName[0].text;
    });
$('#select-bakimAriza-operators').on("select2:unselecting", function (e) {
    bakimAriza.operatorId = "";
    bakimAriza.opertatorName = "";
});
// #endregion

//#region sumbmit bakim Ariza Form And confirm
$(Buttons.bakimAriza_submit).click((event) => {
    bakimAriza.tarih = $(Inputs.bakimAriza_tarih).val();
    bakimAriza.tanim = $('#textArea-bakimAriza-tanim').val();
    event.preventDefault();
    if (bakimAriza.operatorId === "") {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: ' Operatör bilgisi girilmemiş'
        });
    }
    else if (bakimAriza.machineNo === "") {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: ' herhangi bir makine seçilmemektedir'
        });
    }
    else if ($(Inputs.bakimAriza_tarih).val() === "") {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tarih seçmeninz gerekiyor'
        });
    }
    else if ($('#textArea-bakimAriza-tanim').val() === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tanım yazmanız gerekiyor'
        });
    }
    else {
        ShowLoader();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.BakimAriza_insertIntoBakimKayit,
            data: JSON.stringify(bakimAriza),
            success: () => {
                Swal.fire(
                    'Başarıyla Talepiniz Alındı',
                    '',
                    'success'
                );
                $('.bakimArizaCard').css('opacity', '0').fadeIn();
                AllMachinesAjaxRequest();
                bakimArizaReset();
                AllGecmisTaleplerAjaxCall();
                HideLoader();
            }
            ,
            error: () => {
                bakimArizaReset();
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Beklenmyen Bir Hata oluştu'
                });
                $('.bakimArizaCard').css('opacity', '0').fadeIn();
                AllMachinesAjaxRequest();
                bakimArizaReset;
                HideLoader();
            }
        });
     

    }
   
});
function bakimArizaReset() {
    $("select").val(null).trigger("change");
    Object.keys(bakimAriza).map((el) => {
        bakimAriza[el] = "";
    });
    $(':input', '#form-bakimAriaz')
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .prop('checked', false)
        .prop('selected', false);
    $(Inputs.bakimAriza_searchMachineNo).val('');
    requestQueryForBakimAriza.pageNumber = 1;
    requestQueryForBakimAriza.machineNo = "";
    AllMachinesAjaxRequest();
}
//#endregion
