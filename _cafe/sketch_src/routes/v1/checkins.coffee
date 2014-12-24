
c= console.log
models= require('../../models')
express= require 'express'
router= express.Router()
aws= require('../../config/aws').aws(process.env)

router.route('/')
  .post (req, res)->
    if (not(not(req.files.audio)))
      fileInfo=
        guardian_id: 'fedcba'
        checkin_id: 'ghijkl'
        created_at: new Date()
      saveCheckInAudio req, res, fileInfo, (req, res, fileInfo)->
        addAudioToIngestionQueue req, res, fileInfo, (req, res, fileInfo)->
          res.json fileInfo

router.route('/:checkin_id')
  .get (req, res)->
    res.json {name: 'one checkin: ' + req.params.checkin_id}

module.exports= router

# special callbacks

saveCheckInAudio= (req, res, fileInfo, callback)->
  fileInfo.s3Path=     "/"+process.env.NODE_ENV +"/guardians/"+fileInfo.guardian_id +"/"+fileInfo.created_at.toISOString().substr(0,10).replace(/-/g,"/") +"/"+fileInfo.guardian_id +"-"+fileInfo.created_at.toISOString().substr(0,19).replace(/:/g,"-") +req.files.audio.originalname.substr(req.files.audio.originalname.indexOf("."))
  aws.s3('rfcx-ark').putFile req.files.audio.path, fileInfo.s3Path, (err, s3Res)->
    s3Info= {}
    s3Res.resume()
    if not(not(err))
      res.status(500).json {msg: 'error saving audio'}
    else
      callback req, res, fileInfo

# add_audio_to_ingestionQueue
#addAudioToIngestionQueue= (req, res, fileInfo, cb)->
addAudioToIngestionQueue= (req, res, fileInfo, callback)->
  fileInfo.created_at= fileInfo.created_at.toISOString()
  #fileInfo.createdAt= fileInfo.createdAt.toISOString()
  c fileInfo
  aws.sqs('rfcx-ingestion').sendMessage(fileInfo)
  #aws.sqs('rfcx-ingestion').send_message
    .then (sqsResponse)->
      c 'sqsResponse: ', sqsResponse
      callback req, res, fileInfo
        #res.json messageArray
    .catch (err)->
      res.status(500).json msg: 'error audiong audio to ingestion queue'
