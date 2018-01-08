/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('alegra.controller.contacts', {
    extend: 'Ext.app.Controller',
    views: [
        'contact.list',
        'contact.edit',
        'contact.new'
    ],
    stores: [
        'contacts'
    ],
    models: [
        'contacts'
    ],
    init: function() {
         this.control({
            'cntlist': {
                itemdblclick: this.editCnt
            },
            'contactedit button[action=save]': {
                click: this.updateCnt
            },
            'contactnew button[action=save]': {
                click: this.newCntSave
            }
        });
    },
    editCnt: function(grid, record) {
        //console.log('Double clicked on ' + record.get('id'));
        //alert(record.get('id'));
         var view = Ext.widget('contactedit');
         view.down('form').loadRecord(record);
    },
    
    updateCnt: function(button) {
        console.log('clicked the Save button');
        var win    = button.up('window'),
        form   = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();
        record.set(values);
        win.close();
        var parent=this;
        this.getContactsStore().sync({
                    callback: function (records, operation) {
                        parent.loadStore();
                    }});
    },    
    newCntSave: function(button) {
        console.log('clicked the New button');
        var win    = button.up('window'),
        form   = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();
        record.set(values);
        win.close();
        var parent=this;
        this.getContactsStore().insert(0, record);
        this.getContactsStore().sync({
                    callback: function (records, operation) {
                      parent.loadStore();
                    }});
        
    },
    newCnt: function() {
       var view = Ext.widget('contactnew');
       var iRecord = Ext.create('alegra.model.contacts');
       view.down('form').loadRecord(iRecord);
    },
    loadStore:function(){
        /*var tstore=this.getContactsStore();
        tstore.load({
        params:{
            start:0,    
            limit: 10
        }});*/
    
        var lfield=document.getElementById('filterlabel').innerHTML;
        var lvalue= document.getElementById('sfilter-inputEl').value;
        var fname="";
        var fidentification="";
        if (lvalue!=="" && lfield.indexOf("Nombre")!==-1){
            fname=lvalue;
        }else {
            fidentification=lvalue;
        }
        
        this.getContactsStore().load({
        params:{
            start:0,    
            limit: 10,
            name:fname,
            identification:fidentification
        }});
    }
});