let requetQueryForProcessFlowInStok  = {
    stk: "",
    pid: "",
    pageSize: 10,
    pageNumber: 1
};
function ProcessFlowInStok(stk) {
    requetQueryForProcessFlowInStok.stk = `${stk}`;
    requetQueryForProcessFlowInStok.pageNumber = 1;
    requetQueryForProcessFlowInStok.pageSize = 10;
    $(pageNumbers.stok_uretimInStok).text(requetQueryForProcessFlowInStok.pageNumber);
  GetFlowProcessAjaxCall();
}
$('#next-table-ProcessFlow').on('click', (event) => {
    ShowLoader();
    event.preventDefault();
    requetQueryForProcessFlowInStok.pageNumber += 1;
    $(pageNumbers.stok_uretimInStok).text(requetQueryForProcessFlowInStok.pageNumber);
    GetFlowProcessAjaxCall();
});
$('#previous-table-ProcessFlow').click((e) => {
    ShowLoader();
    e.preventDefault();
    if (requetQueryForProcessFlowInStok.pageNumber > 1)
        requetQueryForProcessFlowInStok.pageNumber -= 1;
    $(pageNumbers.stok_uretimInStok).text(requetQueryForProcessFlowInStok.pageNumber);
    GetFlowProcessAjaxCall();

});
function GetFlowProcessAjaxCall() {

    if (requestQueryForBomProcessInStok.pageNumber === 1) {
        disableButton('#previous-table-ProcessFlow');
        ActiveButton('#next-table-ProcessFlow');
    }
    else {
        ActiveButton('#previous-table-ProcessFlow');
        ActiveButton('#next-table-ProcessFlow');
    }
 
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetProcessFlowInStok,
        data: JSON.stringify(requetQueryForProcessFlowInStok),
        success: (list) => {
            if (list.length !== 0) {
  
                HideLoader();
                $('#table-uretim').empty();
                CreateFlowProcessTable(list, requetQueryForProcessFlowInStok.stk);
                $(recordsNotFound.uretimInStok).css('display', 'none');
            }
            else {
                disableButton('#next-table-ProcessFlow');
                ActiveButton('#previous-table-ProcessFlow');
                $('#table-uretim').empty();
                HideLoader();
                $(`${recordsNotFound.uretimInStok} h3`).text('Hiç Bir Kayit Bulunmamaktadır');
                $(recordsNotFound.uretimInStok).css('display', 'block');
            
            }
       
          
        }
    });

}
function CreateFlowProcessTable(list, stk) {
    HideLoader();
    $('#table-uretim').empty();
    if (list !== null) list.map((element, index) => {

        element.lotNo ? element.lotNo = element.lotNo : element.lotNo = "";
        element.miktar ? element.miktar = element.miktar : element.miktar = "";
        element.require_Date ? element.require_Date = element.require_Date : element.require_Date = "";
        $('#table-uretim').append(`
<tr>
  <td>${stk}</td>
    <td>${element.lotNo}</td>
    <td>${element.prosesAdi} </td>
  <td>${element.miktar} </td>
 <td>${element.require_Date} </td>

             </tr>
`);
    });
  
    
}


