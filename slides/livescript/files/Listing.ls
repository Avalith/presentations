SandBox::Listing = ->
	@page		= 1
	@max_pages	= -1
	@$elements	= no_photos: $(\.no-photos), loader: null
	@properties	=
		path						: location.pathname.replace /\/+$/, ''
		hash						: null
		default_hash				: \#/get/recent/show/all/
		default_hash_used			: no
		list						: '#photo_list_content ul'
		list_filters				: \.list-filter
		list_tpl					: (@$dom.data \list-tpl) ? \cols3
		show_prev					: \.show-prev
		show_next					: \.show-next
		
		loader						: '<li id="loader"></li>'
		load_request 				: abort: ->
		load_cache					: {}
		
		addButton_chooseImage 		: false
		addButton_chooseImage_url	: ''
	
	@$dom.addClass @properties.list_tpl
	
	@init = ->
		@properties
			..list			= $(..list)
			..list_filters	= $(..list_filters)
			..show_next		= $(..show_next)click @show_prev_next
			..show_prev		= $(..show_prev)click @show_prev_next
			
			..list_filters.find \:radio .change ->
				$this = $(@)type = $this.attr \name
				location.hash = "#{@properties.hash.replace //#type\/[^\/]+//, '' .replace /page\/[^\/]+/, ''}#type/#{$this.val!}/"
		
		setInterval ->
			hash = location.hash
			
			return if @properties.hash and @properties.hash is hash
			
			unless hash.substr 1
				return if @properties.default_hash_used
				hash = @properties.default_hash
			
			@properties.default_hash_used = yes
			@load hash
		, 100
	
	@request = ->
		@properties.list.append @properties.loader
		path = @get_path!
		
		if @properties.load_cache[path] then @onLoadSuccess that
		else @properties.load_request = $.ajax url: path, dataType: \json, success: -> @onLoadSuccess @properties.load_cache[path] = it
	
	@reload = -> delete @properties.load_cache[@get_path!]; @load @properties.hash
	
	@fix_prev_next = ->
		@properties
			..show_prev.attr(\href, "##{@page-1}")[ if @page < 2 then \hide else \show ]!
			..show_next.attr(\href, "##{@page+1}")[ if @max_pages != -1 and @page + 1 >= @max_pages then \hide else \show ]!
	
	_selected = (.parent!addClass \selected .siblings!removeClass \selected)
	@load = ->
		@properties..load_request.abort!..list.empty!..show_prev.hide!..show_next.hide!
			..hash = it
		
		last_path = @last_path
		if last_path and (cache = @properties.load_cache[last_path])?
			cache
				..max_pages = @max_pages
				..page		= @page
		
		if /\/get\/(\w+)/	== it and that[1] then $ "[href='#/get/#{that[1]}/']"	|> _selected
		if /\/show\/(\w+)/	== it and that[1] then $ "[href='#/show/#{that[1]}/']"	|> _selected
		if /\/page\/(\d+)/	== it and that[1] > 0
			@page = that[1]
			@properties..show_prev.attr \href, "##{@page-1}" ..show_next.attr \href, "##{@page+1}"
		else
			@page = 1
			@properties..show_prev.attr \href, \#1 .hide! ..show_next.attr \href, \#2
		
		unless @properties.default_hash_used then location.hash = it
		
		@request!
	
	@onLoadSuccess (it = {@page, @max_pages = -1})= ->
		
		if it.Markers.length
			html = [@li_template[@properties.list_tpl] Photo.convertAjax(m), it.Type, it.is_current_usr for m in it.Markers] * ''
		else if @page != 1
			@properties.show_prev.click!
			@max_pages = @page
		
		@max_pages = @page + 1 if it.ShowMore is 0
		
		@fix_prev_next!
		(@$elements.loader = $ \#loader)remove!
		
		@properties.list.html(html ? @$elements.no_photos.html!)
	
	@show_prev_next = ->
		page = $ @ .attr \href .substr 1
		location.hash = (@properties.hash.replace /page\/\d+/, '' .replace /\/+$/, '/') + (if page > 1 then "page/#page/" else '')
		
		false
	
	@last_path = null
	@get_path = -> @last_path = @properties.path + @properties.hash.substr 1 .replace /\/+$/, '/'
	
	@li_template =
		\cols3: (data, type, is_current_usr) ->
			ctrl_buttons =
				if is_current_usr && (type == 'favourites' || $ "input.filter-show[@name='show']:checked" .val! == "favourites" && ONHP)
					"<a href=\"#\" class=\"favourite icon\" rel=\"#{data.id}\"><span class=\"ss-icon ss-deleteheart\"></span></a>"
				else
					(data.can_admin && ONHP ? "<a href=\"#{data.url.edit}\" #{!HAS_CUSTOM_PINNER_EDIT_ATTACH || IS_CHANNEL ? 'target="_parent"' : ''} class=\"icon edit\" title=\"Edit photo\"><span class=\"ss-icon ss-write\"></span></a>" : '') \
					+ (data.can_admin && ONHP ? "<a href=\"#{data.url.del}\" class=\"icon delete delete-confirm\" title=\"Delete photo\"><span class=\"ss-icon ss-trash\"></span></a>" : '') \
					+ (data.can_admin && ONHP && !data.incomplete ? "<a href=\"/upload/unpin/phid/#{data.id}/ajax/1/\" class=\"icon unpin\" title=\"Unpin\"><span class=\"ss-icon ss-delete\"></span></a>" : '')
			
			caption	= data.caption.replace /"/g, '&quot;'
			type	= Photo.TYPES_CLASSES[data.type]
			
			# TODO move this as a template
			"""<li class="#{if data.incomplete then ' incomplete' else ''}">
				<div class="image-holder"#{if data.can_admin then " title=\"#{data.filename}\"" else ''}>
					<a href="#{if data.incomplete then data.url.edit else data.url.view}" #{if data.incomplete then 'target="_parent"' else ''} class="image" title="#{if data.can_admin then data.filename else caption}">
						<img src="#{data.url.thumb_list}" alt="#{if data.can_admin then data.filename else caption}" />
						#{if typeof type != "undefined" && type != "photo" then "<span class=\"ss-icon ss-#type\"></span>" else ''}
					</a>
					#{if ctrl_buttons then "<span class=\"holder\">#ctrl_buttons<span class=\"cleaner\"></span></span>" else ''}
				</div>
				<div class="info">
					#{if data.incomplete then '<h5>Unpinned</h5>' else ''}
					<h5>#caption</h5>
					<p>#{data.date_taken}</p>
					#{if !EMBED and data.user then "<p>by <a href=\"#{data.url.user}\">${data.user}</a></p>" else ''}
					<p>#{data.geo_tags ? 'Location unknown'}</p>
					<p>Views: #{data.count.views}</p>
				<div class="cleaner"></div>
				</div>
				<div class="info-actions"#{if data.incomplete then 'style="display: none;"'  else ''}'>
					#{if @properties.addButton_chooseImage then "<a href=\"#{data.id}\" class=\"icon choose\" title=\"This photo represents me\"><span class=\"ss-icon ss-smile\"></span></a>" else ''}
					<a href="#{data.url.view}" class="icon explore" title="See on Map" ><span class="ss-icon ss-map"></span>Map</a>
					#{if data.streetview and !data.incomplete then "<a href=\"#{data.url.streetview}\" class=\"icon streetview\" title=\"See on Street View\"></a>" else ''}
					#{if data.count.stories and !data.incomplete then "<a href=\"#{data.url.stories}\" class=\"icon story\" title=\"See Comments\"><span class=\"ss-icon ss-chat\"></span>#{data.count.stories}<span></span></a>" else ''}
					<div class="cleaner"></div>
				</div>
			</li>"""
	
	@init!
	
	@properties.list.delegate \.favourite, \click, ->
		$this = $ @; id = parseInt $this.attr \rel
		
		if $this.hasClass \not
			Photo.add_favourite id, null, -> $this.addClass \not
			$this.removeClass \not
		else
			Photo.rem_favourite id, null, -> $this.removeClass \not
			$this.addClass \not .closest \li .fadeOut!
		
		false
	
	@properties.list.delegate \.unpin, \click, ->
		$this = $ @
		$.ajax url: $this.attr(\href), type: \get, success: -> $this.fadeOut!closest \li .addClass \incomplete
		
		false
