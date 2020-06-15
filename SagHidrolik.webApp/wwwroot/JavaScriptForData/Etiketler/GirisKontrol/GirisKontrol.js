$(function () {

    let b = BaseUrl + "Home/GirisKontrol";
    if (window.location.href === b) {
        GetgirisKontrolAjaxCall();

        if ($('body').hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
            $('body').toggleClass('nav-md nav-sm');
            $('.dataTable').each(function () { $(this).dataTable().fnDraw(); });
        }
    }
});
let requestQueryForGirisKontrol = {
    pageNumber: 1,
    pageSize: 10,
    Stk: "",
};
let girisKontrolList = [];
let girisKontrolModel = {
    operatorId: 0,
    refKodu: "",
    kaliteKodu: "",
    tarih: ""
}
// #region Ajax Call And create  table
function GetgirisKontrolAjaxCall() {
    $('.girisKontrolCard').css('opacity', '0');
    if (requestQueryForGirisKontrol.pageNumber === 1) {
        disableButton(PreviousButtons.girisKontrol);
        ActiveButton(NextButtons.girisKontrol);
    }
    else {
        ActiveButton(PreviousButtons.girisKontrol);
        ActiveButton(NextButtons.girisKontrol);
    }
    $(TablesId.girisKontrol).empty();
    $(`${pageNumbers.girisKontrol}`).text(requestQueryForGirisKontrol.pageNumber);
    requestQueryForGirisKontrol.Stk = $(Inputs.girisKontrol_searchStk).val();
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetGirisKontrol,
        data: JSON.stringify(requestQueryForGirisKontrol),
        success: (list) => {
            girisKontrolList = list;
            console.log(girisKontrolList);
            if (list.length !== 0) {
                $(`${recordsNotFound.girisKontrol}`).css('display', 'none');
                CreateGirisKontrolTable(list, TablesId.girisKontrol, true);
            }
            else {
                disableButton(NextButtons.girisKontrol);
                $(`${recordsNotFound.girisKontrol}`).css('display', 'block');
                HideLoader();
            }
        }
    });
}
function CreateGirisKontrolTable(list, tableId) {
    $(tableId).empty();
    list.map((element, index) => {
        $(tableId).append(`
<tr onclick="setGirisKontrol(${index})">
    <td>${element.stk}</td>
    <td>${element.sta} </td>
    <td>${element.miktar}</td>
    <td>${element.cariref}</td>
    <td>${element.kalitekodu ? element.kalitekodu : ""}</td>
    <td>${element.fielD18 ? element.fielD18 : ""}/${element.fielD19 ? element.fielD19 : ""}</td>
    <td>${element.tarih}</td>
    <td>${element.irsevrakno}</td>
 <td><i onclick="DeleteKaliteKodu(${index}, '${element.stk}','${element.ref}')" class="fa fa-2x fa-trash text-danger"  aria-hidden="true"></td>
             </tr>
`);
    });
    HideLoader();
}





//#endregion
//#region Next-Previous Hanldler
$(PreviousButtons.girisKontrol).on('click', (event) => {
    event.preventDefault();
    if (requestQueryForGirisKontrol.pageNumber > 1) requestQueryForGirisKontrol.pageNumber -= 1;
    $('#number-girisKontrol-pageNumber').text(requestQueryForGirisKontrol.pageNumber);
    GetgirisKontrolAjaxCall();
});
$(NextButtons.girisKontrol).on('click', (event) => {
    event.preventDefault();
    requestQueryForGirisKontrol.pageNumber += 1;
    $('#number-girisKontrol-pageNumber').text(requestQueryForGirisKontrol.pageNumber);
    GetgirisKontrolAjaxCall();
});
//#endregion
// #region search
$(Inputs.girisKontrol_searchStk).keyup(function () {
    clearTimeout(timer);
    requestQueryForGirisKontrol.pageNumber = 1;
    $('#number-girisKontrol-pageNumber').text(requestQueryForGirisKontrol.pageNumber);
    timer = setTimeout(GetgirisKontrolAjaxCall, doneTypingInterval);
});
//user is "finished typing," do something

// #endregion 

//#region Giris Kontrol Form

function setGirisKontrol(index) {
    $('.girisKontrolCard').css('opacity', '1');
    $("#girisKontrol-activeOpertors").val(null).trigger("change");
    $("input[name='KodType']").prop("checked", false);
    let matched = girisKontrolList[index];
    matched.kalitekodu ? matched.kalitekodu = matched.kalitekodu : matched.kalitekodu = "";
    $('#inp-GirisKontrol-urunKodu').val(matched.stk);
    $('#inp-GirisKontrol-ref').val(matched.ref);
    $('#inp-GirisKontrol-sta').val(matched.sta);
    $('#inp-GirisKontrol-tarih').val(matched.tarih);
    $('#inp-GirisKontrol-kaliteKodu').val(matched.kalitekodu);
    $('#inp-GirisKontrol-servNo').val(matched.irsevrakno);
    girisKontrolModel.refKodu = matched.ref;
    girisKontrolModel.tarih = matched.tarih;
    console.log(matched);
    console.log(girisKontrolModel);
}


//radio change
$("input[name='KodType']").change(() => {
    let kodType = $("input[name='KodType']:checked").val();
    let tarih = girisKontrolModel.tarih.split('-');
    if (kodType === "1") girisKontrolModel.kaliteKodu = `OK ${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}`;
    if (kodType === "2") girisKontrolModel.kaliteKodu = `OK ${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}Şartlı`;
    if (kodType === "3") girisKontrolModel.kaliteKodu = `NG ${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}Red`;

    $('#generatedKaliteKodu').text(girisKontrolModel.kaliteKodu);
})

$("#girisKontrol-activeOpertors").select2().on("select2:select", function (e) {

        girisKontrolModel.operatorId = parseInt($('#girisKontrol-activeOpertors').val()[0]);

        let kodType = $("input[name='KodType']:checked").val();
        let tarih = girisKontrolModel.tarih.split('-');
        if (kodType === "1") girisKontrolModel.kaliteKodu = `OK ${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}`;
        if (kodType === "2") girisKontrolModel.kaliteKodu = `OK ${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}Şartlı`;
        if (kodType === "3") girisKontrolModel.kaliteKodu = `NG ${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}Red`;
        else girisKontrolModel.kaliteKodu = `${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}`;
        console.log(girisKontrolModel);
        $('#generatedKaliteKodu').text(girisKontrolModel.kaliteKodu);
 });

$('#girisKontrol-activeOpertors').on("select2:unselecting", function (e) {

    girisKontrolModel.operatorId = 0;
    let kodType = $("input[name='KodType']:checked").val();
    let tarih = girisKontrolModel.tarih.split('-');
    if (kodType === "1") girisKontrolModel.kaliteKodu = `OK ${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}`;
    if (kodType === "2") girisKontrolModel.kaliteKodu = `OK ${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}Şartlı`;
    if (kodType === "3") girisKontrolModel.kaliteKodu = `NG ${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}Red`;
    else girisKontrolModel.kaliteKodu = `${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}`;
    console.log(girisKontrolModel);
    $('#generatedKaliteKodu').text(girisKontrolModel.kaliteKodu);
});


$('#btn-girisKontrol-submit').click((e) => {
    e.preventDefault();
    if ($('#girisKontrol-activeOpertors').val() === null) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Operator seçmeniz gerekiyor',
            timer: 2500

        });
    }
    else if (!$("input[name='KodType']:checked").val()) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'kod Type  seçmeniz gerekiyor',
            timer: 2500

        });
    }
    else {
        girisKontrolModel.operatorId = parseInt($('#girisKontrol-activeOpertors').val()[0]);
        let kodType = $("input[name='KodType']:checked").val();
        let tarih = girisKontrolModel.tarih.split('.');
        if (kodType === "1") girisKontrolModel.kaliteKodu = `OK ${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}`;
        if (kodType === "2") girisKontrolModel.kaliteKodu = `OK ${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}Şartlı`;
        if (kodType === "3") girisKontrolModel.kaliteKodu = `NG ${tarih[2]}${tarih[1]} ${girisKontrolModel.operatorId}Red`;


        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.UpdateKaliteKodu,
            data: JSON.stringify(girisKontrolModel),
            success: (kaliteKodu) => {
                Swal.fire({
                    type: 'success',
                    title: 'Oops...',
                    text: `kalite Kodu : ${kaliteKodu}`,
                    timer: 5000
                });
                GetgirisKontrolAjaxCall();
                $('.girisKontrolCard').css('opacity', '0')
                $("#girisKontrol-activeOpertors").val(null).trigger("change");
                $("input[name='KodType']").prop("checked", false);
            }
            ,
            error: () => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Beklenmeyen bir hata oluştu',
                    timer: 2500
                });
            }
        });
    }

})

//#endregion

// #region reset 
$('#btn-girisKontrol-reset').click((event) => {
    event.preventDefault();
    $(Inputs.girisKontrol_searchStk).val('');
    requestQueryForGirisKontrol.Stk = '';
    requestQueryForGirisKontrol.pageNumber = 1;
    requestQueryForGirisKontrol.pageSize = 6;
    $('#number-girisKontrol-pageNumber').text(requestQueryForGirisKontrol.pageNumber);
    GetgirisKontrolAjaxCall();
});

//#endregion



// #region


function DeleteKaliteKodu(index, stk, ref) {
    let mathced = girisKontrolList[index];
    if (mathced.kalitekodu === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'there is no kalite kodu to remove ',
            timer: 3000
        });
    }
    else {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: `'${mathced.kalitekodu}' silenecek!`,
            text: `'${mathced.kalitekodu}' silmek iseter misiniz?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Evet, sil !',
            cancelButtonText: 'Hayır , silme!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                ref = parseInt(ref);
                $.ajax({
                    type: "GET",
                    contentType: "application/json;charset=utf-8",
                    url: BaseUrl + `EtiketlerGetData/DeleteKaliteKodu?irsRef=${ref}&&stk=${stk}`,
                    success: (num) => {
                        if (num !== 0) {
                            GetAllCompanyAjaxCall();
                            GetAllCompanyCount();
                            Swal.fire({
                                title: 'Başarılı!',
                                text: 'kalite kodu Başarı ile Silendi',
                                type: 'success',
                                timer: 1500
                            });
                            GetgirisKontrolAjaxCall();
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
}
//#endregion