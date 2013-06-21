SandBox.prototype.Listing = function(){
  var ref$, _selected;
  this.page = 1;
  this.max_pages = -1;
  this.$elements = {
    no_photos: $('.no-photos'),
    loader: null
  };
  this.properties = {
    path: location.pathname.replace(/\/+$/, ''),
    hash: null,
    default_hash: '#/get/recent/show/all/',
    default_hash_used: false,
    list: '#photo_list_content ul',
    list_filters: '.list-filter',
    list_tpl: (ref$ = this.$dom.data('list-tpl')) != null ? ref$ : 'cols3',
    show_prev: '.show-prev',
    show_next: '.show-next',
    loader: '<li id="loader"></li>',
    load_request: {
      abort: function(){}
    },
    load_cache: {},
    addButton_chooseImage: false,
    addButton_chooseImage_url: ''
  };
  this.$dom.addClass(this.properties.list_tpl);
  this.init = function(){
    var x$;
    x$ = this.properties;
    x$.list = $(x$.list);
    x$.list_filters = $(x$.list_filters);
    x$.show_next = $(x$.show_next).click(this.show_prev_next);
    x$.show_prev = $(x$.show_prev).click(this.show_prev_next);
    x$.list_filters.find(':radio').change(function(){
      var $this, type;
      $this = $(this(type = $this.attr('name')));
      return location.hash = this.properties.hash.replace(RegExp(type + '\\/[^\\/]+'), '').replace(/page\/[^\/]+/, '') + "" + type + "/" + $this.val() + "/";
    });
    return setInterval(function(){
      var hash;
      hash = location.hash;
      if (this.properties.hash && this.properties.hash === hash) {
        return;
      }
      if (!hash.substr(1)) {
        if (this.properties.default_hash_used) {
          return;
        }
        hash = this.properties.default_hash;
      }
      this.properties.default_hash_used = true;
      return this.load(hash);
    }, 100);
  };
  this.request = function(){
    var path, that;
    this.properties.list.append(this.properties.loader);
    path = this.get_path();
    if (that = this.properties.load_cache[path]) {
      return this.onLoadSuccess(that);
    } else {
      return this.properties.load_request = $.ajax({
        url: path,
        dataType: 'json',
        success: function(it){
          return this.onLoadSuccess(this.properties.load_cache[path] = it);
        }
      });
    }
  };
  this.reload = function(){
    delete this.properties.load_cache[this.get_path()];
    return this.load(this.properties.hash);
  };
  this.fix_prev_next = function(){
    var x$;
    x$ = this.properties;
    x$.show_prev.attr('href', "#" + (this.page - 1))[this.page < 2 ? 'hide' : 'show']();
    x$.show_next.attr('href', "#" + (this.page + 1))[this.max_pages !== -1 && this.page + 1 >= this.max_pages ? 'hide' : 'show']();
    return x$;
  };
  _selected = function(it){
    return it.parent().addClass('selected').siblings().removeClass('selected');
  };
  this.load = function(it){
    var x$, last_path, cache, y$, that, z$, z1$;
    x$ = this.properties;
    x$.load_request.abort();
    x$.list.empty();
    x$.show_prev.hide();
    x$.show_next.hide();
    x$.hash = it;
    last_path = this.last_path;
    if (last_path && (cache = this.properties.load_cache[last_path]) != null) {
      y$ = cache;
      y$.max_pages = this.max_pages;
      y$.page = this.page;
    }
    if (that = /\/get\/(\w+)/.exec(it) && that[1]) {
      _selected(
      $("[href='#/get/" + that[1] + "/']"));
    }
    if (that = /\/show\/(\w+)/.exec(it) && that[1]) {
      _selected(
      $("[href='#/show/" + that[1] + "/']"));
    }
    if (that = /\/page\/(\d+)/.exec(it) && that[1] > 0) {
      this.page = that[1];
      z$ = this.properties;
      z$.show_prev.attr('href', "#" + (this.page - 1));
      z$.show_next.attr('href', "#" + (this.page + 1));
    } else {
      this.page = 1;
      z1$ = this.properties;
      z1$.show_prev.attr('href', '#1').hide();
      z1$.show_next.attr('href', '#2');
    }
    if (!this.properties.default_hash_used) {
      location.hash = it;
    }
    return this.request();
  };
  this.onLoadSuccess = function(it){
    var ref$, html, m;
    if ((ref$ = it.page) != null) {
      this.page = ref$;
    }
    this.max_pages = (ref$ = it.max_pages) != null
      ? ref$
      : -1;
    if (it.Markers.length) {
      html = (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = it.Markers).length; i$ < len$; ++i$) {
          m = ref$[i$];
          results$.push(this.li_template[this.properties.list_tpl](Photo.convertAjax(m), it.Type, it.is_current_usr));
        }
        return results$;
      }.call(this)).join('');
    } else if (this.page !== 1) {
      this.properties.show_prev.click();
      this.max_pages = this.page;
    }
    if (it.ShowMore === 0) {
      this.max_pages = this.page + 1;
    }
    this.fix_prev_next();
    (this.$elements.loader = $('#loader')).remove();
    return this.properties.list.html(html != null
      ? html
      : this.$elements.no_photos.html());
  };
  this.show_prev_next = function(){
    var page;
    page = $(this).attr('href').substr(1);
    location.hash = this.properties.hash.replace(/page\/\d+/, '').replace(/\/+$/, '/') + (page > 1 ? "page/" + page + "/" : '');
    return false;
  };
  this.last_path = null;
  this.get_path = function(){
    return this.last_path = this.properties.path + this.properties.hash.substr(1).replace(/\/+$/, '/');
  };
  this.li_template = [
    'cols3:', function(data, type, is_current_usr){
      var ctrl_buttons, ref$, caption;
      ctrl_buttons = is_current_usr && (type === 'favourites' || $("input.filter-show[@name='show']:checked").val() === "favourites" && ONHP)
        ? "<a href=\"#\" class=\"favourite icon\" rel=\"" + data.id + "\"><span class=\"ss-icon ss-deleteheart\"></span></a>"
        : (data.can_admin && (typeof ONHP != 'undefined' && ONHP !== null
          ? ONHP
          : (ref$ = {}, ref$["<a href=\"" + data.url.edit + "\" " + (!HAS_CUSTOM_PINNER_EDIT_ATTACH || (typeof IS_CHANNEL != 'undefined' && IS_CHANNEL !== null
            ? IS_CHANNEL
            : {
              'target="_parent"': ''
            })) + " class=\"icon edit\" title=\"Edit photo\"><span class=\"ss-icon ss-write\"></span></a>"] = '', ref$))) + (data.can_admin && (typeof ONHP != 'undefined' && ONHP !== null
          ? ONHP
          : (ref$ = {}, ref$["<a href=\"" + data.url.del + "\" class=\"icon delete delete-confirm\" title=\"Delete photo\"><span class=\"ss-icon ss-trash\"></span></a>"] = '', ref$))) + (data.can_admin && ONHP && ((ref$ = !data.incomplete) != null
          ? ref$
          : (ref$ = {}, ref$["<a href=\"/upload/unpin/phid/" + data.id + "/ajax/1/\" class=\"icon unpin\" title=\"Unpin\"><span class=\"ss-icon ss-delete\"></span></a>"] = '', ref$)));
      caption = data.caption.replace(/"/g, '&quot;');
      type = Photo.TYPES_CLASSES[data.type];
      return "<li class=\"" + (data.incomplete ? ' incomplete' : '') + "\">\n	<div class=\"image-holder\"" + (data.can_admin ? " title=\"" + data.filename + "\"" : '') + ">\n		<a href=\"" + (data.incomplete
        ? data.url.edit
        : data.url.view) + "\" " + (data.incomplete ? 'target="_parent"' : '') + " class=\"image\" title=\"" + (data.can_admin ? data.filename : caption) + "\">\n			<img src=\"" + data.url.thumb_list + "\" alt=\"" + (data.can_admin ? data.filename : caption) + "\" />\n			" + (typeof type !== "undefined" && type !== "photo" ? "<span class=\"ss-icon ss-" + type + "\"></span>" : '') + "\n		</a>\n		" + (ctrl_buttons ? "<span class=\"holder\">" + ctrl_buttons + "<span class=\"cleaner\"></span></span>" : '') + "\n	</div>\n	<div class=\"info\">\n		" + (data.incomplete ? '<h5>Unpinned</h5>' : '') + "\n		<h5>" + caption + "</h5>\n		<p>" + data.date_taken + "</p>\n		" + (!EMBED && data.user ? "<p>by <a href=\"" + data.url.user + "\">${data.user}</a></p>" : '') + "\n		<p>" + ((ref$ = data.geo_tags) != null ? ref$ : 'Location unknown') + "</p>\n		<p>Views: " + data.count.views + "</p>\n	<div class=\"cleaner\"></div>\n	</div>\n	<div class=\"info-actions\"" + (data.incomplete ? 'style="display: none;"' : '') + "'>\n		" + (this.properties.addButton_chooseImage ? "<a href=\"" + data.id + "\" class=\"icon choose\" title=\"This photo represents me\"><span class=\"ss-icon ss-smile\"></span></a>" : '') + "\n		<a href=\"" + data.url.view + "\" class=\"icon explore\" title=\"See on Map\" ><span class=\"ss-icon ss-map\"></span>Map</a>\n		" + (data.streetview && !data.incomplete ? "<a href=\"" + data.url.streetview + "\" class=\"icon streetview\" title=\"See on Street View\"></a>" : '') + "\n		" + (data.count.stories && !data.incomplete ? "<a href=\"" + data.url.stories + "\" class=\"icon story\" title=\"See Comments\"><span class=\"ss-icon ss-chat\"></span>" + data.count.stories + "<span></span></a>" : '') + "\n		<div class=\"cleaner\"></div>\n	</div>\n</li>";
    }
  ];
  this.init();
  this.properties.list.delegate('.favourite', 'click', function(){
    var $this, id;
    $this = $(this);
    id = parseInt($this.attr('rel'));
    if ($this.hasClass('not')) {
      Photo.add_favourite(id, null, function(){
        return $this.addClass('not');
      });
      $this.removeClass('not');
    } else {
      Photo.rem_favourite(id, null, function(){
        return $this.removeClass('not');
      });
      $this.addClass('not').closest('li').fadeOut();
    }
    return false;
  });
  return this.properties.list.delegate('.unpin', 'click', function(){
    var $this;
    $this = $(this);
    $.ajax({
      url: $this.attr('href'),
      type: 'get',
      success: function(){
        return $this.fadeOut().closest('li').addClass('incomplete');
      }
    });
    return false;
  });
};