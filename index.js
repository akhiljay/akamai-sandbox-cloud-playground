
const spawn = require('child_process').spawn;
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var psTree = require('ps-tree');
const fs = require('fs');

//initial setup
const app = express();
var ls = null;
app.use('/static', express.static(__dirname + '/public'));

//app.use(express.static('public'));
var domaininput = null;
// create application/json parser
var jsonParser = bodyParser.json()

//app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

//render the index page
app.get('/', function (req, res) {
  res.render('index', {finaldata: null, error: null});
})

//start the sandbox
app.post('/start', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    req.on('data', function (data) {
        body += data;
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });
   
    domaininput = req.body;
    console.log(domaininput.domain);
    startSandbox(domaininput.domain);
    res.json("started sandbox");
  })


app.get('/stop', function (req, res) {
    stopSandbox();
    res.json("stopped sandbox");
  })


  app.listen(3000, function () {
    console.log('Playground listening on port 3000!')
  })

//edit config.json file to add a new origin provided by the customer




//save config.json before starting the sandbox 


//function to kill the process and the subsequent process it has started
var kill = function (pid, signal, callback) {
    signal   = signal || 'SIGKILL';
    callback = callback || function () {};
    var killTree = true;
    if(killTree) {
        psTree(pid, function (err, children) {
            [pid].concat(
                children.map(function (p) {
                    return p.PID;
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) { }
            });
            console.log("all processes stopped");
            callback();
        });
    } else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        console.log("all processes stopped 1");
        callback();
    }
};


//start the sandbox 
var startSandbox = function(domainobj){
    console.log(domainobj);
    let rawdata = fs.readFileSync('/home/akhil/.akamai-cli/cache/sandbox-cli/sandboxes/2ndattempt-digital-ocean/config.json');  
    let student = JSON.parse(rawdata);  
    console.log(student);  
    //console.log(student.originMappings);
    let origins = student.originMappings;
    //console.log(origins[0].to);
    let updatedorigin = '{"host":"'+ domainobj +'","port":443,"secure":true,"hostHeader":"'+domainobj+'"}';
    let updatedoriginjson = JSON.parse(updatedorigin);
    origins[0].to = updatedoriginjson;
    //console.log(origins); 
    student.originMappings = origins;
    console.log(student);
    console.log(student.originMappings);
    let data = JSON.stringify(student); 
    console.log(data)
    fs.writeFileSync('/home/akhil/.akamai-cli/cache/sandbox-cli/sandboxes/2ndattempt-digital-ocean/config.json', data); 

    ls = spawn('akamai', ['sandbox', 'start']);
    console.log('Spawned child pid: ' + ls.pid);
    processid = ls.pid;

    ls.stdout.on("data", function(data) {
        console.log(data.toString());
    });
    
    ls.stderr.on("data", function(data) {
        console.log(data.toString());
    });
} 

var stopSandbox = function(){
//ending the sandbox 
console.log(ls.pid);
kill(ls.pid);

}


