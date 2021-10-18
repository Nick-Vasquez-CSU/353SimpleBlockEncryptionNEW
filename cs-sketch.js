// cs-sketch.js; P5 key animation & input fcns.  // CF p5js.org/reference
// Time-stamp: <2021-09-28 16:54:18 Chuck Siska>

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:10, wid:64, hgt:48 }; // JS Global var, w canvas size info.

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
    draw_grid( 10, 50, 'white', 'yellow' );

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

// Callback to get Input-box data.
function retrieve_input_1()
{
    var data = g_input_1.value(); // Get data from Input box.
    //Checking for Comprehensive8
    var isValid = check_comp8(data);
    if(isValid)
    {
        //do something
        console.log( "Password meets Comprehensive8 requirements \nPassword = " + data ); // Show data in F12 Console output.
    }
}

function retrieve_input_2()
{
    var data = g_input_2.value()
    console.log("Message = "+ data);
}

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


// Globals to keep track of Bot
var g_bot = { dir:3, x:20, y:20, color:100 }; // Dir is 0..7 clock, w 0 up.
var g_box = { t:1, hgt:47, l:1, wid:63 }; // Box in which bot can move.

// Move the Bot at random, to a neighboring cell, changing Bot's painting color.
function move_bot( )
{
    let dir = (round (8 * random( ))) // Change direction at random; brownian motion.
    let dx = 0;
    let dy = 0;
    switch (dir)  // Convert dir to x,y deltas: dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
    {
      case 0 : {         dy = -1; break; }
      case 1 : { dx = 1; dy = -1; break; }
      case 2 : { dx = 1; break; }
      case 3 : { dx = 1; dy = 1; break; }
      case 4 : {         dy = 1; break; }
      case 5 : { dx = -1; dy = 1; break; }
      case 6 : { dx = -1; break; }
      case 7 : { dx = -1; dy = -1; break; }
      }
    let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.
    // Now change color of the Bot's new cell.
    let color =  100 + (1 + g_bot.color) % 156; // Incr color in nice range.
    g_bot.x = x; // Update bot x.
    g_bot.y = y;
    g_bot.dir = dir;
    g_bot.color = color;
    //console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
}

// Convert Bot pos to grid pos & draw Bot's color "presence".
function draw_bot( ) 
{
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1+ g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1+ g_bot.y*sz;
    let big = sz -2; // Stay inside cell walls.
    // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.
    fill( "#" + g_bot.color ); // Concat string, auto-convert the number to string.
    //console.log( "x,y,big = " + x + "," + y + "," + big );
    let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
    let pix = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ];
    //console.log( "acolors,pix = " + acolors + ", " + pix );

    // (*) Here is how to detect what's at the pixel location.  See P5 docs for fancier...
    if (0 != pix) { fill( 0 ); stroke( 0 ); } // Turn off color of prior bot-visited cell.
    else { stroke( 'white' ); } // Else Bot visiting this cell, so color it.

    // Paint the cell.
    rect( x, y, big, big );
}

// Update our display -- Move and draw Bot.
function draw_update()  
{
    //console.log( "g_frame_cnt = " + g_frame_cnt );
    move_bot( );
    draw_bot( );
}

// P5 Frame Re-draw Fcn, Called for Every Frame.
function draw()  
{
    ++g_frame_cnt; // Track frame count.
    if (0 == g_frame_cnt % g_frame_mod)  // Every so often, do stuff.
    {
        if (!g_stop) draw_update(); // If Bot not "stopped", update Bot.
    }
}

// If Key is Pressed, toggle Bot's global stop var.
function keyPressed( )
{
    g_stop = ! g_stop;
}

// If Mouse is Pressed, relocate Bot to Mouse on a cell, wrapped onto grid if needed.
//   and gratuitously draw the bot at new loc.
function mousePressed( )
{
    let x = mouseX; // Get mouse's current loc (from its global).
    let y = mouseY;
    //console.log( "mouse x,y = " + x + "," + y );
    // Get grid cell corresponding to mouse XY, storing cell XY into Bot.
    let sz = g_canvas.cell_size;
    let gridx = round( (x-0.5) / sz );
    let gridy = round( (y-0.5) / sz );
    //console.log( "grid x,y = " + gridx + "," + gridy );
    //console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
    g_bot.x = gridx + g_box.wid; // Ensure its positive.
    //console.log( "bot x = " + g_bot.x );
    g_bot.x %= g_box.wid; // Wrap to fit box.
    g_bot.y = gridy + g_box.hgt;
    //console.log( "bot y = " + g_bot.y );
    g_bot.y %= g_box.hgt;
    //console.log( "bot x,y = " + g_bot.x + "," + g_bot.y );
    draw_bot( );
}
