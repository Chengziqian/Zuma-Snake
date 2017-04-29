// create origin snake
var SVG = document.createElementNS("http://www.w3.org/2000/svg","svg");
SVG.setAttribute('version','1.1');
SVG.setAttribute('width','100%');
SVG.setAttribute('height','900px');
var max_x;
var max_y;

var color = new Array();
color[0] = 'red';
color[1] = 'blue';
color[2] = 'yellow';
color[3] = 'green';
color[4] = 'orange';

var mouseXY = new Object();
var vector_num = new Array();

var speed = 40;
var radio = 20;
var bodylength = 5;
var snakenum = 3;

circle_xy = new Array();

for (var i = 0; i < snakenum; i++){
    circle_xy[i]=new Array();
}

// var map = new Array();
// for(var i = 0; i < 1920; i++){
//     map[i] = new Array();
//     for (var j = 0;j < 1080; j++){
//         map[i][j] = '';
//     }
// }

function create_circle(cx, cy, r, stroke, stroke_width, gost, head){
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

function create_snake(num){
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
    circle_xy[num][0] = create_circle(Math.floor(Math.random()*(max_x-radio+1)+radio), Math.floor(Math.random()*(max_y-radio+1)+radio), radio, 'black', '2px', false);
    // for(var i = Math.floor(circle_xy[num][0].x)-radio*0.7<=0?0:Math.floor(circle_xy[num][0].x)-radio*0.7; i <= Math.floor(circle_xy[num][0].x)+radio*0.7; i++){
    //     for(var j = Math.floor(circle_xy[num][0].y)-radio*0.7<=0?0:Math.floor(circle_xy[num][0].y)-radio*0.7; j <= Math.floor(circle_xy[num][0].y)+radio*0.7; j++){
    //         map[i][j] = num;
    //     }
    // }
    var coefficient = circle_xy[num][0].x<Math.floor(max_x/2) ? 1 : -1;
    for (var i = 1;i <= bodylength;i ++){
        circle_xy[num][i]=create_circle(circle_xy[num][i-1].x+(coefficient*speed), circle_xy[num][i-1].y, radio, false);
        // for(var k = Math.floor(circle_xy[num][i].x)-radio*0.7<=0?0:Math.floor(circle_xy[num][i].x)-radio*0.7; k <= Math.floor(circle_xy[num][i].x)+radio*0.7; k++){
        //     for(var j = Math.floor(circle_xy[num][i].y)-radio*0.7<=0?0:Math.floor(circle_xy[num][i].y)-radio*0.7; j <= Math.floor(circle_xy[num][i].y)+radio*0.7; j++){
        //         map[k][j] = num;
        //     }
        // }
    }

}
function origin_vector(num){
    var vector = new Object();
    vector.X = Math.random();
    vector.Y = Math.sqrt(1-Math.pow(vector.X,2));
    vector_num[num] = vector;
}

function calcuate_vector(num) {
    var vector = new Object();
    var length = Math.sqrt(Math.pow((mouseXY.X - circle_xy[0][0].x), 2) + Math.pow((mouseXY.Y - circle_xy[num][0].y),2));
    vector.X = (mouseXY.X - circle_xy[num][0].x)/length;
    vector.Y = (mouseXY.Y - circle_xy[num][0].y)/length;
    vector_num[num] = vector;
}

function movtion(num){
    judege_border(num);
    judege_collision(circle_xy[num][0], circle_xy[1]);

    // for(var k = Math.floor(circle_xy[num][bodylength].x)-radio*0.7<=0?0:Math.floor(circle_xy[num][bodylength].x)-radio*0.7; k <= Math.floor(circle_xy[num][bodylength].x)+radio*0.7; k++){
    //     for(var j = Math.floor(circle_xy[num][bodylength].y)-radio*0.7<=0?0:Math.floor(circle_xy[num][bodylength].y)-radio*0.7; j <= Math.floor(circle_xy[num][bodylength].y)+radio*0.7; j++){
    //         map[k][j] = '';
    //     }
    // }
    for (i = bodylength;i > 0;i --){
        move_circle(circle_xy[num][i-1].x, circle_xy[num][i-1].y, circle_xy[num][i].circle);
        circle_xy[num][i].x = circle_xy[num][i-1].x;
        circle_xy[num][i].y = circle_xy[num][i-1].y;
    }
    circle_xy[num][0].x = circle_xy[num][0].x+(vector_num[num].X)*speed;
    circle_xy[num][0].y = circle_xy[num][0].y+(vector_num[num].Y)*speed;
    move_circle(circle_xy[num][0].x, circle_xy[num][0].y, circle_xy[num][0].circle);

    // for(var i = Math.floor(circle_xy[num][0].x)-radio*0.7<=0?0:Math.floor(circle_xy[num][0].x)-radio*0.7; i <= Math.floor(circle_xy[num][0].x)+radio*0.7; i++){
    //     for(var j = Math.floor(circle_xy[num][0].y)-radio*0.7<=0?0:Math.floor(circle_xy[num][0].y)-radio*0.7; j <= Math.floor(circle_xy[num][0].y)+radio*0.7; j++){
    //         if(map[i][j] != num){
    //             alert('game over!');
    //             location.reload();
    //             return false;
    //         }
    //         else {
    //             map[i][j] = num;
    //         }
    //     }
    // }

}

function judege_border(num){
    if (circle_xy[num][0].x <= radio || circle_xy[num][0].y <= radio ||circle_xy[num][0].x >= max_x-radio || circle_xy[num][0].y >= max_y-radio){
        alert('game over!');
        location.reload();
        return false;
    }
    else {
        return true;
    }
}

function judege_collision(snake_me_head, snake_other_body) {
    for(var i = 0; i < snake_other_body.length; i++){
        if(Math.pow((snake_other_body[i].x - snake_me_head.x), 2)+Math.pow((snake_other_body[i].y - snake_me_head.y), 2) <= 1600){
            alert('game over!CC');
            location.reload();
            return false;
        }
    }
}


$(document).ready(function(){
    $('body').append(SVG);
    origin_vector(0);
    console.log(vector_num[0]);
    create_snake(0);
    create_snake(1);
    $('body').mousemove(function(e){
        mouseXY.X = e.pageX;
        mouseXY.Y = e.pageY;
        calcuate_vector(0);
    });
    setInterval(function(){movtion(0);}, 100);
});
