/// <reference types="cypress" />

import { EXIT_ANIMATION_DURATION } from '../../projects/ngxpert/hot-toast/src/lib/constants';

// The setTimeout in the example action uses 3000ms
const TOAST_REF_TIMEOUT = 3000;

describe('Test hot toasts - ToastRef', () => {
  it('should show toast and closed by toastRef', () => {
    cy.get('#toast-ref').click();
    cy.get('hot-toast').as('refToast');

    cy.get('@refToast').should('contain', 'I will be closed using ref.');
    // Wait for: setTimeout (3000ms) + exit animation (800ms)
    cy.wait(TOAST_REF_TIMEOUT + EXIT_ANIMATION_DURATION);
    cy.get('@refToast').should('not.exist');
  });

  it('should show toast and change message by toastRef', () => {
    cy.get('#toast-ref-msg').click();
    cy.get('hot-toast').as('refToast');

    cy.get('@refToast').should('contain', 'My message will be changed in 3 seconds.');
    // Wait for setTimeout (3000ms) to fire updateMessage
    cy.wait(TOAST_REF_TIMEOUT);
    cy.get('@refToast').should(
      'contain',
      // eslint-disable-next-line max-len
      `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    );
  });
});
