Ext.define('MyCustomer.Application', {
	extend: 'Ext.app.Application',
	requires: [ 'MyCustomer.*', 'Ext.plugin.Viewport', 'Ext.direct.RemotingProvider', 'Ext.window.Toast' ],
	name: 'MyCustomer',

	stores: [ 'CategoriesReport' ],

	constructor: function() {

		// <debug>
		Ext.Ajax.on('beforerequest', function(conn, options, eOpts) {
			options.withCredentials = true;
		}, this);
		// </debug>

		REMOTING_API.url = serverUrl + REMOTING_API.url;
		Ext.direct.Manager.addProvider(REMOTING_API);

		this.callParent(arguments);
	},

	launch: function() {
		Ext.fly('loading_container').destroy();
	},

	onAppUpdate: function() {
		window.location.reload();
	}
});
