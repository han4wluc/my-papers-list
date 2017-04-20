
import _ from 'lodash';
import mongoose from 'mongoose';

import Parse from './parse';

const { isValid } =  mongoose.Types.ObjectId;


const findAll = async function(params){
  const {
    model, query: originalQuery
  } = params;
  // console.log({originalQuery})

  const query = Parse.parseQuery(originalQuery);

  const { find, limit, select, sort, skip } = query;
  // console.log('select', select);
  try {
    const rows =
      await model
        .find(find)
        .limit(limit)
        .select(select)
        .sort(sort)
        .skip(skip)
        .exec();
    // return {
    //   query, rows
    // };
    return rows;
  } catch (error){
    throw new Error(error);
    // return {
    //   query, error
    // };
    // return error;
  }
};

const findOne = async function(params){
  const {
    model, id, query: originalQuery
  } = params;

  const query = Parse.parseQuery(originalQuery);
  const { select } = query;

  return model
        .findOne({_id:id})
        .select(select)
        .exec();

  // try {

  //   throw new Error('Error 44')

  //   const row =
  //     await model
  //       .findOne({_id:id})
  //       .select(select)
  //       .exec();
  //   // return {
  //   //   id, select, row
  //   // };
  //   return row;
  // } catch (error){
  //   // return {
  //   //   id, select, error
  //   // };
  //   return error;
  // }
};

const create = async function(params){
  const {
    model,
    body,
  } = params;
  // todo limit parameters
  return model.create(body);
  // try {
  //   const created = await model.create(body);
  //   // return { created };
  //   return created;
  // } catch (error){
  //   return error;
  //   // return {
  //   //   error,
  //   // };
  // }
};

const update = async function(params){
  const {
    id,
    body,
    model,
  } = params;

  if(!isValid(id)){
    return { };
  }

  const count = await model
        .findOne({_id:id})
        .count();
  if(count === 0){
    throw new Error(404);
  }

  return model.findOneAndUpdate({
    _id: id,
    // deleted: false,
  }, {
    '$set': body,
  }, {
    new: true,
  });

  // try {
  //   // check for deleted
  //   const updated =
  //     await model.findOneAndUpdate({
  //       _id: id,
  //       // deleted: false,
  //     }, {
  //       '$set': body,
  //     }, {
  //       new: true,
  //     });
  //   // return { updated };
  //   return updated;
  // } catch (error){
  //   return error;
  //   // return { error };
  // }
};

const remove = async function(params){
  const {
    model,
    id,
  } = params;

  if(!isValid(id)){
    return { deleted: false };
  }

  const count = await model
        .findOne({_id:id})
        .count();
  if(count === 0){
    throw new Error(404);
  }

  return model.remove({_id: id}).exec();

  // try {
  //   const updated =
  //     await model.remove({_id: id,}).exec();
  //     // await model.findOneAndUpdate({
  //     //   _id: id,
  //     //   deleted: false,
  //     // }, {
  //     //   '$set': {
  //     //     deleted: true,
  //     //   },
  //     // });
  //   // return { deleted: true };
  //   return {};
  // } catch (error){
  //   return error;
  //   // return { error };
  // }
};

export default {
  findAll,
  findOne,
  create,
  update,
  remove,
};
