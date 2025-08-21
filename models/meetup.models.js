const mongoose = require("mongoose");

const meetupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    photos: {
        type: String,
    },
    typeOfEvent: {
        type: String,
        enum: ["Online", "Offline", "Both"],
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    dressCode: {
        type: String,
        required: true
    },
    ageRestrictions: {
        type: String,
        required: true
    },
    eventTags: [
        {
            type: String,
        },
    ],
    dateAndTime: {
         type: String,
         required: true
    },
    eventVenue: {
        type: String,
        required: true
    },
    eventAddress: {
        type: String,
        required: true
    },
    eventsPricing: {
        type: Number,
    },
    speakers: [
        {
            type: String,
            required: true
        }
    ]
},
{
    timestamps: true
}
);

const Meetup = mongoose.model("Meetup", meetupSchema);

module.exports = Meetup;