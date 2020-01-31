$(function () {

    let dataUrl = "/Home/ReviewDetails";
    if (window.location.pathname === dataUrl) {

        $(".limitedNumbSelect2").select2({
            maximumSelectionLength: 1,
            placeholder: "Seçiniz"
        })
        ShowLoader();
        GetAllClaim(`${Inputs.reviewDetails_selectNcType}`);
        GetAllCompany(`${Inputs.reviewDetails_cusSup}`);
        GetAllDepartment(`${Inputs.reviewDetails_department}`);
        GetAllProcess(`${Inputs.reviewDetails_process}`);
        GetAllPartNumbers(`${Inputs.reviewDetails_partNo}`);
        GetAllOperator(`${Inputs.reviewDetails_openBy}`);
        GetAllOperator(`${Inputs.reviewDetails_responsible}`);
        GetAllOperator('#inp-reviewDetails-edit-responsible');
        GetReviewDetails();
        GetAllActionAjaxCall();
        GetDocumnetListAjaxCall();
        GetDocumentControlAjaxCall();
        $(Inputs.reviewDetails_openDate).datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $(Inputs.reviewDetails_targetDate).datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $(Inputs.reviewDetails_closeDate).datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $(Inputs.reviewDetails_addImmediateAction_targetDate).datepicker({
            dateFormat: 'dd/mm/yy'
        }); $(Inputs.reviewDetails_addImmediateAction_closeDate).datepicker({
            dateFormat: 'dd/mm/yy'
        });

        $("#inp-reviewDetails-edit-closeDate").datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $("#inp-reviewDetails-edit-targetDate").datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $("#inp-reviewDetails-add-changeDate").datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $("#inp-reviewDetails-edit-changeDate").datepicker({
            dateFormat: 'dd/mm/yy'
        });

        // $('#reviewDetails-summaryModel').modal('show');
    }
});
let genelBilgiler = {};
let updatedGeneBilgiler = {};

let actionCounter = 100000;
let actionList = [];
let actionModel = {};

//window.addEventListener("beforeunload", function (e) {
//    var confirmationMessage = "\o/";

//    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//    return confirmationMessage;                            //Webkit, Safari, Chrome
//});



// #region  Genel Bilgiler and Date


function GetReviewDetails() {
    let ncId = window.localStorage.getItem('reviewDetails');
    $("select").val(null).trigger("change");
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetReviewDetails + ncId,
        success: (model) => {
            console.log(model);
            genelBilgiler = { ...model };
            genelBilgiler.nC_CloseDate = genelBilgiler.nC_CloseDate.slice(0, -12) 
            genelBilgiler.nC_TargetDate = genelBilgiler.nC_TargetDate.slice(0, -12) 
            genelBilgiler.nC_OpenDate = genelBilgiler.nC_OpenDate.slice(0, -12); 


            updatedGeneBilgiler = { ...genelBilgiler };

            $(`${Inputs.reviewDetails_partNo} option[value='${model.partNo}']`).remove();
            $(Inputs.reviewDetails_partNo).append(`
      <option value="${model.partNo}">${model.stk}</option>
`)
            let radioValue = "";
            if (model.correctiveAction === 1) radioValue = 'correctiveAction'
            if (model.repetitive === 1) radioValue = 'repetitive'
            if (model.preventativeAction === 1) radioValue = 'preventativeAction'
            $("[name=reviewRadio]").val([`${radioValue}`]);
            $('input[type=radio][name=reviewRadio]').siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': '#28a745', 'opacity': '1' });
            $('input[type="radio"]:not(:checked)').siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': 'black', 'opacity': '1' });
            $(Inputs.reviewDetails_ncID).val(ncId);
            $(Inputs.reviewDetails_def).val(model.nC_Id_Def);
            $(Inputs.reviewDetails_qty).val(model.qty);
            $(Inputs.reviewDetails_selectNcType).val(model.ncTypeId).trigger('change');
            $(Inputs.reviewDetails_cusSup).val(model.companyId).trigger('change');
            $(Inputs.reviewDetails_department).val(model.departmentId).trigger('change');
            $(Inputs.reviewDetails_process).val(model.processId).trigger('change');
            $(Inputs.reviewDetails_partNo).val(model.partNo).trigger('change');
            $(Inputs.reviewDetails_openBy).val(model.openById).trigger('change');
            $(Inputs.reviewDetails_responsible).val(model.responsibleId).trigger('change');
            if (model.nC_OpenDate !== null) {
                $(Inputs.reviewDetails_openDate).val(model.nC_OpenDate.slice(0, -12));
            }
            if (model.nC_CloseDate !== null) {
                $(Inputs.reviewDetails_closeDate).val(model.nC_CloseDate.slice(0, -12));

            }
            if (model.nC_TargetDate !== null) {
                $(Inputs.reviewDetails_targetDate).val(model.nC_TargetDate.slice(0, -12));

            }
            $(Inputs.reviewDetails_conformity).val(model.nonConformity);
            $(Inputs.reviewDetails_analaysis).val(model.nC_RootCauseAnalysis);
            $(Inputs.reviewDetails_description).val(model.nc_desc2);
        }
    });
}

// #endregion


// #region radio button for activity Type
$('input[type=radio][name=reviewRadio]').change(function () {
    $(this).siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': '#28a745', 'opacity': '1' });
    $('input[type="radio"]:not(:checked)').siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': 'black', 'opacity': '1' });
    //if ($(this).val() === 'Corrective') newNcModel.activityType = 1;
    //if ($(this).val() === 'Preventative') newNcModel.activityType = 2;
    //if ($(this).val() === 'Repetitive') newNcModel.activityType = 3;
});
//#endregion



// #region Action read,delete,add and edit
function GetAllActionAjaxCall() {
    let ncId = window.localStorage.getItem('reviewDetails');
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetImmediateAction + ncId,
        success: (list) => {
            $(TablesId.reviewDetails_immdiateAction).empty();
            actionList = list;
            createActionList(list);
        }
    });
}
function createActionList(list) {
    $(TablesId.reviewDetails_immdiateAction).empty();
    let closeDate = "", targetDate = "", status = "", actionType = "";
    list.map((element, index) => {
        element.closeDate ? closeDate = element.closeDate : closeDate = '';
        element.targetDate ? targetDate = element.targetDate : targetDate = '';
        element.status ? status = 'fa  fa-2x fa-check-circle text-success' : status = 'fa fa-2x fa-ban';
        element.action_Type === 1 ? actionType = "Immediate Action" : actionType = "Permanent Action";

        $(TablesId.reviewDetails_immdiateAction).append(`
          <tr >

                        <td>${actionType}</td>
                        <td>${element.resposibleName} </td>
                        <td>${element.actin_Def}</td>
                        <td> ${targetDate.slice(0, -11)}</td>
                        <td>${closeDate.slice(0, -11)}</td>
                        <td><i class="${status}" aria-hidden="true"></i></td>
                        <td id='actinoId${element.actN_ID}' onclick="editAction(${element.actN_ID})"><i class="fa fa-2x fa-pencil text-primary"> </i> </td>
                        <td id='actinoId${element.actN_ID}' onclick="deleteImmediateAction(${element.actN_ID})"><i class="fa  fa-2x fa-trash text-danger"> </i> </td>
                    </tr>
`);
    })
}
// delete action
function deleteImmediateAction(id) {
    let actinoId = `#actinoId${id}`;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${id}' id'si olan action ' silenecek!`,
        text: `'${id}' id'si olan action silmek iseter misiniz?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil !',
        cancelButtonText: 'Hayır , silme!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $(actinoId).parent().remove();
            Swal.fire({
                type: 'success',
                title: "başarıyle action silindi",
                timer: 1500
            });
        }
    });
}

// add action
$(Buttons.reviewDetails_addImmediateAction).click((event) => {
    event.preventDefault();
    $('#select-reviewDetails-add-actionType').val("");
    $('#inp-reviewDetails-add-actionDef').val("");
    $('#inp-reviewDetails-add-targetDate').val("")
    $('#inp-reviewDetails-add-closeDate').val("");
    $('#inp-reviewDetails-add-responsible').select2('val', '');
    $("#inp-reviewDetails-add-status").prop("checked", false);
    $('#actionList-Add').modal('show');
    GetAllOperator(`${Inputs.reviewDetails_addImmediateAction_resposible}`);
});
$(Buttons.reviewDetails_confrimAddAction).click((event) => {
    event.preventDefault();
    let actionType = $('#select-reviewDetails-add-actionType').val();
    let actionDef = $('#inp-reviewDetails-add-actionDef').val();
    let targetDate = `${$('#inp-reviewDetails-add-targetDate').val()} 00:00:00 00`;
    let closeDate = `${$('#inp-reviewDetails-add-closeDate').val()} 00:00:00 00`;
    let status;
    $('#inp-reviewDetails-add-status').is(':checked') ? status = true : status = false;
    let seletedResponsibleId = $('#inp-reviewDetails-add-responsible');
    let select_val = seletedResponsibleId.val();
    let data = $('#inp-reviewDetails-add-responsible').select2('data');
    let selectedResponsibleName = data[0].text;
    if (actionType === '') {
        Swal.fire({
            type: 'error',
            title: 'Action Type !',
            text: " Action Type Seçmeniz gerekiyor"
        });
    }
    else if (actionDef === '') {
        Swal.fire({
            type: 'error',
            title: 'Action Def!',
            text: "Action Def Seçmeniz gerekiyor"
        });
    }
    else if (targetDate === '') {
        Swal.fire({
            type: 'error',
            title: 'target Date!',
            text: "targetDate! Seçmeniz gerekiyor"
        });
    }

    else {
        actionCounter++;
        let addedActionObject = {
            action_Type: parseInt(actionType),
            responsibleId: select_val,
            resposibleName: selectedResponsibleName,
            targetDate: targetDate,
            closeDate: closeDate,
            status: status,
            actin_Def: actionDef,
            actN_ID: actionCounter
        };
        actionList.push(addedActionObject);
        createActionList(actionList);
        Swal.fire({
            type: 'success',
            title: "başarıyle action eklendi",
            timer: 1500
        });
        $('#actionList-Add').modal('hide');
    }
});


// edit Action
function editAction(ActionId) {

    let selectedModel = actionList.filter((ele) => {
        return ActionId === ele.actN_ID
    });

    if (selectedModel.length !== 0) {
        selectedModel = selectedModel[0];
        $('#select-reviewDetails-edit-actionType').val(selectedModel.action_Type);
        $('#inp-reviewDetails-edit-actionDef').val(selectedModel.actin_Def);
        $('#inp-reviewDetails-edit-targetDate').val(selectedModel.targetDate.slice(0, -11))
        $('#inp-reviewDetails-edit-closeDate').val(selectedModel.closeDate.slice(0, -11));
        $('#inp-reviewDetails-edit-responsible').val(`${selectedModel.responsibleId}`).trigger('change');
        selectedModel.status ? $("#inp-reviewDetails-edit-status").prop("checked", true) : $("#inp-reviewDetails-edit-status").prop("checked", false);
        $('#actionList-edit').modal('show');
        actionModel = selectedModel;
    }

}


$(Buttons.reviewDetails_confrimEditAction).click((event) => {
    event.preventDefault();
    let actionType = $('#select-reviewDetails-edit-actionType').val();
    let actionDef = $('#inp-reviewDetails-edit-actionDef').val();
    let targetDate = `${$('#inp-reviewDetails-edit-targetDate').val()} 00:00:00 00`;
    let closeDate = `${$('#inp-reviewDetails-edit-closeDate').val()} 00:00:00 00`;
    let status;
    $('#inp-reviewDetails-edit-status').is(':checked') ? status = true : status = false;
    let seletedResponsibleId = $('#inp-reviewDetails-edit-responsible');
    let select_val = seletedResponsibleId.val();
    let data = $('#inp-reviewDetails-edit-responsible').select2('data');
    let selectedResponsibleName = data[0].text;
    if (actionType === '') {
        Swal.fire({
            type: 'error',
            title: 'Action Type !',
            text: " Action Type Seçmeniz gerekiyor"
        });
    }
    else if (actionDef === '') {
        Swal.fire({
            type: 'error',
            title: 'Action Def!',
            text: "Action Def Seçmeniz gerekiyor"
        });
    }
    else if (targetDate === '') {
        Swal.fire({
            type: 'error',
            title: 'target Date!',
            text: "targetDate! Seçmeniz gerekiyor"
        });
    }

    else {


        actionList = actionList.filter((ele) => {
            return ele !== actionModel;
        })

        let updatedModel = {
            action_Type: parseInt(actionType),
            responsibleId: select_val,
            resposibleName: selectedResponsibleName,
            targetDate: targetDate,
            closeDate: closeDate,
            status: status,
            actin_Def: actionDef,
            actN_ID: actionCounter
        };
        actionList.push(updatedModel);
        createActionList(actionList);
        Swal.fire({
            type: 'success',
            title: "başarıyle action düzeltildi",
            timer: 1500
        });
        $('#actionList-edit').modal('hide');
    }
});


//#endregion



//#region Document List
let documentList = [];
let documentModel = {};

function GetDocumnetListAjaxCall() {
    let ncId = window.localStorage.getItem('reviewDetails');
    $(TablesId.reviewDetails_document).empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetDocumnetList + ncId,
        success: (list) => {
            documentList = list;
            list.map((element) => {
                CreateDocumentTable(element);
            });
        }
    });
}


function CreateDocumentTable(element) {
    $(TablesId.reviewDetails_document).append(`
<tr>
<td>   <a  style="color:black; font-weight:bold" target="_blank"  href="${BaseUrl}ReviewGetData/openDocument?documentLink=${element.documentLink}">${element.documentLink}</a></td>
<td>
 <a href="${BaseUrl}ReviewGetData/openDocument?documentLink=${element.documentLink}" target="_blank"  >

<i class="fa  fa-2x fa-folder-open text-success"></i>
</a> 
</td>
<td id="documentId${element.document_ID}" onclick="deleteDocument(${element.document_ID})" ><i class="fa  fa-2x fa-trash text-danger"> </i></td>
<tr>
</tr>
`)
}

function deleteDocument(documentId) {
    let doc = `#documentId${documentId}`
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${documentId}' id'si olan document ' silenecek!`,
        text: `'${documentId}' id'si olan document silmek iseter misiniz?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil !',
        cancelButtonText: 'Hayır , silme!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $(doc).parent().remove();
            Swal.fire({
                type: 'success',
                title: "başarıyle document silindi",
                timer: 1500
            });
        }
    });
}




// add document 

$(Buttons.reviewDetails_addDocument).click((event) => {

    event.preventDefault();
    $('#document-input').trigger('click');
});
$('#document-input').change(function () {
    let ncId = window.localStorage.getItem('reviewDetails');
    let documentPath = $(this).val();
    actionCounter++;
    let documentModel = {
        document_ID: actionCounter,
        nC_ID: ncId,
        documentLink: documentPath
    }
    CreateDocumentTable(documentModel);
    Swal.fire({
        type: 'success',
        title: "başarıyle action eklendi",
        timer: 1500
    });
})
//#endregion



// #region Document Control 
let documentControlList = [];
let documentControlModel = {};
function GetDocumentControlAjaxCall() {
    let ncId = window.localStorage.getItem('reviewDetails');

    $(TablesId.reviewDetails_documentControl).empty();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetDocumentControlList + ncId,
        success: (list) => {
            documentControlList = list;
            if (list.length !== 0) {

                list.map((element) => {
                    CreateDocumentControlTable(element);
                });
            }
            else {
                $(TablesId.reviewDetails_documentControl).parent().parent().append(`


<h3 style="text-align:center;color:black" > Hiç bir kayıt bulunmamaktadır </h3>

`);
            }

        }
    });
}


function CreateDocumentControlTable(element) {

    Object.keys(element).map((e) => {
        element[e] ? element[e] = element[e] : element[e] = '';
    });
    $(TablesId.reviewDetails_documentControl).append(`
<tr>

<td>${element.documentType}</td>
<td>${element.changeDate.slice(0, -11)}</td>
<td>${element.newRev}</td>
<td>${element.notes}</td>
<td id="documentControlId${element.id}" onclick="deleteDocumentControl(${element.id})" ><i class="fa  fa-2x fa-trash text-danger"> </i></td>

      <td  id="updatedDocument${element.id}" onclick="editDocumentControl(${element.id})"><i class="fa fa-2x fa-pencil text-primary"> </i> </td>
</tr>


`
    );
}
// delete document control

function deleteDocumentControl(documentControlId) {
    let docConId = `#documentControlId${documentControlId}`
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `'${documentControlId}' id'si olan document control ' silenecek!`,
        text: `'${documentControlId}' id'si olan document control silmek iseter misiniz?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil !',
        cancelButtonText: 'Hayır , silme!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $(docConId).parent().remove();
            Swal.fire({
                type: 'success',
                title: "başarıyle document control silindi",
                timer: 1500
            });
        }
    });
}

// add documnet control 

$('#btn-reviewDetails-addDocumentType').click((e) => {
    e.preventDefault();
    $('#documentControl-Add').modal('show');
    $('#form-add-documentControl').trigger('reset');
});

$('#btn-reviewDetails-add-confirmAddControlType').click((e) => {
    e.preventDefault();
    let ncId = window.localStorage.getItem('reviewDetails');
    let documentControlType = $('#select-reviewDetails-add-documentControlType').val();
    let changeDate = ` ${$('#inp-reviewDetails-add-changeDate').val()} 00:00:00 00`;
    let newRev = $('#inp-reviewDetails-add-newRev').val();
    let notes = $('#inp-reviewDetails-add-notes').val();
    if (documentControlType === '') {
        Swal.fire({
            type: 'error',
            title: 'Document type !',
            text: " Action Type Seçmeniz gerekiyor"
        });
    }
    else if (changeDate === '') {
        Swal.fire({
            type: 'error',
            title: 'Change Date!',
            text: "Change Date Seçmeniz gerekiyor"
        });
    }

    else {
        actionCounter++;
        let addedDocumentControlObject = {
            id: actionCounter,
            nC_ID: ncId,
            documentType: documentControlType,
            changeDate: changeDate,
            newRev: newRev,
            notes: notes,
        };
        documentControlList.push(addedDocumentControlObject);
        CreateDocumentControlTable(addedDocumentControlObject);
        Swal.fire({
            type: 'success',
            title: "başarıyle Document Control eklendi",
            timer: 1500
        });
        $('#documentControl-Add').modal('hide');
    }
})



function editDocumentControl(documentControlId) {
    let selectedModel = documentControlList.filter((ele) => {
        return documentControlId === ele.id
    });

    if (selectedModel.length !== 0) {
        selectedModel = selectedModel[0];
        documentControlModel = selectedModel;
        $('#select-reviewDetails-edit-documentControlType').val(selectedModel.documentType);
        $('#inp-reviewDetails-edit-changeDate').val(selectedModel.changeDate.slice(0, -11));
        $('#inp-reviewDetails-edit-notes').val(selectedModel.notes);
        $('#inp-reviewDetails-edit-newRev').val(selectedModel.newRev);
        $('#documentControl-edit').modal('show');
    }
}

$('#btn-reviewDetails-edit-confirmAddControlType').click((event) => {
    event.preventDefault();

    let ncId = window.localStorage.getItem('reviewDetails');
    let documentControlType = $('#select-reviewDetails-edit-documentControlType').val();
    let changeDate = ` ${$('#inp-reviewDetails-add-changeDate').val()} 00:00:00 00`;
    let newRev = $('#inp-reviewDetails-edit-newRev').val();
    let notes = $('#inp-reviewDetails-edit-notes').val();
    if (documentControlType === '') {
        Swal.fire({
            type: 'error',
            title: 'Document type !',
            text: " Action Type Seçmeniz gerekiyor"
        });
    }
    else if (changeDate === '') {
        Swal.fire({
            type: 'error',
            title: 'Change Date!',
            text: "Change Date Seçmeniz gerekiyor"
        });
    }

    else {
        documentControlList = documentControlList.filter((ele) => {
            return ele !== documentControlModel;
        });

        let updatedDocumentControlObject = {
            id: actionCounter,
            nC_ID: ncId,
            documentType: documentControlType,
            changeDate: changeDate,
            newRev: newRev,
            notes: notes,
        };
        documentControlList.push(updatedDocumentControlObject);
        $(`#updatedDocument${documentControlModel.id}`).parent().remove();
        CreateDocumentControlTable(updatedDocumentControlObject);
        Swal.fire({
            type: 'success',
            title: "başarıyle Document Control eklendi",
            timer: 1500
        });
        $('#documentControl-edit').modal('hide');
    }

})
//#endregion





// #region Saving to database

$('#btn-reviewDetails-savingToDataBase').click((event) => {
    event.preventDefault();
    let farkarry = new Array();
    let m = {
        k: null,
        v: null
    };
    updatedGeneBilgiler.nC_Id_Def = $(Inputs.reviewDetails_def).val();
    updatedGeneBilgiler.qty = parseInt($(Inputs.reviewDetails_qty).val());
    let activityType = $("[name=reviewRadio]:checked").val();
    if (activityType === 'repetitive') {
        updatedGeneBilgiler.repetitive = 1;
        updatedGeneBilgiler.correctiveAction = 0;
        updatedGeneBilgiler.preventativeAction = 0;
    }
    if (activityType === 'correctiveAction') {
        updatedGeneBilgiler.repetitive = 0;
        updatedGeneBilgiler.correctiveAction = 1;
        updatedGeneBilgiler.preventativeAction = 0;
    }
    if (activityType === 'preventativeAction') {
        updatedGeneBilgiler.repetitive = 0;
        updatedGeneBilgiler.correctiveAction = 0;
        updatedGeneBilgiler.preventativeAction = 1;
    }
    //responsible
    let selectedNcType = $(Inputs.reviewDetails_selectNcType);
    let select_val = selectedNcType.val();
    let selectedNcTypeName;
    let data = $(Inputs.reviewDetails_selectNcType).select2('data');
    if (data.length !== 0) {
     
        selectedNcTypeName = data[0].text;
        selectedNcTypeName = selectedNcTypeName.split('---');
        updatedGeneBilgiler.ncTypeId = parseInt(select_val[0]);
        updatedGeneBilgiler.typeNameTr = selectedNcTypeName[0];
        updatedGeneBilgiler.typeName = selectedNcTypeName[1];
    }
    else {
        updatedGeneBilgiler.typeNameTr = "";
        updatedGeneBilgiler.typeName = "";
        updatedGeneBilgiler.ncTypeId = 0;

    }

    //customer supplier


    let selectedCompany = $(Inputs.reviewDetails_cusSup);
     selectedCompany = selectedCompany.val();
    let selectedCompanyName;
    let data2 = $(Inputs.reviewDetails_cusSup).select2('data');
    if (data2.length !== 0) {
        selectedCompanyName = data2[0].text;
        selectedCompanyName = selectedCompanyName.split('---');
        updatedGeneBilgiler.companyId = parseInt(selectedCompany[0]);
        updatedGeneBilgiler.companyName = selectedCompanyName[0];
        updatedGeneBilgiler.companyType = selectedCompanyName[1];
        console.log(updatedGeneBilgiler.companyName, updatedGeneBilgiler.companyType);
    }
    else {
        updatedGeneBilgiler.companyId = 0;
        updatedGeneBilgiler.companyName = "";
        updatedGeneBilgiler.companyType = 0;
    }




    // date 

    updatedGeneBilgiler.nC_CloseDate = $(Inputs.reviewDetails_closeDate).val()
    updatedGeneBilgiler.nC_OpenDate = $(Inputs.reviewDetails_openDate).val()
    updatedGeneBilgiler.nC_TargetDate = $(Inputs.reviewDetails_targetDate).val()



    Object.keys(updatedGeneBilgiler).map((key) => {

        if (updatedGeneBilgiler[key] !== genelBilgiler[key]) {
            m.k = key;
            m.v = updatedGeneBilgiler[key];
            farkarry.push(m);
            m = {};
        }
    })

   console.log(farkarry);





});


//#endregion