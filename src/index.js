/*import _ from 'lodash';
// lodash：内部封装了诸多对字符串、数组、对象等常见数据类型的处理函数，
//其中部分是目前 ECMAScript 尚未制定的规范，但同时被业界所认可的辅助函数      
//http://www.jianshu.com/p/7436e40ac5d1		

import printMe from './print';									//不要加扩张名！！！！！！不然热替换就不会生效了！！！坑死我了！！！！
import Library from "./library";
import './index.css';

import {cube} from './maths'			//只调用其中的cube方法

function component(){
	var element = document.createElement("div");
	var btn  = document.createElement("button");

	element.innerHTML = _.join(["Hello", "webpack"], '');

	btn.innerHTML = 'Click me and check the console!';
	btn.onclick = printMe.printMe;

	element.appendChild(btn);

	return element;
}

document.body.appendChild(component());
console.log(cube(5))


//HMR接口
if(module.hot){
	module.hot.accept("./print", function(){
		console.log("zzzppppprint.js has changed")
		document.body.appendChild(printMe.printMe())
	})
	module.hot.accept("./library", function(){
		console.log("bbbbb~Accepting the updated library module!");
		document.body.appendChild(Library.log());
	})
	
}*/


//动态导入demo
//function getComponent(){
//	return import(/* webpackChunkName: "lodashsh" */  'lodash').then(_ => {		//！！运用es6的import，进行webpack的动态导入
		//Note the use of webpackChunkName in the comment. 
		//This will cause our separate bundle to be named lodash.bundle.js instead of just [id].bundle.js
		//神奇了。。。import中的注释，真的会成为文件名字
//		var element = document.createElement("div");
//
//		element.innerHTML = _.join(["hello", "webpack"], " ");
//
//		return element;
//	}).catch(error => 'An error occurred while loading the component');
//}

//getComponent().then(component => {
//	document.body.appendChild(component);
//})

/*
	If you've enabled async functions via a pre-processor like babel, 
	note that you can simplify the code as import() statements just return promises:
	如果你通过预处理器（比如babel），允许使用异步函数
	记住，你可以使用import（）简化代码，使函数只返回一个 promise 用于调用就可以了
*/

//async function getComponent(){													//注意这里使用了async，然后后面的用法表明返回了promise，mark住
//	var element = document.createElement("div");
//	const _ = await import(/* webpackChunkName: "lodash2" */ 'lodash');			//注意大小写
//
//	element.innerHTML = _.join(["hello", "webpack2.0"], " ");
//
//	return element;
//}

//getComponent().then(component => {
//	document.body.appendChild(component);
//})


//lazy loading
import _ from 'lodash';

function component(){
	var element = document.createElement("div");
	var button = document.createElement("button");
	var br = document.createElement("br");

	button.innerHTML = "Click me and look at the console!";
	element.innerHTML = _.join(["hello", "lazy", "loading"], " ");
	element.appendChild(br);
	element.appendChild(button);

	 // Note that because a network request is involved, some indication
	 // of loading would need to be shown in a production-level site/app.
	 button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
	 	//Note that when using import() on ES6 modules you must reference the .default property as it's the actual module object that will be returned when the promise is resolved.
	 	var print = module.default;

	 	print();
	 })
	 return element;
}

document.body.appendChild(component());
//这个demo可以注意到，在f12的source中发现，是没有print.bundle.js加载的，当点击button之后才会加入，即实现了懒加载