require.config({
	paths: {
		'twitter': 'https://platform.twitter.com/widgets'
	}
});

define ([
	'knockout', 
	'jquery', 
	'text!./template.html', 
	'text!../appinfo.json',
	'twitter'
], function (ko, $, template, appinfo, twitter) {

	return {
		createComponent: function(args, cb) { return cb(new Component(args)); }
	};

	function Component(args){
		this.render = function(container){ 
			new View(args, $(template).appendTo(container)[0]); 
		};
	}

	function View(args, content){
		this.screen_name = ko.observable();

		var Sites = args.SitesSDK;
		
		Sites.getProperty('customSettingsData', function(data){
			update.call(this, { value:data });
			ko.applyBindings(this, content);
		}.bind(this));

		Sites.subscribe(Sites.MESSAGE_TYPES.SETTINGS_UPDATED, update.bind(this));
	}

	function update(settings){
		this.screen_name(settings.value.params.screen_name);
	}

	function debug(data){ console.warn(data) }
});