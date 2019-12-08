const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const Message = require('../../Models/Message');
const Channel = require('../../Models/Channel');

//Post message with channel_id
router.post('/:channel_id', [
    check('title', 'Title cannot be empty').not().isEmpty(),    
    check('desc', 'Description cannot be empty').not().isEmpty()
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    try {
        const message = new Message({
            channel: req.params.channel_id,
            title: req.body.title,
            desc: req.body.desc
        })
        await message.save();
        res.json(message);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
});

//Update message
router.put('/:channel_id/:message_id', [
    check('title', 'Title cannot be empty').not().isEmpty(),    
    check('desc', 'Description cannot be empty').not().isEmpty()
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    try {
        let message = await Message.findById(req.params.message_id);
        if(!message) return res.status(400).json({msg: 'Message cannot be found'});
        message = await Message.findOneAndUpdate(
            {channel:req.params.channel_id},
            {$set: {
                    "title": req.body.title,
                    "desc": req.body.desc
                }
            }
        )
        res.json(message);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
});

//Get all messages with channel_id
router.get('/:channel_id', async (req, res) => {
    try {
        const messages = await Message.find({channel: req.params.channel_id});
        if(!messages) return res.status(400).json({msg: 'This channel does not have any messages yet'});
        
        res.json(messages);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})

//Get message with message_id
router.get('/:channel_id/:message_id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.message_id);
        if(!message) return res.status(400).json({msg: 'This message does not exist'});

        res.json(message);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})

module.exports = router;