// When clicking on control items
let color = $('.selected').css('background-color');
let context = $('canvas')[0].getContext('2d');
let $canvas = $('canvas');
let lastEvent;
let mouseDown = false;

$('.controls').on('click', 'li', function() {
    let color = $(this).css('background-color');
    // deselect sibling elements
    $(this)
        .siblings()
        .removeClass('selected');
    // select clicked element
    $(this).addClass('selected');
    // cache the color
    color = $(this).css('background-color');
});

// when new color is clicked
$('#revealColorSelect').click(function() {
    changeColor();
    // show or hide the color selectors
    $('#colorSelect').toggle();
});

// update the color span
function changeColor() {
    let color, red, green, blue;
    red = $('#red').val();
    green = $('#green').val();
    blue = $('#blue').val();
    color = `rgb(${red}, ${green}, ${blue})`;
    $('#newColor').css('background-color', color);
}
// when color slider change
$('input[type=range]').change(changeColor);

// when 'Add Color' is clicked
$('#addNewColor').click(function () {
    let controls = $('.controls ul');
    let style = $('#newColor').css('background-color');
    let newColor = `<li style="background-color:${style}" class="selected"></li>`;
    controls.children().removeClass('selected');
    // append the color to the controls ul
    controls.append(newColor);
});

// select the new color

//on mouse events on the canvas
$canvas.mousedown(function(e) {
    color = $('.selected').css('background-color');
    lastEvent = e;
    mouseDown = true;
    console.log(lastEvent);
}).mousemove(function(e) {
    // draw lines
    if (mouseDown) {
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle=color;
        context.stroke();
        lastEvent = e;
    } 
}).mouseup(function() { 
    mouseDown = false;
}).mouseleave(function () {
    $canvas.mouseup();
});


