function stokEtiketi_setUretimeSevk(stokEtiketiModel, paketlemeMiktari, tarih, sira) {


    let uretimSevkModel = `  <div class="containA4">
        <div class="contain1">
            <img src="/images/stokA4.png" alt="">
        </div>
        <div class="contain2">
            <div class="contain2-1">
                <span>Üretime Sevk</span>
            </div>
            <div class="contain2-2">
               <svg class="uretimeSevk_stkBarcode"></svg>
            </div>
        </div>
        <div class="contain3">
        <p>${stokEtiketiModel.stk}</p>
            <p>${stokEtiketiModel.sta}</p>
        </div>
        <div class="contain4">
            <div class="contain4-1"></div>
            <div class="contain4-2">
                <span>${tarih}</span>
                </div>
            <div class="contain4-3">
                <span>${tarih}/${sira}</span>
            </div>
        </div>
        <div class="contain5">
            <div class="contain5-1"></div>
            <div class="contain5-2"><span>Adres</span></div>
            <div class="contain5-3"></div>
            <div class="contain5-4"><span>${stokEtiketiModel.fielD18}/${stokEtiketiModel.fielD19}</span></div>
            <div class="contain5-5"><span>${paketlemeMiktari}</span></div>
            <div class="contain5-6"><span>Adet</span></div>
            <div style="border:none" class="contain5-7">
                <svg class="uretimeSevk_adet"></svg>
            </div>
        </div>
    </div>
    <hr class="seprator" />`;
    return uretimSevkModel;
}