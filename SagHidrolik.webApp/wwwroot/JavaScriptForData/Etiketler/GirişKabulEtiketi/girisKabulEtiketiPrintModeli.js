function girisKabulEtiketi_A4Zirve(girisKabulEtiketiModel, paketlemeMiktari, sira) {

        
    let A4Zirve = `<div class="containqA4">
            <div class="containq1">
                <img src="/images/stokA4.png" alt="">
            </div>
            <div class="containq2">
                <div class="containq2-1">
                    <span>STOK KARTI</span>
                </div>
                <div class="containq2-2">
                   <svg class="girisKabulEtiketi_stkBarcode"></svg>
                </div>
            </div>
            <div class="containq3">
            <p>${girisKabulEtiketiModel.stk}</p>
                <p>${girisKabulEtiketiModel.stokgensta}</p>
            </div>
            <div class="containq4">
                <div class="containq4-1"></div>
                <div class="containq4-3">

                    <p style="font-weight:bold">KALITE KONTROL :</p>
                    <span>${girisKabulEtiketiModel.kalitekodu}</span>
                </div>
            </div>
            <div class="containq5">
                <div class="containq5-1">
                    <p>Lot:</p>
                </div>
                <div class="containq5-2"><span>Adres</span></div>
                <div class="containq5-3">
                    <p>${girisKabulEtiketiModel.tarih.slice(0, -9)}/${sira}</p>
                </div>
                <div class="containq5-4">
<span>${girisKabulEtiketiModel.fielD18} / ${girisKabulEtiketiModel.fielD19}</span></div>
                <div class="containq5-5"><span>${paketlemeMiktari}</span></div>
                <div class="containq5-6"><span>Adet</span></div>
                <div style="border:none" class="containq5-7">
                    <svg class="girisKabulEtiketi_adet"></svg>
                </div>
            </div>
        </div>
        <hr class="seprator" /> 
`;
    return A4Zirve;
}