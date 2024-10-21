const axios = require('axios');
const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');

// Fetch leads from dummy API
exports.getLeads = async (req, res) => {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users'); // Dummy API
    const leads = data.map(user => ({
      lead_id: user.id,
      name: user.name,
      email: user.email,
      status: "Interested"
    }));
    res.json({
      message: "Leads fetched successfully",
      data: leads
  });
    
    // Save to DB
    await Lead.insertMany(leads);
    res.status(200).json({ message: 'Leads fetched and stored successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leads', error });
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
