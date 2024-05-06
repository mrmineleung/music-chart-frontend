import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/provider/AuthProvider";
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const OAuthCallback = () => {
  const API_URL = process.env.BACKEND_API;

  const { provider } = useParams<{ provider: string }>();
  const navigate = useNavigate();
  const { currentUser, setUserAccessToken } = useAuth();
  const [isError, setIsError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");
  const state = searchParams.get("state");
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }

    const oAuthLogin = async () => {
      const res = await fetch(
        `${API_URL}auth/${provider}/callback?state=${state}&code=${code}&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=0&prompt=none`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.status == 200) {
        setUserAccessToken(data.access_token);
        navigate("/");
      } else {
        setIsError(true);
      }
    };

    if (code && state) {
      oAuthLogin();
    } else {
      navigate("/");
    }
  }, [code, provider, state]);

  return (
    
    <Card className="mx-auto my-12 max-w-sm">
      {isError?<>
      <CardHeader>
        <CardTitle className="text-center">
          <div className="text-5xl font-extrabold top-5">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-sriracha-regular">
              mucha
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        Error occured.
        <Link to="/">
          <Button variant="link">Back to Homepage</Button>
        </Link>
      </CardContent></> : <></>}
    </Card>
  );
};

export default OAuthCallback;
