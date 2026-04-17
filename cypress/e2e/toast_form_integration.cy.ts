/// <reference types="cypress" />

import { EXIT_ANIMATION_DURATION } from '../../projects/ngxpert/hot-toast/src/lib/constants';

/**
 * Async validator delay (ms) configured in FormIntegrationComponent.
 * Keep in sync with the 800ms setTimeout in takenEmailValidator().
 */
const ASYNC_VALIDATOR_MS = 800;

/**
 * Duration (ms) of the VALID toast as configured in the demo component.
 * Keep in sync with `duration: 2000` in setupEmailRef / setupRegistrationRef.
 */
const VALID_TOAST_DURATION_MS = 2000;

/** Small buffer so assertions run after transitions complete. */
const BUFFER_MS = 300;

// ─── FormControl demo ──────────────────────────────────────────────────────────

describe('Test hot toasts - fromForm (FormControl)', () => {
  before(() => {
    cy.get('#form-integration').scrollIntoView();
    cy.get('#tab-control').click();
  });

  it('should not show a toast before the user submits', () => {
    cy.get('#email-demo').type('notanemail');
    cy.get('hot-toast-component').should('not.exist');
  });

  it('should show INVALID toast with format error after submit', () => {
    cy.get('#submit-email-demo').click();
    cy.get('hot-toast-component').should('contain', 'Enter a valid email address');
  });

  it('should update toast to required-field error after clearing and re-submitting', () => {
    cy.get('#email-demo').clear();
    cy.get('#submit-email-demo').click();
    cy.get('hot-toast-component').should('contain', 'Email is required');
  });

  it('should show PENDING toast while async validator runs after submit', () => {
    cy.get('#email-demo').type('valid@example.com');
    cy.get('#submit-email-demo').click();
    cy.get('hot-toast-component').should('contain', 'Checking email…');
  });

  it('should update the toast to VALID state after async validation passes', () => {
    cy.wait(ASYNC_VALIDATOR_MS + BUFFER_MS);
    cy.get('hot-toast-component').should('contain', 'Email looks good!');
  });

  it('should auto-dismiss the VALID toast after its configured duration', () => {
    cy.wait(VALID_TOAST_DURATION_MS + EXIT_ANIMATION_DURATION + BUFFER_MS);
    cy.get('hot-toast-component').should('not.exist');
  });

  it('should show PENDING then INVALID toast for a known-taken email after submit', () => {
    cy.get('#email-demo').clear().type('test@taken.com');
    cy.get('#submit-email-demo').click();
    cy.get('hot-toast-component').should('contain', 'Checking email…');
    cy.wait(ASYNC_VALIDATOR_MS + BUFFER_MS);
    cy.get('hot-toast-component').should('contain', 'That email is already taken');
  });

  it('should show taken error for the second known-taken address too', () => {
    cy.get('#email-demo').clear().type('user@taken.com');
    // already submitted — statusChanges fires on each type
    cy.wait(ASYNC_VALIDATOR_MS + BUFFER_MS);
    cy.get('hot-toast-component').should('contain', 'That email is already taken');
  });

  it('should dismiss the active toast and clear the input on Reset', () => {
    cy.contains('Reset demo').click();
    cy.wait(EXIT_ANIMATION_DURATION + BUFFER_MS);
    cy.get('#email-demo').should('have.value', '');
    cy.get('hot-toast-component').should('not.exist');
  });

  it('should not show a toast on a fresh start before submitting again', () => {
    cy.get('#email-demo').type('notanemail');
    cy.get('hot-toast-component').should('not.exist');
    // clean up for next test suite
    cy.get('#email-demo').clear();
  });
});

// ─── FormGroup demo ────────────────────────────────────────────────────────────

describe('Test hot toasts - fromForm (FormGroup)', () => {
  before(() => {
    cy.get('#tab-group').click();
  });

  it('should not show a toast before the user submits', () => {
    cy.get('#name-demo').type('ab');
    cy.get('hot-toast-component').should('not.exist');
  });

  it('should show INVALID toast when name does not meet minLength after submit', () => {
    cy.get('#submit-registration-demo').click();
    cy.get('hot-toast-component').should('contain', 'Name needs at least 3 characters');
  });

  it('should update INVALID message once name is valid but password is still missing', () => {
    cy.get('#name-demo').type('c'); // "abc" → 3 chars, name valid
    cy.get('hot-toast-component').should('contain', 'Password is required');
  });

  it('should update INVALID message when password is present but too short', () => {
    cy.get('#password-demo').type('abc'); // 3 chars < 6 required
    cy.get('hot-toast-component').should('contain', 'Password needs at least 6 characters');
  });

  it('should show VALID toast when all fields satisfy their validators', () => {
    cy.get('#password-demo').type('abc'); // "abcabc" = 6 chars → valid
    cy.get('hot-toast-component').should('contain', 'Form is valid!');
  });

  it('should auto-dismiss the VALID toast after its configured duration', () => {
    cy.wait(VALID_TOAST_DURATION_MS + EXIT_ANIMATION_DURATION + BUFFER_MS);
    cy.get('hot-toast-component').should('not.exist');
  });

  it('should transition back to INVALID when a valid field is cleared', () => {
    cy.get('#password-demo').clear();
    cy.get('hot-toast-component').should('contain', 'Password is required');
  });

  it('should dismiss the active toast and clear all fields on Reset', () => {
    cy.contains('Reset demo').click();
    cy.wait(EXIT_ANIMATION_DURATION + BUFFER_MS);
    cy.get('#name-demo').should('have.value', '');
    cy.get('#password-demo').should('have.value', '');
    cy.get('hot-toast-component').should('not.exist');
  });

  it('should not show a toast before submitting again after reset', () => {
    cy.get('#name-demo').type('x');
    cy.get('hot-toast-component').should('not.exist');
    // clean up
    cy.get('#name-demo').clear();
  });
});
