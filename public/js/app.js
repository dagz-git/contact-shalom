const contactForm = document.querySelector('.contact-box');
const clicky = document.querySelector('.submit');
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var address = document.getElementById("address");
var phone = document.getElementById("phone");
var email = document.getElementById("email");
var message = document.getElementById("message");
const modal = document.querySelector('#my-modal');
const closeBtn = document.querySelector('.close');
window.addEventListener('click', closeModal);
let subject = "";



function closeModal() {
    modal.style.display = 'none';
}

clicky.addEventListener('click',(e)=>{
    e.preventDefault();
    let formData = {
        fname : fname.value,
        lname : lname.value,
        address : address.value,
        phone : phone.value,
        email : email.value,
        message : message.value,
        subject : "PARKCREST"
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log();
        console.log(xhr.responseText);
        if (xhr.responseText == 'success') {
            //alert('THANKYOU PARKCREST CHURCH  ' + "\n" + "It is a blessing to partnering with you to accomplish one same goal , which is working for the kingdom of the lord ")
            //console.log("boyyy")

            fname.value='';
            lname.value='';
            address.value='';
            phone.value='';
            email.value='';
            message.value='';
            subject.value='';
            //modal.modal("show");
            modal.style.display = 'block';
        }
        else{
            alert('something went wrong');
        }
    }
    console.log(formData);
    xhr.send(JSON.stringify(formData));


})