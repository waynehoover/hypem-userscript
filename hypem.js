// ==UserScript==
// @name           Hype Machine direct download links v3
// @author         @blissofbeing
// @version        0.2.0
// @description	   Add download links next to tracks on The Hype Machine.
// @include        http://hypem.com/*
// ==/UserScript==
// Add "Download" link next to songs on the HypeMachine ( http://hypem.com )

var TrackList;
var TrackElements;
var SelectedTrack;

function addLinks() {
	TrackList = unsafeWindow.trackList[document.location.href];
	if (TrackList == undefined || TrackList.length < 1) {
		//GM_log('delay');
		unsafeWindow.setTimeout(addLinks, 1000);
	} else {
		// Check if this particular page has been processed through a previous call
		if (unsafeWindow.jQuery('.gmlink').length < 1) {
			TrackElements = unsafeWindow.jQuery('div.section-track');
			SelectedTrack = 0;
			var index = 0;
			var tracks = unsafeWindow.jQuery('div.section-track .track_name');
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
unsafeWindow.jQuery(document).ajaxComplete(function() {
  addLinks();
  jQuery(".section.same .tools").css('top','29px');
});