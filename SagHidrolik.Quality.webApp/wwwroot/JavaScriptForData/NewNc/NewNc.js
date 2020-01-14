$(function () {

  
    let dataUrl = "Home/NewNc";
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        ShowLoader();
        GetAllClaim('#select-newNc-ncType');
        GetAllCompany('#select-newNc-cusSup');
        GetAllDepartment('#select-newNc-dep');
        GetAllProcess('#select-newNc-process');
        GetAllPartNumbers('#select-newNc-partNo');
        GetAllOperator('#select-newNc-openBy','#select-newNc-resposible');

        $(Inputs.newNc_openDate).datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $(Inputs.newNc_targetDate).datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $(Inputs.newNc_closeDate).datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $(".limitedNumbSelect2").select2({
            maximumSelectionLength: 1,
            placeholder: "Seçiniz"
        })
    }
});
let regusetQueryForNewNc = {
    pageSize: 500,
    pageNumber: 1,
    Stk:''

}
let newNcModel = {
    ncType: 0,
    activityType: 0,
    customerSupplier: 0,
    department: 0,
    process: 0,
    partNo: 0,
    openBy: 0,
    responsible: 0,
    def: "",
    conformity: "",
    description:"",
    qty: 0,
    openDate: "",
    targetDate: "",
    closeDate: ""
}

//#region Function ajax call
function GetAllClaim(selectID) {
    $(`${selectID}`).empty();
     $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllClaim,
         data: JSON.stringify(regusetQueryForNewNc),
         success: (list) => {
             list.map((element) => {
                 $(`${selectID}`).append(`
                    <option value="${element.claimTypeID}">${element.claimType_a} --- ${element.claimType}</option>
`)
             })
        }
    });
}
function GetAllCompany(selecID) {
    $(`${selecID}`).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllCompany,
        data: JSON.stringify(regusetQueryForNewNc),
        success: (list) => {
            list.map((element) => {
                $(`${selecID}`).append(`
                    <option value="${element.id_Cust}">${element.companyName}  ---  ${element.companyType}</option>
`)
            })
        }
    });
}
function GetAllDepartment(selectID) {
    $(`${selectID}`).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllDepartments,
        data: JSON.stringify(regusetQueryForNewNc),
        success: (list) => {
            list.map((element) => {
                $(`${selectID}`).append(`
                    <option value="${element.depT_ID}">${element.department_tr}  ---  ${element.department_en}</option>
`)
            })
        }
    });
}
function GetAllProcess(selectID) {
    $(`${selectID}`).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllIprocess,
        data: JSON.stringify(regusetQueryForNewNc),
        success: (list) => {
            
            list.map((element) => {
                $(`${selectID}`).append(`
                    <option value="${element.pR_ID}">${element.process}</option>
`);
            });
        }
    });
}

let timerForNewNc;
let TypingIntervalForNewNc = 500;
$(document).on('keyup', '#partNoDiv .select2-search__field', function (e) {
    var searchedStk = e.currentTarget.value;
    clearTimeout(timerForNewNc);
    timerForNewNc = setTimeout(getPartNumberCallBack, TypingIntervalForNewNc);
    regusetQueryForNewNc.Stk = searchedStk;
});
function getPartNumberCallBack() {
    GetAllPartNumbers('#select-newNc-partNo');
}
function GetAllPartNumbers(selectID) {
    $(`${selectID}`).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllPartNumbers,
        data: JSON.stringify(regusetQueryForNewNc),
        success: (list) => {
            list.map((element) => {
                $(`${selectID}`).append(`
                    <option value="${element.id}">${element.stk}--- ${element.sta}</option>
`);
            });
            HideLoader();
        }
    });

}

function GetAllOperator(selectID,selectID2) {
    $(`${selectID}`).empty();
    $(`${selectID2}`).empty();

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllOperators,
        data: JSON.stringify(regusetQueryForNewNc),
        success: (list) => {
          
            list.map((element) => {
                $(`${selectID}`).append(`
                    <option value="${element.op_ID}">${element.operatorName}</option>
`);
                $(`${selectID2}`).append(`
                    <option value="${element.op_ID}">${element.operatorName}</option>
`);
            });
        }
    });
}


// #endregion

// #region radioButton and select handlers


// #region nc type select 
$(Inputs.newNC_ncType).select2()
    .on("select2:select", function (e) {
        let selected_element = $(e.currentTarget);
        let select_val = selected_element.val();
        newNcModel.ncType = select_val[0];
     
       
    });

$(Inputs.newNC_ncType).on("select2:unselecting", function (e) {
    newNcModel.ncType = 0;

});
// #endregion

// #region customer supplier select 
$(Inputs.newNC_cutomerSup).select2()
    .on("select2:select", function (e) {
        let selected_element = $(e.currentTarget);
        let select_val = selected_element.val();
        newNcModel.customerSupplier = select_val[0];

    });

$(Inputs.newNC_cutomerSup).on("select2:unselecting", function (e) {
    newNcModel.customerSupplier = 0;

});
// #endregion


// #region department select 
$(Inputs.newNC_dep).select2()
    .on("select2:select", function (e) {
        let selected_element = $(e.currentTarget);
        let select_val = selected_element.val();
        newNcModel.department = select_val[0];

    });

$(Inputs.newNC_dep).on("select2:unselecting", function (e) {
    newNcModel.department = 0;

});
// #endregion


// #region process select 
$(Inputs.newNC_process).select2()
    .on("select2:select", function (e) {
        let selected_element = $(e.currentTarget);
        let select_val = selected_element.val();
        newNcModel.process = select_val[0];
    });

$(Inputs.newNC_process).on("select2:unselecting", function (e) {
    newNcModel.process = 0;

});
// #endregion


// #region partNo select 
$(Inputs.newNC_partNo).select2()
    .on("select2:select", function (e) {
        let selected_element = $(e.currentTarget);
        let select_val = selected_element.val();
        newNcModel.partNo = select_val[0];
    });

$(Inputs.newNC_partNo).on("select2:unselecting", function (e) {
    newNcModel.partNo = 0;

});
// #endregion


// #region open By select 
$(Inputs.newNC_openBy).select2()
    .on("select2:select", function (e) {
        let selected_element = $(e.currentTarget);
        let select_val = selected_element.val();
        newNcModel.openBy = select_val[0];
    });

$(Inputs.newNC_openBy).on("select2:unselecting", function (e) {
    newNcModel.openBy = 0;

});
// #endregion


// #region resposible select 
$(Inputs.newNC_resposible).select2()
    .on("select2:select", function (e) {
        let selected_element = $(e.currentTarget);
        let select_val = selected_element.val();
        newNcModel.responsible = select_val[0];
    });

$(Inputs.newNC_resposible).on("select2:unselecting", function (e) {
    newNcModel.responsible = 0;
});
// #endregion


$('input[type=radio][name=radio66]').change(function () {
    $(this).siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': '#28a745', 'opacity': '1' });
    $('input[type="radio"]:not(:checked)').siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': 'black', 'opacity': '1' });
    if ($(this).val() === 'Corrective') newNcModel.activityType = 1;
    if ($(this).val() === 'Preventative') newNcModel.activityType = 2;
    if ($(this).val() === 'Repetitive') newNcModel.activityType = 3;
    
});
//#endregion 

// #region submit and reset

$(Buttons.newNc_submit).click((event) => {
    event.preventDefault();
    newNcModel.def = $(Inputs.newNC_def).val();
    newNcModel.conformity = $(Inputs.newNC_conformity).val();
    newNcModel.qty = $(Inputs.newNC_qty).val();
    newNcModel.openDate = $(Inputs.newNc_openDate).val();
    newNcModel.targetDate = $(Inputs.newNc_targetDate).val();
    newNcModel.closeDate = $(Inputs.newNc_closeDate).val();
    newNcModel.description = $(Inputs.newNC_description).val();

 
    if (newNcModel.ncType === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Nc Type Seçmeniz gerekiyor'
        });

    }
    else if (newNcModel.activityType === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'activity type Seçmeniz gerekiyor'
        });
    }
    else if (newNcModel.customerSupplier === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'customer supplier Seçmeniz gerekiyor'
        });
    }
    else if (newNcModel.department === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'department Seçmeniz gerekiyor'
        });
    }
    else if (newNcModel.process === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'process  Seçmeniz gerekiyor'
        });
    }
    else if (newNcModel.partNo === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'part No  Seçmeniz gerekiyor'
        });
    }
    else if (newNcModel.openBy === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'open By  Seçmeniz gerekiyor'
        });
    }
    else if (newNcModel.responsible === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'responsible Seçmeniz gerekiyor'
        });
    }
    else if (newNcModel.def === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'def girmeniz  gerekiyor'
        });
    }
    else if (newNcModel.conformity === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'conformity girmeniz  gerekiyor'
        });
    }
    else if (newNcModel.description === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'description girmeniz  gerekiyor'
        });
    }
    else if (newNcModel.qty < 0 || newNcModel.qty === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'qty girmeniz  gerekiyor'
        });
    }
    else if (newNcModel.openDate === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'openDate girmeniz  gerekiyor'
        });
    }
    else if (newNcModel.targetDate === '')

    {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'targetDate girmeniz  gerekiyor'
        });
    }
    else if (newNcModel.closeDate === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'closeDate girmeniz  gerekiyor'
        });
    }
    else {
        $('#sp-newNc-ncType').text($(Inputs.newNC_ncType).select2('data')[0].text)
        $('#sp-newNc-activityType').text($('input[type=radio][name=radio66]').val());
        $('#sp-newNC-cusSup').text($(Inputs.newNC_cutomerSup).select2('data')[0].text)
        $('#sp-newNC-department').text($(Inputs.newNC_dep).select2('data')[0].text)
        $('#sp-newNC-process').text($(Inputs.newNC_process).select2('data')[0].text)
        $('#sp-newNC-partNo').text($(Inputs.newNC_partNo).select2('data')[0].text)
        $('#sp-newNC-openBy').text($(Inputs.newNC_openBy).select2('data')[0].text)
        $('#sp-newNC-resposible').text($(Inputs.newNC_resposible).select2('data')[0].text)
        $('#sp-newNC-def').text($(Inputs.newNC_def).val())
        $('#sp-newNC-confromity').text($(Inputs.newNC_conformity).val())
        $('#sp-newNC-des').text($(Inputs.newNC_description).val())
        $('#sp-newNC-qty').text($(Inputs.newNC_qty).val())
        $('#sp-newNC-openDate').text($(Inputs.newNc_openDate).val());
        $('#sp-newNC-targetDate').text($(Inputs.newNc_targetDate).val());
        $('#sp-newNC-closeDate').text($(Inputs.newNc_closeDate).val());

        $(Models.newNc_summary).modal('show');
    }
});

$(Buttons.newNc_reset).click((event) => {
    event.preventDefault();
    newNcReset();
})

$(Buttons.newNc_confirmAdd).click(() => {
    $.ajax({
    type: "POST",
    contentType: "application/json;charset=utf-8",
    url: HttpUrls.AddNewNc,
    data: JSON.stringify(newNcModel),
    success: (num) => {
        if (num !== 0) {
            Swal.fire({
                title: 'Başarılı!',
                text: 'yeni Nc Başarı ile eklendi',
                type: 'success',
                timer: 1500
            });
        }
        $(Models.newNc_summary).modal('hide');
        newNcReset();
    }
});
})

function newNcReset() {
    $("select").val(null).trigger("change");
    newNcModel.ncType = 0;
    newNcModel.activityType = 0;
    newNcModel.customerSupplier = 0;
    newNcModel.department = 0;
    newNcModel.process = 0;
    newNcModel.partNo = 0;
    newNcModel.openBy = 0;
    newNcModel.responsible = 0;
    newNcModel.def = '';
    newNcModel.conformity = '';
    newNcModel.qty = 0;
    newNcModel.openBy = '';
    newNcModel.targetDate = '';
    newNcModel.closeDate = '';
    newNcModel.description = '';

 $(Inputs.newNC_def).val('');
  $(Inputs.newNC_conformity).val('');
   $(Inputs.newNC_qty).val('');
   $(Inputs.newNc_openDate).val('');
    $(Inputs.newNc_targetDate).val('');
    $(Inputs.newNc_closeDate).val('');
    $(Inputs.newNC_description).val('');

    $('input[type=radio][name=radio66]').prop('checked', false);
    $('input[type=radio][name=radio66]').siblings('.state').find('label').css({ 'font-weight': 'normal', 'color': '#73879C', 'opacity': '1' });

}
// #endregion

