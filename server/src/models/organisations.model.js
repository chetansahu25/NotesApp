const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }

},
{
    timestamps: true
})

const Organisation = mongoose.model("Organisations", organisationSchema)

module.exports = Organisation