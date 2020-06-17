let acceptedTransfer = [];
function CreateTranferWoTable(list, tableId, isModel) {
    $('#stk').empty();
    $('#qty').empty();
    $('#requireDate').empty();
    $('#issueDate').empty();
    let stkEmpty = [];
    let qtyEmpty = [];
    let issueDateEmpy = [];
    let requireDateEmpty = [];

    $(tableId).empty();
    list.map((element, index) => {

        if (isNaN(element.qty)) {
            qtyEmpty.push(element);
} 
     
     
        else if (element.stk === "" || element.stk === undefined) stkEmpty.push(element);
        else if (element.issueDate === "" || element.issueDate === undefined) issueDateEmpy.push(element);
        else if (element.requireDate === "" || element.requireDate === undefined) requireDateEmpty.push(element);
        else {
            if (typeof (element.qty) === "string") element.qty = parseInt(element.qty);
            element.stk = element.stk.toString();
            acceptedTransfer.push(element);
            $(tableId).append(`
<tr >
  <td>${element.stk} </td>
  <td>${element.qty} </td>
  <td>${element.issueDate} </td>
  <td>${element.requireDate} </td>
  <td>${element.remark} </td>
  <td>${element.control ? element.control : ""} </td>
             </tr>
`);
        }
    });


    if (isModel) {
        CreateNonAcceptedReocrdsInTranferWo(stkEmpty, 'stk');
        CreateNonAcceptedReocrdsInTranferWo(qtyEmpty, 'qty');
        CreateNonAcceptedReocrdsInTranferWo(issueDateEmpy, 'issueDate');
        CreateNonAcceptedReocrdsInTranferWo(requireDateEmpty, 'requireDate');
        $('#tranferWo-summary').modal('show');
    }

}

function CreateNonAcceptedReocrdsInTranferWo(list, id) {
    if (list.length > 0) {
        list.map((element) => {
            $(`#${id}`).append(`
<p style="color:black"> STK : ${element.stk} , QTY: ${element.qty} , issue Date : ${element.issueDate} , Require Date :  ${element.requireDate}</p>
`)
        })
    }
}

//#region  Clear 
$('#btn-tranferWo-deleteAll').click((e) => {
    e.preventDefault();

    Swal.fire({
        title: `All Records`,
        text: `All Records will delete? `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {

            $(TablesId.tranferWo).empty();
        //    location.reload();
        }
    })
})

//#endregion


//#region Tranfer 
$('#btn-tranferWo-addAndTransfer').click((e) => {
    e.preventDefault();
    Swal.fire({
        title: `Transfer And Clear`,
        text: `Are you Sure? `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
    }).then((result) => {
        if (result.value) {
            if (acceptedTransfer.length === 0) {
                Swal.fire({
                    type: 'error',
                    title: "..Ops",
                    text: `there is no records to tranfer`,
                    timer: 3500
                });
            }
            else {
                ShowLoader();
                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(acceptedTransfer),
                    url: HttpUrls.TrnasferWoToSystem,
                    success: (list) => {
                        HideLoader()
                        if (list === 'empty' || list.length === 0)
                            Swal.fire({
                                type: 'error',
                                title: "Ops..",
                                text: `no records has been added`,
                                timer: 3500
                            });
                        else {
                            Swal.fire({
                                type: 'success',
                                title: "Done!",
                                text: `${list.length} records has been added rest records Have issues`,

                            });
                            let stkList = [];
                            for (let i = 0; i < list.length; i++) {
                                stkList.push(list[i].stk);
                            }
                            for (let i = 0; i < stkList.length; i++) {
                                acceptedTransfer.map((el, index) => {
                                    if (stkList[i] === el.stk) acceptedTransfer.splice(index, 1);
                                })
                            }
                            $(TablesId.tranferWo).empty();
                            CreateTranferWoTable(acceptedTransfer, TablesId.tranferWo, false);
                            acceptedTransfer = [];

                        }
                    }
                });
            }
        }
    })
})
//#endregion



//#region upload Excel File
$('#btn-tranferWo-addExcleFile').click((event) => {

    event.preventDefault();
    $('#inp-tranferWo-excelFile').trigger('click');

});

$('#inp-tranferWo-excelFile').change((e) => {
    selectedFile = event.target.files[0];
    if (selectedFile) {
        acceptedTransfer = [];
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary", cellDates: true });
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { raw: false, dateNF: 'DD/MM/YYYY' });
                CreateTranferWoTable(rowObject, TablesId.tranferWo, true);
            });
        }
    }
});


//#endregion 