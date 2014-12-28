# config aws config
c= console.log

SQS= require 'aws-sqs-promises'
S3= require 'knox'

exports.aws= (env)->

  return {
    sqs: (queueName)->
      # Returns a 'aws-sqs-promise' object.
      # See documentation here:
      # https://www.npmjs.com/package/aws-sqs-promises
      return new SQS
        name: queueName+"-"+env.NODE_ENV
        accessKeyId: env.AWS_ACCESS_KEY_ID
        secretAccessKey: env.AWS_SECRET_KEY
        region: env.AWS_REGION_ID

    s3: (bucketName)->
      return S3.createClient
        key: env.AWS_ACCESS_KEY_ID
        secret: env.AWS_SECRET_KEY
        region: env.AWS_REGION_ID
        bucket: bucketName
  }
