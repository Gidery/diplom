import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
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
        required: true
    },
    imageUrl: String
}, {
    timestamps: true,
})

export default mongoose.model('News', NewsSchema)