/// <reference types="cypress" />

/** Cypress must stub these before the dev server; keep in sync with `HttpInterceptorE2eComponent`. */
const url500 = '**/__hot-toast-e2e__/http/500';
const url401 = '**/__hot-toast-e2e__/http/401';
const url403 = '**/__hot-toast-e2e__/http/403';

describe('Test hot toasts - HTTP interceptor', () => {
  beforeEach(() => {
    cy.visit('/http-interceptor-e2e');
    cy.get('#http-e2e-close-all').scrollIntoView().click({ force: true });
    cy.get('hot-toast', { timeout: 100 }).should('not.exist');
  });

  it('shows error toast on HTTP 500 with response body text', () => {
    cy.intercept('GET', url500, {
      statusCode: 500,
      headers: { 'content-type': 'text/plain' },
      body: 'E2E five hundred',
    }).as('http500');

    cy.get('#http-e2e-500').scrollIntoView().click({ force: true });
    cy.wait('@http500');
    cy.get('hot-toast').should('contain', 'E2E five hundred');
    cy.get('#http-e2e-close-all').scrollIntoView().click({ force: true });
    cy.get('hot-toast', { timeout: 8000 }).should('not.exist');
  });

  it('does not show toast for HTTP 401 when status is in ignoreStatuses', () => {
    cy.intercept('GET', url401, {
      statusCode: 401,
      headers: { 'content-type': 'application/json' },
      body: { message: 'Must not appear in toast' },
    }).as('http401');

    cy.get('#http-e2e-401').scrollIntoView().click({ force: true });
    cy.wait('@http401');
    cy.get('hot-toast').should('not.exist');
  });

  it('shows error toast on HTTP 403', () => {
    cy.intercept('GET', url403, {
      statusCode: 403,
      headers: { 'content-type': 'text/plain' },
      body: 'E2E forbidden',
    }).as('http403');

    cy.get('#http-e2e-403').scrollIntoView().click({ force: true });
    cy.wait('@http403');
    cy.get('hot-toast').should('contain', 'E2E forbidden');
    cy.get('#http-e2e-close-all').scrollIntoView().click({ force: true });
    cy.get('hot-toast', { timeout: 8000 }).should('not.exist');
  });
});
