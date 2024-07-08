import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { RouteProvider, useRouteContext } from '../RouteContext';

test('should update trip info correctly', () => {
  const wrapper = ({ children }) => <RouteProvider>{children}</RouteProvider>;
  const { result } = renderHook(() => useRouteContext(), { wrapper });

  act(() => {
    result.current.setTripInfo({ tripName: 'Test Trip', tripDate: new Date(), tripTime: new Date() });
  });

  expect(result.current.tripInfo.tripName).toBe('Test Trip');
});
