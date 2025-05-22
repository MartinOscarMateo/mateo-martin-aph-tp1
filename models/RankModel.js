import mongoose from "mongoose";

const Schema = mongoose.Schema;
const mySchema = new Schema({
    name: String,
    image: String,
});

const Rank = mongoose.model('ranks', mySchema );

export default Rank;