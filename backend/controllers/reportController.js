const Lead = require('../models/Lead');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Generate PDF report
exports.generatePdfReport = async (req, res) => {
  try {
    const leads = await Lead.find();
    
    // Create PDF document
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('report.pdf'));
    doc.text('Leads Report');
    leads.forEach(lead => {
      doc.text(`${lead.lead_id}: ${lead.name} (${lead.email})`);
    });
    doc.end();

    res.status(200).json({ message: 'PDF report generated!' });
  } catch (error) {
    res.status(500).json({ message: 'Error generating PDF report', error });
  }
};

// Generate CSV report
exports.generateCsvReport = async (req, res) => {
  try {
    const leads = await Lead.find();
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(leads);

    fs.writeFileSync('report.csv', csv);
    res.status(200).json({ message: 'CSV report generated!' });
  } catch (error) {
    res.status(500).json({ message: 'Error generating CSV report', error });
  }
};
