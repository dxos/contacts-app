import { useQuery, useSpace } from "@dxos/react-client/echo";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PublicKey, useShell } from "@dxos/react-client";
import { useIdentity } from "@dxos/react-client/halo";

// -- ECHO schema ------------------------------------------------

// const CONTACT_TYPENAME = "dxos.org.contact";

// export type ContactProps = {
//   name: "string";
//   email: "string";
//   emoji: "string";
//   color: "string";
// };

export const ContactsApp = () => {
  const { spaceKey } = useParams<{ spaceKey: string }>();

  const identity = useIdentity();
  const identityKeyString = identity.identityKey.toString();
  const space = useSpace(spaceKey);

  if (!space) {
    console.log("WARNING: space not found!");
  }

  const shell = useShell();

  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [website, setWebsite] = useState("https://johndoe.com");

  // Fetch the contacts objects
  // const allContacts = useQuery(
  //   space,
  //   (object) => object.__typename == CONTACT_TYPENAME
  // );
  // const otherContacts = allContacts.filter(
  //   (contact) => contact.identity !== identityKeyString
  // );

  // const handleAddContact = async (contact: ContactProps) => {
  //   // Check to see if schema exists in the database
  //   const existingSchemas = space?.db.query(
  //     (object) => object.typename === CONTACT_TYPENAME
  //   );

  //   let contactSchema;

  //   if (!existingSchemas || existingSchemas.objects.length === 0) {
  //     console.log("no schema found, creating new one");
  //     contactSchema = new Schema({
  //       typename: CONTACT_TYPENAME,
  //       props: [
  //         { id: "name", type: Schema.PropType.STRING },
  //         { id: "email", type: Schema.PropType.STRING }, // TODO: change to organization
  //         { id: "emoji", type: Schema.PropType.STRING },
  //         { id: "color", type: Schema.PropType.STRING },
  //       ],
  //     });

  //     space?.db.add(contactSchema);
  //   } else {
  //     console.log("schema found, using existing one");
  //     contactSchema = existingSchemas.objects[0];
  //   }

  //   const contactObj = new Expando(
  //     {
  //       name: contact.name,
  //       email: contact.email,
  //       emoji: contact.emoji,
  //       color: contact.color,
  //       identity: identity?.identityKey.toString(),
  //     },
  //     { schema: contactSchema }
  //   );

  //   console.log("adding contact to space", contactObj);
  //   space?.db.add(contactObj);
  // };

  return (
    <>
      <main className="flex min-h-screen">
        <aside className="w-1/4 bg-gray-200 dark:bg-gray-800 relative">
          <div className="inline absolute right-0 mt-5 pr-4">
            <button
              onClick={async () => {
                void shell.shareSpace({
                  spaceKey: PublicKey.from(space?.key),
                });
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded mx-2"
            >
              Invite
            </button>
            <button
              onClick={async () => {
                void shell.shareIdentity();
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
            <li className="border-b border-gray-300 p-4 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-md font-medium text-gray-900 dark:text-gray-100">
                    John Doe
                  </div>
                </div>
              </div>
            </li>
            <li className="border-b border-gray-300 p-4 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-md font-medium text-gray-900 dark:text-gray-100">
                    Jane Doe
                  </div>
                </div>
              </div>
            </li>
            <li className="border-b border-gray-300 p-4 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-md font-medium text-gray-900 dark:text-gray-100">
                    James Doe
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </aside>
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
                className="rounded border px-2 py-1 text-2xl font-bold"
                style={{ width: `${firstName.length + 1}ch` }}
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded border px-2 py-1 text-2xl font-bold"
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
      </main>
    </>
  );
};
