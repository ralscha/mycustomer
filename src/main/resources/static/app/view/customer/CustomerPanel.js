Ext.define('MyCustomer.view.customer.CustomerPanel', {
	extend: 'Ext.grid.Panel',

	reference: 'customerGrid',

	title: 'Customers',
	bind: {
		store: '{customers}',
		selection: '{selectedCustomer}'
	},

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
				disabled: '{!selectedCustomer}'
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
			editable: false,
			value: 'All',
			bind: {
				store: '{categories}',
				selection: '{selectedCategory}'
			},
			listeners: {
				change: 'onCategoryChange'
			}
		}, {
			fieldLabel: 'Name',
			labelWidth: 40,
			xtype: 'textfield',
			bind: '{nameFilter}',
			listeners: {
				change: {
					fn: 'onNameChange',
					buffer: 350
				}
			},
			triggers: {
				clear: {
					cls: 'x-form-clear-trigger',
					handler: function(tf) {
						tf.setValue('');
					}
				}
			}
		} ]
	}, {
		xtype: 'pagingtoolbar',
		dock: 'bottom',
		reference: 'pagingtoolbar',
		bind: {
			store: '{customers}'
		}
	} ]

});