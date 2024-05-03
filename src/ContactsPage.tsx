import { useClient, useShell } from "@dxos/react-client";
import { Filter, create, useQuery, useSpace } from "@dxos/react-client/echo";
import { useIdentity } from "@dxos/react-client/halo";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import { Contact } from "./Contact";
import { ContactsList } from "./ContactsList";

import { ContactType } from "./types";

export const ContactsPage = () => {
  const { spaceKey } = useParams<{ spaceKey: string }>();

  const client = useClient();
  const identity = useIdentity();
  const identityKeyString = identity.identityKey.toString();
  const space = useSpace(spaceKey);
  const shell = useShell();

  if (!space) {
    console.log("WARNING: space not found!");
  }

  // Fetch the contacts objects
  const contacts = useQuery(space, Filter.schema(ContactType));

  // select one of them
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(
    contacts[0] || null
  );

  const handleSelectContact = (contact: ContactType) => {
    setSelectedContact(contact);
  };

  const handleCreateContact = useCallback(() => {
    const contact = create(ContactType, {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      website: "",
    });

    space.db.add(contact);

    setSelectedContact(contact);
  }, [space.db]);

  const handleDeleteContact = (contact: ContactType) => {
    space.db.remove(contact);
    setSelectedContact(null);
  };

  return (
    <main className="flex min-h-screen">
      <ContactsList
        contacts={contacts}
        onSelect={handleSelectContact}
        onCreate={handleCreateContact}
      />
      {selectedContact && (
        <Contact
          key={selectedContact.id} // Note: Keying on ID creates a new component instance when the ID changes.
          contact={selectedContact}
          onCreate={handleCreateContact}
          onDelete={handleDeleteContact}
        />
      )}
    </main>
  );
};
