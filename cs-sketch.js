// cs-sketch.js; P5 key animation & input fcns.  // CF p5js.org/reference
// Time-stamp: <2021-09-28 16:54:18 Chuck Siska>

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size: 10, wid: 64, hgt: 4 }; // JS Global var, w canvas size info.

function setup() {
  // P5 Setup Fcn
  let sz = g_canvas.cell_size;
  let width = sz * g_canvas.wid; // Our 'canvas' uses cells of given size, not 1x1 pixels.
  let height = sz * g_canvas.hgt;
  createCanvas(width, height); // Make a P5 canvas.
  draw_grid(20, 20, "white", "yellow");

  // Setup input-box for input and a callback fcn when button is pressed.
  greeting_1 = createElement("h4", "Plaintext");
  greeting_1.position(10, 10);
  g_input_1 = createInput(); // Create an input box, editable.
  g_input_1.position(90, 30); // Put box on page.

  // Setup input-box for input and a callback fcn when button is pressed.
  greeting_2 = createElement("h4", "Password");
  greeting_2.position(10, 40);
  g_input_2 = createInput(); // Create an input box, editable.
  g_input_2.position(90, 60); // Put box on page.

  g_button = createButton("Submit"); // Create button to help get input data.
  g_button.position(140, 90); // Put button on page.
  g_button.mousePressed(retrieve_input); // Hook button press to callback fcn.
}

// Callback to get Input-box data.
function retrieve_input() {
  var data_1 = g_input_1.value(); // Get data from Input box.
  var data_2 = g_input_2.value(); // Get data from Input box.
  // Testing input
  if (isValidPlaintext(data_1) && isValidPassword(data_2)) {
    console.log("Plaintext: " + '"' + data_1 + '"'); // Show data in F12 Console output.
    console.log("Password = " + '"' + data_2 + '"'); // Show data in F12 Console output.
    plaintextSplitter(data_1, data_2);
  } else {
    if (!isValidPlaintext(data_1)) {
      console.error("Invalid Plaintext");
      // alert("Invalid Plaintext");
    }
    if (!isValidPassword(data_2)) {
      console.error("Invalid Password");
      // alert("Invalid Password");
    }
  }
}

// Fixed 27 character printable plaintext
function isValidPlaintext(str) {
  if (str.length < 1 || str.length > 27) {
    // console.error(str.length);
    return false;
  } else {
    let re = /^[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*$/i;
    // console.log(str.length);
    return re.test(str);
  }
}

// Fixed 8 character password, with at least a symbol, upper, lower case letters, and a number
function isValidPassword(str) {
  let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,8}$/;
  return re.test(str);
}

function plaintextSplitter(plaintext, password) {
  var arrStr = [];
  var fullStr = plaintext.padEnd(28);
  var start = 0;
  var end = 7;
  var counter = 1;
  while (counter < 5) {
    let substr = counter + fullStr.slice(start, end);
    arrStr.push(substr);
    start = end;
    end += 7;
    counter++;
  }
  console.log("arrStr: ", arrStr);

  var joinedStr = arrStr.join("");
  var cyphertext = encryption(joinedStr, password);
  var oriStrLen = plaintext.length;
  drawText(joinedStr, cyphertext, oriStrLen);
}

function drawText(plaintext, cyphertext, oriStrLen) {
  console.log("oriStrLen", oriStrLen);
  var zx = String.fromCharCode(oriStrLen + 32);

  for (let i = 0; i < cyphertext.length - 1; i++) {
    text(plaintext[i], 6 + i * 20, 14);
    text(cyphertext[i], 6 + i * 20, 34);
    // console.log(i + 1 + ":", joinedStr[i]);
  }

  text(zx, 6 + 31 * 20, 14);
  text(cyphertext[31], 6 + 31 * 20, 34);
}

function encryption(plaintext, password) {
  let counter = 0;
  let limit = 0;
  let cyphertext = "";

  for (var p of password) {
    while (limit < 4) {
      cyphertext += charCypher(plaintext[counter], p);
      counter++;
      // console.log("counter", counter);
      limit++;
      // console.log("limit", limit);
    }
    limit = 0;
  }
  return cyphertext;
}

function charCypher(msgChar, pswdChar) {
  let ax = msgChar.charCodeAt(0) - 32;
  let px = pswdChar.charCodeAt(0) - 32;

  let bx = ax ^ px;
  let cx = bx + 32;

  return String.fromCharCode(cx);
}
