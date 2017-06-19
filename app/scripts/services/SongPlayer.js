(function() {
    function SongPlayer() {
        var SongPlayer = {};

        var currentSong = null;

        /**
        * @desc Current Buzz object audio file
        * @type {Object}
        */

        var currentBuzzObject = null;

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */

        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
         };

         /**
         * @function playSong
         * @desc plays the currentBuzzObject and sets property of song Object to true
         * @param {Object} song
         */

         var playSong = function(song){
           currentBuzzObject.play();
           song.playing = true;
         }


         /**
         * @function SongPlayer.play
         * @desc Public method that takes a song object parameter and plays the buzz object that was selected
         * @param {Object} song
         */

        SongPlayer.play = function(song) {
          if (currentSong !== song) {
            setSong(song);
            currentBuzzObject.play();
            song.playing = true;
          } else if (currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                  currentBuzzObject.play();
              }
          }
        };

        /**
        * @function SongPlayer.pause
        * @desc Public method that takes a song object parameter and pauses the currently playing song
        * param {Object} song
        */
        
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
