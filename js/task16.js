/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityInput = document.getElementById('aqi-city-input').value.trim();
	var valueInput = document.getElementById('aqi-value-input').value.trim();

	if(cityInput!=""&&valueInput!=""){
		aqiData[cityInput] = valueInput;
	}
	
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var aqiTable = document.getElementById('aqi-table');
	var children = aqiTable.children;
	var len = children.length - 1;
	for(var i=len;i>=0;i--){
		children[i].parentNode.removeChild(children[i]);
	}

	for(var city in aqiData){
		var tr = document.createElement('tr');
		tr.innerHTML = "<td>" + city + "</td>" + "<td>" + aqiData[city] + "</td>" + "<button>删除</button>";
		aqiTable.appendChild(tr);	
	}
	
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  var city = event.target.parentNode.getElementsByTagName('td')[0].innerHTML;
  delete aqiData[city];
  renderAqiList();
}
//检测aqi-city-input输入是否合法
function checkCityName(){
	var city = document.getElementById('aqi-city-input').value;
	var pattern = /\d+/g;
	if(pattern.test(city)){
		alert('请输入中英文城市名字');
	}
}
function checkValue(){
	var value = document.getElementById('aqi-value-input').value;
	var pattern = /\D+/g;
	if(pattern.test(value)){
		alert('请输入数字');
	}
}
function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn').onclick = function(event){
  	addBtnHandle();
  }

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById('aqi-table').onclick = function(event){
  	delBtnHandle(event);
  }
  
  //输入框失去焦点时验证输入
  document.getElementById('aqi-city-input').onblur = function(){
  	checkCityName();
  }
  document.getElementById('aqi-value-input').onblur = function(){
  	checkValue();
  }
}

init();
