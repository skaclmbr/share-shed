// @ts-ignore
import { useEffect, useState } from 'react';
import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
// import { uploadData } from 'aws-amplify/storage';

// UI Components
import { ThingCreateForm } from '../ui-components';
import { 
  Authenticator,
  Card,
  // Image,
  // Input,
  // Label,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  Button,
  ThemeProvider,
  Tabs,
  Theme
 } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();

const theme: Theme = {
  name: 'shsh-theme',
  tokens: {
    colors: {
      background: {
        card: { value : '#C3DFE0' },
        button: { value : '#BCD979'}
      },
      font: {
        primary: { value : '#5E574D'},
        button : { value : '#5E574D'}
      },
      border: {
        button: { value : '#9DAD6F'}
      }
    },
    fonts: {
      default: {
        variable: { value: 'Raleway, sans-serif' },
        static: { value: 'Raleway, sans-serif'},
      }
    },
    components: {
      button: {
        borderRadius: { value: '{radii.medium}'},
        backgroundColor: { value : '{colors.background.button}'},
        color: { value : '{colors.font.button}' },
        borderColor : { value : '{colors.border.button}'}

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

// upload the storage file:
// const result = await uploadData({
//   path: `thing-pictures/${thing.id}-${file.name}`,
//   data: file,
//   options: {

//   }
// }).result;

function App() {

  const [tab, setTab] = useState('2');

  // const [file, setFile] = useState();

  const [things, setThings] = useState<Array<Schema['Thing']['type']>>([]);
  // const { errors, data: newThing } = await client.models.Thing.create({
  //   content: 
  // })

  useEffect(() => {
    client.models.Thing.observeQuery().subscribe({
      next: (data) => setThings([...data.items]),
    });
  }, []);


  // function createThing() {
  //   console.log() 
  //   // client.models.Thing.create({ content: window.prompt('Thing content') });
  // }

 
  function deleteThing(id: string) {
    client.models.Thing.delete({ id })
  }

  return (
      <ThemeProvider theme={theme} colorMode='light'>
    <Authenticator>
      {({ signOut, user }) => (
        
    <main>

      <div>
        <Flex direction = 'row' alignItems='flex-start'>
      <h1>{user?.signInDetails?.loginId}'s things</h1>
      <Button onClick={signOut} >Sign out</Button>
      </Flex>
      </div>
      <Tabs
        value={tab}
        onValueChange = {(tab) => setTab(tab)}
        items={[
          {
            label: 'Search',
            value: '1',
            content: (
              <View>
                Add Search Box Here
              </View>
            )
          },
          {
            label: 'Library',
            value: '2',
            content: (<>
            <View id='create-thing' maxWidth={'500px'}>
              <ThingCreateForm 
                overrides={{
                  rowGap: 'xl',
                  columnGap: 'xs',
                  padding: 'xl',
                }}
              />;              
            </View>
            <Flex direction='row' alignItems='flex-start'>
            {things.map((thing) => (
              <Card
              variation = 'elevated'
              // onClick={() => deleteThing(thing.id)} 
              key={thing.id}>
                <Flex>
                  <Badge size = 'small' variation = 'info'>{thing.status}</Badge>
                </Flex>
                  
                <Flex direction = 'row' alignItems='flex-start'>
                <Flex 
                  direction = 'column'
                  alignItems='flex-start'
                  gap='5px'>
                <Heading level = {5}>{thing.title}</Heading>
                <Text>{thing.content}</Text>
                <Flex direction = 'row' alignItems='flex-end'>
                <Button>Borrow</Button>
                <Button>Lend</Button>
                <Button>Edit</Button>
                <Button onClick={()=>deleteThing(thing.id)}>Remove</Button>
                </Flex>
              {/* <select name='avail' id='avail'>
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
          </>)
        }
        ]
        }
        />

    </main>
      )}
      </Authenticator>
      </ThemeProvider>
  );
}

export default App;
