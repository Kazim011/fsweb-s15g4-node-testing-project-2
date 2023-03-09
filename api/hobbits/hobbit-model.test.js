const db = require("./../../data/dbConfig");
const HobbitsModel = require("./hobbit-model");
const superTest = require("supertest");
const server = require("../server");

test("test environment testing olarak ayarlı", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("GET", () => {
  test("[1] hobbitler geliyor mu", async () => {
    const hobbits = await HobbitsModel.getAll();
    expect(hobbits).toBeDefined();
    expect(hobbits).toHaveLength(4);
    expect(hobbits[0]).toHaveProperty("name", "sam");
  });
  test('[2] istenilen id"li öğe geliyor mu', async () => {
    const hobbit = await HobbitsModel.getById(2);
    expect(hobbit).toBeDefined();
    expect(hobbit).toMatchObject({ name: "frodo" });
  });

  test("[3] eklenen hobit doğru formatta geliyor mu", async () => {
    const newHobbit = await HobbitsModel.create({ name: "Kazım" });
    expect(newHobbit).toBeDefined();
    expect(newHobbit).toMatchObject({ name: "Kazım" });
  });
});

describe("Hobbit Test GET isteği", () => {
  it("[1] Doğru Sayıda Görev Geliyor mu ", async () => {
    const res = await superTest(server).get("/api/hobbits");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(4);
  }, 1000);

  it("[2] İlk index dogru geliyor mu ", async () => {
    const res = await superTest(server).get("/api/hobbits");
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("name", "sam");
  }, 1000);

  it("[3] istenilen id'li hobbit geliyor mu", async () => {
    const res = await superTest(server).get("/api/hobbits/1");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ name: "sam" });
  }, 1000);

  it("[4] İstenilen id yoksa 404 hata kodu dönüyor", async () => {
    const res = await superTest(server).get("/api/hobbits/5");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Hobbit Yok");
  }, 1000);
});

describe("Hobbit Test POST isteği ", () => {
  it("[1] ekibe yeni Hobbit  ekleniyor mu ", async () => {
    let newHobbit = { name: "Toronto" };
    const res = await superTest(server).post("/api/hobbits").send(newHobbit);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Toronto");
  }, 1000);

  it("[2] ekibe aynı Hobbit  eklenince hata dönüyor mu ", async () => {
    let newHobbit = { name: "sam" };
    const res = await superTest(server).post("/api/hobbits").send(newHobbit);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(`${newHobbit.name} ismi zaten var`);
  }, 1000);

  it("[3] eklenen hobbit ismi string olmayınca hata dönüyor mu ", async () => {
    let newHobbit = { name: 123 };
    const res = await superTest(server).post("/api/hobbits").send(newHobbit);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("name string degil");
  }, 1000);
});
