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
  $("#quote-preview").remove();

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
  
    //Add a Dropdown menu with the replies to this post.
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
      $(this).html("<div class='btn-group pull-right' id='bg" + REPLIESI + "'><a class='btn btn-default btn-xs dropdown-toggle' id='" + REPLIESI + "' title='" + REPLIES[REPLIESI].length + " replies' data-toggle='dropdown'><i class='fa fa-share'></i> " + REPLIES[REPLIESI].length + " <i class='fa fa-caret'></i></a><ul class='dropdown-menu' role='menu' id='du" + REPLIESI + "' style='max-height:400px;overflow:auto;'></ul></div>");
      REPLIES[REPLIESI].forEach(function(POS) {
        $("#du" + REPLIESI).append("<li><a href='#pc" + POS + "'>&gt;&gt;" + POS + "</a></li>");
      });
    });

    //Reorganize the headings of posts
    let HEADERS = [];
    $(".panel-heading").each(function(INDEX) {
      HEADERS[$(this).attr("id")] = [];
      HEADERS[$(this).attr("id")]["NAME"] = $(this).children(".nameBlock").html();
      HEADERS[$(this).attr("id")]["DATE"] = $(this).children(".dateTime").html();
        HEADERS[$(this).attr("id")]["DATEF"] = HEADERS[$(this).attr("id")]["DATE"].split("(")[0];
        HEADERS[$(this).attr("id")]["DATEF"] = HEADERS[$(this).attr("id")]["DATEF"].split("/");
        HEADERS[$(this).attr("id")]["DATEF"] = "<u>20" + HEADERS[$(this).attr("id")]["DATEF"][2] + "-" + HEADERS[$(this).attr("id")]["DATEF"][1] + "-" + HEADERS[$(this).attr("id")]["DATEF"][0] + " " + HEADERS[$(this).attr("id")]["DATE"].split(")")[1] + "</u>";
        HEADERS[$(this).attr("id")]["DATE"] = HEADERS[$(this).attr("id")]["DATEF"];
      HEADERS[$(this).attr("id")]["ID"] = $(this).attr("id").split("pi")[1];
      let HEADER = "";
      HEADER = HEADERS[$(this).attr("id")]["DATE"] + " by " + HEADERS[$(this).attr("id")]["NAME"] + " No. <a href='javascript:;'>" + HEADERS[$(this).attr("id")]["ID"] + "</a>" + (($(this).children(".backlink").html() != null) ? $(this).children(".backlink").html() : "") + "<a class='btn btn-default btn-xs pull-right' title='Hide Post' onClick='$(\"#p" + HEADERS[$(this).attr("id")]["ID"] + " .panel-body\").toggle();$(\"#p" + HEADERS[$(this).attr("id")]["ID"] + " .file\").toggle();'><i class='fa fa-eye-slash'></i></a></div>";
      $(this).html(HEADER);
    });

    //Style OP's post to be the same as replies.
    let OP_IMAGE = $(".op .file").html();
    let OP_TEXT = $(".op .panel-body").html();
    $(".op .file").remove();
    $(".op .panel-body").remove();
    $(".op").append("<div class='file col-sm-3 pull-right'></div>");
    $(".op .file").html(OP_IMAGE);
    $(".op").append("<div class='panel-body'></div>");
    $(".op .panel-body").html(OP_TEXT);
    $(".opContainer").addClass("replyContainer").removeClass("opContainer");
    $(".op").addClass("reply").removeClass("op");

    //Make greentext green.
    $(".quote").css('color', 'green');

  //Adding functionality to posts.
  $(".postContainer .file img").mouseenter(function() {
    $(this).attr("style", "width:100%;");
  }).mouseleave(function() {
    $(this).attr("style", "width:125px;");
  });
}