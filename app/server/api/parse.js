
import _ from 'lodash';

const parseFind = function(find){
  // return find || {};

  var find2;
  try {
    find2 = JSON.parse(find);
  } catch (error) {
    find2 = {};
  }

  // console.log('type', typeof find)
  // if(!_.isObject(find)){
  //   return {};
  // }
  return find2;
  // return {
  //   ...find,
  //   deleted: false,
  // };
};

const parseLimit = function(limit){
  if(limit === undefined){
    return 100;
  }
  if(!_.isNumber(_.parseInt(limit)) || limit === 0){
    return 100;
  }
  return Math.min(1000, limit);
};

const parseSkip = function(skip){
  if(skip === undefined){
    return 0;
  }
  const actualSkip = _.parseInt(skip);
  if(isNaN(actualSkip)){
    return 0;
  }
  return actualSkip;
};

const parseSelect = function(select){
  var select2;
  if(!select){ return {}; }
  try {
    select2 = JSON.parse(select);
  } catch (error) {
    // select2;
    select2 = select;
  }
  return select2;
  // return select || {};
  // if(!_.isObject(select)){
    // return {};
  //   return { password: 0 };
  // }
  // return select;
  //   ...select,
  //   password: 0,
  // };
};

const parseSort = function(sort){
  var sort2;
  try {
    sort2 = JSON.parse(sort);
  } catch (error) {
    sort2 = {};
  }
  return sort2;
  // return sort || {};
  // if(!_.isObject(sort)){
  //   return {};
  // }
  // return sort;
  // return {
  //   ...sort,
  // };
};

const parseQuery = function(query = {}){
  // console.log('query1', query)
  // console.log('query.find', query.find);
  const find   = parseFind(query.find);
  // console.log('find1', find);
  const limit  = parseLimit(query.limit);
  const select = parseSelect(query.select);
  const sort   = parseSort(query.sort);
  const skip   = parseSkip(query.skip);
  return {
    find, limit, select, sort, skip,
  };
};

export default {
  parseFind,
  parseLimit,
  parseSelect,
  parseSort,
  parseQuery,
};
