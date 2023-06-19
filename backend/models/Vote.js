import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        require:true,
    },
    text: {
        type: String,
        trim: true,
        require:true,
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    imageUrl: String,
    options: [{
        label: {
            type: String,
            trim: true,
            require: true
        },
        votesNumber: {
            type: Number,
            default: 0
        }
    }],
    voterIds: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        required: true
    }
}, {
    timestamps: true,
})

export default mongoose.model('Vote', VoteSchema)