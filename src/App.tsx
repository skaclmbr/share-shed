import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();
const statusSettings = client.enums.ThingStatus.values();
// const visibilitySettings = client.enums.ThingVisibility.values();

function App() {
  const [things, setThings] = useState<Array<Schema["Thing"]["type"]>>([]);

  useEffect(() => {
    client.models.Thing.observeQuery().subscribe({
      next: (data) => setThings([...data.items]),
    });
  }, []);

  function createThing() {
    client.models.Thing.create({ content: window.prompt("Thing content") });
  }
  
  function deleteThing(id: string) {
    client.models.Thing.delete({ id })
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        
    <main>
      <h1>{user?.signInDetails?.loginId}'s things</h1>
      <button onClick={createThing}>+ new</button>
      <div>
        {things.map((thing) => (
          <p
          // onClick={() => deleteThing(thing.id)} 
          key={thing.id}>{thing.content}
          <select name="avail" id="avail">
            {statusSettings.map((s) => (
              <option value={s}>{s}</option>
            ))}
          </select>
          </p>
        ))}
      </div>
      {/* <div>
        🥳 App successfully hosted. Try creating a new thing.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div> */}
      <button onClick={signOut}>Sign out</button>
    </main>
      )}
      </Authenticator>
  );
}

export default App;
