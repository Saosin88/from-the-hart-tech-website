describe('Dark Mode and Light Mode Toggle', () => {
  const pages = ['/', '/blog', '/projects', '/about']

  function checkDarkMode(isDark: boolean) {
    // Check if dark class is present on HTML element
    cy.get('html').should(isDark ? 'have.class' : 'not.have.class', 'dark')
  }

  it('should toggle between light and dark modes', () => {
    // Visit the homepage
    cy.visit('/')

    // Check initial state (assuming default is dark)
    checkDarkMode(true)

    // Toggle to light mode
    cy.get('#color-mode-selector').click()
    checkDarkMode(false)

    // Toggle back to dark mode
    cy.get('#color-mode-selector').click()
    checkDarkMode(true)
  })

  it('should persist theme across pages', () => {
    // Visit homepage and toggle to light mode
    cy.visit('/')
    cy.get('#color-mode-selector').click()
    checkDarkMode(false)

    // Visit each page and verify light mode persists
    for (const page of pages) {
      cy.visit(page)
      checkDarkMode(false)
    }

    // Switch back to dark mode
    cy.get('#color-mode-selector').click()
    checkDarkMode(true)

    // Visit each page and dark light mode persists
    for (const page of pages) {
      cy.visit(page)
      checkDarkMode(true)
    }
  })
})
