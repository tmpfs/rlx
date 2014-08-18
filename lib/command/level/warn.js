module.exports = function warn(info, req, next){
  console.log('level called warn');
  next();
}
