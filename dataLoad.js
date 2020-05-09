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
    for (i = 0; i < x.length; i++) {
        var speaker = x[i].getElementsByTagName("speaker")[0].childNodes[0].nodeValue;
        var url = x[i].getElementsByTagName("url")[0].childNodes[0].nodeValue;
        var affliation = x[i].getElementsByTagName("affliation")[0].childNodes[0].nodeValue;
        var picLink = x[i].getElementsByTagName("graphic")[0].childNodes[0].nodeValue;
        var date = x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue;
        var meetingDate = Date.parse(date);

        if (timeStatus == 'past' && (Date.now() > meetingDate)) {
            var videoLink = x[i].getElementsByTagName("video")[0].childNodes[0].nodeValue;
            var title = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
            var abstract_para = x[i].getElementsByTagName("abstract")[0].childNodes[0].nodeValue;
            var bio = x[i].getElementsByTagName("bio")[0].childNodes[0].nodeValue;

            txt = '<div class="seminar">';
            txt += '<iframe width="448" height="252"  src="' + videoLink + '" frameborder="0" allowfullscreen></iframe>';
            txt += '<h3>' + title + '</h3>';
            txt += '<h3>' + date + ': ' + speaker + ' (' + affliation + ')</h3><br/>'
            txt += '<p><b>Abstract:</b> ' + abstract_para + '<br/><br/>';
            txt += '<b>Biography:</b> ' + bio;
            if ( x[i].getElementsByTagName("note").length > 0 ) {
                note = x[i].getElementsByTagName("note")[0].childNodes[0].nodeValue;
                txt += '<br/>' + note; }
            txt += '</p></div>';
            current_txt += txt;

        } if (timeStatus == 'upcoming' && (Date.now() < meetingDate)) {

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
