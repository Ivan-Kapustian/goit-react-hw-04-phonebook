import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './Phonebook/ContactList';
import ContactForm from './Phonebook/СontactForm';
import Filter from './Phonebook/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };
  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };
  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };
  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  isNameAlreadyExists = name => {
    return this.state.contacts.some(contact => contact.name === name);
  };
  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;

    if (name.trim() === '') {
      return;
    }
    if (this.isNameAlreadyExists(name)) {
      alert(`Contact with name '${name}' already exists.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };
  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          submit={this.handleSubmit}
          change={this.handleChange}
          name={this.state.name}
          number={this.state.number}
        />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} change={this.handleFilterChange} />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
export default App;
