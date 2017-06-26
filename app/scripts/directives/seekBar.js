(function() {
    function seekBar($document) {

      var calculatePercent = function(seekBar, event) { //calculates horizontal percent along seek bar where event occurred
          var offsetX = event.pageX - seekBar.offset().left;
          var seekBarWidth = seekBar.width();
          var offsetXPercent = offsetX / seekBarWidth;
          offsetXPercent = Math.max(0, offsetXPercent);
          offsetXPercent = Math.min(1, offsetXPercent);
          return offsetXPercent;
      };

        return {
            templateUrl: '/templates/directives/seek_bar.html',
            //specifies a URL from which the directive will load a template.
            replace: true,
            //specifies what the template should replace (true = replace directive's element; false = replace contents of directive's element)
            restrict: 'E',
            //restricts the directive to a specific declaration style
            scope: {
                  onChange: '&'
                },
            //specifies that a new scope be created for the directive
            link: function(scope, element, attributes) {
            //responsible for registering DOM listeners and updating the DOM
                //directive logic to return
                scope.value = 0; //holds the value of seek bar, such as currently playing song time or current volume
                scope.max = 100; //holds maximum value of song and volume seek bars

                var seekBar = $(element); //holds the element that matches directive <seek-bar> as a jquery object so we can call jquery methods on it

                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });

                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                });

                var percentString = function () { //function that calculates a percent based on value and max value of seek bar
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };

                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };

                scope.fillStyle = function() { //returns the width of the seek bar fill element based on calculated percent
                    return {width: percentString()};
                };

                scope.thumbStyle = function() {//updates position of seek bar thumb
                    return {left: percentString()};
                };

                scope.onClickSeekBar = function(event) { //updates the seek bar value based on seek bar's width and location of user's click on seek bar
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };

                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });

                $document.bind('mouseup.thumb', function(){
                    $document.unbind('mousemove.thumb');
                    $document.unbind('mouseup.thumb');
                });
              };
            }
        };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
