(function() {
  function AlbumCtrl(Fixtures){
    //this.albumData = angular.copy(albumPicasso) updated using Fixture service's getAlbum() method
      this.albumData = Fixtures.getAlbum();
  };

  angular
      .module('blocJams')
      .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
