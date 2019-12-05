const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { user_logged } = require("../middleware/auth");
const Item = require('../models/toDoItemModel');

router.post('/', user_logged, async(req, res) => {
    try {
        let content = req.body.content;
        let item = {
            _id: new mongoose.Types.ObjectId,
            userId: req.userId,
            content: content
        }
        let newItem = new Item(
            item
        )
        let savedItem = await newItem.save();

        res.status(201).json({
            dateOfcreated: savedItem.dateOfcreated,
            _id: savedItem._id,
            content: savedItem.content
        });

    } catch (error) {
        res.json({
            error: error.errors
        });
    }
});

router.get('/', user_logged, async(req, res) => {
    try {
        let allTodoItems = await Item.find({ userId: req.userId, isDeleted: false })
            .select("-__v -isDeleted")
            .populate('userId', '-password -isDeleted -__v -dateRegister')
        res.status(200).json(allTodoItems);
    } catch (error) {
        res.status(500).status({
            message: error
        });
    }
});

router.delete('/', user_logged, async(req, res) => {
    try {
        let deletedItem = await Item.findOneAndUpdate({
            $and: [
                { _id: req.body.itemId },
                { userId: req.userId },
                { isDeleted: false }
            ]
        }, { $set: { isDeleted: true } })
        return res.status(200).json({
            message: "Deleted Successful",
            content: deletedItem.content
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Error"
        });
    }
})

module.exports = router;