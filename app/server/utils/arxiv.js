
import axios from 'axios';
import fs from 'fs';
import 'pdfjs-dist';
import _ from 'lodash';
import request from 'request-promise';

const importPapers = async function(papers){
  const added = await Promise.all(papers.map(requestPapers));
  const nAdded = added.reduce((a,b)=>a+b,0);
  // console.log(`updated: ${nAdded}/${papers.length}`);
  return {
    nAdded,
    total: papers.length,
  };
};

const requestPapers = async function(paper){

  const { data: found } = await axios.get('http://47.52.57.206:8000/paper', {
    params: {
      find: {
        arxivId: paper.arxivId,
        ver: {
          $gte: paper.ver,
        }
      },
      limit: 1,
    }
  });

  if(found.length === 1){
    return 0;
  }

  await axios.put('http://47.52.57.206:8000/paper', {
    query: {
      arxivId: paper.arxivId,
    },
    body: paper,
  });
  return 1;

};

const _getPapersWithoutPdf = function(){
  return axios.get('http://47.52.57.206:8000/paper', {
    params: {
      find: {
        pdfInfo: null
      },
      limit: 1,
    }
  });
};

const populatePdfs = async function(){
  try {
    // console.log('start');
    const { data: papers } = await _getPapersWithoutPdf();
    // console.log('2222');
    for(var i in papers){
      var paper = papers[i];
      const pdfInfo = await _proccessPdf(paper);
      // console.log('333');
      await axios.put('http://47.52.57.206:8000/paper', {
        query: {
          arxivId: paper.arxivId,
        },
        body: {
          pdfInfo: pdfInfo,
        }
      });
      // console.log(paper.arxivId);
      // console.log(pdfInfo);
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  importPapers,
};
