const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (id) => {
  const result = await listContacts();
  const contact = result.find((item) => item.id === id);
  return contact || null;
};

const addContact = async (body) => {
  const result = await listContacts();
  const newContact = { id: nanoid(), ...body };
  result.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const result = await listContacts();
  const index = result.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const contact = result.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
  return contact;
};

const updateContact = async (id, body) => {
  const result = await listContacts();
  const index = result.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  result[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
  return result[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
