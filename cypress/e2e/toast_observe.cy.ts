/// <reference types="cypress" />

import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - observe', () => {
  it('should show and hide observe toast', () => {
    cy.get('#observe').click();
    cy.get('hot-toast').as('observeToast');

    cy.get('@observeToast').should('contain', 'Saving...');
    cy.wait(1000);
    cy.get('@observeToast').should('not.contain', 'Saving...');
    cy.get('@observeToast').then((observeToast) => {
      if (observeToast.text() === 'Settings saved!') {
        cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.success);
        cy.get('@observeToast').should('not.be.visible');
      } else {
        cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.error);
        cy.get('@observeToast').should('not.be.visible');
      }
    });
    cy.wait(1000);
    cy.get('@observeToast').should('not.exist');
  });
});
