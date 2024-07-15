import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUpScreen from '../SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/auth');
jest.mock('@react-native-google-signin/google-signin');

global.alert = jest.fn();

describe('SignUpScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <SignUpScreen />
      </NavigationContainer>
    );
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Repeat Password')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  });

  it('handles sign up with valid credentials', async () => {
    auth().createUserWithEmailAndPassword.mockResolvedValueOnce({ user: { email: 'test@example.com' } });

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <SignUpScreen />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const passwordRepeatInput = getByPlaceholderText('Repeat Password');
    const registerButton = getByText('Register');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(passwordRepeatInput, 'password123');
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(auth().createUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  // it('shows error message on sign up failure', async () => {
  //   auth().createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Email already in use'));

  //   const { getByPlaceholderText, getByText } = render(
  //     <NavigationContainer>
  //       <SignUpScreen />
  //     </NavigationContainer>
  //   );

  //   const emailInput = getByPlaceholderText('Email');
  //   const passwordInput = getByPlaceholderText('Password');
  //   const passwordRepeatInput = getByPlaceholderText('Repeat Password');
  //   const registerButton = getByText('Register');

  //   fireEvent.changeText(emailInput, 'test@example.com');
  //   fireEvent.changeText(passwordInput, 'password123');
  //   fireEvent.changeText(passwordRepeatInput, 'password123');
  //   fireEvent.press(registerButton);

  //   await waitFor(() => {
  //     expect(auth().createUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
  //     expect(global.alert).toHaveBeenCalledWith('Email already in use');
  //   });
  // });
});
