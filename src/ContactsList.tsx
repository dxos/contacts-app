import React from "react";

import { ContactType } from "./types";

export type ContactsListProps = {
  contacts: ContactType[];
  handleSelectContact: (contact: ContactType) => void;
  handleCreateContact: () => void;
};

export const ContactsList = (props: ContactsListProps) => {
  const contacts = props.contacts;

  const contactNameIsBlank = (contact: ContactType) => {
    return contact.firstName === "" && contact.lastName === "";
  };

  return (
    <aside className="w-1/4 bg-gray-200 dark:bg-gray-800 relative">
      <div className="inline absolute right-0 mt-5 pr-4">
        <button
          onClick={async () => {
            // void shell.shareSpace({
            //   spaceKey: PublicKey.from(space?.key),
            // });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded mx-2"
        >
          Invite
        </button>
        <button
          onClick={async () => {
            // void client.shell.open();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded"
        >
          ⚙
        </button>
      </div>
      <h1 className="border-b border-gray-300 p-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Contacts
      </h1>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="border-b border-gray-300 p-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              props.handleSelectContact(contact);
              console.log("contact clicked: ", contact.id);
            }}
          >
            <div className="flex items-center">
              <div className="ml-4">
                <div className="text-md font-medium text-gray-900 dark:text-gray-100">
                  {contactNameIsBlank(contact)
                    ? "Unnamed Contact"
                    : `${contact.firstName} ${contact.lastName}`}
                </div>
              </div>
            </div>
          </li>
        ))}
        <li className="p-4 flex justify-center">
          <button
            onClick={() => {
              props.handleCreateContact();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded"
          >
            Create New Contact
          </button>
        </li>
      </ul>
    </aside>
  );
};