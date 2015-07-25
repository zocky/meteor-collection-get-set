This package provides shorthand methods for getting and setting fields and subfields 
on documents in your Mongo collections using dot notation.

# Usage

### .get()

####`Meteor.Collection#get(query,path)`
Find the first document that matches the `query` (a mongo query object or a document `_id`) , return the value at `path` (a dot-delimited string).

If the path doesn't exist in the document, `undefined` is returned without throwing any errors. Only the root field of the path is retrieved from the database.

### .set()
#### `Meteor.Collection#set(query,path,value,update_options)`
Set value at `path` (a dot-delimited string) to `value` on one more documents that match `query` (a mongo query object or a document `_id`). 

This helps avoid overwriting whole document by forgetting to use `$set` in `.update`. It also makes life a lot easier when you only need to update one field and that field's name or path is in a variable.

This constructs an object that is passed as the `$set` operator to the collection's `update` method. `update_options` is also passed, so you can use `{multi:1}` to update multiple documents.

#### `Meteor.Collection#set(query,set,update_options)`
The same as above, but with a `set` (an object) of paths and values. 

This simply passes the arguments to `.update(query,{$set:set},update_options)`



#Example
```` javascript
// insert some data
Places = new Meteor.Collection("places");
Places.insert({
  _id: "zoo",
  name: "The Zoo",
  owner: "City Council",
  quality: 5,
  location: { address: { street: "4, Lower Avenue",postcode: "314-159" }, lat:26.53, lon:58.98 },
  features: [
    { name: "Louis the Lion",  type: "carnivore"},
    { name: "Louise the Lama", type: "herbivore"},
    { name: "Charles Darwin",  type: "beast" }
  ]
});

// get some existing values
Places.get("zoo","location.address.postcode") === "314-159" ;
Places.get({name:"The Zoo"},"features.2.type") === "beast" ;

// features.3 doesn"t exist so this will return undefined without throwing an error 
Places.get("zoo","features.3.type") === undefined;

// set a field
Places.set("zoo","features.2.type","bust");

// set multiple fields
Places.set("zoo",{ name: "Stan's Amazing Pet Show", owner: "Stan Shady" });

//set a field in multiple documents
Places.set({owner:"Stan Shady"}, 'quality', 2, {multi:1});

//set multiple fields in multiple documents
Places.set({owner:"Stan Shady"},{owner: "MegaBank Inc.", quality:0}, {multi:1});
````
