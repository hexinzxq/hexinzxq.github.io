        // 尝试创建一个可以执行简单动画的函数
        /* 
        参数：
        obj:要执行动画的对象
        attr：要执行动画的样式.比如：left、top、height、width
        target：执行动画的目标位置
        speed:移动的速度
        callback:回调函数,这个函数在动画执行完毕后执行
        */
       function move(obj, attr,target, speed,callback) {
        // 开启定时器之前，关闭当前元素上之前的其它定时器
        clearInterval(obj.timer);
        // 获取元素目前的位置
        var current = parseInt(getStyle(obj, attr));

        // 判断速度的正负值
        // 如果0-800移动，speed为正
        // 若800-0，speed为负
        if (current > target) {
            // 此时速度应为负值
            speed = -speed;
        }



        // 开启一个定时器，来执行动画效果
        // 向执行对象的动画中添加一个timer属性，用来保存它自己定时器的标识
        obj.timer = setInterval(function () {
            // 获取box1原来的left值
            var oldValue = parseInt(getStyle(obj, attr));
            // alert(oldValue);

            // 在旧的值基础上增加
            var newValue = oldValue + speed;
            if (speed > 0 && newValue > target || speed < 0 && newValue < target) {
                newValue = target;
            }

            // 将新值设置给box1
            obj.style[attr] = newValue + "px";


            // 当元素移动到500px时停止
            if (newValue == target) {
                // newValue = 500;
                clearInterval(obj.timer);

                // 动画执行完毕，调用回调函数
                /* 相当于if callback{callback()},如果有回调函数，就去调用这个回调函数
                没有的话就不管。 */
                callback && callback();
            }

        }, 30);
    }
/*
 * 定义一个函数，用来获取指定元素的当前的样式
 * 参数：
 * 		obj 要获取样式的元素
 * 		name 要获取的样式名
 */
function getStyle(obj, name) {

	if(window.getComputedStyle) {
		//正常浏览器的方式，具有getComputedStyle()方法
		return getComputedStyle(obj, null)[name];
	} else {
		//IE8的方式，没有getComputedStyle()方法
		return obj.currentStyle[name];
	}

}


       // 定义一个函数，用于向一个元素中添加指定的class属性值
       /*  参数：
        1.obj：要添加class属性的元素
        2.cn:要添加的class值 */
        function addClass(obj,cn){
            if(!hasClass(obj,cn)){
                obj.className += " "+cn;
            }
        }
        /* 判断一个元素是否含有指定的class属性值 
        如果有返回true，没有返回false*/
        function hasClass(obj,cn){
            // 判断obj中有没有cn这个class属性值
            // 创建一个正则表达式
            var reg = new RegExp("\\b"+cn+"\\b");
            return reg.test(obj.className);
        }
        // 删除一个元素中指定的class属性
        function removeClass(obj,cn){
            // 创建一个正则表达式
            var reg = new RegExp("\\b"+cn+"\\b");
            // 删除class
            obj.className = obj.className.replace(reg , "");
        }
        // toggleClass可以用来切换一个类
        // 有则删除，没有这个类则增加
        function toggleClass(obj,cn){
            // 判断obj中是否含有cn
            if(hasClass(obj,cn)){
                // 有则删除
                removeClass(obj,cn);
            }else{
                // 没有就增加
                addClass(obj,cn);
            }
        }


         // 设计一个产生随机颜色的函数
         function color() {//十六进制颜色随机
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
            return color;
        }