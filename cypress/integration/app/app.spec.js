before(() => {
	window.sessionStorage.removeItem("access_token");
});

beforeEach(() => {
	// eslint-disable-next-line no-undef
	cy.fixture("calls.json").as("callsData");

});

describe("App", function () {
	it("it should check for fr & en i18n", function () {
		cy.visit("/");
		let footerFr = cy.get('#footer_i18n_fr') ;
		footerFr.click();
		cy.contains('Bonjour');
		let footerEn = cy.get('#footer_i18n_usa') ;
		footerFr.click();
		cy.contains('Welcome');

	});
});
