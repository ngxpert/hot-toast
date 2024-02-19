/// <reference types="cypress" />

describe('Test hot toasts - events', () => {
  it('should show and hide toast and generate close event', () => {
    cy.get('#events').click();
    cy.get('.hot-toast-bar-base').as('eventsToast');

    cy.get('@eventsToast').should('contain', 'Events');
    cy.get('@eventsToast').should('be.visible');
    cy.wait(5000);
    cy.get('#closed-event-data').contains('"dismissedByAction"');
    cy.get('@eventsToast').should('not.exist');
  });
});
