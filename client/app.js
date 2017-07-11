/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'MyCustomer.Application',

    name: 'MyCustomer',

    requires: [
        // This will automatically load all classes in the MyCustomer namespace
        // so that application classes do not need to require each other.
        'MyCustomer.*'
    ],

    // The name of the initial view to create.
    mainView: 'MyCustomer.view.main.Main'
});
