/// <reference types="cypress" />

describe('Test hot toasts - dismissible', () => {
  it('should show and hide dismissible toast', () => {
    cy.get('#dismissible').click();
    cy.get('hot-toast').as('dismissibleToast');

    cy.get('@dismissibleToast').should('contain', 'Dismissible');
    cy.get('@dismissibleToast').find('.hot-toast-close-btn').as('closeBtn').should('exist');
    cy.wait(350);
    cy.get('@closeBtn').click();
    cy.get('@dismissibleToast').should('not.be.visible');
    cy.get('@dismissibleToast').should('not.exist');
  });
});
