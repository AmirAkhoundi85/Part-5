describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
     cy.contains("Log in to application");
         cy.get("#username");
         cy.get("#password");
         cy.get("#login-btn");
  });
  
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("Ali10");
      cy.get("#password").type("1234567");
      cy.get("#login-btn").click();
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("David");
      cy.get("#password").type("World154");
      cy.get("#login-btn").click();
      cy.contains("Wrong username or password");
    });
  });
});
