console.log("Webpack is working!");

// const words = [];
// let newWord = "test";
// let newDiv = document.createElement("div");

// const words = document.getElementsByClassName("word");


window.onload = function() {
    
    const word = document.getElementById("word-1");
    
    word.onmousedown = function(event) {
        word.style.position = 'absolute';
        word.style.zIndex = 1000;
        // document.body.append(word);
    
        moveAt(event.pageX, event.pageY);
        
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
    };


};

function handleDrag(event) {
    
}