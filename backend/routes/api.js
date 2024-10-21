const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const reportController = require('../controllers/reportController');
const alertController = require('../controllers/alertController');

// Routes for fetching data
router.get('/leads', leadController.getLeads);
router.get('/campaigns', leadController.getCampaigns);

// Routes for reporting
router.get('/report/pdf', reportController.generatePdfReport);
router.get('/report/csv', reportController.generateCsvReport);

// Routes for alerts
router.get('/alerts', alertController.sendEmailAlert);

module.exports = router;
