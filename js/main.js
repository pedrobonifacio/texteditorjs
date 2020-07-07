//API GOOGLE FONTS 

/*YOUR API KEY*/
const apiKey = "AIzaSyD4wdXbupemfCte1ezohgcSm0bAv3ROe0Q";
const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;
let fontsDiv = document.getElementById("fontsDiv");
let fontSelect = document.getElementById("font");

async function getFonts(){
  if(localStorage.getItem("fonts") === null){
    await fetch("https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=" + apiKey, )
    .then((response) => {
      response.json().then((result) => {
        localStorage.setItem("fonts",JSON.stringify(result.items));
      });
    })
    .catch((err) => console.error("Request error", err));
  } 
}
async function loadFonts() {
  let fontsStorage = JSON.parse(localStorage.getItem("fonts"));

  for(let i = 0; i < fontsStorage.length; i++){
    let option = document.createElement("option");
    option.value = i
    option.text = fontsStorage[i].family
    fontSelect.appendChild(option)

    const font = new FontFace(
      fontsStorage[i],
      `url(${fontsStorage[i].files.regular}) format("truetype")`,
    );
    // wait for font to be loaded
    await font.load()
    .then((font)=>{
      document.fonts.add(font);

    })
    .catch(err => {
      console.log(err)
    });
    // add font to document
    //document.fonts.add(font);
    // enable font with CSS class
    document.body.classList.add('fonts-loaded')
  }
}

getFonts();
loadFonts();


/*shortcuts*/
document.addEventListener("keyup", (e) => {
  if (e.ctrlKey && e.key == "z") changeText(1);
  if (e.ctrlKey && e.key == "y") changeText(2);
  if (e.ctrlKey && e.altKey && e.key == "z") change(1);
  if (e.ctrlKey && e.altKey && e.key == "y") change(2);
  if (e.ctrlKey && e.key == "u") changeStyle(1);
  if (e.ctrlKey && e.key == "i") changeStyle(2);
  if (e.ctrlKey && e.key == "b") changeStyle(3);
  if (e.altKey && e.key == "h") changeAlign(1);
  if (e.altKey && e.key == "j") changeAlign(2);
  if (e.altKey && e.key == "g") changeAlign(3);
  if (e.altKey && e.key == "k") changeAlign(4);

});

const changes = [
  {
    font: "--font-Roboto",
    styles: {
      bold: false,
      underline: false,
      italic: false,
    },
    size: 12,
    color: "#000",
    align: "justify",
  },
];
const changesText = [];
let style = {
  font: "--font-Roboto",
  styles: {
    bold: false,
    underline: false,
    italic: false,
  },
  size: 12,
  color: "#000000",
  align: "justify",
};
let indexStyle = 0;
let indexText = 0;
const text = document.getElementById("text");

function changeFont() {
  let fontValue = document.getElementById("font").value;
  let fontsStorage = JSON.parse(localStorage.getItem("fonts"))
  text.style.fontFamily = `${fontsStorage[fontValue].family}, ${fontsStorage[fontValue].category}`;
  changes.push({
    font: fontValue,
    styles: style.styles,
    size: style.size,
    color: style.color,
    align: style.align,
  });
  style = {
    font: fontValue,
    styles: style.styles,
    size: style.size,
    color: style.color,
    align: style.align,
  };
  indexStyle = changes.length - 1;
}
function changeStyle(type) {
  if (type == 1) {
    if (style.styles.underline) {
      text.style.textDecoration = "none";
      changes.push({
        font: style.font,
        styles: {
          bold: style.styles.bold,
          underline: false,
          italic: style.styles.italic,
        },
        size: style.size,
        color: style.color,
        align: style.align,
      });
      style = {
        font: style.font,
        styles: {
          bold: style.styles.bold,
          underline: false,
          italic: style.styles.italic,
        },
        size: style.size,
        color: style.color,
        align: style.align,
      };
    } else {
      text.style.textDecoration = "underline";
      changes.push({
        font: style.font,
        styles: {
          bold: style.styles.bold,
          underline: true,
          italic: style.styles.italic,
        },
        size: style.size,
        color: style.color,
        align: style.align,
      });
      style = {
        font: style.font,
        styles: {
          bold: style.styles.bold,
          underline: true,
          italic: style.styles.italic,
        },
        size: style.size,
        color: style.color,
        align: style.align,
      };
    }
  }
  if (type == 2) {
    if (style.styles.italic) {
      text.style.fontStyle = "normal";
      changes.push({
        font: style.font,
        styles: {
          bold: style.styles.bold,
          underline: style.styles.underline,
          italic: false,
        },
        size: style.size,
        color: style.color,
        align: style.align,
      });
      style = {
        font: style.font,
        styles: {
          bold: style.styles.bold,
          underline: style.styles.underline,
          italic: false,
        },
        size: style.size,
        color: style.color,
        align: style.align,
      };
    } else {
      text.style.fontStyle = "italic";
      changes.push({
        font: style.font,
        styles: {
          bold: style.styles.bold,
          underline: style.styles.underline,
          italic: true,
        },
        size: style.size,
        color: style.color,
        align: style.align,
      });
      style = {
        font: style.font,
        styles: {
          bold: style.styles.bold,
          underline: style.styles.underline,
          italic: true,
        },
        size: style.size,
        color: style.color,
        align: style.align,
      };
    }
  }
  if (type == 3) {
    if (style.styles.bold) {
      text.style.fontWeight = "normal";
      changes.push({
        font: style.font,
        styles: {
          bold: false,
          underline: style.styles.underline,
          italic: style.styles.italic,
        },
        size: style.size,
        color: style.color,
        align: style.align,
      });
      style = {
        font: style.font,
        styles: {
          bold: false,
          underline: style.styles.underline,
          italic: style.styles.italic,
        },
        size: style.size,
        color: style.color,
        align: style.align,
      };
    } else {
      text.style.fontWeight = "bold";
      changes.push({
        font: style.font,
        styles: {
          bold: true,
          underline: style.styles.underline,
          italic: style.styles.italic,
        },
        size: style.size,
        color: style.color,
        align: style.align,
      });
      style = {
        font: style.font,
        styles: {
          bold: true,
          underline: style.styles.underline,
          italic: style.styles.italic,
        },
        size: style.size,
        color: style.color,
        align: style.align,
      };
    }
  }
  indexStyle = changes.length - 1;
}
function changeColor() {
  let colorValue = document.getElementById("color").value;
  text.style.color = colorValue;
  changes.push({
    font: style.font,
    styles: style.styles,
    size: style.size,
    color: colorValue,
    align: style.align,
  });
  style = {
    font: style.font,
    styles: style.styles,
    size: style.size,
    color: colorValue,
    align: style.align,
  };
  indexStyle = changes.length - 1;
}
function changeFontSize() {
  let fontSizeValue = document.getElementById("fontSize").value;
  text.style.fontSize = `${fontSizeValue}pt`;
  changes.push({
    font: style.font,
    styles: style.styles,
    size: fontSizeValue,
    color: style.color,
    align: style.align,
  });
  style = {
    font: style.font,
    styles: style.styles,
    size: fontSizeValue,
    color: style.color,
    align: style.align,
  };
  indexStyle = changes.length - 1;
}
function changeAlign(typeAlign) {
  let textAlign;
  if (typeAlign == 1) {
    text.style.textAlign = "center";
    textAlign = "center";
  }
  if (typeAlign == 2) {
    text.style.textAlign = "justify";
    textAlign = "justify";
  }
  if (typeAlign == 3) {
    text.style.textAlign = "start";
    textAlign = "start";
  }
  if (typeAlign == 4) {
    text.style.textAlign = "end";
    textAlign = "end";
  }

  changes.push({
    font: style.font,
    styles: style.styles,
    size: style.size,
    color: style.color,
    align: textAlign,
  });
  style = {
    font: style.font,
    styles: style.styles,
    size: style.size,
    color: style.color,
    align: textAlign,
  };
  indexStyle = changes.length - 1;
}
function focusP() {
  text.focus();
}
function change(typeChange) {
  let inputColor = document.getElementById("color");
  let inputFontSize = document.getElementById("fontSize");

  if (typeChange == 1)
    if (!indexStyle == 0) indexStyle--;
    else if (typeChange == 2) if (indexStyle < changes.length - 1) indexStyle++;

  text.style.fontFamily = `var(${changes[indexStyle].font})`;

  if (changes[indexStyle].styles.bold) text.style.fontWeight = "bold";
  else text.style.fontWeight = "normal";

  if (changes[indexStyle].styles.underline)
    text.style.textDecoration = "underline";
  else text.style.textDecoration = "normal";

  if (changes[indexStyle].styles.italic) text.style.fontStyle = "italic";
  else text.style.fontStyle = "normal";

  text.style.textAlign = changes[indexStyle].align;

  text.style.fontSize = `${changes[indexStyle].size}pt`;
  inputFontSize.value = changes[indexStyle].size;

  text.style.color = changes[indexStyle].color;
  inputColor.value = changes[indexStyle].color;

  style = changes[indexStyle];
}
function changeText(typeChange) {
  if (typeChange == 1) if (!indexText == 0) indexText--;
  if (typeChange == 2) if (indexText < changesText.length - 1) indexText++;
  text.textContent = changesText[indexText];
}
function changeTextArr() {
  changesText.push(text.textContent);
  indexText = changesText.length - 1;
}
function changeImage(event) {
  let reader = new FileReader();
  reader.onload = function () {
    let editorImg = document.getElementById("editorImg");
    let boxImg = document.getElementById("boxImg");
    editorImg.src = reader.result;
    boxImg.style.display = "block";
  };
  reader.readAsDataURL(event.target.files[0]);
}
function exitEditorImage() {
  let boxImg = document.getElementById("boxImg");
  boxImg.style.display = "none";
}
