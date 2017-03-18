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
		this.tweets = ko.observableArray();

		ko.applyBindings(this, this.content = $(template).appendTo(container)[0]);

		// bit.ly/Sites-SDK
		var Sites = args.SitesSDK;
		Sites.subscribe(Sites.MESSAGE_TYPES.SETTINGS_UPDATED, update(this));

		Sites.getProperty('customSettingsData', update(this));
	}

	function update(view){
		/* callback for getProperty or SETTINGS_UPDATED */
		return function(settings){
			view.screen_name((settings.value || settings).params.screen_name);
			proxyLoad(view);
		};
	}

	function proxyLoad(view){
		var config = JSON.parse(appinfo).initialData.customSettingsData,
			url = config.proxyUrl + config.basePath + config.apiPath;

		ko.computed(function(){
			$.getJSON(url, config.params, view.tweets);
		}, view);
	}
});