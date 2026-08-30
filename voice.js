/* =========================================
   SWITY AI - VOICE SYSTEM
========================================= */

let voiceEnabled = true;


/* GET HTML ELEMENTS */

const voiceBtn =
document.getElementById("voiceBtn");

const voiceText =
document.getElementById("voiceText");

const voiceStatus =
document.getElementById("voiceStatus");

const languageSelect =
document.getElementById("languageSelect");

const speedSelect =
document.getElementById("speedSelect");


/* =========================================
   TEXT TO SPEECH
========================================= */

function speak(text){

    if(!voiceEnabled){
        return;
    }

    if(!("speechSynthesis" in window)){
        console.log("Speech not supported");
        return;
    }


    window.speechSynthesis.cancel();


    const speech =
    new SpeechSynthesisUtterance(text);


    /* DEFAULT SETTINGS */

    speech.lang =
    languageSelect
    ? languageSelect.value
    : "en-US";


    speech.rate =
    speedSelect
    ? parseFloat(speedSelect.value)
    : 0.95;


    speech.pitch = 1.1;

    speech.volume = 1;


    /* FIX MOBILE SPEECH */

    window.speechSynthesis.resume();


    setTimeout(function(){

        window.speechSynthesis.speak(
            speech
        );

    }, 150);


}


/* =========================================
   VOICE ON / OFF
========================================= */

if(voiceBtn){

    voiceBtn.addEventListener(
        "click",
        function(){

            voiceEnabled =
            !voiceEnabled;


            if(voiceEnabled){

                voiceText.textContent =
                "VOICE ON";


                voiceBtn.classList.add(
                    "voice-on"
                );


                if(voiceStatus){

                    voiceStatus.innerHTML =
                    '<i class="dot"></i> ON';

                }

            }

            else{

                voiceText.textContent =
                "VOICE OFF";


                voiceBtn.classList.remove(
                    "voice-on"
                );


                if(voiceStatus){

                    voiceStatus.innerHTML =
                    "OFF";

                }


                window.speechSynthesis.cancel();

            }

        }

    );

}


/* =========================================
   VOICE READY
========================================= */

window.addEventListener(
    "load",
    function(){

        if(
            "speechSynthesis"
            in window
        ){

            window.speechSynthesis.getVoices();

        }

    }
);
