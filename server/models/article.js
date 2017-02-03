import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Article = new Schema({
    writer: String,
    contents: String,
    publish:{ type: Boolean, default: true },

    starred: [String],
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    },
    is_edited: { type: Boolean, default: false }
});


export default mongoose.model('article', Article);
