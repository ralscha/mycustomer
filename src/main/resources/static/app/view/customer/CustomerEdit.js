Ext.define('MyCustomer.view.customer.CustomerEdit', {
	extend: 'Ext.form.Panel',
	title: 'Edit',
	bodyPadding: 5,
	width: '100%',
	reference: 'customeredit',

	defaultType: 'textfield',
	defaults: {
		msgTarget: 'side'
	},

	items: [ {
		fieldLabel: 'First Name',
		name: 'firstName',
		allowBlank: false,
		anchor: '100%'
	}, {
		fieldLabel: 'Last Name',
		name: 'lastName',
		allowBlank: false,
		anchor: '100%'
	}, {
		fieldLabel: 'E-Mail',
		name: 'email',
		vtype: 'email',
		anchor: '100%'
	}, {
		fieldLabel: 'Address',
		name: 'address',
		allowBlank: true,
		anchor: '100%'
	}, {
		fieldLabel: 'City',
		name: 'city',
		allowBlank: true,
		anchor: '100%'
	}, {
		fieldLabel: 'Zip Code',
		name: 'zipCode',
		allowBlank: true,
		anchor: '50%'
	}, {
		fieldLabel: 'Category',
		xtype: 'combobox',
		name: 'category',
		displayField: 'name',
		valueField: 'value',
		bind: {
			store: '{categories}'
		},
		anchor: '50%'
	}, {
		xtype: 'fieldcontainer',
		fieldLabel: 'Sex',
		defaultType: 'radiofield',
		defaults: {
			flex: 1
		},
		layout: 'hbox',
		items: [ {
			boxLabel: 'Male',
			name: 'sex',
			inputValue: 'M'
		}, {
			boxLabel: 'Female',
			name: 'sex',
			inputValue: 'F'
		} ]

	}, {
		fieldLabel: 'Newsletter',
		xtype: 'checkboxfield',
		name: 'newsletter',
		inputValue: 'true'
	}, {
		fieldLabel: 'Date of Birth',
		name: 'dob',
		xtype: 'datefield',
		maxValue: new Date(),
		format: 'd.m.Y',
		anchor: '50%'
	} ],

	// Reset and Submit buttons
	buttons: [ {
		text: 'Reset',
		handler: 'onCustomerEditReset'
	}, {
		text: 'Save',
		formBind: true,
		disabled: true,
		handler: 'onCustomerEditSubmit'
	} ]
});