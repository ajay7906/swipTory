require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require('body-parser');
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/storyRoutes")
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connected!"))
    .catch((error) => console.log("DB failed to connect", error));


app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);






app.use("*", (req, res) => {
    res.status(404).json({ errorMessage: "Route not found!" });
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong!" });
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend server running at port ${PORT}`);
});