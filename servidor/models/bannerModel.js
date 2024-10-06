const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: String
});

const Banner = mongoose.model('banner', imageSchema);
module.exports = Banner;
