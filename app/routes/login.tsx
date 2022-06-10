import styles from "~/styles/login.css";
import logoSrc from "~/assets/logo.svg";
import { useRef, useState } from "react";
import { generateToken, getGrantToken } from "~/services/auth.service";
import AlertComponent from "~/components/alert-component";
export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const LoginComponent = () => {
  const emailAddressRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const submit = async () => {
    const emailAddress = emailAddressRef.current?.value;
    const password = passwordRef.current?.value;
    if (!emailAddress || !password) {
      return;
    }
    try {
      setIsLoading(true);
      const gtResponse = await getGrantToken(emailAddress, password);
      const grantToken = gtResponse.grant_token;
      if (!grantToken) throw new Error("Unknown error occurred!");
      localStorage.setItem("grantToken", grantToken);
      const tResponse = await generateToken(grantToken);
      if (!tResponse?.access_token?.value)
        throw new Error("Unknown error occurred!");
      localStorage.setItem("token", tResponse.access_token.value);
      setIsLoading(false);
      window.location.href = "/news";
    } catch (error) {
      setIsLoading(false);
      setError("Invalid email or password");
    }
  };

  return error ? (
    <AlertComponent
      title="Error occurred"
      content={`Error: ${error}`}
      action={() => setError(undefined)}
    />
  ) : (
    <div className="inner-screen login-main">
      <div className="login-container">
        <img className="login-logo-img" src={logoSrc} />

        <div className="login-form">
          <div className="login-form-header">
            <h1>Login to your account</h1>
          </div>
          <div className="login-form-body">
            <input
              type="text"
              className="login-input"
              placeholder="E-mail Address"
              ref={emailAddressRef}
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              ref={passwordRef}
            />
            <button
              disabled={isLoading}
              onClick={submit}
              className="login-form-submit"
            >
              Submit
            </button>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
