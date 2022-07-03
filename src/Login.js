import React from "react";
import { useState } from "react";
import { fetchUser } from "./apis/api";
function Login({ title }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await fetchUser();
      if (data) setUser(data);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div>
      <form>
        <p>{title}</p>
        <span className="user">{user.name}</span>
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button disabled={!username || !password} onClick={handleLogin}>
          {loading ? "Please wait..." : "Login"}
        </button>
        <p
          data-testid="login-error"
          style={{ visibility: error ? "visible" : "hidden" }}
        >
          {error}
        </p>
        <div>
          Password checklist :
          <ul>
            <li>Must incluce an uppercase and a lower case</li>
            <li>Must incluce a special character</li>
            <li>Must incluce a number</li>
            <li>Must have atleast a length 3</li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default Login;
