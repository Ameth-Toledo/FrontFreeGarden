import { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Card,
    CardBody,
    Flex,
    HStack,
    Select,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Stat,
    StatHelpText,
    StatArrow,
    useColorModeValue,
    Icon,
} from '@chakra-ui/react';
import { FiActivity } from 'react-icons/fi';
Select
// Este componente es un placeholder para lo que sería un gráfico real
// En producción, usaríamos una librería como Chart.js o recharts
const ChartPlaceholder = ({ title, height = "300px" }) => {
    const bgPlaceholder = useColorModeValue("gray.100", "gray.700");
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)');

    return (
        <Box>
            <Text fontWeight="medium" mb={2}>{title}</Text>
            <Flex
                height={height}
                bg={bgPlaceholder}
                borderRadius="md"
                justify="center"
                align="center"
                borderWidth="1px"
                borderColor={borderColor}
                flexDirection="column"
            >
                <Icon as={FiActivity} fontSize="3xl" mb={2} />
                <Text>Gráfico de {title}</Text>
                <Text fontSize="sm" mt={1} maxW="80%" textAlign="center">
                    En producción, aquí se mostraría un gráfico interactivo con datos históricos
                </Text>
            </Flex>
        </Box>
    );
};

const StatCard = ({ title, value, icon, change, period, color = "brand.500" }) => {
    const cardBg = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    return (
        <Card bg={cardBg} borderColor={borderColor} boxShadow="sm">
            <CardBody>
                <Flex justify="space-between" align="center">
                    <HStack spacing={3}>
                        <Flex
                            w="40px"
                            h="40px"
                            align="center"
                            justify="center"
                            backgroundColor={`${color}20`}
                            borderRadius="lg"
                        >
                            <Icon as={icon} color={color} boxSize={5} />
                        </Flex>
                        <Box>
                            <Text color="text.secondary" fontSize="sm">{title}</Text>
                            <Text fontSize="2xl" fontWeight="bold">{value}</Text>
                        </Box>
                    </HStack>

                    {change && (
                        <Stat textAlign="right">
                            <StatHelpText mb={0}>
                                <StatArrow type={change > 0 ? 'increase' : 'decrease'} />
                                {Math.abs(change)}% {period}
                            </StatHelpText>
                        </Stat>
                    )}
                </Flex>
            </CardBody>
        </Card>
    );
};

const Statistics = () => {
    const [period, setPeriod] = useState('month');
    const cardBg = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    return (
        <Box p={4}>
            <Box mb={6}>
                <Heading as="h1" size="xl" mb={2}>
                    Estadísticas
                </Heading>
                <Text color="text.secondary">
                    Monitorea las tendencias y el rendimiento de tu sistema de riego
                </Text>
            </Box>



            <Card bg={cardBg} borderColor={borderColor} mb={8}>
                <CardBody>
                    <Tabs colorScheme="brand" variant="enclosed">
                        <TabList>
                            <Tab>Humedad</Tab>
                            <Tab>Temperatura</Tab>
                            <Tab>Consumo de agua</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel px={0}>
                                <ChartPlaceholder title="Niveles de Humedad" height="400px" />
                            </TabPanel>
                            <TabPanel px={0}>
                                <ChartPlaceholder title="Temperatura" height="400px" />
                            </TabPanel>
                            <TabPanel px={0}>
                                <ChartPlaceholder title="Consumo de Agua" height="400px" />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>
        </Box>
    );
};

export default Statistics;