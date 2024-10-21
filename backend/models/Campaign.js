const mongoose = require('mongoose');
const CampaignSchema = new mongoose.Schema({
    campaign_id: Number,
    campaign_name: String,
    leads_generated: Number
  });
  
  module.exports = mongoose.model('Campaign', CampaignSchema);