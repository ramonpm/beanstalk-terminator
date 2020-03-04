var AWS = require("aws-sdk")
var elasticbeanstalk = new AWS.ElasticBeanstalk({
  credentials: new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }),
  region: "us-east-1"
})

module.exports = context => {
  const { payload } = context
  const headBranch = payload.pull_request.head.ref
  const ebEnvironmentName = headBranch.replace(/[^a-z0-9]/gi, "-")

  var params = {
    EnvironmentName: ebEnvironmentName
  }
  elasticbeanstalk.terminateEnvironment(params, function(err) {
    if (err) {
      context.log(err, err.stack)
    } else {
      context.log("Terminating Environment " + ebEnvironmentName)
    }
  })
}
