let MOUSE_POS = { x: -1, y: -1 };
$(document).mousemove(function(event) {
  MOUSE_POS.x = event.pageX;
  MOUSE_POS.y = event.pageY;
});
let loc = window.location;http://boards.4chan.org/b/thread/570675117
if (/http(?:s)?\:\/\/boards\.4chan\.org\/([a-z]*)\/thread\/([0-9]*)(?:\#[0-9a-z]*)?/.test(loc)) {
  //Store thread stats, placed here because it's container is removed next.
  let THREAD_STATS = [];
  THREAD_STATS[0] = ($("span[data-tip*='Replies']").html() != null) ? $("span[data-tip*='Replies']").html() : $(".thread-stats em").html();
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
  BLOTTER[0] = $("#blotter-msgs tr:nth-child(1) td:nth-child(1)").html() + "~$" + $("#blotter-msgs tr:nth-child(1) td:nth-child(2)").html();
  BLOTTER[1] = $("#blotter-msgs tr:nth-child(2) td:nth-child(1)").html() + "~$" + $("#blotter-msgs tr:nth-child(2) td:nth-child(2)").html();
  BLOTTER[2] = $("#blotter-msgs tr:nth-child(3) td:nth-child(1)").html() + "~$" + $("#blotter-msgs tr:nth-child(3) td:nth-child(2)").html();
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
  $("body").append("<script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'></script>");
  $("body").append("<script src='//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js'></script>");

  //Convert the thread container to the bootstrap equivalent.
  $(".thread").addClass("col-md-10");

  //Add sidebar, before the thread container.
  $("body").prepend("<div class='col-md-2 text-center' id='sb'></div>");
  $("#sb").append("<h1>" + BOARD["TITLE"] + "</h1>");
  $("#sb").append(BOARD["SUBTITLE"]);
  $("#sb").append("<hr>");
  //$("#sb").append("<img src='" + BOARD["BANNER"] + "' width='100%' />");
  $("#sb").append("<div id='blot' class='text-left'></div>");
  $("#blot").append("<div class='well well-sm' title='"  + BLOTTER[0].split("~$")[0] + "'>"  + BLOTTER[0].split("~$")[1] + "</div>");

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
  let THREAD_APPEND = "<br>" + THREAD_STATS[0] + " Replies / " + THREAD_STATS[1] + " Images / On page " + THREAD_STATS[2] + 
    " / <div class='btn-group'><a class='btn btn-xs btn-default disabled' id='st'><i class='fa fa-bars'></i></a><a class='btn btn-xs btn-default' id='si'><i class='fa fa-th-large'></i></a></div>" +
    " / <div class='btn-group'><button type='button' class='btn btn-default btn-xs dropdown-toggle' data-toggle='dropdown'>Filter Thread <span class='caret'></span></button><ul class='dropdown-menu' role='menu'>" +
    "<li><a id='FIL_R' style='cursor:pointer'>Posts with Replies</a></li>" +
    "<li><a id='FIL_A' style='cursor:pointer'>Posts that are Replies</a></li>" +
    "<li><a id='FIL_G' style='cursor:pointer'>Posts with greentext</a></li>" +
    "<li><a id='FIL_L' style='cursor:pointer'>Posts that are long</a></li>" +
    "<li class='divider'></li>" +
    "<li role='presentation' class='dropdown-header'>Filter to posts with a filetype</li>" +
    "<li><a id='FIL_F' style='cursor:pointer'>.gif</a></li>" +
    "<li><a id='FIL_W' style='cursor:pointer'>.webm</a></li>" +
    "<li><a id='FIL_I' style='cursor:pointer'>Any image</a></li>" +
    "</ul></div><br><br>";
  $(".board").prepend(THREAD_APPEND);

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
  $(".postContainer .file").addClass("col-sm-4 pull-right text-right");
  $(".fileText").remove();
  $(".postContainer .file .fileThumb").each(function() {
    if ($(this).attr("href").indexOf(".webm") < 1) {
      $(this).children("img").attr("src", $(this).attr("href"));
    } else {
      $(this).children("img").remove();
      $(this).append("<video src='" + $(this).attr("href") + "' style='max-width:125px;' onMouseOver='this.play()' onMouseOut='this.pause()' onclick='this.pause()' loop></video>");
    }
  });
  $(".postContainer").each(function() {
    $(this).find("img").attr("id", $(this).attr("id").split("pc")[1]);
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
        $("#du" + REPLIESI).append("<li><a href='#pc" + POS + "' class='dropquotelink'>&gt;&gt;" + POS + "</a></li>");
      });
    });

    //Reorganize the headings of posts.
    let HEADERS = [];
    $(".panel-heading").each(function(INDEX) {
      HEADERS[$(this).attr("id")] = [];
      HEADERS[$(this).attr("id")]["NAME"] = $(this).find(".name").html();
        HEADERS[$(this).attr("id")]["HAND"] = $(this).find(".hand").html();
        HEADERS[$(this).attr("id")]["HANDC"] = $(this).find(".hand").attr("style");
        HEADERS[$(this).attr("id")]["HANDC"] = "background: " + HEADERS[$(this).attr("id")]["HANDC"].split(";")[0].split(":")[1] + ";" + HEADERS[$(this).attr("id")]["HANDC"].split(";")[1];
      HEADERS[$(this).attr("id")]["DATE"] = $(this).children(".dateTime").html();
        HEADERS[$(this).attr("id")]["DATEF"] = HEADERS[$(this).attr("id")]["DATE"].split("(")[0];
        HEADERS[$(this).attr("id")]["DATEF"] = HEADERS[$(this).attr("id")]["DATEF"].split("/");
        HEADERS[$(this).attr("id")]["DATEF"] = "<u>20" + HEADERS[$(this).attr("id")]["DATEF"][2] + "-" + HEADERS[$(this).attr("id")]["DATEF"][1] + "-" + HEADERS[$(this).attr("id")]["DATEF"][0] + " " + HEADERS[$(this).attr("id")]["DATE"].split(")")[1] + "</u>";
        HEADERS[$(this).attr("id")]["DATE"] = HEADERS[$(this).attr("id")]["DATEF"];
      HEADERS[$(this).attr("id")]["ID"] = $(this).attr("id").split("pi")[1];
      let HEADER = "";
      HEADER = HEADERS[$(this).attr("id")]["DATE"] + " by " + HEADERS[$(this).attr("id")]["NAME"] +  " (ID: <span class='hand label' style='" + HEADERS[$(this).attr("id")]["HANDC"] + ";cursor:pointer;'>" + HEADERS[$(this).attr("id")]["HAND"] + "</span>) No. <a href='javascript:;'>" + HEADERS[$(this).attr("id")]["ID"] + "</a>" + 
        (($(this).children(".backlink").html() != null) ? $(this).children(".backlink").html() : "") + 
        "<a class='btn btn-default btn-xs pull-right' title='Hide Post' onClick='$(\"#p" + HEADERS[$(this).attr("id")]["ID"] + " .panel-body\").toggle();$(\"#p" + HEADERS[$(this).attr("id")]["ID"] + " .file\").toggle();'><i class='fa fa-eye-slash'></i></a></div>" +
        "<a class='btn btn-default btn-xs pull-right' title='Report Post' target='_blank' href='https://sys.4chan.org/b/imgboard.php?mode=report&no=" + HEADERS[$(this).attr("id")]["ID"] + "'><i class='fa fa-exclamation-circle'></i></a></div>";
      $(this).html(HEADER);
    });

    //Style OP's post to be the same as replies.
    let OP_IMAGE = $(".op .file").html();
    let OP_TEXT = $(".op .panel-body").html();
    $(".op .file").remove();
    $(".op .panel-body").remove();
    $(".op").append("<div class='file col-sm-4 pull-right text-right'></div>");
    $(".op .file").html(OP_IMAGE);
    $(".op").append("<div class='panel-body'></div>");
    $(".op .panel-body").html(OP_TEXT);
    $(".opContainer").addClass("replyContainer").removeClass("opContainer");
    $(".op").addClass("reply o-p").removeClass("op");

    //Make gallery view.
    $(".board").append("<div class='imgThread col-md-10'></div>");
    $(".imgThread").hide();
    $(".fileThumb").each(function(INDEX) {
      INDEX += 1;
      if ($(this).attr("href").indexOf(".webm") < 1) {
        $(".imgThread").append("<div class='col-xs-6 col-sm-3'><a href='" + $(this).attr("href") + "' target='_blank' class='thumbnail'><img src='" + $(this).attr("href") + "' style='max-height:250px !important;'></a></div>");
      } else {
        $(".imgThread").append("<div class='col-xs-6 col-sm-3'><a href='" + $(this).attr("href") + "' target='_blank' class='thumbnail'><video src='" + $(this).attr("href") + "' style='max-height:250px;max-width:100%;' onMouseOver='this.play()' onMouseOut='this.pause()' onclick='this.pause()' loop></video></a></div>");
      }
      if (INDEX % 4 == 0) { $('.imgThread').append("<div class='row'></div>"); }
    });

    //Make greentext green.
    $(".quote").css("color", "green");

    //Allow post highlighting.
    HAND_COUNT = [];
    HAND_SAY = [];
    $(".panel").each(function() {
      $(this).attr("data-handle", $(this).find(".hand").html());
    });
    $(".hand").each(function() {
      $(this).attr("data-handle", $(this).html());
      HAND_COUNT[$(this).html()] = (HAND_COUNT[$(this).html()] != null) ? HAND_COUNT[$(this).html()] + 1 : 1;
    });
      //Number of posts a poster has in thread.
      $(".hand").each(function() {
        HAND_SAY[$(this).html()] = (HAND_COUNT[$(this).html()] > 1) ? ((HAND_COUNT[$(this).html()] > 100) ? " 100+ posts" : " " + HAND_COUNT[$(this).html()]) + " posts" : "";
        $(this).after(HAND_SAY[$(this).html()]);
      });
    $(".hand").click(function() {
      $(".panel[data-handle!='" + $(this).attr("data-handle") + "']").removeClass("panel-info");
      $(".panel[data-handle='" + $(this).attr("data-handle") + "']").toggleClass("panel-info");
    });

      //Highlight posts by OP by default.
      $(".panel[data-handle='" + $(".o-p").attr("data-handle") + "']").addClass("panel-info");

    //Hover over quote links.
    $(".quotelink, .dropquotelink").mouseenter(function() {
      $(".board").append("<div class='quoteapp'></div>");
      $(".quoteapp").css("position", "absolute");
      $(".quoteapp").css("z-index", "999999");
      $(".quoteapp").html($("#pc" + $(this).attr("href").replace(/\D/g,'')).html());
      if (MOUSE_POS.y + $(".quoteapp").height() > $(window).height()) { //If quote would extend downwards:
        $(".quoteapp").css("top", MOUSE_POS.y - $(".quoteapp").height() - 10);
      } else {
        $(".quoteapp").css("top", MOUSE_POS.y + 10);
      }
      if (MOUSE_POS.x + $(".quoteapp").width() > $(window).width()) { //If quote would extend right-wards:
        $(".quoteapp").css("left", MOUSE_POS.x - $(".quoteapp").width() - 10);
      } else {
        $(".quoteapp").css("left", MOUSE_POS.x + 10);
      }
    }).mouseleave(function() {
      $(".quoteapp").remove();
    });

  //Adding functionality to posts.
  $(".postContainer .file img, .file video").mouseenter(function() {
    $(this).attr("style", "width:100%;");
  }).mouseleave(function() {
    $(this).attr("style", "width:125px;");
  });

  $("#st").click(function() {
    $(".thread").show();
    $(".imgThread").hide();
    $("#st").addClass("disabled");
    $("#si").removeClass("disabled");
  });
  $("#si").click(function() {
    $(".thread").hide();
    $(".imgThread").show();
    $("#si").addClass("disabled");
    $("#st").removeClass("disabled");
  });

  //Add thread filtering to thread view.
  let FILTER = (type) => {
    switch (type) {
      case "R":
        $(".panel:not(:has(.fa-share))").find(".panel-body").toggle();
        $(".panel:not(:has(.fa-share))").find(".file").toggle();
        break;
      case "A":
        $(".panel").each(function() {
          if ($(this).find('.panel-body:contains(">>")').length < 1) { //If it doesn't contain a reply
            $(this).find(".panel-body").toggle();
            $(this).find(".file").toggle();
          } else {
            if ($(this).find('.panel-body:contains(">>")').length == 1 && $(this).find('.panel-body:contains(">>>")').length == 1) { //If it only contains 1 "reply" but that reply is actually a board link
              $(this).find(".panel-body").toggle();
              $(this).find(".file").toggle();
            }
          }
        });
        break;
      case "G":
        $(".panel").each(function() {
          if ($(this).find('.panel-body:contains(">")').length < 1) { //If it doesn't contain greentext
            $(this).find(".panel-body").toggle();
            $(this).find(".file").toggle();
          } else {
            if ($(this).find('.panel-body:contains(">")').length == 1 && $(this).find('.panel-body:contains(">>")').length == 1) { //If it only contains 1 green text but that reply is actually a reply or board link
              $(this).find(".panel-body").toggle();
              $(this).find(".file").toggle();
            }
          }
        });
        break;
      case "L":
        $(".panel").each(function() {
          if ($(this).find('.panel-body').text().length < 250) {
            $(this).find(".panel-body").toggle();
            $(this).find(".file").toggle();
          }
        });
        break;
      default:
        console.log("Filter function broke.");
    }
  }

  $("#FIL_R").click(function() {
    FILTER("R");
  });
  $("#FIL_A").click(function() {
    FILTER("A");
  });
  $("#FIL_G").click(function() {
    FILTER("G");
  });
  $("#FIL_L").click(function() {
    FILTER("L");
  });
}