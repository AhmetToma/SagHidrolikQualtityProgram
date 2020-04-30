const BaseUrl = "https://localhost:44381/";

const BaseServerUrl = 'https://localhost:44381/';
const date = new Date();
const today = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " ";

const HttpUrls = {
    GetAllClaim: BaseUrl + "SetupGetData/GetAllClaim",
    GetAllClaimCount: BaseUrl + "SetupGetData/GetAllClaimCount",
    AddClaimType: BaseUrl + "SetupGetData/AddClaimType",
    DeleteClaimType: BaseUrl + "SetupGetData/DeleteClaimType?claimId=",
    UpdateClaimType: BaseUrl + "SetupGetData/UpdateClaimType",

    GetAllCompany: BaseUrl + "SetupGetData/GetAllCompany",
    GetAllCompanyCount: BaseUrl + "SetupGetData/GetAllCompanyCount",
    AddCompnay: BaseUrl + "SetupGetData/AddCompnay",
    DeleteCompany: BaseUrl + "SetupGetData/DeleteCompany?companyId=",
    UpdateCompany: BaseUrl + "SetupGetData/UpdateCompany",


    GetAllDepartments: BaseUrl + "SetupGetData/GetAllDepartments",
    GetAllDepartmentCount: BaseUrl + "SetupGetData/GetAllDepartmentCount",
    AddDepartment: BaseUrl + "SetupGetData/AddDepartment",
    DeleteDepartment: BaseUrl + "SetupGetData/DeleteDepartment?deptId=",
    UpdateDepartment: BaseUrl + "SetupGetData/UpdateDepartment",


    GetAllOperators: BaseUrl + "SetupGetData/GetAllOperators",
    GetAllOperatorsCount: BaseUrl + "SetupGetData/GetAllOperatorsCount",
    AddOperator: BaseUrl + "SetupGetData/AddOperator",
    DeleteOperator: BaseUrl + "SetupGetData/DeleteOperator?operatorId=",
    UpdateOperator: BaseUrl + "SetupGetData/UpdateOperator",

    GetAllIprocess: BaseUrl + "SetupGetData/GetAllIprocess",
    GetAllIprocessCount: BaseUrl + "SetupGetData/GetAllIprocessCount",
    AddIprocess: BaseUrl + "SetupGetData/AddIprocess",
    DeleteIprocess: BaseUrl + "SetupGetData/DeleteIprocess?IprocessId=",
    UpdateIprocess: BaseUrl + "SetupGetData/UpdateIprocess",

    GetAllPartNumbers: BaseUrl + "SetupGetData/GetAllPartNumbers",
    GetAllPartNumbersCount: BaseUrl + "SetupGetData/GetAllPartNumbersCount",
    AddPartNumber: BaseUrl + "SetupGetData/AddPartNumber",
    DeletePartNumber: BaseUrl + "SetupGetData/DeletePartNumber?partNumberId=",
    UpdatePartNumber: BaseUrl + "SetupGetData/UpdatePartNumber",
    AddNewNc: BaseUrl + "NewNcGetData/AddNewNc",
    GetAllReview: BaseUrl + "ReviewGetData/GetAllReview",
    GetAllReviewCount: BaseUrl + "ReviewGetData/GetAllReviewCount",
    GetReviewDetails: BaseUrl + "ReviewGetData/GetReviewDetails?ncId=",
    GetImmediateAction: BaseUrl + "ReviewGetData/GetImmediateAction?ncId=",
    GetDocumnetList: BaseUrl + "ReviewGetData/GetDocumnetList?ncId=",
    GetDocumentControlList: BaseUrl + "ReviewGetData/GetDocumentControlList?ncId=",

    SaveReviewDetalis: BaseUrl + "ReviewGetData/SaveReviewDetalis",

    DeleteDocument: BaseUrl + "ReviewGetData/DeleteDocument?docId=",
    AddDocument: BaseUrl + "ReviewGetData/AddDocument",

    DeleteAction: BaseUrl + "ReviewGetData/DeleteAction?actionId=",
    AddAction: BaseUrl + "ReviewGetData/AddAction",
    UpdateAction: BaseUrl + "ReviewGetData/UpdateAction",

    AddDocumentControl: BaseUrl + "ReviewGetData/AddDocumentControl",
    DeleteDocumentControl: BaseUrl + "ReviewGetData/DeleteDocumentControl?docConId=",
    UpdateDocumentControl: BaseUrl + "ReviewGetData/UpdateDocumentControl",
    GetAllOpenAction: BaseUrl + "OpenActionGetData/GetAllOpenAction",
    GetAllOpenActionCount: BaseUrl + "OpenActionGetData/GetAllOpenActionCount",
    GetProcutionReport: BaseUrl + "ReportsGetData/GetProcutionReport",
    GetProcutionReportCount: BaseUrl + "ReportsGetData/GetProcutionReportCount",

    GeDefectReport: BaseUrl + "ReportsGetData/GeDefectReport",
    GeDefectReportCount: BaseUrl + "ReportsGetData/GeDefectReportCount",

    GetDefectDetails: BaseUrl + "ReportsGetData/GetDefectDetails",
    GetDefectDetailsCount: BaseUrl + "ReportsGetData/GetDefectDetailsCount",

    GetReworkReport: BaseUrl + "ReportsGetData/GetReworkReport",
    GetReworkReportCount: BaseUrl + "ReportsGetData/GetReworkReportCount",


    GetReworkDetailsReport: BaseUrl + "ReportsGetData/GetReworkDetailsReport",
    GetReworkDetailsReportCount: BaseUrl + "ReportsGetData/GetReworkDetailsReportCount",

    GetProcutionDetailsReport: BaseUrl + "ReportsGetData/GetProcutionDetailsReport",
    GetProcutionDetailsReportCount: BaseUrl + "ReportsGetData/GetProcutionDetailsReportCount",

    GetLostQtyReport: BaseUrl + "ReportsGetData/GetLostQtyReport",
    GetLostQtyReportCount: BaseUrl + "ReportsGetData/GetLostQtyReportCount",

    GetSupplierPerfReport: BaseUrl + "ReportsGetData/GetSupplierPerfReport",
    GetSupplierPerfReportCount: BaseUrl + "ReportsGetData/GetSupplierPerfReportCount",

    GetCustomerperfReport: BaseUrl + "ReportsGetData/GetCustomerperfReport",
    GetCustomerperfReportCount: BaseUrl + "ReportsGetData/GetCustomerperfReportCount",

    GetStokAll: BaseUrl + "StokGetData/GetStokAll",
    GetStokAllCount: BaseUrl + "StokGetData/GetStokAllCount",




};

const Buttons = {
    claimType_Add: "#btn-claimType-add",
    calimType_confirmAdd: "#btn-claimType-confirmAdd",
    calimType_confirmEdit: "#btn-claimType-confirmEdit",

    compnay_Add: "#btn-company-add",
    compnay_confrim: "#btn-company-confirmAdd",
    company_confirmEdit: "#btn-company-confirmEdit",
    department_Add: "#btn-department-add",
    department_confirmAdd: "#btn-department-confirmAdd",
    department_confirmEdit: "#btn-department-confirmEdit",

    operator_Add: "#btn-operator-add",
    operator_confirmAdd: "#btn-operator-confirmAdd",
    operator_confirmEdit: "#btn-operator-confirmEdit",

    Iprocess_Add: "#btn-Iprocess-add",
    Iprocess_confirmAdd: "#btn-Iprocess-confirmAdd",
    Iprocess_confirmEdit: "#btn-Iprocess-confirmEdit",

    partNumber_Add: "#btn-partNumber-add",
    partNumber_confirmAdd: "#btn-partNumber-confirmAdd",
    partNumber_confirmEdit: "#btn-partNumber-confirmEdit",
    newNc_submit: "#btn-newNc-submit",
    newNc_confirmAdd: "#btn-newNC-confirmAdd",
    newNc_reset: "#btn-newNc-reset",
    reviewDetails_addImmediateAction: "#btn-reviewDetails-addImmediateAction",
    reviewDetails_confrimAddAction: "#btn-reviewDetails-add-confirmAdd",
    reviewDetails_confrimEditAction: "#btn-reviewDetails-edit-confirmAdd",
    reviewDetails_addDocument: "#btn-reviewDetails-addDocument",

}
const Models = {
    claimType_add: "#claimType-AddModel",
    claimType_edit: "#claimType-editModel",
    company_add: "#company-AddModel",
    company_edit: "#company-editModel",
    department_add: "#department-AddModel",
    department_edit: "#department-editModel",
    operator_add: "#operator-AddModel",
    operator_edit: "#operator-editModel",

    Iprocess_add: "#Iprocess-AddModel",
    Iprocess_edit: "#Iprocess-editModel",

    partNumber_add: "#partNumber-AddModel",
    partNumber_edit: "#partNumber-editModel",

    newNc_summary: "#newNc-summary"

}
const TablesId = {
    claimType: "#table-claimType",
    company: "#table-company",
    department: "#table-department",
    operator: "#table-operator",
    Iprocess: "#table-Iprocess",
    partNumber: "#table-partNumber",
    review: "#table-review",
    openAction: "#table-openAction",
    reviewDetails_immdiateAction: "#table-reviewDetails-immediateAction",
    reviewDetails_document: "#table-reviewDetails-document",
    reviewDetails_documentControl: "#table-reviewDetails-documentControl",
    productionReport: "#table-productionReport",
    defectReport: "#table-defectReport",
    defectDetailsReport: "#table-defectDetailsReport",
    reworkReport: "#table-reworkReport",
    reworkDetailsReport: "#table-reworkDetailsReport",
    productionDetailsReport: "#table-productionDetailsReport",
    lostQtyReport: "#table-lostQtyReport",
    supplierPerfReport: "#table-supplierPerfReport",
    customerPerfReport: "#table-customerPerfReport",
    stokAll: "#table-stokAll"

};

const Inputs = {
    claimType_tr: "#inp-claimType-tr",
    calimType_en: "#inp-claimType-en",
    claimType_tr_edt: "#inp-claimType-tr-edit",
    calimType_en_edt: "#inp-claimType-en-edit",
    company_name: "#inp-company-name",
    company_edtName: "#inp-company-edit",
    department_tr: "#inp-department-tr",
    department_en: "#inp-department-en",
    department_tr_edt: "#inp-department-tr-edit",
    department_en_edt: "#inp-department-en-edit",
    operator_name: "#inp-operator-name",
    operator_name_edt: "#inp-operator-name-edit",

    IProcess_name: "#inp-Iprocess-name",
    IProcess_des: "#inp-Iprocess-dec",

    IProcess_name_edt: "#inp-Iprocess-name-edit",
    IProcess_des_edt: "#inp-Iprocess-dec-edit",

    partNumber_stk: "#inp-partNumber-stk",
    partNumber_sta: "#inp-partNumber-sta",
    partNumber_type: "#inp-partNumber-type",
    partNumber_stk_edit: "#inp-partNumber-stk-edit",
    partNumber_sta_edit: "#inp-partNumber-sta-edit",
    partNumber_type_edit: "#inp-partNumber-type-edit",
    partNumber_searchStk: "#inp-partNumber-searchStk",

    newNC_ncType: "#select-newNc-ncType",
    newNC_cutomerSup: "#select-newNc-cusSup",
    newNC_dep: "#select-newNc-dep",

    newNC_process: "#select-newNc-process",
    newNC_partNo: "#select-newNc-partNo",

    newNC_openBy: "#select-newNc-openBy",
    newNC_resposible: "#select-newNc-resposible",
    newNC_def: "#inp-newNC-def",
    newNC_conformity: "#inp-newNC-conformity",
    newNC_description: "#inp-newNC-description",
    newNC_qty: "#inp-newNC-qty",
    newNc_openDate: "#inp-newNc-openDate",
    newNc_targetDate: "#inp-newNc-tergetDate",
    newNc_closeDate: "#inp-newNc-closeDate",
    review_searchStk: "#inp-review-searchStk",

    reviewDetails_selectNcType: "#select-reviewDetails-ncType",
    reviewDetails_cusSup: "#select-reviewDetails-cusSup",
    reviewDetails_department: "#select-reviewDetails-dep",
    reviewDetails_process: "#select-reviewDetails-process",
    reviewDetails_partNo: "#select-reviewDetails-partNo",
    reviewDetails_openBy: "#select-reviewDetails-openBy",
    reviewDetails_responsible: "#select-reviewDetails-resposbile",



    reviewDetails_ncID: '#inp-reviewDetails-ncId',
    reviewDetails_def: '#inp-reviewDetails-def',
    reviewDetails_qty: '#inp-reviewDetails-qty',

    reviewDetails_conformity: '#inp-reviewDetails-conformity',
    reviewDetails_description: '#inp-reviewDetails-description',
    reviewDetails_analaysis: '#inp-reviewDetails-analaysis',


    reviewDetails_openDate: '#inp-reviewDetails-openDate',
    reviewDetails_targetDate: '#inp-reviewDetails-targetDate',
    reviewDetails_closeDate: '#inp-reviewDetails-closeDate',
    reviewDetails_immediateAction_operator: '#select-reviewDetails-immediateSelection-operator',
    reviewDetails_addImmediateAction_resposible: '#inp-reviewDetails-add-responsible',

    reviewDetails_addImmediateAction_targetDate: "#inp-reviewDetails-add-targetDate",
    reviewDetails_addImmediateAction_closeDate: "#inp-reviewDetails-add-closeDate",
    openAction_searchStk: "#inp-openAction-searchStk",
    stokAll_searchStk: "#inp-stokAll-searchStk",
    defectDetailsReport_searchStk: "#inp-defectDetailsReport-searchStk",
    reworkDetailsReport_searchStk: "#inp-reworkDetailsReport-searchStk",
    productionDetailsReport_searchStk: "#inp-productionDetailsReport-searchStk",
    lostQtyReport_searchStk: "#inp-lostQtyReport-searchStk",
    lostQtyReport_searchLotNo: "#inp-lostQtyReport-searchLotNo",
    supplierPerfReport_searchStk: "#inp-supplierPerfReport-searchStk",
    customerPerfReport_searchStk: "#inp-customerPerfReport-searchStk",



}
const recordsNotFound = {
    claimType: "#recordNotFound_claimType",
    company: "#recordNotFound_company",
    department: "#recordNotFound_department",
    operator: "#recordNotFound_operator",
    Iprocess: "#recordNotFound_Iprocess",
    partNumber: "#recordNotFound_partNumber",
    review: "#recordNotFound_review",
    openAction: "#recordNotFound_openAction",
    productionReport: "#recordNotFound_productionReport",
    defectReport: "#recordNotFound_defectReport",
    defectDetailsReport: "#recordNotFound_defectDetailsReport",
    reworkReport: "#recordNotFound_reworkReport",
    reworkDetailsReport: "#recordNotFound_reworkDetailsReport",
    productionDetailsReport: "#recordNotFound_productionDetailsReport",
    lostQtyReport: "#recordNotFound_lostQtyReport",
    supplierPerfReport: "#recordNotFound_supplierPerfReport",
    customerPerfReport: "#recordNotFound_customerPerfReport",
    stokAll: "#recordNotFound_stokAll"





}
const PreviousButtons = {
    claimType: "#btn-claimType-previous",
    company: "#btn-company-previous",
    department: "#btn-department-previous",
    operator: "#btn-operator-previous",
    Iprocess: "#btn-Iprocess-previous",
    partNumber: "#btn-partNumber-previous",
    review: "#btn-review-previous",
    openAction: "#btn-openAction-previous",
    productionReport: "#btn-productionReport-previous",
    defectReport: "#btn-defectReport-previous",
    defectDetailsReport: "#btn-defectDetailsReport-previous",
    reworkReport: "#btn-reworkReport-previous",
    reworkDetailsReport: "#btn-reworkDetailsReport-previous",
    productionDetailsReport: "#btn-productionDetailsReport-previous",
    lostQtyReport: "#btn-lostQtyReport-previous",
    supplierPerfReport: "#btn-supplierPerfReport-previous",
    customerPerfReport: "#btn-customerPerfReport-previous",
    stokAll: "#btn-stokAll-previous",


};
const NextButtons = {
    stokAll: "#btn-stokAll-next",
    claimType: "#btn-claimType-next",
    company: "#btn-company-next",
    department: "#btn-department-next",
    operator: "#btn-operator-next",
    Iprocess: "#btn-Iprocess-next",
    partNumber: "#btn-partNumber-next",
    review: "#btn-review-next",
    openAction: "#btn-openAction-next",
    productionReport: "#btn-productionReport-next",
    defectReport: "#btn-defectReport-next",
    defectDetailsReport: "#btn-defectDetailsReport-next",
    reworkDetailsReport: "#btn-reworkDetailsReport-next",
    productionDetailsReport: "#btn-productionDetailsReport-next",
    lostQtyReport: "#btn-lostQtyReport-next",
    supplierPerfReport: "#btn-supplierPerfReport-next",
    customerPerfReport: "#btn-customerPerfReport-next",
    reworkReport: "#btn-reworkReport-next",

};
const pageNumbers = {
    claimType: "#number-claimType-pageNumber",
    company: "#number-company-pageNumber",
    department: "#number-department-pageNumber",
    operator: "#number-operator-pageNumber",
    Iprocess: "#number-Iprocess-pageNumber",
    partNumber: "#number-partNumber-pageNumber",
    review: "#number-review-pageNumber",
    openAction: "#number-openAction-pageNumber",
    productionReport: "#number-productionReport-pageNumber",
    defectReport: "#number-defectReport-pageNumber",
    defectDetailsReport: "#number-defectDetailsReport-pageNumber",
    reworkDetailsReport: "#number-reworkDetailsReport-pageNumber",
    productionDetailsReport: "#number-productionDetailsReport-pageNumber",
    lostQtyReport: "#number-lostQtyReport-pageNumber",
    supplierPerfReport: "#number-supplierPerfReport-pageNumber",
    customerPerfReport: "#number-customerPerfReport-pageNumber",
    reworkReport: "#number-reworkReport-pageNumber",
}

function ShowLoader() {
    $('.loader-Container').fadeIn();
    //$('.loader-Container').css('display', 'block');
}

function HideLoader() {
    $('.loader-Container').fadeOut('slow');
    //  $('.loader-Container').css('display', 'none');

}


function disableButton(id) {
    $(id).css({ 'pointer-events': 'none', 'background-color': 'grey', 'cursor': 'no-drop' });
    $(id).parent().css('cursor', 'no-drop');
}

function ActiveButton(id) {
    $(id).css({ 'pointer-events': 'auto', 'background-color': '#2A3F54', 'cursor': 'pointer' });
    $(id).parent().css('cursor', 'pointer');
}