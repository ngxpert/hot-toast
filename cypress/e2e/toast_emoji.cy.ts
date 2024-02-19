/// <reference types="cypress" />
import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - emoji', () => {
  it('should show and toast with emoji', () => {
    cy.get('#emoji').click();
    cy.get('hot-toast').as('emojiToast');

    cy.get('@emojiToast').should('contain', '👏');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@emojiToast').should('not.be.visible');
    cy.get('@emojiToast').should('not.exist');
  });
});
