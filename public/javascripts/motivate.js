/**
 * Created by ransixi on 14-9-16.
 */
var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=568;
var RADIUS=8;
var MARGIN_TOP=50;
var MARGIN_LEFT=30;

const endTime=new Date(2015,7,3,18,18,18);//const申明的变量，是把一个常量赋值给这个变量，并且不能改变。
var curShowTimeSeconds=0;

var balls=[];//申明一个空的数组，用来储存彩色小球。
var ballsColor=["#33b5e5","#0099cc","#aa66cc","#9933cc","#99cc00","#669900","#ffbb33","#ff8800","#ff4444","#cc0000"];


window.onload=function(){

    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");

    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;

    curShowTimeSeconds=getCurrentShowTimeSeconds();

    setInterval(
        function(){
        render(context);
        update();
    },
        50);

};
function getCurrentShowTimeSeconds(){

    var curTime=new Date();
    var ret=endTime.getTime()-curTime.getTime();
    ret=Math.round(ret/1000);

    return ret>=0 ? ret:0;
}

function update(){

    var nextShowTimeSeconds=getCurrentShowTimeSeconds();
    var nextHours=parseInt(nextShowTimeSeconds/3600);
    var nextMinutes=parseInt(nextShowTimeSeconds/60%60);
    var nextSeconds=parseInt(nextShowTimeSeconds%60);

    var curHours=parseInt(curShowTimeSeconds/3600);
    var curMinutes=parseInt(curShowTimeSeconds/60%60);
    var curSeconds=parseInt(curShowTimeSeconds%60);

    if(nextSeconds!=curSeconds){

        if(parseInt(nextHours/10)!=parseInt(curHours/10))
            addBall(MARGIN_LEFT+0,MARGIN_TOP,parseInt(nextHours/10));
        if(parseInt(nextHours%10)!=parseInt(curHours%10))
            addBall(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(nextHours%10));

        if(parseInt(nextMinutes/10)!=parseInt(curMinutes/10))
            addBall(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes/10));
        if(parseInt(nextMinutes%10)!=parseInt(curMinutes%10))
            addBall(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes%10));

        if(parseInt(nextSeconds/10)!=parseInt(curSeconds/10))
            addBall(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds/10));
        if(parseInt(nextSeconds%10)!=parseInt(curSeconds%10))
            addBall(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds%10));

        curShowTimeSeconds=nextShowTimeSeconds;
    }

    updateBalls();

   console.log(balls.length);
}

function updateBalls(){
    for(var i=0;i<balls.length;i++) {

        balls[i].x +=balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= (WINDOW_HEIGHT - RADIUS))
        {

            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy*0.70;
        }
    }

    var cnt=0;
    for(var i=0; i<balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
            balls[cnt++] = balls[i]  }
            while (balls.length > Math.min(300,cnt))
            {

              balls.pop();
            }



}

function addBall(x,y,num){

    for(var i=0;i<digit[num].length;i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if(digit[num][i][j]==1) {
                var aBall = {

                    x: x + (2 * j + 1) * (RADIUS + 1),
                    y: y + (2 * i + 1) * (RADIUS + 1),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    g: 1.5 + Math.random(),
                    color: ballsColor[Math.floor(Math.random() * ballsColor.length)]
                }

                balls.push(aBall);
            }
        }
    }


}

function render(cxt){

    var h=parseInt(curShowTimeSeconds/3600);//倒计时还有多少小时
    var m=parseInt(curShowTimeSeconds/60%60);//倒计时还有多少分钟
    var s=parseInt(curShowTimeSeconds%60);//倒计时还有多少秒

    cxt.clearRect(0,0,canvas.width,canvas.height);

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(h/10),cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt((h%10)),cxt);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt((m/10)),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt((m%10)),cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt((s/10)),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt((s%10)),cxt);

    for(var i=0; i<balls.length;i++)
    {
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();

        cxt.fill();
    }

}

function renderDigit(x,y,num,cxt){



    cxt.fillStyle="rgb(0,102,153)";

    for(var i=0; i<digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)

            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + (2 * j + 1) * (RADIUS + 1), y + (2 * i + 1) * (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();

                cxt.fill();
            }


}
