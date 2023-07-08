export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="my-4 font-bold text-purple-700">Profile</h1>
            <hr />
            <p className="text-4xl">Profile page 
            <span className=" p-2 ml-2 rounded bg-blue-400 text-black">{params.id}</span>
            </p>

            </div>
    )
}