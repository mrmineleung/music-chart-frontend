import ResetPasswordForm from "@/components/ResetPasswordForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/provider/AuthProvider";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  // const API_URL = process.env.BACKEND_API;

  // const JWT_TOKEN_REGEXP =
  //   "(^[A-Za-z0-9-_]*\\.[A-Za-z0-9-_]*\\.[A-Za-z0-9-_]*$)";
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth()
  // const [isVerifySuccess, setIsVerifySuccess] = useState<boolean>(false);

  useEffect(() => {

    if (currentUser) {
      navigate("/")
    }

    // const verifyEmail = async () => {
    //   const res = await fetch(`${API_URL}auth/verify`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ token: token }),
    //   });

    //   if (res.status == 200) {
    //     setIsVerifySuccess(true);
    //   }
    // };
    // if (token && token.match(JWT_TOKEN_REGEXP)) {
    //   verifyEmail();
    // } else {
    //   navigate("/");
    // }
  }, []);

  return (

        <Card className="mx-auto my-12 max-w-sm">
        <CardHeader>
          <CardTitle className="text-center"><div className="text-5xl font-extrabold top-5">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-sriracha-regular">
                mucha
              </span></div></CardTitle>
        </CardHeader>
        <CardContent>
        {/* {isVerifySuccess ? "Your email is verified." : "Email verification failed."}
        <Link to="/">
            <Button variant="link">Back to Homepage</Button>
          </Link> */}
          <ResetPasswordForm token={token || ''} />
        </CardContent>
      </Card>
  );
};

export default VerifyEmail;
