beforeEach(() => {
  cy.visit("http://localhost:8787/login");
  cy.contains("Login to your account");
  cy.get("input[data-testid=email-input]").type("test@test.com");
  cy.get("input[data-testid=password-input]").type("123qwe123qwe");
  cy.get("button[class*='login-form-submit']").click();
  cy.url().should("eq", "http://localhost:8787/news");
});
it("All posts displays correctly", () => {
  cy.get("[data-testid=app-header-main]").contains("Member");
  cy.get("[data-testid=app-header-main]").contains("Test User");
  cy.get("img[alt='Avatar image']").should(
    "have.attr",
    "src"
  );
});
