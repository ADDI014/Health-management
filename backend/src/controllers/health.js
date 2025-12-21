
const HealthRecord = require("../models/HealthRecord");

const {generateHealthResult} = require("../utils/mockAI");

exports.submitHealth = async (req,res) => {
    try {
        const {sleep , stress, activity, appetite} = req.body;

        if(!sleep || !stress || !activity) {
            return res.status(400).json({message : "All fields required"});
        }

        const result = generateHealthResult({sleep , stress, activity});

        const record = await HealthRecord.create({
            userId : req.user.id,
            inputData : req.body,
            result
        });

        res.status(201).json(record);
    }
    catch {
        res.status(500).json({message : "Health submission failed"});
    }
}

exports.getHistory = async (req, res) => {
    try  {
        const history = await HealthRecord.find({userId : req.user.id}).sort({
            createdAt : -1
        });
        res.json(history);
    }
    catch {
        res.status(500).json({message : "Failed to fetch history"});
    }
}


