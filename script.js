/* =========================================================
   GURU AI • SWITY
   GURUKRUPATECH
   CREATE BY SHIV SONUNE
   ========================================================= */

"use strict";


/* =========================================================
   SHORTCUT
   ========================================================= */

const $ = (id) => document.getElementById(id);


/* =========================================================
   MAIN ELEMENTS
   ========================================================= */

const messages = $("messages");
const input = $("userInput");
const typing = $("typing");

let voiceEnabled = true;
let recognition = null;
let voices = [];


/* =========================================================
   LOCAL STORAGE KEYS
   ========================================================= */

const STORAGE = {

    endpoint: "swity_endpoint",

    notes: "swity_notes",

    rate: "swity_rate",

    pitch: "swity_pitch"

};


/* =========================================================
   ADD MESSAGE
   ========================================================= */

function addMessage(text, type = "ai") {

    const message = document.createElement("div");

    message.className =
        type === "user"
            ? "message user-message"
            : "message ai-message";

    message.textContent = text;

    messages.appendChild(message);

    messages.scrollTop =
        messages.scrollHeight;

    return message;

}


/* =========================================================
   TYPING STATUS
   ========================================================= */

function setTyping(show) {

    typing.classList.toggle(
        "show",
        show
    );

}


/* =========================================================
   LOCAL AI RESPONSE
   ========================================================= */

function localAnswer(question) {

    const q =
        question
            .toLowerCase()
            .trim();


    /* -----------------------------------------
       GREETING
       ----------------------------------------- */

    if (
        q.includes("hello") ||
        q.includes("hi") ||
        q.includes("hey") ||
        q.includes("namaste")
    ) {

        return `
Hello Boss 👋

I'm Swity, your personal AI assistant.

Tell me what you need and I'll help you.
`;

    }


    /* -----------------------------------------
       TRADING RISK
       ----------------------------------------- */

    if (
        q.includes("risk") ||
        q.includes("risk management")
    ) {

        return `
Boss, trading risk management is simple:

1. Decide your maximum loss before entering.
2. Use a logical Stop Loss.
3. Calculate position size from your risk.
4. Maintain a proper Risk : Reward.
5. Never revenge trade.
6. Keep a trading journal.

Most importantly, protect your capital first.
`;

    }


    /* -----------------------------------------
       TRADING ROADMAP
       ----------------------------------------- */

    if (
        q.includes("trading roadmap") ||
        q.includes("learn trading") ||
        q.includes("trading learning")
    ) {

        return `
📈 TRADING LEARNING ROADMAP

MONTH 1 — FOUNDATION

• Stock Market Basics
• Candlesticks
• Timeframes
• Support & Resistance
• Trend
• Market Structure
• Volume
• Liquidity
• Sessions
• Order Types
• Risk Management
• Position Sizing
• Trading Journal


MONTH 2 — TECHNICAL ANALYSIS

• Moving Average
• EMA
• VWAP
• RSI
• MACD
• ADX
• ATR
• Chart Patterns
• Fibonacci
• Trendlines
• Multi-Timeframe Analysis


MONTH 3 — PRICE ACTION + SMC

• BOS
• CHoCH
• Order Blocks
• FVG
• Liquidity Grab
• Inducement
• Mitigation
• Entry Models
• Confirmation


MONTH 4+

• Backtesting
• Paper Trading
• Journal Analysis
• Strategy Refinement
• Psychology
• Small-size live execution

Learn slowly and focus on consistency.
`;

    }


    /* -----------------------------------------
       POSITION SIZE
       ----------------------------------------- */

    if (
        q.includes("position size") ||
        q.includes("position sizing") ||
        q.includes("calculate position")
    ) {

        return `
🧮 POSITION SIZE FORMULA

Position Size =

Risk Amount ÷ Risk Per Unit


Example:

Capital = ₹5,000
Maximum Risk = ₹100
Stop Loss Distance = ₹5

Position Size:

₹100 ÷ ₹5 = 20 units

For options, always consider the lot size and premium movement.

This is an educational calculation, not a guaranteed-profit method.
`;

    }


    /* -----------------------------------------
       SUPPORT RESISTANCE
       ----------------------------------------- */

    if (
        q.includes("support") &&
        q.includes("resistance")
    ) {

        return `
📊 SUPPORT & RESISTANCE

Support = A price area where buying interest may appear.

Resistance = A price area where selling interest may appear.

Don't treat a level as an exact single price.
Think in zones and wait for price confirmation.
`;

    }


    /* -----------------------------------------
       SMC
       ----------------------------------------- */

    if (
        q.includes("smc") ||
        q.includes("smart money")
    ) {

        return `
🧠 SMART MONEY CONCEPTS

Important concepts:

• Market Structure
• BOS
• CHoCH
• Liquidity
• Internal Liquidity
• External Liquidity
• Order Blocks
• Fair Value Gap
• Liquidity Grab
• Inducement
• Mitigation

Use these as a framework for studying price action, not as a guarantee of profit.
`;

    }


    /* -----------------------------------------
       WEBSITE
       ----------------------------------------- */

    if (
        q.includes("website") ||
        q.includes("web development") ||
        q.includes("html") ||
        q.includes("css") ||
        q.includes("javascript")
    ) {

        return `
💻 WEB DEVELOPMENT MODE

Yes Boss.

GURU AI SWITY is separated into:

• index.html
• style.css
• script.js
• background.png

HTML = Structure
CSS = Design
JavaScript = Functionality

A secure backend can later connect SWITY to a real AI model.
`;

    }


    /* -----------------------------------------
       GURU AI
       ----------------------------------------- */

    if (
        q.includes("guru ai") ||
        q.includes("swity")
    ) {

        return `
🤖 GURU AI • SWITY

Brand:
GURUKRUPATECH

Assistant:
SWITY

Creator:
SHIV SONUNE

Status:
SYSTEM ONLINE

I'm ready to assist you, Boss.
`;

    }


    /* -----------------------------------------
       TIME
       ----------------------------------------- */

    if (
        q.includes("time") ||
        q.includes("current time")
    ) {

        return `
⏰ Current device time:

${new Date().toLocaleTimeString()}
`;

    }


    /* -----------------------------------------
       DATE
       ----------------------------------------- */

    if (
        q.includes("date") ||
        q.includes("today")
    ) {

        return `
📅 Today:

${new Date().toLocaleDateString()}
`;

    }


    /* -----------------------------------------
       CAPITAL
       ----------------------------------------- */

    if (
        q.includes("capital") &&
        (
            q.includes("trading") ||
            q.includes("trade")
        )
    ) {

        return `
Trading capital depends on your strategy, risk tolerance and instrument.

Don't choose capital based only on a daily-profit target.

First define:

• Maximum loss
• Stop Loss
• Position size
• Risk/Reward
• Trading frequency
`;

    }


    /* -----------------------------------------
       OPTIONS
       ----------------------------------------- */

    if (
        q.includes("option trading") ||
        q.includes("options trading") ||
        q.includes("option")
    ) {

        return `
📈 OPTIONS BASICS

CALL = Right to buy.

PUT = Right to sell.

Option Buyer:
• Pays premium
• Has limited loss to premium paid
• Needs price movement in the expected direction

Option Seller:
• Receives premium
• Can face much larger losses depending on the position
• Requires strict risk management

Always understand the contract, lot size and risk before trading.
`;

    }


    /* -----------------------------------------
       FOREX
       ----------------------------------------- */

    if (
        q.includes("forex") ||
        q.includes("currency")
    ) {

        return `
💱 FOREX MODE

Forex means trading currency pairs.

Examples:

EUR/USD
USD/INR
EUR/INR
JPY/INR

For India, always verify the currently permitted instruments and broker/regulatory requirements before trading.
`;

    }


    /* -----------------------------------------
       CALCULATOR
       ----------------------------------------- */

    if (
        q.includes("calculator") ||
        q.includes("calculate")
    ) {

        return `
🧮 CALCULATOR MODE

You can ask me something like:

"Calculate 5000 × 5%"

or

"100 dollars in rupees"

For live currency conversion, connect a real-time exchange-rate source.
`;

    }


    /* -----------------------------------------
       HELP
       ----------------------------------------- */

    if (
        q === "help" ||
        q.includes("what can you do")
    ) {

        return `
⚡ SWITY AVAILABLE MODULES

💬 AI Chat
🎙 Voice Input
🔊 Voice Output
📊 Trading Learning
🧠 SMC Concepts
🧮 Calculations
💻 Web Development Help
📝 Notes
📤 Chat Export
⚙ Settings
🔌 AI Backend Connection

Try asking:

"Give me trading roadmap"

"Explain SMC"

"Calculate position size"

"Help me build a website"
`;

    }


    /* -----------------------------------------
       DEFAULT
       ----------------------------------------- */

    return `
Boss, I'm currently running in LOCAL DEMO MODE.

I understood your message:

"${question}"

For full AI-powered answers, connect a secure AI backend from:

⚙ SETTINGS → AI Backend Endpoint

Your private API key should stay on the server, not inside this JavaScript file.
`;

}


/* =========================================================
   ASK SWITY
   ========================================================= */

async function ask() {

    const question =
        input.value.trim();


    if (!question) {

        return;

    }


    addMessage(
        question,
        "user"
    );


    input.value = "";

    input.style.height =
        "auto";


    setTyping(true);


    const endpoint =
        localStorage.getItem(
            STORAGE.endpoint
        ) || "";


    /* =====================================================
       REAL BACKEND MODE
       ===================================================== */

    if (endpoint) {

        try {

            const response =
                await fetch(
                    endpoint,
                    {

                        method:"POST",

                        headers:{
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                message:
                                    question,

                                assistant:
                                    "SWITY",

                                brand:
                                    "GURUKRUPATECH"

                            })

                    }
                );


            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );

            }


            const data =
                await response.json();


            const answer =
                data.reply ||
                data.message ||
                data.response;


            if (!answer) {

                throw new Error(
                    "No reply returned by backend"
                );

            }


            setTyping(false);


            addMessage(
                String(answer),
                "ai"
            );


            speak(
                String(answer)
            );


            return;

        }

        catch(error) {

            console.error(
                "SWITY backend error:",
                error
            );


            addMessage(
                "⚠️ Backend connection failed. Switching to Local Demo Mode.",
                "ai"
            );

        }

    }


    /* =====================================================
       LOCAL MODE
       ===================================================== */

    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                350
            )
    );


    const answer =
        localAnswer(question);


    setTyping(false);


    addMessage(
        answer,
        "ai"
    );


    speak(answer);

}


/* =========================================================
   SEND BUTTON
   ========================================================= */

$("sendBtn")
    .addEventListener(
        "click",
        ask
    );


/* =========================================================
   ENTER KEY
   ========================================================= */

input.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            ask();

        }

    }
);


/* =========================================================
   AUTO RESIZE TEXTAREA
   ========================================================= */

input.addEventListener(
    "input",
    () => {

        input.style.height =
            "auto";

        input.style.height =
            Math.min(
                input.scrollHeight,
                160
            ) + "px";

    }
);


/* =========================================================
   QUICK BUTTONS
   ========================================================= */

document
    .querySelectorAll(".quick-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                input.value =
                    button.dataset.question ||
                    "";

                input.focus();

                ask();

            }
        );

    });


/* =========================================================
   SETTINGS
   ========================================================= */

$("settingsBtn")
    .addEventListener(
        "click",
        openSettings
    );


$("settingsChatBtn")
    .addEventListener(
        "click",
        openSettings
    );


function openSettings() {

    loadVoices();

    openModal(
        $("settingsModal")
    );

}


/* =========================================================
   MODAL
   ========================================================= */

function openModal(modal) {

    modal.classList.add(
        "open"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeModal(modal) {

    modal.classList.remove(
        "open"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   CLOSE SETTINGS
   ========================================================= */

$("closeSettings")
    .addEventListener(
        "click",
        () => {

            closeModal(
                $("settingsModal")
            );

        }
    );


/* =========================================================
   CLOSE NOTES
   ========================================================= */

$("closeNotes")
    .addEventListener(
        "click",
        () => {

            closeModal(
                $("notesModal")
            );

        }
    );


/* =========================================================
   CLICK OUTSIDE MODAL
   ========================================================= */

[
    $("settingsModal"),
    $("notesModal")
]
.forEach(modal => {

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeModal(
                    modal
                );

            }

        }
    );

});


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal(
                $("settingsModal")
            );

            closeModal(
                $("notesModal")
            );

        }

    }
);


/* =========================================================
   VOICE ON / OFF
   ========================================================= */

$("voiceBtn")
    .addEventListener(
        "click",
        () => {

            voiceEnabled =
                !voiceEnabled;


            $("voiceStatus")
                .textContent =
                voiceEnabled
                    ? "ON"
                    : "OFF";


            $("voiceBtn")
                .textContent =
                voiceEnabled
                    ? "🔊 VOICE ON"
                    : "🔇 VOICE OFF";


            $("voiceDot")
                .style.background =
                voiceEnabled
                    ? "var(--green)"
                    : "#546";


            if (
                !voiceEnabled &&
                "speechSynthesis" in window
            ) {

                speechSynthesis.cancel();

            }

        }
    );


/* =========================================================
   LOAD BROWSER VOICES
   ========================================================= */

function loadVoices() {

    if (
        !("speechSynthesis" in window)
    ) {

        return;

    }


    voices =
        speechSynthesis
            .getVoices();


    const select =
        $("voiceSelect");


    if (!select) {

        return;

    }


    const previous =
        select.value;


    select.innerHTML =
        "";


    if (!voices.length) {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            "";

        option.textContent =
            "Browser voices not available";

        select.appendChild(
            option
        );

        return;

    }


    voices.forEach(
        (voice, index) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                String(index);

            option.textContent =
                `${voice.name} • ${voice.lang}`;

            select.appendChild(
                option
            );

        }
    );


    if (
        previous &&
        voices[
            Number(previous)
        ]
    ) {

        select.value =
            previous;

    }

    else {

        const preferred =
            voices.findIndex(
                voice =>
                    /female|
                    samantha|
                    zira|
                    google.*female|
                    microsoft.*zira/i
                    .test(
                        voice.name
                    )
            );


        select.value =
            String(
                preferred >= 0
                    ? preferred
                    : 0
            );

    }

}


/* =========================================================
   TEXT TO SPEECH
   ========================================================= */

function speak(text) {

    if (
        !voiceEnabled ||
        !("speechSynthesis" in window)
    ) {

        return;

    }


    speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    utterance.rate =
        Number(
            $("voiceRate").value ||
            0.95
        );


    utterance.pitch =
        Number(
            $("voicePitch").value ||
            1.1
        );


    utterance.volume =
        1;


    const voiceIndex =
        Number(
            $("voiceSelect").value
        );


    if (
        voices[voiceIndex]
    ) {

        utterance.voice =
            voices[voiceIndex];

    }


    speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   SPEECH SYNTHESIS INIT
   ========================================================= */

if (
    "speechSynthesis" in window
) {

    speechSynthesis.onvoiceschanged =
        loadVoices;


    setTimeout(
        loadVoices,
        300
    );

}


/* =========================================================
   MICROPHONE
   ========================================================= */

function startMic() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        addMessage(
            "🎙️ Voice input is not supported by this browser. Try Chrome on Android.",
            "ai"
        );

        return;

    }


    if (recognition) {

        try {

            recognition.stop();

        }

        catch(error) {

            console.log(error);

        }

    }


    recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-IN";


    recognition.interimResults =
        false;


    recognition.continuous =
        false;


    $("micBtn")
        .textContent =
        "🔴 LISTENING";


    recognition.onresult =
        event => {

            const transcript =
                event
                    .results?.[0]?.[0]
                    ?.transcript ||
                "";


            input.value =
                transcript;


            input.focus();


            ask();

        };


    recognition.onerror =
        event => {

            console.error(
                "Speech recognition:",
                event.error
            );


            $("micBtn")
                .textContent =
                "🎙 MIC";

        };


    recognition.onend =
        () => {

            $("micBtn")
                .textContent =
                "🎙 MIC";

        };


    try {

        recognition.start();

    }

    catch(error) {

        console.error(
            error
        );

        $("micBtn")
            .textContent =
            "🎙 MIC";

    }

}


/* =========================================================
   MIC BUTTON
   ========================================================= */

$("micBtn")
    .addEventListener(
        "click",
        startMic
    );


/* =========================================================
   MENU BUTTON
   ========================================================= */

$("menuBtn")
    .addEventListener(
        "click",
        () => {

            $("chatSection")
                .scrollIntoView({
                    behavior:"smooth",
                    block:"center"
                });


            input.focus();

        }
    );


/* =========================================================
   NOTES
   ========================================================= */

$("notesBtn")
    .addEventListener(
        "click",
        () => {

            $("notesArea")
                .value =
                localStorage.getItem(
                    STORAGE.notes
                ) || "";


            openModal(
                $("notesModal")
            );

        }
    );


/* =========================================================
   SAVE NOTES
   ========================================================= */

$("saveNotes")
    .addEventListener(
        "click",
        () => {

            localStorage.setItem(
                STORAGE.notes,
                $("notesArea").value
            );


            $("saveNotes")
                .textContent =
                "✓ NOTES SAVED";


            setTimeout(
                () => {

                    $("saveNotes")
                        .textContent =
                        "SAVE NOTES";

                },
                1200
            );

        }
    );


/* =========================================================
   CLEAR CHAT
   ========================================================= */

$("clearBtn")
    .addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Clear the current chat?"
                );


            if (!confirmed) {

                return;

            }


            messages.innerHTML =
                "";


            addMessage(
                "Hello Boss. Welcome back.\nI'm Swity, your personal AI assistant.",
                "ai"
            );

        }
    );


/* =========================================================
   EXPORT CHAT
   ========================================================= */

$("exportBtn")
    .addEventListener(
        "click",
        () => {

            const lines =
                [
                    ...messages
                        .querySelectorAll(
                            ".message"
                        )
                ]
                .map(
                    (element) => {

                        const who =
                            element
                                .classList
                                .contains(
                                    "user-message"
                                )
                                ? "YOU"
                                : "SWITY";


                        return `${who}: ${element.textContent}`;

                    }
                );


            const content = [

                "GURU AI • SWITY",

                "CREATE BY SHIV SONUNE",

                "",

                ...lines

            ].join(
                "\n\n"
            );


            const blob =
                new Blob(
                    [
                        content
                    ],
                    {
                        type:
                            "text/plain;charset=utf-8"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                `SWITY-CHAT-${new Date()
                    .toISOString()
                    .slice(0,10)}.txt`;


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            URL.revokeObjectURL(
                url
            );

        }
    );


/* =========================================================
   SAVE SETTINGS
   ========================================================= */

$("saveSettings")
    .addEventListener(
        "click",
        () => {

            localStorage.setItem(
                STORAGE.endpoint,
                $("apiEndpoint")
                    .value
                    .trim()
            );


            localStorage.setItem(
                STORAGE.rate,
                $("voiceRate").value
            );


            localStorage.setItem(
                STORAGE.pitch,
                $("voicePitch").value
            );


            $("saveSettings")
                .textContent =
                "✓ SETTINGS SAVED";


            setTimeout(
                () => {

                    $("saveSettings")
                        .textContent =
                        "SAVE SETTINGS";


                    closeModal(
                        $("settingsModal")
                    );

                },
                800
            );

        }
    );


/* =========================================================
   RESTORE SETTINGS
   ========================================================= */

function restoreSettings() {

    $("apiEndpoint")
        .value =
        localStorage.getItem(
            STORAGE.endpoint
        ) || "";


    $("voiceRate")
        .value =
        localStorage.getItem(
            STORAGE.rate
        ) || "0.95";


    $("voicePitch")
        .value =
        localStorage.getItem(
            STORAGE.pitch
        ) || "1.1";

}


/* =========================================================
   CREATE DATA BARS
   ========================================================= */

function createBars(
    id,
    count
) {

    const box =
        $(id);


    if (!box) {

        return;

    }


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const bar =
            document.createElement(
                "i"
            );


        bar.className =
            "bar";


        bar.style.height =
            `${20 + Math.random() * 70}%`;


        box.appendChild(
            bar
        );

    }

}


/* =========================================================
   ANIMATE DATA BARS
   ========================================================= */

function animateBars(id) {

    const bars =
        document.querySelectorAll(
            `#${id} .bar`
        );


    bars.forEach(
        bar => {

            bar.style.height =
                `${20 + Math.random() * 70}%`;

        }
    );

}


/* =========================================================
   INITIALIZE CHARTS
   ========================================================= */

createBars(
    "dataChart",
    12
);


createBars(
    "signalChart",
    10
);


/* =========================================================
   CHART ANIMATION
   ========================================================= */

setInterval(
    () => {

        animateBars(
            "dataChart"
        );


        animateBars(
            "signalChart"
        );

    },
    1400
);


/* =========================================================
   PROCESSING VALUE
   ========================================================= */

setInterval(
    () => {

        const processing =
            $("processingValue");


        if (!processing) {

            return;

        }


        processing.textContent =
            `${(
                96 +
                Math.random() *
                3.5
            ).toFixed(1)}%`;

    },
    1800
);


/* =========================================================
   INITIAL START
   ========================================================= */

restoreSettings();

loadVoices();


/* =========================================================
   CONSOLE BRAND
   ========================================================= */

console.log(
    "%c GURU AI • SWITY ",
    "color:#00eaff;font-size:18px;font-weight:bold"
);


console.log(
    "%c CREATE BY SHIV SONUNE ",
    "color:#00ff9d;font-size:12px;font-weight:bold"
);
