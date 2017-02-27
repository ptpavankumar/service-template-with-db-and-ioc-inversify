const express = require('express');
const packageJson = require('../../package.json');

const healthCheckGet = (req, res) => {
  if (req.headers.accept === 'application/json' ||
      req.headers.Accept === 'application/json') {
    return res.status(200).send({ version: packageJson.version });
  }

  res.header('Content-Type', 'text/html');
  return res.status(200).send(`<html>
                                 <body>
                                   <p>Im healthy running version <i><b>${packageJson.version}</b></i>!</p>
                                 </body>
                               </html>`);
};

const router = express.Router(); // eslint-disable-line new-cap
router.get('/_health', healthCheckGet);

module.exports = router;
