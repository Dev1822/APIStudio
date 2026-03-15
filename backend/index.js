const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express()

app.use(cors());
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/APIStudio")
    .then(() => {
        console.log("MongoDB Connected Successfully")
    })
    .catch((err) => {
        console.log("Database connection error", err)
    })

const APISchema = new mongoose.Schema({
    method: {
        type: String,
        required: true,
        enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    },
    url: {
        type: String,
        required: true,
    },
    headers: {
        type: Array,
        default: [],
    },
    body: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const APIS = mongoose.model("api",APISchema);

app.get('/', async (req, res) => {
    try {
        const requests = await APIS.find().sort({});
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/', async (req, res) => {
    try {
        const newRequest = new APIS(req.body);
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRequest = await APIS.findByIdAndDelete(id);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json({ message: 'Request deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});