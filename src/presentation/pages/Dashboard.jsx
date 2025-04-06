import {
    Box,
    Grid,
    Heading,
    Text,
    Flex,
    Card,
    CardBody,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Icon,
    SimpleGrid,
    Progress,
    HStack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    FiDroplet,
    FiThermometer,
    FiWifi,
    FiPower,
    FiAlertCircle,
    FiCalendar
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

// Componente para las tarjetas de estado
const StatCard = ({ title, value, icon, helpText, color = "brand.500", onClick }) => {
    const cardBg = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    return (
        <Card
            bg={cardBg}
            borderColor={borderColor}
            boxShadow="sm"
            transition="transform 0.2s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
            cursor={onClick ? "pointer" : "default"}
            onClick={onClick}
        >
            <CardBody>
                <Flex justify="space-between" align="center">
                    <Stat>
                        <StatLabel color="text.secondary">{title}</StatLabel>
                        <StatNumber fontSize="3xl">{value}</StatNumber>
                        {helpText && (
                            <StatHelpText>
                                {helpText}
                            </StatHelpText>
                        )}
                    </Stat>
                    <Flex
                        w="56px"
                        h="56px"
                        align="center"
                        justify="center"
                        backgroundColor={`${color}20`}
                        borderRadius="lg"
                    >
                        <Icon as={icon} color={color} boxSize={6} />
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
};

const Dashboard = () => {
    const { user } = useAuth();
    const [isIrrigationActive, setIsIrrigationActive] = useState(false);

    // Obtener el nombre del usuario de manera segura
    const userName = user?.name || 'Usuario';

    // Función para cambiar el estado de riego
    const toggleIrrigation = () => {
        setIsIrrigationActive(!isIrrigationActive);
    };

    // Colores según el tema
    const cardBg = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    return (
        <Box p={4}>
            {/* Cabecera */}
            <Box mb={8}>
                <Heading as="h1" size="xl" mb={2}>
                    Bienvenido a Free Garden, {userName}
                </Heading>
                <Text color="text.secondary">
                    Monitorea y controla tu sistema de riego automático
                </Text>
            </Box>

            {/* Tarjetas de estadísticas */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={8}>
                <StatCard
                    title="Humedad del suelo"
                    value="65%"
                    helpText="Nivel óptimo"
                    icon={FiDroplet}
                    color="accent.500"
                />
                <StatCard
                    title="Temperatura"
                    value="24°C"
                    helpText="Normal"
                    icon={FiThermometer}
                    color="orange.500"
                />
                <StatCard
                    title="Nivel de agua"
                    value="85%"
                    helpText="Depósito"
                    icon={FiDroplet}
                    color="blue.500"
                />
                <StatCard
                    title="Conectividad"
                    value="Estable"
                    helpText="Últimas 24h"
                    icon={FiWifi}
                    color="green.500"
                />
            </SimpleGrid>

            {/* Contenido principal */}
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
                {/* Panel izquierdo - Ahora con Historial de riego */}
                <Box>
                    {/* Historial de riegos - Ahora ubicado donde antes estaba el Estado del riego */}
                    <Card bg={cardBg} borderColor={borderColor} h="100%">
                        <CardBody>
                            <Heading as="h3" size="md" mb={4}>
                                Historial de riego
                            </Heading>

                            <Box>
                                {[
                                    { date: "Hoy, 10:30 AM", duration: "5 minutos", automatic: true },
                                    { date: "Ayer, 06:15 PM", duration: "7 minutos", automatic: true },
                                    { date: "11/03/2025, 08:45 AM", duration: "10 minutos", automatic: false },
                                    { date: "10/03/2025, 07:20 PM", duration: "6 minutos", automatic: true },
                                ].map((item, idx) => (
                                    <Flex
                                        key={idx}
                                        justify="space-between"
                                        align="center"
                                        p={3}
                                        borderBottom={idx < 3 ? "1px solid" : "none"}
                                        borderColor={borderColor}
                                    >
                                        <HStack spacing={3}>
                                            <Icon as={FiCalendar} color="brand.500" />
                                            <Box>
                                                <Text fontWeight="medium">{item.date}</Text>
                                                <Text fontSize="sm" color="text.secondary">
                                                    Duración: {item.duration}
                                                </Text>
                                            </Box>
                                        </HStack>
                                        <Text
                                            fontSize="sm"
                                            bg={item.automatic ? "brand.50" : "gray.100"}
                                            color={item.automatic ? "brand.700" : "gray.600"}
                                            px={2}
                                            py={1}
                                            borderRadius="md"
                                        >
                                            {item.automatic ? "Automático" : "Manual"}
                                        </Text>
                                    </Flex>
                                ))}
                            </Box>
                        </CardBody>
                    </Card>
                </Box>

                {/* Panel derecho - Con Estado de riego (más pequeño) y Alertas debajo */}
                <Box>
                    {/* Estado del riego - Ahora más pequeño y a la derecha */}
                    <Card mb={6} bg={cardBg} borderColor={borderColor}>
                        <CardBody py={4} px={4}>
                            <Flex justify="space-between" align="center" mb={2}>
                                <Heading as="h3" size="md">
                                    Estado del riego
                                </Heading>
                                <Button
                                    size="sm"
                                    colorScheme={isIrrigationActive ? "red" : "brand"}
                                    leftIcon={<Icon as={FiPower} />}
                                    onClick={toggleIrrigation}
                                >
                                    {isIrrigationActive ? "Detener" : "Activar"}
                                </Button>
                            </Flex>

                            <Text fontSize="sm">
                                {isIrrigationActive
                                    ? "El sistema de riego está activo. El agua está fluyendo hacia tus plantas."
                                    : "El sistema de riego está en espera. Se activará automáticamente cuando la humedad sea baja."}
                            </Text>
                        </CardBody>
                    </Card>

                    {/* Alertas - Ahora debajo del Estado de riego */}
                    <Card bg={cardBg} borderColor={borderColor}>
                        <CardBody>
                            <Heading as="h3" size="md" mb={4}>
                                Alertas
                            </Heading>

                            <Box>
                                <HStack
                                    p={4}
                                    bg="yellow.50"
                                    borderRadius="md"
                                    borderLeft="4px solid"
                                    borderColor="yellow.400"
                                    color="yellow.800"
                                    mb={3}
                                >
                                    <Icon as={FiAlertCircle} />
                                    <Text>La temperatura está subiendo. Considera mover las plantas a la sombra.</Text>
                                </HStack>

                                <HStack
                                    p={4}
                                    bg="blue.50"
                                    borderRadius="md"
                                    borderLeft="4px solid"
                                    borderColor="blue.400"
                                    color="blue.800"
                                >
                                    <Icon as={FiDroplet} />
                                    <Text>El nivel de agua en el depósito está por encima del 80%.</Text>
                                </HStack>
                            </Box>
                        </CardBody>
                    </Card>
                </Box>
            </Grid>
        </Box>
    );
};

export default Dashboard;