module.exports = function info(info, req, next){
  console.log('level called info');
  next();
}
