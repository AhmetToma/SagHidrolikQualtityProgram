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
        GetReviewDetails();
    }
});
let genelBilgiler = {};
let updatedGeneBilgiler = {};
let sc = 0;

let actionModel = {};

//window.addEventListener("beforeunload", function (e) {
//    var confirmationMessage = "\o/";

//    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//    return confirmationMessage;                            //Webkit, Safari, Chrome
//});

$(window).scroll(function () {
    if (sc!==0) {
        setReviewDetails();
        sc = 0;
        HideLoader();
    }
});



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

            if (genelBilgiler.nC_CloseDate !== null) genelBilgiler.nC_CloseDate = genelBilgiler.nC_CloseDate.slice(0, -12) 
            if (genelBilgiler.nC_TargetDate !== null) genelBilgiler.nC_TargetDate = genelBilgiler.nC_TargetDate.slice(0, -12) 
            if (genelBilgiler.nC_OpenDate !== null) genelBilgiler.nC_OpenDate = genelBilgiler.nC_OpenDate.slice(0, -12) 

            genelBilgiler.nC_RootCauseAnalysis ? genelBilgiler.nC_RootCauseAnalysis = genelBilgiler.nC_RootCauseAnalysis : genelBilgiler.nC_RootCauseAnalysis = "";
            genelBilgiler.nonConformity ? genelBilgiler.nonConformity = genelBilgiler.nonConformity : genelBilgiler.nonConformity = "";
            genelBilgiler.nc_desc2 ? genelBilgiler.nc_desc2 = genelBilgiler.nc_desc2 : genelBilgiler.nc_desc2 = "";
            updatedGeneBilgiler = { ...genelBilgiler };
            setReviewDetails();
            HideLoader();

        }
    });
}



function setReviewDetails() {
    let ncId = window.localStorage.getItem('reviewDetails');

    if (genelBilgiler !== null) {
        $(`${Inputs.reviewDetails_partNo} option[value='${genelBilgiler.partNo}']`).remove();
        $(Inputs.reviewDetails_partNo).append(`
      <option value="${genelBilgiler.partNo}">${genelBilgiler.stk}</option>
`)
        let radioValue = "";
        if (genelBilgiler.correctiveAction === 1) radioValue = 'correctiveAction'
        if (genelBilgiler.repetitive === 1) radioValue = 'repetitive'
        if (genelBilgiler.preventativeAction === 1) radioValue = 'preventativeAction'
        $("[name=reviewRadio]").val([`${radioValue}`]);
        $('input[type=radio][name=reviewRadio]').siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': '#28a745', 'opacity': '1' });
        $('input[type="radio"]:not(:checked)').siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': 'black', 'opacity': '1' });
        $(Inputs.reviewDetails_ncID).val(ncId);
        $(Inputs.reviewDetails_def).val(genelBilgiler.nC_Id_Def);
        $(Inputs.reviewDetails_qty).val(genelBilgiler.qty);
        $(Inputs.reviewDetails_selectNcType).val(genelBilgiler.ncTypeId).trigger('change');
        $(Inputs.reviewDetails_cusSup).val(genelBilgiler.companyId).trigger('change');
        $(Inputs.reviewDetails_department).val(genelBilgiler.departmentId).trigger('change');
        $(Inputs.reviewDetails_process).val(genelBilgiler.processId).trigger('change');
        $(Inputs.reviewDetails_partNo).val(genelBilgiler.partNo).trigger('change');
        $(Inputs.reviewDetails_openBy).val(genelBilgiler.openById).trigger('change');
        $(Inputs.reviewDetails_responsible).val(genelBilgiler.responsibleId).trigger('change');
        if (genelBilgiler.nC_OpenDate !== null) {
            $(Inputs.reviewDetails_openDate).val(genelBilgiler.nC_OpenDate);
        }
        if (genelBilgiler.nC_CloseDate !== null) {
            $(Inputs.reviewDetails_closeDate).val(genelBilgiler.nC_CloseDate);

        }
        if (genelBilgiler.nC_TargetDate !== null) {
            $(Inputs.reviewDetails_targetDate).val(genelBilgiler.nC_TargetDate);

        }

        $(Inputs.reviewDetails_conformity).val(genelBilgiler.nonConformity);
        $(Inputs.reviewDetails_analaysis).val(genelBilgiler.nC_RootCauseAnalysis);
        $(Inputs.reviewDetails_description).val(genelBilgiler.nc_desc2);

        sc=1
    }
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
            console.log(list);
        }
    });
}
function createActionList(list) {
  
    $(TablesId.reviewDetails_immdiateAction).empty();
    let closeDate = "", targetDate = "", status = "", actionType = "", resposibleName="";
    list.map((element, index) => {
        element.closeDate ? closeDate = element.closeDate : closeDate = '';
        element.targetDate ? targetDate = element.targetDate : targetDate = '';
        element.resposibleName ? resposibleName = element.resposibleName : resposibleName = '';
        element.status ? status = 'fa  fa-2x fa-check-circle text-success' : status = 'fa fa-2x fa-ban';
        element.action_Type === 1 ? actionType = "Immediate Action" : actionType = "Permanent Action";

        $(TablesId.reviewDetails_immdiateAction).append(`
          <tr >

                        <td>${actionType}</td>
                        <td>${resposibleName} </td>
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
let actionList = [];
let deletedActionList = [];
let AddedActionList = [];
let EditActionList = [];
function deleteImmediateAction(id) {
    
    console.log(actionList);
    console.log(id);
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
            $.ajax({
                type: "POST",
                url: HttpUrls.DeleteAction+id,
                success: (num) => {
                    GetAllActionAjaxCall();
                    Swal.fire({
                        type: 'success',
                        title: "başarıyle action silindi",
                        timer: 1500
                    });
                }
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
    let ncId = window.localStorage.getItem('reviewDetails');
    event.preventDefault();
    let actionType = $('#select-reviewDetails-add-actionType').val();
    let actionDef = $('#inp-reviewDetails-add-actionDef').val();
    let targetDate = $('#inp-reviewDetails-add-targetDate').val();
    let closeDate = $('#inp-reviewDetails-add-closeDate').val();
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

        let addedActionObject = {
            action_Type: parseInt(actionType),
            responsibleId: parseInt(select_val[0]),
            resposibleName: selectedResponsibleName,
            targetDate: targetDate,
            closeDate: closeDate,
            status: status,
            actin_Def: actionDef,
            nC_ID: ncId
        };
        $.ajax({
            type: "POST",
            url: HttpUrls.AddAction,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(addedActionObject),
            success: (num) => {
                Swal.fire({
                    type: 'success',
                    title: "başarıyle action eklendi",
                    timer: 1500
                });
                GetAllActionAjaxCall();
                $('#actionList-Add').modal('hide');
            },
            error: () => {
                Swal.fire({
                    type: 'error',
                    title: "beklenmeyen bir hata oluştu",
                    timer: 1500
                });
                $('#actionList-Add').modal('hide');

            }
        });
   
 
     
       
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
    let ncId = window.localStorage.getItem('reviewDetails');
    let actionType = $('#select-reviewDetails-edit-actionType').val();
    let actionDef = $('#inp-reviewDetails-edit-actionDef').val();
    let targetDate = $('#inp-reviewDetails-edit-targetDate').val();
    let closeDate = $('#inp-reviewDetails-edit-closeDate').val();
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
        let updatedModel = {
            action_Type: parseInt(actionType),
            responsibleId: parseInt(select_val[0]),
            resposibleName: selectedResponsibleName,
            targetDate: targetDate,
            closeDate: closeDate,
            status: status,
            actin_Def: actionDef,
            nC_ID: ncId,
            actN_ID: actionModel.actN_ID
        };

        $.ajax({
            type: "POST",
            url: HttpUrls.UpdateAction,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(updatedModel),
            success: (num) => {
                Swal.fire({
                    type: 'success',
                    title: "başarıyle action düzeltildi",
                    timer: 1500
                });
                $('#actionList-edit').modal('hide');
                GetAllActionAjaxCall();

            },
            error: () => {
                Swal.fire({
                    type: 'error',
                    title: "beklenmeyen bir hata oluştu",
                    timer: 1500
                });
                $('#actionList-edit').modal('hide');

            }
        });



     
 
        actionList.push(updatedModel);
        EditActionList.push(updatedModel);
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
let DeleletedDocumentList = [];
let AddedDocumentList = [];

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
    console.log(element);
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

// deleted document
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


            $.ajax({
                type:"POST",
                url: HttpUrls.DeleteDocument + documentId,
                success: (num) => {
                    console.log(num);
                    GetDocumnetListAjaxCall();
                    Swal.fire({
                        type: 'success',
                        title: "başarıyle document silindi",
                        timer: 1500
                    });
                }
            })
           
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
    if (documentPath !== '') {

        let documentModel = {
            nC_ID: ncId,
            documentLink: documentPath,
        }
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.AddDocument,
            data: JSON.stringify(documentModel),
            success: () => {
                Swal.fire({
                    type: 'success',
                    title: "başarıyle action eklendi",
                    timer: 1500
                });
                GetDocumnetListAjaxCall();
            }
        });
    }
})
//#endregion



// #region Document Control 
let documentControlList = [];
let AddedDocumentControlList = [];
let DeletedDocumentControlList = [];
let EditDocumentControlList = [];
let documentControlModel = {};
let conDocCounter = 100000;
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
            $.ajax({
                type: "Get",
                url: HttpUrls.DeleteDocumentControl + documentControlId,
                contentType: "application/json;charset=utf-8",
                success: (num) => {
                    Swal.fire({
                        type: 'success',
                        title: "başarıyle Document Control Silindi",
                        timer: 1500
                    });
                    GetDocumentControlAjaxCall();
                },
                error: () => {
                    Swal.fire({
                        type: 'error',
                        title: "beklenmeyen bir hata oluştu",
                        timer: 1500
                    });
                }
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
    let changeDate = ` ${$('#inp-reviewDetails-add-changeDate').val()}`;
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
        
        let addedDocumentControlObject = {
            nC_ID: ncId,
            documentType: documentControlType,
            changeDate: changeDate,
            newRev: newRev,
            notes: notes,
        };
        $.ajax({
            type: "POST",
            url: HttpUrls.AddDocumentControl,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(addedDocumentControlObject),
            success: (num) => {
                Swal.fire({
                    type: 'success',
                    title: "başarıyle document control eklendi",
                    timer: 1500
                });
                GetDocumentControlAjaxCall();
                $('#documentControl-Add').modal('hide');
            },
            error: () => {
                Swal.fire({
                    type: 'error',
                    title: "beklenmeyen bir hata oluştu",
                    timer: 1500
                });
                $('#documentControl-Add').modal('hide');

            }
        });
    }
})


// edit document control
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
    let changeDate = $('#inp-reviewDetails-edit-changeDate').val();
    let newRev = $('#inp-reviewDetails-edit-newRev').val();
    let notes = $('#inp-reviewDetails-edit-notes').val();
    if (documentControlType === '') {
        Swal.fire({
            type: 'error',
            title: 'Document type !',
            text: " documnet Type Seçmeniz gerekiyor"
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
            id: documentControlModel.id,
            nC_ID: ncId,
            documentType: documentControlType,
            changeDate: changeDate,
            newRev: newRev,
            notes: notes
        };
        $.ajax({
            type: "POST",
            url: HttpUrls.UpdateDocumentControl,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(updatedDocumentControlObject),
            success: (num) => {
                Swal.fire({
                    type: 'success',
                    title: "başarıyle Document control düzeltildi",
                    timer: 1500
                });
                GetDocumentControlAjaxCall();
                $('#documentControl-edit').modal('hide');

            },
            error: () => {
                Swal.fire({
                    type: 'error',
                    title: "beklenmeyen bir hata oluştu",
                    timer: 1500
                });
                $('#documentControl-edit').modal('hide');
            }
        });
        $('#documentControl-edit').modal('hide');
    }
})
//#endregion





// #region Saving to database

$('#btn-reviewDetails-savingToDataBase').click((event) => {
    $('#genel').empty();
    $('#date').empty();
    $('#Description').empty();
    $('#Action').empty();
   // $('#Document').empty();
    $('#DocumentControl').empty();


    event.preventDefault();
    let farkarry = new Array();
    let m = {
        k: null,
        v: null
    };

        // #region genel bilgiler
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
    let selectedId = $(Inputs.reviewDetails_selectNcType);
    selectedId = selectedId.val();
    let selectedName;
    let data = $(Inputs.reviewDetails_selectNcType).select2('data');
    if (data.length !== 0) {
     
        selectedName = data[0].text;
        selectedName = selectedName.split('---');
        updatedGeneBilgiler.ncTypeId = parseInt(selectedId[0]);
        updatedGeneBilgiler.typeNameTr = selectedName[0];
        updatedGeneBilgiler.typeName = selectedName[1];
    }
    else {
        updatedGeneBilgiler.typeNameTr = "";
        updatedGeneBilgiler.typeName = "";
        updatedGeneBilgiler.ncTypeId = 0;

    }

    //customer supplier
    selectedId = $(Inputs.reviewDetails_cusSup);
    selectedId = selectedId.val();
     data = $(Inputs.reviewDetails_cusSup).select2('data');
    if (data.length !== 0) {
         selectedName = data[0].text;
        selectedName = selectedName.split('---');
        updatedGeneBilgiler.companyId = parseInt(selectedId[0]);
        updatedGeneBilgiler.companyName = selectedName[0];
        updatedGeneBilgiler.companyType = selectedName[1];
    }

    else {
        updatedGeneBilgiler.companyId = 0;
        updatedGeneBilgiler.companyName = "";
        updatedGeneBilgiler.companyType = "";
    }

    // Department
    selectedId = $(Inputs.reviewDetails_department);
    selectedId = selectedId.val();
    data = $(Inputs.reviewDetails_department).select2('data');
    if (data.length !== 0) {
        selectedName = data[0].text;
        selectedName = selectedName.split(' --- ');
        updatedGeneBilgiler.departmentId = parseInt(selectedId[0]);
        updatedGeneBilgiler.departmentName = selectedName[0];
        updatedGeneBilgiler.depatrmentTr = selectedName[1];

    }

    else {
        updatedGeneBilgiler.departmentId = 0;
        updatedGeneBilgiler.departmentName = "";
        updatedGeneBilgiler.depatrmentTr = "";
    }



    // process
    selectedId = $(Inputs.reviewDetails_process);
    selectedId = selectedId.val();
    data = $(Inputs.reviewDetails_process).select2('data');
    if (data.length !== 0) {
        selectedName = data[0].text;
        updatedGeneBilgiler.processId = parseInt(selectedId[0]);
        updatedGeneBilgiler.processName = selectedName;
    }

    else {
        updatedGeneBilgiler.processId = 0;
        updatedGeneBilgiler.processName = "";
    }


    // PartNo
    selectedId = $(Inputs.reviewDetails_partNo);
    selectedId = selectedId.val();
    data = $(Inputs.reviewDetails_partNo).select2('data');
    if (data.length !== 0) {
        selectedName = data[0].text;
        updatedGeneBilgiler.partNo = parseInt(selectedId[0]);
        updatedGeneBilgiler.stk = selectedName;
    }

    else {
        updatedGeneBilgiler.partNo = 0;
        updatedGeneBilgiler.stk = "";
    }



    // Open By
    selectedId = $(Inputs.reviewDetails_openBy);
    selectedId = selectedId.val();
    data = $(Inputs.reviewDetails_openBy).select2('data');
    if (data.length !== 0) {
        selectedName = data[0].text;
        updatedGeneBilgiler.openById = parseInt(selectedId[0]);
        updatedGeneBilgiler.openByName = selectedName;
    }

    else {
        updatedGeneBilgiler.openById = 0;
        updatedGeneBilgiler.openByName = "";
    }


    // Resposible  
    selectedId = $(Inputs.reviewDetails_responsible);
    selectedId = selectedId.val();
    data = $(Inputs.reviewDetails_responsible).select2('data');
    if (data.length !== 0) {
        selectedName = data[0].text;
        updatedGeneBilgiler.responsibleId = parseInt(selectedId[0]);
        updatedGeneBilgiler.resbonsibleName = selectedName;
    }

    else {
        updatedGeneBilgiler.responsibleId = 0;
        updatedGeneBilgiler.resbonsibleName = "";
    }









    if (updatedGeneBilgiler.nC_Id_Def !== genelBilgiler.nC_Id_Def) {

        $('#genel').append(createSummaryOutputForGenelBilgiler('Nc Id Def ', genelBilgiler.nC_Id_Def, updatedGeneBilgiler.nC_Id_Def));
    }

    if (updatedGeneBilgiler.qty !== genelBilgiler.qty) {
        $('#genel').append(createSummaryOutputForGenelBilgiler('Qty', genelBilgiler.qty, updatedGeneBilgiler.qty));

    }

    if (updatedGeneBilgiler.correctiveAction !== genelBilgiler.correctiveAction) {
        $('#genel').append(createSummaryOutputForGenelBilgiler('Activity Type', 'Corrective', activityType));

    }
    else if (updatedGeneBilgiler.repetitive !== genelBilgiler.repetitive) {
        $('#genel').append(createSummaryOutputForGenelBilgiler('Activity Type', 'Repetitive', activityType))
    }
    else if (updatedGeneBilgiler.preventativeAction !== genelBilgiler.preventativeAction) {
        $('#genel').append(createSummaryOutputForGenelBilgiler('Activity Type', 'preventative', activityType));
    }

    if (updatedGeneBilgiler.ncTypeId !== genelBilgiler.ncTypeId) {
        $('#genel').append(createSummaryOutputForGenelBilgiler('Nc Type', `${genelBilgiler.typeNameTr}---${genelBilgiler.typeName}`, `${updatedGeneBilgiler.typeNameTr}---${updatedGeneBilgiler.typeName}`));
    }

    if (updatedGeneBilgiler.companyId !== genelBilgiler.companyId) {
        $('#genel').append(createSummaryOutputForGenelBilgiler('Customer Supplier', `${genelBilgiler.companyName}---${genelBilgiler.companyType}`, `${updatedGeneBilgiler.companyName}---${updatedGeneBilgiler.companyType}`));
    }

    if (updatedGeneBilgiler.departmentId !== genelBilgiler.departmentId) {
        $('#genel').append(createSummaryOutputForGenelBilgiler('Department', `${genelBilgiler.departmentName}---${genelBilgiler.depatrmentTr}`, `${updatedGeneBilgiler.departmentName}---${updatedGeneBilgiler.depatrmentTr}`));
    }

    if (updatedGeneBilgiler.processId !== genelBilgiler.processId) {
        $('#genel').append(createSummaryOutputForGenelBilgiler('Process', `${genelBilgiler.processName}`, `${updatedGeneBilgiler.processName}`));
    }

    if (updatedGeneBilgiler.partNo !== genelBilgiler.partNo) {
        $('#genel').append(createSummaryOutputForGenelBilgiler('Part No', `${genelBilgiler.stk}`, `${updatedGeneBilgiler.stk}`));
    }

    if (updatedGeneBilgiler.openById !== genelBilgiler.openById) {
        $('#genel').append(createSummaryOutputForGenelBilgiler('Open By', `${genelBilgiler.openByName}`, `${updatedGeneBilgiler.openByName}`));
    }
    if (updatedGeneBilgiler.responsibleId !== genelBilgiler.responsibleId) {
        $('#genel').append(createSummaryOutputForGenelBilgiler('Responsible', `${genelBilgiler.resbonsibleName}`, `${updatedGeneBilgiler.resbonsibleName}`));
    }

    //#endregion


    // #region date 

    updatedGeneBilgiler.nC_CloseDate = $(Inputs.reviewDetails_closeDate).val()
    updatedGeneBilgiler.nC_OpenDate = $(Inputs.reviewDetails_openDate).val()
    updatedGeneBilgiler.nC_TargetDate = $(Inputs.reviewDetails_targetDate).val()

    if (updatedGeneBilgiler.nC_OpenDate !== genelBilgiler.nC_OpenDate) {
        $('#date').append(createSummaryOutputForGenelBilgiler('Open Date', `${genelBilgiler.nC_OpenDate}`, `${updatedGeneBilgiler.nC_OpenDate}`));

    }
    if (updatedGeneBilgiler.nC_TargetDate !== genelBilgiler.nC_TargetDate) {
        $('#date').append(createSummaryOutputForGenelBilgiler('target Date', `${genelBilgiler.nC_TargetDate}`, `${updatedGeneBilgiler.nC_TargetDate}`));
    }
    if (updatedGeneBilgiler.nC_CloseDate !== genelBilgiler.nC_CloseDate) {
        $('#date').append(createSummaryOutputForGenelBilgiler('Close Date', `${genelBilgiler.nC_CloseDate}`, `${updatedGeneBilgiler.nC_CloseDate}`));
    }
    //#endregion


    // #region Description 

    updatedGeneBilgiler.nonConformity = $(Inputs.reviewDetails_conformity).val()
    updatedGeneBilgiler.nc_desc2 = $(Inputs.reviewDetails_description).val()
    updatedGeneBilgiler.nC_RootCauseAnalysis = $(Inputs.reviewDetails_analaysis).val();


    if (updatedGeneBilgiler.nonConformity !== genelBilgiler.nonConformity) {
        $('#Description').append(createSummaryOutputForGenelBilgiler('non Conformity', `${genelBilgiler.nonConformity}`, `${updatedGeneBilgiler.nonConformity}`));
    }
    if (updatedGeneBilgiler.nc_desc2 !== genelBilgiler.nc_desc2) {
        $('#Description').append(createSummaryOutputForGenelBilgiler('Nc Description', `${genelBilgiler.nc_desc2}`, `${updatedGeneBilgiler.nc_desc2}`));
    }
    if (updatedGeneBilgiler.nC_RootCauseAnalysis !== genelBilgiler.nC_RootCauseAnalysis) {
        $('#Description').append(createSummaryOutputForGenelBilgiler('Root Cause Analysis', `${genelBilgiler.nC_RootCauseAnalysis}`, `${updatedGeneBilgiler.nC_RootCauseAnalysis}`));
    }


    //#endregion





    // #region Action

    if (deletedActionList.length > 0) {
        CreateSummaryOutputForAction('Deleted Actions','table-reviewDetails-summary-deletedAction');
        deletedActionList.map((el) => {
            ActionTableSummary(el,'#table-reviewDetails-summary-deletedAction');
        });
    }
    if (AddedActionList.length > 0) {
        CreateSummaryOutputForAction('Added Actions', 'table-reviewDetails-summary-AddedAction');
        AddedActionList.map((el) => {
            ActionTableSummary(el, '#table-reviewDetails-summary-AddedAction');
        });
    }
    if (EditActionList.length > 0) {
        CreateSummaryOutputForAction('Updated Actions', 'table-reviewDetails-summary-UpdatedAction');
        EditActionList.map((el) => {
            ActionTableSummary(el, '#table-reviewDetails-summary-UpdatedAction');
        });
    }
    // #endregion 



    //#region Document


    //#endregion

    if (AddedDocumentList.length > 0) {
        $('#Document').append(`<div><h3 id='h3_addedDocument'> Added Document</h3></div>`);

      
        AddedDocumentList.map((el) => {
            $('#h3_addedDocument').append(`
                            <p class="text-dark">${el.documentLink}</p>
`)
        });
    }

    if (DeleletedDocumentList.length > 0) {
        $('#Document').append(`<div><h3 id='h3_deletedDocument'> Deleted Document</h3></div>`);


        DeleletedDocumentList.map((el) => {
            $('#h3_deletedDocument').append(`
                            <p class="text-dark">${el.documentLink}</p>
`)
        });
    }
    // #region Document Control
    if (DeletedDocumentControlList.length > 0) {
        CreateSummaryOutputForDocumentControl('Deleted', 'table-reviewDetails-summary-deletedDocumentControl');
        DeletedDocumentControlList.map((el) => {
            DocuemtnControlTableSummary(el, '#table-reviewDetails-summary-deletedDocumentControl');
        });
    }

    if (AddedDocumentControlList.length > 0) {
        CreateSummaryOutputForDocumentControl('Added', 'table-reviewDetails-summary-addedDocumentControl');
        AddedDocumentControlList.map((el) => {
            DocuemtnControlTableSummary(el, '#table-reviewDetails-summary-addedDocumentControl');
        });
    }

    if (EditDocumentControlList.length > 0) {
        CreateSummaryOutputForDocumentControl('Updated', 'table-reviewDetails-summary-editDocumentControl');
        EditDocumentControlList.map((el) => {
            DocuemtnControlTableSummary(el, '#table-reviewDetails-summary-editDocumentControl');
        });
    }

    // #endregion 
    $('#reviewDetails-summaryModel').modal('show');
});



function createSummaryOutputForGenelBilgiler(title, oldValue, newValue)
{
    let output = ` <div>
                            <label class="demo-form-label h3">${title} : </label>
                            <p class="text-dark h5 lead">${oldValue}    &nbsp;&nbsp; <i class="fa   fa-arrow-right text-danger"></i> &nbsp;<i class="fa   fa-arrow-right text-danger"></i> &nbsp;&nbsp; ${newValue}</p>
                        </div>
                        <hr />
`;
    return output;
}

function CreateSummaryOutputForAction(title,tableId)
{
    $('#Action').append(`
  <div>
                            <h3>${title}</h3>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Action Type</th>
                                        <th scope="col">Resposible</th>
                                        <th scope="col">Action Def</th>
                                        <th scope="col">Target Date</th>
                                        <th scope="col">CloseDate</th>
                                        <th scope="col">Status</th>

                                    </tr>
                                </thead>
                                <tbody id="${tableId}">
                                </tbody>
                            </table>
                        </div>
`);
    console.log(tableId);
    $(`#${tableId}`).empty();
}

function ActionTableSummary(element,tableId) {
    let closeDate = "", targetDate = "", status = "", actionType = "";
        element.closeDate ? closeDate = element.closeDate : closeDate = '';
        element.targetDate ? targetDate = element.targetDate : targetDate = '';
        element.status ? status = 'fa  fa-2x fa-check-circle text-success' : status = 'fa fa-2x fa-ban';
        element.action_Type === 1 ? actionType = "Immediate Action" : actionType = "Permanent Action";

    $(tableId).append(`
          <tr >

                        <td>${actionType}</td>
                        <td>${element.resposibleName} </td>
                        <td>${element.actin_Def}</td>
                        <td> ${targetDate.slice(0, -11)}</td>
                        <td>${closeDate.slice(0, -11)}</td>
                        <td><i class="${status}" aria-hidden="true"></i></td>
                        
                    </tr>
`);
} 





function CreateSummaryOutputForDocumentControl(title, tableId) {
    $('#DocumentControl').append(`
  <div>
                            <h3>${title}</h3>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Document</th>
                                        <th scope="col">Change Date</th>
                                        <th scope="col">New Rev</th>
                                        <th scope="col">Notes</th>
                                    </tr>
                                </thead>
                                <tbody id="${tableId}">
                                </tbody>
                            </table>
                        </div>
`);
    $(`#${tableId}`).empty();
}
function DocuemtnControlTableSummary(element, tableId) {
    Object.keys(element).map((e) => {
        element[e] ? element[e] = element[e] : element[e] = '';
    });
    $(tableId).append(`
<tr>

<td>${element.documentType}</td>
<td>${element.changeDate.slice(0, -11)}</td>
<td>${element.newRev}</td>
<td>${element.notes}</td>
</tr>
`
    );
} 
$('#reviewDetails-summaryModel-confrimSave').click((e) => {
    e.preventDefault();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.SaveReviewDetalis,
        data: JSON.stringify(updatedGeneBilgiler),
        success: () => {
            Swal.fire({
                type: 'success',
                title: "başarıyle değişikler  veritabnına kayıtedildi",
                timer: 1500
            });
            $('#reviewDetails-summaryModel').modal('hide');
        },
        error: () => {
            Swal.fire({
                type: 'error',
                title: "Beklenmeyen bir hata oluştu",
                timer: 1500
            });
            $('#reviewDetails-summaryModel').modal('hide');

        }
    });
  

 
})
//#endregion




//#region Scroll 

$("#dcoControl").click(function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#scroll-DocumnetControl").offset().top
    }, 1500);
});

$("#gen").click(function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#scroll-GenelBilgiler").offset().top
    }, 1500);
});


$("#da").click(function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#scroll-Date").offset().top
    }, 1500);
});

$("#des").click(function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#scroll-Descrip").offset().top
    }, 1500);
});

$("#doc").click(function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#scroll-Document").offset().top
    }, 1500);
});

$("#act").click(function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#scroll-action").offset().top
    }, 1500);
});
// #endregion
