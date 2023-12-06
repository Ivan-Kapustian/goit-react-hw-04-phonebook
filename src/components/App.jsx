import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './Phonebook/ContactList';
import ContactForm from './Phonebook/СontactForm';
import Filter from './Phonebook/Filter';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const isNameAlreadyExists = nameToCheck => {
    return contacts.some(contact => contact.name === nameToCheck);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '') {
      return;
    }

    if (isNameAlreadyExists(name)) {
      alert(`Contact with name '${name}' already exists.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        submit={handleSubmit}
        change={handleChange}
        name={name}
        number={number}
      />

      <h2>Contacts</h2>
      <Filter filter={filter} change={handleFilterChange} />
      <ContactList
        contacts={contacts}
        filter={filter}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
