export default {
  jwtSecret: 'YOUR JWT SECRET HERE', //node -e "console.log(require('crypto').randomBytes(256).toString('base64'));" <-- generate secret key
  jwtSecretExpiration: 900, //time in seconds
  jwtRefreshSecret: 'YOUR JWT REFRESH SECRET HERE',
  jwtRefreshSecretExpiration: 7200,
};
