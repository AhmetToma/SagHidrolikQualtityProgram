const BaseUrl = "https://localhost:44374/";

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

}
const Models = {
    claimType_add: "#claimType-AddModel",
    claimType_edit: "#claimType-editModel",
    company_add: "#company-AddModel",
    company_edit: "#company-editModel",
    department_add: "#department-AddModel",
    department_edit: "#department-editModel"
}
const TablesId = {
    claimType: "#table-claimType",
    company: "#table-company",
    department: "#table-department",
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
}
const recordsNotFound= {
    claimType: "#recordNotFound_claimType",
    company: "#recordNotFound_company",
    department: "#recordNotFound_department",
}
const PreviousButtons = {
    claimType: "#btn-claimType-previous",
    company: "#btn-company-previous",
    department: "#btn-department-previous",
};
const NextButtons = {
    claimType: "#btn-claimType-next",
    company: "#btn-company-next",
    department: "#btn-department-next",
};
const pageNumbers = {
    claimType: "#number-claimType-pageNumber",
    company: "#number-company-pageNumber",
    department: "#number-department-pageNumber",
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