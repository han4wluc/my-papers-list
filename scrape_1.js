
// var shell = require('shelljs');
// var redis = require("redis");

// import shell from 'shelljs';
import * as arxiv from './app/server/utils/arxiv';

var start = 0;
const max_results = 100;
// const cat = 'cs.CV';
const cat = 'cs.AI';

const main = async function(){

  // const timeout = setTimeout(function(){
  //   client.hmsetAsync('scrape_numbers', `${cat}:status`, 0);
  //   throw new Error('timed out');
  // }, 2 * 60000);

  // sleep 10s

  for (var i = 0; i < 10000;){

    await new Promise((resolve, reject)=>{
      setTimeout(resolve, 10 * 1000);
    });

    try {
      const end = start + max_results;
      console.log(`fetch arxiv. cat: ${cat}, start: ${start}, end: ${end}`);

      const { papers, totalResults } = await arxiv.fetchArxiv({
        start: start,
        max_results: max_results,
        cat: cat
      });

      console.log(`arxiv fetched, n of papers: ${papers.length}, total results: ${totalResults}`);

      if(papers.length === 0){
        throw new Error('done, no papers from arxiv');
      }

      const { nAdded, total } = await arxiv.importPapers(papers);

      console.log(`updated: ${nAdded}/${total}`);

      if(nAdded === 0){
        console.log('done, no new papers');
        break;
      }

      start = start + max_results;
      i++;
    } catch (err){
      console.log(err);
    }
  }

  //  finally {
  //   clearTimeout(timeout);
  // }

};

main();

