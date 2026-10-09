/// <reference types="cypress" />

import {
  ENTER_ANIMATION_DURATION,
  EXIT_ANIMATION_DURATION,
  HOT_TOAST_MARGIN,
} from '../../projects/ngxpert/hot-toast/src/lib/constants';
import {
  DEPTH_E2E_CONFIG,
  DEPTH_E2E_ONE_BY_ONE_TOAST_COUNT,
  DEPTH_E2E_TOAST_COUNT,
  DEPTH_E2E_WITHIN_CAP_TOAST_COUNT,
} from '../../src/app/depth-stacking-e2e/depth-stacking-e2e.config';

const bar = (n: number, options?: Partial<Cypress.Timeoutable>) =>
  cy.get(`.hot-toast-bar-base[data-test="depth-toast-${n}"]`, options);
const allBars = () => cy.get('.hot-toast-bar-base[data-test^="depth-toast-"]');
const barIn = ($bars: JQuery<HTMLElement>, n: number) => $bars.filter(`[data-test="depth-toast-${n}"]`)[0];
const containerOf = (el: HTMLElement) => el.closest<HTMLElement>('.hot-toast-bar-base-container') as HTMLElement;
// The offset is applied as `--hot-toast-translate-y` on the container (negative for bottom positions).
const offsetOf = (el: HTMLElement) =>
  Math.abs(parseFloat(containerOf(el).style.getPropertyValue('--hot-toast-translate-y')));
const scaleOf = (el: HTMLElement) => parseFloat(containerOf(el).style.getPropertyValue('--hot-toast-scale'));
// Collapsed offsets are a few pixels per toast; an expanded toast sits at least one bar height plus the margin behind
// the one in front (all bars have the same height).
const minExpandedOffset = (el: HTMLElement) => el.offsetHeight + HOT_TOAST_MARGIN;
// Records every value `read` returns for toast `n` from now on, to catch a change undone before the next assertion.
const recordSamples = (n: number, read: (el: HTMLElement) => number, samples: number[]) =>
  bar(n).then(($bar) => {
    new MutationObserver(() => samples.push(read($bar[0]))).observe(containerOf($bar[0]), {
      attributes: true,
      attributeFilter: ['style'],
    });
  });
// `realHover` is a single CDP mouse move that Electron occasionally drops; repeat it until the bar is `:hover`.
const hover = (n: number, attempt = 0) => {
  bar(n).realHover();
  cy.wait(50);
  bar(n).then(($el) => {
    if (!$el[0].matches(':hover') && attempt < 3) {
      hover(n, attempt + 1);
    }
  });
  bar(n).should('match', ':hover');
};
// Newest first: closing a soft-closed toast while it is still over the cap lets its soft-open cancel the exit.
const closeAll = () => {
  allBars().then(($bars) => {
    Array.from($bars)
      .reverse()
      .forEach((el) => cy.wrap(el).find('.hot-toast-close-btn').click({ force: true }));
  });
  cy.get('hot-toast-component').should('not.exist');
};
const toastIds = Array.from({ length: DEPTH_E2E_TOAST_COUNT }, (_, i) => i + 1);
// The oldest toasts (lowest ids) fall outside the visible cap, whatever the display order.
const softClosedToast = DEPTH_E2E_TOAST_COUNT - DEPTH_E2E_CONFIG.visibleToasts;
const hoveredToast = softClosedToast + 1;
// Headroom after the exit animation for the closed toast to be removed and hover to be re-evaluated.
const REMOVAL_HEADROOM = 400;

describe('Test hot toasts - depth stacking', () => {
  beforeEach(() => {
    cy.visit('/depth-stacking-e2e');
  });

  it('should fully re-open a soft-closed persistent toast while the stack is hovered', () => {
    cy.get('#depth-e2e-persistent').click();
    allBars().should('have.length', DEPTH_E2E_TOAST_COUNT);
    bar(softClosedToast).should('have.css', 'opacity', '0');
    hover(hoveredToast);
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

    closeAll();
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

    hover(visibleNewestFirst[0]);
    cy.wait(ENTER_ANIMATION_DURATION);
    allBars().should(($bars) => {
      const rects = visibleNewestFirst.map((n) => barIn($bars, n).getBoundingClientRect());
      rects.slice(1).forEach((rect, k) => {
        expect(rects[k].top, `toast ${visibleNewestFirst[k]} below toast ${visibleNewestFirst[k + 1]}`).to.be.at.least(
          rect.bottom,
        );
      });
    });

    closeAll();
  });

  it('should keep the stack expanded while closing hovered toasts one by one', () => {
    const front = DEPTH_E2E_ONE_BY_ONE_TOAST_COUNT;

    cy.get('#depth-e2e-one-by-one').realClick();
    allBars().should('have.length', DEPTH_E2E_ONE_BY_ONE_TOAST_COUNT);
    bar(DEPTH_E2E_ONE_BY_ONE_TOAST_COUNT - DEPTH_E2E_CONFIG.visibleToasts).should('have.css', 'opacity', '0');
    hover(front);
    cy.wait(ENTER_ANIMATION_DURATION);
    bar(front - 1).should(($el) => {
      expect(offsetOf($el[0]), 'expanded offset').to.be.at.least(minExpandedOffset($el[0]));
    });

    // Close the front toast, then the one that slides under the still pointer. The wait spans the removal of the
    // closed toast on purpose: the assertion is that the toast behind never collapsed during that window.
    [front, front - 1].forEach((closed) => {
      const samples: number[] = [];
      recordSamples(closed - 1, offsetOf, samples);
      bar(closed).find('.hot-toast-close-btn').realClick();
      cy.wait(EXIT_ANIMATION_DURATION + REMOVAL_HEADROOM);
      bar(closed).should('not.exist');
      bar(closed - 1).should(($el) => {
        const expanded = minExpandedOffset($el[0]);
        expect(samples, `offsets of toast ${closed - 1} while toast ${closed} closed`).to.not.be.empty;
        samples.forEach((offset) => expect(offset, 'never collapsed').to.be.at.least(expanded));
        expect(offsetOf($el[0]), `offset of toast ${closed - 1}`).to.be.at.least(expanded);
      });
      bar(closed - 1).should('match', ':hover');
    });

    closeAll();
  });

  it('should collapse promptly when the pointer leaves right after closing a toast', () => {
    // Within the cap, closing the front toast leaves its slot empty: no toast comes under the pointer, so a leave
    // right after the close is a genuine one.
    const front = DEPTH_E2E_WITHIN_CAP_TOAST_COUNT;

    cy.get('#depth-e2e-within-cap').realClick();
    allBars().should('have.length', DEPTH_E2E_WITHIN_CAP_TOAST_COUNT);
    hover(front);
    cy.wait(ENTER_ANIMATION_DURATION);
    bar(front - 1).should(($el) => {
      expect(offsetOf($el[0]), 'expanded offset').to.be.at.least(minExpandedOffset($el[0]));
    });

    bar(front).find('.hot-toast-close-btn').realClick();
    // Leave once the exit animation has started (it starts on the next frame), well before the toast is removed.
    cy.wait(100);
    cy.get('body').realMouseMove(10, 10);
    // The collapse must not wait for the closed toast to be removed.
    bar(front - 1, { timeout: 300 }).should(($el) => {
      expect(offsetOf($el[0]), 'collapsed offset').to.be.lessThan(minExpandedOffset($el[0]));
    });

    closeAll();
  });

  it('should collapse once the closed toast is removed if nothing is left under a still pointer', () => {
    // Within the cap, closing the front toast leaves its slot empty under a pointer that does not move.
    const front = DEPTH_E2E_WITHIN_CAP_TOAST_COUNT;

    cy.get('#depth-e2e-within-cap').realClick();
    allBars().should('have.length', DEPTH_E2E_WITHIN_CAP_TOAST_COUNT);
    hover(front);
    cy.wait(ENTER_ANIMATION_DURATION);
    bar(front).find('.hot-toast-close-btn').realClick();
    bar(front).should('not.exist');

    // A stack left expanded would pause every exit animation, so no toast would ever auto-close.
    allBars().should(($bars) => {
      Array.from($bars).forEach((el) => {
        expect(offsetOf(el), 'collapsed offset').to.be.lessThan(minExpandedOffset(el));
        expect(el.style.getPropertyValue('--hot-toast-exit-animation-state'), 'exit animation state').to.eq('running');
      });
    });

    closeAll();
  });

  it('should keep the depth of the toasts after a closing one', () => {
    // Closing a toast in the middle must not shift the toasts in front of it one level forward until it is removed:
    // the front toast would be scaled above 1.
    const front = DEPTH_E2E_TOAST_COUNT;

    cy.get('#depth-e2e-persistent').realClick();
    allBars().should('have.length', DEPTH_E2E_TOAST_COUNT);
    bar(softClosedToast).should('have.css', 'opacity', '0');
    hover(hoveredToast);
    cy.wait(ENTER_ANIMATION_DURATION);

    const samples: number[] = [];
    recordSamples(front, scaleOf, samples);
    bar(hoveredToast).find('.hot-toast-close-btn').realClick();
    // Leave right away so the stack collapses during the exit animation and the depth shows in the scale.
    cy.wait(100);
    cy.get('body').realMouseMove(10, 10);
    bar(hoveredToast).should('not.exist');
    bar(front).should(($el) => {
      expect(samples, `scales of toast ${front}`).to.not.be.empty;
      samples.forEach((scale) => expect(scale, `scale of toast ${front}`).to.be.at.most(1));
      expect(scaleOf($el[0]), `scale of toast ${front}`).to.eq(1);
    });

    closeAll();
  });
});
