$(function () {

    let urtetimBaslaUrl = BaseUrl + "Home/UretimBasla";
    if (window.location.href === urtetimBaslaUrl) {
        GetProcessFlow();
        GetAktiveOperators();
        GetAktiveMachine();
    }
});
let  requestQueryForUretimBasla = {
    pageSize: 20,
    pageNumber: 1,
    stk: "",
    Pid: "",
    lotNo: "",
    processNo_ID:""
};

var uretimBaslaObject = {
    operator_ID: "",
    machine_Id: "",
    stk: "",
    lotNo: "",
    process: "",
    Flow_ID: "",
    processno_id: "",
    operatorName:""
};
// #region search

var typingTimer;
var doneTypingInterval = 500;
let urunNo = $("#inp-uretimBasla-searchUrunNo");
let lotNo = $("#inp-uretimBasla-searchlotNo");
urunNo.keyup(function () {
  
    requestQueryForUretimBasla.pageNumber = 1;
    $('#uretimBasla-pageNumner').text(requestQueryForUretimBasla.pageNumber);
    clearTimeout(typingTimer);
    if (urunNo.val()) {
        requestQueryForUretimBasla.pageNumber = 1;
        typingTimer = setTimeout(SearchInUretim, doneTypingInterval);
    }
    else if (urunNo.val() === '') {
        requestQueryForUretimBasla.pageNumber = 1;
        requestQueryForUretimBasla.stk = '';
        requestQueryForUretimBasla.lotNo = '';
        $('.card').css('opacity', '0').fadeIn();
        GetProcessFlow();
    }
});


lotNo.keyup(function () {
    requestQueryForUretimBasla.pageNumber = 1;
    $('#uretimBasla-pageNumner').text(requestQueryForUretimBasla.pageNumber);
    clearTimeout(typingTimer);
    if (lotNo.val()) {
        requestQueryForUretimBasla.pageNumber = 1;
        typingTimer = setTimeout(SearchInUretim, doneTypingInterval);
    }
    else if (lotNo.val() === '') {
        requestQueryForUretimBasla.pageNumber = 1;
        requestQueryForUretimBasla.stk = '';
        requestQueryForUretimBasla.lotNo = '';
        $('.card').css('opacity', '0').fadeIn();
        GetProcessFlow();
       
    }
});
//user is "finished typing," do something
function SearchInUretim() {

    $('.card').css('opacity', '0').fadeIn();
    requestQueryForUretimBasla.lotNo = lotNo.val();
    requestQueryForUretimBasla.stk = urunNo.val();
    GetProcessFlow();
}

// #endregion
// #region Paginantion

//  start paginantion

$('#previous-table-ProcessFlow').on('click', (event) => {
    event.preventDefault();
    if (requestQueryForUretimBasla.pageNumber > 1) requestQueryForUretimBasla.pageNumber -= 1;
    $('#uretimBasla-pageNumner').text(requestQueryForUretimBasla.pageNumber);
    GetProcessFlow();

});
$('#next-table-ProcessFlow').on('click', (event) => {
    event.preventDefault();
    requestQueryForUretimBasla.pageNumber += 1;
    $('#uretimBasla-pageNumner').text(requestQueryForUretimBasla.pageNumber);
    GetProcessFlow();
});

//  end paginantion

// #endregion Paginantion


//ajax call and creat data
function GetProcessFlow(pageNumber) {
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcessFLowInUretim,
        data: JSON.stringify(requestQueryForUretimBasla),
        success: (list) => {
            if (list.length > 0) {
                $(`${NotFoundRecordsId.uretimBasla}`).css('display', 'none');
                $('#table-uretimInUretim').empty();
                CreateUretimTableInUretim(list);
                console.log(list);
            }
            else {
                $(`${NotFoundRecordsId.uretimBasla} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(`${NotFoundRecordsId.uretimBasla}`).css('display', 'block');
                $('#table-uretimInUretim').empty();
                $('#uretimBasla-pageNumner').text(requestQueryForUretimBasla.pageNumber);
                HideLoader();
            }
           
        }
    });

}
function CreateUretimTableInUretim(list) {
    $('#table-uretimInUretim').empty();
    if (list !== null) list.map((element, index) => {


        element.prosesAdi ? element.prosesAdi = element.prosesAdi : element.prosesAdi = " ";
        element.lotNo ? element.lotNo = element.lotNo : element.lotNo = " ";
        element.miktar ? element.miktar = element.miktar : element.miktar = " ";
        element.require_Date ? element.require_Date = element.require_Date : element.require_Date = " ";
        $('#table-uretimInUretim').append(`
<tr data-stk="${element.stk}" data-lot="${element.lotNo}" data-process="${element.prosesAdi}" data-processNo_ID=${element.processNo_ID} data-flow_ID=${element.flow_ID}>
  <td>${element.stk}</td>
    <td>${element.lotNo}</td>
    <td>${element.prosesAdi} </td>
<td> ${element.miktar}</td>
    <td>${element.require_Date} </td>
             </tr>
`);
    });
    HideLoader();
}
function SendStkAndLot(stk, lot, process) {
    $('#uretimBasla-baslasin-urunLot').val(lot);
    $('#uretimBasla-baslasin-urunKod').val(stk);
    $('#uretimBasla-baslasin-process').val(process);
}
function GetAktiveOperators() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAktiveOperators,
        success: (list) => {
            $('#uretimBasla-activeOpertors').empty();
            console.log(HttpUrls.GetAktiveOperators);
            list.map((element) => {
                $("#uretimBasla-activeOpertors").append("<option value='" + element.operator_ID + "'>" + element.operator_Name + "</option>");
                $('#uretimBasla-activeOpertors').trigger('change');
            });
        }
    });
}
function GetAktiveMachine() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAktiveMachine,
        success: (list) => {
            $('#uretimBasla-activeMachine').empty();
        
            list.map((element) => {
                $("#uretimBasla-activeMachine").append("<option value='" + element.machine_Id + "'>" + element.machine_no + "</option>");
                $('#uretimBasla-activeMachine').trigger('change');
            });
        }
    });
}


// click on row to get data
$('#table-uretimInUretim').on('click', 'tr', function () {
    $("select").val(null).trigger("change");
    var stk = $(this).data('stk');
    var lot = $(this).data('lot');
    var process = $(this).data('process');
    var processno_id = $(this).data('processno_id');
    
    var flow_id = $(this).data('flow_id');

    uretimBaslaObject.Flow_ID = flow_id;
    $('.card').fadeIn();
    $('.card').css('opacity', '1').fadeIn();
    SendStkAndLot(stk, lot, process);
    uretimBaslaObject.lotNo = lot;
    uretimBaslaObject.stk = stk;
    uretimBaslaObject.process = process;
    uretimBaslaObject.processno_id = processno_id;
});


$("#uretimBasla-activeOpertors").select2()
    .on("select2:select", function (e) {
        var operatorName = $('#uretimBasla-activeOpertors').select2('data')
        var selected_element = $(e.currentTarget);
        var operatorId = selected_element.val();
        uretimBaslaObject.operator_ID = operatorId[0];
        uretimBaslaObject.operatorName = operatorName[0].text;
    });
$('#uretimBasla-activeOpertors').on("select2:unselecting", function (e) {

    uretimBaslaObject.operator_ID = "";
});
$("#uretimBasla-activeMachine").select2()
    .on("select2:select", function (e) {
        var selected_element = $(e.currentTarget);
        var select_val = selected_element.val();
        uretimBaslaObject.machine_Id = select_val[0];
        console.log(uretimBaslaObject);
        GetMachineNameByMachineNo(select_val[0]);
    });

$('#uretimBasla-activeMachine').on("select2:unselecting", function (e) {
    $('#uretimBasla-MakineModel').val('');
    $('#uretimBasla-MakineModel').fadeIn(1000);
    uretimBaslaObject.machine_Id = "";
    
});


function GetMachineNameByMachineNo(MachineNo) {
    uretimBaslaObject.machine_Id = MachineNo;
    if (MachineNo === null || MachineNo === '') {
        $('#uretimBasla-MakineModel').val('');
        $('#uretimBasla-MakineModel').fadeIn(1000);
    }
        else {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetMachineNameByMachineNo+"?machineNo=" + MachineNo,
        success: (data) => {
            $('#uretimBasla-MakineModel').val(data[0].model);
            $('#uretimBasla-MakineModel').fadeIn(1000);
        }
        });
    }

}

//reset all data;
$('#btn-uretimBasla-reset').click((event) => {
    event.preventDefault();
    resetUretimBasla();
});


// uretim Basla submit Button
$('#btn-uretimBasl-submit').click((event) => {
    event.preventDefault();
    let uretilsinMi = false;
    let checkUretimObject = Object.keys(uretimBaslaObject).filter((e) => {
        return uretimBaslaObject[e] !== "";
    });

  
    if (checkUretimObject.length !== Object.keys(uretimBaslaObject).length) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: ' Operatör veya makina bilgisi girilmemiş'
        });
        return true;
    }
    if (checkUretimObject.length === Object.keys(uretimBaslaObject).length) {

        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.GetOperatorPolivalance,
            data: JSON.stringify(uretimBaslaObject),
            success: (list) => {
                if (list.length === 0) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Operator bu işlemi yapamaz!',
                        type: 'error',
                        confirmButtonText: 'Tamam'
                    });
                }
                else {
                    uretilsinMi = true;
                    CreateIsEmri(uretilsinMi); 
                }
            }
        });
        
    }
});


function CreateIsEmri(uretilsinMi) {

    if (uretilsinMi) {
        
        $.ajax({
            type: "GET",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.CheckFlowIdByFinishTimeInFlowDetails + "?flow_ID=" + uretimBaslaObject.Flow_ID,
            success: (list) => {
                if (list.length > 0) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Başlamış iş emri',
                        type: 'error',
                        confirmButtonText: 'Cool'
                    });
                    return true;
                }
                else {

                    let ProcessFlowDetailsViewModel = {
                        Flow_ID: uretimBaslaObject.Flow_ID,
                        Operator: uretimBaslaObject.operator_ID,
                        processno_id: uretimBaslaObject.machine_Id
                    };

                    Swal.fire({
                        title: 'is emri özeti',
                        text: `stk : ${uretimBaslaObject.stk} -- 
operator : ${uretimBaslaObject.operatorName.toLocaleLowerCase()} -- 
makine :${uretimBaslaObject.machine_Id} 
`,
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText:"vazgeç",
                        confirmButtonText: 'is emri baslat'
                    }).then((result) => {
                        if (result.value) {
                            $.ajax({
                                type: "POST",
                                contentType: "application/json;charset=utf-8",
                                url: HttpUrls.StartIsEmriAndWriteToFlowDetails,
                                data: JSON.stringify(ProcessFlowDetailsViewModel),
                                success: (list) => {
                                    Swal.fire(
                                        'iş emri başaltıdı',
                                        '',
                                        'success'
                                    );
                                    resetUretimBasla();
                                }
                            });
                           
                        }
                    });

                }
            }
        });
    }

}
function resetUretimBasla() {
    $('.card').css('opacity', '0').fadeIn();

    lotNo.val('');
    urunNo.val('');
    requestQueryForUretimBasla.pageNumber = 1;
    requestQueryForUretimBasla.stk = "";
    requestQueryForUretimBasla.lotNo = "";
    requestQueryForUretimBasla.pageNumber = 1;
    $('#uretimBasla-pageNumner').text(requestQueryForUretimBasla.pageNumber);
    GetProcessFlow();
}

