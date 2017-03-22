define ([
	'knockout', 
	'jquery',
	'text!./template.html', 
	'text!../appinfo.json'
], function (ko, $, template, appinfo) {

	return {
		createComponent: function(args, cb) { return cb(new Component(args)); }
	};

	function Component(args){
		this.render = function(container){ new View(args, container); };
	}

	function View(args, container){
		this.screen_name = ko.observable();

		ko.applyBindings(this, $(template).appendTo(container)[0]);

		// bit.ly/Sites-SDK
		with (args.SitesSDK){
			subscribe(MESSAGE_TYPES.SETTINGS_UPDATED, update(this));
			getProperty('customSettingsData', update(this));	
		}
	}

	function update(view){
		/* callback for getProperty or SETTINGS_UPDATED */
		return function(settings){
			view.screen_name((settings.value || settings).params.screen_name);
			load();
		};
	}

	function load(){
		var url = 'https://platform.twitter.com/widgets.js';
		if (!document.querySelector('[src="'+url+'"]')){
			var s = document.createElement('script');
			s.src = url;
			document.head.appendChild(s);	
		}
	}
});