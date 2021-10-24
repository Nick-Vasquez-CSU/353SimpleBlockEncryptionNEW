// cs-sketch.js; P5 key animation & input fcns.  // CF p5js.org/reference
/*
    Team Name: 3NB
        Nicolas Vasquez : nickvas67@csu.fullerton.edu
        Nathan Vu       : mr.nathanvu@csu.fullerton.edu
        Bryant Nguyen   : bryantdnguyen@csu.fullerton.edu
        Nicholas Jones  : nicholasj898@csu.fullerton.edu
        
    Takes two inputs for plaintext and password and encrypts them with the result
    being displayed on the website
*/

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:20, wid:40, hgt:2.5 }; // JS Global var, w canvas size info.

var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 24; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.
var g_input; // My input box.
var g_button; // Button for my input box.


function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    draw_grid( 25, 8, 'white', 'yellow' );

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
    g_button.mousePressed(retrieve_input_1); // Hook button press to callback fcn.

}


//---------------------------------------------------Getting User Input---------------------------------------------------
// Callback to get Input-box data.

/*
function retrieve_input_1()
{
    var data_1 = g_input_1.value(); // Get data from Input box.
    var data_2 = g_input_2.value(); // Get data from Input box.
    var arrayG = [];
    // Testing input
    if (check_plaintxt(data_1)) {
        console.log("Plaintext = " + data_1); // Show data in F12 Console output.
        
        //data_1 = plaintxt_pad(data_1);
        arrayG = plaintextSplitter(data_1);
        data_1 = drawText(arrayG);
        displayText(data_1);
        
    } else {
        console.error("Invalid Plaintext");
        alert("Invalid Plaintext");
    }
    if (check_comp8(data_2)) {
        console.log("Password = " + data_2); // Show data in F12 Console output.
    } else {
        console.error("Invalid Password");
        alert("Invalid Password");
    }
    //Start Encryption 
    var encryptedMsg = encryptStart(data_1, data_2);
    displayCypher(encryptedMsg);

}*/

function retrieve_input_1() {
    var data_1 = g_input_1.value(); // Get data from Input box.
    var data_2 = g_input_2.value(); // Get data from Input box.
    // Testing input 
    var isValidPassword = check_comp8(data_2);
    if (isValidPlaintext(data_1) && isValidPassword) {
      console.log("Plaintext: " + '"' + data_1 + '"'); // Show data in F12 Console output.
      console.log("Password = " + '"' + data_2 + '"'); // Show data in F12 Console output.
      plaintextSplitter(data_1, data_2);
      //data_1 = drawText(arrayG);
      //displayText(data_1);
      //var encryptedMsg = encryptStart(data_1, data_2);
      //displayCypher(encryptedMsg);
    } else {
      if (!isValidPlaintext(data_1)) {
        console.error("Invalid Plaintext");
        // alert("Invalid Plaintext");
      }
      if (!isValidPassword) {
        console.error("Invalid Password");
        // alert("Invalid Password");
      }
    }
} 

//------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------Checking User Input---------------------------------------------------
function check_comp8(value)
{   
    //Comprehensive8 checking requirements
    var isLengthEight = false;
    var hasDigit = false;
    var hasOneUpperCase = false;
    var hasOneLowerCase = false;
    var hasSymbol = false;
    
    var user_data = value;

    isLengthEight = check_isLengthEight(user_data);
    hasDigit = check_hasDigit(user_data); //*Reminder* isNaN returns false when ONLY integers are entered i.e. '123456789'
    hasOneUpperCase = check_hasOneUpperCase(user_data);
    hasOneLowerCase = check_hasOneLowerCase(user_data);
    hasSymbol = check_hasSymbol(user_data);
        //console.log("hasDigit: " + hasDigit);
        //console.log("hasOneUpperCase: " + hasOneUpperCase);
        //console.log("hasOneLowerCase: " + hasOneLowerCase);
        //console.log("hasSymbol: " + hasSymbol);
    if(isLengthEight && hasDigit && hasOneUpperCase && hasOneLowerCase && hasSymbol)
    {
        //console.log("Password meets Comp8 requirements: " + user_data);
        return true;
    }
    else
    {
        console.log("Password doesn't meet Comp8 requirements: " + user_data);
        return false;
    }

}

function check_plaintxt(value)
{
    var isLengthValid = check_isLengthValid(value);

    if(isLengthValid)
    {
        //console.log("Plaintext meets requirements: " + value);
        return true;
    }
    else
    {
        //console.log("Plaintext doesn't meet requirements, must be less than or equal to  27 chars: " + value);
        return false;
    }

}

function check_isLengthValid(user_data)
{
    if(user_data.length > 27)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function check_isLengthEight(user_data)
{
    if(user_data.length == 8)
    {
        //console.log("Password has a length of 8: " + user_data);
        return true;
    }
    else
    {
        return false;
    }
}

function check_hasDigit(user_data)
{
    var hasNum = /\d/;
    return hasNum.test(user_data)
}

function check_hasOneUpperCase(user_data)
{
    for(var i = 0; i < user_data.length; i++)
    {
        if(!isNaN(user_data[0]))//Check if the character is a number first. To prevent compile issues with '.toUpperCase()'
        {
            //console.log("This character " + user_data[0] + " is a number!")
        }
        else(user_data[0] == user_data[0].toUpperCase())
        {
            return true;
        }
    }
    return false;
}

function check_hasOneLowerCase(user_data)
{
    for(var i = 0; i < user_data.length; i++)
    {
        if(!isNaN(user_data[0]))//Check if the character is a number first. To prevent compile issues with '.toLowerCase()'
        {
            //console.log("This character " + user_data[0] + " is a number!")
        }
        else(user_data[0] == user_data[0].toLowerCase())
        {
            return true;
        }
    }
    return false;
}

function check_hasSymbol(user_data)
{
    var symbolCheck = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return symbolCheck.test(user_data);
}

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
//------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------Encryption Algorithm---------------------------------------------------


function encryptStart(pMessage, password){
    
    let msgIndex = 0;
    let loopLimit = 0;
    let newString = "";

    for (var p of password){
        while (loopLimit < 4){
            newString += encryptProcess(pMessage[msgIndex], p);
            //newString = newString.concat(encryptProcess(pMessage[msgIndex], p));
            msgIndex++;
            loopLimit++;
        }
        //msgIndex = 0;
        loopLimit = 0;
    }
    return newString;
}

function encryptProcess(msgChar, pswdChar){
    console.log("Message Char = " + msgChar);
    let ax = msgChar;
    let px = pswdChar;

    ax = ax.charCodeAt(0) - 32;
    px = px.charCodeAt(0) - 32;

    let bx = (ax ^ px);

    let cx = bx + 32;

    return String.fromCharCode(cx);

}

//Nathan's code

function plaintextSplitter(str, password) {
    var arrStr = [];
    var fullStr = str.padEnd(28);
    console.log(fullStr);
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
    console.log(arrStr);
    var joinedStr = arrStr.join("");
    var cyphertext = encryptStart(joinedStr, password);
    var oriStrLen = str.length;
    drawText(joinedStr, cyphertext, oriStrLen);
  }

  function drawText(plaintext, cyphertext, oriStrLen) {
    clear();
    setup();
    noStroke();
    fill('rgb(0,255,0)');  //Fill color of text
    textSize(15);

    console.log("oriStrLen", oriStrLen);
    var zx = String.fromCharCode(oriStrLen + 32);
  
    for (let i = 0; i < cyphertext.length - 1; i++) {
      text(plaintext[i], (8 + (i * 25)), 20);
      text(cyphertext[i], (8 + (i * 25)), 42);
      // console.log(i + 1 + ":", joinedStr[i]);
    }
  
    text(zx, 8 + 31 * 25, 20);
    text(cyphertext[31], 8 + 31 * 25, 42);
  }
  
//

//------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------Displaying to Grid---------------------------------------------------
function displayText(user_plaintxt)
{
    clear(); //clear out grid before printing
    setup();
    noStroke();
    fill('rgb(0,255,0)');  //Fill color of text
    textSize(15);
    
    for (character in user_plaintxt)//displays character into respective cell
    { 
        text(user_plaintxt[character], (8+(character*25)), 20);
    }

}

function displayCypher(user_encryptedMsg)
{
    for (character in user_encryptedMsg)
    {
        text(user_encryptedMsg[character], (8+(character*25)), 42);
    }
}

//------------------------------------------------------------------------------------------------------------------------