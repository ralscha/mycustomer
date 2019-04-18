Ext.define('MyCustomer.Application', {
	extend: 'Ext.app.Application',
	requires: [ 'MyCustomer.*', 'Ext.direct.*' ],
	name: 'MyCustomer',

	stores: [ 'CategoriesReport' ],

	constructor() {
		REMOTING_API.url = serverUrl + REMOTING_API.url;
		REMOTING_API.maxRetries = 0;
		Ext.direct.Manager.addProvider(REMOTING_API);

		this.callParent(arguments);
	},

	removeSplash: function () {
		Ext.getBody().removeCls('launching')
		var elem = document.getElementById("splash")
		elem.parentNode.removeChild(elem)
	},

	launch: function () {
		this.removeSplash()
		Ext.Viewport.add([{xclass: 'MyCustomer.view.main.Main'}])
	},

	onAppUpdate() {
		window.location.reload();
	}
});
