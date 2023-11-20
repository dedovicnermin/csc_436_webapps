const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        id: {type: Number, required: true, unique: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        todos: [{type: Schema.Types.ObjectId, ref: 'Todo'}]
    }
);

// export model
module.exports = mongoose.model('User', UserSchema);