const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const filePath = req.url === '/' ? './index.html' : `.${req.url}`;
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        default:
            contentType = 'text/html';
    }

    try {
        const content = fs.readFileSync(filePath);
        res.setHeader('Content-Type', contentType);
        res.status(200).send(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            res.status(404).send('<h1>404 Not Found</h1>');
        } else {
            res.status(500).send(`Server Error: ${err.code}`);
        }
    }
};
