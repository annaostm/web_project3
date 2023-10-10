//End to end testing of the movies page.

describe('Checks the movies page', () => {

  it('renders correctly', () => {
    cy.visit('/movies')
  })

  //Checking if the link on the first card that comes up leads 
  // to the correct place
  it('check learn more link on first card', () => {
    cy.visit('/movies')
    cy.get('[data-cy="about-link"]').first().click()
    cy.location('pathname').should('eq', '/movies/s1')
    cy.go('back')
    })

  //Check if the first cards that come up when a user
  //types something is correct
  it('check search bar', () => {
    cy.get('[data-cy="search"]').type('dark')
    cy.get('[data-cy="about-link"]').first().click()
    cy.location('pathname').should('eq', '/movies/s1040')
    cy.go('back')
//Typing "shum" in the search bar, and then choosing "Documentaries"-filter
    cy.get('[data-cy="search"]').type('schum')
    cy.get('[data-cy="filter-menu"]').parent().first().click().get('ul > li[data-value="Documentaries"]').click();
    cy.get('[data-cy="about-link"]').first().click()
    cy.location('pathname').should('eq', '/movies/s69')
    cy.go('back')
//Typing "s" in the search bar, and then choosing "Oldest" in the sort-filter
    cy.get('[data-cy="search"]').type('s')
    cy.get('[data-cy="filter-menu"]').parent().eq(1).click().get('ul > li[data-value="Oldest"]').click();
    cy.get('[data-cy="about-link"]').first().click()
    cy.location('pathname').should('eq', '/movies/s8661')
    cy.go('back')
    cy.get('[data-cy="filter-menu"]').parent().eq(1).click().get('ul > li[data-value="Newest"]').click();
    cy.get('[data-cy="about-link"]').first().click()
    cy.location('pathname').should('eq', '/movies/s10')
    cy.go('back')
//Pageinating the results and then typing something
//Makes sure the user wont get empty result
    cy.visit('/movies')
    cy.get('[data-cy="next-page"]').click()
    cy.get('[data-cy="search"]').type('anna')
    cy.get('[data-cy="about-link"]').first().click()
    cy.location('pathname').should('eq', '/movies/s2469')
    cy.go('back')
  })


//Checking the pageination buttons
    it('checks if the right cards come up when you pageinate', () => {
        cy.visit('/movies')
        //Checking if the first card on the next page is correct
        cy.get(`[data-cy="next-page"]`).click()
        cy.get('[data-cy="about-link"]').first().click()
        cy.location('pathname').should('eq', '/movies/s1010')
        cy.go('back')
        //Checking if the first card on the last page is correct
        cy.get(`[data-cy="last-page"]`).click()
        cy.get('[data-cy="about-link"]').first().click()
        cy.location('pathname').should('eq', '/movies/s999')
        cy.go('back')
        //Checking if the first card on the second last page is correct
        cy.get(`[data-cy="last-page"]`).click()
        cy.get(`[data-cy="previous-page"]`).click()
        cy.get('[data-cy="about-link"]').first().click()
        cy.location('pathname').should('eq', '/movies/s986')
        cy.go('back')
        //Checking if the first card on the first page is correct when
        // the 'first' button is clicked
        cy.get(`[data-cy="last-page"]`).click()
        cy.get(`[data-cy="first-page"]`).click()
        cy.get('[data-cy="about-link"]').first().click()
        cy.location('pathname').should('eq', '/movies/s1')
        cy.go('back')
    })
})

