$(function () {

    let b = BaseUrl + "Home/TTFTeslimat";
    if (window.location.href === b) {

         DropAllTTFTeslimatTable();
     //   GetTeslimatDurumuAjaxCall();
    //   GetTeslimatDurumuCount();

    }
});
function DropAllTTFTeslimatTable(){
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.DropAllTTFTeslimatTable,
        success: () => {

        }
    });
}

let requestQueryForTeslimatDurumu = {
    pageNumber: 1,
    pageSize: 6,
    Stk: "",
};

// #region Ajax Call And create  table
function GetTeslimatDurumuAjaxCall() {
    requestQueryForTeslimatDurumu.Stk = $(Inputs.teslimatDurumu_searchStk).val();
    ShowLoader();
    $(TablesId.teslimatDurumu).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetTeslimatDurumu,
        data: JSON.stringify(requestQueryForTeslimatDurumu),
        success: (list) => {
            if (list.length !== 0) {
                $('#recordNotFoundDiv_teslimatDurumu').css('display', 'none');
                console.log('teslim', list);
                CreateTeslimatDurumu(list, TablesId.teslimatDurumu);
            }
            else {
                $(`#recordNotFoundDiv_teslimatDurumu h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $('#recordNotFoundDiv_teslimatDurumu').css('display', 'block');
                HideLoader();
            }
        }
    });
};
function CreateTeslimatDurumu(list, tableId) {

    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr id="t${index}" >
    <td>${element.urunKodu}</td>
    <td>${element.siparisBlturu}</td>
    <td>${element.sprsblgno} </td>
    <td>${element.klmno}</td>
    <td>${element.mstrlok}</td>
    <td>${element.olcuBirimi}</td>
    <td>${element.gondtrh.slice(0,-11)}</td>
             </tr>
`);
    });
    HideLoader();
}
function GetTeslimatDurumuCount() {
    $('#select-teslimatDurumu-selectRowCount').empty();
    $.getJSON(`${HttpUrls.GetTeslimatDurumuCount}`, function (num) {
        $('#select-teslimatDurumu-selectRowCount').append(`
               <option selected value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="${num}">(${num}) All Records</option>

`);
        $('#span-teslimatDurumu-rowCount').text(num)
    })
}

$('#select-teslimatDurumu-selectRowCount').on('change', () => {
    requestQueryForTeslimatDurumu.pageSize = parseInt($('#select-teslimatDurumu-selectRowCount').val());
    requestQueryForTeslimatDurumu.pageNumber = 1;
    $('#num-teslimatDurumu-pageNumber').text(requestQueryForTeslimatDurumu.pageNumber);
    GetTeslimatDurumuAjaxCall();
});
//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.teslimatDurumu).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForTeslimatDurumu.pageNumber > 1) requestQueryForTeslimatDurumu.pageNumber -= 1;
    $('#num-teslimatDurumu-pageNumber').text(requestQueryForTeslimatDurumu.pageNumber);
    GetTeslimatDurumuAjaxCall();
});
$(NextButtons.teslimatDurumu).on('click', (event) => {
    event.preventDefault();
    requestQueryForTeslimatDurumu.pageNumber += 1;
    $('#num-teslimatDurumu-pageNumber').text(requestQueryForTeslimatDurumu.pageNumber);
    GetTeslimatDurumuAjaxCall();
});
//#endregion
// #region search
$(Inputs.teslimatDurumu_searchStk).keyup(function () {
    clearTimeout(timer);
        requestQueryForTeslimatDurumu.pageNumber = 1;
    $('#num-teslimatDurumu-pageNumber').text(requestQueryForTeslimatDurumu.pageNumber);
    timer = setTimeout(GetTeslimatDurumuAjaxCall, doneTypingInterval);
});
// #endregion 
// #region reset 
$('#btn-teslimatDurumu-reset').click((event) => {
    event.preventDefault();
    $(Inputs.teslimatDurumu_searchStk).val('');
    requestQueryForTeslimatDurumu.Stk = '';
    requestQueryForTeslimatDurumu.pageNumber = 1;
    requestQueryForTeslimatDurumu.pageSize = 6;
    $('#select-teslimatDurumu-selectRowCount').val('6');
    $('#num-teslimatDurumu-pageNumber').text(requestQueryForTeslimatDurumu.pageNumber);
    GetTeslimatDurumuAjaxCall();
});

//#endregion















//#region  excel

let acceptedTeslimat = [];
let addedList = [];
function CreateTeslimatTable(list, tableId, isModel) {
    $('#urunKodu').empty();
    $('#vdGlnmkt').empty();
    $('#gondtrh').empty();
    let urunKoduEmpty = [];
    let vdMktEmpty = [];
    let gonderthEmpty = [];

    $(tableId).empty();
    list.map((element, index) => {

        if (isNaN(element.vdGlnmkt)) {
            vdMktEmpty.push(element);

        }
        else if (element.urunKodu === "" || element.stk === urunKodu) urunKoduEmpty.push(element);
        else if (element.gondtrh === "" || element.gondtrh === undefined) gonderthEmpty.push(element);
        else {
            if (typeof (element.vdGlnmkt) === "string") element.vdGlnmkt = parseInt(element.vdGlnmkt);
            element.urunKodu = element.urunKodu.toString();
            acceptedTeslimat.push(element);
            $(tableId).append(`
<tr >
  <td>${element.urunKodu} </td>
  <td>${element.siparisBlturu ? element.siparisBlturu:""} </td>
  <td>${element.sprsblgno ? element.sprsblgno:""} </td>
  <td>${element.klmno ? element.klmno:""} </td>
  <td>${element.mstrlok ? element.mstrlok : ""} </td>
  <td>${element.olcuBirimi ? element.olcuBirimi : ""} </td>
  <td>${element.gondtrh ? element.gondtrh : ""} </td>
             </tr>
`);
        }
    });


    if (isModel) {
        CreateNonAcceptedReocrdsInTeslimat(urunKoduEmpty, 'urunKodu');
        CreateNonAcceptedReocrdsInTeslimat(vdMktEmpty, 'vdGlnmkt');
        CreateNonAcceptedReocrdsInTeslimat(gonderthEmpty, 'gondtrh');
        $('#teslimatDurumu-summary').modal('show');

    }
    if (acceptedTeslimat.length !== 0) {
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(acceptedTeslimat),
            url: HttpUrls.AddTeslimatDurumu,
            success: (list) => {
                addedList = list
                console.log('added', list);
                Swal.fire({
                    type: `success`,
                    title: 'Done!',
                    text: `${list.length} has been eklendi`,
                    timer: 3500
                });
            }
        });
    }

}

function CreateNonAcceptedReocrdsInTeslimat(list, id) {
    if (list.length > 0) {
        list.map((element) => {
            $(`#${id}`).append(`
<p style="color:black"> urun Kodu : ${element.urunKodu} , siparis bilgi turu: ${element.siparisBlturu}
, siparsi No : ${element.sprsblgno} , Klmno :  ${element.klmno}  , Mstrlok :  ${element.mstrlok} ,
Klmno :  ${element.gondtrh},gondtrh :  ${element.gondtrh}
</ </p>
`)
        })
    }
}

//#region  Clear 
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

            $(TablesId.tranferWo).empty();
            //    location.reload();
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
            if (acceptedTeslimat.length === 0) {
                Swal.fire({
                    type: 'error',
                    title: "..Ops",
                    text: `there is no records to tranfer`,
                    timer: 3500
                });
            }
            else {
                ShowLoader();
                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(acceptedTeslimat),
                    url: HttpUrls.TrnasferWoToSystem,
                    success: (list) => {
                        HideLoader()
                        if (list === 'empty' || list.length === 0)
                            Swal.fire({
                                type: 'error',
                                title: "Ops..",
                                text: `no records has been added`,
                                timer: 3500
                            });
                        else {
                            Swal.fire({
                                type: 'success',
                                title: "Done!",
                                text: `${list.length} records has been added rest records Have issues`,

                            });
                            let stkList = [];
                            for (let i = 0; i < list.length; i++) {
                                stkList.push(list[i].stk);
                            }
                            for (let i = 0; i < stkList.length; i++) {
                                acceptedTeslimat.map((el, index) => {
                                    if (stkList[i] === el.stk) acceptedTeslimat.splice(index, 1);
                                })
                            }
                            $(TablesId.tranferWo).empty();
                            CreateTranferWoTable(acceptedTeslimat, TablesId.tranferWo, false);
                            acceptedTeslimat = [];

                        }
                    }
                });
            }
        }
    })
})
//#endregion



//#region upload Excel File
$('#btn-teslimatDurumu-addExcleFile').click((event) => {
    event.preventDefault();
    $('#inp-teslimatDurumu-excelFile').trigger('click');

});

$('#inp-teslimatDurumu-excelFile').change((e) => {
    selectedFile = event.target.files[0];
    if (selectedFile) {
        acceptedTeslimat = [];
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary", cellDates: true });
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { raw: false, dateNF: 'DD/MM/YYYY' });

                console.log('excel', rowObject);
                CreateTeslimatTable(rowObject, TablesId.teslimatDurumu, true);
            });
        }
    }
});


//#endregion 

//#endregion