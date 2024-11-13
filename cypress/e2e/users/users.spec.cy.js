describe("Open user ticket app", () => {
  beforeEach(() => {
    cy.loginViaUi();
  });

  it("Create a new user", () => {
    cy.visit("/users");
    cy.get("#New_user").click();
    cy.location("pathname").should("include", "users/new");

    // fill the form
    cy.get('[placeholder="Name.."]').type("Eduardo");
    cy.get('[placeholder="Username.."]').type("Eduardo");
    cy.get('[placeholder="Password.."]').type("Eduardo");
    cy.get("select").select("TECH", { force: true });

    // cy.intercept('POST', '/api/users/').as('newUser')

    cy.intercept({
      method: "POST",
      url: "*",
    }).as("newUser");

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('[type="submit"]').click();

    cy.wait("@newUser").then((interception) => {
      console.log(interception); // first api call
    });

    // cy.wait("@newUser").should(({ request, response }) => {
    //   console.log(request.body);
    //   expect(request.headers).to.have.property("content-type");
    //   expect(response && response.body).to.have.property(
    //     "name",
    //     "Using POST in cy.intercept()"
    //   );
    // });

    //   cy.wait('@newUser').then((interception) => {
    //     cy.log(interception) // first api call
    // })

    cy.screenshot();
  });
});
