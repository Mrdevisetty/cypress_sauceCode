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
    
    cy.get('.footer').find('a').each(link => {

      if (link.prop('href'))
      {
      
        cy.request({      
        url: link.prop('href'),      
        failOnStatusCode: false      
        })
      }
          
      cy.log( link.prop('href'))
      
    })
  })

})

  

