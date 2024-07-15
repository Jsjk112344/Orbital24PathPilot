module.exports = {
  auth: jest.fn().mockReturnValue({
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
      user: {
        email: 'test@example.com',
        sendEmailVerification: jest.fn().mockResolvedValue(),
      },
    }),
    signInWithEmailAndPassword: jest.fn().mockResolvedValue({
      user: {
        email: 'test@example.com',
      },
    }),
    signOut: jest.fn().mockResolvedValue(),
    onAuthStateChanged: jest.fn(),
    currentUser: {
      sendEmailVerification: jest.fn().mockResolvedValue(),
    },
  }),
};
