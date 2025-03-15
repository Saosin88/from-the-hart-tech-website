describe('Blog Posts Navigation Test', () => {
  function verifyBlogPostsDisplayed(pageTitle: string) {
    cy.contains('h1', pageTitle).should('be.visible')

    cy.contains('p', 'No blog posts found').should('not.exist')

    cy.get('div.grid > div').should('have.length.at.least', 1)
  }

  it('should consistently display blog posts when navigating between pages', () => {
    cy.visit('/')
    verifyBlogPostsDisplayed('My latest Blog posts')

    cy.contains('a', 'Blog').click()
    verifyBlogPostsDisplayed('Blog')

    cy.contains('a', 'From The Hart').click()
    verifyBlogPostsDisplayed('My latest Blog posts')

    cy.contains('a', 'Blog').click()
    cy.url().should('include', '/blog')
    verifyBlogPostsDisplayed('Blog')
  })
})
