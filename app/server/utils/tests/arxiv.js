
import fs from 'fs';
import * as arxiv from '../arxiv';

import chai from'chai';
const should = chai.should();

console.log(__dirname);

const dateTimeReviver = function (key, value) {
    var a;
    if (typeof value === 'string') {
        a = /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ/.exec(value);
        // a = /\/Date\((\d*)\)\//.exec(value);
        if (a) {
          return new Date(value);
          // return new Date(+a[1]);
            // return new Date(+a[1]);
        }
    }
    return value;
}

const xml = fs.readFileSync(__dirname + '/arxiv_query_result.xml', 'utf8');
const entryXml = fs.readFileSync(__dirname + '/entry.xml', 'utf8');
const entryJson = JSON.parse(fs.readFileSync(__dirname + '/entry.json', 'utf8'), dateTimeReviver);

// console.log(typeof entryJson)

// describe('thissss', function(){
//   it('should', function(){
//     const entries = arxiv.xml2entries(xml);
//     entries.length.should.equal(5);
//     entries[0].should.equal(entryXml);
//   });
// });

// describe('thissss', function(){
//   //stuff
//   it('should', async function(){
//     const json = await arxiv.entryToPaper(entryXml);
//     entryJson.should.deep.equal(json);
//   });
// });

// describe('thissss', function(){
//   it('should', function(){
//     const url = 'http://arxiv.org/abs/quant-ph/9802028v1';
//     const res = arxiv._getIdVerFromUrl(url);
//     res.should.deep.equal({
//       id: 'quant-ph/9802028',
//       ver: 1
//     });
//   });
//   it('should', function(){
//     const url = 'https://arxiv.org/abs/1406.2661v1';
//     const res = arxiv._getIdVerFromUrl(url);
//     res.should.deep.equal({
//       id: '1406.2661',
//       ver: 1
//     });
//   });
// });

describe('thissss', function(){
  it('should', async function(){

    await arxiv.fetchArxiv({
      start: 10,
      max_results: 10,
      cat: 'cs.CV',
    });

  });
});


// xml2entries
