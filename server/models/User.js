import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
    full_name: {type: String, required: true},
    username: {type: String, required: true},
    bio: {type: String, required: 'Hey there! I am using Vibely. Join me on my journey to build a better world. 🌎'},
    profile_picture: {type: String, required: ''},
    cover_photo: {type: String, required: ''},
    location: {type: String, required: ''},
    followers: [{type: String, ref: 'User'}],
    following: [{type: String, ref: 'User'}],
    connections: [{type: String, ref: 'User'}],

}, {timestamps: true, minimize: false});

const User = mongoose.model('User', UserSchema);

export default User;