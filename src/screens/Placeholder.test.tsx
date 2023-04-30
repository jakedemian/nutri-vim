// import React from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { render, screen } from '@testing-library/react-native';

// import { useGetUser } from 'src/hooks/useGetUser';
// import Placeholder from 'src/screens/Placeholder';

// jest.mock('@react-navigation/native');
// jest.mock('src/auth/auth', () => {
//   return {
//     logoutUser: jest.fn()
//   };
// });
// jest.mock('src/hooks/useGetUser', () => {
//   return {
//     useGetUser: jest.fn(),
//   };
// });

// describe('<Placeholder />', () => {
//   beforeEach(() => {
//     (useGetUser as jest.Mock).mockReturnValue({
//       isLoading: true,
//       user: null,
//     });

//     (useNavigation as jest.Mock).mockReturnValue({
//       replace: jest.fn(),
//     });
//   });

//   it('renders a loading screen if the user is loading', () => {
//     render(<Placeholder />);

//     expect(screen.getByTestId('loader')).toBeDefined();
//   });

//   it('navigates to the profile if the user is verified', () => {
//     const mockReplace = jest.fn();

//     (useGetUser as jest.Mock).mockReturnValue({
//       isLoading: false,
//       user: {
//         isVerified: true,
//       },
//     });

//     (useNavigation as jest.Mock).mockReturnValue({
//       replace: mockReplace,
//     });

//     render(<Placeholder />);

//     expect(mockReplace).toHaveBeenCalledTimes(1);
//     expect(mockReplace).toHaveBeenCalledWith('Profile');
//   });

//   it('renders placeholder text if the user is not verified', () => {
//     (useGetUser as jest.Mock).mockReturnValue({
//       isLoading: false,
//       user: {
//         isVerified: false,
//       },
//     });

//     render(<Placeholder />);

//     expect(screen.getByTestId('approval-placeholder')).toBeDefined();
//   });
// });
