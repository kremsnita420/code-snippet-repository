'use client';
import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	const codeLangs = ['php', 'javascript', 'python', 'scss', 'css'];
	return (
		<div className='flex-col w-full max-w-full flex_start'>
			<h1 className='text-left head_text'>
				<span className='blue_gradient'>{type} Snippet of Code</span>
			</h1>

			<form
				onSubmit={handleSubmit}
				className='flex flex-col w-full max-w-4xl mt-10 gap-7 glassmorphism'>
				<label>
					<span className='text-base font-semibold text-gray-700 font-satoshi'>
						Title
					</span>
					<input
						value={post.title}
						onChange={(e) => setPost({ ...post, title: e.target.value })}
						type='text'
						placeholder='Write your title here'
						required
						className='form_input'
					/>
				</label>
				<label>
					<span className='text-base font-semibold text-gray-700 font-satoshi'>
						Snippet description
					</span>

					<textarea
						value={post.description}
						onChange={(e) => setPost({ ...post, description: e.target.value })}
						placeholder='Write your description here'
						required
						className='form_textarea'
					/>
				</label>
				<label>
					<span className='text-base font-semibold text-gray-700 font-satoshi'>
						Your Code Snippet
					</span>
					<pre>
						<textarea
							value={post.snippet}
							onChange={(e) => setPost({ ...post, snippet: e.target.value })}
							placeholder='Write your code here'
							required
							className='form_textarea'
						/>
					</pre>
				</label>

				<label>
					<span className='text-base font-semibold text-gray-700 font-satoshi'>
						Coding language
						<span className='font-normal'>(javascript, php, python, ...)</span>
					</span>
				</label>
				<select
					className='bg-white form_input'
					value={post.tag}
					required
					onChange={(e) => setPost({ ...post, tag: e.target.value })}>
					{/* Create array of options and map them */}
					<option defaultValue={post.tag}>{post.tag}</option>
					{codeLangs.map((lang, i) => (
						<option value={lang} key={`lang-${i}`}>
							{lang}
						</option>
					))}
				</select>

				<div className='gap-4 mx-3 mb-5 flex_end'>
					<Link href='/' className='text-sm text-gray-500'>
						Cancel
					</Link>

					<button
						type='submit'
						disabled={submitting}
						className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
						{submitting ? `${type}ing...` : type}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Form;
