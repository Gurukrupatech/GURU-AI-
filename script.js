"use strict";

/* =========================================
   SWITY AI • VOICE ENGINE
========================================= */

const messages = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const micBtn = document.getElementById("micBtn");
const voiceBtn = document.getElementById("voiceBtn");

const voiceStatus = document.getElementById("voiceStatus");
const voiceDot = document.getElementById("voiceDot");

const voiceSelect = document.getElementById("voiceSelect");
const voiceRate = document.getElementById("voiceRate");
const voicePitch = document.getElementById("voicePitch");

const settingsBtn = document.getElementById("settingsBtn");
const settingsChatBtn = document.getElementById("settingsChatBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");

let voices = [];
let voiceEnabled = true;


/* =========================================
   LOAD VOICES
========================================= */

function loadVoices() {

    if (!("speechSynthesis" in window)) {
        console.log("Speech synthesis not supported");
        return;
    }

    voices = speechSynthesis.getVoices();

    if (!voiceSelect) return;

    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {

        const option = document.createElement("option");

        option.value = index;

        option.textContent =
            `${voice.name} — ${voice.lang}`;

        voiceSelect.appendChild(option);

    });

    selectBestVoice();
}


/* =========================================
   BEST INDIAN VOICE
========================================= */

function selectBestVoice() {

    if (!voices.length || !voiceSelect) return;

    let index = voices.findIndex(v =>
        v.lang.toLowerCase() === "mr-in"
    );

    if (index === -1) {

        index = voices.findIndex(v =>
            v.lang.toLowerCase() === "hi-in"
        );

    }

    if (index === -1) {

        index = voices.findIndex(v =>
            v.lang.toLowerCase() === "en-in"
        );

    }

    if (index === -1) {

        index = voices.findIndex(v =>
            v.lang.toLowerCase().startsWith("en")
        );

    }

    if (index >= 0) {
        voiceSelect.value = index;
    }

}


/* =========================================
   BROWSER VOICES READY
========================================= */

if ("speechSynthesis" in window) {

    speechSynthesis.onvoiceschanged = loadVoices;

    setTimeout(loadVoices, 500);

}


/* =========================================
   SWITY SPEAK
========================================= */

function speak(text) {

    if (!voiceEnabled) return;

    if (!("speechSynthesis" in window)) {

        alert(
            "तुमच्या browser मध्ये Voice Support उपलब्ध नाही."
        );

        return;
    }

    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);


    /* Selected voice */

    if (
        voiceSelect &&
        voices.length
    ) {

        const selected =
            voices[
                Number(voiceSelect.value)
            ];

        if (selected) {

            speech.voice = selected;
            speech.lang = selected.lang;

        }

    }


    /* Default settings */

    speech.rate =
        Number(voiceRate?.value) || 0.9;

    speech.pitch =
        Number(voicePitch?.value) || 1.2;

    speech.volume = 1;


    /* Marathi fallback */

    if (!speech.lang) {
        speech.lang = "mr-IN";
    }


    speech.onstart = () => {

        document.body.classList.add(
            "swity-speaking"
        );

    };


    speech.onend = () => {

        document.body.classList.remove(
            "swity-speaking"
        );

    };


    speech.onerror = error => {

        console.log(
            "SWITY VOICE ERROR:",
            error
        );

    };


    speechSynthesis.speak(speech);

}


/* =========================================
   VOICE BUTTON
========================================= */

function toggleVoice() {

    voiceEnabled = !voiceEnabled;

    if (!voiceEnabled) {

        speechSynthesis.cancel();

        voiceBtn.textContent =
            "🔇 VOICE OFF";

        voiceStatus.textContent =
            "OFF";

        if (voiceDot) {
            voiceDot.style.opacity = "0.35";
        }

    } else {

        voiceBtn.textContent =
            "🔊 VOICE ON";

        voiceStatus.textContent =
            "ON";

        if (voiceDot) {
            voiceDot.style.opacity = "1";
        }

        /*
           Mobile browser ला user interaction
           मिळाल्यावर voice test
        */

        setTimeout(() => {

            speak(
                "Hello Boss! मी Swity आहे. मी तुमची मदत करण्यासाठी तयार आहे."
            );

        }, 150);

    }

}


voiceBtn?.addEventListener(
    "click",
    toggleVoice
);


/* =========================================
   ADD MESSAGE
========================================= */

function addMessage(text, type = "ai") {

    const message =
        document.createElement("div");

    message.className =
        type === "user"
            ? "message user-message"
            : "message ai-message";

    message.textContent = text;

    messages.appendChild(message);

    messages.scrollTop =
        messages.scrollHeight;

}


/* =========================================
   SWITY RESPONSE
========================================= */

function getReply(question) {

    const q =
        question.toLowerCase();


    if (
        q.includes("hello") ||
        q.includes("hi") ||
        q.includes("hey")
    ) {

        return (
            "Hello Boss! मी Swity AI आहे. " +
            "आज मी तुमची कशी मदत करू शकते?"
        );

    }


    if (
        q.includes("मराठी") ||
        q.includes("marathi")
    ) {

        return (
            "हो Boss! मी तुमच्याशी मराठीत " +
            "बोलू शकते. ❤️"
        );

    }


    if (
        q.includes("trading") ||
        q.includes("trade") ||
        q.includes("nifty") ||
        q.includes("banknifty")
    ) {

        return (
            "नक्की Boss! Trading मध्ये मी " +
            "Price Action, Market Structure, " +
            "SMC, Risk Management आणि Options " +
            "समजावून सांगू शकते."
        );

    }


    if (
        q.includes("coding") ||
        q.includes("html") ||
        q.includes("css") ||
        q.includes("javascript") ||
        q.includes("website")
    ) {

        return (
            "नक्की Boss! मी HTML, CSS आणि " +
            "JavaScript मध्ये website तयार करण्यासाठी " +
            "तुमची step by step मदत करू शकते."
        );

    }


    return (
        "Boss, तुमचा प्रश्न समजला. 🤖 " +
        "मी त्यावर तुमची मदत करण्यासाठी तयार आहे."
    );

}


/* =========================================
   SEND
========================================= */

function sendMessage() {

    const text =
        userInput.value.trim();

    if (!text) return;


    addMessage(
        text,
        "user"
    );


    userInput.value = "";


    setTimeout(() => {

        const reply =
            getReply(text);

        addMessage(
            reply,
            "ai"
        );

        /* ⭐ SWITY बोलेल */

        speak(reply);

    }, 350);

}


sendBtn?.addEventListener(
    "click",
    sendMessage
);


/* =========================================
   ENTER TO SEND
========================================= */

userInput?.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =========================================
   MICROPHONE
========================================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;


if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "mr-IN";


    recognition.onstart = () => {

        micBtn.textContent =
            "🔴 LISTENING...";

    };


    recognition.onresult = event => {

        const result =
            event.results[0][0].transcript;

        userInput.value =
            result;

    };


    recognition.onend = () => {

        micBtn.textContent =
            "🎙 MIC";

    };


    recognition.onerror = () => {

        micBtn.textContent =
            "🎙 MIC";

    };

}


micBtn?.addEventListener(
    "click",
    () => {

        if (!recognition) {

            alert(
                "तुमच्या browser मध्ये microphone recognition उपलब्ध नाही."
            );

            return;

        }

        try {

            recognition.start();

        } catch (error) {

            console.log(error);

        }

    }
);


/* =========================================
   SETTINGS
========================================= */

function openSettings() {

    settingsModal?.classList.add(
        "active"
    );

}


function closeSettingsBox() {

    settingsModal?.classList.remove(
        "active"
    );

}


settingsBtn?.addEventListener(
    "click",
    openSettings
);

settingsChatBtn?.addEventListener(
    "click",
    openSettings
);

closeSettings?.addEventListener(
    "click",
    closeSettingsBox
);


/* =========================================
   TEST VOICE FROM SETTINGS
========================================= */

voiceSelect?.addEventListener(
    "change",
    () => {

        speak(
            "Hello Boss! हा Swity चा voice test आहे."
        );

    }
);


/* =========================================
   INITIALIZE
========================================= */

loadVoices();


console.log(
    "SWITY AI READY • CREATED BY SHIV SONUNE"
);
