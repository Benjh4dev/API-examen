import express  from "express";
import "dotenv/config";
import cors from "cors"


const app = new express();

const port = process.env.PORT || 3001;


app.use(cors())
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

