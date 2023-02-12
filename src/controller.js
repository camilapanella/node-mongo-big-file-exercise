const Records = require("./records.model");
const csv = require("csvtojson");
const fs = require("fs");

const upload = async (req, res) => {
  // console.log(req)
  const { file } = req;

  /* Acá va tu código! Recordá que podés acceder al archivo desde la constante file */

  csv()
    .fromFile(file.path)
    .then((data) => {
      Records.insertMany(data)
        .then(function () {
          fs.unlink(file.path, (err) => {
            if (err) return res.status(500).json(err);
          });
          res.status(200).json({ message: "Data successfully imported" });
        })
        .catch(function (err) {
          return res.status(500).json(err);
        });
    });
};

const list = async (_, res) => {
  try {
    const data = await Records.find({}).limit(10).lean();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  upload,
  list,
};
