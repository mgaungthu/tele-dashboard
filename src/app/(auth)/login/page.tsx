import LoginForm from '@/components/auth/LoginForm';
import AuthIllustration from '@/components/illustration/AuthIllustration';

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-2">
      {/* LEFT – FORM */}
      <div className="flex items-center justify-center bg-amber-50">
        <LoginForm />
      </div>
      {/* RIGHT – ILLUSTRATION */}
      <AuthIllustration />
    </div>
  );
}