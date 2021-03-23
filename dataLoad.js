function peopleLoad() {
    var request = new XMLHttpRequest();
    request.open("GET", "data/people.xml", false);
    request.setRequestHeader("Content-Type", "text/xml");
    request.send(null);
    var xml = request.responseXML;

    var x, i, txt, cvLink, cat; 
    var j = 0;
    var current_txt = "<div class='row'>";
    x = xml.getElementsByTagName("person");
    for (i = 0; i < x.length; i++) {

            var name = x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
            var affliation = x[i].getElementsByTagName("affliation")[0].childNodes[0].nodeValue;
            var website = x[i].getElementsByTagName("website")[0].childNodes[0].nodeValue;
            var picLink = x[i].getElementsByTagName("picLink")[0].childNodes[0].nodeValue;

            txt = '<p><a href="' + website + '" target="_blank">'
            txt += '<img src="graphics/organizers/'+ picLink + '" alt="' + name + '"></a>';
            txt += '<br/><a href="' + website + '" target="_blank">';
            txt += name + '</a><br/> ' + affliation + '</p>';

            current_txt += txt;

    }
    current_txt += '</div>';
    document.getElementById('people').innerHTML = current_txt;
}

function seminarLoad(timeStatus) {
    var request = new XMLHttpRequest();
    request.open("GET", "data/seminars.xml", false);
    request.setRequestHeader("Content-Type", "text/xml");
    request.send(null);
    var xml = request.responseXML;

    var x, i, txt;
    var j = 0;
    var current_txt = "";
    x = xml.getElementsByTagName("talk");
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - 1); 

    for (i = 0; i < x.length; i++) {
        var speaker = x[i].getElementsByTagName("speaker")[0].childNodes[0].nodeValue;
        var url = x[i].getElementsByTagName("url")[0].childNodes[0].nodeValue;
        var affliation = x[i].getElementsByTagName("affliation")[0].childNodes[0].nodeValue;
        var picLink = x[i].getElementsByTagName("graphic")[0].childNodes[0].nodeValue;
        var date = x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue;
        var meetingDate = Date.parse(date);        

        if (timeStatus == 'past' && (Date.parse(tomorrow) > meetingDate)) {
            var title = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
            var abstract_para = x[i].getElementsByTagName("abstract")[0].childNodes[0].nodeValue;
            var bio = x[i].getElementsByTagName("bio")[0].childNodes[0].nodeValue;

            txt = '<div class="seminar">';
            if ( x[i].getElementsByTagName("video").length > 0 ) { 
                var videoLink = x[i].getElementsByTagName("video")[0].childNodes[0].nodeValue;
                txt += '<iframe width="448" height="252"  src="' + videoLink + '" frameborder="0" allowfullscreen></iframe>';
            } else {
                txt += '<img src="graphics/speakers/' + picLink + '" alt="' + speaker + '" />';
            }

            txt += '<h3>' + title + '</h3>';
            txt += '<h3>' + date + ': <a href="' + url + '" target="_blank">' + speaker + ' </a>(' + affliation + ')';

            // Second speaker check
            if ( x[i].getElementsByTagName("speaker2").length > 0 ) {
                var speaker2 = x[i].getElementsByTagName("speaker2")[0].childNodes[0].nodeValue;
                var affliation2 = x[i].getElementsByTagName("affliation2")[0].childNodes[0].nodeValue;
                var url2 = x[i].getElementsByTagName("url2")[0].childNodes[0].nodeValue;
                txt += ' and <a href="' + url2 + '" target="_blank">' + speaker2 + ' </a>(' + affliation2 + ')';
            }
            txt += '</h3><br/>';

       
            if ( x[i].getElementsByTagName("slides").length > 0) {
                var slides = x[i].getElementsByTagName("slides")[0].childNodes[0].nodeValue;
                txt += "<b><a href='data/slides/" + slides + "' target='_blank'>(Slides)</a></b><br/><br/>" }


            txt += '<p><b>Abstract:</b> ' + abstract_para + '<br/><br/><br/>';
            txt += '<b>Biography:</b> ' + bio + '<br/>';

            // Second speaker bio
            if ( x[i].getElementsByTagName("bio2").length > 0 ) {
                var bio2 = x[i].getElementsByTagName("bio2")[0].childNodes[0].nodeValue;
                txt += '<br/><br/><b>Biography:</b> ' + bio2 + '<br/>';
            }


            if ( x[i].getElementsByTagName("note").length > 0 ) {
                note = x[i].getElementsByTagName("note")[0].childNodes[0].nodeValue;
                txt += '<br/>' + note; }

            // Loop through guest panelists
            if ( x[i].getElementsByTagName("guest").length > 0 ) {
                txt += "<br/><b>Featuring Guest Panelist(s):</b>";
                var j;
                var y = x[i].getElementsByTagName("guest");
                for (j = 0; j < y.length; j++) {
                    var guest = y[j].getElementsByTagName("gname")[0].childNodes[0].nodeValue;
                    var gurl = y[j].getElementsByTagName("gurl")[0].childNodes[0].nodeValue;
                    txt += "<a href='" + gurl + "' target=_'blank'> " + guest + "</a>"; 
                    // Add comma if needed
                    if ((y.length > 1) && (j < (y.length-1))) { txt += ','; }
                }  
            }

            if ( x[i].getElementsByTagName("qa").length > 0) {
                var qaLink = x[i].getElementsByTagName("qa")[0].childNodes[0].nodeValue;
                txt += "<br/><br/>" + speaker + " has kindly answered a few of the many questions we weren't able to get to! ";
                txt += '<a onclick="toggle(' + i + ')">Show/Hide the extra Q/A.</a>';
                txt += '<div id="' + i + '" style="display:none">' + readQA(qaLink) + '</div>'; }

            txt += '</p></div>';
            current_txt = txt + current_txt;

        } 
        if (timeStatus == 'upcoming' && (Date.parse(tomorrow) < meetingDate)) {

            txt = '<div class="seminar"><img src="graphics/speakers/' + picLink + '" alt="' + speaker + '" />';
           
            if ( x[i].getElementsByTagName("title").length > 0 ) { 
                var title = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
                txt += '<h3>' + title + '</h3>';
            }
            txt += '<h3>' + date + ': <a href="' + url + '" target="_blank">' + speaker + ' </a>(' + affliation + ')';

            // Second speaker check
            if ( x[i].getElementsByTagName("speaker2").length > 0 ) { 
                var speaker2 = x[i].getElementsByTagName("speaker2")[0].childNodes[0].nodeValue;
                var affliation2 = x[i].getElementsByTagName("affliation2")[0].childNodes[0].nodeValue;
                var url2 = x[i].getElementsByTagName("url2")[0].childNodes[0].nodeValue;
                txt += ' and <a href="' + url2 + '" target="_blank">' + speaker2 + ' </a>(' + affliation2 + ')';
            }
            txt += '</h3><br/>';

             if ( x[i].getElementsByTagName("note").length > 0 ) {
                note = x[i].getElementsByTagName("note")[0].childNodes[0].nodeValue;
                txt += '<br/><font color="red">' + note + '</font><br/><br/>'; }
            

            if ( x[i].getElementsByTagName("abstract").length > 0 ) {
                var abstract_para = x[i].getElementsByTagName("abstract")[0].childNodes[0].nodeValue;
                txt += '<p><b>Abstract:</b> ' + abstract_para + '<br/><br/>';
            }
            if ( x[i].getElementsByTagName("bio").length > 0 ) {
                var bio = x[i].getElementsByTagName("bio")[0].childNodes[0].nodeValue;
                txt += '<b>Biography:</b> ' + bio;
            }

            // Second speaker bio
            if ( x[i].getElementsByTagName("bio2").length > 0 ) {
                var bio2 = x[i].getElementsByTagName("bio2")[0].childNodes[0].nodeValue;
                txt += '<br/><br/><b>Biography:</b> ' + bio2;
            }

            // Loop through guest panelists
            if ( x[i].getElementsByTagName("guest").length > 0 ) {
                txt += "<br/><br/><b>Featuring Guest Panelist(s):</b>";
                var j;
                var y = x[i].getElementsByTagName("guest");
                for (j = 0; j < y.length; j++) {
                    var guest = y[j].getElementsByTagName("gname")[0].childNodes[0].nodeValue;
                    var gurl = y[j].getElementsByTagName("gurl")[0].childNodes[0].nodeValue;
                    txt += "<a href='" + gurl + "' target=_'blank'> " + guest + "</a>"; 
                    // Add comma if needed
                    if ((y.length > 1) && (j < (y.length-1))) { txt += ','; }
                }  
            }

            txt += '</p></div>';
            current_txt += txt;
        }
    }
    var idName = 'seminars_'+timeStatus;
    document.getElementById(idName).innerHTML = current_txt;
}

function readQA(fileName) { 
    var request = new XMLHttpRequest();
    request.open("GET", "data/qa/" + fileName, false);
    request.setRequestHeader("Content-Type", "text/xml");
    request.send(null);
    var xml = request.responseXML;

    var x, i, txt; 
    var current_txt = '<br/>';
    x = xml.getElementsByTagName("qa");
    for (i = 0; i < x.length; i++) {

        var question = x[i].getElementsByTagName("question")[0].childNodes[0].nodeValue;
        var asker = x[i].getElementsByTagName("asker")[0].childNodes[0].nodeValue;
        var answer = x[i].getElementsByTagName("answer")[0].childNodes[0].nodeValue;

        txt = '<b>Q</b>: ' + question + ' (<i>' + asker + '</i>)<br/>';
        txt += '<b>A</b>: ' + answer + '<br/><br/>';

        current_txt += txt;

    }
    return current_txt;
}

function toggle(divName) {
  var x = document.getElementById(divName);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function ifrrLoad(timeStatus) {
    
    var request = new XMLHttpRequest();
    request.open("GET", "data/ifrr.xml", false);
    request.setRequestHeader("Content-Type", "text/xml");
    request.send(null);
    var xml = request.responseXML;

    var x, i, txt;
    var j = 0;
    var current_txt = "";
    x = xml.getElementsByTagName("talk"); 

    for (i = 0; i < x.length; i++) {
        var theme = x[i].getElementsByTagName("theme")[0].childNodes[0].nodeValue;
        var zoom = x[i].getElementsByTagName("stream")[0].childNodes[0].nodeValue;
        var slido = x[i].getElementsByTagName("slido")[0].childNodes[0].nodeValue;

        var title = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        var speaker = x[i].getElementsByTagName("speaker")[0].childNodes[0].nodeValue;
        var url = x[i].getElementsByTagName("url")[0].childNodes[0].nodeValue;
        var affliation = x[i].getElementsByTagName("affliation")[0].childNodes[0].nodeValue;
        var date = x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue;

        txt = '<div class="seminar">';
        txt += '<h3>' + theme + '</h3>';
        txt += date + '. ';
        txt += '<a href="' + zoom + '" target="_blank">Live Stream via Zoom Webinar</a> and ';
        txt += '<a href="' + slido + '" target="_blank">Live questions and discussion via Slido</a><br/><br/>';

        txt += '<h3>' + title + ' by <a href="' + url + '" target="_blank">' + speaker + ' </a>(' + affliation + ')</h3><br/>';

        if ( (x[i].getElementsByTagName("guest").length > 0) && (x[i].getElementsByTagName("guesturl").length > 0)) {
            var guest = x[i].getElementsByTagName("guest")[0].childNodes[0].nodeValue;
            var guesturl = x[i].getElementsByTagName("guesturl")[0].childNodes[0].nodeValue;
            txt += "<b>Moderator:</b> <a href='" + guesturl + "' target=_'blank'>"; 
            txt += guest + "</a><br/><br/>";  }

        if ( x[i].getElementsByTagName("abstract").length > 0 ) {
            var abstract_para = x[i].getElementsByTagName("abstract")[0].childNodes[0].nodeValue;
            txt += '<p><b>Abstract:</b> ' + abstract_para + '<br/><br/>';  }
        if ( x[i].getElementsByTagName("bio").length > 0 ) {
            var bio = x[i].getElementsByTagName("bio")[0].childNodes[0].nodeValue;
            txt += '<b>Biography:</b> ' + bio;  }

        txt += '</p></div>';
        current_txt += txt;
    }
    
    document.getElementById('ifrr').innerHTML = current_txt;
}
