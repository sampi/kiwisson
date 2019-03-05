describe('Kiwisson T9 E2E Flow', () => {
	beforeEach(() => {
		// Remove all Service Workers
		if (window.navigator && navigator.serviceWorker) {
			navigator.serviceWorker.getRegistrations().then(registrations => {
				registrations.forEach(registration => {
					registration.unregister();
				});
			});
		}

		cy.visit('/');
		cy.get('[data-cy=2]').as('abcButton');
		cy.get('[data-cy=3]').as('defButton');
		cy.get('[data-cy=4]').as('ghiButton');
		cy.get('[data-cy=5]').as('jklButton');
		cy.get('[data-cy=6]').as('mnoButton');
		cy.get('[data-cy=7]').as('pqrsButton');
		cy.get('[data-cy=8]').as('tuvButton');
		cy.get('[data-cy=9]').as('wxyzButton');
		cy.get('[data-cy=alt]').as('altButton');
		cy.get('[data-cy=delete]').as('deleteButton');
		cy.get('.screen figure').as('screen');
	});

	it('Opens the page', () => {
		cy.contains('KIWISSON');
		cy.screenshot();
	});

	it('Says hello', () => {
		cy.get('@screen').should('have.text', '');
		cy.get('@ghiButton').click();
		cy.get('@defButton').click();
		cy.get('@jklButton').click();
		cy.get('@jklButton').click();
		cy.get('@mnoButton').click();
		cy.get('@screen').should('have.text', 'hello');
		cy.screenshot();
		cy.get('@deleteButton').click();
		cy.get('@deleteButton').click();
		cy.get('@deleteButton').click();
		cy.get('@deleteButton').click();
		cy.get('@deleteButton').click();
		cy.get('@screen').should('have.text', '');
	});

	it('Has alternate words', () => {
		cy.get('@screen').should('have.text', '');
		cy.get('@ghiButton').click();
		cy.get('@mnoButton').click();
		cy.get('@mnoButton').click();
		cy.get('@defButton').click();
		cy.get('@screen').should('have.text', 'home');
		cy.get('@altButton').click();
		cy.get('@screen').should('have.text', 'good');
		cy.get('@altButton').click();
		cy.get('@screen').should('have.text', 'gone');
		cy.get('@altButton').click();
		cy.get('@screen').should('have.text', 'hood');
		cy.get('@altButton').click();
		cy.get('@screen').should('have.text', 'home');

		cy.get('@deleteButton').click();
		cy.get('@screen').should('have.text', 'inn');

		cy.get('@altButton').click();
		cy.get('@screen').should('have.text', 'ion');

		cy.get('@deleteButton').click();
		cy.get('@screen').should('have.text', 'in');

		cy.get('@deleteButton').click();
		cy.get('@deleteButton').click();

		cy.get('@screen').should('have.text', '');
	});

	it('Preserves mid-word *s', () => {
		cy.get('@screen').should('have.text', '');

		cy.get('@ghiButton').click();
		cy.get('@mnoButton').click();
		cy.get('@mnoButton').click();
		cy.get('@screen').should('have.text', 'inn');

		cy.get('@altButton').click();
		cy.get('@screen').should('have.text', 'ion');

		cy.get('@defButton').click();
		cy.get('@screen').should('have.text', 'home');

		cy.get('@deleteButton').click();
		cy.get('@screen').should('have.text', 'ion');

		cy.get('@deleteButton').click();
		cy.get('@deleteButton').click();
		cy.get('@deleteButton').click();
		cy.get('@screen').should('have.text', '');
	});
});
