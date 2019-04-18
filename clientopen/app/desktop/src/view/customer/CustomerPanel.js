Ext.define('MyCustomer.view.customer.CustomerPanel', {
	extend: 'Ext.grid.Grid',
	requires: ['Ext.grid.plugin.PagingToolbar'],
	
	reference: 'customerGrid',

	title: 'Customers',
	bind: {
		store: '{customers}',
		selection: '{currentCustomer}'
	},

    plugins: [{
        type: 'pagingtoolbar'
    }],
	
	listeners: {
		itemclick: 'onItemClick'
	},
	
	columns: [ {
		dataIndex: 'firstName',
		text: 'First Name',
		flex: 1
	}, {
		dataIndex: 'lastName',
		text: 'Last Name',
		flex: 1
	}, {
		dataIndex: 'email',
		text: 'Email',
		flex: 1
	}, {
		dataIndex: 'gender',
		text: 'Gender',
		renderer: (value) => value === 'M' ? 'male' : 'female'
	}, {
		dataIndex: 'zipCode',
		text: 'ZIP'
	}, {
		dataIndex: 'city',
		text: 'City',
		flex: 1
	}, {
		dataIndex: 'category',
		text: 'Category'
	}, {
		dataIndex: 'newsletter',
		text: 'Newsletter',
		xtype: 'booleancolumn',
		trueText: 'Yes',
		falseText: ''
	} ],

	items: [ {
		xtype: 'toolbar',
		docked: 'top',
		items: [ {
			text: 'New',
			handler: 'newCustomer'
		}, {
			text: 'Delete',
			handler: 'deleteCustomer',
			bind: {
				disabled: '{!currentCustomer}'
			}
		}, '->', {
			xtype: 'component',
			bind: {
				html: 'Number of Customers: {numberOfCustomers}'
			}
		}, '->', {
			label: 'Category',
			xtype: 'combobox',
			reference: 'categoryFilterCB',
			publishes: 'value',
			labelAlign: 'top',
			displayField: 'name',
			valueField: 'value',
			editable: false,
			value: 'All',
			bind: {
				store: '{categories}'
			}
		}, {
			label: 'Name',
			labelAlign: 'top',
			xtype: 'textfield',
			listeners: {
				change: {
					fn: 'onNameChange',
					buffer: 500
				}
			},
			clearable: true
		} ]
	} ]

});