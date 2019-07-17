const chalk = require('chalk');
const yargs = require('yargs');
const notesUtilities = require("./notes.js");

//Customize yargs version
yargs.version('1.1.0');

//Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: "Not body",
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    notesUtilities.addNote(argv.title, argv.body);
  }
});
//Create remove command 
yargs.command({
  command: 'remove',
  describe: 'Remove a new note',
  builder:{
    title: {
      describe: 'title of the noted to remove',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notesUtilities.removeNote(argv.title)
  }
});
//Create list command
yargs.command({
  command: 'list',
  describe: 'list the note',
  handler(){
    notesUtilities.listNotes()
  }
})
//Create read command
yargs.command({
  command: 'read',
  describe: 'read the note',
  builder: {
    describe: 'title of the note to read',
    demandOption: true,
    type: 'string',
  },
  handler(argv){
    notesUtilities.readNote(argv.title)
  }
})

yargs.parse()