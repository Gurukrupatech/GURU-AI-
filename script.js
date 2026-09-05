"use strict";

/* =========================================================
   GURU AI • SWITY
   CREATED BY SHIV SONUNE
========================================================= */

const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

const micBtn = document.getElementById("micBtn");
const voiceBtn = document.getElementById("voiceBtn");

const settingsBtn = document.getElementById("settingsBtn");
const settingsChatBtn = document.getElementById("settingsChatBtn");

const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");

const voiceSelect = document.getElementById("voiceSelect");
const voiceRate = document.getElementById("voiceRate");
const voicePitch = document.getElementById("voicePitch");
const apiEndpoint = document.getElementById("apiEndpoint");

const voiceStatus = document.getElementById("voiceStatus");
const voiceDot = document.getElementById("voiceDot");

const menuBtn = document.getElementById("menuBtn");


/* =========================================================
   CONFIG
========================================================= */

const SWITY = {

    voiceEnabled:
        localStorage.getItem("swityVoiceEnabled") !== "false",

    rate:
        Number(localStorage.getItem("swityRate")) || 0.95,

    pitch:
        Number(localStorage.getItem("swityPitch")) || 1.15,

    endpoint:
        localStorage.getItem("swityEndpoint") || ""

};


/* =========================================================
   GREETING
========================================================= */

const greetingHindi =
"Hello! Main Swity hoon. Aaj main aapki kya sahayata kar sakti hoon?";

const greetingEnglish =
"Hello Boss! I'm Swity AI by GurukrupaTech. Your intelligent AI companion for Trading, Coding, Technology, Learning, Creativity, and Smart Solutions. How may I assist you today?";

const greetingMarathi =
"नमस्कार Boss! मी Swity आहे. आज मी तुमची कशी मदत करू शकते?";


/* =========================================================
   MESSAGE
========================================================= */

function addMessage(text, type) {

    const div = document.createElement("div");

    div.className =
        type === "user"
            ? "message user-message"
            : "message ai-message";

    div.textContent = text;

    messages.appendChild(div);

    messages.scrollTop =
        messages.scrollHeight;

}


/* =========================================================
   TYPING
========================================================= */

function showTyping() {

    const div = document.createElement("div");

    div.className =
        "message ai-message typing";

    div.textContent =
        "Swity is typing...";

    messages.appendChild(div);

    messages.scrollTop =
        messages.scrollHeight;

    return div;

}


/* =========================================================
   VOICE SYSTEM
========================================================= */

let voices = [];


function loadVoices() {

    if (!("speechSynthesis" in window)) {

        console.log(
            "Speech Synthesis not supported."
        );

        return;

    }

    voices =
        window.speechSynthesis
        .getVoices();


    if (!voiceSelect) return;


    voiceSelect.innerHTML = "";


    if (voices.length === 0) {

        const option =
            document.createElement("option");

        option.textContent =
            "Default Voice";

        option.value = "";

        voiceSelect.appendChild(option);

        return;

    }


    voices.forEach(
        (voice, index) => {

            const option =
                document.createElement("option");

            option.value =
                index;

            option.textContent =
                voice.name +
                " • " +
                voice.lang;

            voiceSelect.appendChild(option);

        }
    );


    chooseBestVoice();

}


if ("speechSynthesis" in window) {

    window.speechSynthesis
        .onvoiceschanged =
        loadVoices;

}


function chooseBestVoice() {

    if (!voices.length) return;


    let index = -1;


    /* Marathi first */

    index =
        voices.findIndex(
            v =>
                /^mr-IN$/i.test(v.lang)
        );


    /* Hindi */

    if (index < 0) {

        index =
            voices.findIndex(
                v =>
                    /^hi-IN$/i.test(v.lang)
            );

    }


    /* Indian English */

    if (index < 0) {

        index =
            voices.findIndex(
                v =>
                    /^en-IN$/i.test(v.lang)
            );

    }


    /* Any English */

    if (index < 0) {

        index =
            voices.findIndex(
                v =>
                    /^en/i.test(v.lang)
            );

    }


    if (index < 0) {

        index = 0;

    }


    voiceSelect.value =
        String(index);

}


/* =========================================================
   SPEAK
========================================================= */

function speak(text) {

    if (!SWITY.voiceEnabled) {

        return;

    }


    if (!("speechSynthesis" in window)) {

        alert(
            "तुमच्या browser मध्ये Text-to-Speech उपलब्ध नाही."
        );

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            text
        );


    const index =
        Number(
            voiceSelect?.value
        );


    if (
        voices[index]
    ) {

        speech.voice =
            voices[index];

    }


    speech.rate =
        SWITY.rate;

    speech.pitch =
        SWITY.pitch;

    speech.volume =
        1;


    /* Language */

    if (
        speech.voice &&
        speech.voice.lang
    ) {

        speech.lang =
            speech.voice.lang;

    }
    else {

        speech.lang =
            "hi-IN";

    }


    window.speechSynthesis
        .speak(speech);

}


/* =========================================================
   VOICE ON / OFF
========================================================= */

function updateVoiceUI() {

    if (voiceStatus) {

        voiceStatus.textContent =
            SWITY.voiceEnabled
                ? "ON"
                : "OFF";

    }


    if (voiceDot) {

        voiceDot.style.opacity =
            SWITY.voiceEnabled
                ? "1"
                : "0.35";

    }


    if (voiceBtn) {

        voiceBtn.textContent =
            SWITY.voiceEnabled
                ? "🔊 VOICE ON"
                : "🔇 VOICE OFF";

    }

}


function toggleVoice() {

    SWITY.voiceEnabled =
        !SWITY.voiceEnabled;


    localStorage.setItem(
        "swityVoiceEnabled",
        SWITY.voiceEnabled
    );


    if (!SWITY.voiceEnabled) {

        window.speechSynthesis?.cancel();

    }


    updateVoiceUI();


    /* Voice ON झाल्यावर छोटा test */

    if (SWITY.voiceEnabled) {

        setTimeout(
            () => {

                speak(
                    "Hello Boss! Swity is ready."
                );

            },
            150
        );

    }

}


voiceBtn?.addEventListener(
    "click",
    toggleVoice
);


/* =========================================================
   SEND MESSAGE
========================================================= */

async function sendMessage() {

    const text =
        userInput.value.trim();


    if (!text) {

        return;

    }


    addMessage(
        text,
        "user"
    );


    userInput.value = "";


    const typing =
        showTyping();


    /* =====================================================
       BACKEND AVAILABLE
    ===================================================== */

    if (SWITY.endpoint) {

        try {

            const response =
                await fetch(
                    SWITY.endpoint,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                message: text,
                                assistant: "SWITY",
                                brand:
                                    "GURUKRUPATECH"
                            })
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Backend Error"
                );

            }


            const data =
                await response.json();


            typing.remove();


            const reply =
                data.reply ||
                data.response ||
                data.message ||
                "Sorry Boss, मला response मिळाला नाही.";


            addMessage(
                reply,
                "ai"
            );


            speak(reply);

            return;

        }
        catch (error) {

            console.error(error);

        }

    }


    /* =====================================================
       LOCAL SWITY
    ===================================================== */

    setTimeout(
        () => {

            typing.remove();


            const reply =
                getLocalReply(text);


            addMessage(
                reply,
                "ai"
            );


            speak(reply);

        },
        500
    );

}


/* =========================================================
   LOCAL RESPONSE ENGINE
========================================================= */

function getLocalReply(text) {

    const q =
        text.toLowerCase();


    if (
        q.includes("hello") ||
        q.includes("hi") ||
        q.includes("hey") ||
        q.includes("नमस्कार") ||
        q.includes("हॅलो")
    ) {

        return greetingMarathi;

    }


    if (
        q.includes("who are you") ||
        q.includes("तू कोण") ||
        q.includes("swity")
    ) {

        return (
            "मी Swity AI आहे — GurukrupaTech ची " +
            "intelligent AI assistant. मला Shiv Sonune " +
            "यांनी तयार केले आहे. 🤖"
        );

    }


    if (
        q.includes("trading") ||
        q.includes("trade") ||
        q.includes("nifty") ||
        q.includes("banknifty") ||
        q.includes("stock")
    ) {

        return (
            "नक्की Boss! 📈 मी Trading मध्ये " +
            "Market Structure, Support & Resistance, " +
            "Price Action, SMC, Risk Management, " +
            "Options आणि Trading Psychology समजावून सांगू शकते."
        );

    }


    if (
        q.includes("html") ||
        q.includes("css") ||
        q.includes("javascript") ||
        q.includes("coding") ||
        q.includes("website")
    ) {

        return (
            "नक्की Boss! 💻 HTML, CSS आणि JavaScript " +
            "मध्ये मी तुम्हाला website तयार करण्यात मदत करू शकते."
        );

    }


    if (
        q.includes("marathi") ||
        q.includes("मराठी") ||
        q.includes("मराठीत")
    ) {

        return (
            "हो Boss! ❤️ मी मराठीत text आणि voice " +
            "दोन्हीमध्ये तुमच्याशी बोलू शकते."
        );

    }


    if (
        q.includes("hindi") ||
        q.includes("हिंदी")
    ) {

        return (
            "Bilkul Boss! ❤️ Main Hindi mein bhi " +
            "aapse baat kar sakti hoon."
        );

    }


    if (
        q.includes("help") ||
        q.includes("मदत")
    ) {

        return (
            "Boss, मी Trading, Coding, Technology, " +
            "Learning, Creativity आणि Smart Solutions " +
            "मध्ये तुमची मदत करू शकते. 🚀"
        );

    }


    return (
        "Boss, तुमचा प्रश्न समजला. 🤖 " +
        "मी त्यावर मदत करण्यासाठी तयार आहे."
    );

}


/* =========================================================
   ENTER = SEND
========================================================= */

userInput?.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =========================================================
   SEND BUTTON
========================================================= */

sendBtn?.addEventListener(
    "click",
    sendMessage
);


/* =========================================================
   MICROPHONE
========================================================= */

let recognition = null;


const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;

    recognition.interimResults =
        false;

    recognition.lang =
        "mr-IN";


    recognition.onstart =
        function() {

            micBtn.textContent =
                "🔴 LISTENING...";

        };


    recognition.onresult =
        function(event) {

            const result =
                event.results[0][0]
                .transcript;

            userInput.value =
                result;

        };


    recognition.onerror =
        function() {

            micBtn.textContent =
                "🎙 MIC";

        };


    recognition.onend =
        function() {

            micBtn.textContent =
                "🎙 MIC";

        };

}


micBtn?.addEventListener(
    "click",
    function() {

        if (!recognition) {

            alert(
                "Boss, तुमच्या browser मध्ये microphone speech recognition उपलब्ध नाही."
            );

            return;

        }


        try {

            recognition.lang =
                "mr-IN";

            recognition.start();

        }
        catch(error) {

            console.log(error);

        }

    }
);


/* =========================================================
   SETTINGS
========================================================= */

function openSettings() {

    settingsModal?.classList.add(
        "active"
    );

}


function closeSettingsModal() {

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
    closeSettingsModal
);


settingsModal?.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            settingsModal
        ) {

            closeSettingsModal();

        }

    }
);


/* =========================================================
   SETTINGS VALUES
========================================================= */

voiceRate?.addEventListener(
    "input",
    function() {

        SWITY.rate =
            Number(
                voiceRate.value
            );

        localStorage.setItem(
            "swityRate",
            SWITY.rate
        );

    }
);


voicePitch?.addEventListener(
    "input",
    function() {

        SWITY.pitch =
            Number(
                voicePitch.value
            );

        localStorage.setItem(
            "swityPitch",
            SWITY.pitch
        );

    }
);


voiceSelect?.addEventListener(
    "change",
    function() {

        const voice =
            voices[
                Number(
                    voiceSelect.value
                )
            ];

        if (!voice) return;


        localStorage.setItem(
            "switySelectedVoice",
            voice.name
        );

    }
);


apiEndpoint?.addEventListener(
    "change",
    function() {

        SWITY.endpoint =
            apiEndpoint.value.trim();


        localStorage.setItem(
            "swityEndpoint",
            SWITY.endpoint
        );

    }
);


/* =========================================================
   MENU
========================================================= */

menuBtn?.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "menu-open"
        );

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

function initSwity() {

    if (voiceRate)
        voiceRate.value =
            SWITY.rate;

    if (voicePitch)
        voicePitch.value =
            SWITY.pitch;

    if (apiEndpoint)
        apiEndpoint.value =
            SWITY.endpoint;


    updateVoiceUI();


    addMessage(
        greetingHindi,
        "ai"
    );


    addMessage(
        greetingEnglish,
        "ai"
    );


    /* Voices load */

    loadVoices();

}


initSwity();


/* =========================================================
   GLOBAL
========================================================= */

window.SWITY = {

    send: sendMessage,

    speak: speak,

    toggleVoice: toggleVoice

};
