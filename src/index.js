// import { createSecureContext } from "tls";

console.log("Webpack is working!");

// const words = [];
// let newWord = "test";
// let newDiv = document.createElement("div");

// const words = document.getElementsByClassName("word");


window.onload = function() {
    // async function apiGetAll() {
    //   try {
    //     const resp = await fetch(
    //       "https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?rel_trg=cow"
    //     );
    //     console.log(resp.json());
    //     return resp.json();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // apiGetAll();

    // let words;
    // fetch(
    //   "https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?rel_trg=cow"
    // )
    //   .then(response => {
    //     words = response.json();
    //     return words;
    //   })
    // //   console.log(words)
    
    // let wordId;
    document.addEventListener("mouseover", e => dragWord(e.target.id));
    // console.log(wordId)

    const dragWord = wordId => {
        if (!wordId) return;
        const word = document.getElementById(wordId);
    
        word.onmousedown = function(event) {
            word.style.position = 'absolute';
            word.style.zIndex = 1000;
            // document.body.append(word);
        
            moveAt(event.pageX, event.pageY);
            console.log(event.currentTarget.id)
            
            function moveAt(pageX, pageY) {
                word.style.left = pageX - word.offsetWidth / 2 + 'px';
                word.style.top = pageY - word.offsetHeight / 2 + 'px';
            }
        
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY)
            }
        
            document.addEventListener('mousemove', onMouseMove);
        
            word.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                word.onmouseup = null;
            }
        }
        word.ondragstart = function() {
          return false;
        }
    
    };



};