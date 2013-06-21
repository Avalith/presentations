SandBox.prototype.Listing = function()
{
	var _self = this;
	
	_self.properties = 
	{
		path						: location.pathname.replace(/\/+$/, ''),
		hash						: null,
		default_hash				: '#/get/recent/show/all/',
		default_hash_used			: false,
		list						: '#photo_list_content ul',
		list_filters				: '.list-filter',
		show_prev					: '.show-prev',
		show_next					: '.show-next',
		
		loader						: '<li id="loader"></li>',
		load_request 				: { abort: function(){} },
		load_cache					: [],
		
		list_tpl					: _self.$dom.data('list-tpl'),
		
		addButton_chooseImage 		: false,
		addButton_chooseImage_url	: ''
	};
	
	if(!_self.properties.list_tpl){ _self.properties.list_tpl = 'cols3'; }
	_self.$dom.addClass(_self.properties.list_tpl);
	
	_self.$elements =
	{
		photo_list_cnt	: $('#photo_list_content'),
		no_photos		: $('.no-photos'),
		loader			: null
	};
	
	_self.init = function()
	{
		_self.properties.list			= $(_self.properties.list);
		_self.properties.list_filters	= $(_self.properties.list_filters);
		_self.properties.show_next		= $(_self.properties.show_next).click(_self.show_prev_next);
		_self.properties.show_prev		= $(_self.properties.show_prev).click(_self.show_prev_next);
		
		_self.properties.list_filters.find(':radio').change(function()
		{
			var $this = $(this), type = $this.attr('name'), val = $this.val();
			
			location.hash = _self.properties.hash.replace(new RegExp(type+'\/[^\/]+'), '').replace(new RegExp('page\/[^\/]+'), '').replace(/\/{2,}/, '/') + type + '/' + val + '/';
		});
		
		
		setInterval(function()
		{
			hash = location.hash;
			if(_self.properties.hash && _self.properties.hash === hash){ return; }
			
			if(!hash.substr(1))
			{
				if(_self.properties.default_hash_used){ return; }
				hash = _self.properties.default_hash; _self.properties.default_hash_used = true; 
			}
			else
			{ 
				_self.properties.default_hash_used = true;
			}
			
			_self.load(hash);
		}, 100);
	};
	
	_self.request = function()
	{
		_self.properties.list.append(_self.properties.loader);
		path = _self.get_path();
		
		if(response = _self.properties.load_cache[path]) { _self.onLoadSuccess(response); return; }
		
		_self.properties.load_request = $.ajax(
		{
			url			: path,
			success		: function(response)
			{
				_self.properties.load_cache[path] = response;
				_self.onLoadSuccess(response);
			},
			dataType	: 'json'
		});
	};
		
	_self.reload = function()
	{
		delete _self.properties.load_cache[_self.get_path()];
		_self.load(_self.properties.hash);
	};
	
	_self.page = 1;
	_self.max_pages = -1;
	
	_self.fix_prev_next = function()
	{
		if(_self.max_pages != -1 && (_self.page + 1) >= _self.max_pages)
		{
			_self.properties.show_next.hide();
		}
		else
		{
			_self.properties.show_next.show(); 
		}
		
		_self.properties.show_prev.attr('href', '#'+(_self.page-1));
		_self.properties.show_next.attr('href', '#'+(_self.page+1));
		_self.page < 2 ? _self.properties.show_prev.hide() : _self.properties.show_prev.show();
	} ;
	
	_self.load = function(hash)
	{
		_self.properties.hash = hash;
		_self.properties.load_request.abort();
		_self.properties.list.empty();
		_self.properties.show_prev.hide();
		_self.properties.show_next.hide();
		
		last_path = _self.last_path;
		if(last_path && typeof _self.properties.load_cache[last_path] != 'undefined')
		{
			_self.properties.load_cache[last_path].max_pages = _self.max_pages;
			_self.properties.load_cache[last_path].page      = _self.page;
		}
		
		if((matches = hash.match(/\/get\/(\w+)/)) && matches[1]) { $('[href="#/get/'+matches[1]+'/"]').parent().addClass('selected').siblings().removeClass('selected'); }
		if((matches = hash.match(/\/show\/(\w+)/)) && matches[1]) { $('[href="#/show/'+matches[1]+'/"]').parent().addClass('selected').siblings().removeClass('selected'); }
		if((matches = hash.match(/\/page\/(\d+)/)) && matches[1] > 0)
		{
			_self.page = parseInt(matches[1]);
			_self.properties.show_prev.attr('href', '#'+(_self.page-1));
			_self.properties.show_next.attr('href', '#'+(_self.page+1));
			
		}
		else
		{
			_self.page = 1;
			_self.properties.show_prev.attr('href', '#1').hide();
			_self.properties.show_next.attr('href', '#2');
		}
		
		
		if(!_self.properties.default_hash_used){ location.hash = hash; }
		_self.request();
	};
	_self.onLoadSuccess = function(response)
	{
		html = '';
		
		if(response.page){ _self.page = response.page; }
		
		if(response.max_pages){ _self.max_pages = response.max_pages; }
		else { _self.max_pages = -1; }
		
		if(response.Markers.length > 0) { for(m=0; m<response.Markers.length; m++) { html += _self.li_template[_self.properties.list_tpl](Photo.convertAjax(response.Markers[m]), response.Type, response.is_current_usr); } }
		else if (_self.page != 1) { _self.properties.show_prev.click(); _self.max_pages = _self.page; }
		
		if(0 == response.ShowMore){ _self.max_pages = _self.page +1 ; }
		_self.fix_prev_next();
		
		_self.$elements.loader = $('#loader');
		_self.$elements.loader.remove();
		
		if(html!=="")
		{
			_self.properties.list.html(html);
		}
		else
		{
			_self.properties.list.html(_self.$elements.no_photos.html());
		}
		
	};
	
	_self.show_prev_next = function()
	{
		var page = $(this).attr('href').substr(1);
		location.hash = _self.properties.hash.replace(/page\/\d+/, '').replace(/\/+$/, '/').replace('//', '/') + (page > 1 ? 'page/' + page + '/' : '');
		
		return false;
	};
	_self.last_path = null;
	_self.get_path = function()
	{
		var r = /\/+$/;
		_self.last_path = _self.properties.path + _self.properties.hash.substr(1).replace(r, '/');
		return _self.last_path;
	};


	_self.li_template = {
		'cols3': function(data, type, is_current_usr)
		{
			var ctrl_buttons = '';
			if(is_current_usr && (type == 'favourites' || $("input.filter-show[@name='show']:checked").val() == "favourites" && ONHP))
			{
				is_current_usr ? ctrl_buttons = '<a href="#" class="favourite icon" rel="' + data.id + '"><span class="ss-icon ss-deleteheart"></span></a>' : '';
			}
			else
			{
				ctrl_buttons = (data.can_admin && ONHP ? '<a href="' + data.url.edit +'" ' + (!HAS_CUSTOM_PINNER_EDIT_ATTACH || IS_CHANNEL ? 'target="_parent"' : '') + 'class="icon edit" title="Edit photo"><span class="ss-icon ss-write"></span></a>' : '')
							 + (data.can_admin && ONHP ? '<a href="' + data.url.del +'" class="icon delete delete-confirm" title="Delete photo"><span class="ss-icon ss-trash"></span></a>' : '')
							 + (data.can_admin && ONHP && !data.incomplete ? '<a href="/upload/unpin/phid/'+ data.id +'/ajax/1/" class="icon unpin" title="Unpin"><span class="ss-icon ss-delete"></span></a>' : '');
			}
			
			var caption = data.caption.replace(/"/g, '&quot;');
			var type = Photo.TYPES_CLASSES[data.type];
			
			return '<li class="' + (data.incomplete ? ' incomplete' : '') + '">'
			+ 	'<div class="image-holder"' + (data.can_admin ? 'title="' + data.filename+ '"' : '') + '>'
			+		'<a href="' + (data.incomplete ? data.url.edit + '" target="_parent' : data.url.view) + '" ' + ' class="image" title="'+(data.can_admin ? data.filename : caption )+'">'
			+			'<img src="'+data.url.thumb_list+'" alt="'+(data.can_admin ? data.filename : caption )+'" />'
			+			( typeof type != "undefined" && type != "photo" ? '<span class="ss-icon ss-' + type + '"></span>' : '')
			+		'</a>'
			+		(ctrl_buttons ? '<span class="holder">' + ctrl_buttons + '<span class="cleaner"></span></span>' : '')
			+	'</div>'
			+	'<div class="info">'
			+		(data.incomplete ? '<h5>Unpinned</h5>' : '')
			+		'<h5>'+caption + '</h5>'
			+		'<p>' + data.date_taken + '</p>'
			+		(!EMBED && data.user ? '<p>by <a href="' + data.url.user + '">' + data.user + '</a></p>' : '')
			+		'<p>' + (data.geo_tags == "" ? 'Location unknown': data.geo_tags) + '</p>'
			+		'<p>Views: ' + data.count.views+'</p>'
			+	'<div class="cleaner"></div>'
			+	'</div>'
			+	'<div class="info-actions"'+ (data.incomplete ? 'style="display: none;"' : '') + '>'
			+		(_self.properties.addButton_chooseImage ? '<a href="' + data.id + '" class="icon choose" title="This photo represents me"><span class="ss-icon ss-smile"></span></a>' : '')
			+		'<a href="' + data.url.view + '" class="icon explore " title="See on Map" ><span class="ss-icon ss-map"></span>Map</a>'
			+		(data.streetview && !data.incomplete ? '<a href="' + data.url.streetview + '" ' + ' class="icon streetview" title="See on Street View"></a>' : '')
			+		(data.count.stories && !data.incomplete ? '<a href="' + data.url.stories + '" ' + ' class="icon story" title="See Comments"><span class="ss-icon ss-chat"></span>'+data.count.stories+'<span></span></a>' : '')
			+		'<div class="cleaner"></div>'
			+	'</div>'
			+'</li>';
		}
		
	};
	
	$('#photo_list_content ul').delegate('.favourite', 'click', function()
	{
		var $this = $(this), id = parseInt($(this).attr('rel'));
		
		if($this.hasClass('not'))
		{
			$this.removeClass('not');
			Photo.add_favourite(id, null, function(){ $this.addClass('not'); });
		}
		else
		{
			$this.addClass('not');
			Photo.rem_favourite(id, null, function(){ $this.removeClass('not'); });
			$(this).closest('li').fadeOut();
		}
		
		return false;
	});

	_self.$elements.photo_list_cnt.delegate('.unpin', 'click', function()
	{
		$this = $(this);
		$.ajax({
			url			: $(this).attr('href'),
			type		: 'get',
			success		: function() {
				$this.fadeOut();
				$this.closest('li').addClass('incomplete');
			}
		});
		return false;
	});	
	
	_self.init();
};
