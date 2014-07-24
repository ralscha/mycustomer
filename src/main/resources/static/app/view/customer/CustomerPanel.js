Ext.define('MyCustomer.view.customer.CustomerPanel', {
	extend: 'Ext.grid.Panel',

	reference: 'customerGrid',

	title: 'Customer',
	bind: {
		store: '{customers}'
	},

	listeners: {
		itemclick: 'onItemClick',
		scope: 'controller'
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
		dataIndex: 'sex',
		text: 'Gender',
		renderer: function(value) {
			if (value === 'M') {
				return 'male';
			}
			return 'female';
		}
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

	dockedItems: [ {
		xtype: 'toolbar',
		dock: 'top',
		items: [ {
			text: 'New',
			handler: 'newCustomer'
		}, {
			text: 'Delete',
			handler: 'deleteCustomer',
			bind: {
				disabled: '{!customerSelected}'
			}
		}, '-', {
			xtype: 'label',
			bind: {
				text: 'Number of Customers: {numberOfCustomers}'
			}
		}, '->', {
			fieldLabel: 'Category',
			xtype: 'combobox',
			labelWidth: 60,
			displayField: 'name',
			valueField: 'value',
			reference: 'categoryCb',
			bind: {
				store: '{categories}'
			},
			listeners: {
				change: 'onCategoryChange'
			}
		}, {
			fieldLabel: 'Name',
			labelWidth: 40,
			xtype: 'textfield',
			reference: 'nameTf',
			listeners: {
				change: {
					fn: 'onNameChange',
					buffer: 350
				}
			}
		} ]
	} ]

});