/// <reference types="cypress" />

describe('Test hot toasts - HOT_TOAST_CONTAINER_TOKEN', () => {
  describe('Default behavior (no token provided)', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should append toast container to document.body by default', () => {
      // Trigger a toast to initialize the container
      cy.get('button').contains('Make me a toast').click();

      // Wait for container to be created
      cy.get('hot-toast-container').should('exist');

      // Verify the container is a direct child of document.body
      cy.get('body > hot-toast-container').should('exist');
    });
  });

  describe('Custom container behavior (with HOT_TOAST_CONTAINER_TOKEN)', () => {
    beforeEach(() => {
      cy.visit('/test-container');
    });

    it('should render toast container in custom element when token is provided', () => {
      // Verify the test component loaded correctly
      cy.get('h1').should('contain', 'Test Container Token');

      // Verify the custom container exists
      cy.get('#custom-toast-container').should('exist');

      // Trigger a toast using the test button
      cy.get('#test-custom-container').click();

      // Wait for toast container to be created
      cy.get('hot-toast-container').should('exist');

      // CRITICAL: Verify the container is inside the custom element, NOT in document.body
      cy.get('#custom-toast-container > hot-toast-container').should('exist');
      cy.get('body > hot-toast-container').should('not.exist');
    });
  });

  describe('Integration with existing demo features', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should verify existing toast-container documentation section exists', () => {
      // Verify the demo page has the toast-container section
      cy.get('#toast-container').should('exist');
      cy.get('#toast-container').should('contain', 'Toast Container');
      cy.get('#toast-container').should('contain', 'HOT_TOAST_CONTAINER_TOKEN');
    });
  });
});
