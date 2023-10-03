// Express app setup
const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// Postgres client setup
const pgClient = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Express route handlers

app.get("/", async (req, res) => {
  try {
    await pgClient.query("CREATE TABLE IF NOT EXISTS personas(number INT)");
    res.send("Hi");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * from personas");
  res.send(values.rows.map((num) => num.number));
});

// app.post("/values", async (req, res) => {
//   const index = req.body.index;
//   parseInt(index) > 40 ? res.status(422).send("Index too high") : null;

//   pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

//   res.send({ working: true });
// });

app.listen(3000, (err) => {
  console.log("Listening");
});
