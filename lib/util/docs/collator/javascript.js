//var async = require('async');
var util = require('util');
var Collator = require('./collator');

var JavascriptCollator = function(options) {
  this.language = 'javascript';
  Collator.apply(this, arguments);
}

util.inherits(JavascriptCollator, Collator);

//JavascriptCollator.prototype.include = function(doc, key, file, cb) {
  //var component;
  //var rewrites = key === this.keys.rewrites;
  //var views = key === this.keys.views;
  //var lib = !key || key === this.keys.lib;
  //var exports = 'module.exports = ';
  //if(!key) {
    //key = file.id;
    //file.id = null;
  //}
  //try {
    //if(!views) {
      //component = require(file.file);
    //}else{
      //if(file.object) {
        //component = {
          //map: require(file.file).map,
          //reduce: require(file.file).reduce
        //}
      //}else{
        //component = {
          //map: require(file.map.file),
          //reduce: require(file.reduce.file)
        //}
      //}
    //}
    //if(rewrites && !Array.isArray(component)) {
      //throw new Error('rewrite include file must export an array');
    //}
  //}catch(e) {
    //return cb(e);
  //}
  //if(rewrites) {
    //doc[key] = doc[key] || [];
    //doc[key] = doc[key].concat(component);
  //}else if(!views){
    //if(file.id) {
      //doc[key] = doc[key] || {};
      //if(lib) {
        //doc[key][file.id] = exports + component.toString();
      //}else{
        //doc[key][file.id] = component;
      //}
    //}else{
      //if(lib) {
        //doc[key] = exports + component.toString();
      //}else{
        //doc[key] = component;
      //}
    //}
  //}else if(views) {
    //doc[key] = doc[key] || {};
    //doc[key][file.id] = component;
  //}
  //cb();
//}

JavascriptCollator.prototype.collate = function(scope, cb) {
  this.files(function(err, files) {
    if(err) return cb.call(scope, err);
    console.log('collate javascript files');
    console.dir(files);
    cb.call(scope, err, files);
  });
}

module.exports = JavascriptCollator;
