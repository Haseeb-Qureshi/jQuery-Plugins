$.Thumbnails = function (el) {
  this.$el = $(el);
};


$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};
