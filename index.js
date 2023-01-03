const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 5000;
const mysql = require("mysql");
const bodyparser = require("body-parser");

app.use(bodyparser.json());

// Socket io section
io.on("connection", (socket) => {
  console.log("a user connected");
});


// Connection to database
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "monix_db",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql COnnected succesfful to database !!");
});


// Routes of our API
/**
 * Users routes
 */

// Get ALL Users route
app.get("/api/users", (req, res) => {
  let sqlQuery = "SELECT * FROM users";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});

// Get One User Route
app.get("/api/users/:id", (req, res) => {
  let sqlQuery = "SELECT * FROM users WHERE id=" + req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});

// Create a new User
app.post("/api/users", (req, res) => {
  let data = {
    name: req.body.name,
    phone: req.body.phone,
    password: req.body.password,
    amount: 500,
  };

  let sqlQuery = "INSERT INTO users SET ?";

  let query = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.status(200).json({ "message": "User Successfully created"})
  })
});

// Update User information
app.put("/api/users/:id", (req, res) => {
  let sqlQuery = "UPDATE users SET name='"+req.body.name+"', phone='"+ req.body.phone+"', password='"+ req.body.password+"' WHERE id="+ req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.status(200).json({ "message": "User successfully upadted"})
  })
})

// Update User amount
app.put("/api/users_amount/:id", (req, res) => {
  let sqlQuery = "UPDATE users SET amount='"+req.body.amount+"' WHERE id="+ req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.status(200).json({ "message": "User successfully upadted"})
  })
})

// Delete User
app.delete("/api/users/:id", (req, res) => {
  let sqlQuery = "DELETE FROM users WHERE id="+req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.status(200).json({ "message": "User successfully deleted"})
  })
})

/**
 * Transaction
 */
// Get ALL Transaction route
app.get("/api/transactions", (req, res) => {
  let sqlQuery = "SELECT * FROM transactions";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});

// Get One User Transaction
app.get("/api/transactions/:id", (req, res) => {
  let sqlQuery = "SELECT * FROM transactions WHERE id=" + req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});

// Create a new transactions
app.post("/api/transactions", (req, res) => {
  let data = {
    sender_phone: req.body.sender_phone,
    receiver_phone: req.body.receiver_phone,
    date: req.body.date,
    amount: req.body.amount,
  };

  let sqlQuery = "INSERT INTO transactions SET ?";

  let query = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.status(200).json({ "message": "transactions Successfully created"})
  })
});


// Update transactions
/*
app.put("/api/transactions/:id", (req, res) => {
  let sqlQuery = "UPDATE transactions SET name='"+req.body.name+"', phone='"+ req.body.phone+"', password='"+ req.body.password+"' WHERE id="+ req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.status(200).json({ "message": "transactions successfully upadted"})
  })
})
*/

// Delete User
app.delete("/api/transactions/:id", (req, res) => {
  let sqlQuery = "DELETE FROM transactions WHERE id="+req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.status(200).json({ "message": "transactions successfully deleted"})
  })
})

// app.get("/", (req, res) => {
//   res.send("<h1>Acceuil</h1>");
// });

app.listen(port, () => {
  console.log("server running on port " + port);
});
