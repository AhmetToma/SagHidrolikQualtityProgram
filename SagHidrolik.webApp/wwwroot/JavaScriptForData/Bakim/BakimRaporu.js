$(function () {

    let u = BaseUrl + "Home/BakimRaporu";
    if (window.location.href === u) {
        GetBakimRaporuAjaxCall();
    }
});


// #region Ajax call ,Create Table
function GetBakimRaporuAjaxCall() {
    ShowLoader();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetBakimRaporu,
        success: (list) => {
            if (list.length !== 0) {

                console.log(list);
                $(recordsNotFound.bakimOzeti).css('display', 'none');
           CreateBakimRaporuTable(list, TablesId.bakimOzeti);
            }
            else {
                $(`${recordsNotFound.bakimOzeti} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.bakimOzeti).css('display', 'block');
                HideLoader();
            }
        }
    });
}

function CreateBakimRaporuTable(list) {
   // $('#table-bakimRaporu-headers').empty();
    $('#table-bakimRaporu-body').empty();
    if (list.length > 0) {
        let m = list[0];
        let headerKeys = Object.keys(list[0]);

        let totalOfRequireQty = 0;
        list.map((element, index) => {
            for (let i = 0; i < headerKeys.length; i++) {
                if (headerKeys[i] !== 'yil' && headerKeys[i] !== 'BakimTipi') {
                    totalOfRequireQty += element[headerKeys[i]] ? element[headerKeys[i]] : 0;
                }
            }
            $('#table-bakimRaporu-body').append(`
<tr>
    <td>${element.yil}</td>
    <td>${element.BakimTipi}</td>
    <td>${totalOfRequireQty}</td>
    <td>${element['01'] ? element['01']:""}</td>
    <td>${element['02'] ? element['02'] : ""}</td>
    <td>${element['03'] ? element['03'] : ""}</td>
    <td>${element['04'] ? element['04'] : ""}</td>
    <td>${element['05'] ? element['05'] : ""}</td>
    <td>${element['06'] ? element['06'] : ""}</td>
    <td>${element['07'] ? element['07'] : ""}</td>
    <td>${element['08'] ? element['08'] : ""}</td>
    <td>${element['09'] ? element['09'] : ""}</td>
    <td>${element['10'] ? element['10'] : ""}</td>
    <td>${element['11'] ? element['11'] : ""}</td>
    <td>${element['12'] ? element['12'] : ""}</td>
             </tr>
`);

            totalOfRequireQty = 0;
        });
    }


}



//#endregion 









//function CreateBakimRaporuTable(list) {
//    $('#table-bakimRaporu-headers').empty();
//    $('#table-bakimRaporu-body').empty();
//    if (list.length > 0) {
//        let m = list[0];
//        let headerKeys = Object.keys(list[0]);
//        let headers = "";
//        for (let i = 0; i < headerKeys.length; i++) {
//            if (headerKeys[i] !== 'yil' && headerKeys[i] !== 'BakimTipi') {
//                headers += `<th scope="col">${headerKeys[i]}</th>`;
//            }
//        }
//        console.log(headerKeys);
//        $('#table-bakimRaporu-headers').append(`
//   <tr>
//                            <th scope="col">Yıl</th>
//            <th scope="col">Bakım Tipi</th>
//           <th scope="col">Total Of Makine Id</th>
//${headers}
//                        </tr>`);

//        let dataWithTime = "";
//        let totalOfRequireQty = 0;
//        list.map((element, index) => {
//            for (let i = 0; i < headerKeys.length; i++) {
//                if (headerKeys[i] !== 'yil' && headerKeys[i] !== 'BakimTipi') {
//                    dataWithTime += `<td >${element[headerKeys[i]] ? element[headerKeys[i]] : ""}</td>`;
//                    totalOfRequireQty += element[headerKeys[i]] ? element[headerKeys[i]] : 0;
//                }

//            }
//            $('#table-bakimRaporu-body').append(`
//<tr>
//    <td>${element.yil}</td>
//    <td>${element.BakimTipi}</td>
//    <td>${totalOfRequireQty}</td>
//${dataWithTime}
//             </tr>
//`);

//            dataWithTime = "";
//            totalOfRequireQty = 0;
//        });
//    }


//}








