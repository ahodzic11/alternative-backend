require("dotenv").config();

var cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

const config = require("./config");

const { port, allowedDomains } = config;

app.use(cors());
app.use(helmet());
app.use(compression());

const userRouter = require("./routes/users/userRouter");
const workshopRouter = require("./routes/workshops/workshopRouter");
const ativitiesRouter = require("./routes/activities/activityRouter");
const newsRouter = require("./routes/news/newsRouter");
const projectsRouter = require("./routes/projects/projectRouter");
const donatorsRouter = require("./routes/donators/donatorsRouter");
const offersRouter = require("./routes/offers/offerRouter");
const articleRouter = require("./routes/articles/articleRouter");
const reservationRouter = require("./routes/reservations/reservationRouter");
const questionRouter = require("./routes/questions/questionRouter");
const applicationRouter = require("./routes/applications/applicationRouter");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path");

//app.use(express.static('./../testna.nvo-alternative.org/static'));

//app.use(express.static(path.join(__dirname, "./../testna.nvo-alternative.org/index.html")); //here is important thing - no static directory, because all static :)
//app.use(express.static(path.join))
app.use(express.json());
app.use(fileUpload());

app.use("/api/users", userRouter);
app.use("/api/workshops", workshopRouter);
app.use("/api/activities", ativitiesRouter);
app.use("/api/news", newsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/donators", donatorsRouter);
app.use("/api/offers", offersRouter);
app.use("/api/articles", articleRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/questions", questionRouter);
app.use("/api/applications", applicationRouter);

//app.use(express.static('./../testna.nvo-alternative.org'));

//app.use('/', express.static(path.join(__dirname + './../testna.nvo-alternative.org')))
function formatPath(str) {
  var newString = str.trim().toLowerCase();
  var regexPattern = /\s+/g;
  newString = newString.replace("–", "").replace("-", "").replace("?", "").replace(/"/g, "").replace(/ć|č/g, "c").replace(/š/g, "s").replace(/đ/g, "d").replace(/ž/g, "z").replace(/:|-|,/g, "").replace(".", "").replace("„", "").replace("“", "").replace(/„/g, "").replace(/“/g, "");
  let rijeci = newString.replace(regexPattern, " ");
  return rijeci.replace(/ /g, "-");
}

app.post("/upload/:tipobjave/:naslov", (req, res) => {
  const { image } = req.files;
  const naslov = formatPath(req.params.naslov);
  const tipObjave = req.params.tipobjave;
  fs.mkdir(path.join(__dirname + "/newuploads/" + tipObjave + "/", naslov), (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Folder uspješno dodan");
  });

  if (image.length > 1) {
    let imageNumber = 0;
    image.forEach((slika) => {
      let slikaName = naslov + imageNumber + ".jpg";
      slika.mv(__dirname + "/newuploads/" + tipObjave + "/" + naslov + "/" + slikaName);
      imageNumber++;
    });
  } else image.mv(__dirname + "/newuploads/" + tipObjave + "/" + naslov + "/" + naslov + "0.jpg");

  res.sendStatus(200);
});

app.patch("/upload/:tipobjave/:naslov", (req, res) => {
  const { image } = req.files;
  const naslov = formatPath(req.params.naslov);
  const tipObjave = req.params.tipobjave;

  const testFolder2 = "./../backend/newuploads/" + tipObjave + "/" + naslov + "/";
  const slike = fs.readdirSync(testFolder2);
  let imageNumber = slike.map((slika) => Number(slika.replace(naslov, "").replace(".jpg", "")));
  imageNumber = imageNumber[imageNumber.length - 1] + 1;
  if (image.length > 1) {
    image.forEach((slika) => {
      let slikaName = naslov + imageNumber + ".jpg";
      slika.mv(__dirname + "/newuploads/" + tipObjave + "/" + naslov + "/" + slikaName);
      imageNumber++;
    });
  } else image.mv(__dirname + "/newuploads/" + tipObjave + "/" + naslov + "/" + naslov + imageNumber + ".jpg");

  res.sendStatus(200);
});

app.patch("/upload/galerija", (req, res) => {
  const { image } = req.files;

  const testFolder2 = "./../backend/newuploads/galerija/";
  const slike = fs.readdirSync(testFolder2);
  let imageNumber = slike.map((slika) => Number(slika.replace("slika", "").replace(".jpg", "")));
  imageNumber = imageNumber[imageNumber.length - 1] + 1;
  if (image.length > 1) {
    image.forEach((slika) => {
      let slikaName = "slika" + imageNumber + ".jpg";
      slika.mv(__dirname + "/newuploads/galerija/" + slikaName);
      imageNumber++;
    });
  } else image.mv(__dirname + "/newuploads/galerija/slika" + imageNumber + ".jpg");

  res.sendStatus(200);
});

app.patch("/updatelocation", (req, res) => {
  const type = req.body.type;
  const naziv = req.body.naziv;
  const oldNaziv = req.body.oldNaziv;

  fs.rename(__dirname + "/newuploads/" + type + "/" + formatPath(oldNaziv), __dirname + "/newuploads/" + type + "/" + formatPath(naziv), (err) => {
    if (err) {
      return console.log(err);
    }
    const testFolder2 = "./../backend/newuploads/" + type + "/" + formatPath(naziv) + "/";
    const slike = fs.readdirSync(testFolder2);
    for (let i = 0; i < slike.length; i++) {
      let brojSlike = slike[i].replace(formatPath(oldNaziv), "").replace(".jpg", "");
      fs.rename(__dirname + "/newuploads/" + type + "/" + formatPath(naziv) + "/" + slike[i], __dirname + "/newuploads/" + type + "/" + formatPath(naziv) + "/" + formatPath(naziv) + brojSlike + ".jpg", (err) => {
        if (err) {
          return console.log(err);
        }
      });
    }
  });
  res.json(200);
});

app.delete("/delete/:tipobjave/:naslov", (req, res) => {
  const naslov = formatPath(req.params.naslov);
  const tipObjave = req.params.tipobjave;
  fs.rm(path.join(__dirname + "/newuploads/" + tipObjave + "/", naslov), { recursive: true }, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Folder uspješno obrisan");
  });
  res.sendStatus(200);
});

app.delete("/delete/:tipobjave/:naslov/:nazivSlike", (req, res) => {
  const naslov = req.params.naslov;
  const tipObjave = req.params.tipobjave;
  const nazivSlike = req.params.nazivSlike;
  fs.rm(path.join(__dirname + "/newuploads/" + tipObjave + "/" + naslov, nazivSlike), { recursive: true }, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Slika uspješno obrisana");
  });
  res.sendStatus(200);
});

app.delete("/deleteimage/galerija/:nazivSlike", (req, res) => {
  const naslov = req.params.naslov;
  const tipObjave = req.params.tipobjave;
  const nazivSlike = req.params.nazivSlike;
  fs.rm(path.join(__dirname + "/newuploads/galerija/", nazivSlike), { recursive: true }, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Slika uspješno obrisana");
  });
  res.sendStatus(200);
});

app.get("/:nazivFoldera/:naslov", async (req, res) => {
  const naslov = req.params.naslov;
  const nazivFoldera = req.params.nazivFoldera;
  const testFolder2 = "./../backend/newuploads/" + nazivFoldera + "/" + naslov + "/";
  try {
    const slike = fs.readdirSync(testFolder2);
    res.json(slike);
  } catch (err) {}
});

app.get("/galerija/", async (req, res) => {
  const testFolder2 = "./../backend/newuploads/galerija/";
  try {
    const slike = fs.readdirSync(testFolder2);
    res.json(slike);
  } catch (err) {}
});

app.get("/index.html", (req, res) => {
  res.send("Hello, this is your index.html!");
});

app.listen(port, () => {
  console.log("Server up and running on port", port);
});
