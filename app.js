const Contacts = require('./db/index');

// const { Command } = require("commander");
// const program = new Command();

const { program } = require("commander");

program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const argv = program.opts();

console.log('module ', argv);


// module.exports = {
//   getAll, - list
//   getById, - get
//   create, - add
//   update, - 
//   remove, - remove
// };

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case "getAll":
            const contacts = await Contacts.getAll();
            return console.log(contacts);        

      case "getById":
        const contact = await Contacts.getById(id);
            return console.log(contact); 

      case "create":
        const createContact = await Contacts.create(name, email, phone);
            return console.log(createContact); 

      case "update":
        const updateContact = await Contacts.update(id, name, email, phone);
            return console.log(updateContact); 

      case "remove":
        const removeContact = await Contacts.remove(id);
            return console.log(removeContact); 

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);