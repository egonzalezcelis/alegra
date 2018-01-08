/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('alegra.model.contacts', {
    extend: 'Ext.data.Model',
    fields:[{name: 'id', type: 'integer'}, 'name', 'identification', 'phonePrimary', 'observations','type','tipo']
});

