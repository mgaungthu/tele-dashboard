"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Plus, User } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FormField } from "@/components/ui/form/FormField";
import { TextInput } from "@/components/ui/form/TextInput";
import { SelectInput } from "@/components/ui/form/SelectInput";
import { FileInput } from "@/components/ui/form/FileInput";
import { TextArea } from '@/components/ui/form/TextArea';
import { lookupsApi, Genre, Country, City } from "@/lib/endpoints/lookups.api";
import { usersApi, CreateUserPayload } from "@/lib/endpoints/users.api";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  /* =========================
   * Base user state
   * ========================= */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user" | "artist" | "">("");
  const [status, setStatus] = useState<"active" | "blocked">("active");

  /* =========================
   * Artist state
   * ========================= */
  const [artistName, setArtistName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  /* =========================
   * Lookups
   * ========================= */
  const [genres, setGenres] = useState<Genre[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | "">("");
  const [selectedCountryId, setSelectedCountryId] = useState<number | "">("");
  const [selectedCityId, setSelectedCityId] = useState<number | "">("");

  useEffect(() => {
    lookupsApi.getGenres().then((res) => setGenres(res.data));
    lookupsApi.getCountries().then((res) => setCountries(res.data));
  }, []);

  useEffect(() => {
    if (!selectedCountryId) {
      setCities([]);
      setSelectedCityId("");
      return;
    }
    lookupsApi
      .getCities(Number(selectedCountryId))
      .then((res) => setCities(res.data));
  }, [selectedCountryId]);

  /* =========================
   * Create user mutation
   * ========================= */
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateUserPayload) =>
      usersApi.createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      router.push("/dashboard/users");
    },
  });

  async function handleSubmit() {
    if (!name || !email || !password || !role) return;

    const payload: CreateUserPayload = {
      name,
      email,
      password,
      role,
      status,
    };

    if (role === "artist") {
      payload.artist = {
        artistName,
        bio,
        genreId: selectedGenreId || undefined,
        countryId: selectedCountryId || undefined,
        cityId: selectedCityId || undefined,
      };
    }

    console.log(payload)

    await mutateAsync(payload);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/users"
            className="rounded-md border border-slate-200 bg-white p-2 hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Create User
            </h1>
            <p className="text-sm text-slate-500">
              Add a new user or artist
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2
                     text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus size={16} />
          {isPending ? "Creating..." : "Create"}
        </button>
      </div>

      {/* Form */}
      <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-slate-900">
          <User size={18} />
          <h2 className="font-medium">User Information</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Name" required>
            <TextInput value={name} onChange={(e) => setName(e.target.value)} />
          </FormField>

          <FormField label="Email" required>
            <TextInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>

          <FormField label="Password" required>
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>

          <FormField label="Role" required>
            <SelectInput
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="artist">Artist</option>
              <option value="user">User</option>
            </SelectInput>
          </FormField>

          <FormField label="Status">
            <SelectInput
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </SelectInput>
          </FormField>
        </div>

        {/* Artist Section */}
        {role === "artist" && (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 text-sm font-medium text-slate-900">
              Artist Information
            </div>

            <FormField label="Avatar">
              <div className="flex flex-col gap-3 pb-4">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    className="h-20 w-20 rounded-full border object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full
                                  border border-dashed text-xs text-slate-400">
                    No Image
                  </div>
                )}

                <FileInput
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setAvatarFile(file);
                    setAvatarPreview(URL.createObjectURL(file));
                  }}
                />
              </div>
            </FormField>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField label="Artist Name" required>
                <TextInput
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                />
              </FormField>

              <FormField label="Genre">
                <SelectInput
                  value={selectedGenreId}
                  onChange={(e) => setSelectedGenreId(Number(e.target.value))}
                >
                  <option value="">Select genre</option>
                  {genres.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </SelectInput>
              </FormField>

              <FormField label="Country">
                <SelectInput
                  value={selectedCountryId}
                  onChange={(e) =>
                    setSelectedCountryId(Number(e.target.value))
                  }
                >
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </SelectInput>
              </FormField>

              <FormField label="City">
                <SelectInput
                  disabled={!selectedCountryId}
                  value={selectedCityId}
                  onChange={(e) => setSelectedCityId(Number(e.target.value))}
                >
                  <option value="">
                    {selectedCountryId
                      ? "Select city"
                      : "Select country first"}
                  </option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </SelectInput>
              </FormField>

              <div className="md:col-span-2">
                <FormField label="Bio">
                  <TextArea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about the artist"
                  />
                </FormField>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}