

function validEmail(email)
{
	return (/^[\w\.\-@]+$/).test(email);
}

function fieldClick(obj)
{
	if(obj.className!='')
	{
		obj.value='';
		obj.className='';
	}
}

function fieldBlur(obj, value)
{
	if(obj.value=='')
	{
		obj.value = value;
		obj.className='hint';
	}
}

function validEmail(email)
{
	return (/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test(email);
}

function parseXml(str) 
{
	if (window.ActiveXObject) 
	{
		var doc = new ActiveXObject('Microsoft.XMLDOM');
        doc.loadXML(str);
        return doc;
	} 
	else if (window.DOMParser) 
	{
		return (new DOMParser).parseFromString(str, 'text/xml');
	}
}

	function submitSearchForm()
	{
		if (document.getElementById('id_carsearch').value.length < 2 || document.getElementById('id_carsearch').value == 'Например: lanos или mazda 6 2007') { alert('Введите как минимум 2 буквы из названия марки или модели авто. Например: aveo, bmw, audi a4, suzuki swift и т.д.'); return false; }
		
		document.getElementById('id_search_form').submit();
		return false;
	}
	
function loadCarModels()
{
	p_brand = document.getElementById('id_brand');
	if(!p_brand)
		return;
	var brand_id = p_brand.value;

	ajaxRequest("data.php?type=models&brand_id="+brand_id, "models_container");
}


function loadFB()
{
	ajaxRequest("data.php?load=fb", "fb");
}

function goLiqpay()
{
alert('Бабах');
	order = document.getElementById('o_id');
	if(!order) { alert('Заказ');
		return; }
	var ord = order.value;
	
	sum = document.getElementById('a_id');
	if(!sum) { alert('Сумма');
		return; }
	var amount = sum.value;

	ajaxRequest("data.php?type=liqpay&ord="+ord+"&amount="+amount, "liqpay");
}

function loadCarYears()
{	
	p_model = document.getElementById('id_model');
	if(!p_model)
		return;
	var model_id = p_model.value;

	ajaxRequest("data.php?type=years&model_id="+model_id, "years_container");
}

function submitCarForm()
{
	p = document.getElementById('id_brand');
	if(p && p.value=='')
	{
		alert('Укажите марку');
		return false;
	}
	p = document.getElementById('id_model');
	if(p && p.value=='')
	{
		alert('Укажите модель');
		return false;
	}
	p = document.getElementById('id_year');
	if(p && p.value=='')
	{
		alert('Укажите год выпуска авто');
		return false;
	}
	p = document.getElementById('id_car_form');
	if(p)  p.submit();
	return false; 
}

function submitWiperForm()
{
	p = document.getElementById('id_length1');
	if(p && p.value=='')
	{
		alert('Укажите длину первого дворника');
		return false;
	}
	p = document.getElementById('id_wiper_form');
	if(p) p.submit();
	return false;
}

function submitCallbackForm(code)
{
	var elements = Array('id_name', 'id_phone', 'id_email');
	for(i=0;i<elements.length;i++)
	{	
		p = document.getElementById(elements[i]);
		if(p && p.className)
		{
			alert('Заполните "'+p.value+'"');
			return false;
		}
	}
	document.getElementById('id_show_code').value = code;
	document.getElementById("id_callbackform").submit();
	return false;
}

function submitCodeForm()
{
	p = document.getElementById('id_code');
	if(p && p.value=='')
	{
		alert('Укажите код дворника');
		return false;
	}
	p = document.getElementById('id_code_form');
	if(p) p.submit();
	return false;
}
