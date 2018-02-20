module.exports = {
  "database": "mongodb://usergcp:BDqF980117@ds035633.mlab.com:35633/dbgcproductivity",
  "port": process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  "ip": process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
  "secretKey" : "YourSecretKey"
}
