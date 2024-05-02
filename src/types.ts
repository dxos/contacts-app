import { S, TypedObject } from "@dxos/echo-schema";

export class ContactType extends TypedObject({
  typename: "dxos.app.contacts.Contact",
  version: "0.1.0",
})({
  firstName: S.string,
  lastName: S.string,
  website: S.string,
  phone: S.string,
  email: S.string,
}) {}
