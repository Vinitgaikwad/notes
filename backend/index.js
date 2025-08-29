const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const UserRouter = require('./routes/UserRouter.js');
const NotesRouter = require('./routes/NotesRouter.js')

dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/user', UserRouter);
app.use('/notes', NotesRouter);

app.listen(process.env.PORT, () => {
    if (process.env.NODE_ENV === "test") {
        console.log("Server Started!", process.env.PORT);
    }
});