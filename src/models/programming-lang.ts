import mongoose, { model } from 'mongoose';

const programmingLangSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ProgrammingLang = model('ProgrammingLang', programmingLangSchema);

export default ProgrammingLang;