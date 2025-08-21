const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors());
const {initializeDatabase} = require("./db/db.connect");
const fs = require("fs");
const Meetup = require("./models/meetup.models");
app.use(express.json());
initializeDatabase();

// const jsonData = fs.readFileSync('meetup.json', 'utf-8');
// const meetupsData = JSON.parse(jsonData);

// function seedData() {
//     try{
//         for (const meetupData of meetupsData) {
//             const newMeetup = new Meetup({
//                 title: meetupData.title,
//                 host: meetupData.host,
//                 photos: meetupData.photos,
//                 typeOfEvent: meetupData.typeOfEvent,
//                 eventDescription: meetupData.eventDescription,
//                 dressCode: meetupData.dressCode,
//                 ageRestrictions: meetupData.ageRestrictions,
//                 eventTags: meetupData.eventTags,
//                 dateAndTime: meetupData.dateAndTime,
//                 eventVenue: meetupData.eventVenue,
//                 eventAddress: meetupData.eventAddress,
//                 eventPricing: meetupData.eventPricing,
//                 speakers: meetupData.speakers
//             });

//              console.log(newMeetup.title);
//              newMeetup.save();
//         }
//     } catch(error) {
//         console.log("Error seeding the data", error);
//     }
// }

// seedData();

async function createEvent(newEvent) {
    try{
        const event = new Meetup(newEvent);
        const saveEvent = await event.save();
        return saveEvent;
    } catch(error) {
        throw error
    }
}

app.post("/events", async (req, res) => {
    try{
        const event = await createEvent(req.body);
        res.status(201).json({message: "Added an event successfully.", newEvent: event});
    } catch(error) {
        console.error("Failed to add event", error);
        res.status(500).json({error: "Failed to add event.", details: error.message});
    }
});

async function readAllEvents() {
    try{
        const allEvents = await Meetup.find();
        return allEvents;
    } catch(error) {
        throw error
    }
}

app.get("/", (req, res) => {
    res.send("Hello events.");
});

app.get("/events", async (req, res) => {
    try{
        const events = await readAllEvents();
        if(events.length != 0){
            res.json(events);
        } else{
            res.status(404).json({error: "Events not found."});
        }
    } catch(error) {
        res.status(500).json({error: "Failed to fetch events."});
    }
});

async function readEventByTitle(eventTitle) {
    try{
        const event = await Meetup.findOne({title: eventTitle});
        return event;
    } catch(error) {
        throw error
    }
}

app.get("/events/:eventTitle", async (req, res) => {
    try{
        const event = await readEventByTitle(req.params.eventTitle);
        if(event) {
            res.json(event);
        } else{
            res.status(404).json({error: "Event not found."});
        }
    } catch(error) {
        res.status(500).json({error: "Failed to fetch event."});
    }
});

async function readEventByTag(eventTag) {
    try{
        const event = await Meetup.findOne({eventTags: eventTag});
        return event;
    } catch(error) {
        throw error
    }
}

app.get("/events/tag/:eventTag", async (req, res) => {
    try{
        const event = await readEventByTag(req.params.eventTag);
        if(event) {
            res.json(event);
        } else{
            res.status(404).json({error: "Event not found."});
        }
    } catch(error) {
        res.status(500).json({error: "Failed to fetch event."});
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});