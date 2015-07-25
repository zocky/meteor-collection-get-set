Package.describe({
  git: "https://github.com/zocky/meteor-collection-get-set.git",
  name: "zocky:collection-get-set",
  summary: 'Adds .get(query,path), .set(query,path,value) and .set(query,{path:value,...}) to Meteor.Collection objects.'
  version: "0.0.1"
});


Package.on_use(function (api) {
  api.versionsFrom("METEOR-CORE@0.9.0-atm");
  api.use(['underscore'], ['client', 'server']);
  api.use('mongo', ['client', 'server']);
  api.add_files('collection-get-set.js', ['client', 'server']);
});
