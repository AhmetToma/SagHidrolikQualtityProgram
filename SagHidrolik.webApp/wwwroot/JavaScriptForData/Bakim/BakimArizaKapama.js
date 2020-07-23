$(function () {

    let u = BaseUrl + "Home/BakimArizaKapama";
    if (window.location.href === u) {
        GetAllBakimArizaKapamAjaxCall();
        requestQueryForBakimSorumlu.pageNumber = 1;
        requestQueryForBakimSorumlu.pageSize = 100000;
        GetAllBakimSorumlulariAjaxCall(false);
        $("#inp-bakimArziaKapama-tarih").datepicker({
            dateFormat: 'dd/mm/yy',
        });
        $("#inp-bakimArziaKapama-tarih").val(today);
        $('.timepicker').timepicker({
            timeFormat: 'h:mm p',
            interval: 60,
            minTime: '8',
            maxTime: '06:00pm',
            defaultTime: '',
            startTime: '08:00am',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $(".limitedNumbSelect2").select2({
            maximumSelectionLength: 1,
            placeholder: "Seçiniz"
        })
    }
});
let requestQueryForBakimArizakapama = {
    pageNumber: 1,
    pageSize: 6,
    machineNo: ""
};

let bakimAriazKapamModel = {
    bakimId: null,
    bitisSaat: "",
    tarih:"",
    bakimYapan: null,
    arizaTanim: "",
    yapilanIslemler:""
}

// #region Ajax call ,Create Table
function GetAllBakimArizaKapamAjaxCall() {
    $(TablesId.bakimArziaKapama).empty();
    requestQueryForBakimArizakapama.machineNo = $(Inputs.bakimArizaKapama_machineNo).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForBakimArizakapama),
        url: HttpUrls.GetAllBakimArizaKapama,
        success: (list) => {
            if (list.length !== 0) {
                $(recordsNotFound.bakimArziaKapama).css('display', 'none');
                console.log('kapama', list);
             CreateBakimArziaKapamaTable(list, TablesId.bakimArziaKapama);
            }
            else {
                $(`${recordsNotFound.bakimArziaKapama} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.bakimArziaKapama).css('display', 'block');
                HideLoader();
            }
        }
    });
}

function CreateBakimArziaKapamaTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr data-id="${element.Bakim_ID}" data-machineNo="${element.Machine_no}">
  <td>${element.Machine_no}</td>
  <td>${element.Machine_Name}</td>
    <td>${element.Operator_Name}</td>
    <td>${element.planlanaIslem} </td>
    <td>${element.BaslamaSaat}</td>
             </tr>
`);
    });
    HideLoader();
}
$(Inputs.bakimArizaKapama_machineNo).keyup(function () {
    alert('fv');
    clearTimeout(timer);
    requestQueryForBakimArizakapama.pageNumber = 1;
    $('#num-bakimArziaKapama-pageNumber').text(requestQueryForBakimArizakapama.pageNumber);
    timer = setTimeout(GetAllBakimArizaKapamAjaxCall, typingInterval);
});
//#endregion 


//#region Next-Previous Hanldler
$(PreviousButtons.bakimArziaKapama).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForBakimArizakapama.pageNumber > 1) requestQueryForBakimArizakapama.pageNumber -= 1;
    $('#num-bakimArziaKapama-pageNumber').text(requestQueryForBakimArizakapama.pageNumber);
    GetAllBakimArizaKapamAjaxCall();

});
$(NextButtons.bakimArziaKapama).on('click', (event) => {
    event.preventDefault();
    requestQueryForBakimArizakapama.pageNumber += 1;
    $('#num-bakimArziaKapama-pageNumber').text(requestQueryForBakimArizakapama.pageNumber);
    GetAllBakimArizaKapamAjaxCall();
});
//#endregion


//#region select Table Row And Get Bakim Kayit
$(TablesId.bakimArziaKapama).on('click', 'tr', function () {
    $('.bakimArizaCard').css('opacity', '1').fadeIn();
    let bakimId = $(this).data('id');
    bakimAriazKapamModel.bakimId = bakimId;
    let machineNo = $(this).data('machineno');
    $('#inp-bakimArziaKapama-machineNo').val(machineNo);
    if (bakimSorumlulariList.length > 0) {
        $('#select-bakimArziaKapama-operators').empty();
        bakimSorumlulariList.map((element) =>{
            $('#select-bakimArziaKapama-operators').append(`
<option value=${element.sorumluId}>${element.bakimSorumlusu}</option>`);
        })
       }
    //ShowLoader();
    //$.ajax({
    //    type: "GET",
    //    contentType: "application/json;charset=utf-8",
    //    url: HttpUrls.GetBakimKayitByMakineID + machine_Id,
    //    success: (list) => {
    //        CreateBakimKayitOzeti(list, TablesId.BakimKayit)
    //    }
    //});
});


//#endregion

$('#btn-bakimArziaKapama-reset').click(e => {
    e.preventDefault();
    requestQueryForBakimArizakapama.machineNo = "";
    requestQueryForBakimArizakapama.pageSize = 6;
    requestQueryForBakimArizakapama.pageNumber = 1;
    $(Inputs.bakimAriza_searchMachineNo).val('');
    $('.bakimArziaKapamaCard').css('opacity', '0').fadeIn();
    GetAllBakimArizaKapamAjaxCall();
})


$('#select-bakimArziaKapama-selectRowCount').val(6);



//#Submit bakim ariza kapama

$('#btn-bakimArziaKapama-submit').click((event) => {
    event.preventDefault();
    let tarih = $('#inp-bakimArziaKapama-tarih').val();
    let operator = $('#select-bakimArziaKapama-operators').val();
    let saat = $('#inp-bakimArziaKapama-saat').val();
    let tanim = $('#textArea-bakimArziaKapama-tanim').val();
    let yapilanIslemler = $('#textArea-bakimAriza-yapilan').val();
    console.log(operator);
    if (tarih === '' ||
        operator === null ||
        saat === '' ||
        tanim === '' ||
        yapilanIslemler === '' 
    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500
        });
    }

    else if (bakimAriazKapamModel.bakimId === null) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tablodan bir kayit seçmeniz gerekiyor',
            timer: 5000
        });
    }
    else {
        bakimAriazKapamModel.bitisSaat = `${tarih} ${saat}`;
        bakimAriazKapamModel.bakimYapan = parseInt(operator[0]);
        bakimAriazKapamModel.arizaTanim = tanim;
        bakimAriazKapamModel.yapilanIslemler = yapilanIslemler;
        bakimAriazKapamModel.tarih = tarih;
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.KapatBakimAriza,
            data: JSON.stringify(bakimAriazKapamModel),
            success: (message) => {
                HideLoader();
                if (message === "done") {
                    GetAllBakimArizaKapamAjaxCall();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Bakim Başarıyle kapandı',
                        type: 'success',
                        timer: 3000
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Beklenmeyen bir hata oluştu',
                        timer: 3000
                    });
                }
            }
        });
        $('#inp-bakimArziaKapama-tarih').val('');
        $("#select-bakimArziaKapama-operators").val(null).trigger("change");
        $('#inp-bakimArziaKapama-saat').val('');
       $('#textArea-bakimArziaKapama-tanim').val('');
        $('#textArea-bakimAriza-yapilan').val('');
    };
});
//#endregion
