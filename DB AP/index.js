const mongoose = require("mongoose")
mongoose.connect(
    "mongodb+srv//admin:admin@cluster0.gb15l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true},
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Succesfully connected to MongoDB");
});

const memberSchema = mongoose.Schema({
    name: String,
    email: String,
    credit: Number,

})

const Member = mongoose.model("Member", memberSchema);

const memberOne = new Member({
    name: "Greg",
    email: "greg@gmail.com",
});
memberOne.save();