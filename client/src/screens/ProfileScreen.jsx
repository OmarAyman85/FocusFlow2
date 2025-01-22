import useProfile from "../hooks/useProfile";

const ProfileScreen = () => {
  const { user, loading, error } = useProfile();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-8">
            <div className="mb-5 mt-5">
              <div>
                <h1>{user.name}'s Profile</h1>
                <p>Email: {user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
