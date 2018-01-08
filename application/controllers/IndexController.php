<?php

class IndexController extends Zend_Controller_Action
{
    var $authorization="Basic aGdvbnphbGV6Y2VsaXNAaG90bWFpbC5jb206ZTFlYzI3YjJiZDkxZjE0MDhiOWM";
    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        

    }

    public function getContactsAction()
    {
        
        $this->_helper->layout()->disableLayout();
        $this->_helper->viewRenderer->setNoRender(true);
        /*Mejora rest api, retornar el total de registros, utilizar la estructura 
         * https://docs.sencha.com/extjs/6.2.0/classic/Ext.toolbar.Paging.html
           * The packet sent back from the server would have this form:

           {
               "success": true,
               "results": 2000,
               "items": [ // ***Note:** this must be an Array
                   { "id":  1, "name": "Bill", "occupation": "Gardener" },
                   { "id":  2, "name":  "Ben", "occupation": "Horticulturalist" },
                   ...
                   { "id": 25, "name":  "Sue", "occupation": "Botanist" }
               ]
           }
         */
        echo '{"success": true,"results": 30,"items":';
        $uri = "https://app.alegra.com";
        $conf = array(  
            'adapter'   => 'Zend_Http_Client_Adapter_Curl',  
            'curloptions' => array(CURLOPT_SSL_VERIFYPEER => false),  
        ); 
        $client = new Zend_Rest_Client($uri,$conf);
        $client->getHttpClient()->setHeaders(
                array('Accept' => '*/*',
                      'authorization' => $this->authorization,
                      'accept-encoding' => 'gzip, deflate'
                )
        );

        $errors = array();
       

        try {
            $args=array(
                "start" => $this->getRequest()->getParam('start'),
                "limit" => $this->getRequest()->getParam('limit'),
                "name" => $this->getRequest()->getParam('name'),
                "identification" => $this->getRequest()->getParam('identification')
            );
            $result = $client->restGet("/api/v1/contacts/",$args);
        } 
        catch(Zend_Rest_Client_Exception $e) {
             $errors[] = '[' . $e->getCode() . ']:' . $e->getMessage();
        }
        catch (Exception $e) {
               $errors[] = '[' . $e->getCode() . ']:' . $e->getMessage();
        }
        if($errors) {
               print_r($this->errors);
        }
        else {
            echo $result->getBody();
            echo "}";
        }

    }
    
    public function setContactsAction()
    {
        $this->_helper->layout()->disableLayout();
        $this->_helper->viewRenderer->setNoRender(true);
        $json = file_get_contents('php://input');
        $data=$json;
        $dataArray=json_decode($json);
        
        $uri = "https://app.alegra.com";
        $conf = array(  
            'adapter'   => 'Zend_Http_Client_Adapter_Curl',  
            'curloptions' => array(CURLOPT_SSL_VERIFYPEER => false),  
        ); 
        $client = new Zend_Rest_Client($uri,$conf);
        $client->getHttpClient()->setHeaders(
                array('Accept' => '*/*',
                      'authorization' => $this->authorization,
                      'accept-encoding' => 'gzip, deflate'
                )
        );

        $errors = array();
       

        try {
            $result = $client->restPut("/api/v1/contacts/".$dataArray->id,$data);
        } 
        catch(Zend_Rest_Client_Exception $e) {
             $errors[] = '[' . $e->getCode() . ']:' . $e->getMessage();
        }
        catch (Exception $e) {
               $errors[] = '[' . $e->getCode() . ']:' . $e->getMessage();
        }
        if($errors) {
               print_r($this->errors);
        }
        else {
            echo $result->getBody();
        }

    }
    
     public function newContactsAction()
    {
        $this->_helper->layout()->disableLayout();
        $this->_helper->viewRenderer->setNoRender(true);
        $json = file_get_contents('php://input');
        $data=$json;
        $dataArray=json_decode($json);
        
        $uri = "https://app.alegra.com";
        $conf = array(  
            'adapter'   => 'Zend_Http_Client_Adapter_Curl',  
            'curloptions' => array(CURLOPT_SSL_VERIFYPEER => false),  
        ); 
        $client = new Zend_Rest_Client($uri,$conf);
        $client->getHttpClient()->setHeaders(
                array('Accept' => '*/*',
                      'authorization' => $this->authorization,
                      'accept-encoding' => 'gzip, deflate'
                )
        );

        $errors = array();
       

        try {
            $result = $client->restPost("/api/v1/contacts",$data);
        } 
        catch(Zend_Rest_Client_Exception $e) {
             $errors[] = '[' . $e->getCode() . ']:' . $e->getMessage();
        }
        catch (Exception $e) {
               $errors[] = '[' . $e->getCode() . ']:' . $e->getMessage();
        }
        if($errors) {
               print_r($this->errors);
        }
        else {
            echo $result->getBody();
        }

    }
}

