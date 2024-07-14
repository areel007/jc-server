import mongoose from "mongoose";
import { config } from "./config";

import app from "./app";

const port = config.port || 4141;

if (config.databaseURL && config.databasePassword) {
  const DB = config.databaseURL.replace("<password>", config.databasePassword);
  // Now you can use DB safely
  mongoose.set("strictQuery", false);

  mongoose.connect(DB).then((con) => {
    console.log("DB connection succesful");
  });
} else {
  console.error(
    "DATABASE or DATABASE_PASSWORD environment variable is not defined"
  );
  // Handle the situation where environment variables are not defined
  //#
}

app.listen(port, () => console.log(`Server running on ${port}`));
