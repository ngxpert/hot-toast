/// <reference types="cypress" />
import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - error', () => {
  it('should show and hide error toast', () => {
    cy.get('#error').click();
    cy.get('hot-toast').as('errorToast');

    cy.get('@errorToast').should('contain', `This didn't work.`);
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.error);
    cy.get('@errorToast').should('not.be.visible');
    cy.get('@errorToast').should('not.exist');
  });
});
