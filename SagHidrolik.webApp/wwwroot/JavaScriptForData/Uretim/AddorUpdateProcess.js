$(function () {
    let dataUrl = "Home/AddOrUpdateProcess";
    let ur = BaseUrl + dataUrl;
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === ur || window.location.href === serverUrl) {
        SerachStokInAddOrUpdateProcess();
    }
});

let requestQueryForAddOrUpdateProcess = {
    pageNumber: 1,
    pageSize: 10,
    Stk: "",
    pid:""
};

//#region Search ,select from table ,get bom process,bom Process Temp
$(Inputs.addOrUpdateProcess_searchStk).keyup(function () {
    //  ResetUrunEtiketi();
    $('.addUpdateProcessSection').css('opacity', '0');
    clearTimeout(timer);
    timer = setTimeout(SerachStokInAddOrUpdateProcess, doneTypingInterval);
});
function SerachStokInAddOrUpdateProcess() {
    requestQueryForAddOrUpdateProcess.Stk=$(Inputs.addOrUpdateProcess_searchStk).val();
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

$(TablesId.addOrUpdateProcess_stkTable).on('click', 'tr', function () {
    ShowLoader();
    var stk = $(this).data('id');
    var pId = $(this).data('p_id');
    console.log(stk, pId);
    $('.addUpdateProcessSection').css('opacity', '1');
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".toscroll").offset().top
    }, 500);

    requestQueryForAddOrUpdateProcess.Stk = stk;
    requestQueryForAddOrUpdateProcess.pid = pId;
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForAddOrUpdateProcess),
        url: HttpUrls.GetBomProccessInAddOrUpdateProcess,
        success: (list) => {
            console.log(list);
            bomProcessList = list;
            CreateBomProcessTableInAddOrUpdateProcess(list, TablesId.addOrUpdateProcess_bomProcessCurrent);
            GetBomProcessTemp();
            GetProductFileInAddOrUpdateProcess(pId);
        }
    });
    HideLoader();
});
function CreateBomProcessTableInAddOrUpdateProcess(list, tablId) {
    $(tablId).empty();
    console.log(list);
    list.map((el) => {
        el.subPartNo ? el.subPartNo = el.subPartNo : el.subPartNo = '';
        el.processName ? el.processName = el.processName : el.processName = '';
        el.qty ? el.qty = el.qty : el.qty = '';
        el.quality ? el.quality = el.quality : el.quality = '';
        $(tablId).append(`
<tr>
<td>${el.subPartNo}</td>
<td>${el.processName}</td>
<td>${el.qty}</td>
<td>${el.quality}</td>
<td>mesuren</td>

</tr>
`)
    })
}


function GetBomProcessTemp() {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForAddOrUpdateProcess),
        url: HttpUrls.GetBomProcessTemp,
        success: (list) => {
            CreateBomProcessTableInAddOrUpdateProcess(list, TablesId.addOrUpdateProcess_bomProcessNew);
        }
    });
}
//#endregion

// #region Button Hanlder 
$('#btn-addOrUpdateProcess-copy').click((event) => {
    event.preventDefault();
    ShowLoader();

    if (bomProcessList.length > 0) {
        $.ajax({
            type: "GET",
            url: HttpUrls.CopyToBomProcessTemp + requestQueryForAddOrUpdateProcess.pid,
            success: (num) => {
                CreateBomProcessTableInAddOrUpdateProcess(bomProcessList, TablesId.addOrUpdateProcess_bomProcessNew);
                HideLoader();
            },
            error: () => {
                Swal.fire({
                    type: 'error',
                    title: "Beklenmeyen Bir Hata oluştu",
                    timer: 2000
                });
            }
        });
    }
    else
        Swal.fire({
            type: 'error',
            title: "bu stk'a ait hiç bom process yoktur",
            timer: 2000
        });

    HideLoader();
})
$('#btn-addOrUpdateProcess-cleantable').click(() => {

    let rowCount = $(`${TablesId.addOrUpdateProcess_bomProcessNew} tr`).length;
    if (rowCount <= 0) Swal.fire({
        type: 'error',
        title: "new process zaten Boş",
        timer: 2000
    });
    else {
        ShowLoader();
        $.ajax({
            type: "GET",
            url: HttpUrls.DeleteFromBomProcessTemp + requestQueryForAddOrUpdateProcess.pid,
            success: (num) => {
                $(TablesId.addOrUpdateProcess_bomProcessNew).empty();
            },
            error: () => {
                Swal.fire({
                    type: 'error',
                    title: "Beklenmeyen Bir Hata oluştu",
                    timer: 2000
                });
            }
        });
        HideLoader();
    }
  
})

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

$('#btn-addOrUpdateProcess-save').click((event) => {
    event.preventDefault();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(requestQueryForAddOrUpdateProcess),
        url: HttpUrls.addUpdateProceecSave,
        success: (message) => {
            Swal.fire({
                type: 'success',
                title: message,
                timer: 2000
            });
            $(TablesId.addOrUpdateProcess_bomProcessNew).empty();
        }
    });
});

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
                    'opacity':'0.5'
                });

            }
        }
    });
}
//#endregion