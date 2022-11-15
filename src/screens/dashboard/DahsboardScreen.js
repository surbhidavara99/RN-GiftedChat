import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, Text, Button, Platform,Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Bubble, GiftedChat, Actions } from 'react-native-gifted-chat';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

const DashboardScreen = (props, { navigation }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);


    useLayoutEffect(() => {
        const unsubscribe = firebase.firestore().collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data().id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
                file_type : doc.data()?.file_type,
                file : doc.data()?.file,
            }))
        ));
    }, []);

    useEffect(async () => {
        await
            firebase.
                firestore()
                .collection("users")
                .doc(props.route.params.userId)
                .collection("contacts")
                .doc('1EV9HaDa9YNGdAR9E61op4TMxfx1')
                .set({
                    name: 'test@'
                })

    }, [])




    const onSend = useCallback((messages = []) => {

        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const { _id, createdAt, text, user } = messages[0]
        firebase.firestore().collection('chats').add({ id: _id, createdAt: createdAt, text: text, user: user })
    }, [])

    // const renderBubble = (props) => {
    //     return (
    //         <Bubble
    //             {...props}
    //             containerStyle={{
    //                 left: {
    //                     backgroundColor: 'pink'
    //                 }
    //             }}
    //         />
    //     )
    // };


    const renderActions = (props) => {
        return (
            <Actions
                {...props}
                options={{
                    ['Document']: async (props) => {
                        try {
                            const result = await DocumentPicker.pick({
                                type: [DocumentPicker.types.pdf],
                            });
                            let imageRef = storage().ref(`docFiles/${result[0].name}`);
                            let filename = result[0].uri;
                            const response = await fetch(filename);
                            const blob = await response.blob();
                            await imageRef.put(blob);
                            var dwnload = await imageRef.getDownloadURL();
                            firebase.firestore().collection('chats').add({ id: "fe9527a3-bb0c-4baa-9961-d945b5256b23", createdAt: new Date(), file_type: 'pdf', file: dwnload })

                        } catch (e) {
                            if (DocumentPicker.isCancel(e)) {
                                console.log("User cancelled!")
                            } else {
                                throw e;
                            }
                        }

                    },
                    Cancel: (props) => { console.log("Cancel") }
                }}
                onSend={args => console.log(args)}
            />
        )
    };

    const renderBubble = (props) => { 
        const {
          currentMessage: { text: currText },
        } = props;
        if (currText.indexOf('[x]') === -1) {
          return <Bubble {...props} />
        }
    
        return <Bubble {...props} 
          wrapperStyle={{
              left: {
                backgroundColor: '#fef0dd',
              },
              right: {
                backgroundColor: '#fef0dd'
              }
            }} 
    
          timeTextStyle={{
            left: {
              color: '#000',
            },
            right: {
              color: '#000',
            },
          }}
        />
      }

    const renderCustomView = (props) => {
        if (props?.currentMessage?.file_type === 'pdf') {
            return (
                <View>
                    <Image source={{uri:'https://placeimg.com/140/140/any'}} />
                </View>
            )
        }
        else {
            console.log("File Type not ==>");

        }

    }

    const userSignout = () => {
        try {

            firebase.auth().signOut().then(() => {
                console.log("user sign out");
                navigation.navigate('Home');
            })
        }
        catch (e) {
            console.log("Error", e)
        }
    }

    return (
        <View style={styles.container}>
            <Text>Home screen!!</Text>
            <View style={{ backgroundColor: '#000', width: '25%', alignSelf: 'flex-end' }}>
                <Button title='sign-out' color='#FFFF' onPress={() => userSignout()} />
            </View>

            <View style={{ width: '110%', height: '90%' }}>
                <GiftedChat
                    messages={messages}
                    showAvatarForEveryMessage={true}
                    onSend={messages => onSend(messages)}
                    // renderBubble={() => renderBubble()}
                    // renderActions={(messages) => renderActions(messages)}
                    renderBubble={renderBubble}
                    user={{
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    }}
                    renderCustomView={renderCustomView}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    button: {
        width: 450,
        marginTop: 10
    }
});

export default DashboardScreen;
