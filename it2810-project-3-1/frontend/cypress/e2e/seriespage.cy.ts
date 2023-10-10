//End to end testing of the series page.

describe('Checks the series page', () => {

  it('renders correctly', () => {
    cy.visit('/series')
  })

  //Checking if the link on the first card that comes up leads 
  // to the correct place
  it('check learn more link on first card', () => {
    cy.visit('/series')
    cy.get('[data-cy="about-link"]').first().click()
    cy.location('pathname').should('eq', '/series/s100')
    cy.go('back')
    })

  //Check if the first cards that come up when a user
  //types something is correct
  it('check search bar', () => {
    cy.get('[data-cy="search"]').type('dark')
    cy.get('[data-cy="about-link"]').first().click()
    cy.location('pathname').should('eq', '/series/s2230')
    cy.go('back')
//Typing "sc" in the search bar, and then choosing "British TV Shows"-filter
    cy.get('[data-cy="search"]').type('sc')
    cy.get('[data-cy="filter-menu"]').parent().first().click().get('ul > li[data-value="British TV Shows"]').click();
    cy.get('[data-cy="about-link"]').first().click()
    cy.location('pathname').should('eq', '/series/s4509')
    cy.go('back')
//Choosing "Oldest" in the sort-filter, and then typing "s" in the search bar, and then the same with "Newest"
    cy.get('[data-cy="filter-menu"]').parent().eq(1).click().get('ul > li[data-value="Oldest"]').click();
    cy.get('[data-cy="search"]').type('s')
    cy.get('[data-cy="about-link"]').first().click()
    cy.location('pathname').should('eq', '/series/s4251')
    cy.go('back')
    cy.get('[data-cy="filter-menu"]').parent().eq(1).click().get('ul > li[data-value="Newest"]').click();
    cy.get('[data-cy="search"]').type('s')
    cy.get('[data-cy="about-link"]').first().click()
    cy.location('pathname').should('eq', '/series/s1005')
    cy.go('back')
//Pageinating the results and then typing something
//Makes sure the user wont get the impression of an empty result
    cy.visit('/series')
    cy.get('[data-cy="next-page"]').click()
    cy.get('[data-cy="search"]').type('anna')
    cy.get('[data-cy="about-link"]').first().click()
    cy.location('pathname').should('eq', '/series/s2662')
    cy.go('back')
  })


//Checking the pageination buttons
    it('checks if the right cards come up when you pageinate', () => {
        cy.visit('/series')
        //Checking if the first card on the next page is correct
        cy.get(`[data-cy="next-page"]`).click()
        cy.get('[data-cy="about-link"]').first().click()
        cy.location('pathname').should('eq', '/series/s1041')
        cy.go('back')
        //Checking if the first card on the last page is correct
        cy.get(`[data-cy="last-page"]`).click()
        cy.get('[data-cy="about-link"]').first().click()
        cy.location('pathname').should('eq', '/series/s973')
        cy.go('back')
        //Checking if the first card on the second last page is correct
        cy.get(`[data-cy="last-page"]`).click()
        cy.get(`[data-cy="previous-page"]`).click()
        cy.get('[data-cy="about-link"]').first().click()
        cy.location('pathname').should('eq', '/series/s928')
        cy.go('back')
        //Checking if the first card on the first page is correct when
        // the 'first' button is clicked
        cy.get(`[data-cy="last-page"]`).click()
        cy.get(`[data-cy="first-page"]`).click()
        cy.get('[data-cy="about-link"]').first().click()
        cy.location('pathname').should('eq', '/series/s100')
        cy.go('back')
    })
})

