import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

// In a real app, you might fetch these from a CDN or have more options.
const avatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
];

interface ProfileProps {
  session: Session | null;
}

const Profile: React.FC<ProfileProps> = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [school, setSchool] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for the session to be explicitly loaded before redirecting
    const sessionCheck = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      } else {
        getProfile();
      }
    };

    if (!session) {
      sessionCheck();
    } else {
      getProfile();
    }
  }, [session, navigate]);

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url, school`)
        .eq("id", session.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setSchool(data.school);
        setAvatarUrl(data.avatar_url);
        setSelectedAvatar(data.avatar_url);
      }
    } catch (error: any) {
      toast({
        title: "Error fetching profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session.user.id,
        username,
        school,
        avatar_url: selectedAvatar,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
      setAvatarUrl(selectedAvatar);
      setIsEditing(false);
      toast({
        title: "Profile Updated!",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Header cartItemCount={0} session={session} />
      <main className="flex-grow container mx-auto py-16">
        {loading ? (
          <div className="text-center">Loading Profile...</div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md border-4 border-foreground">
            <h1 className="text-4xl font-heading text-center mb-8">
              Your Profile
            </h1>

            <div className="flex flex-col items-center space-y-6">
              <img
                src={avatarUrl || "/placeholder.svg"}
                alt="Current Avatar"
                className="w-32 h-32 rounded-full border-4 border-primary object-cover"
              />
              {!isEditing ? (
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold">{username}</p>
                  <p className="text-lg text-muted-foreground">
                    {school || "No school provided"}
                  </p>
                </div>
              ) : (
                <div className="w-full max-w-sm space-y-4">
                  <div>
                    <label htmlFor="username" className="text-sm font-medium">
                      Username
                    </label>
                    <Input
                      id="username"
                      type="text"
                      value={username || ""}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="school" className="text-sm font-medium">
                      School
                    </label>
                    <Input
                      id="school"
                      type="text"
                      value={school || ""}
                      onChange={(e) => setSchool(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Choose Your Avatar
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`rounded-full p-1 transition-all duration-200 ${
                        selectedAvatar === avatar
                          ? "ring-4 ring-primary"
                          : "ring-2 ring-transparent hover:ring-primary/50"
                      }`}
                    >
                      <img
                        src={avatar}
                        alt={`Avatar option`}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-8 flex flex-col items-center space-y-4">
              {isEditing ? (
                <div className="flex items-center space-x-4">
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={updateProfile} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="w-48">
                  Edit Profile
                </Button>
              )}
              {!isEditing && (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-48"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
