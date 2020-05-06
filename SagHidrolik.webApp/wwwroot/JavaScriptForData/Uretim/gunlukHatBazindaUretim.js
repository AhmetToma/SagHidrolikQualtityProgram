$(function () {
    let gunlukHatBazindaUretiurl = BaseUrl + "Home/GunlukHatBazindUretim";
    if (window.location.href === gunlukHatBazindaUretiurl) {
        getAllProcessInGunlukHatBazindUretim();
        GetAllGunlukHatBazindUretimList();
    }
});
let requestQueryForGunlukHatBazindaUretim = {
    pageNumber: 1,
    pageSize: 10,
    Stk: "",
    machineNo: "",
    processAdi: ""
};

//#region select process
function getAllProcessInGunlukHatBazindUretim() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.getAllProcessInGunlukHatBazindUretim,
        success: (list) => {
            $('#select-gunlukHatBazindUretim-allProcess').empty();
            $('#select-gunlukHatBazindUretim-allProcess').append(`<option value="" selected>Seç...</option>`);
            list.map((element) => {
                $("#select-gunlukHatBazindUretim-allProcess").append(`<option value="${element.prosesAdi}">${element.prosesAdi}</option>`);
            });
        }
    });
}

$("#select-gunlukHatBazindUretim-allProcess").change(function () {
    let selectedProcessInGunlukUretim = $(this).children("option:selected").val();
    requestQueryForGunlukHatBazindaUretim.processAdi = selectedProcessInGunlukUretim;
    requestQueryForGunlukHatBazindaUretim.pageNumber = 1;
    $(pageNumbers.gunlukHatBazindaUretim).text(requestQueryForGunlukHatBazindaUretim.pageNumber);
    GetAllGunlukHatBazindUretimList();
});
//#endregion



// #region search
let gunlukUrHatBazindaypingTimer;
let gunlukUrHatBazindaTypingInterval = 500;
$(Inputs.gunlukHatBazindaUretim_searchMachineNo).keyup(function () {

    clearTimeout(gunlukUrHatBazindaypingTimer);
    if ($(Inputs.gunlukHatBazindaUretim_searchMachineNo).val()) {
        requestQueryForGunlukHatBazindaUretim.pageNumber = 1;
        $(pageNumbers.gunlukHatBazindaUretim).text(requestQueryForGunlukHatBazindaUretim.pageNumber);
        gunlukUrHatBazindaypingTimer = setTimeout(GetAllGunlukHatBazindUretimList, gunlukUrHatBazindaTypingInterval);
    }
    else if ($(Inputs.gunlukHatBazindaUretim_searchMachineNo).val() === '') {
        requestQueryForGunlukHatBazindaUretim.pageNumber = 1;
        $(pageNumbers.gunlukHatBazindaUretim).text(requestQueryForGunlukHatBazindaUretim.pageNumber);
        GetAllGunlukHatBazindUretimList();
    }
});

//#endregion

 //#region  next Preiious Handlers

$('#btn-gunlukHatBazindUretim-previous').on('click', (event) => {
    event.preventDefault();
    if (requestQueryForGunlukHatBazindaUretim.pageNumber > 1) requestQueryForGunlukHatBazindaUretim.pageNumber -= 1;
    $(pageNumbers.gunlukHatBazindaUretim).text(requestQueryForGunlukHatBazindaUretim.pageNumber);
    GetAllGunlukHatBazindUretimList();
});
$('#btn-gunlukHatBazindUretim-next').on('click', (event) => {
    event.preventDefault();
    requestQueryForGunlukHatBazindaUretim.pageNumber += 1;
    $(pageNumbers.gunlukHatBazindaUretim).text(requestQueryForGunlukHatBazindaUretim.pageNumber);
    GetAllGunlukHatBazindUretimList();
});
//#endregion



// #region ajax call  and create Table

function GetAllGunlukHatBazindUretimList() {
    if (requestQueryForGunlukHatBazindaUretim.pageNumber === 1) {
        disableButton('#btn-gunlukHatBazindUretim-previous');
        ActiveButton('#btn-gunlukHatBazindUretim-next');
    }
    else {
        ActiveButton('#btn-gunlukHatBazindUretim-previous');
        ActiveButton('#btn-gunlukHatBazindUretim-next');
    }

    requestQueryForGunlukHatBazindaUretim.machineNo = $(Inputs.gunlukHatBazindaUretim_searchMachineNo).val();
    console.log('inpVal', $(Inputs.gunlukHatBazindaUretim_searchMachineNo).val());
    console.log('reqMac',requestQueryForGunlukHatBazindaUretim.machineNo);

    $(TablesId.gunlukHatBazindaUretim).empty();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllGunlukHatBazindUretimList,
        data: JSON.stringify(requestQueryForGunlukHatBazindaUretim),
        success: (list) => {
            if (list.length > 0) {
                $(`${recordsNotFound.gunlukHatBazindaUretim}`).css('display', 'none');
                CreateGunlukHatBazindaUretimTable(list,TablesId.gunlukHatBazindaUretim);
            }
            else {
                disableButton('#btn-gunlukHatBazindUretim-next');
                $(`${recordsNotFound.gunlukHatBazindaUretim} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(`${recordsNotFound.gunlukHatBazindaUretim}`).css('display', 'block');
                $(pageNumbers.gunlukHatBazindaUretim).text(requestQueryForGunlukHatBazindaUretim.pageNumber);
                HideLoader();
            }
        }
    });
}
function CreateGunlukHatBazindaUretimTable(list, tableId) {
    console.log(list);
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr data-stk="${element.stk}" >
  <td>${element.stk}</td>
    <td>${element.total}</td>
    <td>${element.prosesAdi}</td>
    <td>${element.start_time}</td >
 <td>${element.finishTime}</td>
    <td>${element.operator_Name}</td>
    <td>${element.machine_no}</td>
             </tr>
`);
    });
    HideLoader();
}

//#endregion



//#region select Rows

$('#selectRowCount-gunlukHatBazindaUretim').on('change', () => {
    let selectedRowCount = $("#selectRowCount-gunlukHatBazindaUretim option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForGunlukHatBazindaUretim.pageSize = selectedRowCount;
    requestQueryForGunlukHatBazindaUretim.pageNumber = 1;
    console.log(requestQueryForGunlukHatBazindaUretim);
    console.log(selectedRowCount);
    GetAllGunlukHatBazindUretimList();
});
//#endregion

//#region Reset 
$('#btn-gunlukHatBazindUretim-reset').click((event) => {
    event.preventDefault();
    $("#select-gunlukHatBazindUretim-allProcess").val('');
    requestQueryForGunlukHatBazindaUretim.Stk = '';
    $(Inputs.gunlukHatBazindaUretim_searchMachineNo).val('');
    requestQueryForGunlukHatBazindaUretim.machineNo = '';
    requestQueryForGunlukHatBazindaUretim.processAdi= '';
    requestQueryForGunlukHatBazindaUretim.pageNumber = 1;
    $(pageNumbers.gunlukHatBazindaUretim).text(requestQueryForGunlukHatBazindaUretim.pageNumber);
    GetAllGunlukHatBazindUretimList();
});

//#endregion



