const axios = require('axios');

const COMMON_WORDS = "it an and the I and of me very I that in quite ed you but to ing way he or for the er they as with more be we if on most have she when at from the be to of and a in that have it for not who is on with he as you do".split(" ")

window.onload = () => {
    
    getWords("javascript").then(data => {
        let wordsArr = [];
        while (wordsArr.length <= 40) {
            data.forEach((object) => {
                wordsArr.push(object.word);
            });
        }
        
        let allWords = wordsArr.concat(COMMON_WORDS);
        allWords.sort(() => Math.random() - 0.5);
        allWords = allWords.filter((a, b) => allWords.indexOf(a) === b);
        allWords.forEach((word, idx) => {
            addWord(word, idx);
        });
        for (let i = allWords.length - 1; i >= 0; i--) {
            const wordRect = document.getElementById(`word-${i}`)
            const rect = wordRect.getBoundingClientRect();
            // debugger;
            const degrees = -3 + Math.random() * 6;

            // console.log(rect.top, rect.right, rect.bottom, rect.left);
            wordRect.style.position = "absolute";
            wordRect.style.left = rect.left + "px";
            wordRect.style.top = rect.top + "px";
            wordRect.style.transform = `rotate(${degrees}deg)`;
        }
    })
    
    const searchForm = document.getElementById("search-form");
    
    searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // debugger;
            const searchWord = document.getElementById("search-word").value
            const wordsDiv = document.getElementById("words");
            while (wordsDiv.firstChild) {
              wordsDiv.removeChild(wordsDiv.firstChild);
            }
            let searchArr = [];
                // console.log(searchWord)
                getWords(searchWord).then(data => {
                    while (searchArr.length <= 40) {
                        data.forEach(object => {
                            searchArr.push(object.word);
                        });
                    }
            // console.log(searchArr.length)
            let allWords = searchArr.concat(COMMON_WORDS);
            allWords.push(searchWord);
            allWords.sort(() => Math.random() - 0.5);
            allWords = allWords.filter((a, b) => allWords.indexOf(a) === b);
            // console.log(allWords);
            allWords.forEach((word, idx) => {
                addWord(word, idx);
            });
            for (let i = allWords.length - 1; i >= 0; i--) {
                const wordRect = document.getElementById(`word-${i}`)
                const rect = wordRect.getBoundingClientRect();
                // debugger;
                const degrees = -3 + Math.random() * 6;

                // console.log(rect.top, rect.right, rect.bottom, rect.left);
                wordRect.style.position = "absolute";
                wordRect.style.left = rect.left + "px";
                wordRect.style.top = rect.top + "px";
                wordRect.style.transform = `rotate(${degrees}deg)`;
            }
        });
      },
      false
    );

    const customForm = document.getElementById("custom-form");
    
    customForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const customWord = document.getElementById("custom-word").value;
            const wordsDiv = document.getElementById("words");
            const lastSpanId = wordsDiv.lastElementChild.id;
            const newWordIdx = parseInt(lastSpanId.split("-")[1]) + 2
            addWord(customWord, newWordIdx)
            console.log(customWord);
            console.log(newWordIdx);
            console.log("hello");
            document.getElementById("custom-word").value = "";
            const wordRect = document.getElementById(`word-${newWordIdx}`);
            const rect = wordRect.getBoundingClientRect();
            const degrees = -3 + Math.random() * 6;
            // const rect = wordRect.getBoundingClientRect();
            wordRect.style.position = "absolute";
            wordRect.style.left = "160px";
            wordRect.style.top = "220px";
            wordRect.style.zIndex = 2;
            wordRect.style.transform = `rotate(${degrees}deg)`;


        },
        false
    );

    document.addEventListener("mouseover", e => {
        if (e.target.className === "word") {
            dragWord(e.target.id)
        }
    })
    let zCounter = 0;
    const dragWord = wordId => {
        if (!wordId) return;
        const word = document.getElementById(wordId);

        word.onmousedown = event => {
            zCounter += 1;
            // let shiftX = event.clientX - word.getBoundingClientRect().left;
            // let shiftY = event.clientY - word.getBoundingClientRect().top;
            word.style.position = "absolute";
            word.style.zIndex = zCounter;
            word.style.cursor = "grabbing";
            word.style.filter = "drop-shadow(3px 3px 3px grey)";

            // document.body.append(word);

            
            const moveAt = (pageX, pageY) => {
                word.style.left = pageX - (word.offsetWidth / 2) - 3 + "px";
                word.style.top = pageY - (word.offsetHeight / 2) - 3 + "px";
            };
            
            const onMouseMove = (event) => {
                moveAt(event.pageX, event.pageY);
            };
            
            moveAt(event.pageX, event.pageY);
            document.addEventListener("mousemove", onMouseMove);

            word.onmouseup = () => {
                document.removeEventListener("mousemove", onMouseMove);
                word.onmouseup = null;
                word.style.cursor = "grab";
                word.style.filter = "";
            };
        };
        word.ondragstart = () => {
            return false;
        };
    };
};

const getWords = searchWord => {
    return axios
      .get(`/words?rel_trg=${searchWord}`)
      .then(response => {
        return response.data
    })
      .catch(function(error) {
        console.log(error);
    });
}

const addWord = (word, idx) => {
    const wordSpan = document.createElement("span");
    wordSpan.innerHTML = word;
    wordSpan.className = "word"; 
    wordSpan.id = `word-${idx}`;
    wordSpan.style.zIndex = 0;
    // wordSpan.style.position = "relative";
    // wordSpan.style.transform = `rotate(5deg)`;
    // wordSpan.style.color = `blue`;
    document.getElementById("words").appendChild(wordSpan);
};