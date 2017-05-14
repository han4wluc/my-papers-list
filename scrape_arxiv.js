
// node scrape_arxiv_.js --start 1200 --max_results 100 --cat cs.CV

// require('babel-register')({
//   presets: [ 'es2015', 'stage-2', 'react']
// });
// require('babel-polyfill');

// var fetchArxiv = require('./app/server/utils/arxiv').fetchArxiv;

// import { fetchArxiv, importPapers } from './app/server/utils/arxiv';
import * as arxiv from './app/server/utils/arxiv';
import request from 'request-promise';
var ArgumentParser = require('argparse').ArgumentParser;
import _ from 'lodash';


var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp:true,
  description: 'Argparse example'
});
parser.addArgument(
  [ '--start' ],
  {
    defaultValue: 0,
    help: 'start'
  }
);
parser.addArgument(
  [ '--max_results' ],
  {
    help: 'number of papers to get'
  }
);
parser.addArgument(
  ['--cat'],
  {
    help: 'category'
  }
);
var args = parser.parseArgs();

var start = parseInt(args.start, 10);
var max_results = parseInt(args.max_results, 10);
var cat = args.cat;

if(isNaN(start) || isNaN(max_results) || !cat){
  throw new Error('start, max_results, cat are required');
}

import axios from 'axios';
import fs from 'fs';

const main = async function(){


  try {
    console.log(`fetch arxiv. cat: ${cat}, start: ${start}, end: ${start + max_results}`);

    const { papers, totalResults } = await arxiv.fetchArxiv({
      start: start,
      max_results: max_results,
      cat: cat
    });

    console.log(`arxiv fetched, n of papers: ${papers.length}, total results: ${totalResults}`);

    if(papers.length === 0){
      console.log('done, no more data from arxiv');
    }

    const { nAdded, total } = await arxiv.importPapers(papers);

    console.log(`updated: ${nAdded}/${total}`);
  } catch (error){
    console.error('error', error);
  }


};

main();

// const main2 = async function(){
//   await arxiv.populatePdfs();
//   console.log('done');
// };

// main2();


// const arrays = [
//   'hello how are you doing',
//   'im doing o-',
//   'k wow that  is great',
//   '',
//   '',
//   'how about yo-',
//   'u',
//   'im fine thank you.'
// ];

// const array2string = function(array){
//   var text = '';
//   for(var i=0; i<array.length;i++){
//     var str = array[i];
//     if(!str) { continue; }
//     var len = str.length;

//     if(str[len-1] === '-'){
//       str = str.substring(0,len-1);
//       text = text + str;
//     } else {
//       text = text + str + ' ';
//     }
//   }
//   return text.trim();
// };

// console.log(_.range(1,4+1));
// const text = array2string(arrays);

// console.log(text);




