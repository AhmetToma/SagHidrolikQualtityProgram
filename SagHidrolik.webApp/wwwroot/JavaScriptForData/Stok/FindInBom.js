$(function () {

    let b = BaseUrl + "Home/FindInBom";
    if (window.location.href === b) {
        GetAllFindInBomAjaxCall();
        GetAllFindInBomCount();

    }
});
let requestQueryForFindInBom = {
    pageNumber: 1,
    pageSize: 6,
    Stk: "",
};

// #region Ajax Call And create  table
function GetAllFindInBomAjaxCall() {
    if (requestQueryForFindInBom.pageNumber === 1) {
        disableButton(PreviousButtons.findInBom);
        ActiveButton(NextButtons.findInBom);
    }
    else {
        ActiveButton(PreviousButtons.findInBom);
        ActiveButton(NextButtons.findInBom);
    }


    requestQueryForFindInBom.Stk = $(Inputs.findInBom_searchStk).val();
    ShowLoader();
    $(TablesId.findInBom).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllFindInBom,
        data: JSON.stringify(requestQueryForFindInBom),
        success: (list) => {
            if (list.length !== 0) {
                $('#recordNotFoundDiv_findInBom').css('display', 'none');
                console.log('find',list);
                CreateFindInBomTable(list, TablesId.findInBom);
            }
            else {
                disableButton(NextButtons.findInBom);
                $(`#recordNotFoundDiv_findInBom h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $('#recordNotFoundDiv_findInBom').css('display', 'block');
                HideLoader();
            }
        }
    });
};
function CreateFindInBomTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr id="t${index}" >

    <td>${element.partNo}</td>
    <td>${element.sta}</td>
    <td>${element.material} </td>
    <td>${element.miktar}</td>
             </tr>
`);
    });
    HideLoader();
}


function GetAllFindInBomCount() {
    $('#select-findInBom-selectRowCount').empty();
    $.getJSON(`${HttpUrls.GetAllFindInBomCount}`, function (num) {
        $('#select-findInBom-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="${num}">(${num}) All Records</option>

`);
        $('#span-findInBom-rowCount').text(num)
    })
}

$('#select-findInBom-selectRowCount').on('change', () => {
    requestQueryForFindInBom.pageSize = parseInt($('#select-findInBom-selectRowCount').val());
    requestQueryForFindInBom.pageNumber = 1;
    $('#num-findInBom-pageNumber').text(requestQueryForFindInBom.pageNumber);
    GetAllFindInBomAjaxCall();
});
//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.findInBom).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForFindInBom.pageNumber > 1) requestQueryForFindInBom.pageNumber -= 1;
    $('#num-findInBom-pageNumber').text(requestQueryForFindInBom.pageNumber);
    GetAllFindInBomAjaxCall();
});
$(NextButtons.findInBom).on('click', (event) => {
    event.preventDefault();
    requestQueryForFindInBom.pageNumber += 1;
    $('#num-findInBom-pageNumber').text(requestQueryForFindInBom.pageNumber);
    GetAllFindInBomAjaxCall();
});
//#endregion
// #region search

$(Inputs.findInBom_searchStk).keyup(function () {
    clearTimeout(timer);
        requestQueryForFindInBom.pageNumber = 1;
    $('#num-findInBom-pageNumber').text(requestQueryForFindInBom.pageNumber);
    timer = setTimeout(GetAllFindInBomAjaxCall, doneTypingInterval);
   
});
//user is "finished typing," do something

// #endregion 
// #region reset 
$('#btn-findInBom-reset').click((event) => {
    event.preventDefault();
    $(Inputs.findInBom_searchStk).val('');
    requestQueryForFindInBom.Stk = '';
    requestQueryForFindInBom.pageNumber = 1;
    requestQueryForFindInBom.pageSize = 6;
    $('#select-findInBom-selectRowCount').val('6');
    $('#num-findInBom-pageNumber').text(requestQueryForFindInBom.pageNumber);
    GetAllFindInBomAjaxCall();
});

//#endregion