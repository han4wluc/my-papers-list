
import xml2js from 'xml2js';
import axios from 'axios';
import fs from 'fs';
import 'pdfjs-dist';
import _ from 'lodash';
import request from 'request-promise';

var parser = new xml2js.Parser({
  xmlns: false,
  // explicitArray: true,
  // ignoreAttrs: true,
  // async: true,
  mergeAttrs: true,
});

const xmlParseString = function(string){
  return new Promise(function(resolve, reject){
    parser.parseString(string, function(err, result){
      if(err){
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const xml2entries = function(xml){
  const regex = /\s\s(<entry>\n((.|\n)*?)\s\s<\/entry>)\n/g;
  // return regex.exec(xml);
  return xml.match(regex);
};

const _getIdVerFromUrl = function(url){
  const idRes = url.match(/https?:\/\/arxiv\.org\/abs\/(.*)v(\d+)$/);
  return {
    id: idRes[1],
    ver: parseInt(idRes[2], 10),
  };
};

const mapPaper = function(entry){
  const { id:arxivId, ver } = _getIdVerFromUrl(entry.id[0]);
  return {
    arxivId: arxivId,
    ver: ver,
    abs: 'https://arxiv.org/abs/' + arxivId,
    pdf: 'https://arxiv.org/pdf/' + arxivId,
    title: entry.title[0],
    published: new Date(entry.published[0]),
    updated: new Date(entry.updated[0]),
    summary: entry.summary[0].replace(/\n/g, ' ').trim(),
    authors: entry.author.map((author)=>{
      return author.name[0];
    }),
    categories: entry.category.map((category)=>{
      return `arxiv.${category.term[0]}`;
    })
  };
};

const entryToPaper = async function(entry){

  const entryJson = await xmlParseString(entry);
  return mapPaper(entryJson.entry);

};

const fetchArxiv = async function({start = 0, max_results = 10, cat}){
  try {
    const { data } = await axios.get('http://export.arxiv.org/api/query', {
      params: {
        search_query: `cat:${cat}`,
        start,
        max_results,
        sortBy: 'lastUpdatedDate',
        sortOrder: 'descending',
      },
      timeout: 30000,
    });
    console.log('end fetchArxiv');
    const entries = xml2entries(data);
    const papers = await Promise.all(entries.map(entryToPaper));
    return papers;
  } catch (error){
    // console.log(error);
    throw error;
  }
};

const importPapers = async function(papers){
  const added = await Promise.all(papers.map(requestPapers));
  const nAdded = added.reduce((a,b)=>a+b,0);
  // console.log(`updated: ${nAdded}/${papers.length}`);
  return {
    nAdded,
    total: papers.length,
  };
};


// http://47.52.57.206:8000/paper?find={arxivId:"1704.08759",ver:1}&limit=1

const requestPapers = async function(paper){

  const { data: found } = await axios.get('http://47.52.57.206:8000/paper', {
    params: {
      find: {
        arxivId: paper.arxivId,
        ver: paper.ver,
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

const _downloadPdf = function(pdfUrl, outFilePath){
  return new Promise(function(resolve, reject){
    const stream = fs.createWriteStream(outFilePath);
    stream.on('finish', resolve);
    stream.on('error', reject);
    request({
      method: 'GET',
      url: pdfUrl,
      headers: {
        'User-Agent': 'request'
      },
    }).pipe(stream);
  });
};

const _array2string = function(array){
  var text = '';
  for(var i=0; i<array.length;i++){
    var str = array[i];
    if(!str) { continue; }
    var len = str.length;

    if(str[len-1] === '-'){
      str = str.substring(0,len-1);
      text = text + str;
    } else {
      text = text + str + ' ';
    }
  }
  return text.trim().replace(/\s{2,}/g, ' ');
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

const _proccessPdf = async function(paper, debug){

  const { arxivId, ver, pdf } = paper;

  try {
    fs.mkdirSync('./tmp');
  } catch (err) {
  }
  // request
  // const promises = papers.map(async ({ver,pdf,arxivId}, i)=>{
  const arxivIdCopy = arxivId + '';
  const pdfPath = './tmp/' + arxivIdCopy.replace('/','.') + '.pdf';

  // const pdfPath = './tmp/hello.pdf';
  if(debug){
    console.log('');
  }
  await _downloadPdf(pdf, pdfPath);
  // const pdfFile = new pdftotext(pdfPath);
  // console.log('pdf dled', arxivId);
  // var text = pdfFile.getTextSync().toString('utf8');
  // fs.unlinkSync(pdfPath);

  // https://github.com/mozilla/pdf.js/blob/master/examples/node/getinfo.js
  var pdfJsdata = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await PDFJS.getDocument(pdfJsdata);

  // doc.numPages.map()
  const pages = _.range(1,doc.numPages+1);
  // const pages = [1];
  const stringArrays = pages.map(async function(pageNum){
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    return content.items.map(function (item) {
      return item.str;
    });
  });

  const pageTexts = _.flatten(await Promise.all(stringArrays));

  const text = _array2string(pageTexts);

  return {
    text: text,
    pages: doc.numPages,
    toolVer: 1,
    ver: ver,
  };
    // return Promise.resolve(data);
  // });

  // return Promise.all(promises);

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
  _getIdVerFromUrl,
  xml2entries,
  entryToPaper,
  fetchArxiv,
  importPapers,
  populatePdfs,
};
