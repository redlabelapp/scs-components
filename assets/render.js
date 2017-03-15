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
		this.render = function(container){ 
			ko.applyBindings(new View(args), $(template).appendTo(container)[0]); 
		};
	}

	function View(args, content){
		this.screen_name = ko.observable();

		var Sites = args.SitesSDK;
		Sites.subscribe(Sites.MESSAGE_TYPES.SETTINGS_UPDATED, update.bind(this));
		
		Sites.getProperty('customSettingsData', update.bind(this));

	}

	function update(settings){
		this.screen_name((settings.value || settings).params.screen_name);
		
	}

	function debug(data){ console.warn(data) }
});