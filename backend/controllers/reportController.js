const Lead = require('../models/Lead');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Utility function to ensure 'reports' directory exists
const ensureDirectoryExistence = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Generate PDF report
// Generate PDF report
exports.generatePdfReport = async (req, res) => {
  try {
    const leads = await Lead.find();

    // Ensure 'reports' directory exists
    const reportsDir = path.join(__dirname, '..', 'reports');
    ensureDirectoryExistence(reportsDir);

    // Create a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const pdfFileName = `report-${timestamp}.pdf`;

    // Create PDF document
    const doc = new PDFDocument();
    const pdfPath = path.join(reportsDir, pdfFileName);
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);
    
    doc.fontSize(20).text('Leads Report', { align: 'center' });
    doc.moveDown();
    
    leads.forEach(lead => {
      doc.fontSize(12).text(`${lead.lead_id}: ${lead.name} (${lead.email})`);
    });

    // End the PDF document and wait for the stream to finish
    doc.end();

    writeStream.on('finish', () => {
      // Send the PDF file as a download after the PDF is fully written
      res.download(pdfPath, pdfFileName, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error downloading PDF report', error: err });
        }
        // Clean up the file after sending the response
        fs.unlinkSync(pdfPath);
      });
    });

    writeStream.on('error', (err) => {
      console.error('Error writing PDF file:', err);
      res.status(500).json({ message: 'Error generating PDF report', error: err });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating PDF report', error });
  }
};


// Generate CSV report
exports.generateCsvReport = async (req, res) => {
  try {
    const leads = await Lead.find();

    // Ensure 'reports' directory exists
    const reportsDir = path.join(__dirname, '..', 'reports');
    ensureDirectoryExistence(reportsDir);

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(leads);

    // Create a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const csvFileName = `report-${timestamp}.csv`;
    const csvPath = path.join(reportsDir, csvFileName);

    // Use asynchronous file writing
    fs.writeFile(csvPath, csv, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error generating CSV report', error: err });
      }

      // Send the CSV file as a download
      res.download(csvPath, csvFileName, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error downloading CSV report', error: err });
        }
        // Clean up the file after sending the response
        fs.unlinkSync(csvPath);
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating CSV report', error });
  }
};
