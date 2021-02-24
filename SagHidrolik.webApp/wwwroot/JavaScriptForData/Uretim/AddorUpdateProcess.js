$(function () {
    let dataUrl = "Home/AddOrUpdateProcess";
    let ur = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === ur || window.location.href === serverUrl) {
        SerachStokInAddOrUpdateProcess();
        GetProcessPlanning();
        $(".limitedNumbSelect2").select2({
            maximumSelectionLength: 1,
            placeholder: "Seçiniz"
        })
    }
});

let requestQueryForAddOrUpdateProcess = {
    pageNumber: 1,
    pageSize: 25,
    Stk: "",
    pid: ""
};
let processPlaningList = [];
let beforEditModel = {};
let afterEditModel = {};
let addModel = {
    PartNo_ID:""
};
//#region Search ,select from table ,get bom process
$(Inputs.addOrUpdateProcess_searchStk).keyup(function () {
    //  ResetUrunEtiketi();
    $('.addUpdateProcessSection').css('opacity', '0');
    clearTimeout(timer);
    timer = setTimeout(SerachStokInAddOrUpdateProcess, doneTypingInterval);
});
function SerachStokInAddOrUpdateProcess() {
    requestQueryForAddOrUpdateProcess.Stk = $(Inputs.addOrUpdateProcess_searchStk).val();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForAddOrUpdateProcess),
        url: HttpUrls.GetStokkenByStkListOnlypageSize,
        success: (list) => {
            creatStokgenTable(list, TablesId.addOrUpdateProcess_stkTable);
        }
    });
    ShowLoader();
}
let bomProcessList = [];
let _selectedStk = "";
$(TablesId.addOrUpdateProcess_stkTable).on('click', 'tr', function () {
    ShowLoader();
    let stk = $(this).data('id');
    let pId = $(this).data('p_id');
    $('.addUpdateProcessSection').css('opacity', '1');
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".alertProcessInOrderDetails").offset().top
    }, 500);
    typeof (stk) === 'string' ? stk = stk : stk = stk.toString();
    typeof (pId) === 'string' ? pId = pId : pId = pId.toString();
    afterEditModel.partNo_ID = pId;
    addModel.PartNo_ID = pId;
    _selectedStk = stk;
    requestQueryForAddOrUpdateProcess.Stk = stk;
    requestQueryForAddOrUpdateProcess.pid = pId;
    GetBomProccessInAddOrUpdateProcessAjaxCall();
    GetProductFileInAddOrUpdateProcess(pId);


});

function GetBomProccessInAddOrUpdateProcessAjaxCall() {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForAddOrUpdateProcess),
        url: HttpUrls.GetBomProccessInAddOrUpdateProcess,
        success: (list) => {
            bomProcessList = list;
            CreateBomProcessTableInAddOrUpdateProcess(list, TablesId.addOrUpdateProcess_bomProcessCurrent);

        }
    });
    HideLoader();
}
function CreateBomProcessTableInAddOrUpdateProcess(list, tablId) {
    $(tablId).empty();
    list.map((el, index) => {
        el.subPartNo ? el.subPartNo = el.subPartNo : el.subPartNo = '';
        el.processName ? el.processName = el.processName : el.processName = '';
        el.qty ? el.qty = el.qty : el.qty = '';
        el.quality ? el.quality = el.quality : el.quality = '';
        $(tablId).append(`
<tr>
<td>${el.orderNo}</td>
<td>${el.prosesAdi}</td>
<td>${el.processName}</td>
<td>${el.subPartNo}</td>
<td>${el.qty}</td>
<td>${el.quality}</td>
<td>mesuren</td>
   <td><i    onclick="EditBomProcess(${index})"  class="fas fa-edit fa-2x  text-primary"  aria-hidden="true"></td>
 <td><i  onclick="DeleteProcess(${index})" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>

</tr>
`)
    })
}
//#endregion


//# process Planing 
function GetProcessPlanning() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcessPlanning,
        success: (list) => {
            processPlaningList = list;
            $('#inp-addOrUpdateProcess-edit-subpartNo').empty();
            $('#inp-addOrUpdateProcess-edit-processAdi').empty();
            list.map(p => {
                $('#inp-addOrUpdateProcess-edit-subpartNo').append(`
<option value="${p.processNo}" >${p.processName}</option>
`)
                $('#inp-addOrUpdateProcess-edit-processAdi').append(`
<option value="${p.processNo}" >${p.prosesAdi}</option>
`)
            })

        }

    });
}
//#endregion


// #region reset  

$('#btn-addOrUpdateProcess-reset').click((event) => {
    event.preventDefault();
    bomProcessList = [];
    $(TablesId.addOrUpdateProcess_bomProcessNew).empty();
    $(TablesId.addOrUpdateProcess_bomProcessCurrent).empty();
    $(Inputs.addOrUpdateProcess_searchStk).val('');
    requestQueryForAddOrUpdateProcess.pid = '';
    requestQueryForAddOrUpdateProcess.Stk = '';
    SerachStokInAddOrUpdateProcess();
    $('.addUpdateProcessSection').css('opacity', '0');
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".container-AddUpdateProcess").offset().top
    }, 500);
})
//#endregion


// #region Product File
function GetProductFileInAddOrUpdateProcess(pid) {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetproductFile + pid,
        success: (file) => {
            if (file.length !== 0) {
                $("#btn-addOrUpdateProcess-dosya").removeAttr('href');
                $("#btn-addOrUpdateProcess-dosya").css({
                    'cursor': 'pointer',
                    'opacity': '1'
                });

                $('#btn-addOrUpdateProcess-dosya').attr('href', `${BaseUrl}StokGetData/OpenFileFromServer?filePath=${file[0].dosyaadi}`);
            }
            else {
                $("#btn-addOrUpdateProcess-dosya").removeAttr('href');
                $("#btn-addOrUpdateProcess-dosya").css({
                    'cursor': 'not-allowed',
                    'opacity': '0.5'
                });

            }
        }
    });
}
//#endregion




// #region Delete Process 
function DeleteProcess(index) {
    let matched = bomProcessList[index];
    if (matched !== null) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            type: `warning`,
            title: 'Bom Process Remove !',
            text: `Are you sure to remove this process?`,
            showCancelButton: true,
            confirmButtonText: 'Yes, Remove  !',
            cancelButtonText: 'No , cancell!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                CreateSummaryModel(requestQueryForAddOrUpdateProcess.Stk, matched, 'confirm Delete');
            }
        });
    }
}

// #endregion

//#region Edit 
function EditBomProcess(index) {
    let matched = bomProcessList[index];
    if (matched !== null) {
        beforEditModel = matched;
        $('#inp-addOrUpdateProcess-edit-orderNo').val(matched.orderNo);
        $('#inp-addOrUpdateProcess-edit-qty').val(matched.qty);
        $('#inp-addOrUpdateProcess-edit-quality').val(matched.quality);
        $('#inp-addOrUpdateProcess-edit-subpartNo').val(`${matched.processNo}`).trigger('change');
        $('#inp-addOrUpdateProcess-edit-processAdi').val(`${matched.processNo}`).trigger('change');
        $('#addOrUpdateProcess-editModel').modal('show');
    }
}
$('#btn-addOrUpdateProcess-edit-saveEdit').click((e) => {
    e.preventDefault();
    if ($('#inp-addOrUpdateProcess-edit-qty').val() === '' || afterEditModel.processNo === '') {
        Swal.fire({
            type: 'error',
            title: 'opps!',
            text: 'Tum inputlar doldurmaniz gerekiyor',
            timer: 2500
        });
    }
    else {
        afterEditModel.processNo = $("#inp-addOrUpdateProcess-edit-processAdi").val()[0];
        afterEditModel.qty = parseInt($('#inp-addOrUpdateProcess-edit-qty').val());
        afterEditModel.quality = $('#inp-addOrUpdateProcess-edit-quality').val();
        afterEditModel.orderNo = parseInt($('#inp-addOrUpdateProcess-edit-orderNo').val());
        if (afterEditModel.quality === beforEditModel.quality &&
            afterEditModel.qty === beforEditModel.qty &&
            afterEditModel.processNo === beforEditModel.processNo
        ) Swal.fire({
            type: 'error',
            title: 'opps!',
            text: 'there is no edited data ',
            timer: 3500
        });
        else {
            afterEditModel.processName = $('#inp-addOrUpdateProcess-edit-subpartNo').select2('data')[0].text;
            afterEditModel.prosesAdi = $('#inp-addOrUpdateProcess-edit-processAdi').select2('data')[0].text;
            CreateSummaryModel(_selectedStk, afterEditModel, 'confrim Edit');
            $('#addOrUpdateProcess-editModel').modal('hide');
        }
       
    }
})

// process name
$("#inp-addOrUpdateProcess-edit-subpartNo").select2()
    .on("select2:select", function (e) {
        let selected_element = $(e.currentTarget);
        let processNo = selected_element.val()[0];
        afterEditModel.processNo = processNo;
        $('#inp-addOrUpdateProcess-edit-processAdi').val(`${processNo}`).trigger('change');
 
    });
$('#inp-addOrUpdateProcess-edit-subpartNo').on("select2:unselecting", function (e) {
    afterEditModel.processNo = '';
    $('#inp-addOrUpdateProcess-edit-processAdi').val(``).trigger('change');
});


// proses adi
$("#inp-addOrUpdateProcess-edit-processAdi").select2()
    .on("select2:select", function (e) {
        let selected_element = $(e.currentTarget);
        let processNo = selected_element.val()[0];
        afterEditModel.processNo = processNo;
        $('#inp-addOrUpdateProcess-edit-subpartNo').val(`${processNo}`).trigger('change');
    
    });

$('#inp-addOrUpdateProcess-edit-processAdi').on("select2:unselecting", function (e) {
  
    afterEditModel.processNo = '';
    $('#inp-addOrUpdateProcess-edit-subpartNo').val(``).trigger('change');

});

//#endregion

//#region Add Process 
$('#btn-addOrUpdateProcess-addNewBomProcess').click((e) => {
    e.preventDefault();
    $('#inp-addOrUpdateProcess-add-subPartNo-processAdi').empty();
    $('#inp-addOrUpdateProcess-add-subPartNoNext-processAdi').empty();
    processPlaningList.map((p) => {
        $('#inp-addOrUpdateProcess-add-subPartNo-processAdi').append(`<option value="${p.processNo}" >${p.prosesAdi}</option>`);
        $('#inp-addOrUpdateProcess-add-subPartNoNext-processAdi').append(`<option value="${p.processNo}" >${p.prosesAdi}</option>`);
    })
    $(".limitedNumbSelect2").val(null).trigger("change");
    $('#addOrUpdateProcess-addModel').modal('show');

})



$('#btn-addOrUpdateProcess-add-confirmAdd').click((e) => {
    e.preventDefault();
    let qty = $('#inp-addOrUpdateProcess-add-qty').val();
    let quality = $('#inp-addOrUpdateProcess-add-quality').val();
   

    let subpartNo = $("#inp-addOrUpdateProcess-add-subPartNo-processAdi").val();
    let subpartNoNext = $("#inp-addOrUpdateProcess-add-subPartNoNext-processAdi").val();
   

    if (addModel.partNo_ID === '' || addModel.partNo_ID === null) Swal.fire({
        type: 'error',
        title: "you should selected STK",
        timer: 3000
    });
   else if (qty === "") Swal.fire({
        type: 'error',
        title: "you should enter Quantiy",
        timer: 3000
    });
    else if (subpartNo === null || subpartNoNext === null) Swal.fire({
        type: 'error',
        title: "you should enter sup part No and sup part No next",
        timer: 3000
    });
    else {
       let subpartNo = $("#inp-addOrUpdateProcess-add-subPartNo-processAdi").select2('data')[0].id;
        let subpartNoNext = $("#inp-addOrUpdateProcess-add-subPartNoNext-processAdi").select2('data')[0].id;

        let subPartNoName = $("#inp-addOrUpdateProcess-add-subPartNo-processAdi").select2('data')[0].text;
        let subpartNoNextName = $("#inp-addOrUpdateProcess-add-subPartNoNext-processAdi").select2('data')[0].text;
        
        addModel.qty = parseInt(qty);
        addModel.quality= quality;
        addModel.subPartNo= parseInt(subpartNo);
        addModel.subpartNoNext=parseInt(subpartNoNext);
        addModel.subPartNoName= subPartNoName;
        addModel.subpartNoNextName= subpartNoNextName;
        $('#addOrUpdateProcess-addModel').modal('hide');
        CreateSummaryModel(_selectedStk, addModel, 'confrim Add');
     
    }

})

//#endregion

//#region Summary 
function CreateSummaryModel(stk, model, type) {
    $('#addOrUpdateProcess-summary .modal-body').empty();
    if (type === "confirm Delete") {
        $('#addOrUpdateProcess-summary .modal-body').append(`
                <h4 style="color:#b13e5b">Order No :  <span style="color:black">${stk ? stk : ""}</span></h4>
                <h4 style="color:#b13e5b">Order No :  <span style="color:black">${model.orderNo ? model.orderNo : ""}</span></h4>
                <h4 style="color:#b13e5b">process Name :  <span style="color:black"> ${model.processName ? model.processName : ""} </span></h4>
                <h4 style="color:#b13e5b">proses Adi :  <span style="color:black">${model.prosesAdi ? model.prosesAdi : ""}</span></h4>
                <h4 style="color:#b13e5b">qty :  <span style="color:black">${model.qty ? model.qty : ""}</span></h4>
                <h4 style="color:#b13e5b">quality :  <span style="color:black">${model.quality ? model.quality : ""}</span></h4>
                <h4 style="color:#b13e5b">subPartNo :  <span style="color:black">${model.subPartNo ? model.subPartNo : ""}</span></h4>
`);
        $('#btn-addOrUpdateProcess-confirm').text(type);
        $('#addOrUpdateProcess-summary').modal('show');
    }


    if (type === "confrim Edit") {
        $('#addOrUpdateProcess-summary .modal-body').append(`
                <h4 style="color:#b13e5b">STK :  <span style="color:black">${stk}</span></h4>

                <h4 style="color:#b13e5b">Order No :  <span style="color:black">${model.orderNo}</span></h4>

                <h4 style="color:#b13e5b">process Name :  &nbsp;&nbsp <span style="color:black">${beforEditModel.processName}</span>    <i class="fa   fa-arrow-right text-danger"></i>     <i class="fa   fa-arrow-right text-danger"></i>   <span style="color:black">${afterEditModel.processName}</span>  </h4>

                <h4 style="color:#b13e5b">proses Adi :  &nbsp;&nbsp &nbsp;&nbsp <span style="color:black">${beforEditModel.prosesAdi}</span>   <i class="fa   fa-arrow-right text-danger"></i>    <i class="fa   fa-arrow-right text-danger"></i>     <span style="color:black">${afterEditModel.prosesAdi}</span>  </h4>

                <h4 style="color:#b13e5b">Qty :   &nbsp;&nbsp <span style="color:black">${beforEditModel.qty}</span>     <i class="fa   fa-arrow-right text-danger"></i>  <i class="fa   fa-arrow-right text-danger"></i>     <span style="color:black">${afterEditModel.qty}</span>  </h4>

                <h4 style="color:#b13e5b">Quality :  &nbsp;&nbsp; <span style="color:black">${beforEditModel.quality}</span>   <i class="fa   fa-arrow-right text-danger"></i>    <i class="fa   fa-arrow-right text-danger"></i>     <span style="color:black">${afterEditModel.quality}</span>  </h4>
`);
        $('#btn-addOrUpdateProcess-confirm').text(type);
        $('#addOrUpdateProcess-summary').modal('show');
    }

    if (type === "confrim Add") {
        
        $('#addOrUpdateProcess-summary .modal-body').append(`
                <h4 style="color:#b13e5b">STK  :  <span style="color:black">${stk ? stk : ""}</span></h4>
                <h4 style="color:#b13e5b">Sub Part No Adi :  <span style="color:black">${model.subPartNoName ? model.subPartNoName : ""}</span></h4>
                <h4 style="color:#b13e5b">qty :  <span style="color:black">${model.qty ? model.qty : ""}</span></h4>
                <h4 style="color:#b13e5b">quality :  <span style="color:black">${model.quality ? model.quality : ""}</span></h4>
                <h4 style="color:#b13e5b">subPartNo Next Adi :  <span style="color:black">${model.subpartNoNextName ? model.subpartNoNextName : ""}</span></h4>
`);
        $('#btn-addOrUpdateProcess-confirm').text(type);
        $('#addOrUpdateProcess-summary').modal('show');
    }
    $('#btn-addOrUpdateProcess-confirm').click(() => {
        ShowLoader();
        if (type === 'confirm Delete') {
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(model),
                url: HttpUrls.DeleteBomProcess,
                success: (message) => {
                    if (message === 'done') {
                        Swal.fire({
                            type: 'success',
                            title: 'Done!',
                            text: 'bom process has been deleted',
                            timer: 3500
                        });
                        GetBomProccessInAddOrUpdateProcessAjaxCall();
                    }
                       
                },
                error: () => {
                    Swal.fire({
                        type: 'error',
                        title: 'opps!',
                        text: 'Beklenmeyen bir hata oldu',
                        timer: 1500
                    });
                }
            });
            $('#addOrUpdateProcess-summary').modal('hide');
            $('#addOrUpdateProcess-summary .modal-body').empty();
        }
        if (type === 'confrim Edit') {
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(model),
                url: HttpUrls.UpdateBomProcess,
                success: (message) => {
                    if (message === 'done') {
                        Swal.fire({
                            type: 'success',
                            title: 'Done!',
                            text: 'bom process has been deleted',
                            timer: 3500
                        });
                        GetBomProccessInAddOrUpdateProcessAjaxCall();
                    }
                },
                error: () => {
                    Swal.fire({
                        type: 'error',
                        title: 'opps!',
                        text: 'Beklenmeyen bir hata oldu',
                        timer: 3500
                    });
                }
            });
            $('#addOrUpdateProcess-summary').modal('hide');
            $('#addOrUpdateProcess-summary .modal-body').empty();
        }

        if (type === 'confrim Add') {
            console.log(model);
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(model),
                url: HttpUrls.AddBomProcess,
                success: (message) => {
                    if (message === 'done') {
                        Swal.fire({
                            type: 'success',
                            title: 'Done!',
                            text: 'bom process has been deleted',
                            timer: 3500
                        });
                        GetBomProccessInAddOrUpdateProcessAjaxCall();
                    }
                    HideLoader();
                },
                error: () => {
                    Swal.fire({
                        type: 'error',
                        title: 'opps!',
                        text: 'Beklenmeyen bir hata oldu',
                        timer: 1500
                    });
                    HideLoader();
                }
            });
            $('#addOrUpdateProcess-summary').modal('hide');
            $('#addOrUpdateProcess-summary .modal-body').empty();
        }

    })




}
//#endregion



