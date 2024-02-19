/// <reference types="cypress" />

import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - snackbar', () => {
  it('should show and toast with snackbar theme', () => {
    cy.get('#snackbar').click();
    cy.get('hot-toast').as('snackbarToast');

    cy.get('@snackbarToast').should('contain', 'Snackbar');
    cy.get('@snackbarToast').find('.hot-toast-bar-base-container').should('have.css', 'bottom', '0px');
    cy.get('@snackbarToast')
      .find('.hot-toast-bar-base-container')
      .should('have.attr', 'class')
      .should('contain', 'snackbar');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@snackbarToast').should('not.be.visible');
    cy.get('@snackbarToast').should('not.exist');
  });
});
