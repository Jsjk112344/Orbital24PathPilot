import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInScreen from '../SignInScreen';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/auth', () => {
  return {
    signInWithEmailAndPassword: jest.fn(),
  };
});

global.alert = jest.fn();

describe('SignInScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <SignInScreen />
      </NavigationContainer>
    );
    expect(getByPlaceholderText('Email Address')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign in')).toBeTruthy();
  });

  it('handles sign in with valid credentials', async () => {
    auth.signInWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@example.com' },
    });

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <SignInScreen />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Password');
    const signInButton = getByText('Sign in');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  // Uncomment this test after the first test passes
  it('shows error message on sign in failure', async () => {
    auth.signInWithEmailAndPassword.mockRejectedValue(new Error('Invalid credentials'));

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <SignInScreen />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Password');
    const signInButton = getByText('Sign in');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
      expect(global.alert).toHaveBeenCalledWith('Failed to sign in, please check your credentials and try again.');
    });
  });
});
