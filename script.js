/* =========================================================
   GURU AI • SWITY
   STEP 3 — JAVASCRIPT
   Created by Shiv Sonune
========================================================= */

"use strict";

/* =========================================================
   ELEMENTS
========================================================= */

const $ = (id) => document.getElementById(id);

const userInput = $("userInput");
const sendBtn = $("sendBtn");
const messages = $("messages");

const micBtn = $("micBtn");
const voiceBtn = $("voiceBtn");
const voiceStatus = $("voiceStatus");
const voiceDot = $("voiceDot");

const settingsBtn = $("settingsBtn");
const settingsChatBtn = $("settingsChatBtn");
const settingsModal = $("settingsModal");
const closeSettings = $("closeSettings");

const notesBtn = $("notesBtn");
const notesModal = $("notesModal");
const closeNotes = $("closeNotes");
const notesArea = $("notesArea");
const saveNotes = $("saveNotes");

const clearBtn = $("clearBtn");
const exportBtn = $("exportBtn");

const voiceSelect = $("voiceSelect");
const voiceRate = $("voiceRate");
const voicePitch = $("voicePitch");
const apiEndpoint = $("apiEndpoint");

const menuBtn = $("menuBtn");


/* =========================================================
   SWITY CONFIG
========================================================= */

const SWITY = {

    name: "Swity",

    creator: "Shiv Sonune",

    brand: "GurukrupaTech",

    voiceEnabled: true,

    language: localStorage.getItem("swityLanguage") || "auto",

    rate: Number(localStorage.getItem("swityRate")) || 0.95,

    pitch: Number(localStorage.getItem("swityPitch")) || 1.15,

    endpoint:
        localStorage.getItem("swityEndpoint") || ""

};


/* =========================================================
   DEFAULT GREETINGS
========================================================= */

const GREETINGS = {

    hindi:
        "Hello! Main Swity hoon. Aaj main aapki kya sahayata kar sakti hoon?",

    english:
        "Hello Boss! I'm Swity AI by GurukrupaTech. Your intelligent AI companion for Trading, Coding, Technology, Learning, Creativity, and Smart Solutions. How may I assist you today?",

    marathi:
        "नमस्कार Boss! मी Swity आहे. आज मी तुमची कशी मदत करू शकते?"
};


/* =========================================================
   INITIAL CHAT
========================================================= */

function createInitialMessages() {

    messages.innerHTML = "";

    addMessage(
        GREETINGS.hindi,
        "ai"
    );

    addMessage(
        GREETINGS.english,
        "ai"
    );

}


/* =========================================================
   ADD MESSAGE
========================================================= */

function addMessage(text, type = "ai") {

    const div = document.createElement("div");

    div.className =
        type === "user"
            ? "message user-message"
            : "message ai-message";

    div.innerText = text;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

    return div;
}


/* =========================================================
   TYPING INDICATOR
========================================================= */

function showTyping() {

    const div = document.createElement("div");

    div.className =
        "message ai-message typing";

    div.innerHTML =
        "<span>●</span> <span>●</span> <span>●</span>";

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

    return div;
}


/* =========================================================
   SEND MESSAGE
========================================================= */

async function sendMessage(customText = null) {

    const text =
        customText !== null
            ? customText.trim()
            : userInput.value.trim();

    if (!text) return;


    addMessage(text, "user");


    userInput.value = "";


    const typing = showTyping();


    /* -----------------------------------------------------
       REAL AI BACKEND
    ----------------------------------------------------- */

    if (SWITY.endpoint) {

        try {

            const response = await fetch(
                SWITY.endpoint,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        message: text,

                        language:
                            SWITY.language,

                        assistant: "SWITY",

                        brand: "GURUKRUPATECH"

                    })

                }
            );


            if (!response.ok) {

                throw new Error(
                    "Backend error"
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

            typing.remove();

            const fallback =
                getSwityReply(text);

            addMessage(
                fallback,
                "ai"
            );

            speak(fallback);

            return;

        }

    }


    /* -----------------------------------------------------
       LOCAL SWITY ENGINE
    ----------------------------------------------------- */

    setTimeout(() => {

        typing.remove();

        const reply =
            getSwityReply(text);

        addMessage(
            reply,
            "ai"
        );

        speak(reply);

    }, 500);

}


/* =========================================================
   LOCAL AI RESPONSE ENGINE
========================================================= */

function getSwityReply(text) {

    const q =
        text.toLowerCase().trim();


    /* GREETING */

    if (
        q.includes("hello") ||
        q.includes("hi") ||
        q.includes("hey") ||
        q.includes("नमस्कार") ||
        q.includes("हॅलो")
    ) {

        return (
            "नमस्कार Boss! 😊 मी Swity आहे. " +
            "मी Trading, Coding, Technology, Learning, " +
            "Creativity आणि Smart Solutions मध्ये तुमची मदत करू शकते."
        );

    }


    /* WHO ARE YOU */

    if (
        q.includes("who are you") ||
        q.includes("तू कोण") ||
        q.includes("तुम्ही कोण") ||
        q.includes("swity कोण")
    ) {

        return (
            "मी Swity AI आहे — GurukrupaTech ची intelligent " +
            "AI assistant. मला Shiv Sonune यांनी तयार केले आहे. 🤖"
        );

    }


    /* TRADING */

    if (
        q.includes("trading") ||
        q.includes("trade") ||
        q.includes("nifty") ||
        q.includes("banknifty") ||
        q.includes("stock")
    ) {

        return (
            "नक्की Boss! 📈 Trading मध्ये मी तुम्हाला " +
            "Market Structure, Support & Resistance, " +
            "Price Action, Risk Management, SMC, " +
            "Options आणि Trading Psychology समजावून सांगू शकते."
        );

    }


    /* RISK */

    if (
        q.includes("risk") ||
        q.includes("रिस्क") ||
        q.includes("position size")
    ) {

        return (
            "Risk Management साठी आधी Capital ठरवा, " +
            "प्रत्येक trade मध्ये छोटा percentage risk ठेवा, " +
            "Stop Loss वापरा आणि Risk : Reward ratio तपासा. 📊"
        );

    }


    /* CODING */

    if (
        q.includes("html") ||
        q.includes("css") ||
        q.includes("javascript") ||
        q.includes("coding") ||
        q.includes("website") ||
        q.includes("web")
    ) {

        return (
            "नक्की Boss! 💻 HTML, CSS आणि JavaScript वापरून " +
            "आपण तुमची GURU AI • SWITY website तयार करू शकतो."
        );

    }


    /* MARATHI */

    if (
        q.includes("marathi") ||
        q.includes("मराठी") ||
        q.includes("मराठीत")
    ) {

        return (
            "हो Boss! ❤️ मी मराठीत तुमच्याशी बोलू शकते " +
            "आणि Marathi text-to-speech सुद्धा वापरू शकते."
        );

    }


    /* HINDI */

    if (
        q.includes("hindi") ||
        q.includes("हिंदी")
    ) {

        return (
            "Bilkul Boss! ❤️ Main Hindi mein bhi aapse " +
            "baat kar sakti hoon."
        );

    }


    /* HELP */

    if (
        q.includes("help") ||
        q.includes("मदत") ||
        q.includes("सांग")
    ) {

        return (
            "Boss, मी तुमची Trading, Coding, Website, " +
            "Technology, Learning, Calculator, Notes आणि " +
            "Creative कामांमध्ये मदत करू शकते. 🚀"
        );

    }


    /* THANK YOU */

    if (
        q.includes("thank") ||
        q.includes("thanks") ||
        q.includes("धन्यवाद")
    ) {

        return (
            "You're always welcome Boss! 😊❤️"
        );

    }


    /* DEFAULT */

    return (
        "Boss, तुमचा प्रश्न समजला. 🤖 " +
        "मी यासाठी AI Backend शी connect झाल्यावर " +
        "अधिक intelligent आणि detailed answer देऊ शकते."
    );

}


/* =========================================================
   TEXT TO SPEECH
========================================================= */

let availableVoices = [];


function loadVoices() {

    if (!("speechSynthesis" in window)) {

        return;

    }


    availableVoices =
        window.speechSynthesis.getVoices();


    if (!voiceSelect) return;


    voiceSelect.innerHTML = "";


    if (!availableVoices.length) {

        const option =
            document.createElement("option");

        option.textContent =
            "Default Voice";

        voiceSelect.appendChild(option);

        return;

    }


    availableVoices.forEach(
        (voice, index) => {

            const option =
                document.createElement("option");

            option.value = index;

            option.textContent =
                `${voice.name} — ${voice.lang}`;

            voiceSelect.appendChild(option);

        }
    );


    selectBestVoice();

}


if ("speechSynthesis" in window) {

    speechSynthesis.onvoiceschanged =
        loadVoices;

}


function selectBestVoice() {

    if (!availableVoices.length) return;


    const preferred =
        availableVoices.findIndex(
            voice =>
                /mr-IN/i.test(voice.lang)
        );


    const hindi =
        availableVoices.findIndex(
            voice =>
                /hi-IN/i.test(voice.lang)
        );


    const english =
        availableVoices.findIndex(
            voice =>
                /en-IN/i.test(voice.lang)
        );


    const femaleNames =
        /female|samantha|zira|google|veena|heera|raveena|priya/i;


    const female =
        availableVoices.findIndex(
            voice =>
                femaleNames.test(voice.name)
        );


    let selected = -1;


    if (preferred >= 0)
        selected = preferred;

    else if (hindi >= 0)
        selected = hindi;

    else if (english >= 0)
        selected = english;

    else if (female >= 0)
        selected = female;

    else
        selected = 0;


    voiceSelect.value =
        String(selected);

}


/* =========================================================
   SPEAK
========================================================= */

function speak(text) {

    if (!SWITY.voiceEnabled) return;

    if (!("speechSynthesis" in window))
        return;


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    let selectedVoice = null;


    if (
        voiceSelect &&
        availableVoices.length
    ) {

        const index =
            Number(voiceSelect.value);

        if (
            !Number.isNaN(index) &&
            availableVoices[index]
        ) {

            selectedVoice =
                availableVoices[index];

        }

    }


    if (selectedVoice) {

        utterance.voice =
            selectedVoice;

    }


    utterance.rate =
        SWITY.rate;

    utterance.pitch =
        SWITY.pitch;

    utterance.volume = 1;


    window.speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   VOICE BUTTON
========================================================= */

function toggleVoice() {

    SWITY.voiceEnabled =
        !SWITY.voiceEnabled;


    if (!SWITY.voiceEnabled) {

        window.speechSynthesis?.cancel();

    }


    updateVoiceUI();

}


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

        voiceBtn.innerHTML =
            SWITY.voiceEnabled
                ? "🔊 VOICE ON"
                : "🔇 VOICE OFF";

    }

}


/* =========================================================
   MICROPHONE / SPEECH RECOGNITION
========================================================= */

let recognition = null;


const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();


    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "mr-IN";


    recognition.onstart = () => {

        micBtn.innerHTML =
            "🔴 LISTENING...";

    };


    recognition.onresult =
        (event) => {

            const transcript =
                event.results[0][0].transcript;

            userInput.value =
                transcript;

        };


    recognition.onerror =
        (event) => {

            console.log(
                "Speech error:",
                event.error
            );

            micBtn.innerHTML =
                "🎙 MIC";

        };


    recognition.onend = () => {

        micBtn.innerHTML =
            "🎙 MIC";

    };

}


function startMicrophone() {

    if (!recognition) {

        alert(
            "Boss, तुमच्या browser मध्ये Speech Recognition उपलब्ध नाही."
        );

        return;

    }


    recognition.lang =
        "mr-IN";


    recognition.start();

}


/* =========================================================
   QUICK TOOLS
========================================================= */

document
    .querySelectorAll(".quick-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const question =
                    button.dataset.question;

                sendMessage(question);

            }
        );

    });


/* =========================================================
   ENTER TO SEND
========================================================= */

if (userInput) {

    userInput.addEventListener(
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

}


/* =========================================================
   SEND BUTTON
========================================================= */

sendBtn?.addEventListener(
    "click",
    () => sendMessage()
);


/* =========================================================
   MIC
========================================================= */

micBtn?.addEventListener(
    "click",
    startMicrophone
);


/* =========================================================
   VOICE
========================================================= */

voiceBtn?.addEventListener(
    "click",
    toggleVoice
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


/* =========================================================
   SETTINGS BACKDROP
========================================================= */

settingsModal?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            settingsModal
        ) {

            closeSettingsModal();

        }

    }
);


/* =========================================================
   VOICE RATE
========================================================= */

voiceRate?.addEventListener(
    "input",
    () => {

        SWITY.rate =
            Number(voiceRate.value);

        localStorage.setItem(
            "swityRate",
            SWITY.rate
        );

    }
);


/* =========================================================
   VOICE PITCH
========================================================= */

voicePitch?.addEventListener(
    "input",
    () => {

        SWITY.pitch =
            Number(voicePitch.value);

        localStorage.setItem(
            "swityPitch",
            SWITY.pitch
        );

    }
);


/* =========================================================
   VOICE SELECT
========================================================= */

voiceSelect?.addEventListener(
    "change",
    () => {

        const selected =
            availableVoices[
                Number(
                    voiceSelect.value
                )
            ];

        if (!selected) return;

        localStorage.setItem(
            "swityVoice",
            selected.name
        );

    }
);


/* =========================================================
   API ENDPOINT
========================================================= */

apiEndpoint?.addEventListener(
    "change",
    () => {

        SWITY.endpoint =
            apiEndpoint.value.trim();

        localStorage.setItem(
            "swityEndpoint",
            SWITY.endpoint
        );

    }
);


/* =========================================================
   NOTES
========================================================= */

function openNotes() {

    notesModal?.classList.add(
        "active"
    );

    notesArea.value =
        localStorage.getItem(
            "swityNotes"
        ) || "";

}


function closeNotesModal() {

    notesModal?.classList.remove(
        "active"
    );

}


notesBtn?.addEventListener(
    "click",
    openNotes
);


closeNotes?.addEventListener(
    "click",
    closeNotesModal
);


saveNotes?.addEventListener(
    "click",
    () => {

        localStorage.setItem(
            "swityNotes",
            notesArea.value
        );


        alert(
            "📝 Notes saved successfully Boss!"
        );

        closeNotesModal();

    }
);


/* =========================================================
   CLEAR CHAT
========================================================= */

clearBtn?.addEventListener(
    "click",
    () => {

        const confirmClear =
            confirm(
                "Boss, chat clear करायचा आहे का?"
            );


        if (!confirmClear) return;


        createInitialMessages();

    }
);


/* =========================================================
   EXPORT CHAT
========================================================= */

exportBtn?.addEventListener(
    "click",
    () => {

        const chat =
            messages.innerText;
