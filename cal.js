

//querySelector - возвращает первый элемент в документе (объект Element), соответствующий указанному селектору, или группе селекторов.

var date=new Date();
var ShowedYear=date.getFullYear();
var ShowedMonth=date.getMonth();
var cal=document.querySelector('#cal');
var currentMoment={
  year:ShowedYear, 
  month: ShowedMonth, 
  date: date.getDate()
}


DrawCal(ShowedYear,ShowedMonth,currentMoment,cal);  

var prev=cal.querySelector('.prev');
var next=cal.querySelector('.next');
 prev.addEventListener('click',function(){
  ShowedYear=getPrewYear(ShowedYear,ShowedMonth);
  ShowedMonth=getPrewMonth(ShowedMonth);
  DrawCal(ShowedYear,ShowedMonth,currentMoment,cal);  
 }
 );

 next.addEventListener('click',function(){

  ShowedYear=getNextYear(ShowedYear,ShowedMonth);
  ShowedMonth=getNextMonth(ShowedMonth);
  DrawCal(ShowedYear,ShowedMonth,currentMoment,cal);  
 }
 );

function DrawCal(ShowedYear, ShowedMonth,currentMoment,cal) // отрисовка месяца
{
  var dates=cal.querySelector('.dates');
  var info=cal.querySelector('.info');

  draw(ShowedYear, ShowedMonth,dates); 
  showInfo(ShowedYear, ShowedMonth,info);
  showCurrentDate(ShowedYear, ShowedMonth, currentMoment,dates);
} 
  function getPrewYear(year,month)//предыдущий год
  {
if(month==0){
  return year-1;
}
else{return year;}
} 

function getPrewMonth(month)//предыдущий месяц
{
  if(month==0){
    return 11;
  }
  else{return month-1;}
}
function getNextYear(year,month){
  {
    if(month==11){
      return year+1;
    }
    else{return year;}
    } 
}
function getNextMonth(month){
  if(month==11){
    return 0;
  }
  else{return month+1;}

}



function showCurrentDate(ShowedYear, ShowedMonth, currentMoment,dates)//определение текущего дня
{


  if(ShowedYear==currentMoment['year']&ShowedMonth==currentMoment['month'])
{
  var cells= dates.querySelectorAll('td');
  console.log(cells);
  for(var i=0;i<=cells.length;i++)
  {
    if(cells[i].innerHTML==currentMoment['date'])
    {
      cells[i].classList.add('active');
      break;
    }
  }
  currentMoment['date']
}
}
function showInfo(year,month,elem)//инфа о месяце и годе сверху
{ elem.innerHTML=getMonthName(month)+' '+year;

}

function getMonthName(num)//номер месяца в слово
{ var months=['Январь','Февраль','Март','Апрель','Май','Июнь',
'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
return months[num];

}


function draw(year,month,dates) //функция отрисовки дат
{
  
  var arr=[];
  var FirstDateOfMonth=1;
  var LastDateOfMonth=getLastDay(year,month);
  //console.log(LastDateOfMonth);

  var doElemsNum = getdoElems(year,month);
  
  var posleElemsNum= getposleElems(year,month);
  //console.log(posleElems);


  
  arr=createArr(FirstDateOfMonth,LastDateOfMonth); 
  //console.log(arr);
arr=doElems(doElemsNum,'*', arr);
//console.log(arr);
arr=posleElems(posleElemsNum,'*', arr);
arr= nedelyaArr(7,arr);
console.log(arr);
createtable(arr,dates);
  

}
function createtable(arr,parent)//создает двумерный массив цифр в календаре
{
  parent.innerHTML=''; 
  for (var i=0;i<arr.length;i++){
  var tr = document.createElement('tr');
  for (var j=0;j< arr[i].length;j++){
  var td = document.createElement('td');
  td.innerHTML=arr[i][j];
  tr.appendChild(td);
  

}
parent.appendChild(tr);
}

}
function createArr(from,to)//создает двумерный массив в пределе заданых чисел
{ var arr=[];
  for(var i=from; i<=to; i++){
    arr.push(i);
  }
return arr;
}
function doElems(num,elem, arr)//пробелы до {
{ 
  var a=[];
  for (var i=0;i<num;i++){
a.push(elem);
  }
var arr2=[].concat(a,arr);
return arr2;
}
function posleElems(num,elem, arr)//пробелы после{
{ var a=[];
  for (var i=0;i<num;i++){
a.push(elem);
  }
var arr2=[].concat(arr,a);
return arr2;
}
function getLastDay(year,month)// последнее число месяца
{if(month==1){
if (visYear(year)){return 29;}
  else {return 28}
}else{ 
  var days =[31,undefined,31,30,31,30,31,31,30,31,30,31];
return days[month]; 
}
}
function visYear(year)//високосный год
{if (((year % 4 == 0) & (year%100!=0)) || year%400==0)
  {return true;}
    else {return false;}
}
function NumDayWeek(jsnum)// номер дня недели от 1 до 7
{if(jsnum==0){
  return 7
} else {return jsnum }
}
function getFirstDayNum(year,month)//номер первого дня месяца
{  var date = new Date(year,month,1)
  return date.getDay();
}
function getLastDayNum(year,month)//номер последнего дня месяца
{  var date = new Date(year,month+1,0)
  return date.getDay();

}
function getdoElems(year,month)// количество пробелов до
{
  var jsFirstDay= getFirstDayNum(year,month);
  var FirstDay= NumDayWeek(jsFirstDay);
  return FirstDay-1;
}
function getposleElems(year,month)// количество пробелов после
{var jsLastDay= getLastDayNum(year,month);
  var LastDay= NumDayWeek(jsLastDay);
  return 7- LastDay;

}
function nedelyaArr(num,arr)//разбиваем месяц на недели num=7
{ var a=[];
  var it=arr.length/num;
  var ch=[];

for(var i=0;i<it; i++){
  ch=arr.splice(0,num);
  a.push(ch);
}
  return a;

}