const axios = require('axios');

const COMMON_WORDS = "it and of me very I that in quite ed you but to ing way he or for the er they as with more be we if on most have she when at from the be to of and a in that have it for not who is on with he as you do".split(" ")

window.onload = () => {

    let wordsArr = []

    getWords("dog").then(data => {
        console.log(data)
        data.forEach((object) => {
            wordsArr.push(object.word);
        });

        const allWords = wordsArr.concat(COMMON_WORDS);
        allWords.sort(() => Math.random() - 0.5);
        allWords.forEach((word, idx) => {
            addWord(word, idx);
        });
    })

    document.addEventListener("mouseover", e => dragWord(e.target.id));

    const dragWord = wordId => {
        if (!wordId) return;
        const word = document.getElementById(wordId);

        word.onmousedown = event => {
            word.style.position = "absolute";
            word.style.zIndex = 1000;
            // document.body.append(word);

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
            word.style.left = pageX - word.offsetWidth / 2 + "px";
            word.style.top = pageY - word.offsetHeight / 2 + "px";
            }

            function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            }

            document.addEventListener("mousemove", onMouseMove);

            word.onmouseup = function() {
            document.removeEventListener("mousemove", onMouseMove);
            word.onmouseup = null;
            };
        };
        word.ondragstart = function() {
            return false;
        };
    };
};

const getWords = searchWord => {
    return axios
      .get(`/words?rel_trg=${searchWord}`)
      .then(response => {
        return response.data
        // // console.log(response.data);
        // let wordsArr = []
        // response.data.forEach((object) => {
        //     wordsArr.push(object.word);
        // });
        // console.log(wordsArr);
        // return wordsArr
    })
      .catch(function(error) {
        console.log(error);
    });
}

const addWord = (word, idx) => {
  const wordSpan = document.createElement("span");
  wordSpan.innerHTML = word;
  wordSpan.className = "word"; 
  wordSpan.id = `word-${idx}`
  document.getElementById("words").appendChild(wordSpan);
};