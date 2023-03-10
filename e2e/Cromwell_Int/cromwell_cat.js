describe("Cromwell Category Webpage", () => {
  it("Navigating to the category page", () => {
    cy.visit("https://www.cromwell.co.uk/shop/abrasives/cutting/c/090901");
    cy.get("#onetrust-accept-btn-handler").click();

    //Test Case 1:GIVEN the user is on this category page
    //WHEN no further options are clicked THEN ten products
    //should be displayed

    cy.get('[data-testid="ProductCard"]').should("have.length", 10);

    // Test Case 2:GIVEN user is on this category page
    //WHEN the user changes ‘Rows per page:’ to 25 (pagination)
    //THEN 25 products should be displayed

    cy.get('[data-testid="paginationRowsPerPageMenu"]').first().click({
      shiftKey: true,
    });
    cy.get('[role="listbox"]').contains("25").click({ force: true });
    cy.get('[data-testid="ProductCard"]').should("have.length", 25);

    //Test Case 3:GIVEN user is on this category page
    //WHEN the user changes ‘Rows per page’ to 25 (pagination)
    //AND user has clicked ‘Show Out of Stock’
    //THEN check there is at least one product that show ‘OUT OF STOCK’ in the results

    cy.get('[data-testid="filterName-Show Out of Stock"]').click({
      force: true,
    });
    cy.get('[data-testid="Availability"]')
      .contains("OUT OF STOCK")
      .should("have.length.at.least", 1);

    //Test Case 4:GIVEN user is on this category page
    //WHEN the user selects ‘Sort By:’ - ‘Price Low to High’
    //THEN 10 products should be displayed in order of price (low to high).

    cy.get('[data-value="price-asc"]')
      .contains("Price Low to High")
      .click({ force: true });
  });
});
