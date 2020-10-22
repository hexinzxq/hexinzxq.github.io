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