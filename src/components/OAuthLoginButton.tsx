import { Button } from "./ui/button";

const OAuthLoginButton = () => {
  const API_URL = process.env.BACKEND_API;

  const handleGoogleLogin = async () => {
    const GET_CHART_API = `${API_URL}auth/google/authorize`;
    try {
      const response = await fetch(GET_CHART_API, {
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status == 200) {
        window.location.href = data.authorization_url;
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
      Login with Google
    </Button>
  );
};

export default OAuthLoginButton;
