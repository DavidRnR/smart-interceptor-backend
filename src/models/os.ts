import mongoose, { model } from 'mongoose';

const OsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const OS = model('OS', OsSchema);

export default OS;