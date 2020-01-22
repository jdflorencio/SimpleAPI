const {createLogger, format, transports} = require('winston')

module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp({format: 'HH:mm:ss'}),
    format.printf(info => {`[${info.timestamp}] ${info.level} ${info.message}`})
  ),
  transports: [ 
    new transports.Console({
      level: 'debug',
      format: format.combine(format.simple(),
      format.colorize({ all: true }))
    })
  ]
})


