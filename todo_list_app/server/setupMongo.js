const mongoose = require("mongoose");
const uri = "mongodb+srv://nermin:nermin-secret@nermdev.6hbactn.mongodb.net/?retryWrites=true&w=majority"

function connect() {
    const options = { useNewUrlParser: true}
    mongoose.connect(uri, options).then(
        () => {console.log("Database connection established!");},
        err => {console.error("Error connecting to Database instance due to: ", err);}
    )
}

module.exports = connect
