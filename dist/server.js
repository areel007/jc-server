"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const app_1 = __importDefault(require("./app"));
const port = config_1.config.port || 4141;
if (config_1.config.databaseURL && config_1.config.databasePassword) {
    const DB = config_1.config.databaseURL.replace("<password>", config_1.config.databasePassword);
    // Now you can use DB safely
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.connect(DB).then((con) => {
        console.log("DB connection succesful");
    });
}
else {
    console.error("DATABASE or DATABASE_PASSWORD environment variable is not defined");
    // Handle the situation where environment variables are not defined
    //#
}
app_1.default.listen(port, () => console.log(`Server running on ${port}`));
