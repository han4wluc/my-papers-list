
// import request from 'request-promise';
import xml2js from 'xml2js';

// const xml = require("node-xml-lite");


// // import Promise from 'bluebird';

// // var xml2js = Promise.promisifyAll(require('xml2js'));
// // var parseString = xml2js.parseString;
// // var parseString = Promise.promisifyAll(require('xml2js')).parseString;
// // Promise.promisifyAll(parseString);

var parser = new xml2js.Parser({
  xmlns: false,
  // explicitArray: true,
  // ignoreAttrs: true,
  // async: true,
  mergeAttrs: true,
});

const xmlParseString = function(string){
  return new Promise(function(resolve, reject){
    // console.log('start')
    // const res = parser.parseString(string)
    // console.log('res', res);
    // resolve();
    // return resolve(xml.parseString(string));
    parser.parseString(string, function(err, result){
      if(err){
        return reject(err);
      }
      return resolve(result);
    });
  });
};

// const mapPaper = function(entry){
//   return {
//     id: entry.id[0],
//     title: entry.title[0],
//     published: new Date(entry.published[0]),
//     updated: new Date(entry.updated[0]),
//     summary: entry.summary[0],
//     authors: entry.author.map((author)=>{
//       return author.name;
//     })
//   };
// };


// const main = async function(keyword){
//   console.log('001')
//   const url = `http://export.arxiv.org/api/query?search_query=all:${keyword}`;
//   try {
//     const res = await request(url);
//     console.log('111')
//     const result = await parseString(res);    
//   } catch (error){
//     console.log('error', error);
//   }

//   // const papers = result.feed.entry.map(mapPaper);
//   // return papers;
//   return result
// };

// console.log('000')
// const res = main('generative');
// res.then(function(result){
//   console.log(JSON.stringify(result, null, 2))
// });
// // export default main;

const XML_STRING = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <link href="http://arxiv.org/api/query?search_query%3Dcat%3Acs.CV%26id_list%3D%26start%3D0%26max_results%3D5" rel="self" type="application/atom+xml"/>
  <title type="html">ArXiv Query: search_query=cat:cs.CV&amp;id_list=&amp;start=0&amp;max_results=5</title>
  <id>http://arxiv.org/api/mHOuxwxtlqt7dXdPs9Pt0N7NWhU</id>
  <updated>2017-04-25T00:00:00-04:00</updated>
  <opensearch:totalResults xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/">11290</opensearch:totalResults>
  <opensearch:startIndex xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/">0</opensearch:startIndex>
  <opensearch:itemsPerPage xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/">5</opensearch:itemsPerPage>
  <entry>
    <id>http://arxiv.org/abs/quant-ph/9802028v1</id>
    <updated>1998-02-11T16:25:41Z</updated>
    <published>1998-02-11T16:25:41Z</published>
    <title>Analogue Quantum Computers for Data Analysis</title>
    <summary>  Analogue computers use continuous properties of physical system for modeling.
In the paper is described possibility of modeling by analogue quantum computers
for some model of data analysis. It is analogue associative memory and a formal
neural network. A particularity of the models is combination of continuous
internal processes with discrete set of output states. The modeling of the
system by classical analogue computers was offered long times ago, but now it
is not very effectively in comparison with modern digital computers. The
application of quantum analogue modelling looks quite possible for modern level
of technology and it may be more effective than digital one, because number of
element may be about Avogadro number (N=6.0E23).
</summary>
    <author>
      <name>Alexander Yu. Vlasov</name>
      <arxiv:affiliation xmlns:arxiv="http://arxiv.org/schemas/atom">FCR/IRH, St.-Petersburg, Russia</arxiv:affiliation>
    </author>
    <arxiv:comment xmlns:arxiv="http://arxiv.org/schemas/atom">7 pages, standard article LaTeX2e document class</arxiv:comment>
    <link href="http://arxiv.org/abs/quant-ph/9802028v1" rel="alternate" type="text/html"/>
    <link title="pdf" href="http://arxiv.org/pdf/quant-ph/9802028v1" rel="related" type="application/pdf"/>
    <arxiv:primary_category xmlns:arxiv="http://arxiv.org/schemas/atom" term="quant-ph" scheme="http://arxiv.org/schemas/atom"/>
    <category term="quant-ph" scheme="http://arxiv.org/schemas/atom"/>
    <category term="cs.CV" scheme="http://arxiv.org/schemas/atom"/>
  </entry>
  <entry>
    <id>http://arxiv.org/abs/cs/9810003v1</id>
    <updated>1998-10-02T03:34:38Z</updated>
    <published>1998-10-02T03:34:38Z</published>
    <title>A Linear Shift Invariant Multiscale Transform</title>
    <summary>  This paper presents a multiscale decomposition algorithm. Unlike standard
wavelet transforms, the proposed operator is both linear and shift invariant.
The central idea is to obtain shift invariance by averaging the aligned wavelet
transform projections over all circular shifts of the signal. It is shown how
the same transform can be obtained by a linear filter bank.
</summary>
    <author>
      <name>Andreas Siebert</name>
    </author>
    <arxiv:comment xmlns:arxiv="http://arxiv.org/schemas/atom">4 pages, 5 figures</arxiv:comment>
    <arxiv:journal_ref xmlns:arxiv="http://arxiv.org/schemas/atom">Proceedings 1998 International Conference on Image Processing,
  Chicago, 4-7 October 1998</arxiv:journal_ref>
    <link href="http://arxiv.org/abs/cs/9810003v1" rel="alternate" type="text/html"/>
    <link title="pdf" href="http://arxiv.org/pdf/cs/9810003v1" rel="related" type="application/pdf"/>
    <arxiv:primary_category xmlns:arxiv="http://arxiv.org/schemas/atom" term="cs.CV" scheme="http://arxiv.org/schemas/atom"/>
    <category term="cs.CV" scheme="http://arxiv.org/schemas/atom"/>
    <category term="I.4.3" scheme="http://arxiv.org/schemas/atom"/>
  </entry>
  <entry>
    <id>http://arxiv.org/abs/cs/9810017v1</id>
    <updated>1998-10-19T20:46:16Z</updated>
    <published>1998-10-19T20:46:16Z</published>
    <title>General Theory of Image Normalization</title>
    <summary>  We give a systematic, abstract formulation of the image normalization method
as applied to a general group of image transformations, and then illustrate the
abstract analysis by applying it to the hierarchy of viewing transformations of
a planar object.
</summary>
    <author>
      <name>Stephen L. Adler</name>
    </author>
    <arxiv:comment xmlns:arxiv="http://arxiv.org/schemas/atom">33 pages, plain tex, no figures</arxiv:comment>
    <link href="http://arxiv.org/abs/cs/9810017v1" rel="alternate" type="text/html"/>
    <link title="pdf" href="http://arxiv.org/pdf/cs/9810017v1" rel="related" type="application/pdf"/>
    <arxiv:primary_category xmlns:arxiv="http://arxiv.org/schemas/atom" term="cs.CV" scheme="http://arxiv.org/schemas/atom"/>
    <category term="cs.CV" scheme="http://arxiv.org/schemas/atom"/>
    <category term="I.2.10, I.4.7, I.4.8" scheme="http://arxiv.org/schemas/atom"/>
  </entry>
  <entry>
    <id>http://arxiv.org/abs/math-ph/9903036v2</id>
    <updated>1999-03-19T16:25:54Z</updated>
    <published>1999-03-18T22:41:39Z</published>
    <title>Numerically Invariant Signature Curves</title>
    <summary>  Corrected versions of the numerically invariant expressions for the affine
and Euclidean signature of a planar curve proposed by E.Calabi et. al are
presented. The new formulas are valid for fine but otherwise arbitrary
partitions of the curve. We also give numerically invariant expressions for the
four differential invariants parametrizing the three dimensional version of the
Euclidean signature curve, namely the curvature, the torsion and their
derivatives with respect to arc length.
</summary>
    <author>
      <name>Mireille Boutin</name>
    </author>
    <arxiv:comment xmlns:arxiv="http://arxiv.org/schemas/atom">21 pages, amsart, uses verbatim, amsmath, latexsym, amssymb, epsf 55
  pictures</arxiv:comment>
    <link href="http://arxiv.org/abs/math-ph/9903036v2" rel="alternate" type="text/html"/>
    <link title="pdf" href="http://arxiv.org/pdf/math-ph/9903036v2" rel="related" type="application/pdf"/>
    <arxiv:primary_category xmlns:arxiv="http://arxiv.org/schemas/atom" term="math-ph" scheme="http://arxiv.org/schemas/atom"/>
    <category term="math-ph" scheme="http://arxiv.org/schemas/atom"/>
    <category term="cs.CV" scheme="http://arxiv.org/schemas/atom"/>
    <category term="math.MP" scheme="http://arxiv.org/schemas/atom"/>
  </entry>
  <entry>
    <id>http://arxiv.org/abs/cs/9905013v1</id>
    <updated>1999-05-20T20:37:02Z</updated>
    <published>1999-05-20T20:37:02Z</published>
    <title>Robust Combining of Disparate Classifiers through Order Statistics</title>
    <summary>  Integrating the outputs of multiple classifiers via combiners or
meta-learners has led to substantial improvements in several difficult pattern
recognition problems. In the typical setting investigated till now, each
classifier is trained on data taken or resampled from a common data set, or
(almost) randomly selected subsets thereof, and thus experiences similar
quality of training data. However, in certain situations where data is acquired
and analyzed on-line at several geographically distributed locations, the
quality of data may vary substantially, leading to large discrepancies in
performance of individual classifiers. In this article we introduce and
investigate a family of classifiers based on order statistics, for robust
handling of such cases. Based on a mathematical modeling of how the decision
boundaries are affected by order statistic combiners, we derive expressions for
the reductions in error expected when such combiners are used. We show
analytically that the selection of the median, the maximum and in general, the
$i^{th}$ order statistic improves classification performance. Furthermore, we
introduce the trim and spread combiners, both based on linear combinations of
the ordered classifier outputs, and show that they are quite beneficial in
presence of outliers or uneven classifier performance. Experimental results on
several public domain data sets corroborate these findings.
</summary>
    <author>
      <name>Kagan Tumer</name>
    </author>
    <author>
      <name>Joydeep Ghosh</name>
    </author>
    <arxiv:comment xmlns:arxiv="http://arxiv.org/schemas/atom">22 pages</arxiv:comment>
    <link href="http://arxiv.org/abs/cs/9905013v1" rel="alternate" type="text/html"/>
    <link title="pdf" href="http://arxiv.org/pdf/cs/9905013v1" rel="related" type="application/pdf"/>
    <arxiv:primary_category xmlns:arxiv="http://arxiv.org/schemas/atom" term="cs.LG" scheme="http://arxiv.org/schemas/atom"/>
    <category term="cs.LG" scheme="http://arxiv.org/schemas/atom"/>
    <category term="cs.CV" scheme="http://arxiv.org/schemas/atom"/>
    <category term="cs.NE" scheme="http://arxiv.org/schemas/atom"/>
    <category term="I.5.1 ; G.3" scheme="http://arxiv.org/schemas/atom"/>
  </entry>
</feed>`;


const regex = /\s\s(<entry>\n((.|\n)*?)\s\s<\/entry>)\n/g
const res = regex.match(XML_STRING);

const main = async function(){
  // console.log('aaa')
  // const parser = new Parser({optionName: value});
  // const res2 = await parser.parseString(res[0], function(err, res2){
    const res2 = await xmlParseString(res[0])
   console.log(JSON.stringify(res2, null, 2));
    // console.log('res2', res2);
  // });
};

main();


// {
//   "entry": {
//     "id": [
//       "http://arxiv.org/abs/quant-ph/9802028v1"
//     ],
//     "updated": [
//       "1998-02-11T16:25:41Z"
//     ],
//     "published": [
//       "1998-02-11T16:25:41Z"
//     ],
//     "title": [
//       "Analogue Quantum Computers for Data Analysis"
//     ],
//     "summary": [
//       "  Analogue computers use continuous properties of physical system for modeling.\nIn the paper is described possibility of modeling by analogue quantum computers\nfor some model of data analysis. It is analogue associative memory and a formal\nneural network. A particularity of the models is combination of continuous\ninternal processes with discrete set of output states. The modeling of the\nsystem by classical analogue computers was offered long times ago, but now it\nis not very effectively in comparison with modern digital computers. The\napplication of quantum analogue modelling looks quite possible for modern level\nof technology and it may be more effective than digital one, because number of\nelement may be about Avogadro number (N=6.0E23).\n"
//     ],
//     "author": [
//       {
//         "name": [
//           "Alexander Yu. Vlasov"
//         ],
//         "arxiv:affiliation": [
//           {
//             "_": "FCR/IRH, St.-Petersburg, Russia",
//             "xmlns:arxiv": [
//               "http://arxiv.org/schemas/atom"
//             ]
//           }
//         ]
//       }
//     ],
//     "arxiv:comment": [
//       {
//         "_": "7 pages, standard article LaTeX2e document class",
//         "xmlns:arxiv": [
//           "http://arxiv.org/schemas/atom"
//         ]
//       }
//     ],
//     "link": [
//       {
//         "href": [
//           "http://arxiv.org/abs/quant-ph/9802028v1"
//         ],
//         "rel": [
//           "alternate"
//         ],
//         "type": [
//           "text/html"
//         ]
//       },
//       {
//         "title": [
//           "pdf"
//         ],
//         "href": [
//           "http://arxiv.org/pdf/quant-ph/9802028v1"
//         ],
//         "rel": [
//           "related"
//         ],
//         "type": [
//           "application/pdf"
//         ]
//       }
//     ],
//     "arxiv:primary_category": [
//       {
//         "xmlns:arxiv": [
//           "http://arxiv.org/schemas/atom"
//         ],
//         "term": [
//           "quant-ph"
//         ],
//         "scheme": [
//           "http://arxiv.org/schemas/atom"
//         ]
//       }
//     ],
//     "category": [
//       {
//         "term": [
//           "quant-ph"
//         ],
//         "scheme": [
//           "http://arxiv.org/schemas/atom"
//         ]
//       },
//       {
//         "term": [
//           "cs.CV"
//         ],
//         "scheme": [
//           "http://arxiv.org/schemas/atom"
//         ]
//       }
//     ]
//   }
// }




