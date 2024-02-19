/// <reference types="cypress" />

import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - success', () => {
  it('should show and hide success toast', () => {
    cy.get('#success').click();
    cy.get('hot-toast').as('successToast');

    cy.get('@successToast').should('contain', 'Successfully toasted!');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.success);
    cy.get('@successToast').should('not.be.visible');
    cy.get('@successToast').should('not.exist');
  });
});
