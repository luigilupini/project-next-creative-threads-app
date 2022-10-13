export default function Message({ children, avatar, username, description }) {
  return (
    <div className="bg-white p-8 border-b-2 border-gray-100">
      <div className="flex items-center gap-2">
        <img
          src={avatar}
          alt=""
          className="w-10 rounded-full bg-black shadow-lg"
        />
        <h2>{username}</h2>
      </div>
      <div className="py-4">
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
