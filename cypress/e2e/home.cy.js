describe('home', () => {
  it('webapp deve estar online', () => {
    cy.visit('/')

    cy.title().should('eq','Gerencie suas tarefas com Mark L')
    // outras formas de fazer //
    cy.title().should('contain', 'Gerencie suas tarefas com Mark L')
    cy.title().should('be.equal','Gerencie suas tarefas com Mark L')
  })
})