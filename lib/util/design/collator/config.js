var index = 'index.json';
var keys = {
  rewrites: 'rewrites',
  views: 'views',
  lib: 'lib',
  updates: 'updates',
  shows: 'shows',
  lists: 'lists',
  filters: 'filters',
  validate_doc_update: 'validate_doc_update',
  map: 'map',
  reduce: 'reduce'
}
var rules = {
  attachments: /^attachments\//,
  lib: /^lib\//,
  docs: /^docs\//,
  views: /^views\//,
  updates: /^updates\//,
  shows: /^shows\//,
  lists: /^lists\//,
  filters: /^filters\//,
  viewslib: /^views\/lib\//,
  viewsfile: /^views\/[^\.\/]+\./,
  rewrites: /^rewrites\./,
  map: /^map\./,
  reduce: /^reduce\./,
  validate_doc_update: /^validate_doc_update\./
}

rules.modules = /^[^\/]+/;

module.exports = {
  index: index,
  keys: keys,
  rules: rules
}
