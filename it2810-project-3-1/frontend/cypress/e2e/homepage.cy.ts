//End to end testing of the home page. All tests are described
// by the 'it'-line.
describe('Renders the home page', () => {
  it('gets the home page and checks that content exists', () => {
     cy.visit('/');
     cy.get(".content").should("exist");
   })

  it('checks if text is correct', () => {
    cy.visit('/');
    cy.findByText("Editor's pick").should("exist");
    cy.findByText("Most viewed movies:").should("exist");
    cy.findByText("Most viewed series:").should("exist");
   })

   it('checks if movie card information is correct', () => {
    cy.visit('/');
    cy.get(".card").should("exist");
    cy.findByText("Grown Ups").should("exist");
    cy.findByText("Jaws").should("exist");
    cy.findByText("Aliens Stole My Body").should("exist");
    cy.findByText("Free Willy").should("exist");
   })

   it('checks if series card information is correct', () => {
    cy.visit('/');
    cy.findByText("Squid Game").should("exist");
    cy.findByText("Too Hot To Handle: Latino").should("exist");
    cy.findByText("Cooking With Paris").should("exist");
    cy.findByText("La casa de papel").should("exist");
    
   })


   it('checks home link in the navbar', () => {
    cy.visit('/')
    cy.contains('Home').click()
    cy.location('pathname').should('eq', '/')
    cy.go('back')
    })

  it('checks movies link in the navbar', () => {
    cy.visit('/');
    cy.contains('Movies').click()
    cy.location('pathname').should('eq', '/movies')
    cy.go('back')
    })
  

  it('checks series link in the navbar', () => {
    cy.visit('/');
    cy.contains('Series').click()
    cy.location('pathname').should('eq', '/series')
    cy.go('back')
  })

  it('checks Learn more link', () => {
    cy.visit('/');
    cy.contains('Learn More').click()
    cy.location('pathname').should('eq', '/movies/s28')
    cy.go('back')
  })
})



