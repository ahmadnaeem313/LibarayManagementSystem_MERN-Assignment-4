const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const bookSchema = new Schema({


    picture: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    Rtype: {
        type: String, required: true
    },
    comments:
    {
        type: [String], Default: ['This room was osm']
    },
    likes: {
        type: Number, Default: 20
    },
    price:
    {
        type: Number, required: true
    },
});

const bookSchemamodule = mongoose.model('hotelRooms', bookSchema);

module.exports = bookSchemamodule