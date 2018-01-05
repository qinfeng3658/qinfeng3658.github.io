//登录或注册函数
//参数
//json json对像 是要发送给服务器
//cb 函数   回调函数，收到数据之后主动通知这个函数
function loginOrRegis(json, cb){
	//创建请求对象
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			//取出服务器返回的数据
			var str = xhr.responseText;
			//将数据字符串转换成JSON对象
			var obj = JSON.parse(str)
			//cb 是函数
			//这里 将获取到的数据传递给调用zhe
			cb(obj)
		}
	}
	xhr.open('POST', 'http://csit.top/api_user.php', true)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	var obj = json
	var str = getParams(obj)
	xhr.send(str)
}

//getParams 函数功能： 将JSON对象转换成查询字符串
//参数要求：JSON对象，里面只能存在一层健值对
//返回值：查询字符串
function getParams(obj){
	var str = ""
	//快速遍历，可以遍历对象中的所有属性
	for(var k in obj){
		//拼接属性名
		str += k
		//在中间拼接 = 号
		str += "="
		//拼接属性值
		str += obj[k]
		//后面拼接 & 号
		str += "&"
	}
	//删掉最后一个
	str = str.substring(0, str.length-1)
	//输出循环拼接之后的值
	return str
}



function ajax(obj){
	var xhr = new XMLHttpRequest();
		
	xhr.onreadystatechange = function() {
			
		
		if (xhr.readyState == 4 && xhr.status == 200) {
			// 获取到值
			var str = xhr.responseText;
			
		
			// 字符串转换成 JS的对象
			var o = JSON.parse(str)
			
			// 将获取回来的数据传递给回调函数
			obj.cb(o)
		}
		
	}
	
	xhr.open(obj.method, obj.url, true)
	if(obj.method == "GET"){
		xhr.send()
	} else {
		// POST
		// 设置请求头
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
		// obj.json JSON数据对象
		// getParams 自己定义的函数，用于将JSON对象转换成查询字符串
		var str = getParams(obj.json)
		
		// 发送数据到后台服务器
		xhr.send(str)
	}
}
