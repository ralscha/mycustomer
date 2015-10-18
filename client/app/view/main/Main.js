Ext.define('MyCustomer.view.main.Main', {
	extend: 'Ext.container.Container',

	controller: {
		xclass: 'MyCustomer.view.main.MainController'
	},

	viewModel: {
		xclass: 'MyCustomer.view.main.MainModel'
	},

	layout: {
		type: 'border'
	},

	items: [ {
		region: 'center',
		xclass: 'MyCustomer.view.customer.CustomerPanel'
	}, {
		region: 'east',
		split: true,
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
