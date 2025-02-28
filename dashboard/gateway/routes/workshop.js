var express = require('express');
var proxy = require('http-proxy-middleware');
var axios = require('axios');
var axios_retry = require('axios-retry');
var fs = require('fs');

workshops_urls = process.env.WORKSHOPS_URLS;

module.exports = function(app, prefix) {
    var router = express.Router();

    if (workshops_urls || fs.existsSync('/opt/app-root/workshop/_workshop.yml') ||
            fs.existsSync('/opt/app-root/src/workshop/_workshop.yml')) {

        // Workshopper.

	router.get('/.redirect-when-workshop-is-ready', function (req, res) {
	    var client = axios.create({ baseURL: 'http://127.0.0.1:10082' });

            var options = {
                retries: 3,
                retryDelay: (retryCount) => {
                    return retryCount * 500;
                }
            };

	    axios_retry(client, options);

	    client.get(req.baseUrl + '/')
		.then(result => {
		    res.redirect(req.baseUrl + '/');
	        });
	})

        router.use(proxy(prefix, {
            target: 'http://127.0.0.1:10082',
            ws: true
        }));
    }
    else {
        // Raneto.

	router.get('/.redirect-when-workshop-is-ready', function (req, res) {
	    var client = axios.create({ baseURL: 'http://127.0.0.1:10082' });

            var options = {
                retries: 3,
                retryDelay: (retryCount) => {
                    return retryCount * 500;
                }
            };

	    axios_retry(client, options);

	    client.get('/')
		.then(result => {
		    res.redirect(req.baseUrl + '/');
	        });
	})

        router.use(proxy(prefix, {
            target: 'http://127.0.0.1:10082',
            pathRewrite: {
                ['^' + prefix]: ''
            },
        }));
    }

    return router;
}
