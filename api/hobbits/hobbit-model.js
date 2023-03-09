const db = require("../../data/dbConfig");

function getAll() {
  return db("hobbits");
}

function getById(id) {
  return db("hobbits").where({ id }).first();
}

async function create(hobbit) {
  const [id] = await db("hobbits").insert(hobbit);
  const newHobbit = await db("hobbits").where({ id }).first();
  return newHobbit;
}

module.exports = {
  getAll,
  getById,
  create,
};
