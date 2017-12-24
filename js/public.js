/***************************
*****element：代表绑定事件的元素
*****type： 要绑定的事件名（不含on）
*****fn： 要绑定事件的函数
***************************/ 
// 绑定事件的兼容性写法
function addEvent(element, type, fn) {
	if(element.addEventListener) {
		element.addEventListener(type,fn,true);
	}
	// IE
	else if(element.attachElement) {
		element.attachElement('on' + type,fn);
	}
	// 最原始写法
	else {
		element['on' + type] = fn;
	}
}
// 解除事件的兼容写法
function removeEvent(element, type, fn) {
	if(element.addEventListener) {
		element.removeEventListener(type, fn, false);
	}
	else if(element.attachElement) {
		element.detachEvent('on' + type,fn);
	}
	else {
		element['on'+type] = null;
	}
}


/***************************
*****取消冒泡
*****ev  要取消冒泡的事件对象
***************************/ 
function stopBubble(ev) {
	if(ev && ev.stopPropagation) {
		ev.stopPropagation();
	}
	else {
		e.cancelBubble = true;
	}
}

/***************************
*****非IE下获取计算后样式 getComputedStyle(redDiv,':before').color;
*****element 要获取样式的元素
*****key 要获取的样式
*****null => ':before'  伪类名称
*****IE下获取样式 redDiv.currentStyle.color;
***************************/ 
function getStyle(element, key) {
	if(element.currentStyle) {
		return element.currentStyle[key];
	}else {
		return getComputedStyle(element,null)[key];
	}
}







// 设置scrollTop  兼容性写法
setTimeout(function() {
	if(document.documentElement.scrollTop) {
		document.documentElement.scrollTop = 60;
	}else {
		document.body.scrollTop = 60;
	}
	
},1000)


// 滚轮绑定事件兼容
// el ： 滚轮事件绑定对象
// fn ： 绑定事件对应的函数
function addMousewheel(el,fn) {
	if(navigator.userAgent.indexOf("Firefox") != -1) {
		// 火狐
		el.addEventListener('DOMMouseScroll',fn,false);
	}else {
		// 谷歌
		el.onmousewheel = fn;
	}
}
// 回到顶部
// objclass:点击的class名
function backUp(objclass) {
			var goBtn = document.getElementsByClassName(objclass)[0];
			var timer = null;
			//scroll事件 当用户滚动带滚动条的元素中的内容时,在该元素上面触发
			// function topFn() {
			// 	var top = document.body.scrollTop||document.documentElement.scrollTop;
			// 	top > 0 ? goBtn.style.display="block" : goBtn.style.display="none";
			// }
			function goFn() {
				var nowTop = document.body.scrollTop||document.documentElement.scrollTop; 
				//获取点击事件发生时滚动的距离
				
				var t = 0;
				var b = nowTop; //初始值，滚动条返回顶部前的初始位置
				var c = 0 - nowTop; //目标值(返回顶部是0)减当前值等于变化量
				var d = 20;

				timer = setInterval(function (){
					t++;
					if (t >= d){
						clearInterval(timer);
						timer = null;
					}
					if (document.documentElement.scrollTop){
						document.documentElement.scrollTop = Tween.Quad.easeOut(t,b,c,d);
					}else{
						document.body.scrollTop = Tween.Quad.easeOut(t,b,c,d);
					}
				},30);
			}

			//事件绑定
			function bind() {
				//通过滚动事件，判断”返回顶部按钮“显示隐藏
				// window.onscroll = function () {
				// 	topFn();
				// }
				//返回顶部按钮事件
				goBtn.onclick = function () {
					goFn();
					$(".nav").css({
			"position" : "static",
			"z-index" : "10"
		});
					$('.nav_list_ul').css("display","block");
		$('.nav table').css("display","none");
				}
			}
			bind();
		}






