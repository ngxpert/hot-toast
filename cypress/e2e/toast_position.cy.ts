/// <reference types="cypress" />

import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - position', () => {
  it('should show and hide toast on top-left position', () => {
    cy.get('#top-left').click();
    cy.get('hot-toast').as('topLeftToast');

    cy.get('@topLeftToast').should('contain', 'I am on top-left');
    cy.get('@topLeftToast').find('.hot-toast-bar-base-container').should('have.css', 'left', '0px');
    cy.get('@topLeftToast').find('.hot-toast-bar-base-container').should('have.css', 'top', '0px');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@topLeftToast').should('not.exist');
  });

  it('should show and hide toast on top-center position', () => {
    cy.get('#top-center').click();
    cy.get('hot-toast').as('topCenterToast');

    cy.get('@topCenterToast').should('contain', 'I am on top-center');
    cy.get('@topCenterToast').find('.hot-toast-bar-base-container').should('have.css', 'justify-content', 'center');
    cy.get('@topCenterToast').find('.hot-toast-bar-base-container').should('have.css', 'left', '0px');
    cy.get('@topCenterToast').find('.hot-toast-bar-base-container').should('have.css', 'right', '0px');
    cy.get('@topCenterToast').find('.hot-toast-bar-base-container').should('have.css', 'top', '0px');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@topCenterToast').should('not.exist');
  });

  it('should show and hide toast on top-right position', () => {
    cy.get('#top-right').click();
    cy.get('hot-toast').as('topRightToast');

    cy.get('@topRightToast').should('contain', 'I am on top-right');
    cy.get('@topRightToast').find('.hot-toast-bar-base-container').should('have.css', 'right', '0px');
    cy.get('@topRightToast').find('.hot-toast-bar-base-container').should('have.css', 'top', '0px');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@topRightToast').should('not.exist');
  });

  it('should show and hide toast on bottom-left position', () => {
    cy.get('#bottom-left').click();
    cy.get('hot-toast').as('bottomLeftToast');

    cy.get('@bottomLeftToast').should('contain', 'I am on bottom-left');
    cy.get('@bottomLeftToast').find('.hot-toast-bar-base-container').should('have.css', 'bottom', '0px');
    cy.get('@bottomLeftToast').find('.hot-toast-bar-base-container').should('have.css', 'left', '0px');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@bottomLeftToast').should('not.exist');
  });

  it('should show and hide toast on bottom-center position', () => {
    cy.get('#bottom-center').click();
    cy.get('hot-toast').as('bottomCenterToast');

    cy.get('@bottomCenterToast').should('contain', 'I am on bottom-center');
    cy.get('@bottomCenterToast').find('.hot-toast-bar-base-container').should('have.css', 'bottom', '0px');
    cy.get('@bottomCenterToast').find('.hot-toast-bar-base-container').should('have.css', 'justify-content', 'center');
    cy.get('@bottomCenterToast').find('.hot-toast-bar-base-container').should('have.css', 'left', '0px');
    cy.get('@bottomCenterToast').find('.hot-toast-bar-base-container').should('have.css', 'right', '0px');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@bottomCenterToast').should('not.exist');
  });

  it('should show and hide toast on bottom-right position', () => {
    cy.get('#bottom-right').click();
    cy.get('hot-toast').as('bottomRightToast');

    cy.get('@bottomRightToast').should('contain', 'I am on bottom-right');
    cy.get('@bottomRightToast').find('.hot-toast-bar-base-container').should('have.css', 'bottom', '0px');
    cy.get('@bottomRightToast').find('.hot-toast-bar-base-container').should('have.css', 'right', '0px');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@bottomRightToast').should('not.exist');
  });
});
