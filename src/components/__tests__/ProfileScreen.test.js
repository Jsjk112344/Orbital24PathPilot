import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProfileScreen
import { RouteProvider } from '../../context/RouteContext'

test('should display profile data correctly', async () => {
  const { getByText } = render(
    <RouteProvider>
      <ProfileScreen />
    </RouteProvider>
  );

  await waitFor(() => {
    expect(getByText('Biography:')).toBeTruthy();
  });
});
