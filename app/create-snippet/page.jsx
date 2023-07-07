'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreateCodeSnippet = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [submitting, setIsSubmitting] = useState(false);
	const [post, setPost] = useState({
		snippet: '',
		tag: '',
		title: '',
		description: '',
	});

	const CreateCodeSnippet = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch('/api/snippet/new', {
				method: 'POST',
				body: JSON.stringify({
					title: post.title,
					description: post.description,
					snippet: post.snippet,
					userId: session?.user.id,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form
			type='Create'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={CreateCodeSnippet}
		/>
	);
};

export default CreateCodeSnippet;
