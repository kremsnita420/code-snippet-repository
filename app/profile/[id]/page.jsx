'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
	const searchParams = useSearchParams();
	const userName = searchParams.get('name');

	const [userPosts, setUserPosts] = useState([]);

	useEffect(() => {
		const fetchCards = async () => {
			const response = await fetch(`/api/users/${params?.id}/posts`);
			const data = await response.json();

			setUserPosts(data);
		};

		if (params?.id) fetchCards();
	}, [params.id]);

	return (
		<Profile
			name={userName}
			desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional code snippets and be inspired.`}
			data={userPosts}
		/>
	);
};

export default UserProfile;
