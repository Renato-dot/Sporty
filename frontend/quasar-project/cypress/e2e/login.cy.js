describe("Admin login", () => {
  it("uspješan login preusmjerava na admin sučelje", () => {
    cy.visit("http://localhost:9000/#/Prijava");
    cy.get('input[type="text"]').type("user");
    cy.get('input[type="password"]').type("123");
    cy.get('[data-cy="btn-login"]').click();
    cy.url().should("include", "/admin");
  });
});
