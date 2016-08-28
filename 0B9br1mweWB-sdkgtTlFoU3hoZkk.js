/*<![CDATA[*/
// JavaScript Document

//Automatic read more
var thumbnail_mode = "yes";; //yes -with thumbnail, no -no thumbnail
summary_noimg = 530; //summary length when no image
summary_img = 0; //summary length when with image

function removeHtmlTag(strx, chop) {
    if (strx.indexOf("<") != -1) {
        var s = strx.split("<");
        for (var i = 0; i < s.length; i++) {
            if (s[i].indexOf(">") != -1) {
                s[i] = s[i].substring(s[i].indexOf(">") + 1, s[i].length)
            }
        }
        strx = s.join("")
    }
    chop = (chop < strx.length - 1) ? chop : strx.length - 2;
    while (strx.charAt(chop - 1) != ' ' && strx.indexOf(' ', chop) != -1) chop++;
    strx = strx.substring(0, chop - 1);
    return strx + '...'
}

function rm(a,b) {
    var p = document.getElementById(a);
	var q = document.getElementById(b);
    var imgtag = "";
    var img = p.getElementsByTagName("img");
    var summ = summary_noimg;
    if (thumbnail_mode == "yes") {
        if (img.length >= 1) {
            imgtag = '<img src="' + img[0].src + '" height="210" width="280"/>';
            summ = summary_img
        }
    }
   	
	var summary = imgtag;
    q.innerHTML = summary;
	p.parentNode.removeChild(p);

}


// Enter the posts labels here 
cat1 = 'Slider'; 
  
imgr = new Array();
imgr[0] = "http://sites.google.com/site/fdblogsite/Home/nothumbnail.gif";
showRandomImg = true;
aBold = true;
summaryPost = 150; 
summaryTitle = 50; 
numposts1 = 6;

function showrecentposts1(json) {
    j = showRandomImg ? Math.floor((imgr.length + 1) * Math.random()) : 0;
    img = new Array;
    if (numposts1 <= json.feed.entry.length) maxpost = numposts1;
    else maxpost = json.feed.entry.length;
    document.write('<ul class="slides">');
    for (var i = 0; i < maxpost; i++) {
        var entry = json.feed.entry[i];
        var posttitle = entry.title.$t;
        var pcm;
        var posturl;
        if (i == json.feed.entry.length) break;
        for (var k = 0; k < entry.link.length; k++)
            if (entry.link[k].rel == "alternate") {
                posturl = entry.link[k].href;
                break
            }
        for (var k = 0; k < entry.link.length; k++)
            if (entry.link[k].rel == "replies" && entry.link[k].type == "text/html") {
                pcm = entry.link[k].title.split(" ")[0];
                break
            }
        if ("content" in entry) var postcontent = entry.content.$t;
        else if ("summary" in entry) var postcontent = entry.summary.$t;
        else var postcontent = "";
        postdate = entry.published.$t;
        if (j > imgr.length - 1) j = 0;
        img[i] = imgr[j];
        s = postcontent;
        a = s.indexOf("<img");
        b = s.indexOf('src="', a);
        c = s.indexOf('"', b + 5);
        d = s.substr(b + 5, c - b - 5);
        if (a != -1 && (b != -1 && (c != -1 && d != ""))) img[i] = d;
        var p = i + 1;
        var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var month2 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var day = postdate.split("-")[2].substring(0, 2);
        var m = postdate.split("-")[1];
        var y = postdate.split("-")[0];
        for (var u2 = 0; u2 < month.length; u2++)
            if (parseInt(m) == month[u2]) {
                m = month2[u2];
                break
            }
        var daystr = day + " " + m + " " + y;
        var trtd = '<li class="flex-active-slides"><div class="post_hentry"><div class="featured-area"><div class="featured_image"><img src="' + img[i] + '"/></div></div>   <div class="overlay_post" style="display:none;"><header class="entry-header"><h3 class="en-title entry-title"><a href="' + posturl + '">' + posttitle + '</a></h3></header> <div class="entry-content"><p>' + removeHtmlTag(postcontent, summaryPost) +  '</p></div></div></div></li>';
        document.write(trtd);
        j++
    }
    document.write("</ul>")
};



/*]]>*/
