module.exports = function error(info, req, next){
  console.log('level called error');
  next();
}
