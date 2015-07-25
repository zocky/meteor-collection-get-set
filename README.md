This package provides shorthand methods for getting and setting fields and subfields 
on documents in your Mongo collections.

#Example
```` javascript
// insert some data
Places = new Meteor.collection("places");
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
})

// get some existing values
Places.get("zoo","contact.address.postcode") === "314-159" ;
Places.get({name:"The Zoo"},"features.2.type") === "beast" ;

// features.3 doesn"t exist so this will return undefined without throwing an error 
Places.get("zoo","features.3.type") === undefined;

// set a field
Places.set("zoo","features.2.type","bust");

// set multiple fields
Places.set("zoo",{ name: "Stan's Amazing Pet Show", owner: "Stan Shady" }

//set a field in multiple documents
Places.set({owner:"Stan Shady"},quality:2, {multi:1});

//set multiple fields in multiple documents
Places.set({owner:"Stan Shady"},{owner: "MegaBank Inc.", quality:0}, {multi:1});
````
