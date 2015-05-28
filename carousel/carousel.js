$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.$items = this.$el.find('.items').children();
  this.$activeImage = this.activeImage();
  this.bindListeners();
  this.clickable = true;
};

$.Carousel.prototype.opp = function (dir) {
  return dir === "left" ? "right" : "left";
};

$.Carousel.prototype.slide = function (dir, dirClass) {
  this.activeIdx = (this.activeIdx + dir) % this.$items.length;
  var oldImage = this.$activeImage.addClass(dirClass);
  this.$activeImage = this.activeImage().addClass(this.opp(dirClass));

  this.clickable = false;
  window.setTimeout(function () {
    this.$activeImage.removeClass(this.opp(dirClass));
  }.bind(this), 0);

  oldImage.one('transitionend', function (transitionEvent) {
    oldImage.removeClass('active ' + dirClass);
    this.clickable = true;
  }.bind(this));
};

$.Carousel.prototype.slideLeft = function () {
  this.slide(1, "left");
};

$.Carousel.prototype.slideRight = function () {
  this.slide(-1, "right");
};

$.Carousel.prototype.bindListeners = function() {
  $(this.$el.find('.slide-right')).on('click', function (event) {
    this.clickable && this.slideRight();
  }.bind(this));

  $(this.$el.find('.slide-left')).on('click', function (event) {
    this.clickable && this.slideLeft();
  }.bind(this));
};

$.Carousel.prototype.activeImage = function() {
  return this.$items.eq(this.activeIdx).addClass('active');
}


$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
