function stokEtiketi_setA4Mamul(message, stokEtiketiModel, paketlemeMiktari) {

    let emptyRowsForCifit = `
     <tr>
            <td></td>
            <td></td>
            <td></td>
            <td id='lastAdet'> ${paketlemeMiktari}</td>
            </tr>
`;

    let emptyRowsForTek = `
   <tr>
            <td></td>
            <td></td>
            <td></td>
            <td> ${paketlemeMiktari}</td>
            </tr>
`;
    for (var i = 0; i < 7; i++) {
        emptyRowsForCifit = emptyRowsForCifit + `
            <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
    `;

        emptyRowsForTek = emptyRowsForTek + `
            <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
    `;
    }
    let A4Mamulcifit = `
 <div class="stokEtiketi_A4Mamul-row">
        <div class="stokEtiketi_A4Mamul-container firstCopy">
            <div>
                <h3>Stok Kartı</h3>
            </div>
            <div class="stokEtiketi_A4Mamul-image">
                <img src="/images/stokEtiketiA4MamulLogo.png" />
            </div>

            <div class="stokEtiketi_A4Mamul-stk">
                <p>${stokEtiketiModel.stk}</p>
            </div>
            <p>REAR OIL SUCTION PIPE COMPLETE</p>
            <div class="stokEtiketi_A4Mamul-table">
                <table style="width:100%">


                    <tr>
                        <th>Tarih</th>
                        <th>Giriş</th>
                        <th>Çıkış</th>
                        <th>Stok</th>
                    </tr>
                   ${emptyRowsForCifit}
                </table>

                <div class="stokEtiketi_A4Mamul-footer">
                    <p>stok Adres :${stokEtiketiModel.fielD18}/ ${stokEtiketiModel.fielD19}</p>
                </div>
            </div>
        </div>
        <div class="stokEtiketi_A4Mamul-container secondCopy">
            <div>
                <h3>Stok Kartı</h3>
            </div>
            <div class="stokEtiketi_A4Mamul-image">
                <img src="/images/stokEtiketiA4MamulLogo.png" />
            </div>

            <div class="stokEtiketi_A4Mamul-stk">
                <p>23252598965</p>
            </div>
            <p>REAR OIL SUCTION PIPE COMPLETE</p>
            <div class="stokEtiketi_A4Mamul-table">
                <table style="width:100%">


                    <tr>
                        <th>Tarih</th>
                        <th>Giriş</th>
                        <th>Çıkış</th>
                        <th>Stok</th>
                    </tr>
                   ${emptyRowsForCifit}

                </table>

                <div class="stokEtiketi_A4Mamul-footer">
                    <p>stok Adres :${stokEtiketiModel.fielD18}/ ${stokEtiketiModel.fielD19}</p>

                </div>
            </div>
        </div>
    </div>
`;
    let A4MamulTek = `  <div class="stokEtiketi_A4Mamul-row">
        <div class="stokEtiketi_A4Mamul-container firstCopy">
            <div>
                <h3>Stok Kartı</h3>
            </div>
            <div class="stokEtiketi_A4Mamul-image">
                <img src="/images/stokEtiketiA4MamulLogo.png" />
            </div>

            <div class="stokEtiketi_A4Mamul-stk">
                <p>23252598965</p>
            </div>
            <p>REAR OIL SUCTION PIPE COMPLETE</p>
            <div class="stokEtiketi_A4Mamul-table">
                <table style="width:100%">


                    <tr>
                        <th>Tarih</th>
                        <th>Giriş</th>
                        <th>Çıkış</th>
                        <th>Stok</th>
                    </tr>
                   ${emptyRowsForTek}
                </table>

                <div class="stokEtiketi_A4Mamul-footer">
                                     <p>stok Adres :${stokEtiketiModel.fielD18}/ ${stokEtiketiModel.fielD19}</p>

                </div>
            </div>
        </div>
    </div>`;
    let result = "";
    message === 'cift' ? result = A4Mamulcifit : result = A4MamulTek;
    return result;
    }

