require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const authRoute = require("./routes/auth");
//const storyControllers = require("./controllers/StoryControllers")
//const Story = require("./model/StoryModel")
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

 app.get("/api/health", (req, res) => {
    res.json({
        service: "Backend Joblisting server",
        status: "active",
        time: new Date(),
    });
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.post('/api/stories', async (req, res) => {
    const { userId, stories } = req.body;
  
    try {
      // Find the story document for the user, or create a new one if it doesn't exist
      let storyDocument = await Story.findOne({ userId });
      if (!storyDocument) {
        storyDocument = new Story({ userId, stories: [] });
      }
  
      // Add the new stories to the existing document
      storyDocument.stories.push(...stories);
      await storyDocument.save();
  
      res.status(201).json({ message: 'Stories saved successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

//app.use("/api", storyControllers);



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