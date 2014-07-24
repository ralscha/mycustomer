Ext.define('MyCustomer.view.customer.CategoryChartPanel', {
	extend: 'Ext.panel.Panel',
	title: 'Categories',
	width: '100%',

	items: [ {
		xtype: 'polar',

		height: 250,
		bind: {
			store: '{categoriesReport}'
		},

		insetPadding: 10,
		innerPadding: 10,

		interactions: [ 'rotate', 'itemhighlight' ],

		series: [ {
			type: 'pie',
			angleField: 'percent',
			label: {
				field: 'category'
			},
			highlight: true,
			tooltip: {
				trackMouse: true,
				renderer: function(storeItem, item) {
					this.setHtml(storeItem.get('category') + ': '
							+ storeItem.get('percent') + ' %');
				}
			}
		} ]

	} ]
});