module.exports = function debug(info, req, next){
  console.log('level called debug');
  next();
}
