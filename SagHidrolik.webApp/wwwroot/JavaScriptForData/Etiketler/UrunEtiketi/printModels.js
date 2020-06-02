
 //#region Dikey 20 *80
let dikey20_80Contnet = ` <div style="background-color:#B52E31; color:white" class="modal-header">
                <h5 >Dikey 20*80</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body printModal">
                <div class="row">
                    <div  id="dikey_20_80_printOut" class="col-md-4">
                        <div class="dikey_20_80">
                            <div class="co rotate co1">
                                <img src="${BaseUrl}/images/sag.jpg" alt="">
                            </div>
                            <div id="dikey_20_80_stk" class="co rotate co2"></div>
                            <div class="co rotate co3">
                                <div id="dikey_20_80_tarih"></div>
                                <div id="dikey_20_80_lotNo"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 urunEtiketiOzet">
                        <h4>Stk: <span id="sp-dikey_20_80_stk"></span> </h4>
                        <h4>Lotno:<span id ="sp-dikey_20_80_lotNo"></span>  </h4>
                        <h4>Tarih:<span id="sp-dikey_20_80_tarih"></span>  </h4>
                        <h4>Tür:<span>dikey</span>  </h4>
                        <h4>Boyut:<span>20*80</span> </h4>
                        <h4>Adet:<span id="sp-dikey_20_80_adet"></span> </h4>

                    </div>
                    <button id="dikey_20_80_yazdir"   onclick="printDikey_20_80()" class="btn btn-success btn-yazdir">Yazdır</button>
                </div>
                

            </div>`;


let yatay_20_60_ModelContent = ` <div style="background-color:#B52E31; color:white" class="modal-header">
                <h5>Yatay 30*60</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body printModal">
                <div class="row">
                    <div class="col-md-6">
                        <div class="des-yatay_30_60Table">
                            <div class="des-yatay_30_60stk">
                                <p id="yatay_30_60_stk"> </p>
                            </div>
                            <div class="des-yatay_30_60alt">
                                <div class="des-yatay_30_60altLeft">
                                    <p id="yatay_30_60_tarih" class="des-yatay_30_60altLeft_tarih"></p>
                                    <div class="row">
                                        <div class="des-yatay_30_60lot">
                                            <p> Lot# </p>
                                        </div>
                                        <div class="des-yatay_30_60lotNo">
                                            <p id="yatay_30_60_lotno">  </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="des-yatay_30_60altRight">
                                    <p id="yatay_30_60_etiketAdet">10</p>
                                    <span>AD</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 urunEtiketiOzet">
                        <h4>Stk: <span id="sp-yatay_30_60_stk"></span> </h4>
                        <h4>Lotno:<span id="sp-yatay_30_60_lotNo"></span>  </h4>
                        <h4>Tarih:<span id="sp-yatay_30_60_tarih"></span>  </h4>
                        <h4>Tür:<span>Yatay</span>  </h4>
                        <h4>Boyut:<span>30*60</span> </h4>
                        <h4>Adet:<span id="sp-yatay_30_60_adet"></span> </h4>
                    </div>
                    <button onclick="printYatat_30_60()" class="btn btn-success yatay_30_60_yazdir">Yazdır</button>
                </div>
                </div>`;

let tekil_20_80_ModelContent = `<div style="background-color:#B52E31; color:white" class="modal-header">
                <h5>Tekli 20*80</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body printModal">
                <div class="row">
                    <div id="tekli_20_80_printOut" class="col-md-5">
                        <div class="tekli_20_80">
                            <div id="tekli_20_80_stk" class="tekilCol1">1259354636</div>
                            <div class="tekilCol2">
                                <div id="tekli_20_80_tarih">10/19/2019</div>
                               
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7 urunEtiketiOzet">
                        <h4>Stk: <span id="sp-tekli_20_80_stk"></span> </h4>
                        <h4>Lotno: <span id="sp-tekli_20_80_lotNo"></span>  </h4>
                        <h4>Tarih: <span id="sp-tekli_20_80_tarih"></span>  </h4>
                        <h4>Tür: <span>tekli</span>  </h4>
                        <h4>Boyut: <span>20*80</span> </h4>
                        <h4>Adet:<span id="sp-tekli_20_80_adet"></span> </h4>
                    </div>
                    <button  onclick="printTekli_20_80()" class="btn btn-success btn-yazdir">Yazdır</button>
                </div>
            </div>`;



const dikey20_80_Object = {
    stk: "#dikey_20_80_stk",
    tarih: "#dikey_20_80_tarih",
    lotNo: "#dikey_20_80_lotNo",
    etiketAdet: "#sp-dikey_20_80_adet",
    sp_tarih: "#sp-dikey_20_80_tarih",
    sp_lotNo: "#sp-dikey_20_80_lotNo",
    sp_stk: "#sp-dikey_20_80_stk"

};
const yatay_30_60_Object = {
    stk: "#yatay_30_60_stk",
    tarih: "#yatay_30_60_tarih",
    lotNo: "#yatay_30_60_lotno",
    etiketAdet: "#yatay_30_60_etiketAdet",
    sp_tarih: "#sp-yatay_30_60_tarih",
    sp_lotNo: "#sp-yatay_30_60_lotNo",
    sp_stk: "#sp-yatay_30_60_stk",
    sp_adet: "#sp-yatay_30_60_adet"

};
const tekil_20_80_Object = {
    stk: "#tekli_20_80_stk",
    tarih: "#tekli_20_80_tarih",
    lotNo: "#tekli_20_80_lotno",
    etiketAdet: "#tekli_20_80_etiketAdet",
    sp_tarih: "#sp-tekli_20_80_tarih",
    sp_lotNo: "#sp-tekli_20_80_lotNo",
    sp_stk: "#sp-tekli_20_80_stk",
    sp_adet: "#sp-tekli_20_80_adet"
};
function setDikey_20_80_content(urunEtiketi) {
    $(dikey20_80_Object.etiketAdet).text(urunEtiketi.etiketAdet);
    $(dikey20_80_Object.sp_lotNo).text (urunEtiketi.lotNo);
    $(dikey20_80_Object.lotNo).text (urunEtiketi.lotNo);
    $(dikey20_80_Object.sp_stk).text (urunEtiketi.stk);
    $(dikey20_80_Object.stk).text (urunEtiketi.stk);
    $(dikey20_80_Object.sp_tarih).text(urunEtiketi.paketlemeTarihi);
    $(dikey20_80_Object.tarih).text(urunEtiketi.paketlemeTarihi);
    console.log(urunEtiketi);
}
function setYatay_30_60_content(urunEtiketi) {
    $(yatay_30_60_Object.etiketAdet).text(urunEtiketi.etiketAdet);
    $(yatay_30_60_Object.sp_lotNo).text(urunEtiketi.lotNo);
    $(yatay_30_60_Object.lotNo).text(urunEtiketi.lotNo);
    $(yatay_30_60_Object.sp_stk).text(urunEtiketi.stk);
    $(yatay_30_60_Object.stk).text(urunEtiketi.stk);
    $(yatay_30_60_Object.sp_tarih).text(urunEtiketi.paketlemeTarihi);
    $(yatay_30_60_Object.tarih).text(urunEtiketi.paketlemeTarihi);
    $(yatay_30_60_Object.sp_adet).text(urunEtiketi.etiketAdet);

}


function setTekil_30_60_content(urunEtiketi) {
    $(tekil_20_80_Object.etiketAdet).text(urunEtiketi.etiketAdet);
    $(tekil_20_80_Object.sp_lotNo).text(urunEtiketi.lotNo);
    $(tekil_20_80_Object.lotNo).text(urunEtiketi.lotNo);
    $(tekil_20_80_Object.sp_stk).text(urunEtiketi.stk);
    $(tekil_20_80_Object.stk).text(urunEtiketi.stk);
    $(tekil_20_80_Object.sp_tarih).text(urunEtiketi.paketlemeTarihi);
    $(tekil_20_80_Object.tarih).text(urunEtiketi.paketlemeTarihi);
    $(tekil_20_80_Object.sp_adet).text(urunEtiketi.etiketAdet);
}
// #endregion

// #region


//#endregion