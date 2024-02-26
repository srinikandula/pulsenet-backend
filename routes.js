const express=require('express')
const router=express.Router();
const awaitHandlerFactory=require(`.//helper/awaitHandlerFactory`);
const Logins = require('./Model/Login.model');
const Menus = require('./Model/Menu.model');
const DataInputModel = require('./Model/DataInput.model');
const  UsageReportForExport = require('./Model/Reports.model');
const MastersModel = require('./Model/Masters.model');
// ping api to check application status
router.get('/ping', (req, res) => res.send('Hello World'))


router.post('/login/authenticateUsers',awaitHandlerFactory(Logins.authenticateUsers));
router.post('/Menu/GetMenu',awaitHandlerFactory(Menus.GetMenuItem));

router.post('/Masters/GetAccount',awaitHandlerFactory(MastersModel.GetAccount));
router.post('/Masters/GetServiceLine',awaitHandlerFactory(MastersModel.GetServiceLine));
router.post('/Masters/GetCategory',awaitHandlerFactory(MastersModel.GetCategory));
router.post('/Masters/GetAddUpdateVertical',awaitHandlerFactory(MastersModel.GetAddUpdateVertical));
router.post('/Masters/GetAccountByVertical',awaitHandlerFactory(MastersModel.GetAccountByVertical));
router.post('/Masters/GetAddUpdateClusters',awaitHandlerFactory(MastersModel.GetAddUpdateClusters));
router.post('/Masters/GetAddUpdateSubClusters',awaitHandlerFactory(MastersModel.GetAddUpdateSubClusters));
router.post('/Masters/GetAddUpdateService',awaitHandlerFactory(MastersModel.GetAddUpdateService));
router.post('/Masters/getadd',awaitHandlerFactory(MastersModel.getadd));

router.post('/DataInput/GetKPIDetails',awaitHandlerFactory(DataInputModel.GetKPIDetails));
router.post('/DataInput/SaveDataInputDetails',awaitHandlerFactory(DataInputModel.SaveDataInputDetails));
router.post('/DataInput/GetKPIDetailsForTargetSetting',awaitHandlerFactory(DataInputModel.GetKPIDetailsForTargetSetting));
router.post('/DataInput/UpdateApproveTargets',awaitHandlerFactory(DataInputModel.UpdateApproveTargets));
router.post('/DataInput/GetNPDKPIList',awaitHandlerFactory(DataInputModel.GetNPDKPIList));

router.post('/Reports/UsageReportForExport',awaitHandlerFactory(UsageReportForExport.UsageReportForExport));
router.post('/Reports/UsageReportWithData',awaitHandlerFactory(UsageReportForExport.UsageReportWithData));
router.post('/Reports/exportToCSV',awaitHandlerFactory(UsageReportForExport.exportToCSV));





module.exports=router;