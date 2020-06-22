<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="index, follow">
<meta name="language" content="English">
<meta name="revisit-after" content="30 days">
<meta name="author" content="WebsiteTalkingHeads.com">
<title>eLearning Videos from Talking Heads&reg;</title>
<meta name="title" content="eLearning Videos from Talking Heads">
<meta name="description" content="We can describe your product, service or procedure in an eLearning Video! Our eLearning Videos focus on your message.">
<meta name="keywords" content="eLearning Corporate Videos, eLearning Explainer Video, eLearning Explainer Videos, eLearning Whiteboard Videos, eLearning Video, eLearning">
<?php include("../../../includes/css-b4.php"); ?>
<link href="css/talkingheadsplayer.min.css" rel="stylesheet" type="text/css">
</head>
<?php
$pageURL = 'http';
if ( $_SERVER[ "HTTPS" ] == "on" ) {
  $pageURL .= "s";
}
$pageURL .= "://";
if ( $_SERVER[ "SERVER_PORT" ] != "80" ) {
  $pageURL .= $_SERVER[ "SERVER_NAME" ] . ":" . $_SERVER[ "SERVER_PORT" ] . $_SERVER[ "REQUEST_URI" ];
} else {
  $pageURL .= $_SERVER[ "SERVER_NAME" ] . $_SERVER[ "REQUEST_URI" ];
}
if ( isset( $_SERVER[ 'HTTP_X_FORWARDED_FOR' ] ) && $_SERVER[ 'HTTP_X_FORWARTDED_FOR' ] != '' ) {
  $sentIP = $_SERVER[ 'HTTP_X_FORWARDED_FOR' ];
} else {
  $sentIP = $_SERVER[ 'REMOTE_ADDR' ];
}
?>
<body>
<?php include("../../../includes/header_b4.php"); ?>
<section class="h-100 w-100 py-2">
  <div id="elearning-process" class="embed-responsive embed-responsive-16by9">
    <div id="player-holder" class="embed-responsive-item">
      <video autoplay playsinline preload id="talking-head-player" width="100%">
        <preference name="AllowInlineMediaPlayback" value="true" />
        <p>Your browser does not support the video tag. Please Visit <a href="https://www.websitetalkingheads.com/support/" title="Please Visit Support"> https://www.websitetalkingheads.com/support/ </a> </p>
      </video>
      <div id="bigPlayBtn"></div>
      <div id="controls">
        <div id="btn-restart" class="player-btn btn-restart" title="replay" accesskey="R"></div>
        <div id="btn-play-toggle" class="player-btn btn-play" title="play" accesskey="P"></div>
        <div id="btn-stop" class="player-btn btn-stop" title="stop" accesskey="X"></div>
        <input type="range" id="volume-bar" title="volume" min="0" max="1" step="0.1" value="1">
        <div id="btn-mute" class="player-btn btn-unmute" title="mute"></div>
        <div class="progress" id="progress-bar" title="duration">
          <div id="progress" class="progress-bar progress-bar-striped" title="current time"></div>
        </div>
        <div class="text-monospace" id="time"> <span id="currentTime">0:00</span>/<span id="fullime">0:00</span> </div>
      </div>
      <div id="video-contact" class="fadeInUp">
        <div class="card card-contact">
          <h5 class="card-header bg-gradient-mine text-white text-center text-uppercase">Contact Us</h5>
          <div class="card-body">
            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
            <form name="New Contact" id="__vtigerWebForm" action="https://websitetalkingheads.od1.vtiger.com/modules/Webforms/capture.php" enctype="multipart/form-data" method="post" accept-charset="utf-8">
              <input name="__vtrftk" type="hidden" value="sid:b79968d90e35e8ca67984873214e5597bbaee00c,1505250565">
              <input name="publicid" type="hidden" value="7d2174f0e1764a1915290b61d33c94b1">
              <input name="urlencodeenable" type="hidden" value="1">
              <input name="name" type="hidden" value="New Contact">
              <input name="__vtCurrency" type="hidden" value="1">
              <input name="designation" type="hidden" value="<?=$sentIP?>" data-label="">
              <input name="cf_1001" type="hidden" value="<?=$pageURL?>" data-label="">
              <table>
                <tbody>
                  <tr>
                    <td><label>Name*</label></td>
                    <td><input name="lastname" required="" type="text" value="" data-label=""></td>
                  </tr>
                  <tr>
                    <td><label>Email*</label></td>
                    <td><input name="email" required="" type="email" value="" data-label=""></td>
                  </tr>
                  <tr>
                    <td><label>Phone*</label></td>
                    <td><input name="phone" required="" type="text" value="" data-label=""></td>
                  </tr>
                  <tr>
                    <td><label>Message</label></td>
                    <td><textarea rows="3" name="description"></textarea></td>
                  </tr>
                </tbody>
              </table>
              <div class="recaptcha-holder"> 
                <script src="https://www.google.com/recaptcha/api.js"></script>
                <div class="g-recaptcha" data-sitekey="6LcmdSATAAAAAGWw734vGo0AXQwuxJS7RmDZA_Fe"></div>
                <input id="captchaUrl" type="hidden" value="https://websitetalkingheads.od1.vtiger.com/modules/Settings/Webforms/actions/ValidateCaptcha.php">
                <input name="recaptcha_validation_value" id="recaptcha_validation_value" type="hidden">
              </div>
              <div class="text-center mt-2">
                <div class="submit-pointer"> <i class="fad fa-hand-point-right shake"></i> </div>
                <button id="vtigerFormSubmitBtn" type="submit" value="Submit" class="btn btn-custom center-block btn-lg text-center">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="form-alt"></div>
  <h3 class="text-center text-monospace" id="timeReporter"></h3>
</section>
<?php include("../../../includes/footer_b4.php"); ?>
<script async src="js/talking-heads-player.js"></script> 
<script async src="js/form.js"></script> 
<script src="js/Sortable.min.js"></script> 
<script async src="js/jquery-sortable.js"></script> 
<script>
    $( document ).ready( function () {
        createTalkingHead( "yes","mouse","#499FDE", "sales process 1" );
    } );
</script>
</body>
</html>