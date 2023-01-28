
$(function(){
    var maxDate = getFormat(18);
    var minDate = getFormat(55);
    refereshTable();
    $('#dobDate').attr('max', maxDate);
    $('#dobDate').attr('min', minDate);
    
// $("#dobDate").datepicker({
//     changeMonth: true,
//     changeYear: true,
//     minDate: minDate,
//     maxDate: maxDate
//   });
});
function getFormat(age){
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear() - age;
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    return year + '-' + month + '-' + day;
}
function register(event){
    event.preventDefault();
    var formEl = document.forms.registrationForm;
    var formData = new FormData(formEl);
    var name = formData.get('name');
    var email = formData.get('email');
    var password = formData.get('password');
    var dobDate = document.getElementById('dobDate').value;
    var terms = document.getElementById('terms').value === 'on'? 'true' : 'false' ;
    let detail = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        dobDate: document.getElementById('dobDate').value,
        terms: document.getElementById('terms').value === 'on'? 'true' : 'false' ,
    }
    let table = document.getElementById("myTable");
   
    let row = table.insertRow(-1);
 
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);

    c1.innerText = name;
    c2.innerText = email;
    c3.innerText = password;
    c4.innerText = dobDate;
    c5.innerText = terms;
    let userDetails = localStorage.getItem('userList');
    userDetails = userDetails ? JSON.parse(userDetails) : [];
    userDetails.push(detail);
    localStorage.setItem('userList', JSON.stringify(userDetails));
}

function refereshTable(){
let userDetails = localStorage.getItem('userList');
let tableItems = JSON.parse(userDetails);
let table = document.getElementById("myTable");
   
if(tableItems.length > 0){
for(t=0;t<tableItems.length;t++){
let row = table.insertRow(-1);
let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);
    c1.innerText = tableItems[t].name;
    c2.innerText = tableItems[t].email;
    c3.innerText = tableItems[t].password;
    c4.innerText = tableItems[t].dobDate;
    c5.innerText = tableItems[t].terms;
}
}
}
function checkValidation(pattern, event, errorMsg){
    let value = event.target.value;
let ele = document.getElementById(event.target.id)
if(value.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)){
ele.setCustomValidity('')
}
else
{
 ele.setCustomValidity(`Please include an '@' in the email address. "${value}" is missing an '@'`);
}
}
