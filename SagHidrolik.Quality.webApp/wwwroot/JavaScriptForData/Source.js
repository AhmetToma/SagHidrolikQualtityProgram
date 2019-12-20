const BaseUrl = "https://localhost:44374/";

const BaseServerUrl = 'https://localhost:44374/';
const date = new Date();
const today = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " ";

const HttpUrls = {
    GetAllClaim: BaseUrl + "SetupGetData/GetAllClaim",
    GetAllClaimCount: BaseUrl + "SetupGetData/GetAllClaimCount",
    AddClaimType: BaseUrl + "SetupGetData/AddClaimType"
};

const Buttons = {
    claimType_Add: "#btn-calimType-add",
    calimType_confirmAdd:"#btn-claimType-confirmAdd"
}
const Models = {
    claimType_add:"#claimType-AddModel"
}
const TablesId = {
    claimType: "#table-claimType"
};

const Inputs = {
    claimType_tr: "#inp-claimType-tr",
    calimType_en:"#inp-claimType-en"
}
const recordsNotFound= {
    claimType:"#recordNotFound_claimType"
}
const PreviousButtons = {
    claimType: "#btn-claim-previous"
};
const NextButtons = {
    claimType: "#btn-claim-next"

};
const pageNumbers = {
    claimType:"#number-claimtype-pageNumber"
}

function ShowLoader() {
    $('.loader-Container').fadeIn();
    //$('.loader-Container').css('display', 'block');
}

function HideLoader() {
    $('.loader-Container').fadeOut('slow');
  //  $('.loader-Container').css('display', 'none');

}