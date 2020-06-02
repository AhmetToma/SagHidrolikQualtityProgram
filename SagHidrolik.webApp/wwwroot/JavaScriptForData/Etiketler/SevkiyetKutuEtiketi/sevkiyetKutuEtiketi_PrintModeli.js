
function sevkiyetKutuEtiketiSetEtiket(sevkiyatKabulEtiketiModel,pakletlemeMiktari,sira,lastRowAdet){

let sevkiyetKutuEtiketi_etiket_100_150 = `
<div class="contain">
        <div class="div1">
            <img src="/images/sevKutu_logo.png" alt="">
        </div>
        <div class="div2">
            <div class="div1-1"><span style="margin-left: 10px;">Part No:</span></div>
            <div class="div1-2"><span>Rev:</span></div>
            <div class="div1-3">
               <p>${sevkiyatKabulEtiketiModel.stk}</p>
                   <svg class="sevkiyatKutuEtiketi_stkBarcode"></svg>
              
                <div class="div1-4"><span>A</span></div>
            </div>
            <div class="div1-5"><span>Customer</span>:</div>
            <div class="div1-6">
                <P>${sevkiyatKabulEtiketiModel.carigen_sta}</P>
              <p>${sevkiyatKabulEtiketiModel.adresi}</p>
            </div>
        </div>
        <div class="div3">
            <div class="div3-1"><span>Quantity:</span></div>
            <div class="div3-2">
                <span>${pakletlemeMiktari}</span>
                <svg class="sevkiyatKutuEtiketi_adetBarcode"></svg>
            </div>
            <div class="div3-3"><span style="margin-left: 10px;">Date:</span></div>
            <div class="div3-4"><span>${sevkiyatKabulEtiketiModel.tarih.slice(0, -9)}/${sira}</span></div>
            <div class="div3-5"><span style="margin-left: 10px;">Order#:</span></div>
            <div class="div3-6"><span>${sevkiyatKabulEtiketiModel.sipevrakno}</span></div>
        </div>
    </div>
`;
    return sevkiyetKutuEtiketi_etiket_100_150;
}