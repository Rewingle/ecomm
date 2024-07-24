import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";

const ProtectedAdmin = ({ children }: { children: React.ReactNode }) => {
    return (
        <RoleGate allowedRole={UserRole.ADMIN}>
            {children}
        </RoleGate>
    );
};

export default ProtectedAdmin;