$(function () {

    let u = BaseUrl + "Home/BakimOzet";
    if (window.location.href === u) {
        GetAllMachineAjaxCall();
        GetAllMachineCount();
    }
});

let requestQueryForBakimOzeti = {
    pageNumber: 1,
    pageSize: 6,
    machineNo: ""
};


// #region Ajax call ,Create Table
function GetAllMachineAjaxCall() {
    $(TablesId.bakimOzeti).empty();
    requestQueryForBakimOzeti.machineNo = $(Inputs.bakimOzeti_machineNo).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForBakimOzeti),
        url: HttpUrls.BakimAriza_GetAllMachines,
        success: (list) => {
            if (list.length !== 0) {
                $(recordsNotFound.bakimOzeti).css('display', 'none');
                console.log('ozet', list)
                CreateBakimOzetiTable(list, TablesId.bakimOzeti);
            }
            else {
                $(`${recordsNotFound.bakimOzeti} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.bakimOzeti).css('display', 'block');
                HideLoader();
            }
        }
    });
}

function CreateBakimOzetiTable(list, tableId) {
    $(tableId).empty();
    let status = '';
    list.map((element, index) => {
        $(tableId).append(`
<tr data-id="${element.machine_Id}">
  <td>${element.machine_no}</td>
    <td>${element.machine_Name}</td>
    <td>${element.model} </td>
    <td>${element.bolum}</td>
    <td>${element.producer}</td>
             </tr>
`);
    });

    //<td><input style="width:20px;height: 93%;" type="checkbox" name='z' id="${element.productOrderId}" /></td>
    //$("input[type='checkbox'][name='z']").change((e) => {


    //    SelectRowInProductionStart(e.currentTarget.id);
    //})
    HideLoader();
}




$(Inputs.bakimOzeti_machineNo).keyup(function () {
    clearTimeout(timer);
    requestQueryForBakimOzeti.pageNumber = 1;
    $('#num-bakimOzeti-pageNumber').text(requestQueryForBakimOzeti.pageNumber);
    timer = setTimeout(GetAllMachineAjaxCall, typingInterval);
});
//#endregion 


//#region Next-Previous Hanldler
$(PreviousButtons.bakimOzeti).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForBakimOzeti.pageNumber > 1) requestQueryForBakimOzeti.pageNumber -= 1;
    $('#num-bakimOzeti-pageNumber').text(requestQueryForBakimOzeti.pageNumber);
    GetAllMachineAjaxCall();

});
$(NextButtons.bakimOzeti).on('click', (event) => {
    event.preventDefault();
    requestQueryForBakimOzeti.pageNumber += 1;
    $('#num-bakimOzeti-pageNumber').text(requestQueryForBakimOzeti.pageNumber);
    GetAllMachineAjaxCall();
});
//#endregion

// #region selects Row Count

$('#select-bakimOzeti-selectRowCount').on('change', (e) => {
    e.preventDefault();
    requestQueryForBakimOzeti.pageNumber = 1;
    $('#num-bakimOzeti-pageNumber').text(requestQueryForBakimOzeti.pageNumber);
    requestQueryForBakimOzeti.pageSize = parseInt($('#select-bakimOzeti-selectRowCount').val());
    GetAllMachineAjaxCall();
})


function GetAllMachineCount() {
    $('#select-bakimOzeti-selectRowCount').empty();
    $.getJSON(`${HttpUrls.GetAllMachineCount}`, function (num) {
            $('#select-bakimOzeti-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="${num}">(${num}) All Records</option>

`);
            $('#span-productionSummary-rowCount').text(num);

        })

  
}
//#endregion


//#region select Table Row And Get Bakim Kayit
$(TablesId.bakimOzeti).on('click', 'tr', function () {
    $('.bakimOzetiCard').css('opacity', '1').fadeIn();
    let machine_Id = parseInt($(this).data('id'));
    ShowLoader();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetBakimKayitByMakineID + machine_Id,
        success: (list) => {
            CreateBakimKayitOzeti(list, TablesId.BakimKayit)
        }
    });
});


function CreateBakimKayitOzeti(list, tableId) {
    $(tableId).empty();
    let status = '';
    list.map((element, index) => {
        $(tableId).append(`
<tr >
  <td>${element.Tarih}</td>
    <td>${element.BakimTipi}</td>
    <td>${element.BaslamaSaat} </td>
    <td>${element.BitisSaat}</td>
    <td>${element.ArizaTanimi}</td>
    <td>${element.YapilanIslem}</td>
             </tr>
`);
    });
    HideLoader();
}

//#endregion


$('#btn-bakimOzeti-reset').click(e => {
    e.preventDefault();
    requestQueryForBakimOzeti.machineNo = "";
    requestQueryForBakimOzeti.pageSize = 6;
    requestQueryForBakimOzeti.pageNumber = 1;
    $('#select-bakimOzeti-selectRowCount').val(6);
    $(Inputs.bakimOzeti_machineNo).val('');
    $('.bakimOzetiCard').css('opacity', '0').fadeIn();
    GetAllMachineAjaxCall();
})









