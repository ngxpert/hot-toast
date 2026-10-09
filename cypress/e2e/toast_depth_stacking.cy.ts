/// <reference types="cypress" />

import { ENTER_ANIMATION_DURATION } from '../../projects/ngxpert/hot-toast/src/lib/constants';
import { DEPTH_E2E_CONFIG, DEPTH_E2E_TOAST_COUNT } from '../../src/app/depth-stacking-e2e/depth-stacking-e2e.config';

const bar = (n: number) => cy.get(`.hot-toast-bar-base[data-test="depth-toast-${n}"]`);
const allBars = () => cy.get('.hot-toast-bar-base[data-test^="depth-toast-"]');
const barIn = ($bars: JQuery<HTMLElement>, n: number) => $bars.filter(`[data-test="depth-toast-${n}"]`)[0];
// The offset is applied as `--hot-toast-translate-y` on the container (negative for bottom positions).
const offsetOf = (el: HTMLElement) =>
  Math.abs(
    parseFloat(
      el.closest<HTMLElement>('.hot-toast-bar-base-container')?.style.getPropertyValue('--hot-toast-translate-y') ?? '',
    ),
  );
const toastIds = Array.from({ length: DEPTH_E2E_TOAST_COUNT }, (_, i) => i + 1);
// The oldest toasts (lowest ids) fall outside the visible cap, whatever the display order.
const softClosedToast = DEPTH_E2E_TOAST_COUNT - DEPTH_E2E_CONFIG.visibleToasts;
const hoveredToast = softClosedToast + 1;

describe('Test hot toasts - depth stacking', () => {
  beforeEach(() => {
    cy.visit('/depth-stacking-e2e');
  });

  it('should fully re-open a soft-closed persistent toast while the stack is hovered', () => {
    cy.get('#depth-e2e-persistent').click();
    allBars().should('have.length', DEPTH_E2E_TOAST_COUNT);
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

  it('should give every toast its own offset with reverseOrder: true', () => {
    // With reverseOrder the newest toast is the front one at offset 0 and the offsets grow towards the oldest.
    const newestFirst = [...toastIds].reverse();
    const visibleNewestFirst = newestFirst.filter((n) => n > softClosedToast);

    cy.get('#depth-e2e-reverse').realClick();
    allBars().should('have.length', DEPTH_E2E_TOAST_COUNT);
    bar(softClosedToast).should('have.css', 'opacity', '0');

    allBars().should(($bars) => {
      const offsets = newestFirst.map((n) => offsetOf(barIn($bars, n)));
      offsets.slice(1).forEach((offset, k) => {
        expect(offset, `offset of toast ${newestFirst[k + 1]}`).to.be.greaterThan(offsets[k]);
      });
    });

    bar(visibleNewestFirst[0]).realHover();
    cy.wait(ENTER_ANIMATION_DURATION);
    allBars().should(($bars) => {
      const rects = visibleNewestFirst.map((n) => barIn($bars, n).getBoundingClientRect());
      rects.slice(1).forEach((rect, k) => {
        expect(rects[k].top, `toast ${visibleNewestFirst[k]} below toast ${visibleNewestFirst[k + 1]}`).to.be.at.least(
          rect.bottom,
        );
      });
    });

    newestFirst.forEach((n) => {
      bar(n).find('.hot-toast-close-btn').click({ force: true });
    });
    cy.get('hot-toast-component').should('not.exist');
  });
});
