Ext.define('MyCustomer.overrides.FieldBase', {
	override: 'Ext.form.field.Base',
	publishValue: function() {
		var me = this;
		if (me.rendered) {
			switch (me.bindOn) {
			case 'valid':
				if (!me.getErrors().length) {
					me.publishState('value', me.publishRaw ? me.getRawValue() : me.getValue());
				}
				break;
			case 'invalid':
				if (me.getErrors().length) {
					me.publishState('value', me.publishRaw ? me.getRawValue() : me.getValue());
				}
				break;
			default:
				me.publishState('value', me.publishRaw ? me.getRawValue() : me.getValue());
			}
		}
	}
});