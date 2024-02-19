/// <reference types="cypress" />

import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - html', () => {
  it('should show and hide toast with template', () => {
    cy.get('#html').click();
    cy.get('hot-toast').as('htmlToast');

    cy.get('@htmlToast').find('.hot-toast-message').children().as('children');
    cy.get('@children').should('have.length', 1);
    cy.get('@children').should(
      'contain.html',
      `I don't know why I am <i>tilted</i>! Maybe I need some <u class="bg-toast-100">ground support</u>.`
    );
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@htmlToast').should('not.be.visible');
    cy.get('@htmlToast').should('not.exist');
  });
});
