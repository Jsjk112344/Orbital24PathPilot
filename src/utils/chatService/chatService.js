import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Function to send a message
export const sendMessage = async (message) => {
    const user = auth().currentUser;

    if (user) {
        await firestore().collection('users').doc(user.email).collection('messages').add({
            message: message,
            userEmail: user.email,
            timestamp: firestore.FieldValue.serverTimestamp(),
        });
    }
};

// Function to get messages
export const getMessages = (setMessages) => {
    const user = auth().currentUser;

    if (user) {
        return firestore()
            .collection('users')
            .doc(user.email)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(
                (querySnapshot) => {
                    if (querySnapshot) {
                        const messages = querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setMessages(messages);
                    } else {
                        console.warn("No messages found in the 'messages' collection.");
                        setMessages([]);
                    }
                },
                (error) => {
                    console.error("Error fetching messages: ", error);
                    setMessages([]);
                }
            );
    } else {
        console.warn("User not authenticated");
        setMessages([]);
    }
};
