$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$active = this.$el.find('.active');
  this.$images = this.$el.find('.gutter-images').children();
  this.$activeImg = this.$images.eq(0);
  this.gutterIdx = 0;
  this.fillGutterImages();

  this.activate(this.$activeImg);
  this.bindHandlers();
};

$.Thumbnails.prototype.activate = function ($img) {
  this.$display = $img.clone().appendTo(this.$active);
};

$.Thumbnails.prototype.fillGutterImages = function () {
  this.$images.each(function () {
    this.remove();
  });
  this.imgCount = this.$images.length;
  for (var i = this.gutterIdx; i < this.gutterIdx + 4; i++) {
    j = i >= this.imgCount ? i - this.imgCount : i;
    this.$images.eq(j).appendTo(this.$el.find('.gutter-images'));
  }
};

$.Thumbnails.prototype.bindHandlers = function () {
  var that = this;

  this.$images.each(function () {

    $(this).on('click', function (event) {
      that.$display.remove();
      that.$activeImg = $(event.currentTarget);
      that.activate(that.$activeImg);
    });

    $(this).on('mouseenter', function (event) {
      that.$display.remove();
      that.activate($(event.currentTarget));
    });

    $(this).on('mouseleave', function (event) {
      that.$display.remove();
      that.activate(that.$activeImg);
    });
  });

  this.$el.find('.nav').eq(0).on('click', function (event) {
    that.gutterIdx = (that.gutterIdx - 1) % that.imgCount;
    that.fillGutterImages();
  });

  this.$el.find('.nav').eq(1).on('click', function (event) {
    that.gutterIdx = (that.gutterIdx + 1) % that.imgCount;
    that.fillGutterImages();
  });
};

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};
