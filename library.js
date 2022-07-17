// Soumik Mukhopadhyay(1928127)
let TEST_DATA = [
    {
        id: 1,
        Book: 'Book1',
        Author: 'Author1',
        Lender: 'UserC',
        Borrower: 'UserB',
    },
    {
        id: 2,
        Book: 'Book2',
        Author: 'Author2',
        Lender: 'UserC',
        Borrower: null,
    },
    {
        id: 3,
        Book: 'Book3',
        Author: 'Author3',
        Lender: 'UserD',
        Borrower: 'UserC',
    },
    {
        id: 4,
        Book: 'Book4',
        Author: 'Author4',
        Lender: 'UserA',
        Borrower: null,
    },
    {
        id: 5,
        Book: 'Book5',
        Author: 'Author5',
        Lender: 'UserA',
        Borrower: null,
    },
    {
        id: 6,
        Book: 'Book6',
        Author: 'Author6',
        Lender: 'UserB',
        Borrower: 'UserA',
    }
]



let isLoggedIn = false;
let totalBookCount = TEST_DATA.length;
let table = document.querySelector('#info-table');
table.appendChild(document.createElement('tbody'));

const clear_table = () => {
    let table = document.querySelectorAll('#info-table tbody tr');
    table.forEach(r => (r.remove()));
}

const createRow = (r) => {
    const tr = document.createElement('tr');
    const idTh = document.createElement('th');
    const titleTh = document.createElement('th');
    const authorTh = document.createElement('th');
    const lenderTh = document.createElement('th');
    const borrowerTh = document.createElement('th');
    const actionTh = document.createElement('th');
    idTh.innerText = r.id;
    titleTh.innerHTML = r.Book;
    authorTh.innerHTML = r.Author;
    lenderTh.innerText = r.Lender;
    borrowerTh.innerHTML = r.Borrower || '--';
    if(r.Action) {
        actionTh.innerHTML = r.Action;
    } else {
        actionTh.innerHTML = '--';
    }
    tr.appendChild(idTh);
    tr.appendChild(titleTh);
    tr.appendChild(authorTh);
    tr.appendChild(lenderTh);
    tr.appendChild(borrowerTh);
    tr.appendChild(actionTh);
    return tr;
}

const add_data = (data) => {
    let table = document.querySelector('#info-table tbody');
    data.forEach((d) => {
        const tr = createRow(d);
        table.appendChild(tr);
    })
}

const displayData = () => {
    clear_table();
    add_data(TEST_DATA);
}

displayData();

let temo;

const addBook = () => {
    const newDataRow = document.querySelectorAll('#info-table .newData th');
    console.log(newDataRow)
    temo = newDataRow;
    const newData = {
        id: newDataRow[0].innerText,
        Book: newDataRow[1].lastChild.value,
        Author: newDataRow[2].lastChild.value,
        Lender: newDataRow[3].innerText,
        Borrower: null
    }
    TEST_DATA.push(newData);
    totalBookCount++;
    displayData();
    document.querySelector('#logged-user').value = '';
    isLoggedIn = false;
    document.querySelector('#logged-in-user-name').innerText = 'No user logged in';
}

const createData = (LenderName) => {
    const id = totalBookCount + 1;
    const title = '<input type="text" placeholder="Title" required>';
    const author = '<input type="text" placeholder="Author" required>';
    const Lender = LenderName;
    const borrower = null;
    const action = '<button onclick="addBook()">Add Book</button>';
    const newData = {
        id: id,
        Book: title,
        Author: author,
        Lender: Lender,
        Borrower: borrower,
        Action: action
    }
    return newData;
}

const changeLoggedInUser = () => {
    const p = document.querySelector('#logged-in-user-name');
    const u = document.querySelector('#logged-user').value;
    if(u.trim().length > 0){
        const actionData = [];
        for(let d of TEST_DATA){
            console.log(d);
            const data = {
                id: d.id,
                Book: d.Book,
                Author: d.Author,
                Lender: d.Lender,
                Borrower: d.Borrower,
                Action: null
            }
            if(d.Lender === u){
                data.Action = null;
            } else {
                if(d.Borrower === u){
                    data.Action = `<button id=${data.id} onclick="returnBook(${data.id})">Return Book</button>`
                } else if (d.Borrower == null){
                    data.Action = `<button id=${data.id} onclick="borrowBook(${data.id})">Borrow Book</button>`
                }
            }
            actionData.push(data);
        }
        clear_table();
        add_data(actionData);
        let table = document.querySelector('#info-table tbody');
        p.innerText = `Logged in user: ${u}`;
        isLoggedIn = true;
        const rowData = createData(u);
        const tr = createRow(rowData);
        tr.classList.add('newData');
        table.appendChild(tr);
    } else {
        displayData();
        p.innerText = 'No user logged in';
        isLoggedIn = false;
    }
}


const returnBook = (id) => {
    console.log(id);
    TEST_DATA[id-1].Borrower = null;
    displayData();
    document.querySelector('#logged-user').value = '';
    isLoggedIn = false;
    document.querySelector('#logged-in-user-name').innerText = 'No user logged in';
}

const borrowBook = (id) => {
    TEST_DATA[id-1].Borrower = document.querySelector('#logged-user').value;
    displayData();
    document.querySelector('#logged-user').value = '';
    isLoggedIn = false;
    document.querySelector('#logged-in-user-name').innerText = 'No user logged in';
}