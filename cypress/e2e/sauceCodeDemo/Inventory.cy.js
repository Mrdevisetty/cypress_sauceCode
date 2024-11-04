/// <reference types="cypress" />
require('cypress-xpath');


describe('sauce Demo UI actions', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })


  it('Verify the page', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click();
    cy.url().should('satisfy', (url) => url.includes('/inventory.html'));
    cy.wait(2000)
    cy.xpath('//div[contains(text(),"Sauce Labs Bolt T-Shirt")]/parent::a/parent::div/parent::div//div[@class="pricebar"]/div')
     .should('have.text', '$15.99')

    //check price in Tshirt page    
    cy.xpath('//div[contains(text(),"Sauce Labs Bolt T-Shirt")]').click()
    cy.get('[data-test="inventory-item-price"]')
      .should('have.text', '$15.99')

    cy.get('[data-test="back-to-products"]').click()

    //add to cart
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]')
      .should('have.text', 'Remove')

    //check cart items
    cy.xpath('//span[@class="shopping_cart_badge"]')
    .should('have.text', '1')

    //check the item details in cart page
    cy.xpath('//span[@class="shopping_cart_badge"]').click();
    cy.xpath('//div[@class="inventory_item_name"]')
      .should('have.text', 'Sauce Labs Bolt T-Shirt')
    cy.xpath('//div[@class="inventory_item_price"]')
      .should('have.text', '$15.99')

    //checkout button
    cy.get('[data-test="checkout"]').click()

    //check all form fields are mandatory - click without entering form fields
    cy.get('[data-test="continue"]').click()
    cy.get('.form_group').find('svg').should('have.length',3)

    //enter form fields
    cy.get('[data-test="firstName"]').type('Venkat')
    cy.get('[data-test="lastName"]').type('Devisetty')
    cy.get('[data-test="postalCode"]').type('NN27FZ')
    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="total-label"]')
    .should('have.text', 'Total: $17.27')

    //Finish purchase
    cy.get('[data-test="finish"]').click();

  })

  
})
