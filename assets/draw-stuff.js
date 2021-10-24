
/*
    Team Name: 3NB
        Nicolas Vasquez : nickvas67@csu.fullerton.edu
        Nathan Vu       : mr.nathanvu@csu.fullerton.edu
        Bryant Nguyen   : bryantdnguyen@csu.fullerton.edu
        Nicholas Jones  : nicholasj898@csu.fullerton.edu

    Provides a framework for the grid that displays the plaintext message and the encrypted message
*/

function draw_grid( rminor, rmajor, rstroke, rfill  ) 
{
    stroke( rstroke );
    fill( rfill );;
    let sz = g_canvas.cell_size;
    let width = g_canvas.wid*sz;
    let height = g_canvas.hgt*sz
    for ( var ix = 0; ix < width; ix += rminor )
    {
        let big_linep = (ix % rmajor == 0);
        let line_wgt = 1;
        if (big_linep) line_wgt = 2;
        strokeWeight( line_wgt );
        line( ix, 0, ix, height );
        strokeWeight( 1 );
        //if ( ix % rmajor == 0 ) { text( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        let big_linep = (iy % rmajor == 0);
        let line_wgt = 1;
        if (big_linep) line_wgt = 2;
        strokeWeight( line_wgt );
        line( 0, iy, width, iy );
        strokeWeight( 1 );
        //if ( iy % rmajor == 0 ) { text( iy, 0, iy + 10 ); }
    }
}
