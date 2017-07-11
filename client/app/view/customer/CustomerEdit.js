Ext.define('MyCustomer.view.customer.CustomerEdit', {
	extend: 'Ext.form.Panel',
	bodyPadding: 5,
	width: '100%',
	reference: 'customeredit',
	defaultFocus: 'textfield[name=firstName]',

	title: 'Edit',
	bind: {
		disabled: '{!currentCustomer}',
		title: 'Edit: {currentCustomer.firstName} {currentCustomer.lastName}'
	},

	defaultType: 'textfield',
	defaults: {
		labelAlign: 'left',
		anchor: '100%'
	},

	modelValidation: true,

	items: [ {
		label: 'First Name',
		name: 'firstName',
		bind: '{currentCustomer.firstName}'
	}, {
		label: 'Last Name',
		name: 'lastName',
		bind: '{currentCustomer.lastName}'
	}, {
		label: 'E-Mail',
		name: 'email',
		bind: '{currentCustomer.email}'
	}, {
		label: 'Address',
		name: 'address',
		bind: '{currentCustomer.address}'
	}, {
		label: 'City',
		name: 'city',
		bind: '{currentCustomer.city}'
	}, {
		label: 'Zip Code',
		name: 'zipCode',
		bind: '{currentCustomer.zipCode}',
		anchor: '50%'
	}, {
		label: 'Category',
		xtype: 'combobox',
		name: 'category',
		displayField: 'name',
		valueField: 'value',
		queryMode: 'local',
		forceSelection: true,
		editable: false,
		bind: {
			store: '{editCategories}',
			value: '{currentCustomer.category}'
		},
		anchor: '50%'
	}, {
        xtype: 'fieldset',
        title: 'Gender',
        defaults: {
            xtype: 'radiofield',
            labelWidth: '35%',
            name: 'gender'
        },
        items: [{
            value: 'M',
            label: 'Male',
        	viewModel: {
    			formulas: {
    				checked: {
    					bind: '{currentCustomer.gender}',
    					get: (value) => value === 'M',    				
    					set: function(value) {
    						this.set('currentCustomer.gender', value ? 'M' : 'F');
    					}
    				}
    			}
    		},
    		bind: {
    			checked: '{checked}'
    		}
        }, {
        	value: 'F',
        	label: 'Female',
        	viewModel: {
    			formulas: {
    				checked: {
    					bind: '{currentCustomer.gender}',
    					get: (value) => value === 'F',    				
    					set: function(value) {
    						this.set('currentCustomer.gender', value ? 'F' : 'M');
    					}
    				}
    			}
    		},
    		bind: {
    			checked: '{checked}'
    		}
        }]
    }, {
		label: 'Newsletter',
		xtype: 'checkboxfield',
		bind: '{currentCustomer.newsletter}',
		name: 'newsletter',
		inputValue: 'true',
		uncheckedValue: 'false'
	}, {
		label: 'Date of Birth',
		name: 'dob',
		bind: '{currentCustomer.dob}',
		xtype: 'datefield',
		maxValue: new Date(),
		dateFormat: 'Y-m-d',
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