# Code Examples & Integration Guide

## 🔗 Integrating with Backend API

### Example 1: Replace Simulated Login with Real API

**BEFORE (Current Simulated):**
```typescript
// In LoginScreen.tsx
const handleLogin = async () => {
  // ... validation code ...
  
  setLoading(true);
  try {
    // Simulated delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
    } else {
      Alert.alert('Success', 'Welcome back!');
      onSignIn?.();
    }
  } catch (error) {
    Alert.alert('Error', 'Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

**AFTER (Real API):**
```typescript
const handleLogin = async () => {
  // ... validation code ...
  
  setLoading(true);
  try {
    const response = await fetch('https://your-api.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save token
      await AsyncStorage.setItem('authToken', data.token);
      
      Alert.alert('Success', 'Welcome back!');
      onSignIn?.();
    } else {
      Alert.alert('Error', data.message || 'Login failed');
    }
  } catch (error) {
    Alert.alert('Error', 'Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

---

## 💾 Using AsyncStorage for Token Management

### Install AsyncStorage:
```bash
npm install @react-native-async-storage/async-storage
```

### Save Token After Login:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// In handleLogin success block:
const response = await fetch('https://your-api.com/api/login', {
  // ... fetch code ...
});

if (response.ok) {
  const data = await response.json();
  
  // Save token
  await AsyncStorage.setItem('authToken', data.token);
  
  // Save user info (optional)
  await AsyncStorage.setItem('userData', JSON.stringify({
    email: data.user.email,
    name: data.user.name,
    id: data.user.id,
  }));
  
  onSignIn?.();
}
```

### Retrieve Token on App Start:
```typescript
// In App.tsx, add effect to check token
useEffect(() => {
  checkAuthToken();
}, []);

const checkAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      // Token exists, user is logged in
      setIsSignedIn(true);
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
  }
};
```

### Clear Token on Logout:
```typescript
// In HomeScreen.tsx handleLogout:
const handleLogout = async () => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('userData');
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
};
```

---

## 🎨 Customizing Colors

### Change Primary Color (Blue #007AFF):

**1. Find all instances:**
```bash
grep -r "#007AFF" .
```

**2. Replace in these files:**

**LoginScreen.tsx:**
```typescript
const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#YOUR_COLOR', // Change here
    // ...
  },
  signUpLink: {
    color: '#YOUR_COLOR', // Change here
    // ...
  },
  // ... more instances
});
```

**SignUpScreen.tsx:**
```typescript
const styles = StyleSheet.create({
  signUpButton: {
    backgroundColor: '#YOUR_COLOR', // Change here
    // ...
  },
  termsLink: {
    color: '#YOUR_COLOR', // Change here
    // ...
  },
  // ... more instances
});
```

**HomeScreen.tsx:**
```typescript
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#YOUR_COLOR', // Change here
    // ...
  },
  activityDot: {
    backgroundColor: '#YOUR_COLOR', // Change here
    // ...
  },
  // ... more instances
});
```

**BottomTabNavigator.tsx:**
```typescript
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#YOUR_COLOR', // Change here
        },
        tabBarActiveTintColor: '#YOUR_COLOR', // Change here
        // ...
      }}
    >
      {/* ... */}
    </Tab.Navigator>
  );
}
```

---

## 🔔 Adding Error Messages

### Custom Error Handling:

```typescript
// Create a utils file: utils/errorHandler.ts
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message;

    switch (status) {
      case 401:
        return 'Invalid credentials';
      case 409:
        return 'Email already exists';
      case 500:
        return 'Server error. Please try again later';
      default:
        return message || 'An error occurred';
    }
  } else if (error.request) {
    return 'No response from server';
  } else {
    return 'Network error';
  }
};
```

### Use in LoginScreen:
```typescript
import { handleApiError } from '../utils/errorHandler';

try {
  const response = await fetch('https://api.com/login', {
    // ... fetch options
  });
  
  if (!response.ok) {
    const error = await response.json();
    Alert.alert('Error', handleApiError(error));
  }
} catch (error) {
  Alert.alert('Error', handleApiError(error));
}
```

---

## 👤 Storing User Data

### Create User Context:

```typescript
// contexts/AuthContext.tsx
import React, { createContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Use in LoginScreen:

```typescript
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen({ navigation, onSignIn }: LoginScreenProps) {
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    // ... validation ...
    
    const response = await fetch('https://api.com/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      
      // Save user data
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
      });
      
      // Save token
      await AsyncStorage.setItem('authToken', data.token);
      
      onSignIn?.();
    }
  };
}
```

### Access User in HomeScreen:

```typescript
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { user } = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome! 👋</Text>
          <Text style={styles.subGreeting}>{user?.email}</Text>
        </View>
        {/* ... */}
      </View>
      {/* ... */}
    </ScrollView>
  );
}
```

---

## 🔐 Password Reset Flow

### Add Forgot Password Handler:

```typescript
// In LoginScreen.tsx
const handleForgotPassword = () => {
  Alert.prompt(
    'Reset Password',
    'Enter your email address:',
    [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Send',
        onPress: async (email) => {
          if (!email || !email.includes('@')) {
            Alert.alert('Error', 'Please enter a valid email');
            return;
          }

          try {
            setLoading(true);
            const response = await fetch('https://your-api.com/forgot-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
            });

            if (response.ok) {
              Alert.alert('Success', 'Check your email for reset link');
            } else {
              Alert.alert('Error', 'Email not found');
            }
          } finally {
            setLoading(false);
          }
        },
      },
    ]
  );
};
```

### Update UI:
```typescript
<TouchableOpacity onPress={handleForgotPassword}>
  <Text style={styles.forgotPassword}>Forgot?</Text>
</TouchableOpacity>
```

---

## 🧪 Testing the Implementation

### Test Login Flow:
```typescript
// Add debug logging in handleLogin
console.log('Login attempt:', { email, password });

const handleLogin = async () => {
  console.log('Starting login...');
  
  // ... validation ...
  
  setLoading(true);
  try {
    console.log('Making API call...');
    const response = await fetch('https://api.com/login', {
      // ...
    });
    console.log('Response status:', response.status);
    
    const data = await response.json();
    console.log('Response data:', data);
    
    // ...
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

### Use React Native Debugger:
```bash
# Install React Native Debugger
brew install react-native-debugger

# Or use Chrome DevTools:
# Press Ctrl+M (Android) or Cmd+D (iOS)
# Select "Debug with Chrome"
```

---

## 📱 Platform-Specific Code

### iOS-Specific:
```typescript
import { Platform } from 'react-native';

<View
  style={[
    styles.inputGroup,
    Platform.OS === 'ios' && { marginBottom: 24 }, // Extra space on iOS
  ]}
>
  {/* ... */}
</View>
```

### Android-Specific:
```typescript
if (Platform.OS === 'android') {
  // Android specific behavior
  BackHandler.addEventListener('hardwareBackPress', handleBackPress);
}
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Remove all console.logs
- [ ] Replace simulated API calls with real endpoints
- [ ] Test all form validations
- [ ] Implement token refresh logic
- [ ] Add error boundary
- [ ] Test on real devices
- [ ] Optimize images and assets
- [ ] Implement app versioning
- [ ] Add analytics
- [ ] Set up crash reporting

---

**Last Updated**: November 19, 2025
**Status**: Ready for Integration
