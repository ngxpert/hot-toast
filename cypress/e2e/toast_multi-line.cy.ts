/// <reference types="cypress" />

import { ENTER_ANIMATION_DURATION } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - multi line', () => {
  it('should show multi-line toast', () => {
    cy.get('#multi').click();
    cy.get('hot-toast').as('multiToast');

    cy.get('@multiToast').should(
      'contain',
      // eslint-disable-next-line max-len
      `This toast is super big.I don't think anyone could eat it in one bite. It's larger than you expected. You eat it but it does not seem to get smaller.`
    );
    cy.get('@multiToast')
      .find('.hot-toast-message')
      .then((el) => expect(countLines(el)).to.be.above(1));
    cy.wait(ENTER_ANIMATION_DURATION);
    cy.get('@multiToast').get('.hot-toast-close-btn').click();
    cy.get('@multiToast').should('not.be.visible');
    cy.get('@multiToast').should('not.exist');
  });
});

const countLines = (el) => {
  const divHeight = el.outerHeight();
  const lineHeight = parseInt(el.css('line-height'), 10);
  const lines = divHeight / lineHeight;
  return lines;
};
