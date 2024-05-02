import { Filter, create, useQuery, useSpace } from "@dxos/react-client/echo";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PublicKey, useClient, useShell } from "@dxos/react-client";
import { useIdentity } from "@dxos/react-client/halo";

import { Contact } from "./Contact";
import { ContactsList } from "./ContactsList";

import { ContactType } from "./types";

export const ContactsApp = () => {
  const { spaceKey } = useParams<{ spaceKey: string }>();

  const identity = useIdentity();
  const identityKeyString = identity.identityKey.toString();
  const space = useSpace(spaceKey);

  if (!space) {
    console.log("WARNING: space not found!");
  }

  const shell = useShell();
  const client = useClient();

  const [selectedContact, setSelectedContact] = useState<ContactType | null>();

  const selectContact = (contact: ContactType) => {
    setSelectedContact(contact);
  };

  // Fetch the contacts objects
  const contacts = useQuery(space, Filter.schema(ContactType));

  console.log(contacts.length);
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

  //   const contactObj = new ContactType(
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
        <ContactsList contacts={contacts} />
        <Contact
          contactProp={selectedContact}
          handleEdit={() => {}}
          handleCreate={() => {
            const contact = create(ContactType, {
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              website: "",
            });

            space.db.add(contact);
          }}
        />
        )
      </main>
    </>
  );
};
