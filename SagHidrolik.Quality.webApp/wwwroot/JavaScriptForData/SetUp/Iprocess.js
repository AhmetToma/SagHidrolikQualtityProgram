$(function () {
    let dataUrl = "Home/SetUp";
    let BakimArizaUrl = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === BakimArizaUrl || window.location.href === serverUrl) {
       GetAllIprocessAjaxCall();
        GetAllIProcessCount();
    }
});
let requestQueryForIprocoss= {
    pageSize: 6,
    pageNumber: 1
};
let IprocessModel = {
    pR_ID:0 ,
    process: "",
    desc:""
   
};
let IprocessList = [];
// #region ajaxcall ,create table ,records count  
function GetAllIprocessAjaxCall() {
    if (requestQueryForIprocoss.pageNumber === 1) {
        disableButton(PreviousButtons.Iprocess);
        ActiveButton(NextButtons.Iprocess);
    }
    else {
        ActiveButton(PreviousButtons.Iprocess);
        ActiveButton(NextButtons.Iprocess);
    }
    $(TablesId.Iprocess).empty();
    $(`${pageNumbers.Iprocess}`).text(requestQueryForIprocoss.pageNumber);
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllIprocess,
        data: JSON.stringify(requestQueryForIprocoss),
        success: (list) => {
            IprocessList = list;
            console.log(list);
            if (list.length !== 0) {

                $(`${recordsNotFound.Iprocess}`).css('display', 'none');
                CreateIprocessTable(list, TablesId.Iprocess);
            }
            else {
                disableButton(NextButtons.Iprocess);
                $(`${recordsNotFound.Iprocess}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateIprocessTable(list, tableId) {
    $(tableId).empty();
    let desc = "";

    list.map((element, index) => {
        element.desc ? desc = element.desc : desc = "";
        $(tableId).append(`
<tr >
  <td>${element.pR_ID}</td>
    <td>${element.process}</td>
    <td>${desc}</td>
    <td><i onclick="editIprocess(${element.pR_ID})" class="fa fa-2x fa-pencil text-primary"  aria-hidden="true"></td>
 <td><i onclick="deleteIprocess(${element.pR_ID},'${element.process}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}
function GetAllIProcessCount() {
    $('#selectRowCount-Iprocess').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllIprocessCount,
        success: (number) => {
            $('#IprocessTableCount').text(number);
            $('#selectRowCount-Iprocess').append(`
<option value="4">4</option>
<option value="6" selected >6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);
        }
    });
}
$('#selectRowCount-Iprocess').on('change', () => {
    let selectedRowCount = $("#selectRowCount-Iprocess option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    requestQueryForIprocoss.pageSize = selectedRowCount;
    requestQueryForIprocoss.pageNumber = 1;
    GetAllIprocessAjaxCall();
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.Iprocess).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForIprocoss.pageNumber > 1) requestQueryForIprocoss.pageNumber -= 1;
    $(`${pageNumbers.operator}`).text(requestQueryForIprocoss.pageNumber);
    GetAllIprocessAjaxCall();
});
$(NextButtons.Iprocess).on('click', (event) => {
    event.preventDefault();
    requestQueryForIprocoss.pageNumber += 1;
    $(`${pageNumbers.operator}`).text(requestQueryForIprocoss.pageNumber);
    GetAllIprocessAjaxCall();
});
//#endregion


//#region Add New operator


$(Buttons.Iprocess_Add).click((event) => {
    $(Models.Iprocess_add).modal('show');
});
$(Buttons.Iprocess_confirmAdd).click((event) => {
    if ($(Inputs.IProcess_name).val() === '' || $(Inputs.IProcess_des).val() === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500
        });
    }
    else {
        IprocessModel.process = $(Inputs.IProcess_name).val();
        IprocessModel.desc = $(Inputs.IProcess_des).val();

        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddIprocess,
            data: JSON.stringify(IprocessModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetAllIprocessAjaxCall();
                    GetAllIProcessCount();
                    Swal.fire({
                        type: 'success',
                        title: 'Başarılı!',
                        text: 'yeni process Başarı ile eklendi',
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Beklenmeyen bir hata oluştu',
                        timer: 1500
                    });
                }
            }
        });

        $(Models.Iprocess_add).modal('hide');
        $(Inputs.IProcess_des).val('');
        $(Inputs.IProcess_name).val('');
    }
});

//#endregion

// #region delete Department
function deleteIprocess(IprocessId,processName) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${processName}' silenecek!`,
        text: `'${processName}' silmek iseter misiniz?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil !',
        cancelButtonText: 'Hayır , silme!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "GET",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.DeleteIprocess + IprocessId,
                success: (num) => {
                    if (num !== 0) {
                        GetAllIprocessAjaxCall();
                        GetAllIProcessCount();
                        Swal.fire({
                            title: 'Başarılı!',
                            text: 'process Başarı ile Silendi',
                            type: 'success',
                            timer: 1500

                        });
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Beklenmeyen bir hata oluştu',
                            timer: 1500
                        });
                    }
                }

            });
        }

    });
}
//#endregion

//#region Edit Department

function editIprocess(IprocessId) {
    let match = IprocessList.filter((Element) => {
        return IprocessId == Element.pR_ID;
    });
    match = match[0];
    console.log(match);
    $(Models.Iprocess_edit).modal('show');
    $(Inputs.IProcess_name_edt).val(match.process);
    $(Inputs.IProcess_des_edt).val(match.desc);
    IprocessModel.pR_ID = match.pR_ID;
}

$(Buttons.Iprocess_confirmEdit).click((event) => {
    event.preventDefault();
    if ($(Inputs.IProcess_name_edt).val() === '' || $(Inputs.IProcess_des_edt).val() === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Tüm Inputlar Doldurmanız Gerekiyor',
            timer: 1500

        });
    }
    else {
        IprocessModel.process = $(Inputs.IProcess_name_edt).val();
        IprocessModel.desc = $(Inputs.IProcess_des_edt).val();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.UpdateIprocess,
            data: JSON.stringify(IprocessModel),
            success: (num) => {
                HideLoader();
                if (num !== 0) {
                    GetAllIprocessAjaxCall();
                    GetAllIProcessCount();
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'process Başarı ile düzeltildi',
                        type: 'success',
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Beklenmeyen bir hata oluştu',
                        timer: 1500
                    });
                }
            }
        });
        $(Models.Iprocess_edit).modal('hide');
        $(Inputs.IProcess_name_edt).val('');
        $(Inputs.IProcess_des_edt).val('');
    }
});
//#endregion




