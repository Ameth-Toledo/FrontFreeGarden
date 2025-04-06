import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardBody,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Switch,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    FormHelperText,
    Select,
    Flex,
    useToast,
    Divider,
    SimpleGrid,
    useColorModeValue,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    HStack,
    Icon,
} from '@chakra-ui/react';
import {
    FiUser,
    FiSettings,
    FiBell,
    FiDroplet,
    FiThermometer,
    FiClock
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
    const { user } = useAuth();
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        activationCode: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Manejador para los cambios en los inputs
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Guardar cambios del perfil
    const handleSaveProfile = () => {
        toast({
            title: 'Perfil actualizado',
            description: 'Los cambios han sido guardados correctamente.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    // Cambiar contraseña
    const handleChangePassword = () => {
        if (formData.newPassword !== formData.confirmPassword) {
            toast({
                title: 'Error',
                description: 'Las contraseñas no coinciden.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: 'Contraseña actualizada',
            description: 'Tu contraseña ha sido cambiada correctamente.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

        // Limpiar campos
        setFormData({
            ...formData,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    return (
        <Stack spacing={6}>
            <Card>
                <CardBody>
                    <Heading as="h3" size="md" mb={4}>
                        Información Personal
                    </Heading>

                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Correo electrónico</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@ejemplo.com"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Código de Activación</FormLabel>
                            <Input
                                id="activationCode"
                                value={formData.activationCode}
                                onChange={handleChange}
                                placeholder="Código de Activación"
                            />
                            <FormHelperText>
                                Necesario para activar todas las funcionalidades del sistema
                            </FormHelperText>
                        </FormControl>

                        <Button colorScheme="brand" onClick={handleSaveProfile}>
                            Guardar Cambios
                        </Button>
                    </Stack>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Heading as="h3" size="md" mb={4}>
                        Cambiar Contraseña
                    </Heading>

                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>Contraseña actual</FormLabel>
                            <Input
                                id="currentPassword"
                                type="password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                placeholder="Ingresa tu contraseña actual"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Nueva contraseña</FormLabel>
                            <Input
                                id="newPassword"
                                type="password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Ingresa tu nueva contraseña"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Confirmar nueva contraseña</FormLabel>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirma tu nueva contraseña"
                            />
                        </FormControl>

                        <Button colorScheme="brand" onClick={handleChangePassword}>
                            Cambiar Contraseña
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </Stack>
    );
};

const NotificationSettings = () => {
    const [email, setEmail] = useState(true);
    const [sms, setSms] = useState(false);
    const [pushNotif, setPushNotif] = useState(true);
    const toast = useToast();

    const handleSave = () => {
        toast({
            title: 'Configuración guardada',
            description: 'Tus preferencias de notificación han sido actualizadas.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Card>
            <CardBody>
                <Heading as="h3" size="md" mb={4}>
                    Preferencias de Notificación
                </Heading>

                <Stack spacing={4}>
                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="email-alerts" mb="0">
                            Notificaciones por correo
                        </FormLabel>
                        <Switch
                            id="email-alerts"
                            colorScheme="brand"
                            isChecked={email}
                            onChange={() => setEmail(!email)}
                        />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="sms-alerts" mb="0">
                            Notificaciones por SMS
                        </FormLabel>
                        <Switch
                            id="sms-alerts"
                            colorScheme="brand"
                            isChecked={sms}
                            onChange={() => setSms(!sms)}
                        />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="push-alerts" mb="0">
                            Notificaciones push
                        </FormLabel>
                        <Switch
                            id="push-alerts"
                            colorScheme="brand"
                            isChecked={pushNotif}
                            onChange={() => setPushNotif(!pushNotif)}
                        />
                    </FormControl>

                    <Divider my={2} />

                    <FormControl>
                        <FormLabel>Tipos de alertas</FormLabel>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <Box>
                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="humidity-alerts" mb="0" fontSize="sm">
                                        Humedad baja/alta
                                    </FormLabel>
                                    <Switch id="humidity-alerts" colorScheme="brand" defaultChecked />
                                </FormControl>
                            </Box>

                            <Box>
                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="temp-alerts" mb="0" fontSize="sm">
                                        Temperatura extrema
                                    </FormLabel>
                                    <Switch id="temp-alerts" colorScheme="brand" defaultChecked />
                                </FormControl>
                            </Box>

                            <Box>
                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="water-alerts" mb="0" fontSize="sm">
                                        Nivel de agua bajo
                                    </FormLabel>
                                    <Switch id="water-alerts" colorScheme="brand" defaultChecked />
                                </FormControl>
                            </Box>

                            <Box>
                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="battery-alerts" mb="0" fontSize="sm">
                                        Batería baja
                                    </FormLabel>
                                    <Switch id="battery-alerts" colorScheme="brand" defaultChecked />
                                </FormControl>
                            </Box>
                        </SimpleGrid>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Frecuencia de reportes</FormLabel>
                        <Select defaultValue="daily">
                            <option value="hourly">Cada hora</option>
                            <option value="daily">Diario</option>
                            <option value="weekly">Semanal</option>
                            <option value="monthly">Mensual</option>
                        </Select>
                        <FormHelperText>
                            Recibirás reportes de estado del sistema con esta frecuencia
                        </FormHelperText>
                    </FormControl>

                    <Button colorScheme="brand" onClick={handleSave}>
                        Guardar Preferencias
                    </Button>
                </Stack>
            </CardBody>
        </Card>
    );
}; 

const SystemSettings = () => {
    const toast = useToast();
    const [humidityThreshold, setHumidityThreshold] = useState(40);
    const [temperatureThreshold, setTemperatureThreshold] = useState(28);

    const handleSave = () => {
        toast({
            title: 'Configuración guardada',
            description: 'Los parámetros del sistema han sido actualizados.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Stack spacing={6}>
            <Card>
                <CardBody>
                    <Heading as="h3" size="md" mb={4}>
                        Parámetros de Riego
                    </Heading>

                    <Stack spacing={6}>
                        <FormControl>
                            <FormLabel>Umbral mínimo de humedad (%)</FormLabel>
                            <HStack spacing={4}>
                                <Box flex="1">
                                    <Slider
                                        aria-label="Umbral de humedad"
                                        defaultValue={humidityThreshold}
                                        min={20}
                                        max={80}
                                        onChange={(val) => setHumidityThreshold(val)}
                                    >
                                        <SliderMark value={20} mt={2} ml={-2} fontSize="sm">
                                            20%
                                        </SliderMark>
                                        <SliderMark value={40} mt={2} ml={-2} fontSize="sm">
                                            40%
                                        </SliderMark>
                                        <SliderMark value={60} mt={2} ml={-2} fontSize="sm">
                                            60%
                                        </SliderMark>
                                        <SliderMark value={80} mt={2} ml={-2} fontSize="sm">
                                            80%
                                        </SliderMark>
                                        <SliderMark
                                            value={humidityThreshold}
                                            textAlign="center"
                                            bg="brand.500"
                                            color="white"
                                            mt="-8"
                                            ml="-6"
                                            w="12"
                                            fontSize="sm"
                                            borderRadius="md"
                                            p={1}
                                        >
                                            {humidityThreshold}%
                                        </SliderMark>
                                        <SliderTrack>
                                            <SliderFilledTrack bg="brand.500" />
                                        </SliderTrack>
                                        <SliderThumb boxSize={5}>
                                            <Icon as={FiDroplet} color="brand.500" />
                                        </SliderThumb>
                                    </Slider>
                                </Box>
                                <Box w="70px">
                                    <Input
                                        value={humidityThreshold}
                                        onChange={(e) => setHumidityThreshold(parseInt(e.target.value) || 0)}
                                        type="number"
                                        min={20}
                                        max={80}
                                    />
                                </Box>
                            </HStack>
                            <FormHelperText>
                                El riego se activará cuando la humedad del suelo esté por debajo de este valor
                            </FormHelperText>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Umbral máximo de temperatura (°C)</FormLabel>
                            <HStack spacing={4}>
                                <Box flex="1">
                                    <Slider
                                        aria-label="Umbral de temperatura"
                                        defaultValue={temperatureThreshold}
                                        min={15}
                                        max={35}
                                        onChange={(val) => setTemperatureThreshold(val)}
                                    >
                                        <SliderMark value={15} mt={2} ml={-2} fontSize="sm">
                                            15°C
                                        </SliderMark>
                                        <SliderMark value={25} mt={2} ml={-2} fontSize="sm">
                                            25°C
                                        </SliderMark>
                                        <SliderMark value={35} mt={2} ml={-2} fontSize="sm">
                                            35°C
                                        </SliderMark>
                                        <SliderMark
                                            value={temperatureThreshold}
                                            textAlign="center"
                                            bg="orange.500"
                                            color="white"
                                            mt="-8"
                                            ml="-6"
                                            w="12"
                                            fontSize="sm"
                                            borderRadius="md"
                                            p={1}
                                        >
                                            {temperatureThreshold}°C
                                        </SliderMark>
                                        <SliderTrack>
                                            <SliderFilledTrack bg="orange.500" />
                                        </SliderTrack>
                                        <SliderThumb boxSize={5}>
                                            <Icon as={FiThermometer} color="orange.500" />
                                        </SliderThumb>
                                    </Slider>
                                </Box>
                                <Box w="70px">
                                    <Input
                                        value={temperatureThreshold}
                                        onChange={(e) => setTemperatureThreshold(parseInt(e.target.value) || 0)}
                                        type="number"
                                        min={15}
                                        max={35}
                                    />
                                </Box>
                            </HStack>
                            <FormHelperText>
                                Se recomendará reubicar las plantas cuando la temperatura supere este valor
                            </FormHelperText>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Programación de riego</FormLabel>
                            <Select defaultValue="smart">
                                <option value="smart">Inteligente (basado en sensores)</option>
                                <option value="scheduled">Programado (horas fijas)</option>
                                <option value="hybrid">Híbrido</option>
                            </Select>
                        </FormControl>

                        <FormControl display="flex" alignItems="center">
                            <FormLabel htmlFor="water-save-mode" mb="0">
                                Modo de ahorro de agua
                            </FormLabel>
                            <Switch id="water-save-mode" colorScheme="brand" defaultChecked />
                        </FormControl>
                    </Stack>
                </CardBody>
            </Card>



            <Button colorScheme="brand" size="lg" onClick={handleSave}>
                Guardar configuración del sistema
            </Button>
        </Stack>
    );
};

const Settings = () => {
    return (
        <Box p={4}>
            <Box mb={6}>
                <Heading as="h1" size="xl" mb={2}>
                    Configuración
                </Heading>
                <Text color="text.secondary">
                    Administra tu perfil y configura el sistema de riego
                </Text>
            </Box>

            <Tabs colorScheme="brand" isLazy>
                <TabList>
                    <Tab><HStack><Icon as={FiUser} /><Text>Perfil</Text></HStack></Tab>
                    <Tab><HStack><Icon as={FiBell} /><Text>Notificaciones</Text></HStack></Tab>
                    <Tab><HStack><Icon as={FiSettings} /><Text>Sistema</Text></HStack></Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <UserProfile />
                    </TabPanel>
                    <TabPanel>
                        <NotificationSettings />
                    </TabPanel>
                    <TabPanel>
                        <SystemSettings />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Settings;