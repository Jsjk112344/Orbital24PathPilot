// screens/ChatScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendMessage, getMessages } from "../../utils/chatService/chatService";
import { Icon } from 'react-native-elements';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = getMessages(setMessages);
        return () => unsubscribe();
    }, []);

    const handleSend = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage('');
        }
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const renderItem = ({ item }) => (
        <View style={styles.messageContainer}>
            <Text style={styles.messageUser}>{item.userEmail}</Text>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTimestamp}>{new Date(item.timestamp?.toDate()).toLocaleTimeString()}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.messagesList}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message"
                    placeholderTextColor={"gray"}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    backButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        margin: 10,
        alignSelf: 'flex-start',
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    messagesList: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 1,
    },
    messageUser: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333', // Explicitly stating the color
    },
    messageText: {
        fontSize: 16,
        color: '#000', // Explicitly stating the color
    },
    messageTimestamp: {
        fontSize: 10,
        textAlign: 'right',
        marginTop: 5,
        color: '#666', // Explicitly stating the color
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginRight: 10,
        color: '#000', // Explicitly stating the color
    },
    sendButton: {
        backgroundColor: '#3B71F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ChatScreen;
