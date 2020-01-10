$(function () {
    let dataUrl = "Home/SetUp";
    let serverUrl = BaseServerUrl + dataUrl;
    if (window.location.href === serverUrl) {
        GetAllClaim();
    }
});
let regusetQueryForNewNc = {
    pageSize: 1500,
    pageNumber:1

}
function GetAllClaim() {
     $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: HttpUrls.GetAllClaim,
         data: JSON.stringify(regusetQueryForNewNc),
        success: (list) => {




            
        }
    });
}