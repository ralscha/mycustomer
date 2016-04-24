Ext.define('MyCustomer.view.main.MainController', {
	extend: 'Ext.app.ViewController',

	onStoreLoad: function(s) {
		var total = s.getTotalCount();
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

	onItemClick: function(button, record) {
		// reject any pending changes of previous selected record
		if (this.selectedRecord && this.selectedRecord.dirty) {
			this.selectedRecord.reject();
		}
		this.selectedRecord = record;
	},

	onNameChange: function(field, newValue) {
		this.getViewModel().set('nameFilter', newValue);
	},

	newCustomer: function() {
		var newCustomer = new MyCustomer.model.Customer();
		this.getViewModel().set('currentCustomer', newCustomer);

		Ext.defer(function() {
			this.lookup('customeredit').focus();
			this.lookup('customeredit').isValid();
		}, 5, this);
	},

	deleteCustomer: function() {
		var currentCustomer = this.getViewModel().get('currentCustomer');
		Ext.Msg.confirm('Confirm', 'Are you sure you want to<br>delete customer <b>' + currentCustomer.get('lastName') + '</b>?', 'onConfirm', this);
	},

	onConfirm: function(choice) {
		if (choice === 'yes') {
			var currentCustomer = this.getViewModel().get('currentCustomer');
			currentCustomer.erase();
			this.getStore('customers').reload();
		}
	},

	onCustomerEditReset: function() {
		var cust = this.getViewModel().get('currentCustomer');
		cust.reject();
	},

	onCustomerEditSubmit: function() {
		var cust = this.getViewModel().get('currentCustomer');
		cust.save({
			success: function() {
				this.getStore('customers').reload();
			},
			failure: function(record, op) {
				var validations = op.getResponse().result.validations;
				if (validations) {
					var form = this.lookup('customeredit').getForm();
					validations.forEach(function(validation) {
						var field = form.findField(validation.field);
						field.markInvalid(validation.message);
					});
				}
			},
			scope: this
		});

	}

});
