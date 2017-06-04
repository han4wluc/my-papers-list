
import Nightmare from 'nightmare';
import chai from'chai';
const should = chai.should();

describe('test Login page', function() {
  it('should redirect to signup', async function() {
    var nightmare = Nightmare({ show: false, waitTimeout: 10000 });
    await nightmare
      .goto('http://localhost:8000/login')
      .click('#signup_link');
    const url = await nightmare.url();
    await nightmare.end();
    url.should.equal('http://localhost:8000/signup');
  });
  it('should redirect to reqpass', async function() {
    var nightmare = Nightmare({ show: false, waitTimeout: 10000 });
    await nightmare
      .goto('http://localhost:8000/login')
      .click('#forgot_password_link');
    const url = await nightmare.url();
    await nightmare.end();
    url.should.equal('http://localhost:8000/reqpass');
  });
  it('should login and redirect to home', async function() {
    var nightmare = Nightmare({ show: false, waitTimeout: 20000 });
    await nightmare
      .goto('http://localhost:8000/login')
      .insert('#username_input', 'user_2@email.com')
      .insert('#password_input', 'password')
      .click('#login_button')
      .wait('#home_page');
    const url = await nightmare.url();
    await nightmare.end();
    url.should.equal('http://localhost:8000/');
  });
  it('should fail to login and display error', async function() {
    var nightmare = Nightmare({ show: false, waitTimeout: 10000 });
    await nightmare
      .goto('http://localhost:8000/login')
      .insert('#username_input', '')
      .insert('#password_input', '')
      .click('#login_button')
      .wait('#nav_error_bar');
    const url = await nightmare.url();
    await nightmare.end();
    url.should.equal('http://localhost:8000/login');
  });
});
