import { Expando, useQuery, useSpace } from "@dxos/react-client/echo";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PublicKey, useClient, useShell } from "@dxos/react-client";
import { useIdentity } from "@dxos/react-client/halo";

import { Contact } from "./Contact";
import { ContactsList } from "./ContactsList";

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
  const client = useClient();

  const [selectedContact, setSelectedContact] = useState<Expando | null>();

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
        <ContactsList contacts={[]} />
        <Contact contactProp={selectedContact} handleEdit={() => {}} />)
      </main>
    </>
  );
};
