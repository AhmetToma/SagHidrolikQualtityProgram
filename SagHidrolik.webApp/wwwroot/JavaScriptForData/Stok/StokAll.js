$(function () {

    let b = BaseUrl + "Home/StokAll";
    if (window.location.href === b) {
        GetStokAllAjaxCall();
        GetStokAllCount();

    }
});
let requestQueryForStokAll = {
    pageNumber: 1,
    pageSize: 6,
    Stk: "",
};

// #region Ajax Call And create  table
function GetStokAllAjaxCall() {
    if (requestQueryForStokAll.pageNumber === 1) {
        disableButton(PreviousButtons.stokAll);
        ActiveButton(NextButtons.stokAll);
    }
    else {
        ActiveButton(PreviousButtons.stokAll);
        ActiveButton(NextButtons.stokAll);
    }
    $(TablesId.stokAll).empty();
    $(`${pageNumbers.stokAll}`).text(requestQueryForStokAll.pageNumber);
    requestQueryForStokAll.Stk = $(Inputs.stokAll_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetStokAll,
        data: JSON.stringify(requestQueryForStokAll),
        success: (list) => {
            //  calimTypeList = list;
            console.log(list);
            if (list.length !== 0) {
                $(`${recordsNotFound.stokAll}`).css('display', 'none');
                CreateStokAllTable(list, TablesId.stokAll, true);
            }
            else {
                disableButton(NextButtons.stokAll);
                $(`${recordsNotFound.stokAll}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateStokAllTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr id="t${index}" >

    <td>${element.stk}</td>
    <td>${element.sta} </td>
    <td>${element.tur}</td>
    <td>${element.totalStok}</td>
             </tr>
`);
    });
    HideLoader();
}


function GetStokAllCount() {
    $('#select-stokAll-selectRowCount').empty();
    $.getJSON(`${HttpUrls.GetStokAllCount}`, function (num) {
        $('#select-stokAll-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="${num}">(${num}) All Records</option>

`);
        $('#span-stokAll-rowCount').text(num)
    })
}

$('#select-stokAll-selectRowCount').on('change', () => {
    requestQueryForStokAll.pageSize = parseInt($('#select-stokAll-selectRowCount').val());
    requestQueryForStokAll.pageNumber = 1;
    $('#num-stokAll-pageNumber').text(requestQueryForStokAll.pageNumber);
    GetStokAllAjaxCall();
});
//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.stokAll).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForStokAll.pageNumber > 1) requestQueryForStokAll.pageNumber -= 1;
    $('#num-stokAll-pageNumber').text(requestQueryForStokAll.pageNumber);
    GetStokAllAjaxCall();
});
$(NextButtons.stokAll).on('click', (event) => {
    event.preventDefault();
    requestQueryForStokAll.pageNumber += 1;
    $('#num-stokAll-pageNumber').text(requestQueryForStokAll.pageNumber);
    GetStokAllAjaxCall();
});
//#endregion
// #region search
let timer;
let typingInterval = 500;
$(Inputs.stokAll_searchStk).keyup(function () {
    clearTimeout(timer);
    if ($(Inputs.stokAll_searchStk).val()) {
        requestQueryForStokAll.pageNumber = 1;
        $('#num-stokAll-pageNumber').text(requestQueryForStokAll.pageNumber);
        timer = setTimeout(GetStokAllAjaxCall, typingInterval);
    }
});
//user is "finished typing," do something

// #endregion 
// #region reset 
$('#btn-stokAll-reset').click((event) => {
    event.preventDefault();
    $(Inputs.stokAll_searchStk).val('');
    requestQueryForStokAll.Stk = '';
    requestQueryForStokAll.pageNumber = 1;
    requestQueryForStokAll.pageSize = 6;
    $('#select-stokAll-selectRowCount').val('6');
    $('#num-stokAll-pageNumber').text(requestQueryForStokAll.pageNumber);
    GetStokAllAjaxCall();
});

//#endregion


