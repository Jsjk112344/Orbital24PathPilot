module.exports = {
  GoogleSignin: {
    configure: jest.fn(),
    signIn: jest.fn().mockResolvedValue({
      idToken: 'test-id-token',
      user: { email: 'test@example.com' },
    }),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signOut: jest.fn().mockResolvedValue(true),
    isSignedIn: jest.fn().mockResolvedValue(true),
    getCurrentUser: jest.fn().mockResolvedValue({
      email: 'test@example.com',
      name: 'Test User',
    }),
  },
};
