/// <reference types="cypress" />

function waitForToastAnimations() {
  return cy.get('.hot-toast-bar-base').then(async (elements) => {
    const window = elements[0].ownerDocument.defaultView!;
    // Allow deferred closes and their style updates to reach the browser.
    await new Promise<void>((resolve) => {
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
    });

    const animations = elements.toArray().flatMap((element) => element.getAnimations());
    await Promise.all(
      animations
        .filter((animation) => {
          const timing = animation.effect?.getComputedTiming();
          // Do not wait for the 60-second auto-close delay or infinite loaders.
          return timing && timing.progress !== null && Number.isFinite(timing.iterations);
        })
        .map((animation) => animation.finished.catch(() => undefined)),
    );
    // Let animationend handlers and Angular finish removing closed toasts.
    await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
  });
}

describe('Test hot toasts - closing before render (#204)', () => {
  beforeEach(() => {
    cy.visit('/toast-lifecycle-e2e');
  });

  it('evicts excess toasts created synchronously and keeps all references closable', () => {
    cy.get('[data-testid="batch"]').click();
    cy.get('[data-testid="created"]').should('have.text', '10');
    cy.get('hot-toast-component').should('have.length', 5);
    cy.get('[data-testid="closed"]').should('have.text', '5');
    cy.get('hot-toast-component').first().should('contain', 'Batch toast 6');

    cy.get('[data-testid="close-refs"]').click();
    cy.get('hot-toast-component').should('not.exist');
    cy.get('[data-testid="closed"]').should('have.text', '10');
  });

  for (const mode of ['ref', 'id', 'all']) {
    it(`honors an early close by ${mode} without closing a later toast`, () => {
      cy.get(`[data-testid="early-${mode}"]`).click();
      cy.get('[data-testid="created"]').should('have.text', '2');
      cy.get('hot-toast-component').should('have.length', 1).and('contain', 'Batch toast 2');
      cy.get('[data-testid="closed"]').should('have.text', '1');
    });
  }

  it('honors an early close for a new toast in an already rendered container', () => {
    cy.get('[data-testid="early-ref"]').click();
    cy.get('hot-toast-component').should('have.length', 1);
    cy.get('[data-testid="early-id"]').click();
    cy.get('hot-toast-component').should('have.length', 2);
    cy.get('[data-testid="closed"]').should('have.text', '2');
  });

  it('closes both rendered and pending toasts without closing a later toast', () => {
    cy.get('[data-testid="early-ref"]').click();
    cy.get('hot-toast-component').should('have.length', 1);
    cy.get('[data-testid="early-all"]').click();
    cy.get('hot-toast-component').should('have.length', 1).and('contain', 'Batch toast 4');
    cy.get('[data-testid="closed"]').should('have.text', '3');
  });

  it('does not evict synchronous toasts when visibleToasts is zero', () => {
    cy.get('[data-testid="unlimited"]').click();
    waitForToastAnimations();
    cy.get('hot-toast-component').should('have.length', 10);
    cy.get('[data-testid="closed"]').should('have.text', '0');
    cy.get('[data-testid="close-refs"]').click();
    cy.get('hot-toast-component').should('not.exist');
  });

  it('does not evict toasts with autoClose disabled', () => {
    cy.get('[data-testid="sticky"]').click();
    waitForToastAnimations();
    cy.get('hot-toast-component').should('have.length', 10);
    cy.get('[data-testid="closed"]').should('have.text', '0');
  });

  it('does not retain close requests for unknown IDs', () => {
    cy.get('[data-testid="unknown-id"]').click();
    waitForToastAnimations();
    cy.get('hot-toast-component').should('have.length', 2);
    cy.get('[data-testid="closed"]').should('have.text', '0');
  });
});
