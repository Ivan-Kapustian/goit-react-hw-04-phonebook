import React, { Component } from 'react';
class ContactList extends Component {
  render() {
    const { contacts, filter, onDeleteContact } = this.props;
    return (
      <ul>
        {contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}{' '}
              <button onClick={() => onDeleteContact(contact.id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
    );
  }
}

export default ContactList;
