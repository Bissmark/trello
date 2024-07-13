const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    name: String,
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Board', boardSchema);