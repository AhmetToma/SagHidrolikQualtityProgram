﻿const BaseUrl = "https://localhost:44381/";

const BaseServerUrl = 'https://localhost:44381/';
const date = new Date();
const today = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

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
    DeleteFromProceeFlow: BaseUrl + "UretimData/DeleteFromProceesFlow?flowId=",
    GetproductFile: BaseUrl + "StokGetData/GetproductFile?Pid=",
    GetaltStokToplam: BaseUrl + "StokGetData/GetaltStokToplam?stk=",
    BakimAriza_GetAllMachines: BaseUrl + "BakimArizaCon/GetAllMachine",
    BakimAriza_insertIntoBakimKayit: BaseUrl + "BakimArizaCon/insertIntoBakimKayit",
    BakimAriza_gecmisTalepler: BaseUrl + "BakimArizaCon/gecmisTalepler",
    GetAllMachineCount: BaseUrl + "BakimArizaCon/GetAllMachineCount",
    GetBakimKayitByMakineID: BaseUrl + "BakimArizaCon/GetBakimKayitByMakineID?makineId=",
    GetAllBakimSorumlulari: BaseUrl + "BakimArizaCon/GetAllBakimSorumlulari",
    GetAllBakimSorumlulariCount: BaseUrl + "BakimArizaCon/GetAllBakimSorumlulariCount",
    DeleteBakimSorumlu: BaseUrl + "BakimArizaCon/DeleteBakimSorumlu?sorumluId=",
    AddBakimSorumlu: BaseUrl + "BakimArizaCon/AddBakimSorumlu",
    EditBakimSorumlu: BaseUrl + "BakimArizaCon/EditBakimSorumlu",
    GetBakimRaporu: BaseUrl + "BakimArizaCon/GetBakimRaporu",
    GetAllBakimArizaKapama: BaseUrl + "BakimArizaCon/GetAllBakimArizaKapama",
    KapatBakimAriza: BaseUrl + "BakimArizaCon/KapatBakimAriza",
    InsertIntoBakimGirisi: BaseUrl + "BakimArizaCon/InsertIntoBakimGirisi",
    insertIntoBakimPlanlama: BaseUrl + "BakimArizaCon/insertIntoBakimPlanlama",
    GetAllPlanliBakim: BaseUrl + "BakimArizaCon/GetAllPlanliBakim",
    GetAllPlanliBakimCount: BaseUrl + "BakimArizaCon/GetAllPlanliBakimCount",
    UpdatePlanliBakim: BaseUrl + "BakimArizaCon/UpdatePlanliBakim",
    GetAllMakineler: BaseUrl + "BakimArizaCon/GetAllMakineler",
    GetAllMakinelerCount: BaseUrl + "BakimArizaCon/GetAllMakinelerCount",
    DeleteMakine: BaseUrl + "BakimArizaCon/DeleteMakine?machineId=",
    AddNewMakine: BaseUrl + "BakimArizaCon/AddNewMakine",
    UpdateMakine: BaseUrl + "BakimArizaCon/UpdateMakine",
    GetAllBakimRecords: BaseUrl + "BakimArizaCon/GetAllBakimRecords",
    GetAllBakimRecordsCount: BaseUrl + "BakimArizaCon/GetAllBakimRecordsCount",
    DeleteFromTbleBakimKayit: BaseUrl + "BakimArizaCon/DeleteFromTbleBakimKayit?bakimId=",

    uretimPlani_GetAllUretimPlani: BaseUrl + "UretimData/GetAllUretimPlani",
    tamirIsEmri_GetTamirIsEmriAdimlari: BaseUrl + "UretimData/GetTamirIsEmriAdimlari",
    tamirIsEmri_InsertTamirIsEmri: BaseUrl + "UretimData/InsertTamirIsEmri",
    GetSevkiyetKutuEtiketiList: BaseUrl + "EtiketlerGetData/GetSevkiyetKutuEtiketiList",
    getAllProcessInGunlukHatBazindUretim: BaseUrl + "UretimData/getAllProcessInGunlukHatBazindUretim",
    GetAllGunlukHatBazindUretimList: BaseUrl + "UretimData/GetAllGunlukHatBazindUretimList",
    GetAllStokEtiketi: BaseUrl + "EtiketlerGetData/GetAllStokEtiketi",
    GetGirisKabulEtiketiList: BaseUrl + "EtiketlerGetData/GetGirisKabulEtiketiList",
    GetBomProccessInAddOrUpdateProcess: BaseUrl + "UretimData/GetAllBomProcessInAddOrUpdateProcess",
    AddBomProcess: BaseUrl + "UretimData/AddBomProcess",
    UpdateBomProcess: BaseUrl + "UretimData/UpdateBomProcess",
    GetProcessPlanning: BaseUrl + "UretimData/GetProcessPlanning",
    DeleteBomProcess: BaseUrl + "UretimData/DeleteBomProcess",
    GetBomProcessTemp: BaseUrl + "UretimData/GetBomProcessTemp",
    CopyToBomProcessTemp: BaseUrl + "UretimData/CopyToBomProcessTemp?pId=",
    DeleteFromBomProcessTemp: BaseUrl + "UretimData/DeleteFromBomProcessTemp?pId=",
    addUpdateProceecSave: BaseUrl + "UretimData/addUpdateProceecSave",
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
    TrnasferWoToSystem: BaseUrl + "WOGetData/TrnasferWoToSystem",
    GetBomProcessForPrint: BaseUrl + "WOGetData/GetBomProcessForPrint?partNoId=",
    GetTStokReceteForPrint: BaseUrl + "WOGetData/GetTStokReceteForPrint?stk=",

    GetProcessFlowInProcessDetails: BaseUrl + "UretimData/GetProcessFlowInProcessDetails",
    GetProcessFlowDetailsInProcessDetails: BaseUrl + "UretimData/GetProcessFlowDetailsInProcessDetails",
    UpdateProcessFlowInProcessDetails: BaseUrl + "UretimData/UpdateProcessFlowInProcessDetails",
    DeleteFromProceesFlowDetails: BaseUrl + "UretimData/DeleteFromProceesFlowDetails?id=",
    UpdateProcessFlowDetailsInProcessDetails: BaseUrl + "UretimData/UpdateProcessFlowDetailsInProcessDetails",

    GetAllFindInBom: BaseUrl + "StokGetData/GetAllFindInBom",
    GetAllFindInBomCount: BaseUrl + "StokGetData/GetAllFindInBomCount",

    GetTeslimatDurumu: BaseUrl + "TTFTeslimatGetData/GetTeslimatDurumu",
    GetTeslimatDurumuCount: BaseUrl + "TTFTeslimatGetData/GetTeslimatDurumuCount",
    AddTeslimatDurumu: BaseUrl + "TTFTeslimatGetData/AddTeslimatDurumu",
    DropAllTTFTeslimatTable: BaseUrl + "TTFTeslimatGetData/DropAllTTFTeslimatTable",
    GetAllProductionStatus: BaseUrl + "UretimData/GetAllProductionStatus",
    DeleteproductionStatus: BaseUrl + "UretimData/DeleteproductionStatus?sheetId=",
    AddToProductionStatus: BaseUrl + "UretimData/AddToProductionStatus",
    TransferToSystem: BaseUrl + "UretimData/TransferToSystem",
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


    GetSettingsReject: BaseUrl + "SettingData/GetSettingsReject",
    GetSettingsRejectCount: BaseUrl + "SettingData/GetSettingsRejectCount",
    AddSettingsReject: BaseUrl + "SettingData/AddSettingsReject",
    DeleteSettingsReject: BaseUrl + "SettingData/DeleteSettingsReject?rejectId=",
    EditSettingsReject: BaseUrl + "SettingData/EditSettingsReject",







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
    UpdateBoxType: BaseUrl + "SettingData/UpdateBoxType",

    GetMachineSettings: BaseUrl + "SettingData/GetMachineSettings",
    GetMachineSettingsCount: BaseUrl + "SettingData/GetMachineSettingsCount",

    GetProcessNew: BaseUrl + "SettingData/GetProcessNew",
    GetProcessNewCount: BaseUrl + "SettingData/GetProcessNewCount",
    AddsettingsProcessNew: BaseUrl + "SettingData/AddsettingsProcessNew",
    EditSettingsProcessNew: BaseUrl + "SettingData/EditSettingsProcessNew",
    DeleteSettingsProcessNew: BaseUrl + "SettingData/DeleteSettingsProcessNew?processId=",



    GetSettingsOperator: BaseUrl + "SettingData/GetSettingsOperator",
    GetSettingsOperatorCount: BaseUrl + "SettingData/GetSettingsOperatorCount",
    GetSettingsOperatorPolivalance: BaseUrl + "SettingData/GetSettingsOperatorPolivalance?operatorId=",
    AddToSettingOperator: BaseUrl + "SettingData/AddToSettingOperator",
    EditSettingsOperator: BaseUrl + "SettingData/EditSettingsOperator",
    DeleteSettingOperator: BaseUrl + "SettingData/DeleteSettingOperator?operatorId=",
    DeleteOperatorPolivalance: BaseUrl + "SettingData/DeleteOperatorPolivalance?id=",
    GetAktifAndUnAktifOperators: BaseUrl + "SettingData/GetAktifAndUnAktifOperators",
    AddOperatorPolivalance: BaseUrl + "SettingData/AddOperatorPolivalance",
    UpdateOperatorPolivalance: BaseUrl + "SettingData/UpdateOperatorPolivalance",



    GetGirisKontrol: BaseUrl + "EtiketlerGetData/GetGirisKontrol",
    UpdateKaliteKodu: BaseUrl + "EtiketlerGetData/UpdateKaliteKodu",

    login: BaseUrl + "AuthenticationData/checkLogin",
    logout: BaseUrl + "AuthenticationData/logout",
    AllSystemUsers: BaseUrl + "AuthenticationData/GetAllSyetemUsers",
    GetAllSyetemUsersCount: BaseUrl + "AuthenticationData/GetAllSyetemUsersCount",
    GetAllUsersRoles: BaseUrl + "AuthenticationData/GetAllUsersRoles",
    AddSystemUser: BaseUrl + "AuthenticationData/AddSystemUser",
    deleteSystemUser: BaseUrl + "AuthenticationData/deleteSystemUser?email=",
    ResetUserPassword: BaseUrl + "AuthenticationData/ResetUserPassword",
    changeRole: BaseUrl + "AuthenticationData/changeRole",
    GetAllPurchaseOrders: BaseUrl + "PurchaseOrderManagemntGetData/GetAllPurchaseOrders",
    RunMrp: BaseUrl + "PurchaseOrderManagemntGetData/RunMrp?lotSize=",
    GetwoStatuslastInprogress: BaseUrl + "PurchaseOrderManagemntGetData/GetWoStatuslastInprogress",
    GetWoStatusLastOpen: BaseUrl + "PurchaseOrderManagemntGetData/GetWoStatusLastOpen",
    GetTTfixOrdersOrderSummary: BaseUrl + "PurchaseOrderManagemntGetData/GetTTfixOrdersOrderSummary",
    DropAllPurcahseOrdersTable: BaseUrl + "PurchaseOrderManagemntGetData/DropAllPurcahseOrdersTable",
    GetMonthlyMaterialUsage: BaseUrl + "PurchaseOrderManagemntGetData/GetMonthlyMaterialUsage",
    GetWeeklyMaterialUsage: BaseUrl + "PurchaseOrderManagemntGetData/GetWeeklyMaterialUsage",
    GetNewWoListInPurchaseOrders: BaseUrl + "PurchaseOrderManagemntGetData/GetNewWoListInPurchaseOrders",
    GetWoPlanListInPurchaseOrders: BaseUrl + "PurchaseOrderManagemntGetData/GetWoPlanListInPurchaseOrders",
    PalningMrp: BaseUrl + "PurchaseOrderManagemntGetData/PalningMrp",
    ProcessDates: BaseUrl + "PurchaseOrderManagemntGetData/ProcessDates",








};

const Buttons = {
    claimType_Add: "#btn-claimType-add",
    calimType_confirmAdd: "#btn-claimType-confirmAdd",
    calimType_confirmEdit: "#btn-claimType-confirmEdit",
    stokEtiketi_reset: "#btn-stokEtiketi-reset",
    stokEtiketi_tekEtiket: "#btn-stokEtiketi-tekEtiket",
    stokEtiketi_topluEtiket: "#btn-stokEtiketi-topluEtiket",
    stokEtiketi_mamulA4: "#btn-stokEtiketi-mamulA4",
    stokEtiketi_A4: "#btn-stokEtiketi-A4",
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
    urunEtiketi_etiketEkle: "#btn-urunEtiketi-etiketEkle",
    urunEtiketi_dikey_20_80: "#btn-urunEtiket-dikey_20_80",
    urunEtiketi_reset: "#btn-urunEtiketi-reset",
    urunEtiketi_yatay_30_60: "#btn-urunEtiketi-yatay_30_60",
    urunEtiketi_tekil_20_80: "#btn-urunEtiket-tekil_20_80",
    sevkiyetkutuEtiketi_reset: "#btn-sevkiyatKutuEtiketi-reset",
    sevkiyetKutuEtiketi_etiketEkle: '#btn-sevkiyatKutuEtiketi-etiketEkle',
    sevkiyetKutuEtiketi_etiket_100_150: "#btn-sevkiyatKutuEtiketi-etiket_100_150",
    girisKabulEitketi_reset: '#btn-girisKabulEtiketi-reset',
    girisKabulEitketi_etiketEkle: "#btn-girisKabulEtiketi-etiketEkle",
    girisKabulEitketi_A4Zirva: "#btn-girisKabulEtiketi-A4Zirva"
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


    newNc_summary: "#newNc-summary",
    urunEtiketi_modelContnet: ".urunEtiketi-printModelContnet",
    printModeOut: ".printModeOut",
    systemUser_add: "#systemUser-AddModel",
    systemUser_edit: "#systemUser-editModel",
      boxType_edit: "#boxType-editModel",

}
const TablesId = {

    Stok_searchStkInStokgen: "#table-stok-stokgenSearch",
    purchaseOrderMangemnet: "#table-purchaseOrderMangemnet",
    UrunEtiketi_searchStkInStokgen: "#table-urunEtiketi-searchStk",
    productionOrdersInUrunEtketi: "#table-urunEtiketi-productioOrders",
    productionOrdersInStok: "#table-stok-productionOrders",
    makineler: "#table-makineler",
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
    settingsReject: "#table-settingsReject",
    settingsOperator: "#table-settingsOperator",
    settingsOperatorPolivalance: "#table-settingsOperatorPolivalance",
    girisKontrol: "#table-girisKontrol",
    systemUser: "#table-systemUser",
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
    bakimOzeti: "#table-bakimOzeti",
    BakimKayit: "#table-BakimKayit",
    bakimSorumlulari: "#table-bakimSorumlulari",
    bakimArziaKapama: "#table-bakimArziaKapama",
    bakimGirisi: "#table-bakimGirisi",
    bakimPlanlama: "#table-bakimPlanlama",
    planliBakim: "#table-planliBakim",
    allBakimRecords: "#table-allBakimRecords",
    bakimEtiketi: "#table-bakimEtiketi",

};

const Inputs = {
    gunlukHatBazindaUretim_searchMachineNo: "#inp-gunlukHatBazindUretim-searchMakine",
    bakimOzeti_machineNo: "#inp-bakimOzeti-SearchMachineNo",
    bakimGirisi_machineNo: "#inp-bakimGirisi-SearchMachineNo",
    allBakimRecords_searchMachineNo:"#inp-allBakimRecords-SearchMachineNo",
    bakimPlanlama_machineNo: "#inp-bakimPlanlama-SearchMachineNo",
    planliBakim_machineNo: "#inp-planliBakim-SearchMachineNo",
    makineler_searchMachineNo: "#inp-makineler-SearchMachineNo",
    bakimEtiketi_searchMachineNo: "#inp-bakimEtiketi-SearchMachineNo",
    bakimArizaKapama_machineNo: "#inp-bakimArziaKapama-SearchMachineNo",
    bakimSorumlulari_searchName:"#inp-bakimSorumlulari-operatorName",
    girisKabulEtiketi_searchStk: "#inp-girisKabulEtiketi-stkSearch",
    girisKabulEtiketi_paketlemeMiktari: "#inp-girisKabulEtiketi-paketlemeMiktari",
    stokEtiekt_stkSearch: "#inp-stokEtiketi-stkSearch",
    stokEtiekt_paketlemeTarihi: "#inp-stokEtiketi-paketletmeTarih",
    stokEtiekt_paketlemeMiktari: "#inp-stokEtiketi-paketlemeMiktari",
    sevKabulEtiketi_stkSearch: "#inp-sevkiyatKutuEtiketi-stkSearch",
    sevKabulEtiketi_paketlemeMiktari: "#inp-sevkiyatKutuEtiketi-paketlemeMiktari",
    allWo_searchStk: "#inp-allWo-searchStk",
    allWo_ProductionOrdersPrintout: "#inp-ProductionOrdersPrintout-searchStk",
    uretimplani_searchByStk: "#inp-uretimPlani-searchStk",
    bakimAriza_tarih: "#inp-bakimAriza-tarih",
    bakimAriza_searchMachineNo: "#inp-bakimArzia-searchInAllMachines",
    bakimAriza_selectedMachineNo: '#inp-bakimAriza-selectedMachineNo',
    boxType_searchStk: '#inp-boxType-searchStk',
    machineSettings_machineNo: '#inp-machineSettings-machineNo',
    machineSettings_machineName: '#inp-machineSettings-machineName',
    settingsProcessNew_processAdi: '#inp-settingsProcessNew-searchprocessAdi',
    ProductionSummary_searchStk: "#inp-productionSummary-searchStk",
    orderDetails_searchStk: "#inp-orderDetails-searchStk",
    componentOrders_searchStk: "#inp-componentOrders-searchStk",
    customerOrders_searchStk: "#inp-customerOrders-searchStk",
    findInBom_searchStk: "#inp-findInBom-searchStk",
    tamirIsEmri_searchByStk: "#inp-tamirIsEmri-inputSearch",
    tmairIsEmri_stk: ".tamirIsEmri-first-stk",
    tmairIsEmri_LotNo: ".tamirIsEmri-first-lotNo",
    tmairIsEmri_tamirMiktar: ".tamirIsEmri-first-tamirMiktari",
    tmairIsEmri_tarih: ".tamirIsEmri-first-tarih",
    tamirIsEmri_newLotNo: "#inp-tamirIsemri-newLotNo",
    settingsReject_searchRejectName: "#inp-settingsReject-searchRejectName",
    addOrUpdateProcess_searchStk: "#inp-addOrUpdateProcess-stokSearch",
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
    settingsOperator_searchOperatorName: "#inp-settingsOperator-searchOperatorName",
    girisKontrol_searchStk: "#inp-girisKontrol-searchUrunNo",
    urunEtiketi_searchStk: "#inp-urunEtiketi-inputSearch",
    urunEtiketi_stk: "#inp-urunEtiketi-stk",
    urunEtiketi_lotNo: "#inp-urunEtiketi-lotNot",
    urunEtiketi_paketlemTarihi: "#inp-urunEtiketi-paketletmeTarih",
    urunEtiketi_paketlemMiktari: "#inp-urunEtiketi-paketlemMiktari",
    urunEtiketi_etiketAdet: "#inp-urunEtiketi-etiketAdet",
    urunEtiketlePaketlemeTarihi: "#inp-urunEtiketi-paketletmeTarih",
    prodcutionStart_searchStk: "#inp-prodcutionStart-searchStk",
    productionStatus_searchStk: "#inp-productionStatus-searchStk",
    teslimatDurumu_searchStk: "#inp-teslimatDurumu-searchStk",
    shippmentReport_searchStk: "#inp-shippmentReport-searchStk",
    tranferWo_searchStk: "#inp-tranferWo-searchStk",
    systemUsers_searchEmail:"#inp-systemUser-searchEmail"

}
const recordsNotFound = {
    productionOrders: "#recordNotFoundDiv_productionOrders",
    bakimOzeti: "#recordNotFoundDiv_bakimOzeti",
    bakimGirisi: "#recordNotFoundDiv_bakimGirisi",
    planliBakim: "#recordNotFoundDiv_planliBakim",
    bakimPlanlama: "#recordNotFoundDiv_bakimPlanlama",
    makineler: "#recordNotFoundDiv_makineler",
    altStok: "#recordNotFoundDiv_altStok",
    galvanize: "#recordNotFoundDiv_Galvanize",
    Dosyalar: "#recordNotFoundDiv_dosyalar",
    bomProcess: "#recordNotFoundDiv_bomProcess",
    stokRecetesi: "#recordNotFoundDiv_stokRecetesi",
    uretimInStok: "#recordNotFoundDiv_uretim",
    BakimAriaz_AllMachines: "#recordNotFoundDiv_bakimAriza_AllMachines",
    bakimArziaKapama: "#recordNotFoundDiv_bakimArizaKapma",
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
    settingsReject: "#recordNotFound_settingsReject",
    settingsOperator: "#recordNotFound_settingsOperator",
    settingsOperatorPolivalance: "#recordNotFoundDiv_settingsOperatorPolivalance",
    allBakimRecords: "#recordNotFoundDiv_allBakimRecords",
    bakimEtiketi: "#recordNotFoundDiv_bakimEtiketi",



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
    girisKontrol: "#recordNotFoundDiv_girisKontrol",
    systemUser: "#recordNotFound_systemUser",
    bakimSorumlulari: "#recordNotFound_bakimSorumlulari",
    
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
    settingsReject: "#btn-settingsReject-previous",
    machineSettings: "#btn-machineSettings-previous",
    bakimAriza_AllMachines: "#btn-bakimAriza-previous",
    bakimAriza_gecmisTalepler: "#btn-bakimArizaGecmisTalepler-previous",
    tamirIsEmri_productionOrders: "#btn-tamirIsEmri-previous",
    orderDetails: "#btn-orderDetails-previous",
    componentOrders: "#btn-componentOrders-previous",
    customerOrders: "#btn-customerOrders-previous",
    findInBom: "#btn-findInBom-previous",
    settingsOperator: "#btn-settingsOperator-previous",
    allWo: "#btn-allWo-previous",
    ProductionOrdersPrintout: "#btn-ProductionOrdersPrintout-previous",
    girisKontrol: "#btn-girisKontrol-pervious",
    prodcutionStart: "#btn-prodcutionStart-previous",
    productionStatus: "#btn-productionStatus-previous",
    shippmentReport: "#btn-shippmentReport-previous",
    teslimatDurumu: "#btn-teslimatDurumu-previous",
    systemUser: "#btn-systemUser-previous",
    sekiyetKutuEtiketi_sekKabul: "#btn-sevkiyatKutuEtiketi-previous",
    girisKabulEtiketi: "#btn-girisKabulEtiketi-previous",
    stokEtiketi: "#btn-stokEtiketi-previous",
    bakimOzeti: "#btn-bakimOzeti-previous",
    bakimSorumlulari: "#btn-bakimSorumlulari-previous",
    bakimArziaKapama: "#btn-bakimArziaKapama-previous",
    bakimGirisi: "#btn-bakimGirisi-previous",
    bakimPlanlama: "#btn-bakimPlanlama-previous",
    planliBakim: "#btn-planliBakim-previous",
    makineler: "#btn-makineler-previous",
    allBakimRecords: "#btn-allBakimRecords-previous",
    bakimEtiketi: "#btn-bakimEtiketi-previous",

};
const Texts = {
    sevKabulEtiketi_stk: "#txt-sevkiyatKutuEtiketi-stk",
    sevKabulEtiketi_tarih: "#txt-sevkiyatKutuEtiketi-tarih",
    sevKabulEtiketi_firmaAdi: "#txt-sevkiyatKutuEtiketi-frimaAdi",
    sevKabulEtiketi_kaliteKodu: "#txt-sevkiyatKutuEtiketi-kaliteKodu",
    sevKabulEtiketi_siparisNo: "#txt-sevkiyatKutuEtiketi-siparisNo",
    sevKabulEtiketi_rafAdres1: "#txt-sevkiyatKutuEtiketirafAdres1",
    sevKabulEtiketi_rafAdres2: "#txt-sevkiyatKutuEtiketi-rafAdres2",
    sevKabulEtiketi_sevAdresi: "#txt-sevkiyatKutuEtiketi-sevAdresi",
    sevKabulEtiketi_faturaAdresi: "#txt-sevkiyatKutuEtiketi-faturaAdresi",
    sevKabulEtiketi_kutuMiktari: "#txt-sevkiyatKutuEtiketi-kutuMiktari",
    stokEtiketi_stk: "#txt-stokEtiketi-stk",
    stokEtiketi_file18: "#txt-stokEtiketi-filed18",
    stokEtiketi_file19: "#txt-stokEtiketi-filed19",
    stokEtiketi_kutuMiktari: "#txt-stokEtiketi-kutuMiktari",

    girisKabulEtiketi_stk: "#txt-girisKabulEtiketi-stk",
    girisKabulEtiketi_tarih: "#txt-girisKabulEtiketi-tarih",
    girisKabulEtiketi_firmaAdi: "#txt-girisKabulEtiketi-firmaAdi",
    girisKabulEtiketi_kaliteKodu: "#txt-girisKabulEtiketi-kaliteKodu",
    girisKabulEtiketi_siparisNo: "#txt-girisKabulEtiketi-siparisNo",
    girisKabulEtiketi_filed18: "#txt-girisKabulEtiketi-filed18",
    girisKabulEtiketi_filed19: "#txt-girisKabulEtiketi-filed19",
    girisKabulEtiketi_kutuMiktari: "#txt-girisKabulEtiketi-kutuMiktari",
    girisKabulEtiketi_paketlemeMiktari: "#txt-girisKabulEtiketi-paketlemeMiktari",


}
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
    orderDetails: "#btn-orderDetails-next",
    componentOrders: "#btn-componentOrders-next",
    customerOrders: "#btn-customerOrders-next",
    settingsReject: "#btn-settingsReject-next",
    findInBom: "#btn-findInBom-next",
    settingsOperator: "#btn-settingsOperator-next",
    allWo: "#btn-allWo-next",
    ProductionOrdersPrintout: "#btn-ProductionOrdersPrintout-next",
    girisKontrol: "#btn-girisKontrol-next",
    prodcutionStart: "#btn-prodcutionStart-next",
    productionStatus: "#btn-productionStatus-next",
    shippmentReport: "#btn-shippmentReport-next",
    teslimatDurumu: "#btn-teslimatDurumu-next",
    systemUser: "#btn-systemUser-next",
    sekiyetKutuEtiketi_sekKabul: "#btn-sevkiyatKutuEtiketi-next",
    girisKabulEtiketi: "#btn-girisKabulEtiketi-next",
    stokEtiketi: "#btn-stokEtiketi-next",
    bakimOzeti: "#btn-bakimOzeti-next",
    bakimSorumlulari: "#btn-bakimSorumlulari-next",
    bakimArziaKapama: "#btn-bakimArziaKapama-next",
    bakimGirisi: "#btn-bakimGirisi-next",
    bakimPlanlama: "#btn-bakimPlanlama-next",
    planliBakim: "#btn-planliBakim-next",
    makineler: "#btn-makineler-next",
    allBakimRecords: "#btn-allBakimRecords-next",
    bakimEtiketi: "#btn-bakimEtiketi-next",


};
const pageNumbers = {
    stok_prodcutionOrders: "#number-productionOrders-pageNumber",
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
    settingsOperator: "#number-settingsOperator-pageNumber",
    girisKontrol: "#number-girisKontrol-pageNumber",
    systemUser: "#number-systemUser-pageNumber",
    bakimSorumlulari: "#num-bakimSorumlulari-pageNumber",
    makineler: "#num-makineler-pageNumber",
    allBakimRecords: "#num-allBakimRecords-pageNumber",
    bakimEtiketi: "#num-bakimEtiketi-pageNumber",
}

function ShowLoader() {
    $('.loader-Container').fadeIn();
    //$('.loader-Container').css('display', 'block');
}

function HideLoader() {
    $('.loader-Container').fadeOut('slow');
    //  $('.loader-Container').css('display', 'none');

}
function checkRowCount(rowCount) {
    let messag = "";
    rowCount = rowCount % 2;
    rowCount !== 0 ? messag = 'tek' : messag = 'cift';
    return messag;
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
function checkInput(c) {
    let Isempty;
    $(`.${c}`).find("input").each(function () {
        if (this.value == "") {
            Isempty = true;
        }
        else Isempty = false;
    })
    return Isempty;
}
function ShowPrintModal() {
    $(TablesId.printModal).css('opacity', '1');
}
function HidePrintModal() {
    $(TablesId.printModal).css('opacity', '0');
}


function validateEmail(email) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false) {
        return false;
    }
    return true;
}

String.prototype.turkishtoEnglish = function () {
    return this.replace('Ğ', 'g')
        .replace('Ü', 'u')
        .replace('Ş', 's')
        .replace('I', 'i')
        .replace('İ', 'i')
        .replace('Ö', 'o')
        .replace('Ç', 'c')
        .replace('ğ', 'g')
        .replace('ü', 'u')
        .replace('ş', 's')
        .replace('ı', 'i')
        .replace('ö', 'o')
        .replace('İ', 'I')
        .replace('ç', 'c');
};