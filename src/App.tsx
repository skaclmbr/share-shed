import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { 
  Authenticator,
  Card,
  Image,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  Button,
  ThemeProvider,
  Theme
 } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();
// const statusSettings = client.enums.ThingStatus.values();
// const visibilitySettings = client.enums.ThingVisibility.values();

const theme: Theme = {
  name: 'shsh-theme',
  tokens: {
    colors: {
      background: {
        card: { value : "#C3DFE0" },
        button: { value : "#BCD979"}
      },
      font: {
        primary: { value : "#5E574D"},
        button : { value : "#5E574D"}
      },
      border: {
        button: { value : "#9DAD6F"}
      }
    },
    fonts: {
      default: {
        variable: { value: "Raleway, sans-serif" },
        static: { value: "Raleway, sans-serif"},
      }
    },
    components: {
      button: {
        borderRadius: { value: "{radii.medium}"},
        backgroundColor: { value : "{colors.background.button}"},
        color: { value : "{colors.font.button}" },
        borderColor : { value : "{colors.border.button}"}

      },
      card: {
        // You can reference other tokens
        backgroundColor: { value: '{colors.background.card}' },
        borderRadius: { value: '{radii.large}' },
        padding: { value: '{space.xl}' },

        // Variations
        outlined: {
          // Or use explicit values
          borderWidth: { value: '10px' },
          backgroundColor: { value: '{colors.background.warning}' },
        },
        elevated: {
          borderRadius: { value: '{radii.large}'},
          boxShadow: { value: '{shadows.large}' },
        },
      },
    },
  },
};

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
  
  // function deleteThing(id: string) {
  //   client.models.Thing.delete({ id })
  // }

  return (
      <ThemeProvider theme={theme} colorMode="light">
    <Authenticator>
      {({ signOut, user }) => (
        
    <main>

      <div>
        <Flex direction = "row" alignItems="flex-start">
      <h1>{user?.signInDetails?.loginId}'s things</h1>
      <Button onClick={createThing}>+ new</Button>
      <Button onClick={signOut} >Sign out</Button>
      </Flex>
      </div>
      <div>
        <Flex direction="row" alignItems="flex-start">
        {things.map((thing) => (
          <Card
          variation = "elevated"
          // onClick={() => deleteThing(thing.id)} 
          key={thing.id}>
            <Flex>
              <Badge size = "small" variation = "info">Available</Badge>
            </Flex>
              
            <Image
            src="/test_thing.jpg"
            alt="This is a picture of a thing I want to lend." 
            width="100%"
            objectPosition = "50% 50%"

            />

            <Flex direction = "row" alignItems="flex-start">
            <Flex 
              direction = "column"
              alignItems="flex-start"
              gap="5px">
            <Heading level = {5}>{thing.content}</Heading>
            <Text>This is a description of this thing I bought and only needed once.</Text>
            <Flex direction = "row" alignItems="flex-end">
            <Button>Borrow</Button>
            <Button>Lend</Button>
            <Button>Edit</Button>
            <Button>Remove</Button>
            </Flex>
          {/* <select name="avail" id="avail">
            {statusSettings.map((s) => (
              <option value={s}>{s}</option>
            ))}
          </select> */}
          </Flex>
          </Flex>
          </Card>
        )
        )}
        </Flex>
      </div>

    </main>
      )}
      </Authenticator>
      </ThemeProvider>
  );
}

export default App;
