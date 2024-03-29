// const d3 = require("d3-selection");
// const axios = require('axios');
import d3 from 'd3-selection';
import axios from 'axios';

const COMMON_WORDS = "it an and am the I and of me very I that in ed you but to ing way he or for the er they as with more be we if on most have she when at from the be to of and a in that have it for not who is on with he as you do".split(" ")

window.onload = () => {
    localStorage.clear();
    d3.selectAll(".font-size").style("font-family", "Times New Roman");

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
            const degrees = -3 + Math.random() * 6;

            wordRect.style.position = "absolute";
            wordRect.style.left = rect.left + "px";
            wordRect.style.top = rect.top + "px";
            wordRect.style.transform = `rotate(${degrees}deg)`;
        }
    });
    
    const searchForm = document.getElementById("search-form");
    
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchWord = document.getElementById("search-word").value
        document.getElementById("search-word").value = "";
        if (searchWord.length === 0) {
            displayError("Please enter a word")
            return;
        } else {
            let searchArr = [];

            getWords(searchWord)
            .then(data => {
                if (data.length === 0) {
                    displayError("No words found!")
                    return;
                }

                const wordsDiv = document.getElementById("words");
                while (wordsDiv.firstChild) {
                    wordsDiv.removeChild(wordsDiv.firstChild);
                }

                while (searchArr.length <= 40) {
                    data.forEach(object => {
                        searchArr.push(object.word);
                    });
                }

                let allWords = searchArr.concat(COMMON_WORDS);
                allWords.push(searchWord);
                allWords.sort(() => Math.random() - 0.5);
                allWords = allWords.filter(
                    (a, b) => allWords.indexOf(a) === b
                );
                allWords.forEach((word, idx) => {
                    addWord(word, idx);
                });

                for (let i = allWords.length - 1; i >= 0; i--) {
                    const wordRect = document.getElementById(`word-${i}`);
                    const rect = wordRect.getBoundingClientRect();
                    const degrees = -3 + Math.random() * 6;

                    wordRect.style.position = "absolute";
                    wordRect.style.left = rect.left + "px";
                    wordRect.style.top = rect.top + "px";
                    wordRect.style.transform = `rotate(${degrees}deg)`;
                }
            })
        }
    }, false);

    const customForm = document.getElementById("custom-form");
    
    customForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const customWord = document.getElementById("custom-word").value;
            if (customWord.length === 0) {
                displayError("  Please enter a word");
                return
            };
            const wordsDiv = document.getElementById("words");
            const lastSpanId = wordsDiv.lastElementChild.id;
            const newWordIdx = parseInt(lastSpanId.split("-")[1]) + 2
            addWord(customWord, newWordIdx)
            document.getElementById("custom-word").value = "";
            const wordRect = document.getElementById(`word-${newWordIdx}`);
            const degrees = -3 + Math.random() * 6;
            wordRect.style.position = "absolute";
            wordRect.style.left = "50px";
            wordRect.style.top = "210px";
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
    let zCounter = 1;
    const dragWord = wordId => {
        if (!wordId) return;
        const word = document.getElementById(wordId);

        word.onmousedown = event => {
            zCounter += 1;
            word.style.position = "absolute";
            word.style.zIndex = zCounter;
            word.style.cursor = "grabbing";
            word.style.filter = "drop-shadow(3px 3px 3px grey)";
            
            const moveAt = (pageX, pageY) => {
                word.style.left = pageX - (word.offsetWidth / 2) + "px";
                word.style.top = pageY - (word.offsetHeight / 2) + "px";
            };
            
            let currentDroppable = null;

            
            const onMouseMove = (event) => {
                moveAt(event.pageX, event.pageY);
                word.hidden = true;
                let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                word.hidden = false;
                
                if (!elemBelow) return;
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

    const words = document.getElementsByClassName("word");

    const fontPicker = document.getElementById("font-drop");
    const fontSizePicker = document.getElementById("font-size-drop");
    const magnetColorPicker = document.getElementById("magnet-color-drop");
    const textColorPicker = document.getElementById("text-color-drop");

    
    const updateColor = e => {
        const element = e.target.id.split("_")[0];
        const color = e.target.id.split("_")[1];
        d3.selectAll(".word").style(element, color)
        localStorage.setItem(element, color);
    };
    
    const updateFont = e => {
        d3.selectAll(".word").style("font-family", e.target.innerHTML);
        localStorage.setItem("fontFamily", e.target.innerHTML);
        d3.selectAll(".font-size").style("font-family", e.target.innerHTML);
    };
    
    const updateFontSize = e => {
        d3.selectAll(".word").style("font-size", e.target.innerHTML);
        localStorage.setItem("fontSize", e.target.innerHTML);
    };

    fontPicker.addEventListener("click", updateFont);
    fontSizePicker.addEventListener("click", updateFontSize);
    magnetColorPicker.addEventListener("click", updateColor);
    textColorPicker.addEventListener("click", updateColor);
};

/**
 * Returns an asynchronous request to the DataMuse API which returns
 * the data from the related words query response.
 * 
 * @param {String} searchWord The word to be queried in the DataMuse API.
 */
const getWords = searchWord => {
    return axios
      .get(`/words?rel_trg=${searchWord}`)
      .then(response => {
        return response.data
    })
}

/**
 * Creates a new span element with the text of "word" and the id of idx.
 * Checks for customization preferences in localStorage and applies it to the
 * word element.  Appends the word to the "words" parent element.
 * 
 * @param {String} word The word to add
 * @param {Number} idx The index of the word in the list
 */
const addWord = (word, idx) => {
    const wordSpan = document.createElement("span");
    wordSpan.innerHTML = word;
    wordSpan.className = "word"; 
    wordSpan.id = `word-${idx}`;
    wordSpan.style.zIndex = 0;
    if (localStorage.getItem("fontSize")){
        wordSpan.style.fontSize = localStorage.getItem("fontSize");
    }
    if (localStorage.getItem("fontFamily")){
        wordSpan.style.fontFamily = localStorage.getItem("fontFamily");
    }
    if (localStorage.getItem("color")){
        wordSpan.style.color = localStorage.getItem("color");
    }
    if (localStorage.getItem("background-color")){
        wordSpan.style.backgroundColor = localStorage.getItem("background-color");
    }
    document.getElementById("words").appendChild(wordSpan);
};
/**
 * Toggles the visibility of the error alert box and displays the error entered as parameter
 * 
 * @param {String} error The error text to be displayed in the alert box
 */
const displayError = error => {
    const alertBox = document.getElementById("alert");
    const alertText= document.getElementById("alert-text");
    alertBox.style.display = "block";
    alertText.innerHTML = error;
    const closeButton = document.getElementById("alert-close");
    closeButton.addEventListener("click", e => {
        alertBox.style.display = "none";
    })
}