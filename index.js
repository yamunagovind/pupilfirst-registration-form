
var maxDate = getFormat(18);
var minDate = getFormat(55);
$(function(){
    refereshTable();
    $('#dobDate').attr('max', maxDate);
    $('#dobDate').attr('min', minDate);
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
async function register(event){
    event.preventDefault();
    var formEl = document.forms.registrationForm;
    var formData = new FormData(formEl);
    var name = formData.get('name');
    var email = undefined;
    if(formData.get('email').match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)){
        email = formData.get('email');
    }else {
        checkValidation('email');
    }
    var password = formData.get('password');
    var dobDate = document.getElementById('dobDate').value;
    var terms = document.getElementById('terms').value === 'on'? 'true' : 'false' ;
    let detail = {
        name: name,
        email: email,
        password: password,
        dobDate: dobDate,
        terms: terms,
    }
    let isValid = await validate(detail);

    if(isValid){
        let userDetails = localStorage.getItem('userList');
        userDetails = userDetails ? JSON.parse(userDetails) : [];
        userDetails.push(detail);
        localStorage.setItem('userList', JSON.stringify(userDetails));
        refereshTable();
        formEl.reset();
    }
}

function refereshTable(){
    let userDetails = localStorage.getItem('userList');
    let tableItems = JSON.parse(userDetails);
    let table = document.getElementById("myTable");
    table.innerHTML = '';
    if(tableItems && tableItems.length > 0){
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
function checkValidation(id){
    let ele = document.getElementById(id);
    let value = ele.value;
    if(!value.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)){
        ele.setCustomValidity(`Please include an '@' in the email address. "${value}" is missing an '@'`);
    }
}
function validateDate(min, max, dob){
    let minDate = new Date(min), maxDate = new Date(max), dobDate = new Date(dob);
    return minDate.getFullYear() < dobDate.getFullYear() && maxDate.getFullYear() > dobDate.getFullYear();
}

async function validate(data){
    let properties = ['name', 'email', 'password', 'dobDate', 'terms'];
    let flag = properties.filter((property) => {
        if(data[property] == undefined){
            return property;
        }
    })
    return flag.length ? false : true;
}