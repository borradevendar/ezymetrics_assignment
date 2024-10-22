const axios = require('axios');
const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');

// Fetch leads from dummy API
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();

    if (!leads || leads.length === 0) {
      return res.status(404).json({ message: 'No leads found' }); // Single response for no leads
    }
    
    return res.json(leads); // Single response for found leads
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching leads', error }); // Single response for error
  }
};


// Fetch campaigns from dummy API
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = [
      { campaign_id: 1, campaign_name: "Summer Sale", leads_generated: 500 },
      { campaign_id: 2, campaign_name: "Winter Clearance", leads_generated: 800 }
    ];

    // Save to DB
    await Campaign.insertMany(campaigns);
    res.status(200).json({ message: 'Campaigns fetched and stored successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error });
  }
};
