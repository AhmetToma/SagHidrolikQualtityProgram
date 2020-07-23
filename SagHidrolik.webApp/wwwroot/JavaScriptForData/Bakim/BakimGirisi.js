$(function () {

    let u = BaseUrl + "Home/BakimGirisi";
    if (window.location.href === u) {
        GetAllMachineInBakimGirisiAjaxCall();
        GetAllMachineCountInBakimGirisi();
        requestQueryForBakimSorumlu.pageNumber = 1;
        requestQueryForBakimSorumlu.pageSize = 100000;
        GetAllBakimSorumlulariAjaxCall(false);
        $("#inp-bakimGirisi-tarih").datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $("#inp-bakimGirisi-tarih").val(today);
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

let requestQueryForBakimGirisi = {
    pageNumber: 1,
    pageSize: 6,
    machineNo: ""
};

let bakimGirisiModel = {
    machine_Id: null,
    Tarih: "",
    BakimTipi: null,
    BakimYapan: null,
    BaslamaSaat:"",
    BitisSaat: "",
    ArizaTanimi: "",
    YapilanIslem: "",
}


// #region Ajax call ,Create Table
function GetAllMachineInBakimGirisiAjaxCall() {
    $(TablesId.bakimGirisi).empty();
    requestQueryForBakimGirisi.machineNo = $(Inputs.bakimGirisi_machineNo).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForBakimGirisi),
        url: HttpUrls.BakimAriza_GetAllMachines,
        success: (list) => {
            if (list.length !== 0) {
                $(recordsNotFound.bakimGirisi).css('display', 'none');
                console.log('ozet', list)
                CreateBakimGirisiTable(list, TablesId.bakimGirisi);
            }
            else {
                $(`${recordsNotFound.bakimGirisi} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.bakimGirisi).css('display', 'block');
                HideLoader();
            }
        }
    });
}

function CreateBakimGirisiTable(list, tableId) {
    $(tableId).empty();
    let status = '';
    list.map((element, index) => {
        $(tableId).append(`
<tr data-id="${element.machine_Id}" data-machinNo="${element.machine_no}">
  <td>${element.machine_no}</td>
    <td>${element.machine_Name}</td>
    <td>${element.model} </td>
    <td>${element.bolum}</td>
    <td>${element.producer ? element.producer:""}</td>
             </tr>
`);
    });
    HideLoader();
}




$(Inputs.bakimGirisi_machineNo).keyup(function () {
    clearTimeout(timer);
    requestQueryForBakimGirisi.pageNumber = 1;
    $('#num-bakimGirisi-pageNumber').text(requestQueryForBakimGirisi.pageNumber);
    timer = setTimeout(GetAllMachineInBakimGirisiAjaxCall, typingInterval);
});
//#endregion 


//#region Next-Previous Hanldler
$(PreviousButtons.bakimGirisi).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForBakimGirisi.pageNumber > 1) requestQueryForBakimGirisi.pageNumber -= 1;
    $('#num-bakimGirisi-pageNumber').text(requestQueryForBakimGirisi.pageNumber);
    GetAllMachineInBakimGirisiAjaxCall();

});
$(NextButtons.bakimGirisi).on('click', (event) => {
    event.preventDefault();
    requestQueryForBakimGirisi.pageNumber += 1;
    $('#num-bakimGirisi-pageNumber').text(requestQueryForBakimGirisi.pageNumber);
    GetAllMachineInBakimGirisiAjaxCall();
});
//#endregion

// #region selects Row Count
$('#select-bakimGirisi-selectRowCount').on('change', (e) => {
    e.preventDefault();
    requestQueryForBakimGirisi.pageNumber = 1;
    $('#num-bakimGirisi-pageNumber').text(requestQueryForBakimGirisi.pageNumber);
    requestQueryForBakimGirisi.pageSize = parseInt($('#select-bakimGirisi-selectRowCount').val());
    GetAllMachineInBakimGirisiAjaxCall();
})


function GetAllMachineCountInBakimGirisi() {
    $('#select-bakimGirisi-selectRowCount').empty();
    $.getJSON(`${HttpUrls.GetAllMachineCount}`, function (num) {
        $('#select-bakimGirisi-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="${num}">(${num}) All Records</option>

`);
        $('#span-bakimGirisi-rowCount').text(num);

    })
}
//#endregion


//#region select Table Row And Get Bakim Kayit
$(TablesId.bakimGirisi).on('click', 'tr', function () {
    $('.bakimGirisiCard').css('opacity', '1').fadeIn();
    let machine_Id = parseInt($(this).data('id'));
    let machineNo = $(this).data('machinno');
    $('#inp-bakimGirisi-machineNo').val(`${machineNo}  **  ${machine_Id}`);
    bakimGirisiModel.machine_Id = parseInt(machine_Id);
    if (bakimSorumlulariList.length > 0) {
        $('#select-bakimGirisi-operators').empty();
        bakimSorumlulariList.map((element) => {
            $('#select-bakimGirisi-operators').append(`
<option value=${element.sorumluId}>${element.bakimSorumlusu}</option>`);
        })
    }

});

//#endregion


$('#btn-bakimGirisi-reset').click(e => {
    e.preventDefault();
    requestQueryForBakimGirisi.machineNo = "";
    requestQueryForBakimGirisi.pageSize = 6;
    requestQueryForBakimGirisi.pageNumber = 1;
    $('#select-bakimGirisi-selectRowCount').val(6);
    $(Inputs.bakimGirisi_machineNo).val('');
    $('.bakimGirisiCard').css('opacity', '0').fadeIn();
    GetAllMachineInBakimGirisiAjaxCall();
})


//#Submit bakim girişi

$('#btn-bakimGirisi-submit').click((event) => {
    event.preventDefault();
    let machineNo = $('#inp-bakimGirisi-machineNo').val();
    let bakimTipi = $('#select-bakimGirisi-bakimTipi').val();
    let tarih = $('#inp-bakimGirisi-tarih').val();
    let operator = $('#select-bakimGirisi-operators').val();
    let baslamaSaat = $('#inp-bakimGirisi-baslamaSaat').val();
    let bitisSaat = $('#inp-bakimGirisi-bitisSaat').val();
    let tanim = $('#textArea-bakimGirisi-tanim').val();
    let yapilanIslemler = $('#textArea-bakimAriza-yapilan').val();
    console.log(operator);
    if (tarih === '' ||
        machineNo===''||
        operator === null ||
        baslamaSaat === '' ||
        bitisSaat==='' ||
        tanim === '' ||
        yapilanIslemler === '' ||
        bakimTipi === '' 
    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 5000
        });
    }
    else if (bakimGirisiModel.machine_Id === null) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tablodan bir kayit seçmeniz gerekiyor',
            timer: 5000
        });
    }
    else {
        bakimGirisiModel.BaslamaSaat = `${tarih} ${baslamaSaat}`;
        bakimGirisiModel.BitisSaat = `${tarih} ${bitisSaat}`;
        bakimGirisiModel.Tarih = tarih;
        bakimGirisiModel.BakimTipi = parseInt(bakimTipi);
        bakimGirisiModel.BakimYapan = parseInt(operator[0]);
        bakimGirisiModel.tarih = tarih;
        bakimGirisiModel.ArizaTanimi = tanim;
        bakimGirisiModel.YapilanIslem = yapilanIslemler;
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.InsertIntoBakimGirisi,
            data: JSON.stringify(bakimGirisiModel),
            success: (message) => {
                HideLoader();
                if (message === "done") {
                    GetAllBakimArizaKapamAjaxCall();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Yeni Bakım Başarıyle Eklendi',
                        type: 'success',
                        timer: 5000
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
        $('#inp-bakimGirisi-tarih').val('');
        $("#select-bakimGirisi-operators").val(null).trigger("change");
        $('#inp-bakimGirisi-bitisSaat').val('');
        $('#inp-bakimGirisi-baslamaSaat').val('');
        $('#inp-bakimGirisi-machineNo').val('');
        $('#textArea-bakimGirisi-tanim').val('');
        $('#textArea-bakimAriza-yapilan').val('');
        $('#inp-bakimGirisi-bakimTipi').val('');
    };
    console.log(bakimTipi);
    console.log(bakimGirisiModel);
});
//#endregion










