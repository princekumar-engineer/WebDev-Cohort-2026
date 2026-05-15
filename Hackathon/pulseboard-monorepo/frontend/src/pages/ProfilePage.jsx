import {
  useEffect,
  useState,
} from "react";

import PageContainer from "../components/layout/PageContainer";

import {
  User,
  Mail,
  Lock,
  Camera,
  Bell,
  Shield,
  Save,
  LogOut,
} from "lucide-react";

import {
  getUser,
  logout,
} from "../utils/auth";

export default function ProfilePage() {
  const [formData, setFormData] =
    useState({
      fullName: "",

      email: "",

      password: "",

      notifications: true,

      twoFactor: false,
    });

  const [loading, setLoading] =
    useState(true);

  // LOAD USER
  useEffect(() => {
    const user =
      getUser();

    if (user) {
      setFormData(
        (prev) => ({
          ...prev,

          fullName:
            user.name || "",

          email:
            user.email ||
            "",
        })
      );
    }

    setLoading(false);
  }, []);

  // UPDATE FIELD
  const updateField = (
    field,
    value
  ) => {
    setFormData({
      ...formData,

      [field]: value,
    });
  };

  // SAVE
  const handleSave = () => {
    try {
      // UPDATE LOCAL USER
      const currentUser =
        getUser();

      const updatedUser =
        {
          ...currentUser,

          name:
            formData.fullName,

          email:
            formData.email,
        };

      localStorage.setItem(
        "user",
        JSON.stringify(
          updatedUser
        )
      );

      alert(
        "Profile updated successfully!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update profile"
      );
    }
  };

  // LOADING
  if (loading) {
    return (
      <PageContainer>
        <div className="text-center py-20 text-2xl font-semibold">
          Loading Profile...
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Profile Settings
        </h1>

        <p className="text-gray-500 mt-3">
          Manage your account
          information and
          preferences.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100 text-center">
            {/* AVATAR */}
            <div className="relative w-36 h-36 mx-auto">
              <img
                src={`https://ui-avatars.com/api/?name=${formData.fullName}&background=8b5cf6&color=fff&size=300`}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-violet-100"
              />

              {/* CAMERA */}
              <button className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-violet-600 hover:bg-violet-700 transition flex items-center justify-center text-white shadow-lg">
                <Camera
                  size={20}
                />
              </button>
            </div>

            {/* USER */}
            <h2 className="text-3xl font-bold text-gray-900 mt-6">
              {
                formData.fullName
              }
            </h2>

            <p className="text-gray-500 mt-2">
              PulseBoard User
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-violet-50 rounded-2xl p-5">
                <h3 className="text-3xl font-bold text-violet-600">
                  12
                </h3>

                <p className="text-gray-500 mt-2 text-sm">
                  Total Polls
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5">
                <h3 className="text-3xl font-bold text-green-600">
                  3.4k
                </h3>

                <p className="text-gray-500 mt-2 text-sm">
                  Responses
                </p>
              </div>
            </div>

            {/* LOGOUT */}
            <button
              onClick={
                logout
              }
              className="mt-8 w-full border border-red-200 text-red-500 hover:bg-red-50 transition py-4 rounded-2xl font-medium flex items-center justify-center gap-2"
            >
              <LogOut
                size={18}
              />
              Logout
            </button>
          </div>

          {/* SECURITY */}
          <div className="bg-linear-to-br from-violet-600 to-indigo-600 rounded-4xl p-6 text-white shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
              <Shield
                size={28}
              />
            </div>

            <h2 className="text-2xl font-bold">
              Secure Account
            </h2>

            <p className="text-violet-100 mt-4 leading-relaxed">
              Enable extra
              security and keep
              your account
              protected.
            </p>

            <button className="mt-8 w-full bg-white text-violet-700 hover:bg-violet-50 transition py-4 rounded-2xl font-semibold">
              Security
              Settings
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="xl:col-span-2 space-y-6">
          {/* PERSONAL */}
          <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Personal
              Information
            </h2>

            <div className="space-y-6">
              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={
                      formData.fullName
                    }
                    onChange={(
                      e
                    ) =>
                      updateField(
                        "fullName",
                        e
                          .target
                          .value
                      )
                    }
                    className="w-full border border-gray-200 rounded-2xl pl-14 pr-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email
                  Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={
                      formData.email
                    }
                    onChange={(
                      e
                    ) =>
                      updateField(
                        "email",
                        e
                          .target
                          .value
                      )
                    }
                    className="w-full border border-gray-200 rounded-2xl pl-14 pr-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  New Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="password"
                    placeholder="••••••••"
                    value={
                      formData.password
                    }
                    onChange={(
                      e
                    ) =>
                      updateField(
                        "password",
                        e
                          .target
                          .value
                      )
                    }
                    className="w-full border border-gray-200 rounded-2xl pl-14 pr-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PREFERENCES */}
          <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Preferences
            </h2>

            <div className="space-y-5">
              {/* NOTIFICATIONS */}
              <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">
                    <Bell className="text-violet-600" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Email
                      Notifications
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Receive poll
                      activity updates.
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={
                    formData.notifications
                  }
                  onChange={(
                    e
                  ) =>
                    updateField(
                      "notifications",
                      e
                        .target
                        .checked
                    )
                  }
                  className="w-6 h-6 accent-violet-600"
                />
              </div>

              {/* 2FA */}
              <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                    <Shield className="text-green-600" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Two-Factor
                      Authentication
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Add extra
                      account
                      security.
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={
                    formData.twoFactor
                  }
                  onChange={(
                    e
                  ) =>
                    updateField(
                      "twoFactor",
                      e
                        .target
                        .checked
                    )
                  }
                  className="w-6 h-6 accent-violet-600"
                />
              </div>
            </div>

            {/* SAVE */}
            <button
              onClick={
                handleSave
              }
              className="mt-8 bg-violet-600 hover:bg-violet-700 transition text-white px-8 py-4 rounded-2xl font-medium flex items-center gap-3"
            >
              <Save
                size={20}
              />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}