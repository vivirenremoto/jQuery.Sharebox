// sharebox 1.0
// author: Miquel Camps Orteza
// twitter: @miquelcamps
// website: http://miquelcamps.com


(function (window, document, $) {
	"use strict";

	var W = $(window),
		D = $(document),
		F = $.sharebox = function () {
			F.open(arguments);
		};

	$.extend(F, {

		defaults: {
			delay    : 1000,		// tiempo en aparecer el menú
			left     : 'auto',		// posición izquierda
			right    : 0,			// posición derecha
			top      : '20%',		// posición superior
			bottom   : 'auto',		// posición inferior
			focus    : true,		// mostrar sombra
			twitter  : true,		// mostrar botón twitter
			facebook : true,		// mostrar botón facebook
			google   : true,		// mostrar botón google+
			linkedin : true,		// mostrar botón linkedin
			hide     : false,		// ocultar menú al seleccionar opción
			share_txt : 'compartir'	// texto botón compartir
		},

		share: function (op) {

			var w = 500;
			var h = 250;
			var left = (screen.width/2)-(w/2);
		  	var top = (screen.height/2)-(h/2);
			var title = encodeURI( document.title );
			var source = encodeURI( document.location.href );
			var url;
		
			switch( op ){
				case 'twitter':
					url = 'http://twitter.com/?status=' + title + '+' + source;
					break;
				case 'facebook':
					url = 'https://www.facebook.com/sharer/sharer.php?u=' + source;
					break;
				case 'linkedin':
					url = 'http://www.linkedin.com/shareArticle?url=' + source;
					break;
				case 'google':
					url = 'https://plus.google.com/share?url=' + source;
					break;
			}
			
			window.open (url, 'win_share','width='+w+',height='+h+', top='+top+', left='+left);
			
			if( F.defaults.hide ){
				$('#sharebox_options').slideToggle('fast',function(){
					if( F.defaults.focus ) $('#sharebox_shadow').hide();
				});
			}
			
			return false;
		},

		open: function (opts) {

			if( opts.length ){
				$.each(opts[0], function (key,value) {
					F.defaults[key] = value;
				});
			}
	
			var html = '';

			if( F.defaults.focus ) html += '<div id="sharebox_shadow">&nbsp;</div>';

			html += '<div id="sharebox">';
			html += '<a href="javascript:;" id="sharebox_button">' + F.defaults.share_txt + '</a>';
			html += '<div id="sharebox_options">';
			if( F.defaults.twitter )  html += '<a href="#" id="sharebox_twitter">&nbsp;</a>';
			if( F.defaults.facebook ) html += '<a href="#" id="sharebox_facebook">&nbsp;</a>';
			if( F.defaults.google ) html += '<a href="#" id="sharebox_google">&nbsp;</a>';
			if( F.defaults.linkedin ) html += '<a href="#" id="sharebox_linkedin">&nbsp;</a>';
			html += '</div>';
			html += '</div>';
			$('body').append(html);

			$().ready(function(){

				$.each($('#sharebox_options a'), function (item, obj) {
					var op = $(obj).attr('id');
					op = op.replace('sharebox_','');
	
					$(obj).click(function(){
						F.share(op);
					});

				});
				
				$('#sharebox')
					.css('left', F.defaults.left )
					.css('right', F.defaults.right )
					.css('top', F.defaults.top )
					.css('bottom', F.defaults.bottom )
					.delay( F.defaults.delay )
					.fadeIn('fast');

				$('#sharebox_button')
					.click(function(){
						$('#sharebox_options').slideToggle('fast',function(){
							if( F.defaults.focus ) $('#sharebox_shadow').toggle();
						});
						return false;
					});

			});
		}


	});

}(window, document, jQuery));