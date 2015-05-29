$.Zoomable = function (el) {
  this.$el = $(el);
  this.$image = this.$el.find('img');
  this.focusSize = 50;
  this.bindListeners();
};

$.Zoomable.prototype.bindListeners = function () {
  this.$el.on('mousemove', function (event) {
    this.showFocusBox(event);
  }.bind(this));

  this.$el.on('mouseleave', function (event) {
    this.removeFocusBox();
  }.bind(this));
};

$.Zoomable.prototype.showFocusBox = function(event) {
  if (!this.$focusBox) {
    this.$focusBox = $('<div>').addClass('focus-box')
      .css('width', this.focusSize + 'px').css('height', this.focusSize + 'px');
  }
  else {
    this.removeFocusBox();
  }
  var x = event.pageX - (this.focusSize / 2);
  var y = event.pageY - (this.focusSize / 2);
  x = this.preventXOverflow(x);
  y = this.preventYOverflow(y);

  this.$focusBox.css("top", y + "px").css("left", x + "px");

  this.$focusBox.appendTo(this.$el);
  this.bindRemoveFocusListener();
  this.showZoom(x, y);
};

$.Zoomable.prototype.preventXOverflow = function(x) {
  x = x < 0 ? 0 : x;
  x = x > this.$image.width() - (this.focusSize) ?
    this.$image.width() - (this.focusSize) : x;
  return x;
};

$.Zoomable.prototype.preventYOverflow = function(y) {
  y = y < 0 ? 0 : y;
  y = y > this.$image.height() - (this.focusSize) ?
    this.$image.height() - (this.focusSize) : y;
  return y;
};

$.Zoomable.prototype.removeFocusBox = function() {
  this.$focusBox.remove();
  $('body').find('.zoomed-image').remove();
};

$.Zoomable.prototype.bindRemoveFocusListener = function() {
  this.$focusBox.on('mouseleave', function (event) {
    this.removeFocusBox();
  }.bind(this));
};

$.Zoomable.prototype.showZoom = function(dx, dy) {
  var zoomedImg = this.$zoomedImg = $('<div>').addClass('zoomed-image')
    .css("width", $(window).height() + "px").appendTo('body');
  var height = $(window).height();
  var scalingF = height / this.focusSize;

  zoomedImg.css("background-image", "url(" + this.$image.attr("src") + ")");
  zoomedImg.css("background-size", this.$image.width() * scalingF + "px " +
    (this.$image.height() * scalingF) + "px");
  zoomedImg.css('background-position', (-1 * dx * scalingF) + 'px ' +
    (-1 * dy * scalingF) + 'px');
};


$.fn.zoomable = function () {
  return this.each(function () {
    new $.Zoomable(this);
  });
};
