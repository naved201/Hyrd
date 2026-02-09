import "./loginpage.css";

export default function LoginPage() {
  return (
    <div className="content-row">
      <div className="placeholder">
        <p className="placeholder-text">
          Texts about the website like metrics/usecases will appear here.
        </p>
      </div>

      <div className="card">
        <form>
          <div className="field">
            <input type="email" placeholder="Email" />
          </div>

          <div className="field">
            <input type="password" placeholder="Password" />
          </div>

          <div className="meta">
            <a className="forgot" href="#">
              Forgot Email or Password?
            </a>
          </div>

          <div className="actions">
            <button className="btn" type="submit">
              Sign In
            </button>
            <button className="btn" type="button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
