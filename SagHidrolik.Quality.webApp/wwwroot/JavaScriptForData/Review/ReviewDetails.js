$(function () {

    let dataUrl = "/Home/ReviewDetails";
    if (window.location.pathname === dataUrl) {
        ShowLoader();
        GetAllClaim(`${Inputs.reviewDetails_selectNcType}`);
        GetAllCompany(`${Inputs.reviewDetails_cusSup}`);
        GetAllDepartment(`${Inputs.reviewDetails_department}`);
        GetAllProcess(`${Inputs.reviewDetails_process}`);
        GetAllPartNumbers(`${Inputs.reviewDetails_partNo}`);
        GetAllOperator(`${Inputs.reviewDetails_openBy}`, `${Inputs.reviewDetails_responsible}`);
        GetReviewDetails();
        $(Inputs.reviewDetails_openDate).datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $(Inputs.reviewDetails_targetDate).datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $(Inputs.reviewDetails_closeDate).datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $(".limitedNumbSelect2").select2({
            maximumSelectionLength: 1,
            placeholder: "Seçiniz"
        })


    }
});
let ncModel = {};

function GetReviewDetails() {
    let ncId = window.localStorage.getItem('reviewDetails');
    $("select").val(null).trigger("change");
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetReviewDetails + ncId,
        success: (model) => {
            console.log(model);
            ncModel = model;
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
                $(Inputs.reviewDetails_openDate).val(model.nC_OpenDate.slice(0, -11));
            }
            if (model.nC_CloseDate !== null) {
                $(Inputs.reviewDetails_closeDate).val(model.nC_CloseDate.slice(0, -11));

            }
            if (model.nC_TargetDate !== null) {
            $(Inputs.reviewDetails_targetDate).val(model.nC_TargetDate.slice(0, -11));

            }



            $(Inputs.reviewDetails_conformity).val(model.nonConformity);
            $(Inputs.reviewDetails_analaysis).val(model.nC_RootCauseAnalysis);
            $(Inputs.reviewDetails_description).val(model.nc_desc2);



        }
    });
}

// #region radio button for activity Type
$('input[type=radio][name=reviewRadio]').change(function () {
    $(this).siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': '#28a745', 'opacity': '1' });
    $('input[type="radio"]:not(:checked)').siblings('.state').find('label').css({ 'font-weight': 'bold', 'color': 'black', 'opacity': '1' });
    //if ($(this).val() === 'Corrective') newNcModel.activityType = 1;
    //if ($(this).val() === 'Preventative') newNcModel.activityType = 2;
    //if ($(this).val() === 'Repetitive') newNcModel.activityType = 3;
});
//#endregion