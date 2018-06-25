$(function() {
  // $('#s3_uploader').S3Uploader(
  //   {
  //     remove_completed_progress_bar: false,
  //     progress_bar_target: $('#uploads_container')
  //   }
  // );
  // $('#s3_uploader').bind('s3_upload_failed', function(e, content) {
  //   return alert(content.filename + ' failed to upload');
  // });
});

$(document).ready(function(){
  loadAudioPlayer();
})


function loadAudioPlayer(){
  var play, audio, btnNext, btnPrev, buildPlaylist,
      index, li, loadTrack, npAction, npTitle, playTrack,
      playing, supportsAudio, trackCount;

  supportsAudio = !!document.createElement('audio').canPlayType;

  var wavesurfer = WaveSurfer.create({
                    container: '#waveform',
                    waveColor: '#959da0',
                    progressColor: '#f77333',
                    height: 180,
                    barWidth: 2,
                    hideScrollbar: false
                });

  if (supportsAudio) {
    index = 0;
    playing = false;
    buildPlaylist = $(tracks_list).each(function(key, value) {
      var trackDuration, trackName, trackNumber;
      trackNumber = value.id;
      trackName = value.title;
      trackDuration = value.duration;
      if (trackNumber.toString().length === 1) {
        trackNumber = '0' + trackNumber;
      }
      $('#plList').append('<li><div class="plItem"></span><span class="plTitle">' + trackName + '</span><span class="plLength">' + trackDuration + '</span></div></li>');
    });

    trackCount = tracks_list.length;
    npAction = $('#npAction');
    npTitle = $('#npTitle');

    audio = $('#audio1').on('play', function() {
      playing = true;
      npAction.text('Now Playing...');
    }).on('pause', function() {
      playing = false;
      npAction.text('Paused...');
    }).get(0);
    btnPrev = $('#btnPrev').on('click', function() {
      if (index - 1 > -1) {
        index--;
        loadTrack(index, wavesurfer);
        if (playing) {
          audio.play();
        }
      } else {
        audio.pause();
        index = 0;
        loadTrack(index, wavesurfer);
      }
    });

    btnNext = $('#btnNext').on('click', function() {
      if (index + 1 < trackCount) {
        index++;
        loadTrack(index, wavesurfer);
        if (playing) {
          audio.play();
        }
      } else {
        audio.pause();
        index = 0;
        loadTrack(index, wavesurfer);
      }
    });

    li = $('#plList li').on('click', function() {
      var id;
      id = parseInt($(this).index());
      if (id !== index) {
        playTrack(id, wavesurfer);
      }
    });

    play = $('#npAction').on('click', function() {
      wavesurfer.playPause();
    });

    $("#npAction").click(function(){
        $("#npAction").toggleClass("active");
    });

    loadTrack = function(id, wavesurfer) {
      $('.plSel').removeClass('plSel');
      $('#plList li:eq(' + id + ')').addClass('plSel');
      npTitle.text(tracks_list[id].name);
      index = id;
      audio =tracks_list[id].file_url;
      wavesurfer.load(audio);
      wavesurfer.on('ready', function () {
          wavesurfer.play();
      });
    };

    playTrack = function(id, wavesurfer) {
      loadTrack(id, wavesurfer);
    };

    loadTrack(index, wavesurfer);
  }
}

