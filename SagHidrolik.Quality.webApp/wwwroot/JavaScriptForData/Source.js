const BaseUrl = "https://localhost:44374/";

const BaseServerUrl = 'https://localhost:44374/';
const date = new Date();
const today = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " ";

const HttpUrls = {
    GetAllClaim: BaseUrl + "ClaimGetData/GetAllClaim",
    GetAllClaimCount: BaseUrl + "ClaimGetData/GetAllClaimCount",
    AddClaimType: BaseUrl + "ClaimGetData/AddClaimType",
    DeleteClaimType: BaseUrl + "ClaimGetData/DeleteClaimType?claimId=",
    UpdateClaimType: BaseUrl + "ClaimGetData/UpdateClaimType",
    GetAllCompany: BaseUrl + "CompanyGetData/GetAllCompany",



   
};

const Buttons = {
    claimType_Add: "#btn-calimType-add",
    calimType_confirmAdd: "#btn-claimType-confirmAdd",
    calimType_confirmEdit: "#btn-claimType-confirmEdit"

}
const Models = {
    claimType_add: "#claimType-AddModel",
    claimType_edit: "#claimType-editModel"
}
const TablesId = {
    claimType: "#table-claimType",
    company: "#table-company"
};

const Inputs = {
    claimType_tr: "#inp-claimType-tr",
    calimType_en: "#inp-claimType-en",
    claimType_tr_edt: "#inp-claimType-tr-edit",
    calimType_en_edt: "#inp-claimType-en-edit",
    
}
const recordsNotFound= {
    claimType: "#recordNotFound_claimType",
    company: "#recordNotFound_company"
}
const PreviousButtons = {
    claimType: "#btn-claim-previous",
    company:"#btn-company-previous"
};
const NextButtons = {
    claimType: "#btn-claim-next",
    company: "#btn-company-next"
};
const pageNumbers = {
    claimType: "#number-claimtype-pageNumber",
    company: "#number-company-pageNumber"
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