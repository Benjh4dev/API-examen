import express  from "express";
import "dotenv/config";
import cors from "cors"
import { bookingsRouter } from "./routes/bookings.js";
import { usersRouter } from "./routes/user.js";


const app = new express();

const port = process.env.PORT || 3001;


app.use(cors())
app.use(express.json());
app.use('/api', bookingsRouter)
app.use('/api', usersRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

