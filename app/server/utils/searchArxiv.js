
import request from 'request-promise';
import xml2js from 'xml2js';
// import Promise from 'bluebird';

// var xml2js = Promise.promisifyAll(require('xml2js'));
// var parseString = xml2js.parseString;
// var parseString = Promise.promisifyAll(require('xml2js')).parseString;
// Promise.promisifyAll(parseString);

const parseString = function(string){
  return new Promise(function(resolve, reject){
    xml2js.parseString(string, function(err, result){
      if(err){
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const mapPaper = function(entry){
  return {
    id: entry.id[0],
    title: entry.title[0],
    published: new Date(entry.published[0]),
    updated: new Date(entry.updated[0]),
    summary: entry.summary[0],
    authors: entry.author.map((author)=>{
      return author.name;
    })
  };
};


const main = async function(keyword){
  const url = `http://export.arxiv.org/api/query?search_query=all:${keyword}`;
  const res = await request(url);
  const result = await await parseString(res);
  const papers = result.feed.entry.map(mapPaper);
  return papers;
};

// const res = main('generative');
// console.log(res);

export default main;


