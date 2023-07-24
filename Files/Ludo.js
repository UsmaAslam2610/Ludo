var redHomeArr = [];
var blueHomeArr = [];
var redHomeCount = 0;
var blueHomeCount = 0;
var check = false;
var path1 = "";
var turn = 0;//red
//turn = 1 -->Blue
var redArr = [];
var blueArr = [];
var r1, r2, r3, r4, b1, b2, b3, b4;
r1 = r2 = r3 = r4 = b1 = b2 = b3 = b4 = 0;
var counter = 0;
var result = 0;
var redCount = 0;
var blueCount = 0;
var redInvalidPath = [];
var blueInvalidPath = [];
var redWin = 0;
var blueWin = 0;
 var parent = null;
 var child=null;
 var parentRed = ["rs","rw2","rw3","rw4","rw5","gw11","gw9","gw7","gws5","gw4","gw1","gw2","gw3","gs","gw6","gw8","gw10","gw12","bw1","bw2","bw3","bws4","bw5","bw6",
  "bw7","bw12","bs","bw11","bw10","bw9","bw8","yw2","yw4","yw6","yws8","yw9","yw12","yw11","yw10","ys","yw7","yw5","yw3","yw1","rw12",
  "rw11","rw10","rws9","rw8","rw7","rw6","rr1","rr2","rr3","rr4","rr5","win"];
var parentBlue = ["bs","bw11","bw10","bw9","bw8","yw2","yw4","yw6","yws8","yw9","yw12","yw11","yw10","ys","yw7","yw5",
  "yw3","yw1","rw12","rw11","rw10","rws9","rw8","rw7","rw6","rw1","rs","rw2","rw3","rw4","rw5","gw11","gw9","gw7","gws5",
  "gw4","gw1","gw2","gw3","gs","gw6","gw8","gw10","gw12","bw1","bw2","bw3","bws4","bw5","bw6","bw7","bb5","bb4","bb3","bb2","bb1","win1"];

function searchRed(e) { // ready to open after 6 
  if (redArr.indexOf(e.target.id, 0) != -1) {
    return true;
  } else {
    return false;
  }
}
function redHomeArrCheck(e) {
  if (redHomeArr.indexOf(e.target.id, 0) != -1) {
    return true;
  } else {
    return false;
  }
}
function blueWinIdCheck(wid) {
  if (blueInvalidPath.indexOf(wid, 0) != -1) {
    console.log(blueInvalidPath);
    return true;
  } else {
    return false;
  }
}
function redWinIdCheck(wid) {
  if (redInvalidPath.indexOf(wid, 0) != -1) {
    console.log(redInvalidPath);
    return true;
  } else {
    return false;
  }
}
function blueHomeArrCheck(e) {
  if (blueHomeArr.indexOf(e.target.id, 0) != -1) {
    return true;
  } else {
    return false;
  }
} 
function searchBlue(e) {
  if (blueArr.indexOf(e.target.id, 0) != -1) {
    return true;
  } else {
    return false;
  }
}
function roll(){
  var audio = new Audio('dice.mp3');
  audio.play();
  result = Math.floor(Math.random() * 6) + 1;
  switch (result) {
    case 1:
      path = "1";
      break;
    case 2:
      path = "2";
      break;
    case 3:
      path = "3";
      break;
    case 4:
      path = "4";
      break;
    case 5:
      path = "5";
      break;
    case 6:
      path = "6";
      break;
  }
  var dice = document.querySelector("#dice");
  dice.setAttribute("src", path + ".jpg");
  const button = document.querySelector("#btn");
  button.disabled = true;
  turnChange();
  const btn1=document.getElementById("restarts");
  btn1.disabled=true;

}
function turnChange(){
        if (turn == 0 && redCount == 0  && result != 6)
        {
            var diceParent = document.getElementById('diceBox1');
            var diceChild = document.getElementById('btn');
            diceParent.appendChild(diceChild);
            const button = document.querySelector("#btn");
            button.disabled = false;
            result = 0;
            turn = 1;
        }
        else if ( turn == 1 && blueCount == 0  && result != 6) 
        {
            result = 0;
            turn = 0;
            var diceParent = document.getElementById('diceBox');
            var diceChild = document.getElementById('btn');
            diceParent.appendChild(diceChild);
            const button = document.querySelector("#btn");
            button.disabled = false;
        }
        else if ( turn == 1 && blueCount == 0  && result == 6) 
        {
            turn = 1;
            var diceParent = document.getElementById('diceBox1');
            var diceChild = document.getElementById('btn');
            diceParent.appendChild(diceChild);

            
        }
        else if ( turn == 0 && redCount == 0  && result == 6) 
        {
            turn = 0;
            var diceParent = document.getElementById('diceBox');
            var diceChild = document.getElementById('btn');
            diceParent.appendChild(diceChild);
        }
}
function select(e) 
{
  
    if(turn == 0 && $(e.target).attr("class") == "redMarble")
    {
      if (result == 6 && redCount <= 4 && !searchRed(e) && !redHomeArrCheck(e) ) {
              // alert("Nae chaly red");
              redArr.push(e.target.id);
              parent = document.getElementById(parentRed[0]);
              child = document.getElementById(e.target.id);
              parent.appendChild(child);
              const button = document.querySelector("#btn");
              button.disabled = false;
              var diceParent = document.getElementById('diceBox');
              var diceChild = document.getElementById('btn');
              diceParent.appendChild(diceChild);
              redCount++;
              turn = 0;
              result = 0;
      }
      else if(result == 0 && searchRed(e))
      {
        var diceParent = document.getElementById('diceBox');
        var diceChild = document.getElementById('btn');
        diceParent.appendChild(diceChild);
      }
      else if ($(e.target).attr("class") == "redMarble" && searchRed(e) && checkPathRed(e))
      {
        switch (e.target.id) {
          case "r1":
            if(r1+result<parentRed.length)
            {
              r1 += result;
            }
            parent = document.getElementById(parentRed[r1]); 
            break;
          case "r2":
            if(r2+result<parentRed.length)
            {
              r2 += result;
            }
            parent = document.getElementById(parentRed[r2]);
            break;
          case "r3":
            if(r3+result<parentRed.length)
            {
              r3 += result;
            }
            parent = document.getElementById(parentRed[r3]);
            break;
          case "r4":
            if(r4+result<parentRed.length)
            {
              r4 += result;
            }
            parent = document.getElementById(parentRed[r4]);
            break;
        }
        if ( parent.id == "rws9" ||
        parent.id == "gws5" ||
        parent.id == "bws4" ||
        parent.id == "yws8" ||
        parent.id == "bs" ||
        parent.id == "gs" ||
        parent.id == "ys" ||
        parent.id == "rr1" ||
        parent.id == "rr2" ||
        parent.id == "rr3" ||
        parent.id == "rr4" ||
        parent.id == "rr5" ||
        parent.id == "win"){
            let flag1 = false, win1 = false;
              child = document.getElementById(e.target.id);
              parent.appendChild(child);
              if (parent.id == "win")
              {
                if (toWin("redMarble", "win") == "red") 
                {
                    var crown = document.getElementById("dice1");
                    crown.setAttribute("src", "crown.png");
                    win1 = true;
                }
                else{
                    removeFromArray("redMarble",e.target.id);
                    redHomeArr.push(e.target.id);
                    flag1 = true;
                    result = 0;
                }
                var audio = new Audio('win.mp3');
                audio.play();
              }
              if(win1)
              {
                var diceParent = document.getElementById('diceBox');
                var diceChild = document.getElementById('btn');
                diceParent.appendChild(diceChild);
                const btn=document.getElementById("restarts");
                btn.disabled=false;
                const btn1=document.getElementById("btn");
                btn1.disabled=true;
              }
              else if(redWinIdCheck(e.target.id))
              {
                turn = 0;
                const button = document.querySelector("#btn");
                button.disabled = true;
                var diceParent = document.getElementById('diceBox');
                var diceChild = document.getElementById('btn');
                diceParent.appendChild(diceChild);
              }
              else if((result != 6 || result==6) && flag1)
              {
                turn = 0;
                const button = document.querySelector("#btn");
                button.disabled = false;
                var diceParent = document.getElementById('diceBox');
                var diceChild = document.getElementById('btn');
                diceParent.appendChild(diceChild);
                result = 0;
              }
              else if( !flag1 || ( result != 6 && turn == 0)){
                turn = 1;
                var diceParent = document.getElementById('diceBox1');
                var diceChild = document.getElementById('btn');
                diceParent.appendChild(diceChild);
                const button = document.querySelector("#btn");
                button.disabled = false;
                result = 0;
              }
        }
        else {
              var idd = remChild(parent.id, "redMarble");
              if (idd != "null")
              {
                  if (idd == "b1"){
                  b1 = 0;
                  AfterKill("bh1" , "b1");
                  } else if (idd == "b2") {
                  b2 = 0;
                  AfterKill("bh2" , "b2");
                  } else if (idd == "b3") {
                  b3 = 0;
                  AfterKill("bh3" , "b3");
                  } else if (idd == "b4") {
                  b4 = 0;
                  AfterKill("bh4" , "b4");
                  }
              }
              child = document.getElementById(e.target.id);
              parent.appendChild(child);
              if((result == 6 && turn ==0))
              {
                turn = 0;
                var diceParent = document.getElementById('diceBox');
                var diceChild = document.getElementById('btn');
                diceParent.appendChild(diceChild);
                const button = document.querySelector("#btn");
                button.disabled = false;
              }
              else if(( result != 6 && turn ==0)){
                turn = 1;
                var diceParent = document.getElementById('diceBox1');
                var diceChild = document.getElementById('btn');
                diceParent.appendChild(diceChild);
                const button = document.querySelector("#btn");
                button.disabled = false;
              }
              result = 0;
            }
      }
      redInvalidPath = [];
    }

    else if (turn == 1 && $(e.target).attr("class") == "blueMarble")
    {
      if (result == 6 && blueCount <= 4 && !searchBlue(e) && !blueHomeArrCheck(e))
      {
            blueArr.push(e.target.id);
            parent = document.getElementById(parentBlue[0]);
            child = document.getElementById(e.target.id);
            parent.appendChild(child);
            blueCount++;
            var diceParent = document.getElementById('diceBox1');
            var diceChild = document.getElementById('btn');
            diceParent.appendChild(diceChild);
            const button = document.querySelector("#btn");
            button.disabled = false;
            result = 0;
            turn = 1;
      }
      else if(result == 0 && searchBlue(e))
      {
        var diceParent = document.getElementById('diceBox1');
        var diceChild = document.getElementById('btn');
        diceParent.appendChild(diceChild);
      }
      else if ($(e.target).attr("class") == "blueMarble" && searchBlue(e) && checkPath(e)) 
      {
        switch (e.target.id){
          case "b1":
            if(b1+result<parentBlue.length)
              {
                b1 += result;
              }
            parent = document.getElementById(parentBlue[b1]);  
            break;
          case "b2":
            if(b2+result<parentBlue.length)
            {
              b2+= result;
            }
            parent = document.getElementById(parentBlue[b2]);
            break;
          case "b3":
            if(b3+result<parentBlue.length)
            {
              b3 += result;
            }
            parent = document.getElementById(parentBlue[b3]);
            break;
          case "b4":
            if(b4+result<parentBlue.length)
            {
              b4 += result;
            }
            parent = document.getElementById(parentBlue[b4]);
            break;
        }
        
        if ( parent.id == "rws9" ||
        parent.id == "gs" ||
        parent.id == "gws5" ||
        parent.id == "bws4" ||
        parent.id == "yws8" ||
        parent.id == "rs" ||
        parent.id == "ys" ||
        parent.id == "bb1" ||
        parent.id == "bb2" ||
        parent.id == "bb3" ||
        parent.id == "bb4" ||
        parent.id == "bb5" ||
        parent.id == "win1") {
          let flag = true,win = false;
            child = document.getElementById(e.target.id);
            parent.appendChild(child);
            if (parent.id == "win1") {
                    if (toWin("blueMarble", "win1") == "blue") {
                       
                        var crown = document.getElementById("dice2");
                        crown.setAttribute("src", "crown.png");
                        win = true;
                    } 
                    else{
                      removeFromArray("blueMarble",e.target.id);
                      blueHomeArr.push(e.target.id);
                      flag = false;
                  }
                  var audio = new Audio('win.mp3');
                  audio.play();
                }
                if(win)
                {
                  var diceParent = document.getElementById('diceBox1');
                  var diceChild = document.getElementById('btn');
                  diceParent.appendChild(diceChild);
                  const btn=document.getElementById("restarts");
                  btn.disabled=false;
                  const btn1=document.getElementById("btn");
                  btn1.disabled=true;
                }
                else if(blueWinIdCheck(e.target.id))
                {
                    turn = 1;
                    const button = document.querySelector("#btn");
                    button.disabled = true;
                    var diceParent = document.getElementById('diceBox1');
                    var diceChild = document.getElementById('btn');
                    diceParent.appendChild(diceChild);
                }
                else if((result == 6 || result != 6) && !flag)
                {
                  turn = 1;
                  const button = document.querySelector("#btn");
                  button.disabled = false;
                  var diceParent = document.getElementById('diceBox1');
                  var diceChild = document.getElementById('btn');
                  diceParent.appendChild(diceChild);
                  result = 0;
                }
                else if( flag || ( result != 6 && turn == 1)){
                    turn = 0;
                    var diceParent = document.getElementById('diceBox');
                    var diceChild = document.getElementById('btn');
                    diceParent.appendChild(diceChild);
                    const button = document.querySelector("#btn");
                    button.disabled = false;
                    result = 0;
                }
        } 
        else {
              var idd = remChild(parent.id, "blueMarble");
              if (idd != "null")
              {
                  if (idd == "r1") {
                  r1 = 0;
                  AfterKill("rh1" , "r1");
                  } else if (idd == "r2") {
                  r2 = 0;
                  AfterKill("rh2" , "r2");
                  } else if (idd == "r3") {
                  r3 = 0;
                  AfterKill("rh3" , "r3");
                  } else if (idd == "r4") {
                  r4 = 0;
                  AfterKill("rh4" , "r4");
                  }
              }

              child = document.getElementById(e.target.id);
              parent.appendChild(child);
              
              if((result == 6 && turn ==1))
              {
                turn = 1;
                const button = document.querySelector("#btn");
                button.disabled = false;
                
              }
              else if(( result != 6 && turn ==1)){
                turn = 0;
                var diceParent = document.getElementById('diceBox');
                var diceChild = document.getElementById('btn');
                diceParent.appendChild(diceChild);
                const button = document.querySelector("#btn");
                button.disabled = false;
              }
              result = 0;
            }
      }
      blueInvalidPath = [];
    }
}
function AfterKill(homeId, childId)
{
    var audio = new Audio('killed.mp3');
    audio.play();
    var parent1 = document.getElementById(homeId);
    var child1 = document.getElementById(childId);
    parent1.appendChild(child1);
}
function restart() 
{
document.getElementById("rh1").appendChild(document.getElementById("r1"));
document.getElementById("rh2").appendChild(document.getElementById("r2"));
document.getElementById("rh3").appendChild(document.getElementById("r3"));
document.getElementById("rh4").appendChild(document.getElementById("r4"));
  
document.getElementById("bh1").appendChild(document.getElementById("b1"));
document.getElementById("bh2").appendChild(document.getElementById("b2"));
document.getElementById("bh3").appendChild(document.getElementById("b3"));
document.getElementById("bh4").appendChild(document.getElementById("b4"));
var crown = document.getElementById("dice1");
crown.setAttribute("src", "redGirl.png");
var crown1 = document.getElementById("dice2");
crown1.setAttribute("src", "blueFinal.png");
var redHomeArr = [];
var blueHomeArr = [];
var redHomeCount = 0;
var blueHomeCount = 0;
var path = "";
var path1 = "";
var turn = 0;//red
//turn = 1 -->Blue
var redArr = [];
var blueArr = [];
var r1, r2, r3, r4, b1, b2, b3, b4;
r1 = r2 = r3 = r4 = b1 = b2 = b3 = b4 = 0;
var counter = 0;
var result = 0;
var redCount = 0;
var blueCount = 0;
var redWin = 0;
var blueWin = 0;
 var parent = null;
 var child=null;
    var dice = document.querySelector("#dice");
    dice.setAttribute("src", "dice.jpg");
    const btn1=document.getElementById("btn");
    btn1.disabled=false;


  }
  function toWin(classN, index) {
    if (index == "win" || index=="win1") {
      if (classN == "blueMarble") {
        blueWin++;
        if (blueWin == 4) {
          return "blue";
        }
      } else if (classN == "redMarble") {
        redWin++;
        if (redWin == 4) {
          return "red";
        }
      }
    }
  }
  function remChild(parents, classNames) {
    if (parents != null) {
      var c = document.getElementById(parents).children; //all child nodes
      var ch = document.getElementById(parents); //get only parent
      if (c != null && ch != null) {
        for (var i = 0; i < c.length; i++) {
          if (classNames != c[i].className) {
            if(c[i].className == 'redMarble')
            {
               removeFromArray("redMarble",c[i].id);
            }
            else if(c[i].className == 'blueMarble')
            {
               removeFromArray("blueMarble",c[i].id);
            }
            ch.removeChild(ch.childNodes[i]); //remove from this
            return c[i].id;
          }
        }
      }
    }
    return "null";
  }
function removeFromArray(cName,ids)
{
  var ind;
  if(cName == "redMarble")
  {
    ind = redArr.indexOf(ids,0);
    if(ind > -1)
    { 
      redArr.splice(ind, 1);
      redCount--;
      result=0;
    }
  }
  else if(cName == "blueMarble")
  {
    ind = blueArr.indexOf(ids,0);
    if(ind > -1)
    {
      blueArr.splice(ind, 1);
      blueCount--;
       result=0;
    }
  }
}

function checkPath(e)
{
  var ff = false;
       for(var i = 0;i<blueArr.length;i++)
       {
          if(blueArr[i]   == "b1")
          {
            if((b1+result) < parentBlue.length)
            {
              ff = true;
            }
            else if(!blueWinIdCheck("b1"))
            {
                blueInvalidPath.push("b1");
            }
          }
          if(blueArr[i]   == "b2")
            {
              if((b2+result) < parentBlue.length)
              {
                ff = true;
              }
              else if(!blueWinIdCheck("b2"))
              {
                  blueInvalidPath.push("b2");
              }
            }
             if(blueArr[i]  == "b3"){
              if((b3+result) < parentBlue.length)
              {
                ff = true;
              }else if(!blueWinIdCheck("b3"))
              {
                  blueInvalidPath.push("b3");
              }

            }
            if(blueArr[i]  == "b4")
            {
              if((b4+result) < parentBlue.length)
              {
                ff = true;
              }else if(!blueWinIdCheck("b4"))
              {
                  blueInvalidPath.push("b4");
              }
            }
        }
        if(ff)
        {
          return true;
        }
        else if(blueArr.length == blueInvalidPath.length){
          turn=0;
          result=0;
          var diceParent = document.getElementById('diceBox');
          var diceChild = document.getElementById('btn');
          diceParent.appendChild(diceChild);
          const button = document.querySelector("#btn");
          button.disabled = false;
          return false;
        }
        return false;
        
}
function arr_diff (a1,a2) {

  var a = [], diff = [];

  for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
          delete a[a2[i]];
      } else {
          a[a2[i]] = true;
      }
  }

  for (var k in a) {
      diff.push(k);
  }

  return diff;
}
function checkPathRed(e)
{
  let f =false;
       for(var i = 0;i<redArr.length;i++)
       {
          if(redArr[i] == "r1")
          {
            if((r1+result) < parentRed.length)
            {
              f = true;
            }else if(!redWinIdCheck("r1"))
            {
                redInvalidPath.push("r1");
            }
          }
          else if(redArr[i] == "r2")
            {
              if((r2+result) < parentRed.length)
              {
                f = true;
              }else if(!redWinIdCheck("r2"))
              {
                  redInvalidPath.push("r2");
              }
            }
            else if(redArr[i]   == "r3")
            {
              if((r3+result) < parentRed.length)
              {
                f = true;
              }else if(!redWinIdCheck("r3"))
              {
                  redInvalidPath.push("r3");
              }
            }
            else if(redArr[i]   == "r4")
            {
              if((r4+result) < parentRed.length)
              {
                f = true;
              }else if(!redWinIdCheck("r4"))
              {
                  redInvalidPath.push("r4");
              }
            }
        }
         if(f)
         {
           return true;
         }
         else if(redArr.length == redInvalidPath.length || !f){
          var diceParent = document.getElementById('diceBox1');
          var diceChild = document.getElementById('btn');
          diceParent.appendChild(diceChild);
          turn = 1;
          result = 0;
          const button = document.querySelector("#btn");
          button.disabled = false;
          return false;
        }
        }