// global objects
var request = null;
var reqTimeout;
var reg_element;
var req_stack = new Array();

// ajax request base class
ajax_request = function(url, params, element_id, callbackOK, callbackFAILED) 
{
	this.req = null;
    if (window.XMLHttpRequest) {
        try {
            this.req = new XMLHttpRequest();
        } catch (e){ }
    } else if (window.ActiveXObject) {
        try {
            this.req = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e){
            try {
                this.req = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e){ }
        }
    }

	this.params = params;
	this.url = url;
	this.element_id = element_id;
	this.callbackOK = callbackOK;
	this.callbackFAILED = callbackFAILED;	

	this.getURL=function() { return this.url; }
	this.getElementID=function() { return this.element_id; }
	this.getCallbackOK=function() { return this.callbackOK; }
	this.getCallbackFAILED=function() { return this.callbackFAILED; }

	this.send = function() 
	{
		this.req.onreadystatechange = processReqChange;
		if(this.params == null)
		{
			this.req.open("GET", this.url, true);
			this.req.send(null);
		}
		else
		{
			this.req.open("POST", this.url, true);
			this.req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			this.req.setRequestHeader("Content-length", this.params.length);
			this.req.setRequestHeader("Connection", "close"); 
			this.req.send(this.params);			
		}

		reqTimeout = setTimeout("req.abort();",20000);		
	}
};

// MAIN FUNCTIONS - GET REQUEST
function ajaxRequest(url, element_id, callbackOK, callbackFAILED) 
{		
	if(element_id)
		document.getElementById(element_id).innerHTML = "<center><img src='img/ajax-loader.gif'></center>";

	// if http request object is busy, postpone this request
    if(request)
	{
		req_stack.push(new ajax_request(url, null, element_id, callbackOK, callbackFAILED));
		return;
	}
		
    request = new ajax_request(url, null, element_id, callbackOK, callbackFAILED);
	request.send();

	return false;
}

// MAIN FUNCTIONS - POST REQUEST
function ajaxPostRequest(url, params, element_id, callbackOK, callbackFAILED) 
{		
	if(element_id)
		document.getElementById(element_id).innerHTML = "<center><img src='img/ajax-loader.gif'></center>";

	// if http request object is busy, postpone this request
    if(request)
	{
		req_stack.push(new ajax_request(url, params, element_id, callbackOK, callbackFAILED));
		return;
	}
		
    request = new ajax_request(url, params, element_id, callbackOK, callbackFAILED);
	request.send();

	return false;
}
 
function processReqChange() 
{
    if (request.req.readyState == 4) 
	{
        clearTimeout(reqTimeout);
        // only if "OK"
        if (request.req.status == 200) 
		{
			if(request.callbackOK && request.req.responseText=="OK")
			{				
				if(document.getElementById(request.element_id))
					document.getElementById(request.element_id).innerHTML = "";
				eval(request.callbackOK);
			}
			else if(request.callbackFAILED && request.req.responseText=="FAILED")
			{
				if(document.getElementById(request.element_id))
					document.getElementById(request.element_id).innerHTML = "";
				eval(request.callbackFAILED);				
			}
			else if(document.getElementById(request.element_id))
			{
				document.getElementById(request.element_id).innerHTML = request.req.responseText;			
				if(request.callbackOK)
					eval(request.callbackOK);
			}
			request = null;
			
			// check if we have postponed requests
			if(req_stack.length)
			{
				request = req_stack[0];
				req_stack.pop();
				request.send();
			}
		}
        else
			document.getElementById(request.element_id).innerHTML = "Failed to get data:\n" + request.req.statusText;
    }  
}
