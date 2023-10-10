//End to end testing of the about page.

describe('Checks the About page for a movie/show', () => {

  //Checks if the page for a movie renders and if the content is correct for a specific movie id.
  it('movie renders correctly', () => {
    cy.visit('/movies/s14')
  })
  it('checks the content of movie page', () => {
    cy.visit('/movies/s14')
    //Checking that all the content of the page is correct and existing.
    cy.findByText("Confessions of an Invisible Girl").should("exist");
    cy.findByText("When the clever but socially-awkward Tetê joins a new school, she'll do anything to fit in. But the queen bee among her classmates has other ideas.").should("exist");
    cy.findByText("Release year: 2021").should("exist");
    cy.findByText("Duration: 91 min").should("exist");
    cy.findByText("Bruno Garotti").should("exist");
    cy.findByText("No available info about origin country for this title.").should("exist");
    cy.findByText("Klara Castanho, Lucca Picon, Júlia Gomes, Marcus Bessa, Kiria Malheiros, Fernanda Concon, Gabriel Lima, Caio Cabral, Leonardo Cidade, Jade Cardozo").should("exist");
    cy.findByText("Children & Family Movies").should("exist");
    cy.findByText("Comedies").should("exist");

    //Checking that all the user rating stars are clickable and the submit button appears after click
    cy.get('[data-cy="star-5"]').click();
    cy.get('[data-cy="star-4"]').click();
    cy.get('[data-cy="star-3"]').click();
    cy.get('[data-cy="star-2"]').click();
    cy.get('[data-cy="star-1"]').click();
    cy.get('[data-cy="submit-rating"]').should('exist');

    //Checking that you can type into the review field and the submit button appears
    cy.get('[data-cy="review"]').type("Very nice movie.");
    cy.get('[data-cy="submit-review"]').should('exist');
  })

  //Checks if the page for a series renders and if the content is correct for a specific movie id.
  it('series renders correctly', () => {
    cy.visit('/series/s5985')
  })
  it('checks the content of series page', () => {
    cy.visit('/series/s5985')
    //Checking that all the content of the page is correct and existing.
    cy.findByText("100% Hotter").should("exist");
    cy.findByText("A stylist, a hair designer and a makeup artist team up to give Britain's biggest fashion disasters some much-needed makeunders.").should("exist");
    cy.findByText("Release year: 2017").should("exist");
    cy.findByText("Duration: 1 Season").should("exist");
    cy.findByText("No available info about the director for this title.").should("exist");
    cy.findByText("United Kingdom").should("exist");
    cy.findByText("Daniel Palmer, Melissa Sophia, Karen Williams, Grace Woodward").should("exist");
    cy.findByText("British TV Shows").should("exist");
    cy.findByText("International TV Shows").should("exist");
    cy.findByText("Reality TV").should("exist");

    //Checking that all the user rating stars are clickable and the submit button appears after click
    cy.get('[data-cy="star-5"]').click();
    cy.get('[data-cy="star-4"]').click();
    cy.get('[data-cy="star-3"]').click();
    cy.get('[data-cy="star-2"]').click();
    cy.get('[data-cy="star-1"]').click();
    cy.get('[data-cy="submit-rating"]').should('exist');

    //Checking that you can type into the review field and the submit button appears
    cy.get('[data-cy="review"]').type("Very nice show.");
    cy.get('[data-cy="submit-review"]').should('exist');
  })
})

