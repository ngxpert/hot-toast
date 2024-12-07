/// <reference types="cypress" />

describe('Toast Grouping', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#grouping').scrollIntoView();
  });

  it('should show pre-grouped notifications', () => {
    // Click the pre-grouping example button
    cy.get('#grouping-pre').click();

    // Check parent toast appears with retry and longer timeout
    cy.get('.hot-toast-bar-base', { timeout: 10000 }).should('be.visible');
    cy.get('.hot-toast-bar-base').within(() => {
      cy.contains('New Activities', { timeout: 5000 }).should('be.visible');
      cy.contains('5 New Activities', { timeout: 5000 }).should('be.visible');
      cy.contains("What's happening around you!", { timeout: 5000 }).should('be.visible');
    });

    // Check expand/collapse functionality with wait
    cy.get('.hot-toast-group-btn').should('be.visible').click();
    cy.wait(500); // Wait for expansion animation

    // Verify all child notifications are visible
    cy.get('.hot-toast-bar-base-group').within(() => {
      cy.contains('New Message!', { timeout: 5000 }).should('be.visible');
      cy.contains('Level Up!', { timeout: 5000 }).should('be.visible');
      cy.contains('Reminder: Meeting Today', { timeout: 5000 }).should('be.visible');
      cy.contains('Special Offer!', { timeout: 5000 }).should('be.visible');
      cy.contains('Task Assigned', { timeout: 5000 }).should('be.visible');
      cy.contains('Sarah sent you a message.', { timeout: 5000 }).should('be.visible');
      cy.contains('Just Now', { timeout: 5000 }).should('be.visible');
    });

    // Test collapse with wait
    cy.get('.hot-toast-group-btn').should('be.visible').click();
    cy.wait(500); // Wait for collapse animation

    // Verify collapsed state
    cy.get('.hot-toast-bar-base-group').within(() => {
      cy.contains('New Message!', { timeout: 5000 }).should('not.be.visible');
    });
  });

  it('should handle dynamic notifications', () => {
    const titles = ['New Message!', 'Level Up!', 'Reminder: Meeting Today'];

    cy.get('#grouping-post').click();
    cy.get('.hot-toast-bar-base', { timeout: 10000 }).should('be.visible');

    titles.forEach(() => {
      cy.contains('Add notification').click();
      cy.wait(200);
    });

    cy.get('.hot-toast-group-btn').should('be.visible').click();
    cy.wait(500);

    cy.get('.hot-toast-bar-base-group')
      .find('.hot-toast-bar-base')
      .should('have.length', titles.length)
      .each((el, index) => {
        expect(el).to.contain(titles[index]);
      });
  });

  it('should handle dismissible notifications', () => {
    // Force click the hidden test button
    cy.get('#test-dismissible-toasts').click({ force: true });

    // Check parent toast appears with retry and longer timeout
    cy.get('.hot-toast-bar-base', { timeout: 10000 }).should('be.visible');
    cy.get('.hot-toast-bar-base').within(() => {
      // Wait for all notifications to be added and visible
      cy.contains(/[0-5] New Activities/, { timeout: 10000 }).should('be.visible');
      cy.contains("What's happening around you!", { timeout: 5000 }).should('be.visible');
      cy.get('.hot-toast-close-btn').should('be.visible');
    });

    // Check expand/collapse functionality with wait
    cy.get('.hot-toast-group-btn').should('be.visible').click();
    cy.wait(500); // Wait for expansion animation

    // Verify all child notifications are visible and have close buttons
    cy.get('.hot-toast-bar-base-group').within(() => {
      cy.contains('New Message!', { timeout: 5000 }).should('be.visible');
      cy.contains('Level Up!', { timeout: 5000 }).should('be.visible');
      cy.contains('Reminder: Meeting Today', { timeout: 5000 }).should('be.visible');
      cy.contains('Special Offer!', { timeout: 5000 }).should('be.visible');
      cy.contains('Task Assigned', { timeout: 5000 }).should('be.visible');
      cy.contains('Sarah sent you a message.', { timeout: 5000 }).should('be.visible');
      cy.contains('Just Now', { timeout: 5000 }).should('be.visible');

      // Check close buttons in child notifications
      cy.get('.hot-toast-close-btn').should('have.length.at.least', 1);
    });

    // Test close functionality
    cy.get('.hot-toast-bar-base-group').within(() => {
      cy.get('.hot-toast-close-btn').first().click();
      cy.contains('New Message!', { timeout: 5000 }).should('not.exist');
    });

    // Test collapse with wait
    cy.get('.hot-toast-group-btn').should('be.visible').click();
    cy.wait(500); // Wait for collapse animation

    // Verify collapsed state
    cy.get('.hot-toast-bar-base-group').within(() => {
      cy.contains('Level Up!', { timeout: 5000 }).should('not.be.visible');
    });
  });
});
