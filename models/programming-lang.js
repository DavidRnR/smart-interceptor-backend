const mongoose = require('mongoose');

const programmingLangSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ProgrammingLang', programmingLangSchema);