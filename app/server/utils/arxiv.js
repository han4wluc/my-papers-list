
import xml2js from 'xml2js';
import axios from 'axios';

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

  const { data } = await axios.get('http://export.arxiv.org/api/query', {
    params: {
      search_query: `cat:${cat}`,
      start,
      max_results,
      sortBy: 'lastUpdatedDate',
      sortOrder: 'descending',
    }
  });

  const entries = xml2entries(data);
  const papers = await Promise.all(entries.map(entryToPaper));

  console.log(papers);

  const added = await Promise.all(papers.map(requestPapers));
  const nAdded = added.reduce((a,b)=>a+b,0);
  console.log(`updated: ${nAdded}/${papers.length}`);

};

const requestPapers = async function(paper){

  const found = await axios.get('http://47.52.57.206:8000/paper', {
    params: {
      query: {
        arxivId: paper.arxivId,
        ver: paper.ver,
      },
      limit: 1,
    }
  });

  if(found.length === 0){
    return 0;
  }

  await axios.put('http://47.52.57.206:8000/papers', {
    query: {
      arxivId: paper.arxivId,
    },
    body: paper,
  });
  return 1;

};

export {
  _getIdVerFromUrl,
  xml2entries,
  entryToPaper,
  fetchArxiv,
};

