import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
	title: 'SnippetLand',
	description: 'Discover and share code snippets',
	// icons: {
	// 	icon: {
	// 		url: '/favicon.ico',
	// 		type: 'image/svg',
	// 	},
	// },
};

const RootLayout = ({ children }) => (
	<html lang='en'>
		<body suppressHydrationWarning={true}>
			<Provider>
				<div className='main'>
					<div className='gradient' />
				</div>

				<main className='app'>
					<Nav />
					{children}
				</main>
			</Provider>
		</body>
	</html>
);

export default RootLayout;
