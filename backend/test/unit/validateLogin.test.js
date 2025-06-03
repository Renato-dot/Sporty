const validateLogin = (username, password) => {
  if (!username || !password) return false;
  if (username === "admin" && password === "lozinka") return true;
  return false;
};

describe("validateLogin()", () => {
  test("vrati true za ispravne podatke", () => {
    expect(validateLogin("admin", "lozinka")).toBe(true);
  });

  test("vrati false za prazne podatke", () => {
    expect(validateLogin("", "")).toBe(false);
  });
});
