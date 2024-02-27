describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Ali",
      username: "Ali10",
      password: "1234567",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
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
      cy.contains("Ali logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("David");
      cy.get("#password").type("World154");
      cy.get("#login-btn").click();
      cy.contains("Wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("Ali10");
      cy.get("#password").type("1234567");
      cy.get("#login-btn").click();
    });

    it("A blog can be created", function () {
      cy.wait(6000);
      cy.contains("new blog").click();
      cy.get("#title").type("Python");
      cy.get("#author").type("Amir");
      cy.get("#url").type("https://example.com");
      cy.get("#create-btn").click();

      cy.wait(1000);
      cy.contains("a new blog Python by Amir added");
    });
  });
});
