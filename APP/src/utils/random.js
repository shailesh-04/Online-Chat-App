export function random(min,max){
	max++;
	var randomNum = (Math.random()*(max-min))+min;
	randomNum = Math.floor(randomNum); 	
	return randomNum;
}

export default random;