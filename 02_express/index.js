import "dotenv/config";
import express from "express";
import logger from "./logger";
import morgan from "morgan";

const app = express();
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

const port = process.env.PORT || 4000;

const teas = [];
let teaId = 1;

//create a tea
app.post("/tea", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: teaId++,
    name,
    price,
  };
  teas.push(newTea);
  res.status(200).send(newTea);
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(206).send(teas);
});

//get a tea with id
app.get("/tea/:id", (req, res) => {
  const tea = teas.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  } else {
    res.status(203).send(tea);
  }
});

//update a tea
app.put("/tea/:id", (req, res) => {
  const tea = teas.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(202).send("Tea updated");
});

//delete a tea
app.delete("/tea/:id", (req, res) => {
  const index = teas.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("tea not found");
  }
  teas.splice(index, 1);
  res.status(200).send("deleted");
});

app.listen(port, () => {
  console.log(`server is running at port : ${port}`);
});
