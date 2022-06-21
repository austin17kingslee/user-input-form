const $ = document.querySelector.bind(document); //single element 
const $$ = document.querySelectorAll.bind(document); //multiple elements

const userName = $('uname');
const fullName = $('fname');
const email = $('email');
const birthday = $('bday');

const table = $('table');
const save = $('saveButton');
const reset = $('resetButton');

const input = $$('input');

const api = "http://localhost:3000/user";

const returnObject = () => {
    let user = {
        username: userName.value,
        fullname: fullName.value,
        email: email.value,
        birthday: birthday.value
    };
    return user;
};

const postInput = () => {
    axios.post(api, returnObject());
}

const clearInput = () => {
    input.forEach((element) => {
        element.value = "";
    });
}

const App = () => {
    axios.get(api).then((res) => {
        // table.innerHTML = '';
        res.data.forEach((element) => {
            row = `
            <tr>
                <th scope="row">${element.id}</th>
                <td>${element.username}</td>
                <td>${element.fullname}</td>
                <td>${element.email}</td>
                <td>${element.birthday}</td>
                <td><button class="checkout__button btn btn-primary m-1 btn--edit"  index="${element.id}">Edit</button></td>    
                <td><button class="checkout__button btn btn-danger m-1 btn--delete"  index="${element.id}">Delete</button> </td>
            </tr>
            `;
            // table.innerHTML += row;
            table.insertAdjacentHTML('beforeend', row);
        });

        let editBtn = $$('.btn--edit');
        let deleteBtn = $$('.btn--delete');

        for (let btn of editBtn) {
            btn.onClick = function() {
                axios.patch(api + `/${btn.getAttribute('index')}`, returnObject());
            }
        }
        for (let btn of deleteBtn) {
            btn.onClick = function() {
                axios.delete(api + `/${btn.getAttribute('index')}`);                
            }
        }
    });
};

const handleSave = () => {
    postInput();
}

App();

if(save) save.addEventListener("click", handleSave);
if(reset) reset.addEventListener("click", clearInput);