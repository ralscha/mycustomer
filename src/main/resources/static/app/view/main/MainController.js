Ext.define('MyCustomer.view.main.MainController', {
	extend: 'Ext.app.ViewController',

	onStoreLoad: function(s) {
		this.getViewModel().set('numberOfCustomers', s.getTotalCount());
		this.getStore('categoriesReport').load();
	},

	onCategoryChange: function(cb, value) {
		this.applyFilters();
	},

	onNameChange: function(field, newValue) {
		this.applyFilters();
	},

	applyFilters: function() {
		var viewModel = this.getViewModel();
		var myStore = this.getStore('customers');
		var nameFilter = viewModel.get('nameFilter');
		var categoryFilter = viewModel.get('selectedCategory');

		this.lookupReference('customeredit').reset();
		this.getViewModel().set('editCustomer', false);

		var filters = [];

		if (nameFilter) {
			filters.push(new Ext.util.Filter({
				property: 'name',
				value: nameFilter
			}));
		}
		if (categoryFilter) {
			filters.push(new Ext.util.Filter({
				property: 'category',
				value: categoryFilter.data.value
			}));
		}

		if (filters.length > 0) {
			myStore.clearFilter(true);
			myStore.filter(filters);
		}
		else {
			myStore.clearFilter();
		}
	},

	onItemClick: function(button, record) {
		var selectedCustomer = this.getViewModel().get('selectedCustomer');
		this.getViewModel().set('editCustomer', true);
		this.lookupReference('customeredit').loadRecord(selectedCustomer);
	},

	newCustomer: function() {
		var newCustomer = new MyCustomer.model.Customer();
		this.getViewModel().set('editCustomer', true);
		this.lookupReference('customeredit').loadRecord(newCustomer);
	},

	deleteCustomer: function() {
		Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
	},

	onConfirm: function(choice) {
		if (choice === 'yes') {
			var selectedCustomer = this.getViewModel().get('selectedCustomer');
			selectedCustomer.erase();
			this.lookupReference('customeredit').reset();
			this.getViewModel().set('editCustomer', false);
			this.getStore('customers').reload();
		}
	},

	onCustomerEditReset: function() {
		var customerEdit = this.lookupReference('customeredit');
		customerEdit.loadRecord(customerEdit.getRecord());
	},

	onCustomerEditSubmit: function() {
		var form = this.lookupReference('customeredit').getForm();
		var customerStore = this.getStore('customers');
		var customerGrid = this.lookupReference('customerGrid');

		if (form.isValid()) {
			var record = form.getRecord().copy();
			form.updateRecord(record);

			record.save({
				callback: function(r, op) {
					var validations = op.getResponse().result.validations;
					if (validations) {
						Ext.toast({
							html: 'Input contains errors',
							title: 'Error',
							align: 't',
							shadow: true,
							width: 200,
							slideInDuration: 200,
							hideDuration: 500,
							autoCloseDelay: 2000,
							bodyStyle: {
								background: 'red',
								textAlign: 'center',
								fontWeight: 'bold'
							}
						});
						validations.forEach(function(validation) {
							var field = form.findField(validation.field);
							field.markInvalid(validation.message);
							console.log(validation);
						});
					}
					else {
						this.getStore('customers').reload();
						Ext.toast({
							html: 'Data successfully saved',
							title: 'Info',
							align: 't',
							shadow: true,
							width: 200,
							slideInDuration: 200,
							hideDuration: 500,
							autoCloseDelay: 2000,
							bodyStyle: {
								background: 'lime',
								textAlign: 'center',
								fontWeight: 'bold'
							}
						});
						form.loadRecord(r);
					}
				},
				scope: this
			});

		}
	}

});
