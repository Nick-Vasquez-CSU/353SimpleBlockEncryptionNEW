// cs-sketch.js; P5 key animation & input fcns.  // CF p5js.org/reference
// Time-stamp: <2021-09-28 16:54:18 Chuck Siska>

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size: 10, wid: 64, hgt: 4 }; // JS Global var, w canvas size info.

// var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
// var g_frame_mod = 24; // Update ever 'mod' frames.
// var g_stop = 0; // Go by default.
// var g_input; // My input box.
// var g_button; // Button for my input box.

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
  if (isValidPlaintext(data_1)) {
    console.log("Plaintext = " + data_1); // Show data in F12 Console output.
    plaintextSplitter(data_1);
  } else {
    console.error("Invalid Plaintext");
    // alert("Invalid Plaintext");
  }
  if (isValidPassword(data_2)) {
    console.log("Password = " + data_2); // Show data in F12 Console output.
  } else {
    console.error("Invalid Password");
    // alert("Invalid Password");
  }
}

// Globals to keep track of Bot
// var g_bot = { dir: 3, x: 20, y: 20, color: 100 }; // Dir is 0..7 clock, w 0 up.
// var g_box = { t: 1, hgt: 47, l: 1, wid: 63 }; // Box in which bot can move.

// Move the Bot at random, to a neighboring cell, changing Bot's painting color.
// function move_bot() {
//   let dir = round(8 * random()); // Change direction at random; brownian motion.
//   let dx = 0;
//   let dy = 0;
//   switch (
//     dir // Convert dir to x,y deltas: dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
//   ) {
//     case 0: {
//       dy = -1;
//       break;
//     }
//     case 1: {
//       dx = 1;
//       dy = -1;
//       break;
//     }
//     case 2: {
//       dx = 1;
//       break;
//     }
//     case 3: {
//       dx = 1;
//       dy = 1;
//       break;
//     }
//     case 4: {
//       dy = 1;
//       break;
//     }
//     case 5: {
//       dx = -1;
//       dy = 1;
//       break;
//     }
//     case 6: {
//       dx = -1;
//       break;
//     }
//     case 7: {
//       dx = -1;
//       dy = -1;
//       break;
//     }
//   }
//   let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
//   let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.
//   // Now change color of the Bot's new cell.
//   let color = 100 + ((1 + g_bot.color) % 156); // Incr color in nice range.
//   g_bot.x = x; // Update bot x.
//   g_bot.y = y;
//   g_bot.dir = dir;
//   g_bot.color = color;
//   //console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
// }

// Convert Bot pos to grid pos & draw Bot's color "presence".
// function draw_bot() {
//   let sz = g_canvas.cell_size;
//   let sz2 = sz / 2;
//   let x = 1 + g_bot.x * sz; // Set x one pixel inside the sz-by-sz cell.
//   let y = 1 + g_bot.y * sz;
//   let big = sz - 2; // Stay inside cell walls.
//   // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.
//   fill("#" + g_bot.color); // Concat string, auto-convert the number to string.
//   //console.log( "x,y,big = " + x + "," + y + "," + big );
//   let acolors = get(x + sz2, y + sz2); // Get cell interior pixel color [RGBA] array.
//   let pix = acolors[0] + acolors[1] + acolors[2];
//   //console.log( "acolors,pix = " + acolors + ", " + pix );

//   // (*) Here is how to detect what's at the pixel location.  See P5 docs for fancier...
//   if (0 != pix) {
//     fill(0);
//     stroke(0);
//   } // Turn off color of prior bot-visited cell.
//   else {
//     stroke("white");
//   } // Else Bot visiting this cell, so color it.

//   // Paint the cell.
//   rect(x, y, big, big);
// }

// Update our display -- Move and draw Bot.
// function draw_update() {
//console.log( "g_frame_cnt = " + g_frame_cnt );
//   move_bot();
//   draw_bot();
// }

// P5 Frame Re-draw Fcn, Called for Every Frame.
// function draw() {
//   ++g_frame_cnt; // Track frame count.
//   if (0 == g_frame_cnt % g_frame_mod) {
//     // Every so often, do stuff.
//     if (!g_stop) draw_update(); // If Bot not "stopped", update Bot.
//   }
// }

// If Key is Pressed, toggle Bot's global stop var.
// function keyPressed() {
//   g_stop = !g_stop;
// }

// If Mouse is Pressed, relocate Bot to Mouse on a cell, wrapped onto grid if needed.
//   and gratuitously draw the bot at new loc.
// function mousePressed() {
//   let x = mouseX; // Get mouse's current loc (from its global).
//   let y = mouseY;
//   //console.log( "mouse x,y = " + x + "," + y );
//   // Get grid cell corresponding to mouse XY, storing cell XY into Bot.
//   let sz = g_canvas.cell_size;
//   let gridx = round((x - 0.5) / sz);
//   let gridy = round((y - 0.5) / sz);
//   //console.log( "grid x,y = " + gridx + "," + gridy );
//   //console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
//   g_bot.x = gridx + g_box.wid; // Ensure its positive.
//   //console.log( "bot x = " + g_bot.x );
//   g_bot.x %= g_box.wid; // Wrap to fit box.
//   g_bot.y = gridy + g_box.hgt;
//   //console.log( "bot y = " + g_bot.y );
//   g_bot.y %= g_box.hgt;
//   //console.log( "bot x,y = " + g_bot.x + "," + g_bot.y );
//   draw_bot();
// }

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

function plaintextSplitter(str) {
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
}
