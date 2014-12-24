(function() {
  var addAudioToIngestionQueue, aws, c, express, models, router, saveCheckInAudio;

  c = console.log;

  models = require('../../models');

  express = require('express');

  router = express.Router();

  aws = require('../../config/aws').aws(process.env);

  router.route('/').post(function(req, res) {
    var fileInfo;
    if (!(!req.files.audio)) {
      fileInfo = {
        guardian_id: 'fedcba',
        checkin_id: 'ghijkl',
        created_at: new Date()
      };
      return saveCheckInAudio(req, res, fileInfo, function(req, res, fileInfo) {
        return addAudioToIngestionQueue(req, res, fileInfo, function(req, res, fileInfo) {
          return res.json(fileInfo);
        });
      });
    }
  });

  router.route('/:checkin_id').get(function(req, res) {
    return res.json({
      name: 'one checkin: ' + req.params.checkin_id
    });
  });

  module.exports = router;

  saveCheckInAudio = function(req, res, fileInfo, callback) {
    fileInfo.s3Path = "/" + process.env.NODE_ENV(+"/guardians/" + fileInfo.guardian_id(+"/" + fileInfo.created_at.toISOString().substr(0, 10).replace(/-/g, "/")(+"/" + fileInfo.guardian_id(+"-" + fileInfo.created_at.toISOString().substr(0, 19).replace(/:/g, "-")(+req.files.audio.originalname.substr(req.files.audio.originalname.indexOf(".")))))));
    return aws.s3('rfcx-ark').putFile(req.files.audio.path, fileInfo.s3Path, function(err, s3Res) {
      var s3Info;
      s3Info = {};
      s3Res.resume();
      if (!(!err)) {
        return res.status(500).json({
          msg: 'error saving audio'
        });
      } else {
        return callback(req, res, fileInfo);
      }
    });
  };

  addAudioToIngestionQueue = function(req, res, fileInfo, callback) {
    fileInfo.created_at = fileInfo.created_at.toISOString();
    c(fileInfo);
    return aws.sqs('rfcx-ingestion').sendMessage(fileInfo).then(function(sqsResponse) {
      c('sqsResponse: ', sqsResponse);
      return callback(req, res, fileInfo);
    })["catch"](function(err) {
      return res.status(500).json({
        msg: 'error audiong audio to ingestion queue'
      });
    });
  };

}).call(this);
