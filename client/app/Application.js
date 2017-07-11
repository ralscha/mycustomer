Ext.define('MyCustomer.Application', {
	extend: 'Ext.app.Application',
	requires: [ 'Ext.direct.*' ],
	name: 'MyCustomer',

	stores: [ 'CategoriesReport' ],

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

	constructor() {
		REMOTING_API.url = serverUrl + REMOTING_API.url;
		REMOTING_API.maxRetries = 0;
		Ext.direct.Manager.addProvider(REMOTING_API);

		this.callParent(arguments);
	},

	onAppUpdate() {
		window.location.reload();
	}
});
