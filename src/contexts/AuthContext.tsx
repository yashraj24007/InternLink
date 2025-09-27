import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'mentor' | 'recruiter' | 'admin' | 'placement_cell';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  // Role-specific data
  studentId?: string;
  department?: string;
  yearOfStudy?: string;
  company?: string;
  jobTitle?: string;
  specialization?: string;
  experience?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('userRole');
    const savedEmail = localStorage.getItem('userEmail');
    const savedName = localStorage.getItem('userName');

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        // If parsing fails, try to reconstruct from individual items
        if (savedRole && savedEmail && savedName) {
          setUser({
            id: Date.now().toString(),
            email: savedEmail,
            name: savedName,
            role: savedRole as UserRole,
          });
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Mock authentication - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on role - Accept demo emails and any email with role keywords
      const mockUsers: Record<string, User> = {
        'student@demo.com': {
          id: '1',
          email: 'student@demo.com',
          name: 'John Doe',
          role: 'student',
          studentId: 'STU2024001',
          department: 'Computer Science',
          yearOfStudy: '3rd Year',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
        },
        'mentor@demo.com': {
          id: '2',
          email: 'mentor@demo.com',
          name: 'Dr. Smith',
          role: 'mentor',
          company: 'Tech University',
          jobTitle: 'Professor',
          specialization: 'Software Engineering',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Smith'
        },
        'recruiter@demo.com': {
          id: '3',
          email: 'recruiter@demo.com',
          name: 'Jane Wilson',
          role: 'recruiter',
          company: 'TechCorp Inc.',
          jobTitle: 'Senior Recruiter',
          experience: '5+ years',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
        },
        'admin@demo.com': {
          id: '4',
          email: 'admin@demo.com',
          name: 'System Administrator',
          role: 'admin',
          department: 'IT Department',
          jobTitle: 'System Administrator',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
        },
        'placement@demo.com': {
          id: '5',
          email: 'placement@demo.com',
          name: 'Placement Officer',
          role: 'placement_cell',
          department: 'Placement Cell',
          jobTitle: 'Placement Officer',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Placement'
        }
      };

      // Check for exact demo email match first
      let userData = mockUsers[email];
      
      // If no exact match, create user based on role and email
      if (!userData && email && password.length >= 1) {
        userData = {
          id: Date.now().toString(),
          email: email,
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          role: role,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };
        
        // Add role-specific data
        if (role === 'student') {
          userData.studentId = `STU${Date.now().toString().slice(-6)}`;
          userData.department = 'Computer Science';
          userData.yearOfStudy = '3rd Year';
        } else if (role === 'mentor') {
          userData.company = 'Tech University';
          userData.jobTitle = 'Professor';
          userData.specialization = 'Software Engineering';
        } else if (role === 'recruiter') {
          userData.company = 'TechCorp Inc.';
          userData.jobTitle = 'Senior Recruiter';
          userData.experience = '3+ years';
        } else if (role === 'admin') {
          userData.department = 'IT Department';
          userData.jobTitle = 'System Administrator';
        } else if (role === 'placement_cell') {
          userData.department = 'Placement Cell';
          userData.jobTitle = 'Placement Officer';
        }
      }
      
      if (!userData) {
        throw new Error('Invalid credentials');
      }

      setUser(userData);
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userRole', userData.role);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userName', userData.name);
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;