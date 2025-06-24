import { useState, useEffect, useCallback } from "react";
import { rwandaLocations } from "../utils/tools/rwandaLocations";

// Mock data - replace with your actual data source
// const rwandaLocations = {
//   "Kigali": {
//     "Gasabo": {
//       "Kacyiru": {
//         "Kamatamu": ["Ubumwe", "Urukeri", "Nyarutarama"]
//       }
//     }
//   },
//   "Eastern": {
//     "Rwamagana": {
//       "Rwamagana": {
//         "Nyakariro": ["Kabuga", "Kigabiro", "Muhazi"]
//       }
//     }
//   }
// };

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
    province: "",
    district: "",
    sector: "",
    cell: "",
    village: "",
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
      province: "",
      district: "",
      sector: "",
      cell: "",
      village: "",
      photo: null,
    });
    setPhotoPreview(null);
    setStep(1);
  };

  const handleChange = useCallback((
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
  }, []);

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
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

  // Memoized AutoCompleteInput to prevent unnecessary re-renders
  const AutoCompleteInput = useCallback(({
    name,
    label,
    value,
    onChange,
    suggestions = [],
  }: {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    suggestions: string[];
  }) => {
    const [filtered, setFiltered] = useState<string[]>([]);
    const [showList, setShowList] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    // Sync internal state with prop
    useEffect(() => {
      setInputValue(value);
    }, [value]);

    useEffect(() => {
      if (inputValue.trim() === "") {
        setFiltered([]);
        return;
      }

      const matches = suggestions.filter((s) =>
        s.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFiltered(matches);
    }, [inputValue, suggestions]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange({ ...e, target: { ...e.target, name, value: newValue } });
      setShowList(true);
    };

    const handleSuggestionClick = (item: string) => {
      setInputValue(item);
      onChange({ target: { name, value: item } } as any);
      setShowList(false);
    };

    const handleInputFocus = () => {
      if (filtered.length > 0) {
        setShowList(true);
      }
    };

    const handleInputBlur = () => {
      // Delay hiding the list to allow clicks on suggestions
      setTimeout(() => setShowList(false), 200);
    };

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={label}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          autoComplete="off"
        />
        {showList && filtered.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-auto">
            {filtered.map((item, idx) => (
              <li
                key={`${item}-${idx}`}
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent input blur
                  handleSuggestionClick(item);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Register New Account
      </h2>
      <p className="text-center text-gray-500">Step {step} of 4</p>

      {step === 1 && (
        <div className="space-y-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
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
          <AutoCompleteInput
            name="province"
            label="Province"
            value={form.province}
            onChange={handleChange}
            suggestions={Object.keys(rwandaLocations)}
          />

          <AutoCompleteInput
            name="district"
            label="District"
            value={form.district}
            onChange={handleChange}
            suggestions={
              form.province in rwandaLocations
                ? Object.keys(
                    rwandaLocations[
                      form.province as keyof typeof rwandaLocations
                    ]
                  )
                : []
            }
          />

          <AutoCompleteInput
            name="sector"
            label="Sector"
            value={form.sector}
            onChange={handleChange}
            suggestions={
              form.province in rwandaLocations &&
              form.district &&
              form.district in
                rwandaLocations[form.province as keyof typeof rwandaLocations]
                ? Object.keys(
                    rwandaLocations[
                      form.province as keyof typeof rwandaLocations
                    ][form.district as keyof any]
                  )
                : []
            }
          />

          <AutoCompleteInput
            name="cell"
            label="Cell"
            value={form.cell}
            onChange={handleChange}
            suggestions={
              form.province in rwandaLocations &&
              form.district &&
              form.sector &&
              form.district in
                rwandaLocations[
                  form.province as keyof typeof rwandaLocations
                ] &&
              form.sector in
                rwandaLocations[form.province as keyof typeof rwandaLocations][
                  form.district as keyof any
                ]
                ? Object.keys(
                    rwandaLocations[
                      form.province as keyof typeof rwandaLocations
                    ][form.district as keyof any][form.sector as keyof any]
                  )
                : []
            }
          />

          <AutoCompleteInput
            name="village"
            label="Village"
            value={form.village}
            onChange={handleChange}
            suggestions={
              form.province in rwandaLocations &&
              form.district &&
              form.sector &&
              form.cell &&
              form.cell in
                rwandaLocations[form.province as keyof typeof rwandaLocations][
                  form.district as keyof any
                ][form.sector as keyof any]
                ? rwandaLocations[
                    form.province as keyof typeof rwandaLocations
                  ][form.district as keyof any][form.sector as keyof any][
                    form.cell as keyof any
                  ]
                : []
            }
          />
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <label className="block font-medium">Upload Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
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
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={handleNext}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className={`ml-auto px-6 py-2 text-white rounded transition-colors ${
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