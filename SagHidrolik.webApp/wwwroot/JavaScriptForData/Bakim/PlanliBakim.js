$(function () {
    let u = BaseUrl + "Home/PlanliBakim";
    if (window.location.href === u) {
        GetAllPlanliBakimAJjxCall();
        GetAllPlanliBakimCount();
        requestQueryForBakimSorumlu.pageNumber = 1;
        requestQueryForBakimSorumlu.pageSize = 100000;
        GetAllBakimSorumlulariAjaxCall(false);
        $("#inp-planliBakim-tarih").datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $("#inp-planliBakim-tarih").val(today);
        $(".limitedNumbSelect2").select2({
            maximumSelectionLength: 1,
            placeholder: "Seçiniz"
        });
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
    }
});

let requestQueryForPlanliBakim = {
    pageNumber: 1,
    pageSize: 6,
    machineNo: ""
};

let planliBakimModel = {
    machineId: null,
    bakimYapan: null,
    yapilanIslem: "",
    tarih: "",
    periodu: null,
    baslamaSaat: "",
    bitisSaat: "",
    bakimId: null
};
let matchedModel = {};

let planliBakimList = [];


// #region Ajax call ,Create Table
function GetAllPlanliBakimAJjxCall() {
    $(TablesId.planliBakim).empty();
    requestQueryForPlanliBakim.machineNo = $(Inputs.planliBakim_machineNo).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForPlanliBakim),
        url: HttpUrls.GetAllPlanliBakim,
        success: (list) => {
            if (list.length !== 0) {
                $(recordsNotFound.planliBakim).css('display', 'none');
                planliBakimList = list;
                console.log(list);
                CreatePlanliBakimTable(list, TablesId.planliBakim);
            }
            else {
                $(`${recordsNotFound.planliBakim} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.planliBakim).css('display', 'block');
                HideLoader();
            }
        }
    });
}

function CreatePlanliBakimTable(list, tableId) {
    $(tableId).empty();
    let status = '';
    list.map((element, index) => {
        $(tableId).append(`
<tr data-bakimId="${element.Bakim_ID}" data-id="${element.Machine_Id}" data-machinNo="${element.Machine_no}">
  <td>${element.Machine_no}</td>
    <td>${element.Machine_Name}</td>
    <td>${element.MODEL} </td>
    <td>${element.BakimSorumlusu} </td>
    <td>${element.PlanlananTarih}</td>
    <td>${element.PlanlananIslem ? element.PlanlananIslem : ""}</td>
             </tr>
`);
    });
    HideLoader();
}
$(Inputs.planliBakim_machineNo).keyup(function () {
    clearTimeout(timer);
    requestQueryForPlanliBakim.pageNumber = 1;
    $('#num-planliBakim-pageNumber').text(requestQueryForPlanliBakim.pageNumber);
    timer = setTimeout(GetAllPlanliBakimAJjxCall, typingInterval);
});
//#endregion 


//#region Next-Previous Hanldler
$(PreviousButtons.planliBakim).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForPlanliBakim.pageNumber > 1) requestQueryForPlanliBakim.pageNumber -= 1;
    $('#num-planliBakim-pageNumber').text(requestQueryForPlanliBakim.pageNumber);
    GetAllPlanliBakimAJjxCall();
});
$(NextButtons.planliBakim).on('click', (event) => {
    event.preventDefault();
    requestQueryForPlanliBakim.pageNumber += 1;
    $('#num-planliBakim-pageNumber').text(requestQueryForPlanliBakim.pageNumber);
    GetAllPlanliBakimAJjxCall();
});
//#endregion

// #region selects Row Count
$('#select-planliBakim-selectRowCount').on('change', (e) => {
    e.preventDefault();
    requestQueryForPlanliBakim.pageNumber = 1;
    $('#num-planliBakim-pageNumber').text(requestQueryForPlanliBakim.pageNumber);
    requestQueryForPlanliBakim.pageSize = parseInt($('#select-planliBakim-selectRowCount').val());
    GetAllPlanliBakimAJjxCall();
})
function GetAllPlanliBakimCount() {
    $('#select-planliBakim-selectRowCount').empty();
    $.getJSON(`${HttpUrls.GetAllPlanliBakimCount}`, function (num) {
        $('#select-planliBakim-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="${num}">(${num}) All Records</option>

`);
        $('#span-planliBakim-rowCount').text(num);

    })
}
//#endregion


//#region select Table Row And Get Bakim Kayit
$(TablesId.planliBakim).on('click', 'tr', function () {
    $('.bakimArizaCard').css('opacity', '1').fadeIn();
    let machine_Id = parseInt($(this).data('id'));
    let machineNo = $(this).data('machinno');
    let bakimId = parseInt($(this).data('bakimid'));
    planliBakimModel.bakimId = bakimId;
    planliBakimModel.machineId = machine_Id;
    if (bakimSorumlulariList.length > 0) {
        $('#select-planliBakim-operators').empty();
        bakimSorumlulariList.map((element) => {
            $('#select-planliBakim-operators').append(`
<option value=${element.sorumluId}>${element.bakimSorumlusu}</option>`);
        })
    }
    matchedModel = planliBakimList.filter((e) => {
        return bakimId === e.Bakim_ID;
    });

    if (matchedModel.length > 0) {
        matchedModel = matchedModel[0];
        $('#inp-planliBakim-machineNo').val(`${machineNo}  **  ${machine_Id}`);
        $('#textArea-planliBakim-yapilan').val(matchedModel.YapilanIslem);
    }
});
//#endregion
$('#btn-planliBakim-reset').click(e => {
    e.preventDefault();
    requestQueryForPlanliBakim.machineNo = "";
    requestQueryForPlanliBakim.pageSize = 6;
    requestQueryForPlanliBakim.pageNumber = 1;
    $('#select-planliBakim-selectRowCount').val(6);
    $(Inputs.planliBakim_machineNo).val('');
    $('.bakimArizaCard').css('opacity', '0').fadeIn();
    GetAllPlanliBakimAJjxCall();
})


//#Submit bakim girişi
$('#btn-planliBakim-submit').click((event) => {
    event.preventDefault();
    let machineNo = $('#inp-planliBakim-machineNo').val();
    let tarih = $('#inp-planliBakim-tarih').val();
    let baslamaSaat = $('#inp-planliBakim-baslamaSaat').val();
    let bitisSaat = $('#inp-planliBakim-bitisSaat').val();
    let operator = $('#select-planliBakim-operators').val();
    let planlanan = $('#textArea-planliBakim-yapilan').val();
    let period = $('#select-planliBakim-period').val();
    if (tarih === '' ||
        machineNo === '' ||
        operator === null ||
        planlanan === '' ||
        period === '' ||
        baslamaSaat === '' ||
        bitisSaat===''
    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 5000
        });
    }
    else if (planliBakimModel.Bakim_ID === null) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tablodan bir kayit seçmeniz gerekiyor',
            timer: 5000
        });
    }
    else {
        planliBakimModel.tarih = tarih;
        planliBakimModel.bakimYapan = parseInt(operator[0]);
        planliBakimModel.yapilanIslem = planlanan;
        planliBakimModel.periodu = parseInt(period);
        planliBakimModel.baslamaSaat = baslamaSaat;
        planliBakimModel.bitisSaat = bitisSaat;
        planliBakimModel.planananBakimici = parseInt(matchedModel.planananBakimici);
        planliBakimModel.PlanlananIslem = matchedModel.PlanlananIslem;
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.UpdatePlanliBakim,
            data: JSON.stringify(planliBakimModel),
            success: (message) => {
                HideLoader();
                if (message === "done") {
                    GetAllPlanliBakimAJjxCall();
                    GetAllPlanliBakimCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Yeni  planlanan Bakım  Başarıyle Eklendi',
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
        $('#inp-planliBakim-tarih').val('');
        $("#select-planliBakim-operators").val(null).trigger("change");
        $('#inp-planliBakim-machineNo').val('');
        $('#textArea-planliBakim-planlanan').val('');
        $('#select-planliBakim-period').val('');
        $('#select-planliBakim-baslamaSaat').val('');
        $('#select-planliBakim-bitisSaat').val('');
        $('.bakimArizaCard').css('opacity', '0').fadeIn();
    };
});
//#endregion










