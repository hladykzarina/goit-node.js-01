const { Command } = require('commander');
const program = new Command();

const { listContacts, getContactsById, removeContact, addContact } = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    const contactsList = await listContacts();
    switch (action) {
      case 'list':
        console.table(contactsList);
        break;

      case 'get':
        console.log(argv);
        const contactById = await getContactsById(id);
        console.log(contactById);
        break;

      case 'add':
        const addedContact = await addContact(name, email, phone);
        console.log(addedContact);
        break;

      case 'remove':
        const removedContacts = await removeContact(id);
        console.log(removedContacts);
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (error) {
    throw error;
  }
}

invokeAction(argv);
