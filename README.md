# JSMagneticPoetry

![alt text](https://i.imgur.com/qxgPhLW.gif "Demonstration GIF")


# Table of Contents
1. #### [Introduction](https://github.com/sparklerfish/JSMagneticPoetry#introduction-1)
2. #### [Technologies](https://github.com/sparklerfish/JSMagneticPoetry#technologies-1)
3. #### [Features](https://github.com/sparklerfish/JSMagneticPoetry#features-1)
4. #### [Future Direction](https://github.com/sparklerfish/JSMagneticPoetry#future-direction-1)

---

## Introduction
JSMagneticPoetry is a web implementation of Magnetic Poetry fridge magnets. It is fully customizable. Users can create custom word lists inspired by an input word, sourced via [Datamuse API](https://www.datamuse.com/api/).

[Live link to JSMagneticPoetry!](https://js-magnetic-poetry.herokuapp.com)

---

## Technologies
#### Backend
JSMagneticPoetry has a Node.js backend to make Axios requests to fetch words from the [Datamuse API](https://www.datamuse.com/api/).

#### Frontend
JSMagneticPoetry is implemented with JavaScript, HTML5, and CSS3. D3.js is integrated for grouping, selecting, and modifying HTML elements for style customization. User preferences are remembered in localStorage so newly created words and word lists retain consistent customization.

```javascript
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
```

---

## Features
* Users can arrange words to create poems
* Users can customize the word selection
  * Generate word lists based on an input word
  * Add a custom word
* Users can customize the word style
  * Change font, size, and colors of word magnets

---

## Future Direction
* Save and share poems
* Multiple selection to drag and move groups of words at once
* Additional customization including better color picker
* Ability to play with friends