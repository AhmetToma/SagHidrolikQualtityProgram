﻿const BaseUrl = "https://localhost:44374/";

const BaseServerUrl = 'https://localhost:44374/';
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
    partNumber_edit: "#partNumber-editModel"

}
const TablesId = {
    claimType: "#table-claimType",
    company: "#table-company",
    department: "#table-department",
    operator: "#table-operator",
    Iprocess: "#table-Iprocess",
    partNumber: "#table-partNumber"
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
    partNumber_searchStk:"#inp-partNumber-searchStk"




}
const recordsNotFound= {
    claimType: "#recordNotFound_claimType",
    company: "#recordNotFound_company",
    department: "#recordNotFound_department",
    operator: "#recordNotFound_operator",
    Iprocess: "#recordNotFound_Iprocess",
    partNumber: "#recordNotFound_partNumber",



}
const PreviousButtons = {
    claimType: "#btn-claimType-previous",
    company: "#btn-company-previous",
    department: "#btn-department-previous",
    operator: "#btn-operator-previous",
    Iprocess: "#btn-Iprocess-previous",
    partNumber: "#btn-partNumber-previous",



};
const NextButtons = {
    claimType: "#btn-claimType-next",
    company: "#btn-company-next",
    department: "#btn-department-next",
    operator: "#btn-operator-next",
    Iprocess: "#btn-Iprocess-next",
    partNumber: "#btn-partNumber-next",
};
const pageNumbers = {
    claimType: "#number-claimType-pageNumber",
    company: "#number-company-pageNumber",
    department: "#number-department-pageNumber",
    operator: "#number-operator-pageNumber",
    Iprocess: "#number-Iprocess-pageNumber",
    partNumber: "#number-partNumber-pageNumber",


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