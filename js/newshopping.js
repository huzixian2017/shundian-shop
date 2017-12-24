window.onload = function() {
	$('.swiper-container .swiper-wrapper').css("width",function(index,value) {
		return parseInt(value) * $('.swiper-slide').length + "px";
	})
	$('.swiper-pagination').css("left",function(index,value){
		var sty = parseInt(getStyle($('.swiper-pagination')[0], "width"));
		return $('.swiper-container').width()/2 - sty/2 + "px";
	})
}

var box = document.getElementsByClassName('swiper-wrapper')[0];
var index = 1;
var moveTimer;
var wrapWidth = parseInt($('.swiper-container .swiper-wrapper').css("width"));
function next() {
	index++;
	if(index == 5) {
		index = 2;
		box.style.left = "-"+wrapWidth+"px";
	}
	moveWidthIndex();
}
function pre() {
	index--;
	if(index == -1) {
		index = 2;
		box.style.left = "-"+wrapWidth*$('.swiper-slide').length-2+"px";
	}
	moveWidthIndex();
}
function moveWidthIndex() {
	var l = index * -wrapWidth - box.offsetLeft;
	var count=0;
	clearInterval(moveTimer);
	moveTimer = setInterval(function() {
		count++;
		box.style.left = box.offsetLeft + l/10 + 'px';
		if(count >= 10) {
			clearInterval(moveTimer);
			box.style.left = index * -wrapWidth + 'px';
		}
		
	},20)
}
setInterval(function() {
	next();
	slideMove();
},2000)
var lastSpan;
var last;
var l;
function slideMove() {
	last = index -1;
	if(last == $('.swiper-slide').length) {
		last = 0;
	}
	$('.swiper-pagination span').each(function(index22,obj) {
		$($('.swiper-pagination span')[index22]).css('background-color','lightgray');
	})		
	$($('.swiper-pagination span')[last]).css('background-color','red');
}
$('.swiper-pagination span').each(function(index11,obj) {
	$(obj).click(function() {
		$('.swiper-pagination span').each(function(index22,obj) {
			$($('.swiper-pagination span')[index22]).css('background-color','lightgray');
		})
		$(obj).css('background-color','red');
		index = index11 + 1;
		moveWidthIndex();
	})
})
var myUl = "";
var myli = `<li>
				<a href="###">
					<div class="ns_products_content_mask"></div>
					<div class="ns_products_content_details">
						<img src="ns_img/mata.jpg" alt="">
						<h3>【预订】华为（HUAWEI）Mate10 Pro 6GB+128GB 全网通 移动联通电信4G手机BLA-AL00</h3>
						<p>￥5999.00</p>
					</div>
				</a>
			</li>`;
for(var i = 0; i < 27; i++){
	myUl += myli;
}
$(myUl).appendTo(".ns_products_content");


$("#page").paging({
	pageNo:1,
	totalPage: 9,
	totalSize: 300,
	callback: function(num) {
		// alert(num)
	}
})
