define(['knockout', 'jquery', 'text!./template-html.txt', 'text!../appinfo.json'], function(ko, $, template, appinfo){
	return {
		createComponent: function(args, cb) { return cb(new Component(args)); }
	};

	function Component(args){
		this.render = function(container){
			ko.applyBindings(new View(args), $(template).appendTo(container)[0]); }
	}

	function View(args){
		/* I. data + template example using third party API bridge:

		var host = 'https://phiveleven.com//api.twitter.com/1.1/',
			api = 'statuses/user_timeline.json?screen_name=',
			url = host + api + 'redlabelapp';
		return $.getJSON(url); */


		/* II. Minimal setup for event propagation and config:

		var Sites = args.SitesSDK;

		Sites.subscribe(Sites.MESSAGE_TYPES.SETTINGS_UPDATED, debug);
		Sites.publish(Sites.MESSAGE_TYPES.SETTINGS_UPDATED, appinfo);
		
// 		console.dir(JSON.parse(appinfo));
		Sites.getProperty('customSettingsData', debug); */
	}

	function debug(){ console.debug(arguments) }
});