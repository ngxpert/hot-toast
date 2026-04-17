/// <reference types="cypress" />

describe('Test hot toasts - router integration', () => {
  beforeEach(() => {
    cy.visit('/router-integration-e2e');
    cy.get('#route-e2e-close-all').scrollIntoView().click({ force: true });
    cy.get('hot-toast', { timeout: 500 }).should('not.exist');
  });

  it('shows NavigationStart toast then updates it to success on NavigationEnd', () => {
    cy.get('#route-e2e-navigate-a').scrollIntoView().click({ force: true });

    // Loading state while navigating
    cy.get('hot-toast-component', { timeout: 5000 }).should('contain', 'Navigating...');

    // Updated in-place once navigation completes
    cy.get('hot-toast-component', { timeout: 5000 }).should('contain', 'Navigation complete');

    cy.get('#route-e2e-close-all').scrollIntoView().click({ force: true });
    cy.get('hot-toast', { timeout: 6000 }).should('not.exist');
  });

  it('updates the same toast in place for a second navigation', () => {
    cy.get('#route-e2e-navigate-b').scrollIntoView().click({ force: true });

    cy.get('hot-toast-component', { timeout: 5000 }).should('contain', 'Navigating...');
    cy.get('hot-toast-component', { timeout: 5000 }).should('contain', 'Navigation complete');

    cy.get('#route-e2e-close-all').scrollIntoView().click({ force: true });
    cy.get('hot-toast', { timeout: 6000 }).should('not.exist');
  });

  it('does not stack multiple toasts during rapid navigation', () => {
    cy.get('#route-e2e-navigate-a').scrollIntoView().click({ force: true });
    cy.get('#route-e2e-navigate-b').scrollIntoView().click({ force: true });

    // Only one toast is ever visible at a time
    cy.get('hot-toast-component', { timeout: 5000 }).should('have.length', 1);

    cy.get('#route-e2e-close-all').scrollIntoView().click({ force: true });
    cy.get('hot-toast', { timeout: 6000 }).should('not.exist');
  });

  it('shows a fresh toast after the previous one has been dismissed', () => {
    cy.get('#route-e2e-navigate-a').scrollIntoView().click({ force: true });
    cy.get('hot-toast-component', { timeout: 5000 }).should('contain', 'Navigation complete');

    cy.get('#route-e2e-close-all').scrollIntoView().click({ force: true });
    cy.get('hot-toast', { timeout: 6000 }).should('not.exist');

    cy.get('#route-e2e-navigate-b').scrollIntoView().click({ force: true });
    cy.get('hot-toast-component', { timeout: 5000 }).should('contain', 'Navigating...');
  });
});
