const express=require('express')
const router=express.Router();
const awaitHandlerFactory=require(`.//helper/awaitHandlerFactory`);
const Logins = require('./Model/Login.model');
const Menus = require('./Model/Menu.model');
const CommonAPIs = require('./Model/CommonAPIs.model');
const DataInputModel = require('./Model/DataInput.model');
const  UsageReportForExport = require('./Model/Reports.model');
// ping api to check application status
router.get('/ping', (req, res) => res.send('Hello World'))


router.post('/login/authenticateUsers',awaitHandlerFactory(Logins.authenticateUsers));
router.post('/Menu/GetMenu',awaitHandlerFactory(Menus.GetMenuItem));
router.post('/CommonAPIs/GetAccount',awaitHandlerFactory(CommonAPIs.GetAccount));
router.post('/CommonAPIs/GetServiceLine',awaitHandlerFactory(CommonAPIs.GetServiceLine));
router.post('/CommonAPIs/GetCategory',awaitHandlerFactory(CommonAPIs.GetCategory));
router.post('/CommonAPIs/GetVertical',awaitHandlerFactory(CommonAPIs.GetVertical));
router.post('/CommonAPIs/GetAccountByVertical',awaitHandlerFactory(CommonAPIs.GetAccountByVertical));
router.post('/DataInput/GetKPIDetails',awaitHandlerFactory(DataInputModel.GetKPIDetails));
router.post('/DataInput/SaveDataInputDetails',awaitHandlerFactory(DataInputModel.SaveDataInputDetails));
router.post('/DataInput/GetKPIDetailsForTargetSetting',awaitHandlerFactory(DataInputModel.GetKPIDetailsForTargetSetting));
router.post('/DataInput/UpdateApproveTargets',awaitHandlerFactory(DataInputModel.UpdateApproveTargets));
router.post('/DataInput/GetNPDKPIList',awaitHandlerFactory(DataInputModel.GetNPDKPIList));
router.post('/Reports/UsageReportForExport',awaitHandlerFactory(UsageReportForExport.UsageReportForExport));
router.post('/Reports/UsageReportWithData',awaitHandlerFactory(UsageReportForExport.UsageReportWithData));
router.post('/Reports/exportToCSV',awaitHandlerFactory(UsageReportForExport.exportToCSV));



module.exports=router;