function UserCard({ user }) {
  return (
    <div className="card">
      <img src={user.picture.large} alt="user" />
      <h3>
        {user.name.first} {user.name.last}
      </h3>
      <p>{user.email}</p>
      <p>{user.location.country}</p>
    </div>
  );
}

export default UserCard;