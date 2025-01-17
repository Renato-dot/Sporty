
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "ucka.veleri.hr",
  user: "lvalenta",
  password: "11",
  database: "lvalenta",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL database!");
});

app.post("/api/artikli", (req, res) => {
  const { sifra_artikla, naziv_artikla, dostupna_kolicina, cijena_dan } =
    req.body;
  const sql =
    "INSERT INTO artikli (sifra_artikla, naziv_artikla, dostupna_kolicina, cijena_dan) VALUES (?, ?, ?, ?)";
  const values = [sifra_artikla, naziv_artikla, dostupna_kolicina, cijena_dan];

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      id: result.insertId,
      sifra_artikla,
      naziv_artikla,
      dostupna_kolicina,
      cijena_dan,
    });
  });
});

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

app.get("/api/korisnici", (req, res) => {
  const sql = "SELECT * FROM korisnici";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(results);
  });
});

app.post("/api/narudzbe", (req, res) => {
  const {
    sifra_narudzbe,
    sifra_korisnika,
    datum_iznajmljivanja,
    datum_vracanja,
    ukupan_iznos,
  } = req.body;
  const sql =
    "INSERT INTO narudzbe (sifra_narudzbe, sifra_korisnika, datum_iznajmljivanja, datum_vracanja, ukupan_iznos) VALUES (?, ?, ?, ?, ?)";
  const values = [
    sifra_narudzbe,
    sifra_korisnika,
    datum_iznajmljivanja,
    datum_vracanja,
    ukupan_iznos,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      id: result.insertId,
      sifra_narudzbe,
      sifra_korisnika,
      datum_iznajmljivanja,
      datum_vracanja,
      ukupan_iznos,
    });
  });
});

app.get("/api/narudzbe", (req, res) => {
  const sql = "SELECT * FROM narudzbe";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(results);
  });
});

app.post("/api/stavke_narudzbe", (req, res) => {
  const { sifra_artikla_narudzbe, sifra_narudzbe, sifra_artikla } = req.body;
  const sql =
    "INSERT INTO stavke_narudzbe (sifra_artikla_narudzbe, sifra_narudzbe, sifra_artikla) VALUES (?, ?, ?)";
  const values = [sifra_artikla_narudzbe, sifra_narudzbe, sifra_artikla];

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      id: result.insertId,
      sifra_artikla_narudzbe,
      sifra_narudzbe,
      sifra_artikla,
    });
  });
});

app.get("/api/stavke_narudzbe", (req, res) => {
  const sql = "SELECT * FROM stavke_narudzbe";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(results);
  });
});

app.put("/api/artikli/:id", (req, res) => {
  const { id } = req.params;
  const { sifra_artikla, naziv_artikla, dostupna_kolicina, cijena_dan } =
    req.body;
  const sql =
    "UPDATE artikli SET sifra_artikla = ?, naziv_artikla = ?, dostupna_kolicina = ?, cijena_dan = ? WHERE sifra_artikla = ?";
  const values = [
    sifra_artikla,
    naziv_artikla,
    dostupna_kolicina,
    cijena_dan,
    id,
  ];

  connection.query(sql, values, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Artikl updated successfully" });
  });
});

app.put("/api/korisnici/:id", (req, res) => {
  const { id } = req.params;
  const {
    sifra_korisnika,
    ime_korisnika,
    prezime_korisnika,
    broj_telefona_korisnika,
    email_korisnika,
  } = req.body;
  const sql =
    "UPDATE korisnici SET sifra_korisnika = ?, ime_korisnika = ?, prezime_korisnika = ?, broj_telefona_korisnika = ?, email_korisnika = ? WHERE sifra_korisnika = ?";
  const values = [
    sifra_korisnika,
    ime_korisnika,
    prezime_korisnika,
    broj_telefona_korisnika,
    email_korisnika,
    id,
  ];

  connection.query(sql, values, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Korisnik updated successfully" });
  });
});

app.put("/api/narudzbe/:id", (req, res) => {
  const { id } = req.params;
  const {
    sifra_narudzbe,
    sifra_korisnika,
    datum_iznajmljivanja,
    datum_vracanja,
    ukupan_iznos,
  } = req.body;
  const sql =
    "UPDATE narudzbe SET sifra_narudzbe = ?, sifra_korisnika = ?, datum_iznajmljivanja = ?, datum_vracanja = ?, ukupan_iznos = ? WHERE sifra_narudzbe = ?";
  const values = [
    sifra_narudzbe,
    sifra_korisnika,
    datum_iznajmljivanja,
    datum_vracanja,
    ukupan_iznos,
    id,
  ];

  connection.query(sql, values, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Narudzba updated successfully" });
  });
});

app.put("/api/stavke_narudzbe/:id", (req, res) => {
  const { id } = req.params;
  const { sifra_artikla_narudzbe, sifra_narudzbe, sifra_artikla } = req.body;
  const sql =
    "UPDATE stavke_narudzbe SET sifra_artikla_narudzbe = ?, sifra_narudzbe = ?, sifra_artikla = ? WHERE sifra_artikla_narudzbe = ?";
  const values = [sifra_artikla_narudzbe, sifra_narudzbe, sifra_artikla, id];

  connection.query(sql, values, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Stavka narudzbe updated successfully" });
  });
});

app.delete("/api/artikli/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM artikli WHERE sifra_artikla = ?";

  connection.query(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Artikl deleted successfully" });
  });
});

app.delete("/api/korisnici/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM korisnici WHERE sifra_korisnika = ?";

  connection.query(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Korisnik deleted successfully" });
  });
});

app.delete("/api/narudzbe/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM narudzbe WHERE sifra_narudzbe = ?";

  connection.query(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Narudzba deleted successfully" });
  });
});

app.delete("/api/stavke_narudzbe/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM stavke_narudzbe WHERE sifra_artikla_narudzbe = ?";

  connection.query(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Stavka narudzbe deleted successfully" });
  });
});

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

app.post("/api/admin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  }

  try {
    const [rows] = await connection.query(
      "SELECT * FROM Admin WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const secretKey = "mySuperSecretKey123!@#$%^&*()_+";
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// složeni upit
app.get("/api/artikli-with-korisnici", (req, res) => {
  const sql = `
    SELECT a.*, k.ime_korisnika, k.prezime_korisnika
    FROM artikli a
    INNER JOIN stavke_narudzbe sn ON a.sifra_artikla = sn.sifra_artikla
    INNER JOIN narudzbe n ON sn.sifra_narudzbe = n.sifra_narudzbe
    INNER JOIN korisnici k ON n.sifra_korisnika = k.sifra_korisnika
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(results);
  });
});
