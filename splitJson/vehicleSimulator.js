'use strict';

const fs = require('fs');
const loadJsonFile = require('load-json-file');
const fetch = require('node-fetch')

let locationFile = process.argv[2]
console.log('file: ' + locationFile)
let macArg = process.argv[3]
console.log('mac address: ' + macArg)
let randLessThan300 = getRandomInt(1, 300);
console.log('starting value: ' + randLessThan300)
let d = Math.random();
// const file = '~/google_drive/programming/codeworks/streetfleet/streetfleet-webclient/dummyTripData/dummyTripData4.json'


const readTheFile = async (fileParam, macParam) => {
  let locData;
  await fs.readFile(fileParam, 'utf8',  (err, data) => {
    try {
      data = JSON.parse(data)

    } catch (e) {
      // Catch error in case file doesn't exist or isn't valid JSON
    }
    if (data && data.msgs) db.msgs = data.msgs; // what is this?

    // console.log('this is data from fs.readfile (data):  ', data);
    // start the loop at different element each time.
    data.locations.slice(randLessThan300).forEach( ping => {
      postCoordinates(ping)
      wait(15); // wait 15 seconds

      // Randomly 20% of the time, we will repeatedly send the last coordinates every 15 seconds. We can let 3 minutes represent a 15 minute stop (ie we can define in the backend logic that a stop of greater than 3 mins counts as a 'stop'). This is just in the interest of time while testing.
      if (d < 0.2) {
        let timeRemaining = getRandNumOfMins(15,17);
        console.log('Just went into the fake stop loop');
        while (timeRemaining > 0) {
          postCoordinates(ping) // post to DB
          wait(15); // wait 15 mins
          timeRemaining -= 15*60000;
        }
      }
    });
  });
}

function postCoordinates (pingObj) {
    const postBody = 'test body' + Date.now();
    // const postBody = JSON.stringify({
    //   "time":Date.now(),
    //   "latitude": pingObj.latitudeE7*e-7,
    //   "longitude": pingObj.longitudeE7*e-7,
    //   "mac_address": macArg
    // })
   fetch('https://streetfleet-mainserver.herokuapp.com/api/v1/vehicle/location',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: postBody
    })
    .catch(e => {
      console.log(e);
    })
    console.log('just posted this ping! \n', pingObj)
};

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandNumOfMins (min, max) {
  return getRandomInt(min*60000, max*60000);
}

function wait (seconds) {
  var d = new Date();
  var d2 = null;
  do { d2 = new Date(); }
  while(d2-d < seconds*1000);
}

// const arePingsCloseTogether = (p0, p1) => {
//     return ping.activity && previousPing.activity && ping.activity[0].timeStampMs - previousPing.activity && previousPing.activity[0].timeStampMs -
// };

// call it!
readTheFile(locationFile, macArg);
