// create origin snake
var SVG = document.createElementNS("http://www.w3.org/2000/svg","svg");
SVG.setAttribute('version','1.1');
SVG.setAttribute('width','100%');
SVG.setAttribute('height','900px');
var max_x;
var max_y;
var flag = 1;

var color = new Array();
color[0] = 'red';
color[1] = 'blue';
color[2] = 'yellow';
color[3] = 'green';
color[4] = 'orange';

var mouseXY = new Object();
var vector_num = new Array();
var snake_bone = new Array();


var gost_bone = new Array();


var speed = 3;
var radius = 18;
var bodylength = 10;
var snakenum = 3;
var jump = radius/speed;
var int;

circle_xy = new Array();

for (var i = 0; i < snakenum; i++){
    circle_xy[i]=new Array();
    snake_bone[i]=new Array();
    snake_bone[i]=new Array();
}

// var map = new Array();
// for(var i = 0; i < 1920; i++){
//     map[i] = new Array();
//     for (var j = 0;j < 1080; j++){
//         map[i][j] = '';
//     }
// }

function CreateSnakeBone (num){
    snake_bone[num][0] = new Object();
    snake_bone[num][0].x = Math.random()*(max_x-2*radius+1)+radius;
    snake_bone[num][0].y = Math.random()*(max_y-2*radius+1)+radius;
    console.log(max_y);
    console.log(max_x);
    snake_bone[num][0].status = 1;
    circle_xy[num][0]=CreateCircle(snake_bone[num][0].x, snake_bone[num][0].y, radius, 'black', '2px', false);
    var bone_point = jump + (bodylength - 1) * 2 * jump;
    var coefficient = circle_xy[num][0].x<Math.floor(max_x/2) ? 1 : -1;
    for (var i = 1; i <= bone_point; i++) {
        snake_bone[num][i] = new Object();
        snake_bone[num][i].x = snake_bone[num][i-1].x + coefficient * speed;
        snake_bone[num][i].y = snake_bone[num][i-1].y;
        if (i%(2 * jump) == 0){
            snake_bone[num][i].status = 1;
        }
        else {
            snake_bone[num][i].status = 0;
        }
    }

}

function CreateCircle(cx, cy, r, stroke, stroke_width, gost, head){
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

function MoveCircle(cx, cy, circle){
    circle.setAttribute('cx',cx);
    circle.setAttribute('cy',cy);
}

function CreateSnake(num){
    for (var k = 1;k < snake_bone[num].length; k++){
        if (snake_bone[num][k].status == 1) {
            circle_xy[num][k/(2*jump)]=CreateCircle(snake_bone[num][k].x, snake_bone[num][k].y, radius, false);
        }
    }
}
function OriginVector(num){
    var vector = new Object();
    // vector.X = Math.random();
    // vector.Y = Math.sqrt(1-Math.pow(vector.X,2));
    vector.X = 1;
    vector.Y = 0;
    vector_num[num] = vector;
}

function CalculateVector(num) {
    var vector = new Object();
    var length = Math.sqrt(Math.pow((mouseXY.X - snake_bone[num][0].x), 2) + Math.pow((mouseXY.Y - snake_bone[num][0].y),2));
    vector.X = (mouseXY.X - snake_bone[num][0].x)/length;
    vector.Y = (mouseXY.Y - snake_bone[num][0].y)/length;
    vector_num[num] = vector;
}

function Movtion(num){
    for (var k = snake_bone[num].length - 1;k > 0; k--) {
        snake_bone[num][k].x = snake_bone[num][k-1].x;
        snake_bone[num][k].y = snake_bone[num][k-1].y;
        if (snake_bone[num][k].status == 1){
            circle_xy[num][k/(2 * jump)].x = snake_bone[num][k].x;
            circle_xy[num][k/(2 * jump)].y = snake_bone[num][k].y;
            MoveCircle(snake_bone[num][k].x, snake_bone[num][k].y, circle_xy[num][k/(2 * jump)].circle);
        }
    }
    snake_bone[num][0].x += (vector_num[num].X)*speed;
    snake_bone[num][0].y += (vector_num[num].Y)*speed;
    circle_xy[num][0].x = snake_bone[num][0].x;
    circle_xy[num][0].y = snake_bone[num][0].y;
    MoveCircle(snake_bone[num][0].x, snake_bone[num][0].y, circle_xy[num][0].circle);

    var j1 = judege_border(num);
    var j2 = judege_collision(circle_xy[num][0], circle_xy[1]);


    requestAnimationFrame(function(){
        Movtion(num);
    });

}
function judege_border(num){
    if (snake_bone[num][0].x <= radius || snake_bone[num][0].y <= radius ||snake_bone[num][0].x >= max_x-radius || snake_bone[num][0].y >= max_y-radius){
        clearInterval(int);
        //alert('game over!');
        location.reload();
        return false;
    }
    else {
        return true;
    }
}

function judege_collision(snake_me_head, snake_other_body) {
    for(var i = 0; i < snake_other_body.length; i++){
        if(Math.pow((snake_other_body[i].x - snake_me_head.x), 2)+Math.pow((snake_other_body[i].y - snake_me_head.y), 2) <= Math.pow(2*radius,2)){
            clearInterval(int);
            //alert('game over!CC');
            location.reload();
            return false;
        }
    }
}


$(document).ready(function(){
    $('body').append(SVG);
    max_x=SVG.getBoundingClientRect().width;
    max_y=SVG.getBoundingClientRect().height;
    OriginVector(0);
    CreateSnakeBone(0);
    CreateSnake(0);
    CreateSnakeBone(1);
    CreateSnake(1);
    // console.log(snake_bone);
    $('body').mousemove(function(e){
        mouseXY.X = e.pageX;
        mouseXY.Y = e.pageY;
        CalculateVector(0);
    });
    // var int = setInterval(function(){
    //     var judge = Movtion(0);
    // }, 10);
    // window.requestAnimationFrame(function(){
    //     Movtion(0);
    // });

    requestAnimationFrame(function(){
        Movtion(0);
    });
});
