import { createContext, useState, useContext, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.error("Supabase is not properly configured. Please check your environment variables.");
      setConfigError(true);
      setLoading(false);
      toast({
        title: "Configuration Error",
        description: "Supabase is not properly configured. Please check the console for more information.",
        variant: "destructive",
        duration: 6000,
      });
      return;
    }

    // Check active sessions and get user
    const fetchUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error fetching session:", error);
          return;
        }
        
        if (session?.user) {
          setUser(session.user);
          // Get user role from the profiles table
          try {
            const { data, error: roleError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();
              
            if (data) {
              setUserRole(data.role);
            } else if (roleError) {
              console.error("Error fetching user role:", roleError);
            }
          } catch (err) {
            console.error("Error getting user role:", err);
          }
        }
      } catch (err) {
        console.error("Error in fetchUser:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    try {
      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            setUser(session.user);
            // Get user role
            try {
              const { data } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single();
                
              if (data) {
                setUserRole(data.role);
              }
            } catch (err) {
              console.error("Error getting user role on auth change:", err);
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            setUserRole(null);
          }
          
          setLoading(false);
        }
      );

      return () => {
        subscription?.unsubscribe();
      };
    } catch (err) {
      console.error("Error setting up auth state change listener:", err);
      setLoading(false);
    }
  }, [toast]);

  const login = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Logged in successfully",
        description: "Welcome to JimPortal",
      });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (email, password, firstName, lastName, role) => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });
      
      if (authError) {
        toast({
          title: "Registration failed",
          description: authError.message,
          variant: "destructive",
        });
        return false;
      }
      
      // Create profile record with role
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            first_name: firstName,
            last_name: lastName,
            email,
            role
          });
          
        if (profileError) {
          console.error("Error creating profile:", profileError);
          toast({
            title: "Profile creation failed",
            description: "Your account was created, but profile setup failed. Please contact support.",
            variant: "destructive",
          });
        }
      }
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "See you soon!",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        configError,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
