
import * as arxiv from './app/server/utils/arxiv';
import fetchArxiv from 'node-arxiv';

var start = 0;
const max_results = 100;

const categories = ['cs.CL', 'cs.AI', 'cs.CL', 'CS.LG', 'cs.NE', 'stat.ML'];

const main = async function(){

  for (var i = 0; i < 10000;){

    // sleep 10s
    await new Promise((resolve, reject)=>{
      setTimeout(resolve, 10 * 1000);
    });

    try {
      const end = start + max_results;
      console.log(`fetch arxiv. cat: ${categories}, start: ${start}, end: ${end}`);

      const { papers, totalResults } = await fetchArxiv({
        start: start,
        max_results: max_results,
        categories: categories,
      });

      console.log(`arxiv fetched, n of papers: ${papers.length}, total results: ${totalResults}`);

      if(papers.length === 0){
        console.log('done, no papers from arxiv');
        break;
      }

      const { nAdded, total } = await arxiv.importPapers(papers);

      console.log(`updated: ${nAdded}/${total}`);

      // if(nAdded === 0){
      //   console.log('done, no new papers');
      //   break;
      // }

      start = start + max_results;
      i++;
    } catch (err){
      console.log(err);
    }
  }

};

main();

