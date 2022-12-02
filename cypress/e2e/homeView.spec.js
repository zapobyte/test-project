// https://docs.cypress.io/api/introduction/api.html

const usersData = [];

before(() => {
  cy.fixture('data').as('data');
  cy.fixture('data').then((data) => {
    data.forEach((item) => usersData.push(item));
  });
});

describe('HomeView', () => {
  
  it('should be able to add a new user successfully', () => {
    cy.visit('/');
    usersData.forEach((user, i) => {
      cy.getTestElement('form-name').within(($el) => {
        cy.get($el).find('input').type(user.name);
      });
      cy.getTestElement('form-dob').within(($el) => {
        cy.get($el).find('input').type(user.dob);
      });
      cy.getTestElement('form-btn').click();
      cy.getTestElement('table-body').children().should('have.length', i + 1);
      cy.getTestElement('table-body').within(() => {
        cy.contains(user.name);
        cy.contains(user.dob);
        cy.contains(user.cake.size);
        cy.contains(user.cake.date);
      });
    });
    cy.getTestElement('table-body').first().within(() => {
      cy.get('.btn.btn-danger').first().click();
    });
    cy.getTestElement('table-body').children().should('have.length', 2);
    cy.getTestElement('pie-chart').children().first().should('not.contain', 'No data to generate chart');
  });

  it('should not be able to add a new user', () => {
    cy.visit('/');
    cy.getTestElement('form-name').within(($el) => {
      cy.get($el).find('input').type(usersData[0].name);
    });
    cy.getTestElement('form-btn').click();
    cy.getTestElement('form-dob').within(() => {
      cy.contains('Please check the input value');
    });
    cy.getTestElement('table-body').children().should('have.length', 0);
    cy.getTestElement('pie-chart').children().contains('No data to generate chart');
  });
});
