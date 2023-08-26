'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);
	const [toggleSignIn, setToggleSignIn] = useState(false);
	useEffect(() => {
		(async () => {
			const res = await getProviders();
			setProviders(res);
		})();
	}, []);

	return (
		<nav className='w-full pt-3 mb-16 flex_between'>
			<Link href='/' className='flex gap-2 font-bold flex_center'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={2.5}
					stroke='currentColor'
					className='w-8 h-8 font-bold '>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5'
					/>
				</svg>

				<p className='text-xl md:text-3xl orange_gradient'>SnippetLand</p>
			</Link>

			{/* Desktop Navigation */}
			<div className='hidden md:flex'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href='/create-snippet' className='black_btn'>
							Create Snippet
						</Link>

						<button type='button' onClick={signOut} className='outline_btn'>
							Sign Out
						</button>

						<Link href='/profile'>
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								className='rounded-full'
								alt='profile'
							/>
						</Link>
					</div>
				) : (
					<div className='flex flex-col items-center justify-center bg-white'>
						<button
							onClick={() => setToggleDropdown(!toggleDropdown)}
							className=' black_btn'>
							Sign in
						</button>
						<span className='absolute top-16'>
							{providers &&
								toggleDropdown &&
								Object.values(providers).map((provider) => (
									<button
										type='button'
										key={provider.name}
										onClick={() => {
											signIn(provider.id);
										}}
										className='block mx-auto mb-2 black_btn'>
										{provider.name}
									</button>
								))}
						</span>
					</div>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className='relative flex md:hidden'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src={session?.user.image}
							width={37}
							height={37}
							className='rounded-full'
							alt='profile'
							onClick={() => setToggleDropdown(!toggleDropdown)}
						/>

						{toggleDropdown && (
							<div className='dropdown'>
								<Link
									href='/profile'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}>
									My Profile
								</Link>
								<Link
									href='/create-snippet'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}>
									Create Code Snippet
								</Link>
								<button
									type='button'
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									className='w-full mt-5 black_btn'>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<div className='flex flex-col items-center justify-center bg-white'>
						<button
							onClick={() => setToggleSignIn(!toggleSignIn)}
							className=' black_btn'>
							Sign in
						</button>
						<div className='absolute top-12'>
							{providers &&
								toggleSignIn &&
								Object.values(providers).map((provider) => (
									<button
										type='button'
										key={provider.name}
										onClick={() => {
											signIn(provider.id);
										}}
										className='block mx-auto mb-2 black_btn'>
										{provider.name}
									</button>
								))}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Nav;
