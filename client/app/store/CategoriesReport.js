Ext.define('MyCustomer.store.CategoriesReport', {
	extend: 'Ext.data.Store',
	storeId: 'categories-report',
	fields: [ 'category', 'percent' ],

	pageSize: 0,
	autoLoad: true,
	proxy: {
		type: 'direct',
		directFn: 'customerService.readCategoryData'
	}
});
