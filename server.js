const express = require("express");
const app = express();
const db = require("./models");
const multer = require("multer");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view-engine', 'ejs')
app.use(express.static('views'))

 app.use("/", require("./routes/apiRoutes"));
 app.use('/profile', express.static('upload/images'));

 function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
      res.json({
          success: 0,
          message: err.message
      })
  }
}
app.use(errHandler);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});