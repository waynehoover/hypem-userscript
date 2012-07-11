// ==UserScript==
// @name           Hype Machine direct download links v3
// @author         @blissofbeing
// @version        0.2.1
// @description    Add download links next to tracks on The Hype Machine.
// @include        http://hypem.com/*
// ==/UserScript==
// Add "Download" link next to songs on the HypeMachine ( http://hypem.com )

function main(){

var TrackList;
var TrackElements;
var SelectedTrack;

function addLinks() {
	TrackList = trackList[document.location.href];
	if (TrackList === undefined || TrackList.length < 1) {
		//GM_log('delay');
		setTimeout(addLinks, 1000);
	} else {
		// Check if this particular page has been processed through a previous call
		if (jQuery('.gmlink').length < 1) {
			TrackElements = jQuery('div.section-track');
			SelectedTrack = 0;
			var index = 0;
			var tracks = jQuery('div.section-track .track_name');
			tracks.each(function(index, element) {
				var trackId = TrackList[index].id;
				var trackKey = TrackList[index].key;
				var trackArtist = TrackList[index].artist;
				var trackSong = TrackList[index].song;
				if (trackKey) {
						if(element.innerHTML.indexOf("Download")==-1){
							var ahref = document.createElement('a');
							ahref.setAttribute('href', "/serve/play/"+trackId+"/"+trackKey);
							ahref.setAttribute('style','color:red;position: absolute;right: 10px;top: -15px;');
							ahref.setAttribute('title',trackArtist+" - "+trackSong);
							ahref.setAttribute('class','gmlink');
							ahref.appendChild(document.createTextNode("Download"));
							element.parentNode.insertBefore( ahref, element.nextSibling );
						}
				}
				index++;
			});
		}
	}
}

addLinks();

// Display links after an Ajax update is complete
jQuery(document).ajaxComplete(function() {
  addLinks();
  jQuery(".section.same .tools").css('top','29px');
});

}
    
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);