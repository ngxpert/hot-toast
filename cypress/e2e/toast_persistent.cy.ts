/// <reference types="cypress" />

import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - persistent', () => {
  it('should show and hide persistent toast, and it should not open again', () => {
    cy.get('#persistent')
      .click()
      .should(() => {
        expect(localStorage.getItem('ngxpert/hototast-persist-1')).to.eq('1');
      });
    cy.get('hot-toast').as('persistentToast');
    cy.get('@persistentToast').should('contain', 'I can be opened only once across multiple browser sessions!');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@persistentToast').should('not.be.visible');
    cy.get('@persistentToast').should('not.exist');
    cy.get('#persistent')
      .click()
      .should(() => {
        expect(localStorage.getItem('ngxpert/hototast-persist-1')).to.eq('0');
      });
    cy.get('@persistentToast').should('not.exist');
  });
});
