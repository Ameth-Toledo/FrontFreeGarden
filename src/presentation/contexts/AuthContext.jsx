import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Verificar si hay un usuario almacenado en localStorage al inicio
    useEffect(() => {
        const storedUser = localStorage.getItem('freeGardenUser');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('freeGardenUser');
            }
        }
        setLoading(false);
    }, []);

    // Función para iniciar sesión
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/login', {
                email,
                password
            });
    
            const userData = response.data;
    
            // Guarda los datos del usuario (puede incluir token)
            localStorage.setItem('freeGardenUser', JSON.stringify(userData));
            setUser(userData);
    
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
    
            const message = error.response?.data?.message || 'Error al iniciar sesión';
    
            return {
                success: false,
                message
            };
        }
    };

    // Función para registrar un nuevo usuario
    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8080/clients', {
                name: userData.name,
                lastName: userData.lastName,
                password: userData.password,
                email: userData.email,
                age: userData.age, // ← Aquí solo asegúrate que esto sea un número
                backupEmail: userData.backupEmail,
                esp32Serial: userData.esp32Serial
            });
    
            return {
                success: true,
                message: 'Usuario registrado correctamente',
                data: response.data
            };
        } catch (error) {
            console.error('Register error:', error);
    
            const message = error.response?.data?.message || 'Error al registrar usuario';
    
            return {
                success: false,
                message
            };
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('freeGardenUser');
        setUser(null);
        navigate('/login');
    };

    // Verificar si el usuario está autenticado
    const isAuthenticated = () => {
        return !!user;
    };

    // Valor del contexto
    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};