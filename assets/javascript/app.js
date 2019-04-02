var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = "";
var nextArrival = "";
var minutesAway = "";


var nameTrain = $("#train-name");
var destinationTrain = $("#train-destination");
var timeTrain = $("#train-time").mask("00:00");
var frequencyTrain = $("#time-freq").mask("00");



 var config = {
    apiKey: "AIzaSyCV7zZioCE4Ym1ZmuM9moBxwQFSmV9L47M",
    authDomain: "train-schedule-41ec4.firebaseapp.com",
    databaseURL: "https://train-schedule-41ec4.firebaseio.com",
    projectId: "train-schedule-41ec4",
    storageBucket: "train-schedule-41ec4.appspot.com",
    messagingSenderId: "558718394290"
  };
  firebase.initializeApp(config);

var database = firebase.database();

database.ref("/trains").on("child_added", function(snapshot) {

    var trainDiff = 0;
    var trainRemainder = 0;
    var minutesTillArrival = "";
    var nextTrainTime = "";
    var frequency = snapshot.val().frequency;

    trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");

    trainRemainder = trainDiff % frequency;

    minutesTillArrival = frequency - trainRemainder;

    nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");

    $("#table-data").append(
        "<tr><td>" + snapshot.val().name + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + frequency + "</td>" +
        "<td>" + minutesTillArrival + "</td>" +
        "<td>" + nextTrainTime + "  " + "<a><span class='glyphicon glyphicon-remove icon-hidden' aria-hidden='true'></span></a>" + "</td></tr>"
    );

    $("span").hide();

    

    

var storeInputs = function(event) {

    event.preventDefault();


    trainName = nameTrain.val().trim();
    trainDestination = destinationTrain.val().trim();
    trainTime = moment(timeTrain.val().trim(), "HH:mm").subtract(1, "years").format("X");
    trainFrequency = frequencyTrain.val().trim();

 
    database.ref("/trains").push({
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
        date_added: firebase.database.ServerValue.TIMESTAMP
    });


    alert("Train successuflly added!");

    nameTrain.val("");
    destinationTrain.val("");
    timeTrain.val("");
    frequencyTrain.val("");
};

$("#btn-add").on("click", function(event) {
    if (nameTrain.val().length === 0 || destinationTrain.val().length === 0 || timeTrain.val().length === 0 || frequencyTrain === 0) {
        alert("Please Fill All Required Fields");
    } else {
        storeInputs(event);
    }
});

$('form').on("keypress", function(event) {
    if (event.which === 13) {
        if (nameTrain.val().length === 0 || destinationTrain.val().length === 0 || timeTrain.val().length === 0 || frequencyTrain === 0) {
            alert("Please Fill All Required Fields");
        } else {
            storeInputs(event);
        }
    }
});