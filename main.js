window.addEventListener("load",function() { t_inp(); initial(); box_s1 = document.getElementById("second1"); box_s10 = document.getElementById("second10"); box_m = document.getElementById("minute"); },false)
var mX=0, mY=0, m_debug = 0;
document.onmousemove = function (e){ mX = e.clientX; mY = e.clientY; /*document.getElementById("txtX").value = mX; document.getElementById("txtY").value = mY; */};
//document.onmousedown = function (){ document.getElementById("txtC").value = 'click'; }
document.onmouseup = function (){
    direction(); p_move(); replace(); i_clear(); s_p = -1;
    document.getElementById("Count_interface").textContent = m_c;
    //document.getElementById("txtMC").value = m_c;
    //document.getElementById("txtC").value = 'no_click';
    if(m_debug){ clear_frame(); }
}
// refresh
function initial(){
    if(level == '*'){ no_0();} if(level == 1){ no_1();} if(level == 2){ no_2();} if(level == 3){ no_3();} if(level == 4){ no_4();} if(level == 5){ no_5();} if(level == 6){ no_6();} if(level == 7){ no_7();}
    reframe(); replace(); disp_refresh(); step = 0;
}

/*
var debugF = 0;
function debug(){ if(!debugF){ document.getElementById('debugT').style.display='block'; debugF = 1; } else { document.getElementById('debugT').style.display='none'; debugF = 0; }}
*/

var s_p = -1;
// select p
function select(p){ s_p = p; /*document.getElementById("txtS").value = s_p;*/ b_point();}

var frame = [];
function P_S(disp, x, y, t) { this.disp = disp; this.x = x; this.y = y; this.t = t; }
var P = [];
var piece_n = 14;

function reframe(){
    for(var i=0; i<5; i++){ frame[i] = []; for(var j=0; j<4; j++){ frame[i][j] = -1; }}
    for(i=0;i<piece_n+1;i++){
        if(P[i].disp == false) continue;
        if(P[i].t == "tani"){ frame[P[i].y][P[i].x] = i; frame[P[i].y+1][P[i].x] = i; frame[P[i].y][P[i].x+1] = i; frame[P[i].y+1][P[i].x+1] = i; }
        if(P[i].t == "sp"){ frame[P[i].y][P[i].x] = i; }
        if(P[i].t == "vp"){ frame[P[i].y][P[i].x] = i; frame[P[i].y+1][P[i].x] = i; }
        if(P[i].t == "hp"){ frame[P[i].y][P[i].x] = i; frame[P[i].y][P[i].x+1] = i; }
    }
}
function clear_frame(){ for(var i=0; i<5; i++){ for(var j=0; j<4; j++){ frame[i][j] = -1; }}}

var step = 0;
var save_x = [];
var save_y = [];
function save(){
    save_x[step] = []; save_y[step] = [];
    for(i=0;i<piece_n+1;i++){
        save_x[step][i] = P[i].x; save_y[step][i] = P[i].y;
    }
    step++;
}

// 一手戻す
function pre_button(){
    if(!(P[0].x == 1 && P[0].y == 3)){
        step--;
        if(step <= 0) step = 0;
        for(i=0;i<piece_n+1;i++){
            P[i].x = save_x[step][i]; P[i].y = save_y[step][i];
        }
        reframe();
        replace();
        m_c--;
        if(m_c <= 0) m_c = 0;
        document.getElementById("Count_interface").textContent = m_c;
    }
}

// replace css
function replace(){
    var p_id, p_t = 'p';
    for(i=0;i<piece_n+1;i++){ if(P[i].disp == false) continue; p_id = p_t + i; document.getElementById(p_id).style.top = 20 + 100 * P[i].y; document.getElementById(p_id).style.left = 20 + 100 * P[i].x; }
}

var b_x, b_y;
// base point
function b_point(){ b_x = mX; b_y = mY;}

var D_s = '-';
// click dire
function direction(){
    var n_x = mX - b_x, n_y = mY - b_y;
    if(n_x==n_y && n_x==0){ /*document.getElementById("txtD").value='no_direction';*/ return; }
    if(Math.abs(n_x)>Math.abs(n_y)){ if(n_x>0){ /*document.getElementById("txtD").value='>';*/ D_s='>'; } else { /*document.getElementById("txtD").value='<';*/ D_s='<'; }
    } else { if(n_y>0){ /*document.getElementById("txtD").value='v';*/ D_s ='v'; } else { /*document.getElementById("txtD").value='^';*/ D_s='^'; }}
}

var m_c = 0;
// move
function p_move(){
    if(s_p == -1) return;
    if(D_s=='^'){
        if(P[s_p].y < 1) return;
        if(frame[P[s_p].y-1][P[s_p].x] != -1) return;
        if(frame[P[s_p].y-1][P[s_p].x+1] != -1 && (P[s_p].t == "tani" || P[s_p].t == "hp")) return;
        save();
        P[s_p].y--;
    }
    if(D_s=='v'){
        if(P[s_p].t=="tani"){ if(P[s_p].y > 2) return; if(frame[P[s_p].y+2][P[s_p].x] != -1) return; if(frame[P[s_p].y+2][P[s_p].x+1] != -1) return; }
        if(P[s_p].t=="hp"){ if(P[s_p].y > 3) return; if(frame[P[s_p].y+1][P[s_p].x] != -1) return; if(frame[P[s_p].y+1][P[s_p].x+1] != -1) return; }
        if(P[s_p].t=="vp"){ if(P[s_p].y > 2) return; if(frame[P[s_p].y+2][P[s_p].x] != -1) return; }
        if(P[s_p].t=="sp"){ if(P[s_p].y > 3) return; if(frame[P[s_p].y+1][P[s_p].x] != -1) return; }
        save();
        P[s_p].y++;
    }
    if(D_s=='<'){
        if(P[s_p].x < 1) return;
        if(frame[P[s_p].y][P[s_p].x-1] != -1) return;
        if(P[s_p].t=="tani" || P[s_p].t=="vp"){ if(frame[P[s_p].y+1][P[s_p].x-1] != -1) return; }
        save();
        P[s_p].x--;      
    }
    if(D_s=='>'){
        if(P[s_p].t=="tani"){ if(P[s_p].x > 1) return; if(frame[P[s_p].y][P[s_p].x+2] != -1) return; if(frame[P[s_p].y+1][P[s_p].x+2] != -1) return; }
        if(P[s_p].t=="hp"){ if(P[s_p].x > 1) return; if(frame[P[s_p].y][P[s_p].x+2] != -1) return; }
        if(P[s_p].t=="vp"){ if(P[s_p].x > 2) return; if(frame[P[s_p].y][P[s_p].x+1] != -1) return; if(frame[P[s_p].y+1][P[s_p].x+1] != -1) return; }
        if(P[s_p].t=="sp"){ if(P[s_p].x > 2) return; if(frame[P[s_p].y][P[s_p].x+1] != -1) return; }
        save();
        P[s_p].x++;
    } m_c++; reframe();
}

// view p
function disp_refresh(){
    var p_id, p_t = 'p';
    for(var i = 0; i < piece_n+1; i++){
        p_id = p_t + i;
        if(P[i].disp == true){ document.getElementById(p_id).style.visibility = 'visible'; }
        else { document.getElementById(p_id).style.visibility = 'hidden'; document.getElementById(p_id).style.top = 150; document.getElementById(p_id).style.left = 150; }
    }
}

// change lv
var level = '*';
function select_level(){
    level = document.getElementById("level").value;
    s1 = -1; s10 = 0; m = 0; r=-1;  clearInterval(tm);
    if(level == 0){ level = '*'; m_c = '*';}
    else { tm = setInterval("second()",1000); m_c = 0;}
    document.getElementById("Count_interface").textContent = m_c; document.getElementById("n_lv").textContent = level; /*document.getElementById("txtGL").value = level;*/
    document.getElementById("second1").textContent = "*"; document.getElementById("second10").textContent = "*"; document.getElementById("minute").textContent = "*";
    document.getElementById("clear").style.visibility = 'hidden'; document.getElementById("DB").style.display = 'none';
    initial();
}

// p put
function t_inp(){P[0]=new P_S(false,0,0,"tani");P[1]=new P_S(false,0,0,"sp");P[2]=new P_S(false,0,0,"sp");P[3]=new P_S(false,0,0,"sp");P[4]=new P_S(false,0,0,"sp");P[5]=new P_S(false,0,0,"sp");P[6]=new P_S(false,0,0,"sp");P[7]=new P_S(false,0,0,"vp");P[8]=new P_S(false,0,0,"vp");P[9]=new P_S(false,0,0,"vp");P[10]=new P_S(false,0,0,"vp");P[11]=new P_S(false,0,0,"hp");P[12]=new P_S(false,0,0,"hp");P[13]=new P_S(false,0,0,"hp");P[14]=new P_S(false,0,0,"hp"); }
function no_1(){P[0]=new P_S(true,1,0,P[0].t);P[1]=new P_S(true,1,2,P[1].t);P[2]=new P_S(true,2,2,P[2].t);P[3]=new P_S(true,1,3,P[3].t);P[4]=new P_S(true,2,3,P[4].t);P[5]=new P_S(true,0,4,P[5].t);P[6]=new P_S(true,3,4,P[6].t);P[7]=new P_S(true,0,0,P[7].t);P[8]=new P_S(true,3,0,P[8].t);P[9]=new P_S(true,0,2,P[9].t);P[10]=new P_S(true,3,2,P[10].t);P[11]=new P_S(false,0,0,P[11].t);P[12]=new P_S(false,0,0,P[12].t);P[13]=new P_S(false,0,0,P[13].t);P[14]=new P_S(false,0,0,P[14].t);}
function no_2(){P[0]=new P_S(true,1,0,P[0].t);P[1]=new P_S(true,0,0,P[1].t);P[2]=new P_S(true,3,0,P[2].t);P[3]=new P_S(true,0,1,P[3].t);P[4]=new P_S(true,3,1,P[4].t);P[5]=new P_S(true,0,4,P[5].t);P[6]=new P_S(true,3,4,P[6].t);P[7]=new P_S(false,0,0,P[7].t);P[8]=new P_S(false,0,0,P[8].t);P[9]=new P_S(false,0,0,P[9].t);P[10]=new P_S(false,0,0,P[10].t);P[11]=new P_S(true,0,2,P[11].t);P[12]=new P_S(true,2,2,P[12].t);P[13]=new P_S(true,0,3,P[13].t);P[14]=new P_S(true,2,3,P[14].t);}
function no_3(){P[0]=new P_S(true,1,0,P[0].t);P[1]=new P_S(true,0,3,P[1].t);P[2]=new P_S(true,1,3,P[2].t);P[3]=new P_S(true,2,3,P[3].t);P[4]=new P_S(true,3,3,P[4].t);P[5]=new P_S(true,0,4,P[5].t);P[6]=new P_S(true,3,4,P[6].t);P[7]=new P_S(true,0,0,P[7].t);P[8]=new P_S(true,3,0,P[8].t);P[9]=new P_S(false,0,0,P[9].t);P[10]=new P_S(false,0,0,P[10].t);P[11]=new P_S(true,0,2,P[11].t);P[12]=new P_S(true,2,2,P[12].t);P[13]=new P_S(false,0,0,P[13].t);P[14]=new P_S(false,0,0,P[14].t);}
function no_4(){P[0]=new P_S(true,1,0,P[0].t);P[1]=new P_S(true,0,2,P[1].t);P[2]=new P_S(true,1,2,P[2].t);P[3]=new P_S(true,2,2,P[3].t);P[4]=new P_S(true,3,2,P[4].t);P[5]=new P_S(false,0,0,P[5].t);P[6]=new P_S(false,0,0,P[6].t);P[7]=new P_S(true,0,0,P[7].t);P[8]=new P_S(true,3,0,P[8].t);P[9]=new P_S(true,0,3,P[9].t);P[10]=new P_S(true,3,3,P[10].t);P[11]=new P_S(true,1,3,P[11].t);P[12]=new P_S(false,0,0,P[12].t);P[13]=new P_S(false,0,0,P[13].t);P[14]=new P_S(false,0,0,P[14].t);}
function no_5(){P[0]=new P_S(true,1,0,P[0].t);P[1]=new P_S(true,0,4,P[1].t);P[2]=new P_S(true,1,3,P[2].t);P[3]=new P_S(true,2,3,P[3].t);P[4]=new P_S(true,3,4,P[4].t);P[5]=new P_S(false,0,0,P[5].t);P[6]=new P_S(false,0,0,P[6].t);P[7]=new P_S(true,0,0,P[7].t);P[8]=new P_S(true,3,0,P[8].t);P[9]=new P_S(true,0,2,P[9].t);P[10]=new P_S(true,3,2,P[10].t);P[11]=new P_S(true,1,2,P[11].t);P[12]=new P_S(false,0,0,P[12].t);P[13]=new P_S(false,0,0,P[13].t);P[14]=new P_S(false,0,0,P[14].t);}
function no_6(){P[0]=new P_S(true,1,0,P[0].t);P[1]=new P_S(true,3,1,P[1].t);P[2]=new P_S(true,0,1,P[2].t);P[3]=new P_S(true,0,4,P[3].t);P[4]=new P_S(true,3,4,P[4].t);P[5]=new P_S(false,0,0,P[5].t);P[6]=new P_S(false,0,0,P[6].t);P[7]=new P_S(true,0,2,P[7].t);P[8]=new P_S(true,3,2,P[8].t);P[9]=new P_S(false,0,0,P[9].t);P[10]=new P_S(false,0,0,P[10].t);P[11]=new P_S(true,1,2,P[11].t);P[12]=new P_S(true,1,3,P[12].t);P[13]=new P_S(true,1,4,P[13].t);P[14]=new P_S(false,0,0,P[14].t);}
function no_7(){P[0]=new P_S(true,2,1,P[0].t);P[1]=new P_S(true,1,0,P[1].t);P[2]=new P_S(true,2,0,P[2].t);P[3]=new P_S(true,3,0,P[3].t);P[4]=new P_S(true,3,3,P[4].t);P[5]=new P_S(false,0,0,P[5].t);P[6]=new P_S(false,0,0,P[6].t);P[7]=new P_S(true,0,0,P[7].t);P[8]=new P_S(true,0,2,P[8].t);P[9]=new P_S(true,1,1,P[9].t);P[10]=new P_S(false,0,0,P[10].t);P[11]=new P_S(true,1,3,P[11].t);P[12]=new P_S(true,2,4,P[12].t);P[13]=new P_S(false,0,0,P[13].t);P[14]=new P_S(false,0,0,P[14].t);}
function no_0(){P[0]=new P_S(false,0,0,P[0].t);P[1]=new P_S(false,0,0,P[1].t);P[2]=new P_S(false,0,0,P[2].t);P[3]=new P_S(false,0,0,P[3].t);P[4]=new P_S(false,0,0,P[4].t);P[5]=new P_S(false,0,0,P[5].t);P[6]=new P_S(false,0,0,P[6].t);P[7]=new P_S(false,0,0,P[7].t);P[8]=new P_S(false,0,0,P[8].t);P[9]=new P_S(false,0,0,P[9].t);P[10]=new P_S(false,0,0,P[10].t);P[11]=new P_S(false,0,0,P[11].t);P[12]=new P_S(false,0,0,P[12].t);P[13]=new P_S(false,0,0,P[13].t);P[14]=new P_S(false,0,0,P[14].t);}

// win
function i_clear(){
    if(P[0].x == 1 && P[0].y == 3){
        clearInterval(tm);
        //document.getElementById("grade").value = level; document.getElementById("Count").value = m_c;
        document.getElementById("clear").style.visibility = 'visible'; //document.getElementById("DB").style.display = 'block';
        //const e = document.getElementById("DB"); const rect = e.getBoundingClientRect();
        //const SCheight = window.pageYOffset || document.documentElement.scrollTop; const position = window.innerHeight * 0.8;
        //window.scrollTo({top: rect.bottom + SCheight - position, behavior: "smooth"});
    }
}

//ニックネーム入力
function check_nickname() {
    const input = document.getElementById("nickname");
    const button = document.getElementById("submit_button");
    if(!input.value.match(/\W/g,) && input.value.length) { button.disabled = false; }
    else { button.disabled = true;}
}
//送信
function check_click() {
    document.getElementById("form").style.display = "none";
    const button_1 = document.getElementById("ranking_a");
    const button_2 = document.getElementById("ranking_b");
    button_1.disabled = false;
    button_2.disabled = false;
}

// timer
var r = 0, s10 = 0, m = 0, tm;
function second(){
    r += 1; s1 += 1;
    //document.getElementById("record").value = r;
    if(s1==10){ s1 = 0; s10 += 1; if(s10==6){ s10 = 0; m += 1; }}
    box_s1.innerHTML = s1;
    box_s10.innerHTML = s10;
    box_m.innerHTML = m;
    if(m == 99 && s10 == 5 && s1 == 9){ clearInterval(tm); }
}
