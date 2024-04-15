import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';

import { AuthContext } from '../context/AuthContext';

const pages = [{ name: 'Home', href: '/' }];

export function NavBar() {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const { isAuthenticated } = useContext(AuthContext);

	const settings = [
		
		{
			name: 'Dashboard',
			action: '/dashboard',
		},
		{
			name: 'Logout',
			action: '/',
		},
	];

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon
						sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page, index) => (
								<MenuItem
									key={index}
									onClick={handleCloseNavMenu}
								>
									<Link to={page.href}>{page.name}</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<AdbIcon
						sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
						}}
					>
						{pages.map((page, index) => (
							<Link
								to={page.href}
								key={index}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page.name}
							</Link>
						))}
					</Box>

					{isAuthenticated ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}
								>
									<Avatar alt="Remy Sharp" src="" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem
										key={setting.name}
										onClick={() => {
											if (
												typeof setting.action !==
												'string'
											) {
												setting.action();
											}
											handleCloseUserMenu();
										}}
									>
										<Typography textAlign="center">
											{typeof setting.action ===
											'string' ? (
												<Link to={setting.action}>
													{setting.name}
												</Link>
											) : (
												setting.name
											)}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					) : (
						<Button
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							<Link to={'/signup'}>Register</Link>
						</Button>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
