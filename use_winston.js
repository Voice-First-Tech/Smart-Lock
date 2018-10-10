var winston = require('winston');

  //
  // Requiring `winston-papertrail` will expose
  // `winston.transports.Papertrail`
  //
  require('winston-papertrail').Papertrail;

  var winstonPapertrail = new winston.transports.Papertrail({
	host: 'logs.papertrailapp.com',
	port: 12345
  })
  
  winstonPapertrail.on('error', function(err) {
	// Handle, report, or silently ignore connection errors and failures
  });

  var logger = new winston.Logger({
	transports: [winstonPapertrail]
	colorize: true
  });

  winstonPapertrail.on('connect', function () {
    logger.info('logging before I close');
    logger.close(); // this closes the underlying connection in the Papertrail transport
});
