import React, { useCallback, useEffect, useRef, useState } from "react";

import { ReactiveObject } from "@dxos/echo-schema";

export type ContactProps = {
  contact: ReactiveObject<any> | null;
  onCreate: () => void;
  onDelete: (contact: ReactiveObject<any>) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

// -- TODO(Zan): Move to contact module
const contactIsEmpty = (contact: ReactiveObject<any>) => {
  return (
    !contact.firstName &&
    !contact.lastName &&
    !contact.email &&
    !contact.phone &&
    !contact.website
  );
};

export const Contact = ({
  contact,
  onCreate,
  onDelete,
  isSidebarOpen,
  setIsSidebarOpen,
}: ContactProps) => {
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState<ReactiveObject<any>>(
    // Hack to make a deep copy of the contact object and eject from the reactive proxy.
    JSON.parse(JSON.stringify(contact))
  );

  useEffect(() => {
    setFormState(JSON.parse(JSON.stringify(contact)));
  }, [JSON.stringify(contact)]);

  // TODO(jm): more appropriate React way to do this?
  const firstNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (contactIsEmpty(contact)) {
      setEditMode(true);
      setTimeout(() => firstNameInputRef.current?.focus(), 0);
    }
  }, [contact, setEditMode]);

  const updateContactField = useCallback(
    (field: string, newValue: any) => {
      // Mutate the reactive echo object
      contact[field] = newValue;
    },
    [contact]
  );

  return (
    <section className="flex-grow bg-white p-4 shadow-lg dark:bg-black">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded md:hidden"
      >
        All Contacts
      </button>
      <button
        onClick={() => {
          setEditMode(!editMode);
        }}
        className="absolute right-0 top-0 m-4 rounded bg-blue-500 px-2 py-1 text-white text-sm font-bold"
      >
        {editMode ? "Done" : "Edit"}
      </button>
      {editMode ? (
        <div className="mb-4 text-center text-2xl font-bold">
          <input
            ref={firstNameInputRef}
            type="text"
            value={formState?.firstName}
            onChange={(e) =>
              setFormState((state) => ({ ...state, firstName: e.target.value }))
            }
            onBlur={(e) => updateContactField("firstName", e.target.value)}
            className="rounded border px-2 py-1 text-2xl font-bold text-center"
            style={{
              width: `${
                formState?.firstName ? formState?.firstName.length + 1 : 0
              }ch`,
            }}
          />
          <input
            type="text"
            value={formState?.lastName}
            onChange={(e) =>
              setFormState((state) => ({ ...state, lastName: e.target.value }))
            }
            onBlur={(e) => updateContactField("lastName", e.target.value)}
            className="rounded border px-2 py-1 text-2xl font-bold text-center"
            style={{
              width: `${
                formState?.lastName ? formState.lastName.length + 1 : 0
              }ch`,
            }}
          />
        </div>
      ) : (
        <div className="mb-4 border border-white px-2 py-1 text-center text-2xl font-bold dark:border-black dark:text-gray-200">
          {formState?.firstName && formState.firstName.length > 0
            ? formState.firstName
            : "\u00A0"}{" "}
          {formState?.lastName && formState.lastName.length > 0
            ? formState.lastName
            : "\u00A0"}
        </div>
      )}
      <div className="flex flex-col">
        {["email", "phone", "website"].map((field) => {
          return (
            <div
              key={field}
              className="mb-2 flex items-center rounded bg-gray-100 p-2 dark:bg-gray-700"
            >
              <div className="mr-2 w-20 text-right text-sm text-gray-500 dark:text-gray-400">
                {field}
              </div>
              {editMode ? (
                <div className="w-full">
                  <input
                    type="text"
                    value={formState[field]}
                    onChange={(e) =>
                      setFormState((state) => {
                        return { ...state, [field]: e.target.value };
                      })
                    }
                    onBlur={(e) => updateContactField(field, e.target.value)}
                    className="w-full px-2 py-1"
                  />
                </div>
              ) : (
                <div className="px-2 py-1">{formState[field] ?? "\u00A0"}</div>
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
                onDelete(contact);
              }
            }}
            className="mt-4 border-2 bg-white text-gray-500 hover:bg-red-500 hover:border-red-500 hover:text-white py-1 px-2 text-sm rounded"
          >
            Delete Contact
          </button>
        ) : null}
      </div>
      <p className="mt-3 text-sm text-center text-gray-600">
        Made with{" "}
        <a className="text-blue-500" href="https://dxos.org">
          DXOS
        </a>
        .
        <a
          className="text-blue-500 block mt-2"
          href="https://github.com/dxos/contacts-app"
        >
          View Source
        </a>
      </p>
    </section>
  );
};
