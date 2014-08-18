module.exports = function none(info, req, next){
  console.log('level called none');
  next();
}
