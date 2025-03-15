describe('Responsive Design Tests', () => {
  const viewports = [
    { width: 375, height: 667, device: 'mobile' },
    { width: 768, height: 1024, device: 'tablet' },
    { width: 1280, height: 800, device: 'laptop' },
    { width: 1920, height: 1080, device: 'desktop' },
  ]

  viewports.forEach(viewport => {
    context(`Viewport: ${viewport.device} (${viewport.width}x${viewport.height})`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height)
      })

      it(`should display the menu button for mobile correctly, else full nav bar`, () => {
        cy.visit('/')
        cy.wait(500)

        if (viewport.width < 768) {
          cy.get('#mobile-button').as('menuButton').should('be.visible').click()

          cy.get('nav').should('be.visible')
          cy.get('a[href="/about"]').should('be.visible')
          cy.get('a[href="/blog"]').should('be.visible')
          cy.get('a[href="/projects"]').should('be.visible')

          cy.get('@menuButton').click()
          cy.get('nav').not('be.visible')
          cy.get('a[href="/about"]').not('be.visible')
          cy.get('a[href="/blog"]').not('be.visible')
          cy.get('a[href="/projects"]').not('be.visible')
        } else {
          cy.get('nav').should('be.visible')
          cy.get('a[href="/about"]').should('be.visible')
          cy.get('a[href="/blog"]').should('be.visible')
          cy.get('a[href="/projects"]').should('be.visible')
        }
      })
    })
  })
})
