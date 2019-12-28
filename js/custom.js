var posX = $('#seven').offset().left;
var posY = $('#seven').offset().top;

function setRipple(obj){
	let currX = obj.offset().left;
    let currY = obj.offset().top;
    let x = currX - posX;
    let y = currY - posY;
	$(".ripple").remove();
	obj.prepend("<span class='ripple'></span>");
	$(".ripple").css({
		left : x + 'px',
		top : y + 'px'
	}).addClass("rippleEffect");
}

$('button').click(function(e){
	setRipple($(this));
	let obj1 = $('#bottom-key');
	let obj2 = null;
	let res ="";
	let err= '';
	let text = $(this).text();

	if(text === '='){
    	err = 'bad expression';
    	obj1 = $('#top-key');
    	obj2 = $('#bottom-key');
	}
    else if(text === "backspace"){
    	let txt = $('#top-key').text();
    	$('#top-key').text(txt.slice(0, -1));
    }
    else
    	$('#top-key').append(text);

    res = evaluate($('#top-key').text());
    if(!isNaN(res)){
    	obj1.text(res);
    	if(obj2)
    		obj2.text('');
    }
    else
    	$('#bottom-key').text(err);

    $('#top-key').scrollLeft(document.getElementById("top-key").scrollWidth);
    $('#bottom-key').scrollLeft(document.getElementById("bottom-key").scrollWidth);
});

// how many milliseconds is a long press?
    var longpress = 600;
    // holds the start time
    var start;

    $("#bspk").on( 'mousedown', function( e ) {
        start = new Date().getTime();
    } );

    $("#bspk").on( 'mouseleave', function( e ) {
        start = 0;
    } );

    $("#bspk").on( 'mouseup', function( e ) {
        if ( new Date().getTime() >= ( start + longpress )  ) {
           alert('long press!');   
        } else {
           alert('short press!');   
        }
    } );
