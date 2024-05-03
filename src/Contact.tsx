import React, { useEffect, useRef, useState } from "react";

import { ContactType } from "./types";

export type ContactProps = {
  contactProp: ContactType | null;
  handleCreate: () => void;
  handleDelete: (contact: ContactType) => void;
};

export const Contact = ({
  contactProp,
  handleCreate,
  handleDelete,
}: ContactProps) => {
  const contact = contactProp;
  const createContact = handleCreate;

  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(contact ? contact.firstName : "");
  const [lastName, setLastName] = useState(contact ? contact.lastName : "");
  const [email, setEmail] = useState(contact ? contact.email : "");
  const [phone, setPhone] = useState(contact ? contact.phone : "");
  const [website, setWebsite] = useState(contact ? contact.website : "");
  const setFunctions = {
    setFirstName,
    setLastName,
    setEmail,
    setPhone,
    setWebsite,
  };

  const contactState = {
    firstName,
    lastName,
    email,
    phone,
    website,
  };

  // TODO(jm): more appropriate React way to do this?
  const firstNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (contact) {
      setEditMode(false);
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setEmail(contact.email);
      setPhone(contact.phone);
      setWebsite(contact.website);
    }

    if (
      // TODO(jm): really want to roll things like this up into a utility functions on ContactType
      contact &&
      !contact.firstName &&
      !contact.lastName &&
      !contact.email &&
      !contact.phone &&
      !contact.website
    ) {
      setEditMode(true);
      setTimeout(() => firstNameInputRef.current?.focus(), 0);
    }
  }, [contact]);

  return contact ? (
    <section className="w-3/4 bg-white p-4 shadow-lg dark:bg-black">
      <button
        onClick={() => {
          setEditMode(!editMode);
        }}
        className="absolute right-0 top-0 m-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        {editMode ? "Done" : "Edit"}
      </button>
      {editMode ? (
        <div className="mb-4 text-center text-2xl font-bold">
          <input
            ref={firstNameInputRef}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={(e) => (contact.firstName = e.target.value)}
            className="rounded border px-2 py-1 text-2xl font-bold text-center"
            style={{ width: `${firstName.length + 1}ch` }}
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={(e) => (contact.lastName = e.target.value)}
            className="rounded border px-2 py-1 text-2xl font-bold text-center"
            style={{ width: `${lastName.length + 1}ch` }}
          />
        </div>
      ) : (
        <div className="mb-4 border border-white px-2 py-1 text-center text-2xl font-bold dark:border-black dark:text-gray-200">
          {firstName.length > 0 ? firstName : "\u00A0"}{" "}
          {lastName.length > 0 ? lastName : "\u00A0"}
        </div>
      )}
      <div className="flex flex-col">
        {["Email", "Phone", "Website"].map((field) => {
          const fieldKey = field.toLowerCase();
          return (
            <div
              key={fieldKey}
              className="mb-2 flex items-center rounded bg-gray-100 p-2 dark:bg-gray-700"
            >
              <div className="mr-2 w-20 text-right text-sm text-gray-500 dark:text-gray-400">
                {field}
              </div>
              {editMode ? (
                <div className="w-full">
                  <input
                    type="text"
                    value={contactState[fieldKey]}
                    onChange={(e) => {
                      console.log("set" + field, e.target.value);
                      setFunctions["set" + field](e.target.value);
                    }}
                    onBlur={(e) => {
                      contact[fieldKey] = e.target.value;
                    }}
                    className="w-full px-2 py-1"
                  />
                </div>
              ) : (
                <div className="px-2 py-1">
                  {contact[fieldKey].length > 0 ? contact[fieldKey] : "\u00A0"}
                </div>
              )}
            </div>
          );
        })}
        {editMode ? (
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this contact?")
              ) {
                handleDelete(contact);
              }
            }}
            className="mt-4 border-2 bg-white text-gray-500 hover:bg-red-500 hover:border-red-500 hover:text-white py-1 px-2 text-sm rounded"
          >
            Delete Contact
          </button>
        ) : null}
      </div>
    </section>
  ) : (
    <section className="w-3/4 bg-white p-4 shadow-lg dark:bg-black">
      <div className="flex justify-center items-center h-full">
        <button
          onClick={() => createContact()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded"
        >
          Create New Contact
        </button>
      </div>
    </section>
  );
};
