describe("Open user ticket app", () => {
  beforeEach(() => {
    cy.loginViaUi();
  });

  it("Create a new user, interceped response", () => {
    cy.visit("/users");
    cy.get("#New_user").click();
    cy.location("pathname").should("include", "users/new");

    // fill the form
    cy.get('[placeholder="Name.."]').type("Eduardo");
    cy.get('[placeholder="Username.."]').type("Edu");
    cy.get('[placeholder="Password.."]').type("123");
    cy.get("select").select("TECH", { force: true });

    cy.intercept(
      {
        method: "POST",
        url: "**/api/users",
      },
      {
        statusCode: 201,
      }
    ).as("newUser");

    cy.get('[type="submit"]').click();

    cy.wait("@newUser").then(({ request }) => {
      expect(request && request.body).to.have.property('name', 'Eduardo')
      expect(request && request.body).to.have.property('username', 'Edu')
      expect(request && request.body).to.have.property('password', '123')
      expect(request && request.body).to.have.property('role', 'TECH')
    });
    cy.wait(200);
    cy.screenshot();
  });
});
