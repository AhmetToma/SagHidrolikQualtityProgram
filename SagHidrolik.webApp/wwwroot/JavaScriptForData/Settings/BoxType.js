$(function () {

    let b = BaseUrl + "Home/BoxType";
    if (window.location.href === b) {
        GetBoxTypeAjaxCall();
        GetBoxTypeCount();
    }
});
let requestQueryForBoxType = {
    pageNumber: 1,
    pageSize: 6,
    Stk: "",
};

let boxTypeList = [];
let boxTypeViwModel = {
    stk: "",
    sta: "",
    stR_3: "",
    stR_4: "",
    p_ID:"",
    tur:0
}

// #region Ajax Call And create  table
function GetBoxTypeAjaxCall() {
    if (requestQueryForBoxType.pageNumber === 1) {
        disableButton(PreviousButtons.boxType);
        ActiveButton(NextButtons.boxType);
    }
    else {
        ActiveButton(PreviousButtons.boxType);
        ActiveButton(NextButtons.boxType);
    }
    $(TablesId.boxType).empty();
    $(`${pageNumbers.boxType}`).text(requestQueryForBoxType.pageNumber);
    requestQueryForBoxType.Stk = $(Inputs.boxType_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetBoxType,
        data: JSON.stringify(requestQueryForBoxType),
        success: (list) => {
            if (list.length !== 0) {
                boxTypeList = list;
                $(`${recordsNotFound.boxType}`).css('display', 'none');
              CreateBoxTypeTable(list, TablesId.boxType, true);
            }
            else {
                disableButton(NextButtons.boxType);
                $(`${recordsNotFound.boxType}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateBoxTypeTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr id="t${index}" >

    <td>${element.stk}</td>
    <td>${element.sta} </td>
    <td>${element.stR_3}</td>
    <td>${element.stR_4}</td>
    <td>${element.tur}</td>
 <td><i onclick="editBoxType(${index})" class="fa fa-2x fa-edit  text-primary"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}


function GetBoxTypeCount() {
    $('#select-boxType-selectRowCount').empty();
    $.getJSON(`${HttpUrls.GetBoxTypeCount}`, function (num) {
        $('#select-boxType-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="${num}">(${num}) All Records</option>

`);
        $('#span-boxType-rowCount').text(num)
    })
}

$('#select-boxType-selectRowCount').on('change', () => {
    ShowLoader();
    requestQueryForBoxType.pageSize = parseInt($('#select-boxType-selectRowCount').val());
    requestQueryForBoxType.pageNumber = 1;
    $('#num-boxType-pageNumber').text(requestQueryForBoxType.pageNumber);
    GetBoxTypeAjaxCall();
});
//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.boxType).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForBoxType.pageNumber > 1) requestQueryForBoxType.pageNumber -= 1;
    $('#num-boxType-pageNumber').text(requestQueryForBoxType.pageNumber);
    GetBoxTypeAjaxCall();
});
$(NextButtons.boxType).on('click', (event) => {
    event.preventDefault();
    requestQueryForBoxType.pageNumber += 1;
    $('#num-boxType-pageNumber').text(requestQueryForBoxType.pageNumber);
    GetBoxTypeAjaxCall();
});
//#endregion
// #region search
$(Inputs.boxType_searchStk).keyup(function () {
    clearTimeout(timer);
        requestQueryForBoxType.pageNumber = 1;
        $('#num-boxType-pageNumber').text(requestQueryForBoxType.pageNumber);
        timer = setTimeout(GetBoxTypeAjaxCall, typingInterval);
 
});
//user is "finished typing," do something

// #endregion 



//#region Edit partNumber

function editBoxType(index) {
    let match = boxTypeList[index];
    console.log(match);
    $('#inp-boxType-str3-edit').val(match.stR_3);
    $('#inp-boxType-str4-edit').val(match.stR_4);
    $('#inp-boxType-tur-edit').val(match.tur);
    $(Models.boxType_edit).modal('show');
    boxTypeViwModel.p_ID = match.p_ID;
}


$('#btn-boxType-confirmEdit').click((event) => {
    event.preventDefault();
    let str3 = $('#inp-boxType-str3-edit').val();
    let str4 = $('#inp-boxType-str4-edit').val();
    let tur =  $('#inp-boxType-tur-edit').val();
    if (str3 === '' ||
        str4 === '' ||
     tur === ''
    ) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor'
        });
    }
    else {
        boxTypeViwModel.stR_3 = str3;
        boxTypeViwModel.stR_4 = str4;
        boxTypeViwModel.tur = parseInt(tur);
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.UpdateBoxType,
            data: JSON.stringify(boxTypeViwModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetBoxTypeAjaxCall();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'box type Başarı ile düzeltildi',
                        type: 'success',
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Beklenmeyen bir hata oluştu'
                    });
                }
            },
            error: () => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Beklenmeyen bir hata oluştu'
                });
            }
        });
        $(Models.boxType_edit).modal('hide');
    }
});
//#endregion
// #region reset 
$('#btn-boxType-reset').click((event) => {
    event.preventDefault();
    $(Inputs.boxType_searchStk).val('');
    requestQueryForBoxType.Stk = '';
    requestQueryForBoxType.pageNumber = 1;
    requestQueryForBoxType.pageSize = 6;
    $('#select-boxType-selectRowCount').val('6');
    $('#num-boxType-pageNumber').text(requestQueryForBoxType.pageNumber);
    GetBoxTypeAjaxCall();
});

//#endregion


