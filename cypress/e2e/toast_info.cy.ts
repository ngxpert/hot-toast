/// <reference types="cypress" />

import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - info', () => {
  it('should show and hide info toast', () => {
    cy.get('#info').click();
    cy.get('hot-toast').as('infoToast');

    cy.get('@infoToast').should('contain', 'I must be super-useful!');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.info);
    cy.get('@infoToast').should('not.be.visible');
    cy.get('@infoToast').should('not.exist');
  });
});
