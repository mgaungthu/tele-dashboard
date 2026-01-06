"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Save, User as UserIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { usersApi, UpdateUserPayload } from "@/lib/endpoints/users.api";
import { lookupsApi } from "@/lib/endpoints/lookups.api";

import { FormField } from "@/components/ui/form/FormField";
import { TextInput } from "@/components/ui/form/TextInput";
import { SelectInput } from "@/components/ui/form/SelectInput";
import { FileInput } from "@/components/ui/form/FileInput";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = Number(params.id);

  /* =========================
   * Fetch user detail
   * ========================= */
  const { data, isLoading } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const res = await usersApi.getUser(id);
      return res.data;
    },
    enabled: !!id,
  });

  /* =========================
   * User state
   * ========================= */
  const [name, setName] = useState("");
  const [role, setRole] = useState<"admin" | "user" | "artist">("user");
  const [status, setStatus] = useState<"active" | "blocked">("active");

  /* =========================
   * Artist state
   * ========================= */
  const [artistName, setArtistName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [genres, setGenres] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const [genreId, setGenreId] = useState<number | "">("");
  const [countryId, setCountryId] = useState<number | "">("");
  const [cityId, setCityId] = useState<number | "">("");

  /* =========================
   * Load lookups
   * ========================= */
  useEffect(() => {
    lookupsApi.getGenres().then((res) => setGenres(res.data));
    lookupsApi.getCountries().then((res) => setCountries(res.data));
  }, []);

  useEffect(() => {
    if (!countryId) {
      setCities([]);
      setCityId("");
      return;
    }
    lookupsApi.getCities(Number(countryId)).then((res) => setCities(res.data));
  }, [countryId]);

  /* =========================
   * Prefill form
   * ========================= */
  useEffect(() => {
    if (!data) return;

    setName(data.name || "");
    setRole(data.role);
    setStatus(data.status);

    if (data.role === "artist" && data.artistProfile) {
      setArtistName(data.artistProfile.artistName);
      setBio(data.artistProfile.bio || "");
      setGenreId(data.artistProfile.genre?.id || "");
      setCountryId(data.artistProfile.country?.id || "");
      setCityId(data.artistProfile.city?.id || "");
    }
  }, [data]);

  /* =========================
   * Update mutation
   * ========================= */
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: UpdateUserPayload) =>
      usersApi.updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-user", id] });
      router.push(`/dashboard/users/${id}`);
    },
  });

  async function handleSubmit() {
    const payload: UpdateUserPayload = {
      name,
      role,
      status,
    };

    if (role === "artist") {
      payload.artist = {
        artistName,
        bio,
        genreId: genreId || undefined,
        countryId: countryId || undefined,
        cityId: cityId || undefined,
      };
    }

    await mutateAsync(payload);
  }

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading user...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/users/${id}`}
            className="rounded-md border border-slate-200 bg-white p-2 hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Edit User
            </h1>
            <p className="text-sm text-slate-500">
              Update user information
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2
                     text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Save size={16} />
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Form */}
      <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-slate-900">
          <UserIcon size={18} />
          <h2 className="font-medium">User Information</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Name">
            <TextInput value={name} onChange={(e) => setName(e.target.value)} />
          </FormField>

          <FormField label="Role">
            <SelectInput value={role} onChange={(e) => setRole(e.target.value as any)}>
              <option value="admin">Admin</option>
              <option value="artist">Artist</option>
              <option value="user">User</option>
            </SelectInput>
          </FormField>

          <FormField label="Status">
            <SelectInput value={status} onChange={(e) => setStatus(e.target.value as any)}>
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
                    if (file) setAvatarPreview(URL.createObjectURL(file));
                  }}
                />
              </div>
            </FormField>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField label="Artist Name">
                <TextInput
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                />
              </FormField>

              <FormField label="Genre">
                <SelectInput value={genreId} onChange={(e) => setGenreId(Number(e.target.value))}>
                  <option value="">Select genre</option>
                  {genres.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </SelectInput>
              </FormField>

              <FormField label="Country">
                <SelectInput value={countryId} onChange={(e) => setCountryId(Number(e.target.value))}>
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </SelectInput>
              </FormField>

              <FormField label="City">
                <SelectInput
                  disabled={!countryId}
                  value={cityId}
                  onChange={(e) => setCityId(Number(e.target.value))}
                >
                  <option value="">
                    {countryId ? "Select city" : "Select country first"}
                  </option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </SelectInput>
              </FormField>

              <div className="md:col-span-2">
                <FormField label="Bio">
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-md border border-slate-200 px-3 py-2
                               text-sm focus:ring-2 focus:ring-blue-500"
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