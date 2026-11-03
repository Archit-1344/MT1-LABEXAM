import http from 'http';
import fs from 'fs';

let tasks = [
    { id: 1, employee: "Rahul", task: "Complete project" },
    { id: 2, employee: "Amit", task: "Prepare report" }
];

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        fs.readFile('./public/index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading page");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }

    else if (req.url === '/tasks') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
    }

    else {
        res.writeHead(404);
        res.end("Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});