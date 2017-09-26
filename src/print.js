//export default {
//	printMe() {
		/*var str = 'no I get called from print.js!'
		console.log(str);
		var element = document.createElement("h2");
    	element.innerHTML = str;
    	return element;*/
//    	console.log("123445?")
//    	var element = document.createElement("h1");
//    	element.innerHTML = "不要加扩展名 坑比 world!";
//    	return element;
//	} 
//}

console.log("The print.js module has loaded! See the network tab in dev tools...");

export default() => {
    console.log("Button Clicked: Here\'s 'some text'!");
}