import { S, TypedObject } from "@dxos/echo-schema";

export class ContactType extends TypedObject({
  typename: "dxos.app.contacts.Contact",
  version: "0.1.0",
})({
  firstName: S.optional(S.string),
  lastName: S.optional(S.string),
  website: S.optional(S.string),
  phone: S.optional(S.string),
  email: S.optional(S.string),
}) {}
