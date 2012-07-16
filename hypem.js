// ==UserScript==
// @name           Hype Machine direct download links v3
// @author         @blissofbeing
// @version        0.2.2
// @description    Add download links next to tracks on The Hype Machine.
// @include        http://hypem.com/*
// ==/UserScript==
// Add "Download" link next to songs on the HypeMachine ( http://hypem.com )

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
		setTimeout(addLinks, 1000);
	} else {
		TrackElements = jQuery('div.section-track');
		SelectedTrack = 0;
		var index = 0;
		var tracks = jQuery('div.section-track .track_name');
		tracks.each(function(index, element) {
			var $element = jQuery(element);
			if ( !$element.parent().find('a.gmlink').length ){ // Check if this particular element has alrdeady been processed through a previous call
				var trackId = TrackList[index].id;
				var trackKey = TrackList[index].key;
				var trackArtist = TrackList[index].artist;
				var trackSong = TrackList[index].song;
				if (trackKey ) {
					jQuery('<a/>', {
						'href': "/serve/play/"+trackId+"/"+trackKey, //or use "/serve/f/509/"+trackId+"/"+trackKey for urls not bound to session.
						'style': 'color:#ed2024;position: absolute;right: 10px;top: -15px;',
						'title': trackArtist+" - "+trackSong,
						'class': 'gmlink',
						'text': 'Download'
					}).appendTo($element.parent());
				}
				index++;
			}
		});
	}
}

addLinks();

// Display links after an Ajax update is complete
jQuery(document).ajaxComplete(function() {
  addLinks();
  jQuery(".section.same .tools").css('top','29px');
});
    
} // /main
    
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);