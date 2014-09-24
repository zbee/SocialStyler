let loc = window.location;
if (/http(?:s)?\:\/\/(?:www\.)reddit\.com\/r\/([a-z]*)\/comments\/.*/.test(loc)
  ||
  /http(?:s)?\:\/\/(?:www\.)([a-z]*)\.reddit\.com\/comments\/.*/.test(loc)) {
  console.log("is reddit thread");

  //Store user information (username, karma, mail status)
  let USER = [];
  USER[0] = $(".user a").html();
  USER[1] = $(".user .karma").html();
  USER[2] = $(".user #mail").attr("class");

  //Get Subreddit Information (.
  let SUBREDDIT = [];
  SUBREDDIT[0] = $("#redditname .hover").html();
  SUBREDDIT[1] = $(".subscribers .number").html();
  SUBREDDIT[2] = $(".users-online .number").html();
  SUBREDDIT[3] = $(".usertext-body .md").html();
  SUBREDDIT[4] = $(".sidecontentbox .content").html();

  //Get rid of header and sidebar.
  $("#header").remove();
  $(".side").remove();

  //At this point, we only have the posts, now for the reformatting.

  //Remove current stylesheets, including subreddit stylesheets.
  $('link[rel*="stylesheet"]').remove();
  $("link[src*='/r/']").remove();

  //Remove all 4chan Javascripts.
  $("script[src*='4cdn']").remove();
  $("script[src*='4chan']").remove();

  //Include Bootstrap CSS and FontAwesome CSS
  $('head').append('<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet"/>');
  $('head').append('<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"/>');

  //Include JQuery and Bootstrap JS (?)
  ////$("body").append("<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>");
  ////$("body").append("<script src='//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js'></script>");

  //Convert the thread container to the bootstrap equivalent.
  $(".thread").addClass("col-md-10");

  //Add sidebar, before the thread container.
  $("body").prepend("<div class='col-md-2 text-center' id='sb'></div>");
  $("#sb").append("<h1>" + BOARD["TITLE"] + "</h1>");
  $("#sb").append(BOARD["SUBTITLE"]);
  $("#sb").append("<hr>");
  $("#sb").append("<img src='" + BOARD["BANNER"] + "' width='100%' />");
  $("#sb").append("<hr>");
  $("#sb").append("<div class='btn-group btn-group-justified'></div>");
  $(".btn-group").append("<a class='btn btn-xs btn-default disabled' id='REPLY_BUTTON'>Reply</a>");
  $(".btn-group").append("<a class='btn btn-xs btn-default' id='BOARDS_BUTTON'>Boards</a>");

    //Add sidebar submit area.
    $("#sb").append("<div id='SUBMIT' class='panel-collapse'><br></div>");
    $("#SUBMIT").append("<div class='col-xs-12 well well-sm' id='SUBMIT_HOLDER'></div>");
    $("#SUBMIT_HOLDER").append("<input type='text' class='form-control' placeholder='Options' name='email'><br>");
    $("#SUBMIT_HOLDER").append("<textarea class='form-control' rows='5' name='com'></textarea><br>");
    $("#SUBMIT_HOLDER").append("<img src='http://bit-player.org/wp-content/uploads/2010/11/recaptcha-example.png' width='100%' /><br>");
    $("#SUBMIT_HOLDER").append("<input type='text' class='form-control' placeholder='ReCAPTCHA' name='recaptcha_response_field'><br>");
    $("#SUBMIT_HOLDER").append("<input type='submit' class='btn btn-sm btn-block btn-primary' value='Post'>");

    //Add sidebar boards area.
    $("sb").append("<div id='BOARDS' class='panel-collapse'><br></div>");
    

  //Add functionality to the sidebar.
  $("#REPLY_BUTTON").click(function() {
    $("#BOARDS").hide();
    $("#SUBMIT").show();
    $("#REPLY_BUTTON").addClass("disabled");
    $("#BOARDS_BUTTON").removeClass("disabled");
  });
  $("#BOARDS_BUTTON").click(function() {
    $("#SUBMIT").hide();
    $("#BOARDS").show();
    $("#BOARDS_BUTTON").addClass("disabled");
    $("#REPLY_BUTTON").removeClass("disabled");
  });

  //Put in thread statistics
  $(".thread").prepend(THREAD_STATS[0] + " Replies / " + THREAD_STATS[1] + " Images / " + THREAD_STATS[2] + " Page<br>");

  //Style Posts
  $(".postContainer .post").addClass("panel panel-default");
  var $blockquote = $(".postContainer blockquote");
  $blockquote.replaceWith(function () {
      return $('<div/>', {
          class: 'panel-body',
          html: this.innerHTML
      });
  });
  $(".postContainer .postInfo").addClass("panel-heading");
  $(".postContainer .panel-heading").removeClass("postInfo");
  $(".postContainer .file").addClass("col-sm-3 pull-right");
  $(".postContainer .file img").attr("style", "max-width:100%;");
  $(".postContainer .sideArrows").remove();
}