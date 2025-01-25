import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db/index.js";
import { app } from "./app.js";
try {
  await connectDB();
  console.log("MongoDB connection SUCCESS");
  app.listen(process.env.PORT, () => {
    console.log("listening on port", process.env.PORT);
  });
} catch (error) {
  console.error("MongoDB connection FAIL", error);
  process.exit(1);
}
