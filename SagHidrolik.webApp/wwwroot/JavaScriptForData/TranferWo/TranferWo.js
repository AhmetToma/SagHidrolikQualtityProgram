$(function () {

    let b = BaseUrl + "Home/TransferWoToSystem";
    if (window.location.href === b) {
        GetTranferWoAjaxCall();
        GetTranferWoCount();
    }
});

let requestQuerytranferWo = {
    pageNumber: 1,
    pageSize: 6,
    Stk: "",
};

// #region Ajax Call And create  table
function GetTranferWoAjaxCall() {
    requestQuerytranferWo.Stk = $(Inputs.tranferWo_searchStk).val();
    ShowLoader();
    $(TablesId.tranferWo).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProductionOrdersTransfer,
        data: JSON.stringify(requestQuerytranferWo),
        success: (list) => {
            if (list.length !== 0) {
                $('#recordNotFoundDiv_tranferWo').css('display', 'none');
                console.log('Reprot', list);
             CreateTranferWoTable(list, TablesId.tranferWo);
            }
            else {
                $(`#recordNotFoundDiv_tranferWo h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $('#recordNotFoundDiv_tranferWo').css('display', 'block');
                HideLoader();
            }
        }
    });
};
function CreateTranferWoTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        element.stk ? element.stk = element.stk : element.stk = "";
        element.qty ? element.stk = element.qty : element.qty = "";
        element.issueDate ? element.issueDate = element.issueDate : element.issueDate = "";
        element.requireDate ? element.requireDate = element.requireDate : element.requireDate = "";
        element.remark ? element.remark = element.remark : element.remark = "";
        element.control ? element.control = element.control : element.control = "";
            $(tableId).append(`
<tr >
  <td>${element.stk} </td>
  <td>${element.qty} </td>
  <td>${element.issueDate.slice(0,-11)} </td>
  <td>${element.requireDate.slice(0, -11)} </td>
  <td>${element.remark} </td>
  <td>${element.control} </td>
  <td onclick="DeleteFromTransferWo('${element.partNo}','${element.stk}')"><i  class="fas fa-trash-alt fa-2x text-danger"></i></td>
             </tr>
`);
    });
    HideLoader();
}
function GetTranferWoCount() {

    $('#select-tranferWo-selectRowCount').empty();
    $.getJSON(`${HttpUrls.GetprocutionOrdersTranferCount}`, function (num) {
        $('#select-tranferWo-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="${num}">(${num}) All Records</option>

`);
        $('#span-tranferWo-rowCount').text(num);

    })

}

$('#select-tranferWo-selectRowCount').on('change', () => {
    requestQuerytranferWo.pageSize = parseInt($('#select-tranferWo-selectRowCount').val());
    requestQuerytranferWo.pageNumber = 1;
    $('#num-tranferWo-pageNumber').text(requestQuerytranferWo.pageNumber);
    GetTranferWoAjaxCall();
});
//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.tranferWo).on('click', (event) => {
    event.preventDefault();
    if (requestQuerytranferWo.pageNumber > 1) requestQuerytranferWo.pageNumber -= 1;
    $('#num-tranferWo-pageNumber').text(requestQuerytranferWo.pageNumber);
    GetTranferWoAjaxCall();
});
$(NextButtons.tranferWo).on('click', (event) => {
    event.preventDefault();
    requestQuerytranferWo.pageNumber += 1;
    $('#num-tranferWo-pageNumber').text(requestQuerytranferWo.pageNumber);
    GetTranferWoAjaxCall();
});
//#endregion
// #region search

$(Inputs.tranferWo_searchStk).keyup(function () {

    clearTimeout(timer);
    requestQuerytranferWo.pageNumber = 1;
    $('#num-tranferWo-pageNumber').text(requestQuerytranferWo.pageNumber);
    timer = setTimeout(GetTranferWoAjaxCall, doneTypingInterval);
});


// #endregion 
// #region reset 
$('#btn-tranferWo-reset').click((event) => {
    event.preventDefault();
    $(Inputs.tranferWo_searchStk).val('');
    requestQuerytranferWo.Stk = '';
    requestQuerytranferWo.pageNumber = 1;
    requestQuerytranferWo.pageSize = 6;
    $('#select-tranferWo-selectRowCount').val('6');
    $('#num-tranferWo-pageNumber').text(requestQuerytranferWo.pageNumber);
    GetTranferWoAjaxCall();
});

//#endregion


//#region  delete
function DeleteFromTransferWo(partNo,stk) {
    Swal.fire({
        title: `${stk}`,
        text: ` stk :${stk} will delete? `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            ShowLoader();
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.DeleteFromTranferWo + partNo,
                success: (message) => {
                    HideLoader();
                    Swal.fire({
                        type: 'success',
                        title: "Done!",
                        text: `${stk} ${message}`,
                        timer: 2000
                    });
                    GetTranferWoAjaxCall();
                    GetTranferWoCount();
                }
            });
        }
    })
}

$('#btn-tranferWo-deleteAll').click((e) => {
    e.preventDefault();

    Swal.fire({
        title: `All Records`,
        text: `All Records will delete? `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            ShowLoader();
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.DeleteAllTranferWo,
                success: (message) => {
                    HideLoader();
                    Swal.fire({
                        type: 'success',
                        title: "Done!",
                        text: `${message}`,
                        timer: 2000
                    });
                    GetTranferWoAjaxCall();
                    GetTranferWoCount();
                }
            });
        }
    })
})

//#endregion


//#region Tranfer 
$('#btn-tranferWo-addAndTransfer').click((e) => {
    e.preventDefault();
    Swal.fire({
        title: `Transfer And Clear`,
        text: `Are you Sure? `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
    }).then((result) => {
        if (result.value) {
            ShowLoader();
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.TrnasferToSystem,
                success: (message) => {
                    HideLoader();
                    Swal.fire({
                        type: 'success',
                        title: "Done!",
                        text: `${message}`,
                        timer: 3000
                    });
                    GetTranferWoAjaxCall();
                    GetTranferWoCount();
                }
            });
        }
    })
})
//#endregion
