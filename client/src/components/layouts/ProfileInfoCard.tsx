import Image from "next/image";
import { format } from "date-fns";
type Role = "USER" | "SELLER" | "ADMIN" | null;
interface Props {
  user: {
    id: string;
    name: string;
    email: string;
    role?: Role;
    joinedAt?: string | Date;
    profilePic?: string;
    totalOrders?: number;
  };
}

export default function ProfileInfoCard({ user }: Props) {
  return (
    <div className="col-span-1 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
      <div className="flex flex-col items-center text-center">
        <Image
          src={user.profilePic || `https://i.pravatar.cc/150?u=${user.email}`}
          alt="profile"
          width={96}
          height={96}
          className="rounded-full mb-4"
        />
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-sm text-olive/60">{user.email}</p>
        {user.role && (
          <p className="mt-1 text-sm text-olive/60 capitalize">
            Role: <span className="font-medium text-olive">{user.role}</span>
          </p>
        )}
        {user.totalOrders !== undefined && (
          <p className="mt-1 text-sm text-olive/60">
            Orders:{" "}
            <span className="font-medium text-olive">{user.totalOrders}</span>
          </p>
        )}
        <p className="mt-2 text-sm text-olive/60">
          Member since{" "}
          <span className="font-medium text-olive">
            {format(new Date(user.joinedAt!), "MMMM yyyy")}
          </span>
        </p>
      </div>
    </div>
  );
}
