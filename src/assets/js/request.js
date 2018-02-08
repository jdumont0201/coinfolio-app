console.log("SW Startup!");

// Install Service Worker
self.addEventListener('install', function(event){
    console.log('SW installed!');
});

// Service Worker Active
self.addEventListener('activate', function(event){
    console.log('SW activated!');
});
self.addEventListener('message', function(event){
    console.log("SW Received Message: " + event.data);
});


onmessage = function(e) {
    console.log('sw Message received from main script');
    var workerResult = 'sw Result: ' + e;
    console.log('sw Posting message back to main script');
    postMessage(workerResult);
}