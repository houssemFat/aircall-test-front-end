before(() => {
	window.sessionStorage.removeItem("access_token");
});

beforeEach(() => {
	// eslint-disable-next-line no-undef
	cy.fixture("calls.json").as("callsData");

});

describe("Calls", function () {
	it("it should open the calls page", function () {
		cy.visit("/calls");
		// wait till load
		let reloadBtn = cy.get('#error_loading');
		if (reloadBtn) {
			reloadBtn.click();
		}
		// TODO, all other tests
		// group by
		// filter
		// click on item
		//
	});
});
