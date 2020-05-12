const BaseUrl = "https://localhost:44381/";

const BaseServerUrl = 'https://localhost:44381/';
const date = new Date();
const today = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " ";

const HttpUrls = {
    getStokByStk: BaseUrl + "StokGetData/GetStokByStk",
    GetStokkenByStkListOnlypageSize: BaseUrl + "StokGetData/GetStokkenByStkListOnlypageSize",
    GetProductOrdersByStokgenId: BaseUrl + "StokGetData/GetProductOrdersByStokgenId",
    GetAllStokAlt: BaseUrl + "StokGetData/GetAllStokAlt",
    GetGalvanize: BaseUrl + "StokGetData/GetGalvanize",
    GetStokRecetesi: BaseUrl + "StokGetData/GetStokRecetesi",
    GetBomProcessInStok: BaseUrl + "StokGetData/GetBomProcessInStok",
    GetProcessFlowInStok: BaseUrl + "StokGetData/GetProcessFlowInStok",
    GetproductImage: BaseUrl + "StokGetData/GetproductImage?stk=",
    GetProcessFLowInUretim: BaseUrl + "UretimData/GetProcessFLowInUretim",
    GetAktiveOperators: BaseUrl + "UretimData/GetAktiveOperators",
    GetAktiveMachine: BaseUrl + "UretimData/GetAktiveMachine",
    GetMachineNameByMachineNo: BaseUrl + "UretimData/GetMachineNameByMachineNo",
    SearchInUretim: BaseUrl + "UretimData/SearchInUretim",
    GetOperatorPolivalance: BaseUrl + "UretimData/GetOperatorPolivalance",
    CheckFlowIdByFinishTimeInFlowDetails: BaseUrl + "UretimData/CheckFlowIdByFinishTimeInFlowDetails",
    StartIsEmriAndWriteToFlowDetails: BaseUrl + "UretimData/StartIsEmriAndWriteToFlowDetails",
    GetProcessFlowClose: BaseUrl + "UretimData/GetProcessFlowClose",
    GetFire: BaseUrl + "UretimData/GetFire?Reject_ID=",
    UretimBitirConfirm: BaseUrl + "UretimData/UretimBitirConfirm",
    GetproductFile: BaseUrl + "StokGetData/GetproductFile?Pid=",
    GetaltStokToplam: BaseUrl + "StokGetData/GetaltStokToplam?stk=",
    BakimAriza_GetAllMachines: BaseUrl + "BakimArizaCon/GetAllMachine",
    BakimAriza_insertIntoBakimKayit: BaseUrl + "BakimArizaCon/insertIntoBakimKayit",
    BakimAriza_gecmisTalepler: BaseUrl + "BakimArizaCon/gecmisTalepler",
    uretimPlani_GetAllUretimPlani: BaseUrl + "UretimData/GetAllUretimPlani",
    tamirIsEmri_GetTamirIsEmriAdimlari: BaseUrl + "UretimData/GetTamirIsEmriAdimlari",
    tamirIsEmri_InsertTamirIsEmri: BaseUrl + "UretimData/InsertTamirIsEmri",
    GetSevkiyetKutuEtiketiList: BaseUrl + "Etiketler/GetSevkiyetKutuEtiketiList",
    getAllProcessInGunlukHatBazindUretim: BaseUrl + "UretimData/getAllProcessInGunlukHatBazindUretim",
    GetAllGunlukHatBazindUretimList: BaseUrl + "UretimData/GetAllGunlukHatBazindUretimList",
    GetAllStokEtiketi: BaseUrl + "Etiketler/GetAllStokEtiketi",
    GetGirisKabulEtiketiList: BaseUrl + "Etiketler/GetGirisKabulEtiketiList",
    GetBomProccessInAddOrUpdateProcess: BaseUrl + "AddOrUpdateProcess/GetAllBomProcessInAddOrUpdateProcess",
    GetBomProcessTemp: BaseUrl + "AddOrUpdateProcess/GetBomProcessTemp",
    CopyToBomProcessTemp: BaseUrl + "AddOrUpdateProcess/CopyToBomProcessTemp?pId=",
    DeleteFromBomProcessTemp: BaseUrl + "AddOrUpdateProcess/DeleteFromBomProcessTemp?pId=",
    addUpdateProceecSave: BaseUrl + "AddOrUpdateProcess/addUpdateProceecSave",
    GetStokAll: BaseUrl + "StokGetData/GetStokAll",
    GetStokAllCount: BaseUrl + "StokGetData/GetStokAllCount",
    GetAllProductionOrders: BaseUrl + "WOGetData/GetAllProductionOrders",
    GetprocutionOrdersCount: BaseUrl + "WOGetData/GetprocutionOrdersCount",
    DeleteWo: BaseUrl + "WOGetData/DeleteWo",
    AddNewWorkOrder: BaseUrl + "WOGetData/AddNewWorkOrder",
    GetAllProductionOrdersPrintOut: BaseUrl + "WOGetData/GetAllProductionOrdersPrintOut",
    AddToProductionOrdersPrintOut: BaseUrl + "WOGetData/AddToProductionOrdersPrintOut",
    DeleteFromPrintOut: BaseUrl + "WOGetData/DeleteFromPrintOut?productId=",
    DeleteAllPrintOut: BaseUrl + "WOGetData/DeleteAllPrintOut",
    GetProcessFlowInProcessDetails: BaseUrl + "ProcessDetailsGetData/GetProcessFlowInProcessDetails",
    GetProcessFlowDetailsInProcessDetails: BaseUrl + "ProcessDetailsGetData/GetProcessFlowDetailsInProcessDetails",
    GetAllFindInBom: BaseUrl + "FindInBomGetData/GetAllFindInBom",
    GetAllFindInBomCount: BaseUrl + "FindInBomGetData/GetAllFindInBomCount",
    GetTeslimatDurumu: BaseUrl + "TTFTeslimatGetData/GetTeslimatDurumu",
    GetTeslimatDurumuCount: BaseUrl + "TTFTeslimatGetData/GetTeslimatDurumuCount",
    GetAllProductionStatus: BaseUrl + "ProdutionStartGetData/GetAllProductionStatus",
    DeleteproductionStatus: BaseUrl + "ProdutionStartGetData/DeleteproductionStatus?sheetId=",
    AddToProductionStatus: BaseUrl + "ProdutionStartGetData/AddToProductionStatus",
    TransferToSystem: BaseUrl + "ProdutionStartGetData/TransferToSystem?productId=",
    GetProductionSummaryReport: BaseUrl + "UretimData/GetProductionSummaryReport",
    GetProductionSummaryCount: BaseUrl + "UretimData/GetProcutionSummaryCount",
    GetProductionOrdersTransfer: BaseUrl + "ProductionOrderTranferGetData/GetProductionOrdersTransfer",
    GetprocutionOrdersTranferCount: BaseUrl + "ProductionOrderTranferGetData/GetprocutionOrdersTranferCount",
    DeleteFromTranferWo: BaseUrl + "ProductionOrderTranferGetData/DeleteFromTranferWo?partNo=",
    DeleteAllTranferWo: BaseUrl + "ProductionOrderTranferGetData/DeleteAllTranferWo",
    TrnasferToSystem: BaseUrl + "ProductionOrderTranferGetData/TrnasferToSystem",
    GetOrderDetails: BaseUrl + "OrderManagementGetData/GetOrderDetails",
    GetInProgress: BaseUrl + "OrderManagementGetData/GetInProgress",
    GetComponentOrders: BaseUrl + "OrderManagementGetData/GetComponentOrders",
    GetCustomerOrders: BaseUrl + "OrderManagementGetData/GetCustomerOrders",
    GetShippmentReport: BaseUrl + "TTFTeslimatGetData/GetShippmentReport",






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

    GetProcessPlanReport: BaseUrl + "ReportsGetData/GetProcessPlanReport",
    GetProcessPlanReportCount: BaseUrl + "ReportsGetData/GetProcessPlanReportCount",
    DeleteProcessplan: BaseUrl + "ReportsGetData/DeleteProcessplan?id=",

    GetMonthlyProduction: BaseUrl + "ReportsGetData/GetMonthlyProduction",
    GetMonthlyProductionCount: BaseUrl + "ReportsGetData/GetMonthlyProductionCount",

    GetSellDateReport: BaseUrl + "ReportsGetData/GetSellDateReport",
    GetSellDateReportCount: BaseUrl + "ReportsGetData/GetSellDateReportCount",


    GetBoxType: BaseUrl + "SettingData/GetBoxType",
    GetBoxTypeCount: BaseUrl + "SettingData/GetBoxTypeCount",

    GetMachineSettings: BaseUrl + "SettingData/GetMachineSettings",
    GetMachineSettingsCount: BaseUrl + "SettingData/GetMachineSettingsCount",

    GetProcessNew: BaseUrl + "SettingData/GetProcessNew",
    GetProcessNewCount: BaseUrl + "SettingData/GetProcessNewCount",
    AddsettingsProcessNew: BaseUrl + "SettingData/AddsettingsProcessNew",
    EditSettingsProcessNew: BaseUrl + "SettingData/EditSettingsProcessNew",
    DeleteSettingsProcessNew: BaseUrl + "SettingData/DeleteSettingsProcessNew?processId=",






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
    bakimAriza_submit: "#btn-bakimAriza-submit",
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

    Stok_searchStkInStokgen: "#table-stok-stokgenSearch",
    UrunEtiketi_searchStkInStokgen: "#table-urunEtiketi-searchStk",
    productionOrdersInUrunEtketi: "#table-urunEtiketi-productioOrders",
    productionOrdersInStok: "#table-stok-productionOrders",
    printModal: ".printModel",
    UrunEtiketTable: "#table-urunEtiket-etiketEkle",
    BakimAriza_AllMachines: "#table-BakimAriza-allMachines",
    BakimAriza_gecmisTalepler: "#table-bakimAriza-gecmisTalepler",
    UretimPlani_allUretimPlani: "#table-uretimPlani",
    tamirIsEmri_searchStk: "#table-tamirIsEmri-searchStk",
    tmairIsEmri_productionOrders: "#table-tamirIsEmri-productioOrders",
    sekiyetKutuEtiketi_sevKabul: "#table-sevkiyatKutuEtiketi-sevKabul",
    gunlukHatBazindaUretim: "#table-GunlukHatUretim",
    sekiyetKutuEtiketi_result: "#table-sevkiyatKutuEtiketi-result",
    stokEtiketi_stokEtiketiList: "#table-stokEtiketi-stokEtiketiList",
    stokEtiket_tableResult: "#table-stokEtiketi-result",
    girisKabulEtiketi_girisKabulEtiketiList: "#table-girisKabulEtiketi-girisKabulEtiketiList",
    girisKabulEtiketi_tableResult: "#table-girisKabulEtiketi-result",
    addOrUpdateProcess_stkTable: "#table-addOrUpdateProcess-stokgenSearch",
    addOrUpdateProcess_bomProcessCurrent: "#table-addOrUpdateProcess-bomProcessCurrent",
    addOrUpdateProcess_bomProcessNew: "#table-addOrUpdateProcess-bomProcessNew",
    stokAll: "#table-stokAll",
    allWo: "#table-allWo",
    ProductionOrdersPrintout: "#table-productionOrderPrintOut",
    processDetails_searchStk: "#table-processDetails-searchStk",
    processDetails_ProductionOrders: "#table-processDetails-productioOrders",
    processDetails_processFlow: "#table-processDetails-processFlow",
    processDetails_processFlowDetails: "#table-processDetails-processFlowDetails",
    findInBom: "#table-findInBom",
    teslimatDurumu: "#table-teslimatDurumu",
    prodcutionStart: "#table-prodcutionStart",
    productionStatus: "#table-productionStatus",
    productionSummary: "#table-productionSummary",
    tranferWo: "#table-tranferWo",
    orderDetails_stok: "#table-orderDetails-stok",
    orderDetails: "#table-orderDetails",
    componentOrders: "#table-componentOrders",
    customerOrders: "#table-customerOrders",
    shippmentReport: "#table-shippmentReport",
    boxType: "#table-boxType",
    settingsProcessNew: "#table-settingsProcessNew",
    machineSettings: "#table-machineSettings",











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
    processPlanReport: "#table-processPlanReport",
    monthlyProdcutionReport: "#table-monthlyProdcutionReport",
    sellDateReport: "#table-sellDateReport",

};

const Inputs = {
    gunlukHatBazindaUretim_searchMachineNo:"#inp-gunlukHatBazindUretim-searchMakine",
    uretimplani_searchByStk: "#inp-uretimPlani-searchStk",
    bakimAriza_tarih: "#inp-bakimAriza-tarih",
    bakimAriza_searchMachineNo: "#inp-bakimArzia-searchInAllMachines",
    bakimAriza_selectedMachineNo: '#inp-bakimAriza-selectedMachineNo',
    boxType_searchStk: '#inp-boxType-searchStk',
    machineSettings_machineNo: '#inp-machineSettings-machineNo',
    machineSettings_machineName: '#inp-machineSettings-machineName',
    settingsProcessNew_processAdi: '#inp-settingsProcessNew-searchprocessAdi',
    ProductionSummary_searchStk: "#inp-productionSummary-searchStk",


    tamirIsEmri_searchByStk: "#inp-tamirIsEmri-inputSearch",
    tmairIsEmri_stk: ".tamirIsEmri-first-stk",
    tmairIsEmri_LotNo: ".tamirIsEmri-first-lotNo",
    tmairIsEmri_tamirMiktar: ".tamirIsEmri-first-tamirMiktari",
    tmairIsEmri_tarih: ".tamirIsEmri-first-tarih",
    tamirIsEmri_newLotNo: "#inp-tamirIsemri-newLotNo",


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
    processPlanReport_searchStk: "#inp-processPlanReport-searchStk",
    customerPerfReport_searchStk: "#inp-customerPerfReport-searchStk",
    monthlyProdcutionReport_searchMachinNo: "#inp-monthlyProdcutionReport-searchMachinNo",
    sellDateReport_searchStk: "#inp-sellDateReport-searchStk",



}
const recordsNotFound = {
    productionOrders: "#recordNotFoundDiv_productionOrders",
    altStok: "#recordNotFoundDiv_altStok",
    galvanize: "#recordNotFoundDiv_Galvanize",
    Dosyalar: "#recordNotFoundDiv_dosyalar",
    bomProcess: "#recordNotFoundDiv_bomProcess",
    stokRecetesi: "#recordNotFoundDiv_stokRecetesi",
    uretimInStok: "#recordNotFoundDiv_uretim",
    BakimAriaz_AllMachines: "#recordNotFoundDiv_bakimAriza_AllMachines",
    sekiyetKuttEtiketi: "#recordNotFoundDiv_sevkiyatKutuEtiketi",
    uretimBasla: "#recordNotFoundDiv_uretimBasla",
    uretimBitir: "#recordNotFoundDiv_uretimBitir",
    gunlukHatBazindaUretim: "#recordNotFoundDiv_gunlukHatBazindUretim",
    stokEtiketi: "#recordNotFoundDiv_stokEtiketi",
    girisKabulEtiketi: "#recordNotFoundDiv_girisKabulEtiketi",
    allWo: "#recordNotFoundDiv_allWo",
    ProductionOrdersPrintout: "#recordNotFoundDiv_ProductionOrdersPrintout",
    processDetails_procutionOrders: "#recordNotFoundDiv_processDetails_productionOrders",
    processDetails_processFlow: "#recordNotFoundDiv_processDetails_processFlow",
    processDetails_processFlowDetails: "#recordNotFoundDiv_processDetails_processFlowDetails",
    ProductionStart: "#recordNotFoundDiv_prodcutionStart",
    productionStatus: "#recordNotFoundDiv_productionStatus",
    orderDetails: "#recordNotFoundDiv_orderDetails",
    settingsProcessNew: "#recordNotFound_settingsProcessNew",



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
    processPlanReport: "#recordNotFound_processPlanReport",
    monthlyProdcutionReport: "#recordNotFound_monthlyProdcutionReport",
    sellDateReport: "#recordNotFound_sellDateReport",
    stokAll: "#recordNotFound_stokAll",
    boxType: "#recordNotFound_boxType",
    machineSettings: "#recordNotFound_machineSettings",





}
const PreviousButtons = {
    claimType: "#btn-claimType-previous",
    uretimPlani_allUretimPlani: "#btn-uretimPalni-previous",
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
    productionSummary: "#btn-productionSummary-previous",
    supplierPerfReport: "#btn-supplierPerfReport-previous",
    customerPerfReport: "#btn-customerPerfReport-previous",
    processPlanReport: "#btn-processPlanReport-previous",
    monthlyProdcutionReport: "#btn-monthlyProdcutionReport-previous",
    sellDateReport: "#btn-sellDateReport-previous",
    stokAll: "#btn-stokAll-previous",
    boxType: "#btn-boxType-previous",
    settingsProcessNew: "#btn-settingsProcessNew-previous",
    machineSettings: "#btn-machineSettings-previous",
    bakimAriza_AllMachines: "#btn-bakimAriza-previous",
    bakimAriza_gecmisTalepler: "#btn-bakimArizaGecmisTalepler-previous",
    tamirIsEmri_productionOrders: "#btn-tamirIsEmri-previous",

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
    processPlanReport: "#btn-processPlanReport-next",
    monthlyProdcutionReport: "#btn-monthlyProdcutionReport-next",
    sellDateReport: "#btn-sellDateReport-next",
    reworkReport: "#btn-reworkReport-next",
    uretimPlani_allUretimPlani: "#btn-uretimPalni-next",
    bakimAriza_AllMachines: "#btn-bakimAriza-next",
    boxType: "#btn-boxType-next",
    machineSettings: "#btn-machineSettings-next",
    bakimAriza_gecmisTalepler: "#btn-bakimArizaGecmisTalepler-next",
    settingsProcessNew: "#btn-settingsProcessNew-next",
    productionSummary: "#btn-productionSummary-next",
    tamirIsEmri_productionOrders: "#btn-tamirIsEmri-next",

};
const pageNumbers = {
    stok_prodcutionOrders:"#number-productionOrders-pageNumber",
    stok_stokAlt: "#number-stoklAlt-pageNumber",
    stok_galvanize: "#number-galvanize-pageNumber",
    stok_stokRecetesi: "#number-stokRecetesi-pageNumber",
    stok_bomProcess: "#number-bomProcess-pageNumber",
    stok_uretimInStok: "#number-uretimInStok-pageNumber",
    sekiyetKutuEtiketi_sekKabul: "#number-sevkiyatKutuEtiketi-pageNumber",
    gunlukHatBazindaUretim: "#num-gunlukHatBazindUretim-pageNumber",
    stokEtiketi: "#number-stokEtiketi-pageNumber",
    girisKabulEtiketi: "#number-girisKabulEtiketi-pageNumber",
    teslimatDurumu: "#num-teslimatDurumu-pageNumber",
    boxType: "#num-boxType-pageNumber",
    settingsProcessNew: "#number-settingsProcessNew-pageNumber",
    machineSettings: "#num-machineSettings-pageNumber",
    stokAll: "#num-stokAll-pageNumber",


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
    processPlanReport: "#number-processPlanReport-pageNumber",
    monthlyProdcutionReport: "#number-monthlyProdcutionReport-pageNumber",
    sellDateReport: "#number-sellDateReport-pageNumber",
    reworkReport: "#number-reworkReport-pageNumber",
    productionSummary: "#number-reworkReport-pageNumber",
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

function HideRecodNotFound(divId) {
    $(`${divId}`).css('opacity', '0');
    $(`${divId}`).css('display', 'block');
    $(`${divId} h3`).text("");
}


function ShowRecodNotFound(divId) {
    $(`${divId}`).css('opacity', '1');
    $(`${divId}`).css('display', 'block');
    $(`${divId} h3`).text("Bu stk'a ait  hiçbir kayıt bulunmamaktadır");
}