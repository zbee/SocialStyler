let loc = window.location;
if (/http(?:s)?\:\/\/(?:www\.)reddit\.com\/r\/([a-z]*)\/comments\/.*/.test(loc)
  ||
  /http(?:s)?\:\/\/(?:www\.)([a-z]*)\.reddit\.com\/comments\/.*/.test(loc)) {
  //Store user information (username, karma, mail status).
  let USER = [];
  let USERTEXT = "";
  if ($(".user:contains('join?')").length < 0) {
    USER[0] = $(".user a").html();
    USER[1] = $(".user .karma").html();
    USER[2] = $(".user #mail").attr("class");
    USERTEXT = "Logged in as " + USER[0] + " | " + USER[1] + " | " + USER[2];
  } else {
    USERTEXT = "<a href='https://www.reddit.com/login' class='login-required'>Login or Register</a>";
  }

  //Get Subreddit Information (reddit name, number of subscribers, number of subscribers online, sidebar text, mods).
  let SUBREDDIT = [];
  SUBREDDIT[0] = $(".redditname .hover").html();
  SUBREDDIT[1] = $(".subscribers .number").html();
  SUBREDDIT[2] = $(".users-online .number").html();
  SUBREDDIT[3] = $(".usertext-body .md").html();
  SUBREDDIT[4] = $(".sidecontentbox .content").html();

  //Get rid of header and sidebar.
  $("#header").remove();
  $(".side").remove();

  //At this point, we only have the posts and footer, now for the reformatting.

  //Remove current stylesheets, including subreddit stylesheets.
  $('link[rel*="stylesheet"]').remove();
  $("link[src*='/r/']").remove();

  //Remove all Javascripts.
  $("script").remove();

  //Include Bootstrap CSS and FontAwesome CSS
  $('head').append('<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet"/>');
  $('head').append('<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"/>');

  //Include JQuery and Bootstrap JS (?)
  ////$("body").append("<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>");
  ////$("body").append("<script src='//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js'></script>");

  //Convert the thread container to the bootstrap equivalent.
  $(".content").addClass("col-md-8 col-md-offset-1");

  //Add a sidebar revealing button to content.
  $(".content").prepend("<a onClick='$(this).toggle();$(\"#sb\").toggle();$(\".content\").addClass(\"col-md-offset-1 col-md-8\");$(\".content\").removeClass(\"col-md-12\");' class='btn btn-default btn-xs pull-left' id='sbs' style='display:none;'><i class='fa fa-angle-right'></i></a>");
  
  //Add sidebar, before the thread container.
  $("body").prepend("<div class='col-md-3 text-center' id='sb'><br></div>");
  $("#sb").append("<a onClick='$(\"#sb\").toggle();$(\".content\").removeClass(\"col-md-offset-1 col-md-8\");$(\".content\").addClass(\"col-md-12\");$(\"#sbs\").toggle();' class='btn btn-default btn-xs pull-right'><i class='fa fa-angle-left'></i></a>");
  $("#sb").append("<div class='well'></div>");
  $(".well").append(USERTEXT);
  $("#sb").append("<h1>" + SUBREDDIT[0] + "</h1>");
  $("#sb").append(SUBREDDIT[2] + " out of " + SUBREDDIT[1] + " subscribers are online.<br><br>");
  $("#sb").append("<a class='btn btn-md btn-default' id='REPLY_BUTTON'>Submit Content</a>");
  $("#sb").append("<hr>");
  $("#sb").append(SUBREDDIT[3]);

  //Add functionality to the sidebar. (put sidebar toggling stuff here)
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

  //Style footer
  $(".footer-parent").hide();

  //Style Posts
  $(".entry").addClass("panel panel-default");
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