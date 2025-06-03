const request = require("supertest");
const app = require("../../index");

describe("GET /api/rezervacije", () => {
  test("vrati rezervacije kao array", async () => {
    const response = await request(app).get("/api/rezervacije");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
