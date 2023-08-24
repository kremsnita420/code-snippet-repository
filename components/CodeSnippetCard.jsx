'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeSnippetCard = ({
	post,
	handleEdit,
	handleDelete,
	handleTagClick,
}) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [copied, setCopied] = useState('');

	const handleProfileClick = () => {
		if (post.creator._id === session?.user.id) return router.push('/profile');
		router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
	};

	const handleCopy = () => {
		setCopied(post.snippet);
		navigator.clipboard.writeText(post.snippet);
		setTimeout(() => setCopied(false), 3000);
	};

	return (
		<>
			<div className='relative snippet_card'>
				<div className='flex items-start justify-between gap-5'>
					<div
						className='flex items-center justify-start flex-1 gap-3 cursor-pointer'
						onClick={handleProfileClick}>
						<Image
							src={post.creator.image}
							alt='user_image'
							width={40}
							height={40}
							className='object-contain rounded-full'
						/>

						<div className='flex flex-col'>
							<h3 className='font-semibold text-gray-900 font-satoshi'>
								{post.creator.username}
							</h3>
							<p className='text-sm text-gray-500 font-inter'>
								{post.creator.email}
							</p>
						</div>
					</div>
				</div>
				<h2 className='my-2 text-lg font-bold font-satoshi'>{post.title}</h2>

				<p className='mb-2 text-sm font-inter'>{post.description}</p>

				{/* <p className='my-4 text-sm text-gray-700 font-satoshi'>{post.snippet}</p> */}

				<p
					className='mt-auto text-sm cursor-pointer font-inter blue_gradient'
					onClick={() => handleTagClick && handleTagClick(post.tag)}>
					#{post.tag}
				</p>

				{session?.user.id === post.creator._id && pathName === '/profile' && (
					<div className='gap-4 pt-3 mt-5 border-t border-gray-100 flex_center'>
						<p
							className='text-sm cursor-pointer font-inter green_gradient'
							onClick={handleEdit}>
							Edit
						</p>
						<p
							className='text-sm cursor-pointer font-inter orange_gradient'
							onClick={handleDelete}>
							Delete
						</p>
					</div>
				)}
				<button
					className='mt-2 black_btn'
					type='button'
					onClick={() => setShowModal(true)}>
					Show code
				</button>
			</div>
			{showModal ? (
				<div className='w-[100dvw] h-[100dvh] bg-black/60 fixed top-0 left-0 right-0 z-10'>
					<div className='w-[95vw] md:mx-5 md:max-w-7xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
						<button
							className='absolute leading-none top-[-40px] right-2 w-8 h-8 black_btn'
							type='button'
							onClick={() => setShowModal(false)}>
							X
						</button>
						<div className='z-20 text-xs'>
							<div
								className='absolute top-0 z-20 transition-opacity translate-y-2 opacity-50 cursor-pointer hover:opacity-100 right-2 copy_btn'
								title='Copy code to clipboard'
								onClick={handleCopy}>
								<Image
									src={
										copied === post.snippet
											? '/assets/icons/tick.svg'
											: '/assets/icons/copy.svg'
									}
									alt={copied === post.snippet ? 'tick_icon' : 'copy_icon'}
									width={12}
									height={12}
								/>
							</div>
							<SyntaxHighlighter
								language={post.tag}
								style={monokaiSublime}
								showLineNumbers
								wrapLines>
								{post.snippet}
							</SyntaxHighlighter>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default CodeSnippetCard;
