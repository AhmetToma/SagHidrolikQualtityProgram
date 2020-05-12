function tamirIsEmriCiktisiHazirla(tamirIsEmriModel) {
    let tableBody = "";
    if (tamirIsEmriModel.tamir1.ProsesAdi !== "")
        tableBody = `<tr>
            <td>${tamirIsEmriModel.tamir1.ProsesAdi}</td>
            <td>${tamirIsEmriModel.tamir1.processName}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>`;
    if (tamirIsEmriModel.tamir2.ProsesAdi !== "")
        tableBody += `<tr>
            <td>${tamirIsEmriModel.tamir2.ProsesAdi}</td>
            <td>${tamirIsEmriModel.tamir2.processName}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>`;
    if (tamirIsEmriModel.tamir3.ProsesAdi !== "")
        tableBody += `<tr>
            <td>${tamirIsEmriModel.tamir3.ProsesAdi}</td>
            <td>${tamirIsEmriModel.tamir3.processName}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>`;

    if (tamirIsEmriModel.tamir4.ProsesAdi !== "")
        tableBody += `<tr>
            <td>${tamirIsEmriModel.tamir4.ProsesAdi}</td>
            <td>P${tamirIsEmriModel.tamir4.processName}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>`;
    let cikti = `<div class="tamirIsEmriCiktis">
    <div class="first-header">
        <div class="my_firstRow">
            <div class="one">
                <img src="${BaseUrl}images/tamirLogo.png" />
                <p>Parça No/PartNo:</p>
                <h5>${tamirIsEmriModel.stk}</h5>
            </div>
            <div class="two">
                <p class="rew">Tamir/Rework</p>
                <div class="p1_p2">
                    <div class="p1">Rev:</div>
                    <div class="p2"><p>0</p></div>
                </div>
                <svg id="newLotNoBarcode" class="p3"></svg>
            </div>
            <div class="three">
                <div class="lot">
                    <p>Lot/Batch No:</p>
    <p>${tamirIsEmriModel.newLotNo}</p>


                </div>
                <div class="tarih">
                      <p>tarih:</p>
    <p>${tamirIsEmriModel.tarih}</p>
                </div>
                <div class="adet">
                    <p>Adet/Qty:</p>
                    <p>${tamirIsEmriModel.tamirMiktari}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="clear">
    </div>
    <div class="second-body">
        <h3>Tamir LotNo:${tamirIsEmriModel.lotNo} <span></span></h3>
        <table>
            <thead>
                <tr>
                    <td>Proses Adı</td>
                    <td>Process Name</td>
                    <td>tarih</td>
                    <td>Miktar</td>
                    <td>Red</td>
                    <td>Operator</td>
                </tr>
            </thead>'
            <tbody>

                  ${tableBody}
                <tr>
                    <td>Basınç Testi</td>
                    <td>Pressure Test</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                </tr>
              <tr>
                    <td>Paketleme</td>
                    <td>Packaging</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                </tr>
    
            </tbody>
        </table>
    </div>
</div>`;

    console.log(tamirIsEmriModel.newLotNo);
  
    return cikti;
}