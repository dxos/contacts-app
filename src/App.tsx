import React, { useEffect } from "react";
import {
  ClientProvider,
  Config,
  Local,
  Defaults,
  useShell,
} from "@dxos/react-client";
import { useSpace } from "@dxos/react-client/echo";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ContactsApp } from "./ContactsApp";
import { ContactType } from "./types";

const config = async () => new Config(Local(), Defaults());

const createWorker = () =>
  new SharedWorker(new URL("./shared-worker", import.meta.url), {
    type: "module",
    name: "dxos-client-worker",
  });

export const Home = () => {
  const space = useSpace();
  const shell = useShell();
  const [search, setSearchParams] = useSearchParams();
  const invitationCode = search.get("spaceInvitationCode");
  const deviceInvitationCode = search.get("deviceInvitationCode");
  const navigate = useNavigate();

  useEffect(() => {
    if (deviceInvitationCode) {
      setSearchParams((p) => {
        p.delete("deviceInvitationCode");
        return p;
      });
    } else if (invitationCode) {
      setSearchParams((p) => {
        p.delete("spaceInvitationCode");
        return p;
      });
      void (async () => {
        const { space } = await shell.joinSpace({ invitationCode });
        if (space) {
          navigate(`/space/${space.key}`);
        }
      })();
    }
  }, [invitationCode, deviceInvitationCode]);

  return space ? <Navigate to={`/space/${space.key}`} /> : null;
};

const router = createBrowserRouter([
  {
    path: "/space/:spaceKey",
    element: <ContactsApp />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export const App = () => {
  return (
    <ClientProvider
      config={config}
      createWorker={createWorker}
      shell="./shell.html"
      onInitialized={async (client) => {
        client.addSchema(ContactType);

        const searchParams = new URLSearchParams(location.search);
        if (
          !client.halo.identity.get() &&
          !searchParams.has("deviceInvitationCode")
        ) {
          await client.halo.createIdentity();
        }
      }}
    >
      <RouterProvider router={router} />
    </ClientProvider>
  );
};
