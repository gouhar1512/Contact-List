function showStatus(status) {
    var x = document.getElementById('status');
    x.innerHTML = "<b><i>" + status + "</i></b>"; 
    setTimeout(function () {x.innerHTML = '';}, 800);
    
}
function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function validatePhone(phone){
    if(phone.length != 10)
        return false;

    var regex = /^[0-9]/;
    return regex.test(String(phone));

}


function addData() {

    var uName = document.getElementById('userName');
    var uPhone = document.getElementById('userPhone');
    var uEmail = document.getElementById('userEmail');

    let keys = Object.keys(localStorage);

    for (let i=0 ; i<keys.length ; i++) {
        let text = localStorage.getItem(keys[i]);
        let myObj = JSON.parse(text);
        if(myObj.name == uName.value){
            showStatus("User with same name already present");
            return 0;
        }
        if(myObj.phone == uPhone.value){
            showStatus("User with same phone already present");
            return 0;
        }
        if(myObj.email == uEmail.value){
            showStatus("User with same email already present");
            return 0;
        }
    }

    if(uName.value == '' || uPhone.value=='' || uEmail.value == '') {
        showStatus("Empty fields");
    } 
    else {
        
        if(!validatePhone(uPhone.value)){
            showStatus("Invalid phone number");
            return 0;
        }

        if(!validateEmail(uEmail.value)){
            showStatus("Invalid email address");
            return 0;
        }


        var myObj = {
            "name" : uName.value,
            "phone" : uPhone.value,
            "email" : uEmail.value
        };

        myJSON = JSON.stringify(myObj);
        localStorage.setItem(uName.value, myJSON);

        uName.value = '';
        uPhone.value = '';
        uEmail.value = '';

        showStatus("Data Added");
    }
}

function getData() {
    var retriveValue = document.getElementById('retriveValue');
    var text = localStorage.getItem(retriveValue.value);
    if(text) {
        var myObj = JSON.parse(text);
        var rName = document.getElementById("rName");
        var rEmail = document.getElementById("rEmail");
        
        rName.textContent = myObj.name;
        rEmail.textContent = myObj.email;

        retriveValue.value = '';
    }
    else {
        showStatus("No such fields");
    }
}

function deleteData() {
    var deleteValue = document.getElementById('deleteValue');
    var text = localStorage.getItem(deleteValue.value);
    if(text) {
        var deleteDiv = document.getElementsByClassName('delete')[0];
        var myObj = JSON.parse(text);

        var box = document.getElementById('confirmBox');
        box.innerHTML = '';
        box.innerHTML +=  "<i>Name : " + myObj.name + '</i>';
        box.innerHTML += '<br><i>Email : ' + myObj.email + '</i>';
        box.innerHTML += '<br><b>Are you sure : </b>';
        box.innerHTML += '<button onclick="confirmDelete(1)">Yes</button>';
        box.innerHTML += ' <button onclick="confirmDelete(0)">No</button>';
    }
    else {
        showStatus("No such fields");
    }
}

function confirmDelete(flag){
    var box = document.getElementById('confirmBox');
    box.innerHTML = '';
    var deleteValue = document.getElementById('deleteValue');
    
    if(flag==0)
        return;
    
    localStorage.removeItem(deleteValue.value);
    deleteValue.value = '';
    showStatus("Data deleted");
}


var previousObj;

function showData() {
    var previousValue = document.getElementById('prName');
    var text = localStorage.getItem(previousValue.value);
    previousObj = text;
    if(text) {
        document.getElementById('newFieldsForUpdate').style.display = 'block';
        var myObj = JSON.parse(text);
        var newName = document.getElementById("newName").value = myObj.name;
        var newPhone = document.getElementById("newPhone").value = myObj.phone;
        var newEmail = document.getElementById("newEmail").value = myObj.email;
        
    
        var box = document.getElementById('update-confirmBox');
        box.innerHTML = '';
        box.innerHTML += ' <button onclick="updateData(1)">Update</button>';
        box.innerHTML += ' <button onclick="updateData(0)">Cancel</button>';

    }
    else {
        showStatus("No such fields");
    }
}

function updateData(flag) {

    var nName = document.getElementById('newName');
    var nPhone = document.getElementById('newPhone');
    var nEmail = document.getElementById('newEmail');
    var prName = document.getElementById('prName');

    if(flag==0){
        nName.value = '';
        nPhone.value = '';
        nEmail.value = ''; 
        document.getElementById('newFieldsForUpdate').style.display = 'none';
        document.getElementById('update-confirmBox').innerHTML = '';
        return;
    }
    
    localStorage.removeItem(prName.value);

    var updated = false;
    var alreadyPresent = false;   //to check if there is already a user with same information 

    let keys = Object.keys(localStorage);
    for (let i=0 ; i<keys.length ; i++) {
        let text = localStorage.getItem(keys[i]);
        let myObj = JSON.parse(text);
        if(myObj.name == nName.value){
            showStatus("User with same name already present");
            alreadyPresent = true;
        }
        else if(myObj.phone == nPhone.value){
            showStatus("User with same phone already present");
            alreadyPresent = true;
        }
        else if(myObj.email == nEmail.value){
            showStatus("User with same email already present");
            alreadyPresent = true;
        }
    }

    if(!alreadyPresent){
            
        if(nName.value == '' || nPhone.value=='' || nEmail.value == '') {
            showStatus("Empty fields");
        } 
        else {
            
            if(!validatePhone(nPhone.value)){
                showStatus("Invalid phone number");
            }
            else if(!validateEmail(nEmail.value)){
                showStatus("Invalid email address");
            }
            else{

                var myObj = {
                    "name" : nName.value,
                    "phone" : nPhone.value,
                    "email" : nEmail.value
                };

                var myJSON = JSON.stringify(myObj);
                localStorage.setItem(nName.value, myJSON);
                updated = true;
                nName.value = '';
                nPhone.value = '';
                nEmail.value = ''; 
                document.getElementById('update-confirmBox').innerHTML = '';
                document.getElementById('newFieldsForUpdate').style.display = 'none';
                showStatus("Data Updated");
            }
        }
    }

    if(updated==false){
        localStorage.setItem(prName.value, previousObj);
    }
}


function showAll() {

    var userData = document.getElementById('userData');
    userData.innerHTML = '';

    var keys = Object.keys(localStorage);
    if(keys.length==0){
        showStatus("No data present");
        return;
    }
    userData.innerHTML += '<table id="allData" border="1" cellspacing="0" cellpadding="5"></table>'
    var allData = document.getElementById('allData');
    var newRow   = allData.insertRow();
    var newCell1 = newRow.insertCell(0);
    var newCell2 = newRow.insertCell(1);
    var newCell3 = newRow.insertCell(2);

    newCell1.innerHTML = "<b>Name</b>";
    newCell2.innerHTML = "<b>Phone</b>";
    newCell3.innerHTML = "<b>Email</b>";

    for (var i=0 ; i<keys.length ; i++) {
        var text = localStorage.getItem(keys[i]);
        var myObj = JSON.parse(text);
        
        var newRow   = allData.insertRow();
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);
        newCell1.innerHTML = myObj.name;
        newCell2.innerHTML = myObj.phone;
        newCell3.innerHTML = myObj.email;
    }
    if(keys.length) {
        userData.innerHTML += "<div style='text-align:center'><button onclick='clearAllDataField()' style='width:30%'>Clear</button></div>";
    }
}


function deleteAll() {
    var retVal = confirm("Do you want to delete all data ?");
    if(retVal == true) {
        var keys = Object.keys(localStorage);
        for(var i=0 ; i<keys.length ; i++) {
            var text = localStorage.getItem(keys[i]);
            var myObj = JSON.parse(text);
            localStorage.removeItem(myObj.name);
        }
        showStatus("All data deleted");
    }
}


function clearAllDataField() {
    document.getElementById('userData').innerHTML = '';   
}