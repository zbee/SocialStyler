let loc = window.location;http://boards.4chan.org/b/thread/570675117
if (/http(?:s)?\:\/\/boards\.4chan\.org\/([a-z]*)\/thread\/([0-9]*)(?:\#[0-9a-z]*)?/.test(loc)) {
  //Store thread stats, placed here because it's container is removed next.
  let THREAD_STATS = [];
  THREAD_STATS[0] = $("span[data-tip*='Replies']").html();
  THREAD_STATS[1] = $("span[data-tip*='Images']").html();
  THREAD_STATS[2] = $("span[data-tip*='Page']").html();

  //Store ReCAPTCHA image.
  let RECAPTCHA = $("#recaptcha_image").html();

  //Get rid of navigation.
  $("#boardNavDesktop").remove();
  $("#boardNavDesktopFoot").remove();
  $("#boardNavMobile").remove();
  $(".navLinks").remove();
  $("#togglePostFormLink").remove();
  $(".bottomCtrl").remove();
  $("#absbot").remove();
  $("#postForm").remove();
  $(".button").remove();
  $(".mobile").remove();

  //Store what the board stuff is (board image, title, subtitle), then remove it.
  let BOARD = [];
  BOARD["BANNER"] = "//s.4cdn.org/image/title/" + $("#bannerCnt").attr("data-src");
  BOARD["TITLE"] = $(".boardTitle").html();
  BOARD["SUBTITLE"] = $(".boardSubtitle").html();
  $(".boardBanner").remove();

  //Get rid of <hr> tags on page.
  $("hr").remove();

  //Get rid of all of the ads and the ad pleas ([Advertise on 4chan]).
  $(".ad-cnt").remove();
  $(".ad-plea").remove();

  //Store the blotter information (recent blog posts), then remove it
  let BLOTTER = [];
  BLOTTER[0] = $("#blotter-msgs tr:nth-child(2) td:nth-child(1)").html() + "~$" + $("#blotter-msgs tr:nth-child(1) td:nth-child(2)").html();
  BLOTTER[1] = $("#blotter-msgs tr:nth-child(2) td:nth-child(2)").html() + "~$" + $("#blotter-msgs tr:nth-child(2) td:nth-child(2)").html();
  BLOTTER[2] = $("#blotter-msgs tr:nth-child(2) td:nth-child(3)").html() + "~$" + $("#blotter-msgs tr:nth-child(3) td:nth-child(2)").html();
  $("#blotter").remove();

  //At this point, we only have the posts, now for the reformatting.

  //Remove current stylesheets.
  $('link[rel*="stylesheet"]').remove();

  //Remove all Javascripts.
  $("script").remove();

  //Include Bootstrap CSS and FontAwesome CSS
  $('head').append('<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet"/>');
  $('head').append('<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"/>');

  //Include JQuery and Bootstrap JS (?)
  $("body").append("<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>");
  $("body").append("<script src='//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js'></script>");

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

  //Put in thread statistics.
  $(".thread").prepend(THREAD_STATS[0] + " Replies / " + THREAD_STATS[1] + " Images / On page " + THREAD_STATS[2] + "<br><br>");

  //Style Posts here.
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
  $(".fileText").remove();
  $(".postContainer .file .fileThumb").each(function() {
    $(this).children("img").attr("src", $(this).attr("href"));
  });
  $(".postContainer .file img").attr("style", "max-width:125px;");
  $(".postContainer .sideArrows").remove();
  $("a[title='Link to this post']").remove();
  $("input[type='checkbox']").remove();
  $(".postMenuBtn").remove();
  
  let REPLIES = [];
  let REPLIESI = '';
  $(".backlink").each(function(INDEX) {
    REPLIESI = $(this).attr("id");
    REPLIES[$(this).attr("id")] = [];
    $(this).children("span").each(function(INDEXD) {
      REPLIES[REPLIESI][INDEXD] = $(this).html();
      REPLIES[REPLIESI][INDEXD] = REPLIES[REPLIESI][INDEXD].split("href=\"#p");
      REPLIES[REPLIESI][INDEXD] = REPLIES[REPLIESI][INDEXD][1];
      REPLIES[REPLIESI][INDEXD] = REPLIES[REPLIESI][INDEXD].split("\"");
      REPLIES[REPLIESI][INDEXD] = REPLIES[REPLIESI][INDEXD][0];
    });
    $(this).html("<div class='btn-group' id='bg" + REPLIESI + "'><a class='btn btn-default btn-xs dropdown-toggle' id='" + REPLIESI + "' title='" + REPLIES[REPLIESI].length + " replies' data-toggle='dropdown'><i class='fa fa-share'></i> " + REPLIES[REPLIESI].length + " <i class='fa fa-caret'></i></a><ul class='dropdown-menu' role='menu' id='du" + REPLIESI + "'></ul></div>");
    REPLIES[REPLIESI].forEach(function(POS) {
      $("#du" + REPLIESI).append("<li><a href='#pc" + POS + "'>&gt;&gt;" + POS + "</a></li>");
    });
  });

  //Adding functionality to posts.
  $(".postContainer .file img").mouseenter(function() {
    $(this).attr("style", "width:100%;");
  }).mouseleave(function() {
    $(this).attr("style", "width:125px;");
  });
}