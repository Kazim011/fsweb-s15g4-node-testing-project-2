/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return knex("hobbits")
    .truncate()
    .then(function () {
      return knex("hobbits").insert([
        { name: "sam" },
        { name: "frodo" },
        { name: "pippin" },
        { name: "merry" },
      ]);
    });
};
