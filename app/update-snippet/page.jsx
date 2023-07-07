'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdateSnippet = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const snippetsId = searchParams.get('id');

	const [post, setPost] = useState({ snippet: '', tag: '' });
	const [submitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const getSnippetDetails = async () => {
			const response = await fetch(`/api/snippet/${snippetsId}`);
			const data = await response.json();

			setPost({
				title: post.title,
				description: post.description,
				snippet: data.snippet,
				tag: data.tag,
			});
		};

		if (snippetsId) getSnippetDetails();
	}, [snippetsId]);

	const UpdateSnippet = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (!snippetsId) return alert('Missing snippetsId!');

		try {
			const response = await fetch(`/api/snippet/${snippetsId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					title: post.title,
					description: post.description,
					snippet: post.snippet,
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
			type='Edit'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={UpdateSnippet}
		/>
	);
};

export default UpdateSnippet;
