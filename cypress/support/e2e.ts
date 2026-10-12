/// <reference types="cypress" />

import 'cypress-real-events';

describe('Open dev app', () => {
  it('should visit dev app', () => {
    cy.visit('/');
  });
});
