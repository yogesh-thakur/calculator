let display = document.getElementById("inputbox");
let buttons = document.querySelectorAll("button");
let buttonArray = Array.from(buttons);
let string = "";
let prevNumb = "";
let currentNumb = "";

function appendValue(value) {
  const lastChar = display.value.slice(-1);
  const numArr = display.value.split(/[+\-*/]/);
  currentNumb = numArr[numArr.length - 1];
  prevNumb = numArr[numArr.length - 2];
  if(prevNumb=="")
  {
    prevNumb = numArr[numArr.length - 3];
  }
  if(display.value == "Error" || display.value == "Infinity")
  {
    string = value;
    display.value = string;
    return;
  }
  else if (
    ["+", "-", "*", "/", "%"].includes(lastChar) &&
    lastChar == value &&
    ["+", "-", "*", "/", "%"].includes(value)
  ) {
    return;
  }
   else if (
    ["+", "-", "*", "/"].includes(lastChar) &&
    lastChar != value &&
    ["+", "-", "*", "/"].includes(value)
  ) {
    if (value == "-" && (lastChar == "*" || lastChar == "/")) {
      string += value;
      display.value += value;
      return;
    } else if (["+", "-", "*", "/"].includes(string[string.length - 2]))
      return;

    string = string.slice(0, -1).concat(value);
    display.value = string;
    return;
  }
  else if (value == ".") {
    if (currentNumb.includes(".")) {
      return;
    } else currentNumb.includes(".");
    {
      string += value;
      display.value += value;
      hasDecimal = true;
      return;
    }
  }
  else if (value == "%") {
    if(currentNumb == "" && prevNumb)
    {
      string=""
      display.value= "Error"
      return;
    }
    else if (prevNumb) {
      let operator
      let stringLength 
      let isNegative=false;
      if(["+", "-", "*", "/", "%"].includes(string[string.length - currentNumb.length - 1]) && ["+", "-", "*", "/", "%"].includes(string[string.length - currentNumb.length - 2]))
      {
        operator = string[string.length - currentNumb.length - 2];
        stringLength = string.length - currentNumb.length - 2;
        isNegative= true
      }
      else{
        operator = string[string.length - currentNumb.length - 1];
        stringLength = string.length - currentNumb.length - 1;
      }
      let value;
      let initialValue = eval(string.slice(0, stringLength));
      if (operator == "+" || operator == "-") {
        value = eval(
          Number(initialValue) + operator + (initialValue * currentNumb) / 100
        );
      } else value = eval(Number(initialValue) + operator + currentNumb / 100);

      isNegative ? string = -eval(value).toFixed(2) : string = eval(value).toFixed(2)
      display.value = string;
      return;
    }
    else {
     string = (string / 100).toFixed(2); 
      display.value = string;
      return;
    }
  }

  string += value;
  display.value += value;
}

buttonArray.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.innerHTML == "DE") {
      string = string.slice(0, string.length - 1);
      display.value = string;
    } else if (e.target.innerHTML == "AC") {
      string = "";
      display.value = string;
    } else if (e.target.innerHTML == "=") {
      if (string == "") {
        return;
      } else {
        try{
         string = eval(string).toFixed(2).toString()
         display.value = string;
         return;
        }
       catch
       {
        string = "Error"
        display.value = string;
        return;
       }
        
      }
    } else {
      appendValue(e.target.innerHTML);
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (["1","2","3","4","5","6","7","8","9","0","+","-","*","/",".","%"].includes(e.key)) {
    appendValue(e.key);
  } else if (e.key == "Backspace") {
    string = string.slice(0, string.length - 1);
    display.value = string;
  } else if (e.key == "Delete") {
    string = "";
    display.value = string;
  } else if (e.key == "Enter") {
    if (string == "") {
      return;
    } else {
      string =  eval(string).toFixed(2).toString()
      display.value = string;
    }
  }
});
