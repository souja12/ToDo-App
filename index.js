let edit_id = '';
document.getElementById('submit').addEventListener('click', onsubmit);

//will display any records if available in local storage or will display the text "no notes to display"
data = new Array();
data = JSON.parse(localStorage.getItem("notes")) ? JSON.parse(localStorage.getItem("notes")) : []
if (data.length == 0) {
    document.querySelector('#emptylist').append(`no notes to display`);
}
render_notes();
function render_notes() {
    let table = document.getElementById("table").getElementsByTagName('tbody')[0];
    for(let i=0;i<data.length;i++){
    let newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data[i].Id;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data[i].Title;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data[i].Note;
    cell4 = newRow.insertCell(3);
        cell4.innerHTML = `<button class="edit" onClick="onEdit(${i})">Edit</button> 
        <button class="delete" onClick="onDelete(${i})">Delete</button>`;
    }
}
//upon clicking submit button this function will add or update notes and refresh page
function onsubmit() {
    let notes = new Array();
    let id = get_date_time();
    let title = document.getElementById('titlefield').value;
    let note = document.getElementById('note').value;
    notes = JSON.parse(localStorage.getItem("notes")) ? JSON.parse(localStorage.getItem("notes")) : []
    if (title == "") {
        alert("Title cannot be empty")
    }
    else if (edit_id !== '') {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].Id == edit_id) {
                notes.splice(i,1, { 'Id': id, 'Title': title, 'Note': note });
                localStorage.setItem("notes", JSON.stringify(notes));
                edit_id = '';
                alert('note updated');
            }
        }
    }
    else {
        notes.push({ 'Id': id, 'Title': title, 'Note': note })
        localStorage.setItem("notes", JSON.stringify(notes));
        alert('note added');
    }
    window.location.reload();
}
//upon clicking edit button will populate the input field for updating the note
function onEdit(index) {
    let notes = new Array();
    notes = JSON.parse(localStorage.getItem("notes")) ? JSON.parse(localStorage.getItem("notes")) : []
    edit_id = notes[index].Id;
    document.getElementById('note').value = notes[index].Note;
    document.getElementById('titlefield').value = notes[index].Title;
}
//upon clicking delete button it will delete the note and refresh the page
function onDelete(index) {
    let records = new Array();
    //if null save empty array
    records = JSON.parse(localStorage.getItem("notes")) ? JSON.parse(localStorage.getItem("notes")) : []
    if (window.confirm("Are you sure you want to Delete this entry")) {
        records.splice(index, 1);
    }
    localStorage.setItem("notes", JSON.stringify(records));
    alert('note removed');
    window.location.reload();
}
//return a new date and time in standard format
function get_date_time(){
    let today = new Date();
    let month = addZero(today.getMonth() + 1);
    let year = addZero(today.getFullYear());
    let date = addZero(today.getDate());
    let current_date = `${month}/${date}/${year}`;
    let hours = addZero(today.getHours());
    let minutes = addZero(today.getMinutes());
    let seconds = addZero(today.getSeconds());
    let current_time = `${hours}:${minutes}:${seconds}`;
    let date_time= current_date+" "+current_time;
    return date_time;
}

function addZero(num){
    return num < 10 ? `0${num}`:num;
}