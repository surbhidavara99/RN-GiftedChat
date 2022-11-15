import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';

const SignupScreen = (props) => {
    const [name, setName] = useState('test');
    const [email, setEmail] = useState('test0@gmail.com');
    const [password, setPassword] = useState('test@123');


    const signInWithEmail = () => {
        console.log("PASS",password);
        try {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User account created & signed in!');
                })

        } catch (e) {
            console.log("error", e);
        }

    }
    return (
        <View style={styles.container}>

            <TextInput
                placeholder='Enter your name'
                label='Name'
                // leftIcon={{ type: 'material', name: 'name' }}
                value={name}
                onChangeText={name => setName(name)}
                style={{ width: '80%', height: '7%', borderWidth: 1, borderRadius: 5 }}
            />
            <TextInput
                placeholder='Enter your email'
                label='email'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={email}
                onChangeText={text => setEmail(text)}
                style={{ width: '80%', height: '7%', borderWidth: 1, borderRadius: 5, marginTop: 15 }}
            />
            <TextInput
                placeholder='Enter your password'
                label='Password'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                style={{ width: '80%', height: '7%', borderWidth: 1, borderRadius: 5, marginTop: 15 }}
            />
            <View style={{ backgroundColor: '#000', width: '70%', marginTop: 15 }}>

                <Button title="Register" color='#FFFF' onPress={() => signInWithEmail()} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'red',
        alignItems: 'center',
        padding: 10,
        marginTop: 100,
    },
    button: {
        width: 450,
        marginTop: 10
    }
});

export default SignupScreen;
