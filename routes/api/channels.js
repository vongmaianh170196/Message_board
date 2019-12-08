const express = require("express");
const router = express.Router();
const Channel = require('../../Models/Channel');

router.post('/', async(req, res) => {
    try {
        let channel = new Channel({
            title: req.body.title
        })
        await channel.save();
        res.json(channel);
    } catch (error) {
        console.log(error)
    }
})
//Get all channel
router.get('/', async (req, res) => {
    try {
        let channels = await Channel.find();
        res.json(channels);
    } catch (error) {
        console.log(error)
    }
});

//Get channel by id
router.get('/:id', async (req, res) => {
    try {
        let channel = await Channel.findById(req.params.id);
        res.json(channel);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;