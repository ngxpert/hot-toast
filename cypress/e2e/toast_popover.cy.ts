/// <reference types="cypress" />

import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngxpert/hot-toast/src/lib/constants';

describe('Test hot toasts - popover API', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render hot-toast-container as a popover element when usePopover is enabled', () => {
    // Trigger a toast first to initialize the container
    cy.get('#success').click();

    // Wait for container to be created and toast to appear
    cy.get('hot-toast', { timeout: 10000 }).should('exist');

    // Check if the container has the popover attribute
    cy.get('hot-toast-container').should('have.attr', 'popover', 'manual');

    // Check if the container has the popover class
    cy.get('hot-toast-container').should('have.class', 'hot-toast-container-overlay-popover');

    // Wait for toast to auto-close
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.success);
  });
});
