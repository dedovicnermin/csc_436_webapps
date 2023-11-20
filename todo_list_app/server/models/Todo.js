const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
        id: {type: Number, required: true, unique: true},
        title: { type: String, required: true},
        description: { type: String },
        author: {type: Schema.Types.ObjectId, ref: 'User'},
        dateCreated: {type: String },
        completed: {type: Boolean},
        dateCompleted: {type: String}
    }
);

// export model
module.exports = mongoose.model('Todo', TodoSchema);