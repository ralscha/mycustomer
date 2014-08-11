Ext.define('MyCustomer.view.main.MainController', {
	extend: 'Ext.app.ViewController',

	onStoreDataChanged: function(s) {
		this.getViewModel().set('numberOfCustomers', s.getCount());
		this.getStore('categories').load();
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
		this.lookupReference('customeredit').loadRecord(record);
	},

	deleteCustomer: function() {
		Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
	},

	onConfirm: function(choice) {
		if (choice === 'yes') {
			var sm = this.lookupReference('customerGrid').getSelectionModel();
			var customer = sm.getSelection();
			this.getStore('customers').remove(customer);
		}
	},

	onCustomerEditReset: function() {
		var form = this.lookupReference('customeredit').getForm();
		form.loadRecord(form.getRecord());
	},

	onCustomerEditSubmit: function() {
		var form = this.lookupReference('customeredit').getForm();
		var customerStore = this.getStore('customers');
		var customerGrid = this.lookupReference('customerGrid');

		if (form.isValid()) {
			form.updateRecord();
			var record = form.getRecord();
			if (record.phantom) {
				record.setId(null);
				record.save({
					callback: function(r) {
						customerStore.load({
							callback: function() {
								customerGrid.setSelection(r);
								customerGrid.getView().focusRow(r);
							}
						});
					}
				});

			}
			Ext.toast({
			     html: 'Data successfully saved',
			     title: 'Info',
			     align: 't'
			 });
		}
	},

	newCustomer: function() {
		var newCustomer = Ext.create('MyCustomer.model.Customer', {
			lastName: 'New',
			firstName: 'Person',
			email: 'new@email.com',
			sex: 'M',
			category: 'C'
		});
		var form = this.lookupReference('customeredit').getForm();
		form.loadRecord(newCustomer);
	}

});
