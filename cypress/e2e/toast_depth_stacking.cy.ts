/// <reference types="cypress" />

import { ENTER_ANIMATION_DURATION } from '../../projects/ngxpert/hot-toast/src/lib/constants';
import { DEPTH_E2E_CONFIG, DEPTH_E2E_TOAST_COUNT } from '../../src/app/depth-stacking-e2e/depth-stacking-e2e.config';

const bar = (n: number) => cy.get(`.hot-toast-bar-base[data-test="depth-toast-${n}"]`);
const toastIds = Array.from({ length: DEPTH_E2E_TOAST_COUNT }, (_, i) => i + 1);
// Toasts are shown oldest-first (reverseOrder: false), so the lowest ids fall outside the visible cap.
const softClosedToast = DEPTH_E2E_TOAST_COUNT - DEPTH_E2E_CONFIG.visibleToasts;
const hoveredToast = softClosedToast + 1;

describe('Test hot toasts - depth stacking', () => {
  beforeEach(() => {
    cy.visit('/depth-stacking-e2e');
  });

  it('should fully re-open a soft-closed persistent toast while the stack is hovered', () => {
    cy.get('#depth-e2e-persistent').click();
    cy.get('.hot-toast-bar-base[data-test^="depth-toast-"]').should('have.length', DEPTH_E2E_TOAST_COUNT);
    bar(softClosedToast).should('have.css', 'opacity', '0');
    bar(hoveredToast).realHover();
    cy.wait(ENTER_ANIMATION_DURATION);
    bar(hoveredToast).find('.hot-toast-close-btn').realClick();
    // The re-entering toast ends up under the pointer; its soft-enter animation must not stay paused.
    bar(softClosedToast).should(($el) => {
      expect(getComputedStyle($el[0]).opacity).to.eq('1');
      const softEnter = $el[0]
        .getAnimations()
        .find((a) => (a as CSSAnimation).animationName?.startsWith('hotToastEnterSoftAnimation'));
      expect(softEnter?.playState, 'soft-enter animation playState').to.eq('finished');
    });
    bar(softClosedToast).should('match', ':hover');

    toastIds
      .filter((n) => n !== hoveredToast)
      .reverse()
      .forEach((n) => {
        bar(n).find('.hot-toast-close-btn').click({ force: true });
      });
    cy.get('hot-toast-component').should('not.exist');
  });
});
