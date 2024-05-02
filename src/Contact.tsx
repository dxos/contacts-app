import React, { useState } from "react";

import { ContactType } from "./types";

export type ContactProps = {
  contactProp: ContactType | null;
  handleEdit: (contact: ContactType) => void;
  handleCreate: () => void;
};

export const Contact = ({
  contactProp,
  handleEdit,
  handleCreate,
}: ContactProps) => {
  const contact = contactProp;
  const editContact = handleEdit;
  const createContact = handleCreate;

  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  return contact ? (
    <section className="w-3/4 bg-white p-4 shadow-lg dark:bg-black">
      <button
        onClick={() => setEditMode(!editMode)}
        className="absolute right-0 top-0 m-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        {editMode ? "Save" : "Edit"}
      </button>
      {editMode ? (
        <div className="mb-4 text-center text-2xl font-bold">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="rounded border px-2 py-1 text-2xl font-bold text-center"
            style={{ width: `${firstName.length + 1}ch` }}
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
        <div className="mb-2 flex items-center rounded bg-gray-100 p-2 dark:bg-gray-700">
          <div className="mr-2 w-20 text-right text-sm text-gray-500 dark:text-gray-400">
            Email
          </div>
          {editMode ? (
            <div className="w-full">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 py-1"
              />
            </div>
          ) : (
            <div className="px-2 py-1">
              {email.length > 0 ? email : "\u00A0"}
            </div>
          )}
        </div>
        <div className="mb-2 flex items-center rounded bg-gray-100 p-2 dark:bg-gray-700">
          <div className="mr-2 w-20 text-right text-sm text-gray-500 dark:text-gray-400">
            Phone
          </div>
          {editMode ? (
            <div className="w-full">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-2 py-1"
              />
            </div>
          ) : (
            <div className="px-2 py-1">
              {phone.length > 0 ? phone : "\u00A0"}
            </div>
          )}
        </div>
        <div className="flex items-center rounded bg-gray-100 p-2 dark:bg-gray-700">
          <div className="mr-2 w-20 text-right text-sm text-gray-500 dark:text-gray-400">
            Website
          </div>
          {editMode ? (
            <div className="w-full">
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-2 py-1"
              />
            </div>
          ) : (
            <div className="px-2 py-1">
              {website.length > 0 ? website : "\u00A0"}
            </div>
          )}
        </div>
      </div>
    </section>
  ) : (
    <section className="w-3/4 bg-white p-4 shadow-lg dark:bg-black">
      <button onClick={() => createContact()}>Create New Contact</button>
    </section>
  );
};
