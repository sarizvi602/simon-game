$(document).ready(function() {
  var switchOn = false; //game is Off
  var strictOn = false; //strict is Off
  var startOn = false; //sequence player is Off
  var seqTable = []; //playing sequence table
  var seqOn=false;
  var playCount=0;
  var grnSound = $("#sound1")[0]; //sound for green button
  var redSound = $("#sound2")[0]; //sound for red button
  var yelSound = $("#sound3")[0]; //sound for yellow button
  var bluSound = $("#sound4")[0]; //sound for blue button
  var failSimon = $("#failsound")[0]; //sound for wrong press
  
  //turn on green light
  function lightGreen() {
    $("#grnBtn").addClass('grnCol2');
    grnSound.play();
    setTimeout(function() {
      $("#grnBtn").removeClass('grnCol2');
    }, 500);
  }

  //turn on red light
  function lightRed() {
    $("#redBtn").addClass('redCol2');
    redSound.play();
    setTimeout(function() {
      $("#redBtn").removeClass('redCol2');
    }, 500);
  }

  //turn on yellow light
  function lightYellow() {
    $("#yelBtn").addClass('yelCol2');
    yelSound.play();
    setTimeout(function() {
      $("#yelBtn").removeClass('yelCol2');
    }, 500);
  }

  //turn on blue light
  function lightBlue() {
    $("#bluBtn").addClass('bluCol2');
    bluSound.play();
    setTimeout(function() {
      $("#bluBtn").removeClass('bluCol2');
    }, 500);
  }
  
  function failChoice() { //for pressing wrong color
    //light up all buttons
    $("#grnBtn").addClass('grnCol2');
    $("#redBtn").addClass('redCol2');
    $("#yelBtn").addClass('yelCol2');
    $("#bluBtn").addClass('bluCol2');
    failSimon.play();
    setTimeout(function() {
      $("#grnBtn").removeClass('grnCol2');
      $("#redBtn").removeClass('redCol2');
      $("#yelBtn").removeClass('yelCol2');
      $("#bluBtn").removeClass('bluCol2');
    }, 500);
  }
  
  function sequenceBegin(addMore) {//play sequence
    seqOn=true;
    if (addMore) {//add one more randonly
      seqTable.push(Math.floor(Math.random() * 4) + 1);
    }
    if (seqTable.length<10) {//displaying the count
      $("#screen").html('0'+seqTable.length.toString());
    } else {
      $("#screen").html(seqTable.length.toString());
    }
    var i=0; //play one by one for each sequence
    var intervalId = setInterval(function() {
      switch (seqTable[i]) {
        case 1: //for green
          lightGreen();
          break;
        case 2: //for red
          lightRed();
          break;
        case 3: //for yellow
          lightYellow();
          break;
        case 4: //for blue
          lightBlue();
          break;
      }
      i++;
      if (i===seqTable.length) {
        clearInterval(intervalId);
      }
    },1000);
    seqOn=false;
  }
  
  //when on and off switch is pressed
  $("#onOff").click(function() {
    if (switchOn) {
      switchOn = false;
      strictOn = false;
      startOn = false;
      $("#screen").html(' ');
      $("#strictOnOff").removeClass('strictOnOff2');
      seqTable = [];
    } else {
      switchOn = true;
      $("#screen").html('0' + seqTable.length.toString());
    }
  });
  
  //turning on the game
  $("#startBtn").click(function() {
    if (switchOn && !startOn) {
        startOn = true;
        sequenceBegin(true);
    }
  });
  
  //strict button click
  $("#strictBtn").click(function() {
    if (switchOn && !startOn) {
      if (strictOn) {//turn off strict mode
        strictOn=false;
        $("#strictOnOff").removeClass('strictOnOff2');
      } else {//turn on strict mode
        strictOn=true;
        $("#strictOnOff").addClass('strictOnOff2');
      }  
    }
  });
  
  //when green button is pressed
  $("#grnBtn").click(function() {
    //Make sure switch is On, start is On and sequence is Off
    if (switchOn && startOn && !seqOn) {
      //Check click with item on Table
      if (seqTable[playCount]===1) {
        lightGreen(); //play green
        //make sure it is not last in play Count
        if (playCount+1<seqTable.length) {
          playCount+=1;  
        } else {//last in play Count
          playCount=0;
          sequenceBegin(true);
        }
      } else {// not in sequence table
        failChoice(); //run the fail sequence
        playCount=0; // turn count back to zero
        if (strictOn) {//if strict is on
          seqTable=[];//start from beginning
          sequenceBegin(true);
        } else {//strict is off
          sequenceBegin(false); //start from previous sequence
        }
      }   
    }  
  });
  
  //when red button is clicked, use same logic as green
  $("#redBtn").click(function() {
    if (switchOn && startOn && !seqOn) {
      if (seqTable[playCount]===2) {
        lightRed();
        if (playCount+1<seqTable.length) {
          playCount+=1;  
        } else {
          playCount=0;
          sequenceBegin(true);
        }
      } else {
        failChoice();
        playCount=0;
        if (strictOn) {
          seqTable=[];
          sequenceBegin(true);
        } else {
          sequenceBegin(false);
        }
      }   
    }
  });
  
  //when yellow button is clicked, use same logic as green
  $("#yelBtn").click(function() {
    if (switchOn && startOn && !seqOn) {
      if (seqTable[playCount]===3) {
        lightYellow();
        if (playCount+1<seqTable.length) {
          playCount+=1;  
        } else {
          playCount=0;
          sequenceBegin(true);
        }
      } else {
        failChoice();
        playCount=0;
        if (strictOn) {
          seqTable=[];
          sequenceBegin(true);
        } else {
          sequenceBegin(false);
        }
      }   
    }
  });
  
  //when blue button is clicked, use same logic as green
  $("#bluBtn").click(function() {
    if (switchOn && startOn && !seqOn) {
      if (seqTable[playCount]===4) {
        lightBlue();
        if (playCount+1<seqTable.length) {
          playCount+=1;  
        } else {
          playCount=0;
          sequenceBegin(true);
        }
      } else {
        failChoice();
        playCount=0;
        if (strictOn) {
          seqTable=[];
          sequenceBegin(true);
        } else {
          sequenceBegin(false);
        }
      }   
    }
  });

});