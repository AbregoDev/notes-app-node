const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicatedNotes = notes.filter(note => note.title === title);
    const duplicatedNote = notes.find(note => note.title === title);

    if(!duplicatedNote) {
        notes.push({
            title: title,
            body: body,
        });
    
        saveNotes(notes);
        
        console.log(chalk.green('New note added'));
    } else {
        console.log(chalk.red('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    // Filter just the notes that doesn't match the title
    const newNotes = notes.filter(note => note.title !== title);

    if(newNotes.length < notes.length) {
        // A note was removed
        console.log(chalk.bgGreen('Note removed!'));
        // Save de new notes
        saveNotes(newNotes);
    } else {
        // No any note was removed!
        console.log(chalk.bgRed('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();

    if(notes.length === 0) {
        console.log(chalk.red('You haven\'t any notes!'));
    } else {
        console.log(chalk.blue('* Your notes *\n'));
        notes.forEach(note => {
            console.log(chalk.yellow('-', note.title));
        });
    }
}

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find(note => note.title === title);

    if(note) {
        console.log(chalk.cyan(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.bgRed('No note found!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
};