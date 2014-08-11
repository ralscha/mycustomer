Ext.define('MyCustomer.view.main.MainModel', {
	extend: 'Ext.app.ViewModel',
	requires: [ 'MyCustomer.model.Customer' ],

	data: {
		selectedCustomer: false
	},

	stores: {
		customers: {
			xclass: 'Ext.data.BufferedStore',
			model: 'MyCustomer.model.Customer',
			pageSize: 100,
			autoLoad: true,
			remoteSort: true,
			remoteFilter: true,
			autoSync: true,
			sorters: [ {
				property: 'lastName',
				direction: 'ASC'
			} ],
			listeners: {
				datachanged: 'onStoreDataChanged'
			}
		},
		categories: {
			fields: [ 'value', 'name' ],
			data: [ {
				value: 'All',
				name: 'All'
			}, {
				value: 'A',
				name: 'A'
			}, {
				value: 'B',
				name: 'B'
			}, {
				value: 'C',
				name: 'C'
			} ]
		},
		categoriesReport: {
			fields: [ 'category', 'percent' ],
			pageSize: 0,
			autoLoad: true,
			proxy: {
				type: 'direct',
				directFn: 'customerService.readCategoryData'
			}
		}
	}
});