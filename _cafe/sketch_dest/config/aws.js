(function() {
  var S3, SQS, c;

  c = console.log;

  SQS = require('aws-sqs-promises');

  S3 = require('knox');

  exports.aws(function(env) {
    return {
      sqs: function(queueName) {
        return new SQS({
          name: queueName + "-" + env.NODE_ENV,
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_KEY,
          region: env.AWS_REGION_ID
        });
      },
      s3: function(bucketName) {
        return S3.createClient({
          key: env.AWS_ACCESS_KEY_ID,
          secret: env.AWS_SECRET_KEY,
          region: env.AWS_REGION_ID,
          bucket: bucketName
        });
      }
    };
  });

}).call(this);
