const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
const Message = require('../../Models/Message');
const Channel = require('../../Models/Channel');
const User = require('../../Models/User');

//Post message with channel_id
router.post('/:channel_id', [auth, [
    check('title', 'Title cannot be empty').not().isEmpty(),    
    check('desc', 'Description cannot be empty').not().isEmpty()
]],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    try {
        const message = new Message({
            channel: req.params.channel_id,
            user: req.user.id,
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
router.put('/:channel_id/:message_id', [auth, [
    check('title', 'Title cannot be empty').not().isEmpty(),    
    check('desc', 'Description cannot be empty').not().isEmpty()
]],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    try {
        let message = await Message.findById(req.params.message_id);
        if(!message) return res.status(400).json({msg: 'Message cannot be found'});
        if(message.user != req.user.id) return res.status(400).json({msg: "You do not have the right to edit this message"})
        message = await Message.findOneAndUpdate(
            {_id:req.params.message_id},
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

//Delte message
router.delete('/:message_id', auth,async (req, res) => {
    
    try {
        let message = await Message.findById(req.params.message_id);
        if(!message) return res.status(400).json({msg: 'Message cannot be found'});
        if(message.user != req.user.id) return res.status(400).json({msg: "You do not have the right to delete this message"})
        await message.remove();
        res.json({msg: "Removed"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
});

//Post reply
router.post('/replies/:message_id', [auth, [
    check('text', 'Text cannot be empty').not().isEmpty()
]],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    try {
        let message = await Message.findById(req.params.message_id);
        if(!message) return res.status(400).json({msg: 'Message cannot be found'});
        const user = await User.findById(req.user.id).select('-password');
        message.replies.unshift({
            username: user.username,
            text: req.body.text
        })
        await message.save();
        res.json(message.replies);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
});

//Delete reply
router.delete('/replies/:message_id/:reply_id', auth,async (req, res) => {
    
    try {
        let message = await Message.findById(req.params.message_id);

        const reply = message.replies.map(rep => rep._id).indexOf(req.params.reply_id);
        if(reply < 0) return res.status(404).json({msg: "Reply not found"});
        //Check user
        const user = await User.findById(req.user.id).select('-password')
        
        if(message.replies[reply].username.toString() !== user.username) return res.status(401).json({mesg: "You do not have the right to delete this reply"});
        
        //Remove reply
        const removeIndex = message.replies.map(rep => rep.username).indexOf(req.params.reply_id);
        message.replies.splice(removeIndex, 1);
        await message.save();
        res.json(message.replies)
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