/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('alegra.store.contacts', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],
    model: 'alegra.model.contacts',
    autoLoad: {start: 0, limit: 10, name:"", identification:""},
    groupField: 'tipo',
    pageSize: 10,
    proxy: {
            type: 'ajax',
            api: {
                read: 'index/get-contacts',
                update: 'index/set-contacts', 
                create: 'index/new-contacts'
            },
            reader: {
                type: 'json',
                getResponseData: function(response) {
                   var data, error;
                    try {
                        data = Ext.decode(response.responseText);
                        Ext.each(data.items,function(item){
                            //item.calculated_value=maxValue;
                            var tpCnt="";
                            if (item.type.indexOf("client")!==-1){
                                tpCnt="Cliente";
                            }else if (item.type.indexOf("provider")!==-1){
                                tpCnt="Proveedor";
                            }
                            if (item.type.indexOf("client")!==-1 && item.type.indexOf("provider")!==-1){
                                tpCnt="Cliente & Proveedor";
                            }
                            item.tipo=tpCnt;
                        });
                        return this.readRecords(data)
                    } catch (ex) {
                        error = new Ext.data.ResultSet({
                            total  : 0,
                            count  : 0,
                            records: [],
                            success: false,
                            message: ex.message
                        });

                        this.fireEvent('exception', this, response, error);
                        Ext.log('Unable to parse the JSON returned by the server');
                        return error;
                    }
                },
                successProperty: 'success',
                root: 'items',
                totalProperty: 'results',
               
            }
      },
      listeners: {
            beforechange: function (paging, params) {
                alert("hola mundo");
            }
       }
});