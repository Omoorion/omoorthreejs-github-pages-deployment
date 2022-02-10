<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js"></script>

<!-- include firebase database -->
<script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-database.js"></script>

<script>
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAPDWr-QB9QU0H_rF6kRCGKCD-yy1lgDhU",
    authDomain: "threejs-proj.firebaseapp.com",
    projectId: "threejs-proj",
    storageBucket: "threejs-proj.appspot.com",
    messagingSenderId: "490765748804",
    appId: "1:490765748804:web:bdcd5631c5a56a7b0fca11"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>

<script>
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAPDWr-QB9QU0H_rF6kRCGKCD-yy1lgDhU",
    authDomain: "threejs-proj.firebaseapp.com",
    projectId: "threejs-proj",
    storageBucket: "threejs-proj.appspot.com",
    messagingSenderId: "490765748804",
    appId: "1:490765748804:web:bdcd5631c5a56a7b0fca11"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var myName = prompt("Enter your name");
</script>

<!-- create a form to send message -->
<form onsubmit="return sendMessage();">
  <input id="message" placeholder="Enter message" autocomplete="off">

  <input type="submit">
</form>

<script>
  function sendMessage() {
    // get message
    var message = document.getElementById("message").value;

    // save in database
    firebase.database().ref("messages").push().set({
      "sender": myName,
      "message": message
    });

    // prevent form from submitting
    return false;
  }

  function deleteMessage(self) {
    // get message ID
    var messageId = self.getAttribute("data-id");

    // delete message
    firebase.database().ref("messages").child(messageId).remove();
  }

  // attach listener for delete message
  firebase.database().ref("messages").on("child_removed", function(snapshot) {
    // remove message node
    document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
  });
</script>

<!-- create a list -->
<ul id="messages"></ul>

<script>
  // listen for incoming messages
  firebase.database().ref("messages").on("child_added", function(snapshot) {
    var html = "";
    // give each message a unique ID
    html += "<li id='message-" + snapshot.key + "'>";
    // show delete button if message is sent by me
    if (snapshot.val().sender == myName) {
      html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
      html += "Delete";
      html += "</button>";
    }
    html += snapshot.val().sender + ": " + snapshot.val().message;
    html += "</li>";

    document.getElementById("messages").innerHTML += html;
  });
</script>