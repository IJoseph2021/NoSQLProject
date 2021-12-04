const mongoose = require('mongoose');
const Schema = mongoose.Schema


const paperSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    authors:{
        type: Array,
        required: true,
        trim: true,
    },
    publication:{
        required: true,
        type: Object,
        name: String,
        journal: Boolean,
        year: Number,
        location: String

    }

})

const papers = mongoose.model('papers', paperSchema)
module.exports = papers;