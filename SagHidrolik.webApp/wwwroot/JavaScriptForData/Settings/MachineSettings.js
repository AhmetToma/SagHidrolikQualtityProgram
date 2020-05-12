$(function () {

    let b = BaseUrl + "Home/Machine";
    if (window.location.href === b) {
        GetMachineSettingsAjaxCall();
        GetMachineSettingsCount();
    }
});
let requestQueryForMachineSettings = {
    pageNumber: 1,
    pageSize: 6,
    machineNo: "",
    machineName:""
};

// #region Ajax Call And create  table
function GetMachineSettingsAjaxCall() {
    if (requestQueryForMachineSettings.pageNumber === 1) {
        disableButton(PreviousButtons.machineSettings);
        ActiveButton(NextButtons.machineSettings);
    }
    else {
        ActiveButton(PreviousButtons.machineSettings);
        ActiveButton(NextButtons.machineSettings);
    }
    $(TablesId.machineSettings).empty();
    $(`${pageNumbers.machineSettings}`).text(requestQueryForMachineSettings.pageNumber);
    requestQueryForMachineSettings.machineNo = $(Inputs.machineSettings_machineNo).val();
    requestQueryForMachineSettings.machineName = $(Inputs.machineSettings_machineName).val();
    console.log(requestQueryForMachineSettings);
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetMachineSettings,
        data: JSON.stringify(requestQueryForMachineSettings),
        success: (list) => {
            console.log(list);
            if (list.length !== 0) {
                $(`${recordsNotFound.machineSettings}`).css('display', 'none');
                CreateMachineSettingsTable(list, TablesId.machineSettings, true);
            }
            else {
                disableButton(NextButtons.machineSettings);
                $(`${recordsNotFound.machineSettings}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateMachineSettingsTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr id="t${index}" >
    <td>${element.machine_Id}</td>
    <td>${element.machine_no} </td>
    <td>${element.machine_Name} </td>
    <td>${element.model}</td>
    <td>${element.bolum}</td>
    <td>${element.producer}</td>
    <td>${element.yil}</td>
             </tr>
`);
    });
    HideLoader();
}


function GetMachineSettingsCount() {
    $('#select-machineSettings-selectRowCount').empty();
    $.getJSON(`${HttpUrls.GetMachineSettingsCount}`, function (num) {
        $('#select-machineSettings-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="${num}">(${num}) All Records</option>

`);
        $('#span-machineSettings-rowCount').text(num)
    })
}

$('#select-machineSettings-selectRowCount').on('change', () => {
    ShowLoader();
    requestQueryForMachineSettings.pageSize = parseInt($('#select-machineSettings-selectRowCount').val());
    requestQueryForMachineSettings.pageNumber = 1;
    $('#num-machineSettings-pageNumber').text(requestQueryForMachineSettings.pageNumber);
    GetMachineSettingsAjaxCall();
});
//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.machineSettings).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForMachineSettings.pageNumber > 1) requestQueryForMachineSettings.pageNumber -= 1;
    $('#num-machineSettings-pageNumber').text(requestQueryForMachineSettings.pageNumber);
    GetMachineSettingsAjaxCall();
});
$(NextButtons.machineSettings).on('click', (event) => {
    event.preventDefault();
    requestQueryForMachineSettings.pageNumber += 1;
    $('#num-machineSettings-pageNumber').text(requestQueryForMachineSettings.pageNumber);
    GetMachineSettingsAjaxCall();
});
//#endregion
// #region search
$(Inputs.machineSettings_machineNo).keyup(function () {
    clearTimeout(timer);
        requestQueryForMachineSettings.pageNumber = 1;
        $('#num-machineSettings-pageNumber').text(requestQueryForMachineSettings.pageNumber);
        timer = setTimeout(GetMachineSettingsAjaxCall, typingInterval);
   
});


$(Inputs.machineSettings_machineName).keyup(function () {
    clearTimeout(timer);
    requestQueryForMachineSettings.pageNumber = 1;
    $('#num-machineSettings-pageNumber').text(requestQueryForMachineSettings.pageNumber);
    timer = setTimeout(GetMachineSettingsAjaxCall, typingInterval);

});

// #endregion 
// #region reset 
$('#btn-machineSettings-resetSearch').click((event) => {
    event.preventDefault();
    $(Inputs.machineSettings_machineName).val('');
    $(Inputs.machineSettings_machineNo).val('');
    requestQueryForMachineSettings.pageNumber = 1;
    requestQueryForMachineSettings.pageSize = 6;
    $('#select-machineSettings-selectRowCount').val('6');
    $('#num-machineSettings-pageNumber').text(requestQueryForMachineSettings.pageNumber);
    GetMachineSettingsAjaxCall();
});

//#endregion

