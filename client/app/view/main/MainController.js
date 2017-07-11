Ext.define('MyCustomer.view.main.MainController', {
	extend: 'Ext.app.ViewController',
	requires: ['Ext.MessageBox'],
	
	onStoreLoad(s) {
		const total = s.getTotalCount();
		this.getViewModel().set('numberOfCustomers', s.getTotalCount());
		
		Ext.getStore('categories-report').load();

		// if there is only 1 item in the list, autoselect it
		if (total === 1) {
			this.getViewModel().set('currentCustomer', s.first());
		}
		else {
			this.getViewModel().set('currentCustomer', null);
		}
	},

	onItemClick(button, record) {
		// reject any pending changes of previous selected record
		if (this.selectedRecord && this.selectedRecord.dirty) {
			this.selectedRecord.reject();
		}
		this.selectedRecord = record;
	},

	onNameChange(field, newValue) {
		this.getViewModel().set('nameFilter', newValue);
	},

	newCustomer() {
		const newCustomer = new MyCustomer.model.Customer({
			gender: 'M'
		});
		this.getViewModel().set('currentCustomer', newCustomer);

		Ext.defer(() => {
			this.lookup('customeredit').focus();
			this.lookup('customeredit').isValid();
		}, 5);
	},

	deleteCustomer() {
		const currentCustomer = this.getViewModel().get('currentCustomer');
		Ext.Msg.confirm('Confirm', 'Are you sure you want to<br>delete customer <b>' + currentCustomer.get('lastName') + '</b>?', this.onConfirm, this);
	},

	onConfirm(choice) {
		if (choice === 'yes') {
			const currentCustomer = this.getViewModel().get('currentCustomer');
			currentCustomer.erase();
			this.getStore('customers').reload();
		}
	},

	onCustomerEditReset() {
		const cust = this.getViewModel().get('currentCustomer');
		cust.reject();
	},

	onCustomerEditSubmit() {
		const cust = this.getViewModel().get('currentCustomer');
		cust.save({
			success: () => this.getStore('customers').reload(),
			failure: (record, op) => {
				const validations = op.getResponse().result.validations;
				if (validations) {
					const form = this.lookup('customeredit').getForm();
					validations.forEach((validation) => {
						const field = form.findField(validation.field);
						field.markInvalid(validation.message);
					});
				}
			}
		});

	}

});
