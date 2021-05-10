const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
/* const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
 */
const router = require("./routes/personRoute");

const app = express();
const url =
  /* "mongodb://127.0.0.1:27017/test" || */
  "mongodb+srv://david:tGiaTtuEsh4I63uv@cluster0.bgr3n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => console.log(err));
/*   
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Person API",
      version: "1.0.0",
      description: "API for personal data",
      contact: {
        name: "Duke",
        email: "d@gmail.com",
        country: "Nigeria",
      },
      servers: ["https://localhost:3000", "https://zuritask3.herokuapp.com/"],
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

 */
app.use(express.json());

app.use(cors());

app.use("/api/v1/", router);
/* app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
