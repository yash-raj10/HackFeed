const firebaseConfig = {
  apiKey: "AIzaSyBFJisG0XmYBL-MnxMaVSeB1sFpa3d6-HA",
  authDomain: "hackfeed-41f24.firebaseapp.com",
  databaseURL: "https://hackfeed-41f24-default-rtdb.firebaseio.com",
  projectId: "hackfeed-41f24",
  storageBucket: "hackfeed-41f24.appspot.com",
  messagingSenderId: "929832595246",
  appId: "1:929832595246:web:b927c5850687e82eeb14bf",
};

firebase.initializeApp(firebaseConfig);
let contactFormDB = firebase.database();

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var data = {
    projectName: document.getElementById("projectName").value,
    techStackUsed: document.getElementById("techStackUsed").value,
    projectDes: document.getElementById("projectDes").value,
    leaderName: document.getElementById("leaderName").value,
  };
  console.log(data);
  let ref = contactFormDB.ref("contactForm");
  ref.push(data);

  document.querySelector(".alert").style.display = "block";

  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 6500);

  document.getElementById("contactForm").reset();
}

function setup() {
  let ref = contactFormDB.ref("contactForm");
  ref.on("value", getData, errData);
}

setup();

function getData(data) {
  var contactForm = data.val();
  var keys = Object.keys(contactForm);
  console.log(keys);
  var formData = "";
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let projectName = contactForm[k].projectName;
    let techStackUsed = contactForm[k].techStackUsed;
    let projectDes = contactForm[k].projectDes;
    let leaderName = contactForm[k].leaderName;
    formData += `<div class="shadow-lg rounded-lg">
    <div
      class="bg-white h-full p-8 border-4 border-blue-500 rounded-lg flex items-center justify-center sm:mx-2 sm:p-3 md:p-8"
    >
      <div class="flex flex-col items-center  ml-6">
            <div class="mt-4 text-2xl font-bold">${projectName}</div>
            <div class="text-center mt-2 text-gray-600 text-sm">
              ${projectDes}
            </div>
            <p class="text-center mt-2 text-gray-600 text-sm">Tech Stack:- <span class="font-bold"> ${techStackUsed} </span></p>
            <p class="text-center mt-2 text-gray-600 text-sm">Contact (Twitter):- <a href="https://twitter.com/${leaderName}" class="underline font-bold">${leaderName}</a> </p>
      </div>
    </div>
  </div>
    `;
    document.querySelector("#root").innerHTML = formData;
  }
}

function errData(err) {
  console.log("Error!");
  console.log(err);
}
