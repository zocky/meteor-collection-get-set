/*
* like Collection.update(... , {$set:{...}})
*/

Meteor.Collection.prototype.set = function( q, key, optional_value, update_options ) {
  var $set; // we will use this in update later
  if (typeof key == 'object') {
    // we have an object, so just pass to update $set
    $set = key
    // we're not using the value argument, so shift
    update_options = optional_value;
  } else {
    // we have all args, so we must construct an object
    $set = {};
    $set[ key ] = optional_value;
  }
  // pass to update
  return this.update( q, { $set: $set }, update_options || {} );
}

/*
* get one field or subfield from one document by dot notation path
*/

Meteor.Collection.prototype.get = function( q, path, find_options ) {
  //split the key by dots to get the path to the value
  //we will use this later to pass to Meteor._get
  var args = String(path).split(/[.]/);
  // we only need the root field that this path is in
  find_options = find_options ||{};
  find_options.fields = {}; 
  find_options.fields[args[0]] = 1; 
  // find the document
  var doc = this.findOne(q,{fields:fields});
  // if not found, we can't do anything further
  if (!doc) return undefined;
  
  // add the document to the arguments
  args.unshift(doc);
  // let Meteor._get do its thing
  return Meteor._get.apply(Meteor,args);
}

