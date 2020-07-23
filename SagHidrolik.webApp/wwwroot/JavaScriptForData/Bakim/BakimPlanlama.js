$(function () {

    let u = BaseUrl + "Home/BakimPlanlama";
    if (window.location.href === u) {
        GetAllMachineInBakimPlanlamaAjaxCall();
        GetAllMachineCountInBakimPlanlama();
        requestQueryForBakimSorumlu.pageNumber = 1;
        requestQueryForBakimSorumlu.pageSize = 100000;
        GetAllBakimSorumlulariAjaxCall(false);
        $("#inp-bakimPlanlama-tarih").datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $("#inp-bakimPlanlama-tarih").val(today);
        $(".limitedNumbSelect2").select2({
            maximumSelectionLength: 1,
            placeholder: "Seçiniz"
        })
    }
});

let requestQueryForBakimPlanlama = {
    pageNumber: 1,
    pageSize: 6,
    machineNo: ""
};

let bakimPlanlamaModel = {
    machineId: null,
    plananaBakimici: null,
    plananIslemler: "",
    tarih: "",
    periodu: null,
}


// #region Ajax call ,Create Table
function GetAllMachineInBakimPlanlamaAjaxCall() {
    $(TablesId.bakimPlanlama).empty();
    requestQueryForBakimPlanlama.machineNo = $(Inputs.bakimPlanlama_machineNo).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForBakimPlanlama),
        url: HttpUrls.BakimAriza_GetAllMachines,
        success: (list) => {
            if (list.length !== 0) {
                $(recordsNotFound.bakimPlanlama).css('display', 'none');
                console.log('ozet', list)
                CreateBakimPlanlamaTable(list, TablesId.bakimPlanlama);
            }
            else {
                $(`${recordsNotFound.bakimPlanlama} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.bakimPlanlama).css('display', 'block');
                HideLoader();
            }
        }
    });
}

function CreateBakimPlanlamaTable(list, tableId) {
    $(tableId).empty();
    let status = '';
    list.map((element, index) => {
        $(tableId).append(`
<tr data-id="${element.machine_Id}" data-machinNo="${element.machine_no}">
  <td>${element.machine_no}</td>
    <td>${element.machine_Name}</td>
    <td>${element.model} </td>
    <td>${element.bolum}</td>
    <td>${element.producer ? element.producer : ""}</td>
             </tr>
`);
    });
    HideLoader();
}
$(Inputs.bakimPlanlama_machineNo).keyup(function () {
    clearTimeout(timer);
    requestQueryForBakimPlanlama.pageNumber = 1;
    $('#num-bakimPlanlama-pageNumber').text(requestQueryForBakimPlanlama.pageNumber);
    timer = setTimeout(GetAllMachineInBakimPlanlamaAjaxCall, typingInterval);
});
//#endregion 


//#region Next-Previous Hanldler
$(PreviousButtons.bakimPlanlama).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForBakimPlanlama.pageNumber > 1) requestQueryForBakimPlanlama.pageNumber -= 1;
    $('#num-bakimPlanlama-pageNumber').text(requestQueryForBakimPlanlama.pageNumber);
    GetAllMachineInBakimPlanlamaAjaxCall();
});
$(NextButtons.bakimPlanlama).on('click', (event) => {
    event.preventDefault();
    requestQueryForBakimPlanlama.pageNumber += 1;
    $('#num-bakimPlanlama-pageNumber').text(requestQueryForBakimPlanlama.pageNumber);
    GetAllMachineInBakimPlanlamaAjaxCall();
});
//#endregion

// #region selects Row Count
$('#select-bakimPlanlama-selectRowCount').on('change', (e) => {
    e.preventDefault();
    requestQueryForBakimPlanlama.pageNumber = 1;
    $('#num-bakimPlanlama-pageNumber').text(requestQueryForBakimPlanlama.pageNumber);
    requestQueryForBakimPlanlama.pageSize = parseInt($('#select-bakimPlanlama-selectRowCount').val());
    GetAllMachineInBakimPlanlamaAjaxCall();
})
function GetAllMachineCountInBakimPlanlama() {
    $('#select-bakimPlanlama-selectRowCount').empty();
    $.getJSON(`${HttpUrls.GetAllMachineCount}`, function (num) {
        $('#select-bakimPlanlama-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="${num}">(${num}) All Records</option>

`);
        $('#span-bakimPlanlama-rowCount').text(num);

    })
}
//#endregion


//#region select Table Row And Get Bakim Kayit
$(TablesId.bakimPlanlama).on('click', 'tr', function () {
    $('.bakimArizaCard').css('opacity', '1').fadeIn();
    let machine_Id = parseInt($(this).data('id'));
    let machineNo = $(this).data('machinno');
    $('#inp-bakimPlanlama-machineNo').val(`${machineNo}  **  ${machine_Id}`);
    bakimPlanlamaModel.machineId = parseInt(machine_Id);
    if (bakimSorumlulariList.length > 0) {
        $('#select-bakimPlanlama-operators').empty();
        bakimSorumlulariList.map((element) => {
            $('#select-bakimPlanlama-operators').append(`
<option value=${element.sorumluId}>${element.bakimSorumlusu}</option>`);
        })
    }
});
//#endregion
$('#btn-bakimPlanlama-reset').click(e => {
    e.preventDefault();
    requestQueryForBakimPlanlama.machineNo = "";
    requestQueryForBakimPlanlama.pageSize = 6;
    requestQueryForBakimPlanlama.pageNumber = 1;
    $('#select-bakimPlanlama-selectRowCount').val(6);
    $(Inputs.bakimPlanlama_machineNo).val('');
    $('.bakimArizaCard').css('opacity', '0').fadeIn();
    GetAllMachineInBakimPlanlamaAjaxCall();
})


//#Submit bakim girişi

$('#btn-bakimPlanlama-submit').click((event) => {
    event.preventDefault();
    let machineNo = $('#inp-bakimPlanlama-machineNo').val();
    let tarih = $('#inp-bakimPlanlama-tarih').val();
    let operator = $('#select-bakimPlanlama-operators').val();
    let planlanan = $('#textArea-bakimPlanlama-planlanan').val();
    let period = $('#select-bakimPlanlama-period').val();
    console.log(operator);
    if (tarih === '' ||
        machineNo === '' ||
        operator === null ||
        planlanan === '' ||
        period===''
    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 5000
        });
    }
    else if (bakimPlanlamaModel.machineId === null) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tablodan bir kayit seçmeniz gerekiyor',
            timer: 5000
        });
    }
    else {
  
        bakimPlanlamaModel.tarih = tarih;
        bakimPlanlamaModel.plananaBakimici = parseInt(operator[0]);
        bakimPlanlamaModel.plananIslemler = planlanan;
        bakimPlanlamaModel.periodu = parseInt(period);

        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.insertIntoBakimPlanlama,
            data: JSON.stringify(bakimPlanlamaModel),
            success: (message) => {
                HideLoader();
                if (message === "done") {
                    GetAllMachineInBakimPlanlamaAjaxCall();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Yeni  planlanan Bakım  Başarıyle Eklendi',
                        type: 'success',
                        timer: 5000
                    });
                }
                else if(message === 'exist')
                Swal.fire({
                    title: 'Bulundu!',
                    text: 'Bu Makine için bakım  Planlanmış',
                    type: 'warning',
                    timer: 5000
                });
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
        $('#inp-bakimPlanlama-tarih').val('');
        $("#select-bakimPlanlama-operators").val(null).trigger("change");
        $('#inp-bakimPlanlama-machineNo').val('');
        $('#textArea-bakimPlanlama-planlanan').val('');
        $('#select-bakimPlanlama-period').val('');
        $('.bakimArizaCard').css('opacity', '0').fadeIn();

    };
});
//#endregion










