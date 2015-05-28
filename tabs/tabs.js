$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data("content-tabs"));
  this.$activeTab = this.$contentTabs.children('.active');
  this.$el.on('click', 'a', function (event) {
    this.clickTab(event);
  }.bind(this));
};

$.Tabs.prototype.clickTab = function (event) {
  event.preventDefault();
  this.$activeTab.addClass("transitioning");
  this.$activeTab.one('transitionend', function (transitionEvent) {
    $(transitionEvent.currentTarget).removeClass("transitioning").removeClass('active');

    this.$el.find('a').removeClass("active");
    this.$contentTabs.children().removeClass('active');

    $(event.currentTarget).addClass("active");

    this.$activeTab = this.$contentTabs.find($(event.currentTarget).attr('href'))
      .addClass('active').addClass("transitioning");

    window.setTimeout(function () {
      this.$activeTab.removeClass("transitioning");
    }.bind(this), 0);

  }.bind(this));



};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
