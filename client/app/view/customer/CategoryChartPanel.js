Ext.define('MyCustomer.view.customer.CategoryChartPanel', {
	extend: 'Ext.panel.Panel',
	requires: [ 'Ext.chart.series.Pie', 'Ext.chart.interactions.Rotate', 'Ext.chart.interactions.ItemHighlight', 'Ext.chart.theme.DefaultGradients' ],
	title: 'Categories',
	width: '100%',

	items: [ {
		xtype: 'polar',
		theme: 'default-gradients',
		height: 250,

		store: 'categories-report',

		insetPadding: 10,
		innerPadding: 10,

		interactions: [ 'rotate', 'itemhighlight' ],

		series: [ {
			type: 'pie',
			angleField: 'percent',
			label: {
				field: 'category',
				calloutLine: {
					length: 60,
					width: 3
				}
			},
			highlight: true,
			tooltip: {
				trackMouse: true,
				renderer: function(tooltip, record, series) {
					tooltip.setHtml(record.get('category') + ': ' + record.get('percent') + ' %');
				}
			}
		} ]

	} ]
});