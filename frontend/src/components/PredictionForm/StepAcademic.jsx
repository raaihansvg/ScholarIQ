import NumberField from "./NumberField";
import SliderField from "./SliderField";

export default function StepAcademic({ values, errors, onChange }) {
  return (
    <div className="space-y-4">
      <NumberField
        label="Previous Semester GPA"
        value={values.previous_gpa}
        min={0}
        max={4}
        step={0.01}
        placeholder="e.g. 3.25"
        helperText="Enter your GPA from the previous semester, on a 0.00 – 4.00 scale."
        error={errors.previous_gpa}
        onChange={(v) => onChange("previous_gpa", v)}
      />

      <SliderField
        label="Attendance Rate"
        value={values.attendance_rate}
        min={0}
        max={100}
        step={1}
        unitSuffix="%"
        helperText="How often you attend classes throughout the current semester."
        error={errors.attendance_rate}
        onChange={(v) => onChange("attendance_rate", v)}
      />
    </div>
  );
}
