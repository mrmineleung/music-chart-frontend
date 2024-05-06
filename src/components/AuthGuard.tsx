
import { User } from "@/provider/AuthProvider";

type UserRole = "user" | "admin"

interface AuthGuardProps {
  user?: User | null,
  allowedRole: UserRole[],
  children: React.ReactNode
}

const AuthGuard = ({user, allowedRole, children} : AuthGuardProps) => {

return (
  <>
        {allowedRole.includes(user?.role as UserRole)? <>{children}</> : <></>}
  </>
);
};

export default AuthGuard;
