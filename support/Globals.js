import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

class Globals {
	constructor() {
		this.expect = chai.expect;
		this.assert = chai.assert;
		chai.use(chaiAsPromised);
	}
}

export default Globals;
