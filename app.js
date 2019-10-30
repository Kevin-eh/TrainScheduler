// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDOZvAplGAWUiCHJRg71XzgTinrWt1sFts",
  authDomain: "train-scheduler-deluxe.firebaseapp.com",
  databaseURL: "https://train-scheduler-deluxe.firebaseio.com",
  projectId: "train-scheduler-deluxe",
  storageBucket: "train-scheduler-deluxe.appspot.com",
  messagingSenderId: "234516005649",
  appId: "1:234516005649:web:275437a874645bb61082b0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submit-button").on("click", function(event) {
  event.preventDefault();
  var name = $("#name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var freq = $("#freq-input")
    .val()
    .trim();

  var firsttext = $("#first-input")
    .val()
    .trim();
  var firstkey = moment(firsttext, "HHmm");
  var first = firstkey.format("HH:mm");
  console.log(first);

  var firstminyear = moment(firsttext, "HH;mm").subtract(1, "years");
  var difftime = moment().diff(moment(firstminyear), "minutes");
  var tRemainder = difftime % freq;
  var minutestill = freq - tRemainder;
  console.log(tRemainder);
  console.log(moment());

  var nexttrain = moment().add(minutestill, "minutes");
  var next = moment(nexttrain).format("HH:mm");

  database.ref().push({
    name: name,
    destination: destination,
    freq: freq,
    first: first,
    minutestill: minutestill,
    next: next
  });
});

database
  .ref()
  .orderByChild("dateAdded")
  .on("child_added", function(response) {
    console.log(response.val().name);
    console.log(response.val().destination);
    console.log(response.val().freq);
    console.log(response.val().first);
    console.log(response.val().minutestill);
    console.log(response.val().next);
    console.log("————————————————————");

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#freq-input").val("");
    $("#first-input").val("");

    var tr = $("<tr>");

    $("tbody").append(tr);

    $(tr).append("<td>" + response.val().name + "</td>");
    $(tr).append("<td>" + response.val().destination + "</td>");
    $(tr).append("<td>" + response.val().freq + "</td>");
    $(tr).append("<td>" + response.val().first + "</td>");
    $(tr).append("<td>" + response.val().minutestill + "</td>");
    $(tr).append("<td>" + response.val().next + "</td>");
  });
