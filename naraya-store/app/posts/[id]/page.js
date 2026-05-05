import Link from 'next/link';

async function getPost(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) throw new Error('Gagal ambil data');
    return res.json();
}

async function getComments(postId) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    if (!res.ok) throw new Error('Gagal ambil komentar');
    return res.json();
}

export default async function PostDetail({ params }) {
    const { id } = await params;
    const post = await getPost(id);
    const comments = await getComments(id);

    return (
        <div className="p-8 max-w-3xl mx-auto min-h-screen bg-gray-50">
            <Link href="/" className="text-blue-600 font-bold hover:underline mb-6 inline-block">
                ⬅️ Kembali ke Beranda
            </Link>

            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <p className="text-gray-700 text-lg leading-relaxed">{post.body}</p>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Komentar ({comments.length})</h2>
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="font-bold text-sm text-blue-600">{comment.email}</p>
                        <p className="text-gray-600 text-sm mt-1">{comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}   