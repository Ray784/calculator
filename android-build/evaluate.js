function precedence(operator){
	switch(operator){
		case "×":
		case "÷":
			return 2;
		case "+":
		case "-":
			return 1;
		default:
			return -1;
	}
}

function compute(op1, op2, op){
	switch(op){
		case "×":
			return op1 * op2;
		case "÷":
			return op1 / op2;
		case "+":
			return op1 + op2;
		case "-":
			return op1 - op2;
	}
}

function isNum(str){
	return !isNaN(str);
}

function infixToPrefix(expn){
	let stack = [];
	stack.push("#");
	let pfx = [];
	let l = expn.length;
	for(let i = 0; i < l; i++){
		if(isNum(expn[i]))
			pfx.push(expn[i]);
		else{
			while(stack[stack.length - 1] != "#" && precedence(expn[i]) <= precedence(stack[stack.length - 1]))
				pfx.push(stack.pop());
			stack.push(expn[i]);
		}
	}
	while(stack[stack.length - 1] != "#")
		pfx.push(stack.pop());
	return pfx;
}

function postfixEvaluation(expn){
	let stack = [];
	stack.push("#");
	l = expn.length;
	for(let i = 0; i < l; i++){
		if(isNum(expn[i]))
			stack.push(parseFloat(expn[i]))
		else{
			let val2 = stack.pop();
			let val1 = stack.pop();
			stack.push(compute(val1, val2, expn[i]));
		}
	}
	return stack.pop();
}

function prepareForEval(expn){
	let arr = [];
	let temp = "";
	let flag = 1;
	let l = expn.length;
	for(let i = 0; i < l; i++){
		if((expn[i]>='0' && expn[i]<='9') || (expn[i] == '.') || (expn[i] == '-' && flag == 1)){
			temp += expn[i];
			flag = 0;
		}
		else{
			arr.push(temp);
			temp = "";
			arr.push(expn[i]);
			flag = 1;
		}
	}
	if(temp != "")
		arr.push(temp);
	return arr;
}

function evaluate(expn){
	let arr = prepareForEval(expn);
	arr = infixToPrefix(arr);
	return postfixEvaluation(arr); 
} 
