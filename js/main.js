// create origin snake
var SVG = document.createElementNS("http://www.w3.org/2000/svg","svg");
SVG.setAttribute('version','1.1');
SVG.setAttribute('width','100%');
SVG.setAttribute('height','900px');

var color = new Array();
color[0] = 'red';
color[1] = 'blue';
color[2] = 'yellow';
color[3] = 'green';
color[4] = 'orange';

circle_xy = new Array();
var mouseXY = new Object();


function create_circle(cx, cy, r, stroke, stroke_width, gost){
    var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
    circle.setAttribute('cx',cx);
    circle.setAttribute('cy',cy);
    circle.setAttribute('r',r);
    circle.setAttribute('fill',color[Math.floor(Math.random()*5)]);
    circle.setAttribute('stroke',stroke);
    circle.setAttribute('stroke-width',stroke_width);
    SVG.append(circle);
    var xy = new Object();
    xy.x = cx;
    xy.y = cy;
    xy.gost = gost;
    xy.circle = circle;
    return xy;
}

function move_circle(cx, cy, circle){
    circle.setAttribute('cx',cx);
    circle.setAttribute('cy',cy);
}

function create_snake(){
    // var origin_circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
    // var origin_cx = Math.floor(Math.random()*1000+20);
    // var origin_cy = Math.floor(Math.random()*800+20);
    // origin_circle.setAttribute('cx',origin_cx);
    // origin_circle.setAttribute('cy',origin_cy);
    // origin_circle.setAttribute('r','18');
    // origin_circle.setAttribute('fill',color[random_color]);
    // origin_circle.setAttribute('stroke','orange');
    // origin_circle.setAttribute('stroke-width','2px');
    // SVG.append(origin_circle);
    max_x=SVG.getBoundingClientRect().width;
    max_y=SVG.getBoundingClientRect().height;
    circle_xy[0] = create_circle(Math.floor(Math.random()*(max_x-210)+200), Math.floor(Math.random()*(max_y-210)+200), 20, 'black', '2px', false);
    var i = 1;
    var coefficient = circle_xy[0].x<Math.floor(max_x/2) ? 1 : -1;
    for (i = 1;i <= 5;i ++){
        circle_xy[i]=create_circle(circle_xy[i-1].x+(coefficient*40), circle_xy[i-1].y, 20, false);
    }

}

function movtion(){
    console.log(mouseXY);
    var vector = new Object();
    var length = Math.sqrt(Math.pow((mouseXY.X - circle_xy[0].x), 2) + Math.pow((mouseXY.Y - circle_xy[0].y),2));
    vector.X = (mouseXY.X - circle_xy[0].x)/length;
    vector.Y = (mouseXY.Y - circle_xy[0].y)/length;
    for (i = 5;i > 0;i --){
        move_circle(circle_xy[i-1].x, circle_xy[i-1].y, circle_xy[i].circle);
        circle_xy[i].x = circle_xy[i-1].x;
        circle_xy[i].y = circle_xy[i-1].y;
    }
    move_circle(circle_xy[0].x+(vector.X)*40, circle_xy[0].y+(vector.Y)*40, circle_xy[0].circle);
    circle_xy[0].x = circle_xy[0].x+(vector.X)*40;
    circle_xy[0].y = circle_xy[0].y+(vector.Y)*40;
}

$(document).ready(function(){
    $('body').append(SVG);
    create_snake();

    $(document).mousemove(function(e){
        mouseXY.X = e.pageX;
        mouseXY.Y = e.pageY;
    });

    setInterval(movtion, 100);

});
