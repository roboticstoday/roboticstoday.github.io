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
            txt += '<h3>' + date + ':<a href="' + url + '"target="_blank">' + speaker + ' </a>(' + affliation + ')</h3><br/>';
            txt += '<p><b>Abstract:</b> ' + abstract_para + '<br/><br/><br/>';
            txt += '<b>Biography:</b> ' + bio + '<br/>';

            if ( x[i].getElementsByTagName("note").length > 0 ) {
                note = x[i].getElementsByTagName("note")[0].childNodes[0].nodeValue;
                txt += '<br/>' + note; }

            if ( (x[i].getElementsByTagName("guest").length > 0) && (x[i].getElementsByTagName("guesturl").length > 0)) {
                var guest = x[i].getElementsByTagName("guest")[0].childNodes[0].nodeValue;
                var guesturl = x[i].getElementsByTagName("guesturl")[0].childNodes[0].nodeValue;
                txt += "<br/><b>Featuring Guest Panelist:</b> <a href='" + guesturl + "' target=_'blank'>"; 
                txt += guest + "</a>"; }


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
            txt += '<h3>' + date + ': <a href="' + url + '" target="_blank">' + speaker + ' </a>(' + affliation + ')</h3><br/>';
            if ( x[i].getElementsByTagName("abstract").length > 0 ) {
                var abstract_para = x[i].getElementsByTagName("abstract")[0].childNodes[0].nodeValue;
                txt += '<p><b>Abstract:</b> ' + abstract_para + '<br/><br/>';
            }
            if ( x[i].getElementsByTagName("bio").length > 0 ) {
                var bio = x[i].getElementsByTagName("bio")[0].childNodes[0].nodeValue;
                txt += '<b>Biography:</b> ' + bio;
            }
            if ( x[i].getElementsByTagName("note").length > 0 ) {
                note = x[i].getElementsByTagName("note")[0].childNodes[0].nodeValue;
                txt += '<br/>' + note; }

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
