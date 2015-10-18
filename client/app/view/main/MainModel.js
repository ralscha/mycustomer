Ext.define('MyCustomer.view.main.MainModel', {
	extend: 'Ext.app.ViewModel',

	data: {
		selectedCustomer: null,
		editCustomer: false
	},

	stores: {
		customers: {
			model: 'MyCustomer.model.Customer',
			pageSize: 100,
			autoLoad: true,
			remoteSort: true,
			remoteFilter: true,
			autoSync: false,
			sorters: [ {
				property: 'lastName',
				direction: 'ASC'
			} ],
			listeners: {
				load: 'onStoreLoad'
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
		editCategories: {
			source: '{categories}',
			filters: [ {
				property: 'value',
				value: 'All',
				operator: '!='
			} ]
		}
	}
});
