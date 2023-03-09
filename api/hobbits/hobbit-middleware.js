const db = require("../../data/dbConfig");

async function nameUniqia(req, res, next) {
  try {
    const { name } = req.body;
    const namevarMi = await db("hobbits").where({ name }).first();
    if (namevarMi) {
      res.status(401).json({ message: `${name} ismi zaten var` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function hobbitIdKontrol(req, res, next) {
  try {
    const { id } = req.params;
    let isExist = await db("hobbits").where({ id }).first();
    if (!isExist) {
      res.status(404).json({ message: "Hobbit Yok" });
    } else {
      req.hobbit = isExist;
      next();
    }
  } catch (error) {
    next(error);
  }
}

function nameStringMi(req, res, next) {
  if (typeof req.body.name !== "string") {
    res.status(401).json({ message: "name string degil" });
  } else {
    next();
  }
}

module.exports = {
  nameUniqia,
  nameStringMi,
  hobbitIdKontrol,
};
