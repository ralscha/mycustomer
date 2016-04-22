Ext.define("MyCustomer.model.Customer",
{
  extend : "Ext.data.Model",
  requires : [ "Ext.data.identifier.Negative", "Ext.data.proxy.Direct", "Ext.data.validator.Email", "Ext.data.validator.Length", "Ext.data.validator.Presence" ],
  identifier : "negative",
  fields : [ {
    name : "lastName",
    type : "string",
    validators : [ {
      type : "length",
      min : 1,
      max : 255
    }, {
      type : "presence"
    } ]
  }, {
    name : "firstName",
    type : "string",
    validators : [ {
      type : "length",
      min : 1,
      max : 255
    }, {
      type : "presence"
    } ]
  }, {
    name : "gender",
    type : "string",
    allowNull : true,
    validators : [ {
      type : "presence"
    } ]
  }, {
    name : "email",
    type : "string",
    validators : [ {
      type : "email"
    }, {
      type : "length",
      min : 1,
      max : 200
    }, {
      type : "presence"
    } ]
  }, {
    name : "address",
    type : "string"
  }, {
    name : "city",
    type : "string"
  }, {
    name : "zipCode",
    type : "string"
  }, {
    name : "category",
    type : "string",
    allowNull : true,
    validators : [ {
      type : "presence"
    } ]
  }, {
    name : "newsletter",
    type : "boolean",
    validators : [ {
      type : "presence"
    } ]
  }, {
    name : "dob",
    type : "date",
    dateFormat : "Y-m-d"
  } ],
  proxy : {
    type : "direct",
    api : {
      read : "customerService.read",
      create : "customerService.create",
      update : "customerService.update",
      destroy : "customerService.destroy"
    },
    reader : {
      rootProperty : "records"
    },
    writer : {
      writeAllFields : true
    }
  }
});