const boxes = document.querySelector(".boxes-container");
const togglebtn = document.querySelector(".toggle-btn");
const textbox = document.querySelector(".text-box");
const select = document.getElementById("select");
const closebtn = document.querySelector(".close-btn");
const readbtn = document.querySelector(".read-btn");
const textarea = document.getElementById("textarea");

// store voices
let voices = [];

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

// create speech boxes

data.forEach((item) => {
  const { image, text } = item;

  const box = document.createElement("div");

  box.classList.add("boxdiv");

  box.innerHTML = `
  <img src="${image}">
  <p class="info">${text}</p>

    `;

  box.addEventListener("click", () => {
    setmessage(text);
    speaktext();

    // add active effect
    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 400);
    6;
  });

  boxes.appendChild(box);
});

// init speech synth
const message = new SpeechSynthesisUtterance();

function getvoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerHTML = `${voice.name} ${voice.lang}`;

    select.appendChild(option);
  });
}
getvoices();

//setting the message text
function setmessage(text) {
  message.text = text;
}

// speaking text
function speaktext() {
  speechSynthesis.speak(message);
}

// set voice
function setvoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// voices changed
speechSynthesis.addEventListener("voiceschanged", getvoices);

// change voice
select.addEventListener("change", setvoice);

// read button event listener
readbtn.addEventListener("click", () => {
  // set message to textarea value
  setmessage(textarea.value);
  // speak the text
  speaktext();
});

// toggle text box
togglebtn.addEventListener("click", () => {
  textbox.classList.toggle("active");
});

// close textbox
closebtn.addEventListener("click", () => {
  textbox.classList.remove("active");
});

// default voice
message.voice = voices.find((voice) => voice.name === select.value);
