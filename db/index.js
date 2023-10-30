const { futimes } = require("node:fs");
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const filePath = path.join(__dirname, "contacts.json");

async function readCont() {
    const data = await fs.readFile(filePath, { encoding: "utf-8" });
    return JSON.parse(data);
}

// readCont().then((data) => console.log(data, typeof data, "в списку = ", data.length, data[9]));

function writeCont(contact) {
    return fs.writeFile(filePath, JSON.stringify(contact, undefined, 2));
}

async function getAll() {
    const contacts = await readCont();
    console.log("contacts =", contacts.length);
    return contacts;
}

async function getById(id) {
    const contacts = await readCont();

    const contact = contacts.find((contact) => contact.id === id);

    return contact;
}

async function create(name, email, phone) {
  const contacts = await readCont();
    const newCont = { id: crypto.randomUUID(),
        name, email, phone };

  contacts.push(newCont);

  await writeCont(contacts);

  return newCont; // створюємо новий контакт який повертаємо
}

// console.log(crypto.randomUUID());

async function update(id, name, email, phone) {
  const contacts = await readCont();
  const index = contacts.findIndex((contact) => contact.id === id); //перевіряємо чи є вже такий контакт

  if (index === -1) {
    return undefined;
  }

  const newContact = { id, name, email, phone };

  const newContacts = [
    ...contacts.slice(0, index),
    newContact,
    ...contacts.slice(index + 1),
  ];

  await writeCont(newContacts);

  return newContact;
}

async function remove(id) {
    const contacts = await readCont();
    const index = contacts.findIndex((contact) => contact.id === id); //перевіряємо чи є вже такий контакт

    if (index === -1) {
      return undefined;
    }

    const newContacts = [
      ...contacts.slice(0, index),      
      ...contacts.slice(index + 1),
    ];

    await writeCont(newContacts);

    return contacts[index];
    
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};