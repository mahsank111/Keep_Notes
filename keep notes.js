const addButton = document.querySelector("#add");


const updateLocalStorsageData = () => {
    const textAreaData = document.querySelectorAll('textarea');

    const notes = [];

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notes));

}

const addNewNote = (text = '') => {

    const note = document.createElement('div')
    note.classList.add('note');
    
    const htmlData = `
    <div class="operation">
        <button class="edit"> <i class="fa fa-edit"></i> </button>
        <button class="delete"> <i class="fa fa-trash-alt"></i> </button>
    </div>

    <div class="main ${text ? "" : "hidden" }"> </div>
    <textarea id = "text-area" class = "${text ? "hidden" : ""}"> </textarea>`;

     note.insertAdjacentHTML('afterbegin', htmlData);

     // getting the references
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('#text-area');


    // deleting the note
    deleteButton.addEventListener('click', () => {
        note.remove();
        updateLocalStorsageData();
    });

    // toggling using edit button
    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change', (event) =>{
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLocalStorsageData();
    });

    document.body.appendChild(note);
}

// getting data back from local storage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {
    notes.forEach((note) => {
        addNewNote(note)
    })
}

addButton.addEventListener('click', () =>{
    addNewNote()
});