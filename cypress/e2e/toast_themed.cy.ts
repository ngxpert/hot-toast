/// <reference types="cypress" />

import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - themed', () => {
  it('should show and hide themed toast', () => {
    cy.get('#themed').click();
    cy.get('hot-toast').as('themedToast');
    cy.get('.hot-toast-bar-base').as('toastBase');
    cy.get('.hot-toast-checkmark-icon').as('checkMarkIcon');

    cy.get('@themedToast').should('contain', 'Look at my styles');

    // below will fail in firefox, known issue: https://github.com/cypress-io/cypress/issues/9349
    cy.get('@toastBase').should('have.css', 'border', '1px solid rgb(113, 50, 0)');
    cy.get('@toastBase').should('have.css', 'padding', '16px');
    cy.get('@toastBase').should('have.css', 'color', 'rgb(113, 50, 0)');
    cy.get('@checkMarkIcon').should('have.css', 'background-color', 'rgb(113, 50, 0)');
    cy.get('@checkMarkIcon').then(($el) => {
      const win = $el[0].ownerDocument.defaultView;
      const before = win.getComputedStyle($el[0], 'after');
      const borderColor = before.getPropertyValue('border-color');
      expect(borderColor).to.eq('rgb(255, 250, 238)');
    });
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.success);
    cy.get('@themedToast').should('not.be.visible');
    cy.get('@themedToast').should('not.exist');
  });
});
