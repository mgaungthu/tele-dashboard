export default function AuthIllustration() {
  return (
    <div className="hidden lg:flex items-center justify-center bg-linear-to-br from-indigo-400 to-purple-500">
      <div className="text-white text-center px-10">
        <h2 className="text-3xl font-bold mb-3">
          Manage music. Manage artists.
        </h2>
        <p className="text-white/80">
          Control everything from one dashboard
        </p>

        {/* Placeholder for SVG / Illustration */}
        <div className="mt-10 mx-auto h-64 w-64 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}