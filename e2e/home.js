
import Nightmare from 'nightmare';
import chai from'chai';
const should = chai.should();

describe('test search page', function() {
  it('should have correct title and url', async function() {
    var nightmare = Nightmare({ show: false });
    await nightmare
      .goto('http://localhost:8000/');
    var title = await nightmare.evaluate(function(){
      return document.title;
    });
    var url = await nightmare.evaluate(function(){
      return document.URL;
    });
    await nightmare.end();
    title.should.equal('MyPaperList');
    url.should.equal('http://localhost:8000/');
  });
  it('should find papers', async function() {
    var nightmare = Nightmare({ show: false, waitTimeout: 10000 });
    await nightmare
      .goto('http://localhost:8000/')
      .wait('#search_result_placeholder')
      .insert('#search_papers_input', 'generative adversarial')
      .click('#search_papers_button')
      .wait('#search_results');
    await nightmare.end();
  });
  it('should find empty', async function() {
    var nightmare = Nightmare({ show: false, waitTimeout: 10000 });
    await nightmare
      .goto('http://localhost:8000/')
      .wait('#search_result_placeholder')
      .insert('#search_papers_input', 'rwerqweasdfasdf')
      .click('#search_papers_button')
      .wait('#search_result_not_found');
    await nightmare.end();
  });
});
