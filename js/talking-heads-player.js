// JavaScript Document

// Talking Heads Player version 0.9.1
////controls- true,false, mouse
//  autostart- no, yes
let talkingHeadsVideo = {
  holder: $("#player-holder"),
  player: $("#talking-head-player"),
  container: {
    controls: $("#controls")
  },
  btns: {
    bigPlayBtn: $('#bigPlayBtn'),
    restart: $('#btn-restart'),
    playToggle: $('#btn-play-toggle'),
    stop: $('#btn-stop'),
    mute: $('#btn-mute'),
    fullscreen: $('#btn-fullscreen')
  },
  started: false,
  width: 1280,
  height: 720
};
let th = talkingHeadsVideo.player,
  hotspotID,
  title, curHotspot, hotspot, windowSize, newWidth, sort,newSort;
const progress = $("#progress"),
  volumeBar = $("#volume-bar"),
  holder = talkingHeadsVideo.holder,
  btns = talkingHeadsVideo.btns,
  progressBar = $("#progress-bar"),
  time = $("#time"),
  player = talkingHeadsVideo.player[0],
  process = $("#elearning-process"),
  chapterPath = "chapters/";

function createTalkingHead(autostart, controls, color, chapter) {
  //Hotspot creation
  function loadChapter(currentChapter) {
    console.log(chapterPath + currentChapter + ".json");
    let json = (function () {
      let json = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': chapterPath + currentChapter + ".json",
        'dataType': "json",
        'success': function (data) {
          json = data;
        }
      });
      return json;
    })();
    console.log(json);
    title = json[0].video;
    talkingHeadsVideo.chapter = json[0];
    curHotspot = 0;
    restartBar();
  }
  loadChapter(chapter);
  talkingHeadsVideo.portrait = window.matchMedia("(orientation: portrait)");
  talkingHeadsVideo.landscape = window.matchMedia("(orientation: landscape)");
  talkingHeadsVideo.showForm = false;
  talkingHeadsVideo.showingForm = false;
  talkingHeadsVideo.curWidth = $("#talking-head-player").width();
  talkingHeadsVideo.curHeight = $("#talking-head-player").height();
  talkingHeadsVideo.widthRatio = talkingHeadsVideo.curWidth / talkingHeadsVideo.width;
  talkingHeadsVideo.autostart = autostart;
  talkingHeadsVideo.controls = controls;
  talkingHeadsVideo.path = "videos/";
  talkingHeadsVideo.video = talkingHeadsVideo.path + title + ".mp4";
  talkingHeadsVideo.poster = talkingHeadsVideo.path + "poster.jpg";
  th.attr("src", talkingHeadsVideo.video);
  $.get(talkingHeadsVideo.poster)
    .done(function () {
      th.attr("poster", talkingHeadsVideo.poster);
    }).fail(function () {
      console.log("fail");
    });
  setProgressBar();
  checkOrientation();
  //-------------------------------Set Color
  process.css("background-color", "#" + color);
  $("#controls").css("background-color", convertHex(color, 80));
  $(".progress-bar").css("background-color", "#" + color);
  $("#bigPlayBtn").css("background-color", convertHex(color, 70));
  $("#bigPlayBtn").css("border-color", convertHex(color, 90));
  //-------------------------------Set Controls
  switch (talkingHeadsVideo.controls) {
    case "true":
      $("#controls").addClass("visible");
      $("#controls").css("opacity", 1);
      break;
    case "false":
      $("#controls").addClass("invisible");
      break;
    default:
      talkingHeadsVideo.holder.addClass("mouse-controls");
      break;
  }
  //--------------------------------Set autostart
  tryAutostart();
  //-----------------autostart poster
  function poster() {
    holder.click(function () {
      talkingHeadsVideo.started = true;
      holder.unbind();
      player.load();
      player.muted = false;
      player.play();
      btns.bigPlayBtn.hide("slow");
      showPause();
      btnFunctions();
      time.text(showTime());
    });
  }
  //Start functions--------------------------------------------------
  function tryAutostart() {
    let promise = player.play();
    console.log(promise);
    if (promise !== undefined) {
      promise.then(_ => {
        showPause();
        btns.bigPlayBtn.hide("slow");
        btnFunctions();
      }).catch(error => {
        poster();
      });
    }
  }

  function showPause() {
    btns.playToggle.addClass("btn-pause");
    btns.playToggle.removeClass("btn-play");
    btns.bigPlayBtn.hide("slow");
  }

  function showPlay() {
    btns.playToggle.removeClass("btn-pause");
    btns.playToggle.addClass("btn-play");
    btns.bigPlayBtn.show("slow");
  }

  function timedPause() {
    btns.playToggle.removeClass("btn-pause");
    btns.playToggle.addClass("btn-play");
    player.pause();
  }
  //create button functions
  function btnFunctions() {
    //buttons functions--------------------------------------
    $('#player-holder').click(function () {
      if (!talkingHeadsVideo.started) {
        talkingHeadsVideo.started = true;
        player.currentTime = 0;
        player.muted = false;
        showPause();
        th.removeAttr('loop');
      } else {
        switch (event.target.id) {
          case "btn-restart":
            restartBar();
            break;
          case "btn-play-toggle":
          case "bigPlayBtn":
            playToggle();
            break;
          case "btn-stop":
            stopPlayer();
            break;
          case "btn-mute":
            mutePlayer();
            break;
          case "progress":
          case "progress-bar":
            changeTime(event.offsetX);
            break;
          default:
            if (event.target.className === "hotspot") {
              if (talkingHeadsVideo.chapter.hotspots[curHotspot - 1].link === "none") {
                $("#player-holder").find(".hotspot").remove();
                playToggle();
              } else {
                var report = event.target.id;
                loadChapter(report);
                talkingHeadsVideo.video = talkingHeadsVideo.path + title + ".mp4";
                th.attr("src", talkingHeadsVideo.video);
                player.load();
                player.play();
                showPause();
                $("#player-holder").find(".hotspot").remove();
              }
            }
        }
      }
    });
  }

  function playToggle() {
    if (player.paused) {
      btns.bigPlayBtn.hide("slow");
      player.play();
      showPause();
    } else {
      player.pause();
      btns.bigPlayBtn.show("slow");
      showPlay();
    }
  }

  function stopPlayer() {
    player.currentTime = 0;
    player.pause();
    showPlay();
  }

  function mutePlayer() {
    if (player.muted) {
      player.muted = false;
      btns.mute.addClass("btn-unmute");
      btns.mute.removeClass("btn-mute");
    } else {
      player.muted = true;
      btns.mute.addClass("btn-mute");
      btns.mute.removeClass("btn-unmute");
    }
  }

  function changeTime(offset) {
    let w = (offset / progressBar.width());
    progress.css("width", w + '%');
    player.pause();
    player.currentTime = player.duration * w;
    btns.bigPlayBtn.hide("slow");
    player.play();
  }
  //video ended function
  player.onended = function () {
    player.currentTime = player.duration;
  }
  // Update the seek bar as the player plays
  player.ontimeupdate = function () {
    let progressBar = (player.currentTime / player.duration * 100);
    progress.css("width", progressBar + "%");
    time.text(showTime());
    newSort = talkingHeadsVideo.chapter.sort[0];
    if (newSort) {
      if (player.currentTime > newSort.time && newSort.shown === false) {
        newSort.shown = true;
        setSort();
      }
    }
    if (curHotspot < talkingHeadsVideo.chapter.hotspots.length) {
      if (player.currentTime > talkingHeadsVideo.chapter.hotspots[curHotspot].time) {
        if (talkingHeadsVideo.chapter.hotspots[curHotspot].pause) {
          timedPause();
        }
        if (talkingHeadsVideo.chapter.hotspots[curHotspot].link === "form") {
          if (talkingHeadsVideo.curWidth < 900 && !talkingHeadsVideo.showingForm) {
            talkingHeadsVideo.showForm = true;
            altForm();
          } else {
            $("#video-contact").css({
              "display": "inline"
            });
          }
        } else {
          setHotspot(curHotspot);
          curHotspot++;
        }
      }
    }
  }
  //Show time funcion
  function showTime() {
    let cur = getTime(player.currentTime);
    let dur = getTime(player.duration);
    $("#timeReporter").text(player.currentTime)
    return cur + "/" + dur;
  }
  //get time - used for current time and duration
  function getTime(timenow) {
    if (parseInt(timenow) / 60 >= 1) {
      let h = Math.floor(timenow / 3600);
      if (isNaN(h)) {
        h = 0
      }
      timenow = timenow - h * 3600;
      let m = Math.floor(timenow / 60);
      if (isNaN(m)) {
        m = 0
      }
      let s = Math.floor(timenow % 60);
      if (isNaN(s)) {
        s = 0
      }
      if (m.toString().length < 2) {
        m = m;
      }
      if (s.toString().length < 2) {
        s = '0' + s;
      }
      return (m + ':' + s);
    } else {
      let m = Math.floor(timenow / 60);
      if (isNaN(m)) {
        m = 0
      }
      let s = Math.floor(timenow % 60);
      if (isNaN(s)) {
        s = 0
      }
      if (s.toString().length < 2) {
        s = '0' + s;
      }
      return (m + ':' + s);
    }
  }
  // Update the video volume
  volumeBar.change(function () {
    if (player.muted) {
      player.muted = false;
      btns.mute.addClass("btn-mute");
      btns.mute.removeClass("btn-unmute");
    }
    player.volume = volumeBar.val();
  });

  function convertHex(hex, opacity) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return result;
  }

  function restartBar() {
    progress.css("transition", "none");
    progress.css("width", "0%");
    player.currentTime = 0;
    progress.css("transition", "width .3s ease");
  }

  function altForm() {
    talkingHeadsVideo.showingForm = true;
    $("#form-alt").css("height", 440);
    var playerForm = $("#video-contact");
    playerForm.detach().appendTo("#form-alt");
    $("#video-contact").css({
      "display": "inline",
      "position": "static",
      "margin": "1rem auto"
    });
    $("#video-contact .card-contact").css({
      "margin": "1rem auto"
    });
  }

  function setSort() {
        console.log(newSort.shown);
    sort = $("#player-holder").append($('<div>', {
      class: 'list-group',
      id: "simpleList"
    }).css({
      "left": newSort.left + "%",
      "top": newSort.top + "%",
      "bottom": "auto",
      "right": "auto"
    }));
    Sortable.create(simpleList, {
      animation: 150,
      easing: "cubic-bezier(1, 0, 0, 1)"
    });

  }

  function setHotspot(z) {
    hotspot = $("#player-holder").append($('<div>', {
      class: 'hotspot',
      id: talkingHeadsVideo.chapter.hotspots[z].link
    }).css({
      "height": talkingHeadsVideo.chapter.hotspots[z].height + "%",
      "width": talkingHeadsVideo.chapter.hotspots[z].width + "%",
      "left": talkingHeadsVideo.chapter.hotspots[z].left + "%",
      "top": talkingHeadsVideo.chapter.hotspots[z].top + "%",
      "bottom": "auto",
      "right": "auto"
    }));
  }
  //Update controls on window resize
  $(window).resize(function () {
    setProgressBar();
    checkOrientation();
    if (talkingHeadsVideo.showForm && talkingHeadsVideo.curWidth < 900 && !talkingHeadsVideo.showingForm) {
      altForm();
    }
  });
  $(window).on("orientationchange", function () {
    checkOrientation();
  });

  function checkOrientation() {
    let heightTest = talkingHeadsVideo.curHeight - $(window).height();
    if (talkingHeadsVideo.landscape.matches && heightTest > 0) {
      process.height($(window).height());
      process.width($(window).height() * 1.778);
    } else {
      process.css({
        "width": "auto",
        "height": "auto",
      });
    }
  }
  //get controls width and set seekbar width
  function setProgressBar() {
    talkingHeadsVideo.curWidth = $("#controls").outerWidth();
    if (talkingHeadsVideo.curWidth < 500) {
      volumeBar.css("display", "none");
      volumeBar.width(0);
    } else {
      newWidth = parseInt(talkingHeadsVideo.curWidth / 8);
      volumeBar.width(newWidth);
      volumeBar.css("display", "block");
    }
    let width = 0;
    $("#controls").children().each(function () {
      let x = $(this).outerWidth(true);
      width += x;
    });
    width = width - $("#progress-bar").outerWidth() + 10;
    let progressBarWidth = (talkingHeadsVideo.curWidth - width) + "px";
    progressBar.css("width", progressBarWidth);
  }
}
