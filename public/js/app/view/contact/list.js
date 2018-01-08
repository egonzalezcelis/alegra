/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('alegra.view.contact.list' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.cntlist',
    title : 'Contactos',
    
    initComponent: function() {
        this.store = 'contacts',

        this.columns =[
            {
                         id:'id',
                         header: 'id', 
                         //width: 60, 
                         sortable: true,
                         hidden: true,
                         dataIndex: 'id',
                         flex: 1
            },
            {
                         text: 'Tipo',
                         //width: 150,
                         sortable: true,
                         hidden: true,
                         dataIndex: 'tipo',
                         flex: 1
            },
            {
                         text: 'Nombre',
                         //width: 150,
                         sortable: true,
                         hideable: false,
                         dataIndex: 'name',
                         flex: 1
                 },
                 {
                         text: 'Identificación',
                         //width: 90,
                         dataIndex: 'identification',
                         hidden: false,
                         sorteable: true,
                         flex: 1
                 },
                 {
                         text: 'Telefono 1',
                         //width: 140,
                         dataIndex: 'phonePrimary',
                         hidden: false,
                         sorteable: true,
                         flex: 1
                 },
                 {
                         text: 'Observaciones',
                         //width: 90,
                         dataIndex: 'observations',
                         hidden: false,
                         sorteable: true,
                         flex: 1
                 },
                 {
                         text: "Acciones",
                         //width: 130//,
                         //renderer: renderBtn
                         flex: 1
                 }
         ];
           
        
        this.callParent(arguments);
        //var gridHead = this.getView().getHeaderPanel();
        //gridHead.show();
        //var tb = new Ext.Toolbar(gridHead); 
        
    },
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'contacts',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true,
        beforePageText : "P&#225;gina",
        afterPageText  : "de {0}",
        firstText      : "Primera p&#225;gina",
        prevText       : "P&#225;gina anterior",
        nextText       : "P&#225;gina siguiente",
        lastText       : "Última p&#225;gina",
        refreshText    : "Actualizar",
        displayMsg     : "Mostrando {0} - {1} de {2}",
        emptyMsg       : "Sin datos para mostrar"
    },
    {
        xtype: 'toolbar',
        dock: 'top',
        items:[{
	    text: 'Filtrar por ',
	    tooltip: 'Seleccione la columna a filtrar.',
	    icon: 'find.png',
	    cls: 'x-btn-text-icon btn-search-icon',
            menu: {
                    id: 'filterMenu',
                    items: [
                        new Ext.menu.CheckItem({ 
                        text: 'Nombre', 
                        checked: true, 
                        group: 'filter',
                        id: 'name',
                        checkHandler: function(item, checked){
                            if(checked) {
                                Ext.get('filterlabel').update('['+item.text+']');    
                            }
                        } 
                        }),
                        new Ext.menu.CheckItem({ 
                        text: 'Identificación', 
                        checked: false, 
                        group: 'filter',
                        id: 'identification',
                        checkHandler: function(item, checked){
                            if(checked) {
                                Ext.get('filterlabel').update('['+item.text+']');    
                            }
                        } 
                        })      
                   ]
                
            }
        },
        {
            xtype: 'tbtext',
            id: 'filterlabel',
            style:'text-align:center;width:100px;',
            text: "[Nombre]"
        },
        {
            xtype: 'textfield',
            itemId: 'sfilter',
            id: 'sfilter',
            label: '',
            value: ''
        },
        {
            xtype: 'button',
            itemId: 'sfilterbtn',
            id: 'sfilterbtn',
            text: 'Filtrar',
            listeners:
            {
                    click: function(){  
                       Ext.app.Application.instance.getController("contacts").loadStore();
                    }
            }
        }]
        
    }],
    features: [{ftype:'grouping'}],
   
});
