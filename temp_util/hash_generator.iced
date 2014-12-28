c= console.log
bcrypt= require 'bcrypt-nodejs'
fs= require 'fs'

userOb=
  'kevin':
    password: ''
    hash: null
    salt: null
  'michelle':
    password: ''
    hash: null
    salt: null
  'stefan':
    password: ''
    hash: null
    salt: null
  'topher':
    password: ''
    hash: null
    salt: null
  'wylie':
    password: 'snth'
    hash: null
    salt: null

for key, value of userOb
  await bcrypt.genSalt 10, defer(err, salt)
  if err then c err else
    value.salt= salt
    await bcrypt.hash value.password, salt, null, defer(err2, hash)
    if err2 then c err2 else
      value.hash= hash

c "userOb", userOb
fs.writeFileSync 'hashes', ""
for key, value of userOb
  fs.appendFileSync 'hashes', "\n\n user: " + JSON.stringify(key) + "\n password: " + JSON.stringify(value.password) + "\n hash: " + JSON.stringify(value.hash) + "\n salt: " + JSON.stringify(value.salt)

