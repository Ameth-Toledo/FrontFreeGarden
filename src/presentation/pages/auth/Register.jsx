import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    FormControl,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    FormErrorMessage,
    Alert,
    AlertIcon,
    Link,
    VStack,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        backupEmail: '',
        password: '',
        confirmPassword: '',
        age: '',
        esp32Serial: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();
    const { register } = useAuth();

    // Manejador para los cambios en los inputs
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Validar el formulario
    const validateForm = () => {
        const errors = {};

        if (!formData.nombre) {
            errors.nombre = 'El nombre es requerido';
        }

        if (!formData.apellido) {
            errors.apellido = 'El apellido es requerido';
        }

        if (!formData.email) {
            errors.email = 'El correo electrónico es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'El correo electrónico no es válido';
        }

        if (!formData.backupEmail) {
            errors.backupEmail = 'El correo de recuperación es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.backupEmail)) {
            errors.backupEmail = 'El correo de recuperación no es válido';
        }

        if (!formData.password) {
            errors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Confirma tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        if (!formData.age) {
            errors.age = 'La edad es requerida';
        } else if (isNaN(formData.age) || parseInt(formData.age) < 13) {
            errors.age = 'Debes tener al menos 13 años';
        }

        if (!formData.esp32Serial) {
            errors.esp32Serial = 'El número de serie ESP32 es requerido';
        }  

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setError('');

        try {
            // Preparar los datos para el registro
            const userData = {
                name: formData.nombre,
                lastName: formData.apellido,
                email: formData.email,
                password: formData.password,
                backupEmail: formData.backupEmail,
                esp32Serial: formData.esp32Serial, 
                age: parseInt(formData.age) 
            };

            // Llamar a la función register
            const result = await register(userData);

            if (result.success) {
                // Redireccionar al login
                navigate('/login');
            } else {
                setError(result.message || 'Error al registrar. Intenta de nuevo.');
            }
        } catch (error) {
            setError('Ocurrió un error durante el registro');
            console.error('Register error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <MotionBox
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            w={{ base: "90%", sm: "550px" }}
            mx="auto"
        >
            <MotionFlex
                variants={itemVariants}
                mb={8}
                align="center"
            >
                <Box
                    as="button"
                    bg="transparent"
                    border="none"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="gray.500"
                    p={2}
                    borderRadius="full"
                    _hover={{
                        color: "white",
                        bg: "rgba(255, 255, 255, 0.1)"
                    }}
                    onClick={() => navigate('/login')}
                    mr={4}
                >
                    <FiArrowLeft size={20} />
                </Box>

                <Box>
                    <Text
                        bgGradient="linear(to-r, #4CAF50, #2196F3)"
                        bgClip="text"
                        fontSize="2xl"
                        fontWeight="extrabold"
                        letterSpacing="tight"
                    >
                        Free Garden
                    </Text>
                    <Heading
                        as="h1"
                        size="lg"
                        color="white"
                        fontWeight="thin"
                        letterSpacing="tight"
                    >
                        Crear cuenta
                    </Heading>
                </Box>
            </MotionFlex>

            {error && (
                <MotionBox variants={itemVariants} mb={6}>
                    <Alert status="error" borderRadius="md" bg="rgba(229, 62, 62, 0.2)" border="1px solid" borderColor="red.500" color="white">
                        <AlertIcon color="red.500" />
                        {error}
                    </Alert>
                </MotionBox>
            )}

            <MotionBox variants={itemVariants}>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={6}>
                        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} w="full">
                            <GridItem>
                                <FormControl isInvalid={!!formErrors.nombre}>
                                    <Input
                                        id="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        placeholder="Nombre"
                                        variant="unstyled"
                                        p={4}
                                        bg="rgba(255, 255, 255, 0.05)"
                                        border="none"
                                        borderBottom="2px solid"
                                        borderColor="rgba(255, 255, 255, 0.2)"
                                        borderRadius="4px 4px 0 0"
                                        color="white"
                                        _placeholder={{ color: 'gray.500' }}
                                        _hover={{ borderColor: "rgba(76, 175, 80, 0.5)" }}
                                        _focus={{
                                            borderColor: "#4CAF50",
                                            bg: "rgba(255, 255, 255, 0.07)"
                                        }}
                                        fontSize="md"
                                        h="56px"
                                    />
                                    <FormErrorMessage>{formErrors.nombre}</FormErrorMessage>
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl isInvalid={!!formErrors.apellido}>
                                    <Input
                                        id="apellido"
                                        value={formData.apellido}
                                        onChange={handleChange}
                                        placeholder="Apellido"
                                        variant="unstyled"
                                        p={4}
                                        bg="rgba(255, 255, 255, 0.05)"
                                        border="none"
                                        borderBottom="2px solid"
                                        borderColor="rgba(255, 255, 255, 0.2)"
                                        borderRadius="4px 4px 0 0"
                                        color="white"
                                        _placeholder={{ color: 'gray.500' }}
                                        _hover={{ borderColor: "rgba(76, 175, 80, 0.5)" }}
                                        _focus={{
                                            borderColor: "#4CAF50",
                                            bg: "rgba(255, 255, 255, 0.07)"
                                        }}
                                        fontSize="md"
                                        h="56px"
                                    />
                                    <FormErrorMessage>{formErrors.apellido}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </Grid>

                        <FormControl isInvalid={!!formErrors.email}>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Correo electrónico"
                                variant="unstyled"
                                p={4}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="none"
                                borderBottom="2px solid"
                                borderColor="rgba(255, 255, 255, 0.2)"
                                borderRadius="4px 4px 0 0"
                                color="white"
                                _placeholder={{ color: 'gray.500' }}
                                _hover={{ borderColor: "rgba(76, 175, 80, 0.5)" }}
                                _focus={{
                                    borderColor: "#4CAF50",
                                    bg: "rgba(255, 255, 255, 0.07)"
                                }}
                                fontSize="md"
                                h="56px"
                            />
                            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!formErrors.backupEmail}>
                            <Input
                                id="backupEmail"
                                type="email"
                                value={formData.backupEmail}
                                onChange={handleChange}
                                placeholder="Correo electrónico de recuperacion"
                                variant="unstyled"
                                p={4}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="none"
                                borderBottom="2px solid"
                                borderColor="rgba(255, 255, 255, 0.2)"
                                borderRadius="4px 4px 0 0"
                                color="white"
                                _placeholder={{ color: 'gray.500' }}
                                _hover={{ borderColor: "rgba(76, 175, 80, 0.5)" }}
                                _focus={{
                                    borderColor: "#4CAF50",
                                    bg: "rgba(255, 255, 255, 0.07)"
                                }}
                                fontSize="md"
                                h="56px"
                            />
                            <FormErrorMessage>{formErrors.backupEmail}</FormErrorMessage>
                        </FormControl>

                        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} w="full">
                            <GridItem>
                                <FormControl isInvalid={!!formErrors.password}>
                                    <InputGroup>
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Contraseña"
                                            variant="unstyled"
                                            p={4}
                                            bg="rgba(255, 255, 255, 0.05)"
                                            border="none"
                                            borderBottom="2px solid"
                                            borderColor="rgba(255, 255, 255, 0.2)"
                                            borderRadius="4px 4px 0 0"
                                            color="white"
                                            _placeholder={{ color: 'gray.500' }}
                                            _hover={{ borderColor: "rgba(76, 175, 80, 0.5)" }}
                                            _focus={{
                                                borderColor: "#4CAF50",
                                                bg: "rgba(255, 255, 255, 0.07)"
                                            }}
                                            fontSize="md"
                                            h="56px"
                                        />
                                        <InputRightElement h="56px">
                                            <Box
                                                as="button"
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                color="gray.500"
                                                _hover={{ color: "white" }}
                                                bg="transparent"
                                                border="none"
                                            >
                                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                            </Box>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{formErrors.password}</FormErrorMessage>
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl isInvalid={!!formErrors.confirmPassword}>
                                    <InputGroup>
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirmar contraseña"
                                            variant="unstyled"
                                            p={4}
                                            bg="rgba(255, 255, 255, 0.05)"
                                            border="none"
                                            borderBottom="2px solid"
                                            borderColor="rgba(255, 255, 255, 0.2)"
                                            borderRadius="4px 4px 0 0"
                                            color="white"
                                            _placeholder={{ color: 'gray.500' }}
                                            _hover={{ borderColor: "rgba(76, 175, 80, 0.5)" }}
                                            _focus={{
                                                borderColor: "#4CAF50",
                                                bg: "rgba(255, 255, 255, 0.07)"
                                            }}
                                            fontSize="md"
                                            h="56px"
                                        />
                                        <InputRightElement h="56px">
                                            <Box
                                                as="button"
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                color="gray.500"
                                                _hover={{ color: "white" }}
                                                bg="transparent"
                                                border="none"
                                            >
                                                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                            </Box>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{formErrors.confirmPassword}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={!!formErrors.age}>
                                    <Input
                                    id="age"
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="Edad"
                                    variant="unstyled"
                                    p={4}
                                    bg="rgba(255, 255, 255, 0.05)"
                                    border="none"
                                    borderBottom="2px solid"
                                    borderColor="rgba(255, 255, 255, 0.2)"
                                    borderRadius="4px 4px 0 0"
                                    color="white"
                                    _placeholder={{ color: 'gray.500' }}
                                    _hover={{ borderColor: "rgba(76, 175, 80, 0.5)" }}
                                    _focus={{
                                        borderColor: "#4CAF50",
                                        bg: "rgba(255, 255, 255, 0.07)"
                                    }}
                                    fontSize="md"
                                    h="56px"
                                    />
                                    <FormErrorMessage>{formErrors.age}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={!!formErrors.esp32Serial}>
                                    <Input
                                    id="esp32Serial"
                                    name="esp32Serial"
                                    type="text"
                                    value={formData.esp32Serial}
                                    onChange={handleChange}
                                    placeholder="Numero de serie"
                                    variant="unstyled"
                                    p={4}
                                    bg="rgba(255, 255, 255, 0.05)"
                                    border="none"
                                    borderBottom="2px solid"
                                    borderColor="rgba(255, 255, 255, 0.2)"
                                    borderRadius="4px 4px 0 0"
                                    color="white"
                                    _placeholder={{ color: 'gray.500' }}
                                    _hover={{ borderColor: "rgba(76, 175, 80, 0.5)" }}
                                    _focus={{
                                        borderColor: "#4CAF50",
                                        bg: "rgba(255, 255, 255, 0.07)"
                                    }}
                                    fontSize="md"
                                    h="56px"
                                    />
                                    <FormErrorMessage>{formErrors.esp32Serial}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </Grid>

                        <MotionBox
                            variants={itemVariants}
                            w="full"
                            mt={4}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                w="full"
                                h="56px"
                                bg="#4CAF50"
                                color="white"
                                fontWeight="medium"
                                fontSize="md"
                                _hover={{ bg: '#3B8C3F' }}
                                _active={{ bg: '#2D682F' }}
                                _focus={{ boxShadow: 'none' }}
                                borderRadius="4px"
                                rightIcon={<FiArrowRight />}
                            >
                                Registrarse
                            </Button>
                        </MotionBox>

                        <MotionFlex
                            variants={itemVariants}
                            justify="center"
                            align="center"
                            mt={6}
                        >
                            <Text color="gray.500" fontSize="sm">
                                ¿Ya tienes una cuenta?
                            </Text>
                            <Link
                                as={RouterLink}
                                to="/login"
                                color="#4CAF50"
                                fontWeight="medium"
                                ml={2}
                                fontSize="sm"
                                _hover={{ textDecoration: 'none', color: '#3B8C3F' }}
                            >
                                Inicia sesión
                            </Link>
                        </MotionFlex>
                    </VStack>
                </form>
            </MotionBox>
        </MotionBox>
    );
};

export default Register;