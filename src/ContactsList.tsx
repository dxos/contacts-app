import React, { useState } from "react";

import { ContactType } from "./types";

export type ContactsListProps = {
  contacts: ContactType[];
  onSelect: (contact: ContactType) => void;
  onCreate: () => void;
  onInviteClick: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

const contactNameIsBlank = (contact: ContactType) => {
  return contact.firstName === "" && contact.lastName === "";
};

export const ContactsList = ({
  contacts,
  onSelect,
  onCreate,
  onInviteClick,
  isSidebarOpen,
  setIsSidebarOpen,
}: ContactsListProps) => {
  return (
    <aside
      className={`md:w-1/4 w-full bg-gray-200 dark:bg-gray-800 transform md:transform-none md:translate-x-0 fixed md:relative h-full md:h-auto z-10 md:z-0 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } `}
    >
      <div className="inline absolute right-0 mt-5 pr-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded mx-2 md:hidden"
        >
          Close
        </button>
        <button
          onClick={onInviteClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded mx-2"
        >
          Invite
        </button>
      </div>
      <h1 className="border-b border-gray-300 p-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Contacts
      </h1>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="border-b border-gray-300 p-4 hover:bg-gray-100 dark:hover:bg-gray-700  hover:cursor-pointer"
            onClick={(e) => onSelect(contact)}
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
            onClick={onCreate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded"
          >
            Create New Contact
          </button>
        </li>
      </ul>
    </aside>
  );
};
