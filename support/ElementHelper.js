import { browser } from 'protractor';

const EC = browser.ExpectedConditions;

/*
This class assists in waiting for non-angular page screen elements
 */
class ElementHelper {
    static waitForPresent(element) {
		return browser.wait(EC.presenceOf($(element)));
	}
	static waitForDisplay(element) {
		return browser.wait(element.isDisplayed);
	}
	static waitForElement(element) {
		this.waitForPresent(element);
		this.waitForDisplay(element);
	}
}

module.exports = ElementHelper;
