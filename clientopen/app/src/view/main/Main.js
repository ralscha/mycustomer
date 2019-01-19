Ext.define('MyCustomer.view.main.Main', {
	extend: 'Ext.container.Container',

	controller: {
		xclass: 'MyCustomer.view.main.MainController'
	},

	viewModel: {
		xclass: 'MyCustomer.view.main.MainModel'
	},

	layout: {
		type: 'hbox'
	},

	items: [ {
		xclass: 'MyCustomer.view.customer.CustomerPanel',
		flex: 1
	}, {
		xtype: 'panel',
		width: 500,
		layout: {
			type: 'vbox'
		},
		items: [ {
			xclass: 'MyCustomer.view.customer.CustomerEdit',
			flex: 2
		}, {
			xclass: 'MyCustomer.view.customer.CategoryChartPanel',
			flex: 1
		} ]
	} ]
});
