Package.describe({
  git: "",
  name: "zocky:collection-get-set",
  summary: 'Adds .get(query,path), .set(query,path,value) and .set(query,{path:value,...}) to Meteor.Collection objects.'
  version: "0.0.1"
});


Package.on_use(function (api) {

  api.versionsFrom("METEOR-CORE@0.9.0-atm");
  api.use(['underscore'], ['server']);
  api.add_files('collection-get-set.js', ['server','client']);
});
