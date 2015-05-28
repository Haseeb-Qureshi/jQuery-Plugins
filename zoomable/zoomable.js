$.Zoomable = function (el) {
  this.$el = $(el);
  this.focusSize = 50;
  this.bindListeners();
};

$.Zoomable.prototype.bindListeners = function () {
  this.$el.on('mouseenter', function (event) {
    this.showFocusBox(event);
  }.bind(this));

  this.$el.on('mouseleave', function (event) {
    this.removeFocusBox();
  }.bind(this));
};

$.Zoomable.prototype.showFocusBox = function(event) {
  this.$focusBox = $('<div>').addClass('focus-box')
    .attr('width', this.focusSize + 'px').attr('height', this.focusSize + 'px');
  var x = event.x - (this.focusSize / 2);
  var y = event.y - (this.focusSize / 2);
  x = x < 0 ? 0 : x;
  y = y < 0 ? 0 : y;
  this.$focusBox.attr("top", y + "px").attr("left", x + "px");


};

$.Zoomable.prototype.removeFocusBox = function() {
  this.$focusBox.remove();
};


$.fn.zoomable = function () {
  return this.each(function () {
    new $.Zoomable(this);
  });
};
