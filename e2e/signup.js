
import Nightmare from 'nightmare';
import chai from'chai';
const should = chai.should();

describe('test Signup page', function() {
  it('should redirect to login', async function() {
    var nightmare = Nightmare({ show: false, waitTimeout: 10000 });
    await nightmare
      .goto('http://localhost:8000/signup')
      .click('#login_link');
    const url = await nightmare.url();
    await nightmare.end();
    url.should.equal('http://localhost:8000/login');
  });
  it('should display error bar', async function() {
    var nightmare = Nightmare({ show: false, waitTimeout: 10000 });
    await nightmare
      .goto('http://localhost:8000/signup')
      .click('#signup_button')
      .wait('#nav_error_bar');
    const url = await nightmare.url();
    await nightmare.end();
  });
  it('should signup successfully', async function() {
    var nightmare = Nightmare({ show: false, waitTimeout: 10000 });
    await nightmare
      .goto('http://localhost:8000/signup')
      .insert('#username_input', 'username4')
      .insert('#password_input', 'password4')
      .insert('#email_input', 'email4@email.com')
      .click('#signup_button')
      .wait('#home_page');
    const url = await nightmare.url();
    await nightmare.end();
  });
});
