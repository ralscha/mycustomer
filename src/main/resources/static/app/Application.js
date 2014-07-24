Ext.define('MyCustomer.Application', {
    extend: 'Ext.app.Application',
    requires: ['Ext.window.Toast'],
    name: 'MyCustomer',

	constructor: function() {
		Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
		this.callParent(arguments);
	},
    
    launch: function () {
		Ext.fly('appLoadingIndicator').destroy();
    }
});
