
$('')
// start Arama
var typingTimer;
var doneTypingInterval = 500;
let searcedValue = $("#inp-stokSearch");
$('#inp-stokSearch').keyup(function () {
    //$([document.documentElement, document.body]).animate({
    //    scrollTop: $(".container-stok").offset().top
    //}, 500);
       $('#table-stokRecetesi').empty();
    $('#table-altStok').empty();
    $('#table-StokDetailsFirst').empty();
    $('#table-uretim').empty();
    $('#table-Galvanize').empty();
    $('#table-bomProcess').empty();
    $('#myTabContent').css('opacity', '0');
    $('#stokDetailsContainer').css('opacity', '0');
    $('.urunImage').css('opacity', '0');
    $('#toscrolo').css('opacity', '0');
    $('.mixContainer').css('opacity', '0');
    $('#listOfAllStokLinksInStok').css('opacity', '0');

    clearTimeout(typingTimer);
    if ($('#inp-stokSearch').val()) {
        localStorage.setItem('searchedStk', searcedValue.val());
        localStorage.setItem('stkTableId', TablesId.Stok_searchStkInStokgen);
        typingTimer = setTimeout(searchStok, doneTypingInterval);
    }
    else if ($('#inp-stokSearch').val() === '') {
        localStorage.setItem('searchedStk', '');
        localStorage.setItem('stkTableId', '');
        $(TablesId.Stok_searchStkInStokgen).empty();
      
    }
});
//user is "finished typing," do something
function searchStok() {
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(localStorage.getItem('searchedStk')),
        url: HttpUrls.getStokByStk,
        success: (list) => {
            console.log(list);
            creatStokgenTable(list, localStorage.getItem('stkTableId'));
        }
    });
}
function creatStokgenTable(list, tableId) {
    $(tableId).empty();
    if (list !== null && list.length>0) {
        list.map((element, index) => {
            if (element.field18 === null) element.field18 = " ";
            if (element.field19 === null) element.field19 = " ";
            $(tableId).append(`
<tr id="${element.stk}" data-id="${element.stk}" data-p_ID=${element.p_ID}>
  <td>${element.stk}</td>
    <td>${element.sta}</td>
    <td>${element.field18} / ${element.field19}</td>
                    </tr>
`);
        });
    }
    else {
        $(tableId).append(`
          <div class="stokgeNotFoundResult"> <p>aradığınız stk'a ait hiç bir sonuç Bulunmamaktadır</p> </div>`);
    }
    HideLoader();
}
$(TablesId.Stok_searchStkInStokgen).on('click', 'tr', function () {
  
    var stk = $(this).data('id');
    var pId = $(this).data('p_id');
    $('.urunImage').css('opacity', '1');
    $('#toscrolo').css('opacity', '1');
    GetAllstokData_recete_uretim(stk, pId);
    $('.mixContainer').css('opacity', '1');
    $('#listOfAllStokLinksInStok').css('opacity', '1');
    $('#stokDetailsContainer').css('opacity', '1');
});
// end  Arama 

 //click on row to get data
function GetAllstokData_recete_uretim(stk, pId) {
    ShowLoader();
    GetProductionOrders(stk, pId);
    getStokDetailsSecondTable(stk, pId);
    getAltStokToplam(stk);
    GetproductFile(pId);
    GetGalvanize(stk);
    getStokRecetesi(stk, pId);
    GetBomProcessList(stk, pId);
    ProcessFlowInStok(stk);
    GetproductImage(stk);
    $('#myTabContent').fadeTo(1500, 1);
    $('#stokDetailsContainer').css('opacity', '1');

}
function GetproductFile(pid) {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetproductFile + pid,
        success: (file) => {

            if (file.length !== 0) {
                $(recordsNotFound.Dosyalar).css('display', 'none');

                $('#dosyalar').empty();
                file.map((ele, index) => {
                    let dosyaLinK = ele.dosyaadi;
                    return $('#dosyalar').append(`
<a style="background-color:black;color:white" target="_blank"    class="btn btn-success" href="${BaseUrl}StokGetData/OpenFileFromServer?filePath=${dosyaLinK}">Dosya ${index + 1} - ${dosyaLinK.slice(dosyaLinK.length - 3).toUpperCase()}</a>
`);
                });
            }
            else {
                $('#dosyalar').empty();
                $(`${recordsNotFound.Dosyalar} h3`).text('Hiç Bir dosya Bulunmamaktadır');
                $(recordsNotFound.Dosyalar).css('display', 'block');
            }
        }
    });
}
function openFile(dosyaLink) {
    var link = `${BaseUrl}StokGetData/OpenFileFromServer?filePath=` + dosyaLink;
    window.open(link);
}
function getAltStokToplam(stk) {

    $.getJSON(HttpUrls.GetaltStokToplam + stk).done((res) => {
        if (res === null) res = 0;
        $('#toplamAltStokNumber').text(res);
    });
}
function GetproductImage(stk) {
    $('.urunImage').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetproductImage + `${stk}`,
        success: (productImage) => {
            let imageUrl = productImage.imageUrl;
            let imageFormat = imageUrl.slice((imageUrl.length - 3)).toLowerCase();
            console.log('prod',productImage);
            if (imageUrl!=="") {
                if (imageFormat == 'tif') {
                    $('.urunImage').append(` target="_blank" href="${BaseUrl}StokGetData/OpenFileFromServer?filePath=${imageUrl}"
a style="opacity:0" id="tifImage" class="btn btn-primary">Image-Tif</a>`)
                }
                else {
                    $('.urunImage').append(`<img onclick="openModal()" src="${BaseUrl}StokGetData/OpenFileFromServer?filePath=${imageUrl}" />`)
                    $('#openModelImage').attr('src', `${BaseUrl}StokGetData/OpenFileFromServer?filePath=${imageUrl}`);
                }
            }
            else  {
                $('.urunImage').append(`<h3>resim bulunmamaktadır</h3>`);
            }

            //if (imageUrl ==='')
            //{
            //    $('.urunImage').css('opacity', '0');
            //}
            //else if (imageFormat == 'tif') {
            //    $('.urunImage').css('opacity', '1');
            //    $('#tifImage').css('opacity', '1');
            //    $('#tifImage').attr('href', `${BaseUrl}StokGetData/OpenFileFromServer?filePath=${imageUrl}`);
            //    $('#tifImage').attr('target', '_blank');
            //}
            //else {
            //    $('.urunImage').css('opacity', '1');
            //    $('#tifImage').css('opacity', '0');
            //    $('.urunImage img').attr('src', `${BaseUrl}StokGetData/OpenFileFromServer?filePath=${imageUrl}`);
              
            //}
           
        }
    });
}
