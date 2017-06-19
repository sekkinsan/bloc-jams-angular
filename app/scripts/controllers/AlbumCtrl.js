(function() {
  function AlbumCtrl(Fixtures, SongPlayer){
    //this.albumData = angular.copy(albumPicasso) updated using Fixture service's getAlbum() method
      this.albumData = Fixtures.getAlbum();
      this.songPlayer = SongPlayer;
  };

  angular
      .module('blocJams')
      .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
