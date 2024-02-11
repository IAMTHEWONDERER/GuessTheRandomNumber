const http = require('http');
const fs = require('fs');
const url = require('url')
const path = require('path');
const { log } = require('console');
const { json } = require('stream/consumers');


let userNum;
let n = 10; 
let attempt = 3;
let score = 0;
let highScore = 0;
let randomNumber = Math.floor(Math.random() * n) + 1;
const port = 3000;




   const server = http.createServer((req , res ) => {

    console.log('Here is the URL :' ,req.url);
    console.log('Here is the METHODE :' ,req.method);



    // const parsedUrl = url.parse(req.url, true);
    if (req.method === 'GET') {
        if (req.url === '/' || req.url === '/guesser.html') {
            const filePath = path.join(__dirname, 'guesser.html');
            console.log('FILEPATH', filePath);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        }
         else if (req.url === '/guesser.css') {
            const filePath = path.join(__dirname, 'guesser.css');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                }
            });
        }
    }else if (req.method === 'POST'){
        if (req.url === '/playerData'){
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end' , () => {
                console.log('received players data ', body)
                // res.end('received');
           const { name, pass , highScore } = JSON.parse(body);
           const jsonFilePath = path.join(__dirname, 'players.json');
           fs.readFile(jsonFilePath , (err , data) =>{
            if (err){
                console.error('Error reading file:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }else{
                try{
                    const playersList = JSON.parse(data);
                    const newPlayer = {name , pass , highScore};
                    playerCheck = playersList.filter(player => player.name == newPlayer.name && player.pass == newPlayer.pass )
                    if (playerCheck.length == 0 ){
                     res.writeHead(200, { 'Content-Type': 'application/json' });
                     console.log('player adde ' ,newPlayer);
                     res.end(JSON.stringify(newPlayer));
                    playersList.push(newPlayer);
                   
                    const playersListJson = JSON.stringify(playersList);
                    fs.writeFile(jsonFilePath , playersListJson , (err) => {
                        if (err) {
                            console.error('Error writing file:', err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Internal Server Error');
                        }else {
                            console.log('player added successfully!');
                          
                        }
                    })
                }else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    console.log('player exist' , playerCheck);
                    res.end(JSON.stringify(playerCheck[0]))
                }
                    

                }catch(error){
                    console.error('Error parsing JSON:', error);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error parsing JSON');

                }
            }
           } )

            })
            
        }
    }
})




server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});