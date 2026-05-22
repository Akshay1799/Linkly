import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 space-y-6">
 
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" placeholder="Enter your email" 
          className='py-4 focus:border-none'
          />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" placeholder="Enter your password" 
          className=' py-4'
          />
        </div>

        <Button className="w-full text-white border border-black hover:cursor-pointer bg-blue-400 hover:bg-blue-500">
          Login
        </Button>

      </Card>
    </div>
  );
}