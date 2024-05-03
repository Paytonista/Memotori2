const addBtn = document.querySelector("#add_new_note_button");
const main = document.querySelector("#main");

// Click event listener

document.getElementById('searchLink').addEventListener('click', function(event) {
    event.preventDefault();
    var searchBar = document.getElementById('searchBar');
    if (searchBar.style.display === 'none') {
      searchBar.style.display = 'block';
      searchBar.classList.add('growInSize');
    } else {
      searchBar.style.display = 'none';
      searchBar.classList.remove('growInSize');
    }
  });

  document.getElementById('searchBar').addEventListener('keyup', function(event) {
    var searchQuery = event.target.value.toLowerCase();
    var notes = document.querySelectorAll('.note');
    notes.forEach(function(note) {
      var noteTitle = note.querySelector('.title').value.toLowerCase();
      if (noteTitle.indexOf(searchQuery) !== -1) {
        note.style.display = 'block';
      } else {
        note.style.display = 'none';
      }
    });
  });


const saveNotes = () => { 
    // Select content textareas 
    const notes = document.querySelectorAll(".note .content"); 

    // Select title textareas 
    const titles = document.querySelectorAll(".note .title"); 

    // Select color of each note
    const colors = document.querySelectorAll(".note .title-div textarea");

    const data = []; 

    notes.forEach((note, index) => { 
        const content = note.value; 
        const title = titles[index].value; 
        const color = colors[index].style.backgroundColor;
        if (content.trim() !== "") { 
            data.push({ title, content, color }); 
        } 
    }); 

    localStorage.setItem("notes", JSON.stringify(data)); 
};


const addNote = (text = "", title = "", category = "", color = "#ffffff") => {
    const note = document.createElement("div");
    note.classList.add("note");

    const brightness = getBrightness(color);
    const textColor = (brightness > 127.5) ? "black" : "white";

    note.innerHTML = `
    <div class="icons" style="background-color:#01B075;border-radius:3px;">
        <i class="save fas fa-save" style="color:white"></i>
        <i class="trash fas fa-trash" style="color:white"></i>
    </div>
    <div class="title-div">
        <textarea class="title" placeholder="Write title ..." style="background-color:${color}; color:${textColor}">${title}</textarea>
    </div>
    <textarea class="content" placeholder="Note down your thoughts ..." style="background-color:${color}; color:${textColor}">${text}</textarea>
    `
    ;

    function handleTrashClick() {
        note.remove();
        
        
    }

    function handleSaveClick() {
        saveNotes();
    }

    const delBtn = note.querySelector(".trash");
    const saveButton = note.querySelector(".save");

    delBtn.addEventListener("click", handleTrashClick);
    saveButton.addEventListener("click", handleSaveClick);

    main.appendChild(note);
    saveNotes();
    
};

function loadNotes() { 
    const data = JSON.parse(localStorage.getItem("notes")) || []; 

    for (let i = 0; i < data.length; i++) { 
        addNote(data[i].content, data[i].title, "", data[i].color); 
    } 
}

function getBrightness(color) {
    let r, g, b, hsp;
    if (color.match(/^rgb/)) {
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        r = color[1];
        g = color[2];
        b = color[3];
    } else {
        color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );
    return hsp;
}


loadNotes();
