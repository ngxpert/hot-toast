/// <reference types="cypress" />

describe('Test hot toasts - only one at a time', () => {
  it('should show only single toast with same id', () => {
    cy.get('#only-one-at-a-time').click();
    cy.get('#only-one-at-a-time').click();
    cy.get('hot-toast').should('have.length', 1);
  });
});
