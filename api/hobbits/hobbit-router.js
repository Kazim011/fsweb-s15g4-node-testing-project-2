const HobbitModel = require("./hobbit-model");
const {
  nameUniqia,
  nameStringMi,
  hobbitIdKontrol,
} = require("./hobbit-middleware");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const hobbits = await HobbitModel.getAll();
    res.status(200).json(hobbits);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", hobbitIdKontrol, async (req, res, next) => {
  try {
    const { id } = req.params;
    const hobbitID = await HobbitModel.getById(id);
    res.status(200).json(hobbitID);
  } catch (error) {
    next(error);
  }
});

router.post("/", nameStringMi, nameUniqia, (req, res, next) => {
  HobbitModel.create(req.body)
    .then((hobbit) => {
      res.status(201).json(hobbit);
    })
    .catch((err) => next(err));
});

module.exports = router;
