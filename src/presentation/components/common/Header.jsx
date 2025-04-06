import {
    Box,
    Flex,
    IconButton,
    Avatar,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    HStack,
    useColorMode,
    useColorModeValue,
    Tooltip
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiSettings, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onMenuOpen }) => {
    const { user, logout } = useAuth();
    const { colorMode, toggleColorMode } = useColorMode();

    const bgColor = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.08)');

    // Generar iniciales del nombre de usuario
    const getUserInitials = () => {
        if (!user?.name) return "U";
        return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            py={2}
            px={4}
            bg={bgColor}
            borderBottom="1px solid"
            borderColor={borderColor}
            h="60px"
            boxShadow="sm"
        >
            {/* Left section - Logo and hamburger menu */}
            <HStack spacing={4}>
                <IconButton
                    icon={<FiMenu />}
                    variant="ghost"
                    onClick={onMenuOpen}
                    display={{ base: 'flex', lg: 'none' }}
                    aria-label="Abrir menú"
                />
                <Text
                    fontSize="xl"
                    fontWeight="bold"
                    bgGradient="linear(to-r, brand.500, accent.500)"
                    bgClip="text"
                >
                    Free Garden
                </Text>
            </HStack>

            {/* Right section - User menu */}
            <HStack spacing={4}>

                <Tooltip label="Notificaciones">
                    <Box position="relative">
                        <IconButton
                            aria-label="Notificaciones"
                            icon={<FiBell />}
                            variant="ghost"
                        />
                        {/* Notification badge */}
                        <Box
                            position="absolute"
                            top={1}
                            right={1}
                            px={1}
                            py={0.5}
                            fontSize="xs"
                            fontWeight="bold"
                            lineHeight="none"
                            color="white"
                            bg="red.500"
                            borderRadius="full"
                            transform="translate(25%, -25%)"
                        >
                            2
                        </Box>
                    </Box>
                </Tooltip>

                <Menu>
                    <MenuButton
                        as={Box}
                        rounded="full"
                        cursor="pointer"
                    >
                        <HStack>
                            <Avatar
                                size="sm"
                                name={user?.name || "Usuario"}
                                bg="brand.500"
                                color="white"
                            >
                                {getUserInitials()}
                            </Avatar>
                            <Text display={{ base: 'none', md: 'block' }}>
                                {user?.name || "Usuario"}
                            </Text>
                        </HStack>
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={<FiSettings />}>Configuración</MenuItem>
                        <MenuDivider />
                        <MenuItem
                            icon={<FiLogOut />}
                            onClick={logout}
                        >
                            Cerrar Sesión
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Flex>
    );
};

export default Header;