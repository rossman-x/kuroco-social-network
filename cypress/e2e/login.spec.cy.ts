describe("empty spec", () => {
  it("Login correctly", () => {
    cy.visit("http://localhost:8787/login");
    cy.contains("Login to your account");
    cy.get("input[data-testid=email-input]").type("test@test.com");
    cy.get("input[data-testid=password-input]").type("123qwe123qwe");
    cy.get("button[class*='login-form-submit']").click();
    cy.url().should("eq", "http://localhost:8787/news");
  });
  it("Error during login process", () => {
    cy.visit("http://localhost:8787/login");
    cy.contains("Login to your account");
    cy.get("input[data-testid=email-input]").type("wrong@test.com");
    cy.get("input[data-testid=password-input]").type("123qwe123qwe");
    cy.get("button[class*='login-form-submit']").click();
    cy.url().should("eq", "http://localhost:8787/login");
    cy.contains("Error occurred");
    cy.contains("Error: Invalid email or password");
    cy.contains("Close").click();
    cy.contains("Login to your account");
  });
});
