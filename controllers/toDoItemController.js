const mongoose = require('mongoose');
const Item = require('../models/toDoItemModel');
const date = require('date-and-time');
const prettyMs = require('pretty-ms')

let addTask = async(req, res) => {
    if (req.body === null || req.body === undefined) {
        return res.status(401).json({
            message: "Nothing To add"
        });
    }
    if (req.body.content === null || req.body.content === undefined) {
        return res.status(401).json({
            message: "Nothing To add"
        });
    }
    try {
        let content = req.body.content;
        // console.log(content);
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
        res.status(401).json({
            error: error.errors
        });
    }
}
let allTasks = async(req, res) => {
    console.log("Here");

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
}

let removeTask = async(req, res) => {
    if (req.body === null || req.body === undefined) {
        return res.status(401).json({
            message: "Sorry Something error"
        });
    }
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
            message: error
        });
    }
}


let startTask = (req, res) => {
    let itemId = req.body.itemId;

    let today = new Date();
    let startTime = date.format(today, 'D-M-Y  s:m:h');

    Item.findOneAndUpdate({
            $and: [
                { _id: itemId },
                { userId: req.userId },
                { isDeleted: false },
                { start: false }
            ]
        }, { $set: { start: true, startTime: startTime } }, { new: true }, (err, result) => {
            if (!result) {
                return res.status(401).json({
                    message: "This Task already Started"
                });
            }
            res.status(200).json(result);
        }).select("-isDeleted -__v -userId")
        // .select("isDeleted")
        // .then(result => {


    // })
}

let endTask = async(req, res) => {
    let endDate = new Date();
    let endTime = date.format(endDate, 'D-M-Y  s:m:h');

    let e = date.parse(endTime, 'D-M-Y  s:m:h')





    let itemId = req.body.itemId;

    let task = await Item.findById(itemId)

    let s = date.parse(task.startTime, 'D-M-Y  s:m:h')
    let diff = date.subtract(e, s).toMilliseconds();
    let duration = prettyMs(diff, { verbose: true })


    Item.findOneAndUpdate({
        $and: [
            { _id: itemId },
            { userId: req.userId },
            { isDeleted: false },
            { end: false }
        ]
    }, {
        $set: { end: true, endTime: endTime, duration: duration }
    }, { new: true }, (err, doc) => {
        if (!doc) {
            return res.status(401).json({
                message: "This Task already Ended"
            });
        }
        res.json(doc);
    })

}




module.exports = {
    addTask,
    allTasks,
    removeTask,
    startTask,
    endTask
}