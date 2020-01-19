let wordList = ['bike','ball','bake','take','make'];
let wordListUpperCased = wordList.map(word=>word[0].toUpperCase() + word.slice(1).toLowerCase());


let mappedWordList = wordListUpperCased.map(word=> ({name:word,correct:false}))
let currentWordIndex = -1;
let skip = true;
console.log(mappedWordList)

let spellingList = document.querySelector('#spellingList');

mappedWordList.forEach(word =>{
    let listItem = document.createElement('li');
    listItem.innerText=word.name;
    spellingList.appendChild(listItem);
    
} )



speechSynthesis.addEventListener('voiceschanged', () => {
    let voices = speechSynthesis.getVoices();
    voices = voices.filter(voice => voice.lang === 'en-US')
    let selectedVoice = voices[2];
    console.log("hello ", voices)
    voices.forEach(voice => {
        let voiceOption = document.createElement('option');
        voiceOption.innerText = voice.name;
        if(voice.voiceURI === "Microsoft David Desktop - English (United States)"){
            voiceOption.selected = "true"
        }
        document.querySelector('#voices').appendChild(voiceOption)
        document.querySelector('#voices').addEventListener('change', (e)=>{
            selectedVoice = voices[e.target.options.selectedIndex]
        })
    }
    )
    document.querySelector('#skip').addEventListener('click', ()=>{
        if (currentWordIndex < wordList.length - 1){
            currentWordIndex++;
        }
    })

    document.querySelector('#back').addEventListener('click', ()=>{
        if (currentWordIndex > - 1){
            currentWordIndex--;
        }
     
    })
    
    speak.addEventListener('click', () => {
        if (currentWordIndex < wordList.length - 1){
            currentWordIndex++;
        }
        // console.log('clicked')
        // let word = document.querySelector('#word');
        // console.log(word.value)
        // let text = new SpeechSynthesisUtterance(word.value);
      
        let text = new SpeechSynthesisUtterance(wordList[currentWordIndex]);
        text.rate = 1;
        text.voice = selectedVoice
        speechSynthesis.speak(text)
        // word.value.split('').forEach(letter => {
        //     let letterObj = new SpeechSynthesisUtterance(letter)
        //     letterObj.voice = selectedVoice
        //     letterObj.rate = 1;
        //     letterObj.volume = 1;
        //     console.log(letterObj)
        //     speechSynthesis.speak(letterObj)
        // })
        wordList[currentWordIndex].split('').forEach(letter => {
            let letterObj = new SpeechSynthesisUtterance(letter)
            letterObj.voice = selectedVoice
            letterObj.rate = 1;
            letterObj.volume = 1;
            console.log(letterObj)
            speechSynthesis.speak(letterObj)
        })
        speechSynthesis.speak(text)
        console.log(speechSynthesis)

        spellingList.innerHTML = '';
        // mappedWordList[2].correct= true;
        
        mappedWordList.forEach((word, index)=>{
            let listItem = document.createElement('li');
            listItem.innerText=word.name;
            if(word.correct){
                listItem.innerText= "";
            }
            if (currentWordIndex === index){
                listItem.style.color = "red"
            } else {
                listItem.style.color = "black"
            }
            spellingList.appendChild(listItem);
    
        } )


    })
})


