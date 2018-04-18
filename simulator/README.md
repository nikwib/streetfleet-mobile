### Simulator script

This command line script simulates a car driving around. It is to to be used for sending requests to the server just as a physical car would. It sends post requests every 15 seconds. Whichever data file is passed to it, the script will sending locations from a random post, each time the script is run. The script will send the same location for 15-16 minutes—30% of the time (ie it 'stops' 30% of the time). Finally you must pass the mac address to be used when running script.

### Usage:

`npm i`

`node vehiclesimulator.js dummyTripDataX.json '34-df-52-gw-98'`

