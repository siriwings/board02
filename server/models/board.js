/**
 * 추후 board를 article로 바꾸고 article를 memo로 바꿀것...?!ㅋ
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Board = new Schema({
    writer: String,
    title:String,
    contents: String,
    publish:{ type: Boolean, default: true },
    count:{type:Number, required:true},
    starred: [String],
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    },
    is_edited: { type: Boolean, default: false }
});


export default mongoose.model('board', Board);