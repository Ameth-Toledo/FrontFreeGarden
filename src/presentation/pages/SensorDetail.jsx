 import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardBody,
    Heading,
    Text,
    Stack,
    Flex,
    IconButton,
    Progress,
    HStack,
    VStack,
    Badge,
    Divider,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
    useColorModeValue,
} from '@chakra-ui/react';
import { FiArrowLeft, FiDroplet, FiThermometer, FiActivity, FiSettings } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

// Datos simulados de sensores
const sensorData = {
    id: response.data.id,  
    name: response.data.name,
    email: response.data.email,
    token: response.data.token
};

localStorage.setItem('freeGardenUser', JSON.stringify(userData));
setUser(userData);

const SensorDetail = () => {
    const { user } = useAuth();
    const { id: sensorId } = useParams();
    const navigate = useNavigate();
    const [sensor, setSensor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const bgColor = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    // Función para formatear fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    // Simulación de carga de datos del sensor
    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            const sensorInfo = sensorData[sensorId];
            if (sensorInfo) {
                setSensor(sensorInfo);
                setError(null);
            } else {
                setError('Sensor no encontrado');
            }
            setLoading(false);
        }, 500);
    }, [sensorId]);

    // Obtener el color según el valor de humedad
    const getHumidityColor = (value) => {
        if (value < 40) return "orange.500";
        if (value < 60) return "yellow.500";
        if (value < 80) return "green.500";
        return "blue.500";
    };

    // Obtener el color según el valor de temperatura
    const getTemperatureColor = (value) => {
        if (value < 15) return "blue.500";
        if (value < 22) return "green.500";
        if (value < 28) return "yellow.500";
        return "orange.500";
    };

    if (loading) {
        return (
            <Box p={4} textAlign="center">
                <Text>Cargando información del sensor...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={4}>
            <Text>Usuario Logueado ID: {user?.id}</Text> 
            <Card bg={bgColor} borderColor={borderColor}>
                <CardBody>
                    <Text>Nombre del Sensor: {sensor?.name}</Text>
                    <Text>Ubicación: {sensor?.location}</Text>
                    <Text>Última lectura: {formatDate(sensor?.lastReading)}</Text>
                </CardBody>
            </Card>
        </Box>
        );
    }

    return (
        <Box p={4}>
            <Flex align="center" mb={6}>
                <IconButton
                    icon={<FiArrowLeft />}
                    aria-label="Volver"
                    mr={4}
                    onClick={() => navigate('/dashboard')}
                />
                <Heading as="h1" size="lg">
                    {sensor.name}
                </Heading>
            </Flex>

            <Stack spacing={6}>
                {/* Información general del sensor */}
                <Card bg={bgColor} borderColor={borderColor}>
                    <CardBody>
                        <Flex flexDirection={{ base: "column", md: "row" }} gap={6}>
                            <Box flex={1}>
                                <Text fontWeight="medium" fontSize="lg" mb={4}>
                                    Información del Sensor
                                </Text>
                                <VStack align="start" spacing={3}>
                                    <Flex justify="space-between" w="full">
                                        <Text color="text.secondary">Tipo:</Text>
                                        <Text fontWeight="medium">{sensor.type}</Text>
                                    </Flex>
                                    <Flex justify="space-between" w="full">
                                        <Text color="text.secondary">Ubicación:</Text>
                                        <Text fontWeight="medium">{sensor.location}</Text>
                                    </Flex>
                                    <Flex justify="space-between" w="full">
                                        <Text color="text.secondary">Estado:</Text>
                                        <Badge colorScheme={sensor.status === 'active' ? 'green' : 'red'}>
                                            {sensor.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </Flex>
                                    <Flex justify="space-between" w="full">
                                        <Text color="text.secondary">Última lectura:</Text>
                                        <Text fontWeight="medium">{formatDate(sensor.lastReading)}</Text>
                                    </Flex>
                                </VStack>
                            </Box>

                            <Divider orientation='vertical' />

                            <Box flex={1}>
                                <Text fontWeight="medium" fontSize="lg" mb={4}>
                                    Estado actual
                                </Text>

                                <Stack spacing={4}>
                                    <Box>
                                        <Flex justify="space-between" mb={1}>
                                            <HStack>
                                                <FiDroplet />
                                                <Text>Humedad</Text>
                                            </HStack>
                                            <Text fontWeight="medium" color={getHumidityColor(sensor.humidity)}>
                                                {sensor.humidity}%
                                            </Text>
                                        </Flex>
                                        <Progress
                                            value={sensor.humidity}
                                            size="sm"
                                            colorScheme={getHumidityColor(sensor.humidity).split('.')[0]}
                                            borderRadius="full"
                                        />
                                    </Box>

                                    {sensor.temperature !== null && (
                                        <Box>
                                            <Flex justify="space-between" mb={1}>
                                                <HStack>
                                                    <FiThermometer />
                                                    <Text>Temperatura</Text>
                                                </HStack>
                                                <Text fontWeight="medium" color={getTemperatureColor(sensor.temperature)}>
                                                    {sensor.temperature}°C
                                                </Text>
                                            </Flex>
                                            <Progress
                                                value={(sensor.temperature / 40) * 100}
                                                size="sm"
                                                colorScheme={getTemperatureColor(sensor.temperature).split('.')[0]}
                                                borderRadius="full"
                                            />
                                        </Box>
                                    )}

                                    <Box>
                                        <Flex justify="space-between" mb={1}>
                                            <Text>Batería</Text>
                                            <Text fontWeight="medium">{sensor.battery}%</Text>
                                        </Flex>
                                        <Progress
                                            value={sensor.battery}
                                            size="sm"
                                            colorScheme={sensor.battery > 20 ? "green" : "red"}
                                            borderRadius="full"
                                        />
                                    </Box>
                                </Stack>
                            </Box>
                        </Flex>
                    </CardBody>
                </Card>

                {/* Pestañas para histórico y configuración */}
                <Card bg={bgColor} borderColor={borderColor}>
                    <CardBody>
                        <Tabs colorScheme="brand" variant="enclosed">
                            <TabList>
                                <Tab><HStack><FiActivity /><Text>Histórico</Text></HStack></Tab>
                                <Tab><HStack><FiSettings /><Text>Configuración</Text></HStack></Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <Text fontWeight="medium" fontSize="lg" mb={4}>
                                        Historial de lecturas
                                    </Text>

                                    <Stack spacing={4}>
                                        {sensor.readings.map((reading, index) => (
                                            <Box
                                                key={index}
                                                p={4}
                                                borderRadius="md"
                                                borderWidth="1px"
                                                borderColor={borderColor}
                                            >
                                                <Flex justify="space-between" align="center" mb={2}>
                                                    <Text fontWeight="medium">{formatDate(reading.timestamp)}</Text>
                                                </Flex>
                                                <Flex gap={6}>
                                                    <Stat>
                                                        <StatLabel>Humedad</StatLabel>
                                                        <StatNumber>{reading.humidity}%</StatNumber>
                                                        <StatHelpText>
                                                            {reading.humidity > 60 ? "Óptima" : "Baja"}
                                                        </StatHelpText>
                                                    </Stat>

                                                    {reading.temperature !== null && (
                                                        <Stat>
                                                            <StatLabel>Temperatura</StatLabel>
                                                            <StatNumber>{reading.temperature}°C</StatNumber>
                                                            <StatHelpText>
                                                                {reading.temperature < 28 ? "Normal" : "Alta"}
                                                            </StatHelpText>
                                                        </Stat>
                                                    )}
                                                </Flex>
                                            </Box>
                                        ))}
                                    </Stack>
                                </TabPanel>

                                <TabPanel>
                                    <Text fontWeight="medium" fontSize="lg" mb={4}>
                                        Configuración del sensor
                                    </Text>

                                    <Stack spacing={4}>
                                        <Box p={4} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                                            <Text fontWeight="medium" mb={2}>Umbrales de alerta</Text>
                                            <VStack align="start" spacing={2}>
                                                <Flex justify="space-between" w="full">
                                                    <Text>Humedad mínima</Text>
                                                    <Text fontWeight="medium">40%</Text>
                                                </Flex>
                                                <Flex justify="space-between" w="full">
                                                    <Text>Humedad máxima</Text>
                                                    <Text fontWeight="medium">80%</Text>
                                                </Flex>
                                                {sensor.temperature !== null && (
                                                    <>
                                                        <Flex justify="space-between" w="full">
                                                            <Text>Temperatura mínima</Text>
                                                            <Text fontWeight="medium">15°C</Text>
                                                        </Flex>
                                                        <Flex justify="space-between" w="full">
                                                            <Text>Temperatura máxima</Text>
                                                            <Text fontWeight="medium">30°C</Text>
                                                        </Flex>
                                                    </>
                                                )}
                                            </VStack>
                                        </Box>

                                        <Box p={4} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                                            <Text fontWeight="medium" mb={2}>Configuración de notificaciones</Text>
                                            <VStack align="start" spacing={2}>
                                                <Flex justify="space-between" w="full">
                                                    <Text>Alertas por correo</Text>
                                                    <Badge colorScheme="green">Activadas</Badge>
                                                </Flex>
                                                <Flex justify="space-between" w="full">
                                                    <Text>Frecuencia de reportes</Text>
                                                    <Text fontWeight="medium">Diaria</Text>
                                                </Flex>
                                            </VStack>
                                        </Box>

                                        <Box p={4} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                                            <Text fontWeight="medium" mb={2}>Información del dispositivo</Text>
                                            <VStack align="start" spacing={2}>
                                                <Flex justify="space-between" w="full">
                                                    <Text>Versión de firmware</Text>
                                                    <Text fontWeight="medium">2.3.5</Text>
                                                </Flex>
                                                <Flex justify="space-between" w="full">
                                                    <Text>Último mantenimiento</Text>
                                                    <Text fontWeight="medium">01/03/2025</Text>
                                                </Flex>
                                                <Flex justify="space-between" w="full">
                                                    <Text>Número de serie</Text>
                                                    <Text fontWeight="medium">SN-2025-00123</Text>
                                                </Flex>
                                            </VStack>
                                        </Box>

                                        <Flex justify="flex-end" gap={3}>
                                            <Button variant="outline">Restablecer</Button>
                                            <Button colorScheme="brand">Guardar cambios</Button>
                                        </Flex>
                                    </Stack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </CardBody>
                </Card>
            </Stack>
        </Box>
    );
};

export default SensorDetail;