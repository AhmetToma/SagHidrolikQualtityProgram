$(function () {
    let dataUrl = "Home/BakimEtiketi";
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
    GetAllbakimEtiketiInBakimEtiketi();
     GetAllbakimEtiketiInBakimEtiketiCount();
    }
});
let _requestQueryForBakimEtiketi = {
    pageSize: 6,
    pageNumber: 1,
    machineNo: ""
};
let bakimEtiketiModel = {

    machineNo: "",
    machineAdi: "",
    model: "",
    bolum: "",
    uretici: "",
    yil: "",
    YetkiliServis: "",
    elec: "",
    guc: 0,
    birim: "",
    planliBakim: 0,
    aktif: 0,
    uretimMakinesi: 0,
    machineId: 0,
}
let bakimEtiketiList = [];
let toEtiketList = [];
// #region ajaxcall ,create table ,records count  
function GetAllbakimEtiketiInBakimEtiketi() {
    _requestQueryForBakimEtiketi.machineNo = $(Inputs.bakimEtiketi_searchMachineNo).val();
    ShowLoader();
    if (_requestQueryForBakimEtiketi.pageNumber === 1) {
        disableButton(PreviousButtons.bakimEtiketi);
        ActiveButton(NextButtons.bakimEtiketi);
    }
    else {
        ActiveButton(PreviousButtons.bakimEtiketi);
        ActiveButton(NextButtons.bakimEtiketi);
    }
    $(TablesId.bakimEtiketi).empty();
    $(`${pageNumbers.bakimEtiketi}`).text(_requestQueryForBakimEtiketi.pageNumber);

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllMakineler,
        data: JSON.stringify(_requestQueryForBakimEtiketi),
        success: (list) => {
            bakimEtiketiList = list;
            if (list.length !== 0) {
                console.log('bakimEtiketi', list);
                bakimEtiketiList = list;
                $(`${recordsNotFound.bakimEtiketi}`).css('display', 'none');

                CreateBakimEtiketiTable(list, TablesId.bakimEtiketi);
            }
            else {
                disableButton(NextButtons.bakimEtiketi);
                $(`${recordsNotFound.bakimEtiketi}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateBakimEtiketiTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr>
    <td>${element.Machine_no ? element.Machine_no : ""}</td>
    <td>${element.Machine_Name ? element.Machine_Name : ""}</td>
    <td>${element.model ? element.model : ""}</td>
    <td>${element.bolum ? element.bolum : ""}</td>
    <td>${element.Yil ? element.Yil : ""}</td>
 <td><i onclick="AddToBakimEtiketTable(${index})" class="far fa-sticky-note fa-2x  text-primary"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}

function GetAllbakimEtiketiInBakimEtiketiCount() {
    $('#select-bakimEtiketi-selectRowCount').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllMakinelerCount,
        success: (number) => {
            $('#span-bakimEtiketi-rowCount').text(number);
            $('#select-bakimEtiketi-selectRowCount').append(`
<option value="4">4</option>
<option value="6" selected>6</option>
<option value="8">8</option>
<option value="10">10</option>
                    <option value="${number}">All Records (${number})</option>
`);

            $('#span-bakimEtiketi-rowCount').text(number);
        }
    });
}
$('#select-bakimEtiketi-selectRowCount').on('change', () => {
    let selectedRowCount = $("#select-bakimEtiketi-selectRowCount option:selected").val();
    selectedRowCount = parseInt(selectedRowCount);
    _requestQueryForBakimEtiketi.pageSize = selectedRowCount;
    _requestQueryForBakimEtiketi.pageNumber = 1;
    GetAllbakimEtiketiInBakimEtiketi();
});
//#endregion
//#region search
$(Inputs.bakimEtiketi_searchMachineNo).keyup(function () {
    _requestQueryForBakimEtiketi.pageNumber = 1;
    $(pageNumbers.bakimEtiketi).text(_requestQueryForBakimEtiketi.pageNumber);
    clearTimeout(timer);
    timer = setTimeout(GetAllbakimEtiketiInBakimEtiketi, doneTypingInterval);
});
//#endregion

//#region Next-Previous Hanldler
$(PreviousButtons.bakimEtiketi).on('click', (event) => {
    event.preventDefault();
    if (_requestQueryForBakimEtiketi.pageNumber > 1) _requestQueryForBakimEtiketi.pageNumber -= 1;
    $(`${pageNumbers.bakimEtiketi}`).text(_requestQueryForBakimEtiketi.pageNumber);
    GetAllbakimEtiketiInBakimEtiketi();
});
$(NextButtons.bakimEtiketi).on('click', (event) => {
    event.preventDefault();
    _requestQueryForBakimEtiketi.pageNumber += 1;
    $(`${pageNumbers.bakimEtiketi}`).text(_requestQueryForBakimEtiketi.pageNumber);
    GetAllbakimEtiketiInBakimEtiketi();
});
//#endregion




//#region Add To etiket Table
function AddToBakimEtiketTable(index) {
    let matched = bakimEtiketiList[index];
    if (matched !== null) toEtiketList.push(matched);
    //$([document.documentElement, document.body]).animate({
    //    scrollTop: $('.sevkiyatKutuEtiketiUnderSection').offset().top
    //}, 500);
    $('.sevkiyatKutuEtiketiUnderSection').css('opacity', '1').fadeIn();
    CreateTableResultForBakimEtikei(toEtiketList, "#table-bakimEtiketi-result");
    Swal.fire({
        title: 'eklendi',
        type: "success",
        showConfirmButton: false,
        timer: 1000
    })
}

 function CreateTableResultForBakimEtikei(list, tableId){
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr>
    <td>${element.Machine_no ? element.Machine_no : ""}</td>
    <td>${element.Machine_Name ? element.Machine_Name : ""}</td>
    <td>${element.model ? element.model : ""}</td>
    <td>${element.bolum ? element.bolum : ""}</td>
    <td>${element.Yil ? element.Yil : ""}</td>
 <td><i onclick="DeleteFromBakimEtiketiTable(${index})" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
   
}



//#endregion


// #region Delete from Etiket Table
function DeleteFromBakimEtiketiTable(index) {
    console.log(toEtiketList);
    toEtiketList.splice(index, 1);
    console.log(toEtiketList);
    CreateTableResultForBakimEtikei(toEtiketList, "#table-bakimEtiketi-result");
}
//#endregion

//#region Clear  Bakim EiketTablo


$('#btn-bakimEtiketi-clearTable').click((e) => {
    e.preventDefault();
    toEtiketList = [];
    $('#table-bakimEtiketi-result').empty();
})
//#endregion


// #region Normal Etiket

$("#btn-bakimEtiketi-normalEtiket").click((event) => {
    event.preventDefault();
    let rowCount = $(`#table-bakimEtiketi-result tr`).length;
    if (rowCount > 0) {
        ShowLoader();
        $('.bakimEtiketiPrintModel').empty();
        for (let i = 0; i < toEtiketList.length; i++) {
            $('.bakimEtiketiPrintModel').append(`
    <div class="normal-container">
        <div class="containq1">
            <img src="/images/bakimEitketi.png" alt="">
        </div>
        <div>
            <div class="row">
                <div class="normal-mahcineNo">
                    <h4>${toEtiketList[i].Machine_no}</h4>
                </div>
            </div>
            <div class="row">
                <div class="normal-machineName">
                 <h4>${toEtiketList[i].Machine_Name}</h4>
                </div>
            </div>
            <div class="row">
                <div class="normal-Model">
                    <h4>${toEtiketList[i].model}</h4>
                </div>
            </div>
        </div>
    </div>
`);
        }
        $('.bakimEtiketiPrintModel').css('opacity', '1');
        HideLoader();
        $('.bakimEtiketiPrintModel').printThis({
            afterPrint: HidebakimEtiketiModel,
            loadCSS: "css/bakimEitketi-normal.css"
        });
    }
    else {
        Swal.fire({
            type: 'error',
            title: 'Etiket tablosu Boş.',
            text: "Etiket tablosuna en az bir etiket girmeniz gerekiyor."
        });
    }
});
function HidebakimEtiketiModel() {
    $('.bakimEtiketiPrintModel').empty();
    $('.bakimEtiketiPrintModel').css('opacity', '0');
}
//#endregion


// #region kucuk Etiket

$("#btn-bakimEtiketi-kucukEtiket").click((event) => {
    event.preventDefault();
    let rowCount = $(`#table-bakimEtiketi-result tr`).length;
    if (rowCount > 0) {
        ShowLoader();
        $('.bakimEtiketiPrintModel').empty();
        for (let i = 0; i < toEtiketList.length; i++) {
            $('.bakimEtiketiPrintModel').append(`
   <div class="kucuk-container">
    <div class="containq1">
        <img src="/images/bakimEitketi.png" alt="">
    </div>
    <div class="kucuk-mahcineNo">
        <p> ${toEtiketList[i].Machine_no}</p>
    </div>
    <div class="kucuk-machineName">
        <p>${toEtiketList[i].Machine_Name}</p>
    </div>
    <div class="kucuk-Model">
        <p>${toEtiketList[i].model}</p>
    </div>
</div>
`);
        }
        $('.bakimEtiketiPrintModel').css('opacity', '1');
        HideLoader();
        $('.bakimEtiketiPrintModel').printThis({
            afterPrint: HidebakimEtiketiModel,
            loadCSS: "css/bakimEitketi-kucuk.css"
        });
    }
    else {
        Swal.fire({
            type: 'error',
            title: 'Etiket tablosu Boş.',
            text: "Etiket tablosuna en az bir etiket girmeniz gerekiyor."
        });
    }
});
//#endregion

// #region reset 

$('#btn-bakimEtiketi-reset').click(e => {
    e.preventDefault();
    _requestQueryForBakimEtiketi.pageSize = 6;
    _requestQueryForBakimEtiketi.pageNumber = 1;
    $('#select-bakimEtiketi-selectRowCount').val('6');
    $(Inputs.bakimEtiketi_searchMachineNo).val('');
    $('.bakimArizaCard').css('opacity', '0').fadeIn();
    $(`${pageNumbers.bakimEtiketi}`).text(_requestQueryForBakimEtiketi.pageNumber);
    GetAllbakimEtiketiInBakimEtiketi();
    console.log(_requestQueryForBakimEtiketi);
})
//#endregion