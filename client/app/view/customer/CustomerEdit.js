Ext.define('MyCustomer.view.customer.CustomerEdit', {
	extend: 'Ext.form.Panel',
	bodyPadding: 5,
	width: '100%',
	reference: 'customeredit',
	defaultFocus: 'textfield[name=firstName]',

	bind: {
		disabled: '{!currentCustomer}',
		title: 'Edit: {currentCustomer.firstName} {currentCustomer.lastName}'
	},

	defaultType: 'textfield',
	defaults: {
		msgTarget: 'side',
		anchor: '100%'
	},

	modelValidation: true,

	items: [ {
		fieldLabel: 'First Name',
		name: 'firstName',
		bind: '{currentCustomer.firstName}'
	}, {
		fieldLabel: 'Last Name',
		name: 'lastName',
		bind: '{currentCustomer.lastName}'
	}, {
		fieldLabel: 'E-Mail',
		name: 'email',
		bind: '{currentCustomer.email}'
	}, {
		fieldLabel: 'Address',
		name: 'address',
		bind: '{currentCustomer.address}'
	}, {
		fieldLabel: 'City',
		name: 'city',
		bind: '{currentCustomer.city}'
	}, {
		fieldLabel: 'Zip Code',
		name: 'zipCode',
		bind: '{currentCustomer.zipCode}',
		anchor: '50%'
	}, {
		fieldLabel: 'Category',
		xtype: 'combobox',
		name: 'category',
		displayField: 'name',
		valueField: 'value',
		queryMode: 'local',
		bind: {
			store: '{editCategories}',
			value: '{currentCustomer.category}'
		},
		anchor: '50%'
	}, {
		xtype: 'radiogroup',
		fieldLabel: 'Gender',
		allowBlank: false,
		viewModel: {
			formulas: {
				radioValue: {
					bind: '{currentCustomer.gender}',
					get: function(value) {
						return {
							gender: value
						};
					},
					set: function(value) {
						this.set('currentCustomer.gender', value.gender);
					}
				}
			}
		},
		bind: {
			value: '{radioValue}'
		},
		defaults: {
			name: 'gender'
		},
		items: [ {
			boxLabel: 'Male',
			inputValue: 'M'
		}, {
			boxLabel: 'Female',
			inputValue: 'F'
		} ]
	}, {
		fieldLabel: 'Newsletter',
		xtype: 'checkboxfield',
		bind: '{currentCustomer.newsletter}',
		name: 'newsletter',
		inputValue: 'true',
		uncheckedValue: 'false'
	}, {
		fieldLabel: 'Date of Birth',
		name: 'dob',
		bind: '{currentCustomer.dob}',
		xtype: 'datefield',
		maxValue: new Date(),
		format: 'Y-m-d',
		anchor: '50%'
	} ],

	// Reset and Submit buttons
	buttons: [ {
		text: 'Reset',
		iconCls: 'x-fa fa-ban',
		handler: 'onCustomerEditReset',
		disabled: true,
		bind: {
			disabled: '{!status.dirty}'
		}
	}, {
		text: 'Save',
		iconCls: 'x-fa fa-floppy-o',
		disabled: true,
		bind: {
			disabled: '{!status.dirtyAndValid}'
		},
		handler: 'onCustomerEditSubmit'
	} ]
});