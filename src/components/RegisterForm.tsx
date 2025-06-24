import { useState, useEffect } from "react";

const getAllowedRoles = (currentUserRole: string) => {
  switch (currentUserRole) {
    case "MINISTRY":
      return ["DISTRICT"];
    case "PROVINCE":
      return ["DISTRICT"];
    case "DISTRICT":
      return ["SECTOR"];
    case "SECTOR":
      return ["CELL"];
    case "CELL":
      return ["VILLAGE"];
    case "VILLAGE":
      return ["PARENT"];
    default:
      return [];
  }
};

export default function RegistrationForm({
  currentUserRole = "MINISTRY",
  onSubmit,
  isSubmitting = false,
  onSuccess,
}: {
  currentUserRole: string;
  onSubmit: (data: any) => Promise<boolean>;
  isSubmitting?: boolean;
  onSuccess?: () => void;
}) {
  const [step, setStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "Buzima123",
    phoneNumber: "",
    role: "",
    photo: null as File | null,
  });

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "Buzima123",
      phoneNumber: "",
      role: "",
      photo: null,
    });
    setPhotoPreview(null);
    setStep(1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    if (
      target instanceof HTMLInputElement &&
      target.type === "file" &&
      target.files
    ) {
      const file = target.files[0];
      setForm((prev) => ({ ...prev, [target.name]: file }));
      setPhotoPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    const success = await onSubmit(form);
    if (success) {
      resetForm();
      onSuccess?.();
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Register New Account
      </h2>
      <p className="text-center text-gray-500">Step {step} of 3</p>

      {step === 1 && (
        <div className="space-y-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Role</option>
            {getAllowedRoles(currentUserRole).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <label className="block font-medium">Upload Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-4 py-2 border rounded"
          />

          {photoPreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img
                src={photoPreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between pt-4">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={handleNext}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className={`ml-auto px-6 py-2 text-white rounded ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}
