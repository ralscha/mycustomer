Ext.define('MyCustomer.view.main.MainModel', {
	extend: 'Ext.app.ViewModel',

	data: {
		currentCustomer: null,
		nameFilter: null
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
			},
			filters: [ {
				property: 'category',
				value: '{categoryFilterCB.value}'
			}, {
				property: 'name',
				value: '{nameFilter}'
			} ]
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
	},

	formulas: {
		status: {
			bind: {
				bindTo: '{currentCustomer}',
				deep: true
			},
			get: function(customer) {
				var ret = {
					dirty: customer ? customer.dirty : false,
					valid: customer && customer.isModel ? customer.isValid() : false
				};
				ret.dirtyAndValid = ret.dirty && ret.valid;
				return ret;
			}
		}
	}
});
