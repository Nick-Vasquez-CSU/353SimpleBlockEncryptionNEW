// cs-sketch.js; P5 key animation & input fcns.  // CF p5js.org/reference
/*
    Team Name:
        
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
    g_input_1 = createInput( ); // Create an input box, editable.
    g_input_1.position( 20, 30 ); // Put box on page.
    g_button_1 = createButton( "Submit Password" ); // Create button to help get input data.
    g_button_1.position( 160, 30 ); // Put button on page.
    g_button_1.mousePressed( retrieve_input_1 ); // Hook button press to callback fcn.

    //Setup for user password
    g_input_2 = createInput( ); // Create an input box, editable.
    g_input_2.position( 20, 60 ); // Put box on page.
    g_button_2 = createButton( "Submit Message" ); // Create button to help get input data.
    g_button_2.position( 160, 60 ); // Put button on page.
    g_button_2.mousePressed( retrieve_input_2 ); // Hook button press to callback fcn.

}


//---------------------------------------------------Getting User Input---------------------------------------------------
// Callback to get Input-box data.
function retrieve_input_1()
{
    var data = g_input_1.value(); // Get data from Input box.
    //Checking for Comprehensive8
    var isPasswordValid = check_comp8(data);
    if(isPasswordValid)
    {
        //do something
        console.log( "Password meets Comprehensive8 requirements \nPassword = " + data ); // Show data in F12 Console output.
    }
}

function retrieve_input_2()
{
    var data = g_input_2.value()
    //Checking for Plaintext > 27 Characters
    var isPlaintxtValid = check_plaintxt(data);
    if(isPlaintxtValid)
    {
        //do something
        console.log("Plaintext meets the requirements \nPlaintext = " + data);
        //separate the plaintext into 4 blocks

        //display plaintext to grid
        displayText(data);
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

//Encryption Algorithm

function encryptStart(pMessage, password){
    
    let msgIndex = 0;
    let loopLimit = 0;
    let newString = "";

    for (var p of password){
        while (loopLimit < 4){
            newString = newString.concat(encryptProcess(pMessage[msgIndex], p));
            msgIndex++;
            loopLimit++;
        }
        loopLimit = 0;
    }
    return newString;
}

function encryptProcess(msgChar, pswdChar){
    
    let ax = msgChar;
    let px = pswdChar;

    ax = ax.charCodeAt(0) - 32;
    px = px.charCodeAt(0) - 32;

    let bx = (ax ^ px);

    let cx = bx + 32;

    return String.fromCharCode(cx);

}


//Nathan's code



//

//------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------Displaying to Grid---------------------------------------------------
function displayText(user_plaintxt)
{
    clear();
    setup();
    noStroke();
    fill('rgb(0,255,0)');  //Fill color of text
    textSize(15);
    //clear out grid before printing
    
    for (character in user_plaintxt)//displays character into respective cell
    { 
        text(user_plaintxt[character], (8+(character*25)), 20);
    }

}
//------------------------------------------------------------------------------------------------------------------------