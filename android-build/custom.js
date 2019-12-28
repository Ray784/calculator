var posX = $('#seven').offset().left;
var posY = $('#seven').offset().top;

function setRipple(obj){
	let currX = obj.offset().left;
    let currY = obj.offset().top;
    buttonWidth = $(this).width(),
    buttonHeight =  $(this).height();
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
	let scrlval = document.getElementById("top-key").scrollWidth;
	let text = $(this).text();

	if(text === '='){
    	err = 'bad expression';
    	obj1 = $('#top-key');
    	obj2 = $('#bottom-key');
    	scrlval = 0;
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

    $('#top-key').scrollLeft(scrlval);
});

$(function(){
  $("#bspk").bind( "taphold", tapholdHandler );
  function tapholdHandler( event ){
  		$('#bottom-key').text('');
		$('#top-key').text('');
  }
});