import { useShell } from "@dxos/react-client";
import { Filter, create, useQuery, useSpace } from "@dxos/react-client/echo";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Contact } from "./Contact";
import { ContactsList } from "./ContactsList";

import { ContactType } from "./types";
import { DynamicEchoSchema, ReactiveObject } from "@dxos/echo-schema";

export const ContactsPage = () => {
  const { spaceKey } = useParams<{ spaceKey: string }>();

  const space = useSpace(spaceKey);

  const shell = useShell();

  const [persistedContactType, setPersistedContactType] =
    useState<DynamicEchoSchema | null>(null);

  if (!space) {
    console.log("WARNING: space not found!");
  }

  useEffect(() => {
    if (space) {
      let contactType = space?.db.schemaRegistry.getRegisteredByTypename(
        "dxos.app.contacts.Contact"
      );

      if (!contactType) {
        contactType = space.db.schemaRegistry.add(ContactType);
      }

      setPersistedContactType(contactType);
    }
  }, [space]);

  // Fetch the contacts objects
  const contacts = useQuery(
    space,
    persistedContactType ? Filter.schema(persistedContactType) : () => false,
    {},
    [persistedContactType]
  );

  // select one of them
  const [selectedContact, setSelectedContact] =
    useState<ReactiveObject<any> | null>(contacts[0] || null);

  const handleSelectContact = (contact: ReactiveObject<any>) => {
    setIsSidebarOpen(false);
    setSelectedContact(contact);
  };

  const handleCreateContact = useCallback(() => {
    const contact = create(persistedContactType, {});

    space.db.add(contact);

    handleSelectContact(contact);
  }, [space.db, persistedContactType]);

  const handleDeleteContact = (contact: DynamicEchoSchema) => {
    space.db.remove(contact);
    setSelectedContact(null);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex flex-grow min-h-screen">
      <ContactsList
        contacts={contacts}
        onSelect={handleSelectContact}
        onCreate={handleCreateContact}
        onInviteClick={async () => {
          if (!space) {
            return;
          }
          void shell.shareSpace({ spaceKey: space?.key });
        }}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {selectedContact !== null ? (
        <Contact
          key={selectedContact.id} // Note: Keying on ID creates a new component instance when the ID changes.
          contact={selectedContact}
          onCreate={handleCreateContact}
          onDelete={handleDeleteContact}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      ) : (
        <section className="flex-grow bg-white p-4 shadow-lg dark:bg-black">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded md:hidden"
          >
            All Contacts
          </button>
          <div className="flex justify-center items-center h-full">
            <button
              onClick={handleCreateContact}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded"
            >
              Create New Contact
            </button>
          </div>
        </section>
      )}
    </main>
  );
};
