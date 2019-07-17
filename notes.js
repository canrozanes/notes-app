const fs = require('fs');
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title)

  if(!duplicateNote){
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note,added!"))
  }
  else {
    console.log(chalk.red.inverse("No duplicate titles are allowed"))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.JSON', dataJSON);
}

const loadNotes = () => {
  try{
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  }
  catch(e){
    return []
  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title!== title)

  if(notesToKeep.length === notes.length){
    console.log(chalk.red.inverse('No note found'))
  }
  else{
    console.log(chalk.green.inverse('Note removed!'))
    saveNotes(notesToKeep);
  }
}

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse('Your notes'));
  notes.forEach(note=>{
    console.log(chalk.inverse.yellow(note.title))
  })
}

const readNote = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find(note => note.title===title);

  if(noteToRead){
    console.log(chalk.yellow.inverse(noteToRead.title))
    console.log(chalk.yellow.inverse(noteToRead.body))
  }
  else{
    console.log(chalk.red.inverse("Note not found!"))
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
}