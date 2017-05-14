
// var shell = require('shelljs');
// var redis = require("redis");

// import shell from 'shelljs';
import * as arxiv from './app/server/utils/arxiv';
// import redis
var Promise = require("bluebird");
const redis = Promise.promisifyAll(require("redis"));
var client = redis.createClient({
  detect_buffers: true,
  host: '47.52.57.206',
  port: '6379',
  password: 'zzpEFz2xsH8FP1Q5TBnyZG9381md29gj3TYKNkoH4rsDvnyHCXCaUHt2SzRl2rZiZbsXA1STCfJ',
});
client.on("error", console.log);

var res;
const max_results = 100;
const cat = 'cs.CV';


const main = async function(){

  const timeout = setTimeout(function(){
    client.hmsetAsync('scrape_numbers', `${cat}:status`, 0);
    throw new Error('timed out');
  }, 2 * 60000);

  try {
    var [start, status] = (await client.hmgetAsync('scrape_numbers', cat, `${cat}:status`));

    if(status == 1){
      console.log('last job not finished');
      return;
    }
    if(start === null){
      start = 0;
    }

    await client.hmsetAsync('scrape_numbers', `${cat}:status`, 1);
    // res = shell.exec(`/usr/local/bin/node scrape_arxiv_.js --start ${start} --max_results ${max_results} --cat ${cat}`);
    const end = parseInt(start, 10) + max_results;
    console.log(`fetch arxiv. cat: ${cat}, start: ${start}, end: ${end}`);

    const { papers, totalResults } = await arxiv.fetchArxiv({
      start: start,
      max_results: max_results,
      cat: cat
    });

    console.log(`arxiv fetched, n of papers: ${papers.length}, total results: ${totalResults}`);

    if(papers.length === 0){
      console.log('done, no papers from arxiv');
      // clearTimeout(timeout);
      // await client.hmsetAsync('scrape_numbers', `${cat}:status`, 0);
      // client.quit();
      return;
    }

    const { nAdded, total } = await arxiv.importPapers(papers);

    console.log(`updated: ${nAdded}/${total}`);

    await client.hmsetAsync('scrape_numbers', cat, end);

  } catch (err){
    console.log(err);
  } finally {
    clearTimeout(timeout);
    await client.hmsetAsync('scrape_numbers', `${cat}:status`, 0);
    client.quit();
  }

};

client.on('ready', function(){
  main();
});

