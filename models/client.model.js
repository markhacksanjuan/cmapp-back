const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema (
    {
        userId: {
            type: Schema.Types.ObjectId,
        },
        name: String,
        lastName : String,
        email: String,
        company: String
    },
    {
        timestamps: true
    }
)
const Client = mongoose.model('Client', clientSchema)
module.exports = Client