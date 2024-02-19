/// <reference types="cypress" />
import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - component', () => {
  it('should show and hide component toast', () => {
    cy.get('#injector').click();
    cy.get('hot-toast').as('componentToast');

    cy.get('@componentToast').should('contain', 'I love Angular 🔥 Hot Toasts!');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@componentToast').should('not.be.visible');
    cy.get('@componentToast').should('not.exist');
  });
});
