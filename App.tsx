import { useState } from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { UserContext } from './src/contexts/userContext';
import { ReviewsContext } from './src/contexts/rewiewsContext';
import { User } from './src/types/user';
import { Review } from './src/types/review';

export default function App() {
  const [user, setUser] = useState<User>();
  const [reviews, setReviews] = useState<Review[]>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ReviewsContext.Provider value={{ reviews, setReviews }}>
        <AppNavigator />
      </ReviewsContext.Provider>
    </UserContext.Provider>
  );
}
