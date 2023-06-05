import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match:  /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g
    },
    passwordHash: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    passportData: {
        series: {
            type: String,
            required: true,
            trim: true,
            minLength: 4,
            maxLength: 4,
            match: /\d{4}/g
        },
        number: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minLength: 6,
            maxLength: 6,
            match: /\d{6}/g
        },
    },
    actualAddress: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }

}, {
    timestamps: true,
})

export default mongoose.model('User', UserSchema)