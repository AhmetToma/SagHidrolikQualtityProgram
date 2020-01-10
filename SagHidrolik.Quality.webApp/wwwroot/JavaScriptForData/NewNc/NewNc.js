$(function () {
    let dataUrl = "Home/NewNc";
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllClaim();
        GetAllCompany();
        GetAllDepartment();
        GetAllProcess();
        GetAllPartNumbers();
        GetAllOperator();

    }
});
let regusetQueryForNewNc = {
    pageSize: 500,
    pageNumber: 1,
    Stk:''

}
function GetAllClaim() {
    $('#select-newNc-claimType').empty();
     $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllClaim,
         data: JSON.stringify(regusetQueryForNewNc),
         success: (list) => {
             list.map((element) => {
                 $('#select-newNc-claimType').append(`
                    <option value="${element.claimTypeID}">${element.claimType_a} --- ${element.claimType}</option>
`)
             })
        }
    });
}
function GetAllCompany() {
    $('#select-newNc-cusSup').empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllCompany,
        data: JSON.stringify(regusetQueryForNewNc),
        success: (list) => {
            list.map((element) => {
                $('#select-newNc-cusSup').append(`
                    <option value="${element.id_Cust}">${element.companyName}  ---  ${element.companyType}</option>
`)
            })
        }
    });
}

function GetAllDepartment() {
    $('#select-newNc-dep').empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllDepartments,
        data: JSON.stringify(regusetQueryForNewNc),
        success: (list) => {
            list.map((element) => {
                $('#select-newNc-dep').append(`
                    <option value="${element.depT_ID}">${element.department_tr}  ---  ${element.department_en}</option>
`)
            })
        }
    });
}

function GetAllProcess() {
    $('#select-newNc-process').empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllIprocess,
        data: JSON.stringify(regusetQueryForNewNc),
        success: (list) => {
            
            list.map((element) => {
                $('#select-newNc-process').append(`
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
    timerForNewNc = setTimeout(GetAllPartNumbers, TypingIntervalForNewNc);
    regusetQueryForNewNc.Stk = searchedStk;
});
function GetAllPartNumbers() {
    $('#select-newNc-partNo').empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllPartNumbers,
        data: JSON.stringify(regusetQueryForNewNc),
        success: (list) => {
            list.map((element) => {
                $('#select-newNc-partNo').append(`
                    <option value="${element.id}">${element.stk}--- ${element.sta}</option>
`);
            });
        }
    });
}

function GetAllOperator() {
    $('#select-newNc-openBy').empty();
    $('#select-newNc-resposible').empty();

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllOperators,
        data: JSON.stringify(regusetQueryForNewNc),
        success: (list) => {
            console.log(list);
            list.map((element) => {
                $('#select-newNc-openBy').append(`
                    <option value="${element.op_ID}">${element.operatorName}</option>
`);
                $('#select-newNc-resposible').append(`
                    <option value="${element.op_ID}">${element.operatorName}</option>
`);
            });
        }
    });
}


$('input[type=radio][name=radio66]').change(function () {
    

    // $($(this).siblings('.state label').text());
    console.log($(this).siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': '#28a745', 'opacity': '1' }));

    $('input[type="radio"]:not(:checked)').siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': 'black', 'opacity': '0.5' });
});