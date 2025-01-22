const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secureKey123",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 },
  })
);

const connection = mysql.createPool({
  host: "ucka.veleri.hr",
  user: "lvalenta",
  password: "11",
  database: "lvalenta",
});
/*
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL database!");
});
*/
connection.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1); //
  }
  console.log("Connected to MySQL database!");
  connection.release();
});

// Export the pool for use in your application
module.exports = connection;
//prikaz opreme
app.get("/api/artikli", (req, res) => {
  const sql = "SELECT * FROM artikli";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(results);
  });
});

//registracija
app.post("/api/korisnici", (req, res) => {
  const {
    sifra_korisnika,
    ime_korisnika,
    prezime_korisnika,
    broj_telefona_korisnika,
    email_korisnika,
  } = req.body;
  const sql =
    "INSERT INTO korisnici (sifra_korisnika, ime_korisnika, prezime_korisnika, broj_telefona_korisnika, email_korisnika) VALUES (?, ?, ?, ?, ?)";
  const values = [
    sifra_korisnika,
    ime_korisnika,
    prezime_korisnika,
    broj_telefona_korisnika,
    email_korisnika,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      id: result.insertId,
      sifra_korisnika,
      ime_korisnika,
      prezime_korisnika,
      broj_telefona_korisnika,
      email_korisnika,
    });
  });
});

//prikaz terena
app.get("/api/tereni", (req, res) => {
  const sql = "SELECT * FROM Tereni";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(results);
  });
});

//dodavanje terena
app.post("/api/tereniAdd", (req, res) => {
  const { Naziv, Lokacija, Radno_vrijeme } = req.body;
  const sql =
    "INSERT INTO Tereni (Naziv, Lokacija, Radno_vrijeme) VALUES (?, ?, ?)";
  const values = [Naziv, Lokacija, Radno_vrijeme];

  connection.query(sql, values, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Tereni updated successfully" });
  });
});

//admin login
app.post("/api/admin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const query = "SELECT * FROM Admin WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      req.session.user = { id: results[0].id, username: results[0].username };
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

//tereni search
app.get("/api/tereniSearch", (req, res) => {
  const { query, searchByIme, searchByLokacija } = req.query;

  let sql = "SELECT * FROM Tereni WHERE 1=1";
  const params = [];

  if (query) {
    const lowerQuery = `%${query.toLowerCase()}%`;
    if (searchByIme === "true") {
      sql += " AND LOWER(Naziv) LIKE ?";
      params.push(lowerQuery);
    }
    if (searchByLokacija === "true") {
      sql += " AND LOWER(Lokacija) LIKE ?";
      params.push(lowerQuery);
    }
  }

  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching Tereni:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
