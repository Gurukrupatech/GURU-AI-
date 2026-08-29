/* ==========================================================================
   GURU AI - SWITY ASSISTANT LOGIC (VANILLA JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENT REFERENCES ---
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const micBtn = document.getElementById('micBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const voiceBtnText = document.getElementById('voiceBtnText');
    const typingIndicator = document.getElementById('typingIndicator');
    const statusText = document.getElementById('statusText');

    // Modal References
    const settingsModal = document.getElementById('settingsModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const voiceSelect = document.getElementById('voiceSelect');
    const langSelect = document.getElementById('langSelect');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeVal = document.getElementById('volumeVal');
    const rateSlider = document.getElementById('rateSlider');
    const rateVal = document.getElementById('rateVal');
    const animToggle = document.getElementById('animToggle');

    // --- STATE VARIABLES ---
    let isVoiceOutputEnabled = true;
    let isListening = false;
    let availableVoices = [];
    let selectedVoice = null;
    let currentLang = 'en-US';
    let volume = 1;
    let speechRate = 1;

    // --- SPEECH SYNTHESIS SETUP ---
    const synth = window.speechSynthesis;

    function populateVoiceList() {
        if (!synth) return;
        
        // Retrieve voices from browser API
        availableVoices = synth.getVoices();
        voiceSelect.innerHTML = '';

        if (availableVoices.length === 0) {
            const option = document.createElement('option');
            option.textContent = 'Default System Voice';
            option.value = '';
            voiceSelect.appendChild(option);
            return;
        }

        availableVoices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = index;

            // Prefer female/English standard voices as initial default for Swity
            if (voice.default || (voice.lang.includes('en') && voice.name.toLowerCase().includes('female'))) {
                option.selected = true;
                selectedVoice = voice;
            }

            voiceSelect.appendChild(option);
        });
    }

    // Load voices dynamically across various browsers (Chrome/Android require event listener)
    populateVoiceList();
    if (synth && synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoiceList;
    }

    // Speak Function (Text-To-Speech)
    function speakText(text) {
        if (!isVoiceOutputEnabled || !synth) return;

        // Cancel existing speech before starting new
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice || availableVoices[0] || null;
        utterance.lang = currentLang;
        utterance.volume = volume;
        utterance.rate = speechRate;

        utterance.onstart = () => {
            statusText.textContent = 'SWITY SPEAKING...';
        };

        utterance.onend = () => {
            statusText.textContent = 'SYSTEM ONLINE';
        };

        utterance.onerror = () => {
            statusText.textContent = 'SYSTEM ONLINE';
        };

        synth.speak(utterance);
    }

    // --- SPEECH RECOGNITION SETUP (WEB SPEECH API) ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            isListening = true;
            micBtn.classList.add('listening');
            statusText.textContent = 'LISTENING...';
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            handleUserMessage();
        };

        recognition.onerror = (event) => {
            stopListening();
            appendMessage('SWITY', 'Speech recognition error. Please type your command.');
        };

        recognition.onend = () => {
            stopListening();
        };
    }

    function toggleListening() {
        if (!recognition) {
            alert('Web Speech API is not supported in this browser. Try Chrome on Android.');
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            recognition.lang = currentLang;
            recognition.start();
        }
    }

    function stopListening() {
        isListening = false;
        micBtn.classList.remove('listening');
        statusText.textContent = 'SYSTEM ONLINE';
    }

    // --- CHAT HANDLING FUNCTIONS ---
    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');

        if (sender === 'SWITY') {
            msgDiv.classList.add('ai-message');
            msgDiv.innerHTML = `<span class="sender-tag">SWITY:</span><p class="message-text">${text}</p>`;
        } else {
            msgDiv.classList.add('user-message');
            msgDiv.innerHTML = `<span class="sender-tag">BOSS:</span><p class="message-text">${text}</p>`;
        }

        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function handleUserMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        // Append User Message
        appendMessage('BOSS', text);
        userInput.value = '';

        // Show Typing Indicator
        typingIndicator.classList.remove('hidden');
        chatBox.scrollTop = chatBox.scrollHeight;

        // Generate Assistant Response
        setTimeout(() => {
            typingIndicator.classList.add('hidden');
            const response = generateAIResponse(text);
            appendMessage('SWITY', response);
            speakText(response);
        }, 1000);
    }

    // Response Logic Engine
    function generateAIResponse(input) {
        const lower = input.toLowerCase();

        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
            return 'Greetings Boss. How can I assist your operations today?';
        }
        if (lower.includes('who are you') || lower.includes('your name')) {
            return 'I am SWITY, your custom Cyberpunk AI built for GURUKRUPATECH.';
        }
        if (lower.includes('trader shiv') || lower.includes('admin') || lower.includes('creator')) {
            return 'Trader Shiv is the system administrator and founder of GURUKRUPATECH.';
        }
        if (lower.includes('time') || lower.includes('date')) {
            const now = new Date();
            return `System time is currently ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
        }
        
        return `Command received: "${input}". Systems fully active and standing by.`;
    }

    // --- EVENT LISTENERS ---

    // Send Input Events
    sendBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });

    // Control Bar Buttons
    micBtn.addEventListener('click', toggleListening);

    voiceBtn.addEventListener('click', () => {
        isVoiceOutputEnabled = !isVoiceOutputEnabled;
        if (isVoiceOutputEnabled) {
            voiceBtnText.textContent = 'VOICE ON';
            voiceBtn.style.borderColor = 'var(--neon-cyan)';
            speakText('Voice output activated.');
        } else {
            voiceBtnText.textContent = 'VOICE OFF';
            voiceBtn.style.borderColor = 'var(--card-border)';
            if (synth) synth.cancel();
        }
    });

    // Settings Modal Open / Close Logic
    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
    });

    // Click outside to close modal
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.add('hidden');
        }
    });

    // Modal Control Inputs
    voiceSelect.addEventListener('change', (e) => {
        const idx = e.target.value;
        if (idx !== '') {
            selectedVoice = availableVoices[idx];
        }
    });

    langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
    });

    volumeSlider.addEventListener('input', (e) => {
        volume = parseFloat(e.target.value);
        volumeVal.textContent = `${Math.round(volume * 100)}%`;
    });

    rateSlider.addEventListener('input', (e) => {
        speechRate = parseFloat(e.target.value);
        rateVal.textContent = `${speechRate.toFixed(1)}x`;
    });

    // Theme Animation Toggle
    animToggle.addEventListener('change', (e) => {
        const rings = document.querySelectorAll('.neon-ring');
        const core = document.querySelector('.avatar-core');
        
        if (e.target.checked) {
            rings.forEach(ring => ring.style.animationPlayState = 'running');
            if (core) core.style.animationPlayState = 'running';
        } else {
            rings.forEach(ring => ring.style.animationPlayState = 'paused');
            if (core) core.style.animationPlayState = 'paused';
        }
    });
});

