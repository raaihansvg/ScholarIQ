import SliderField from "./SliderField";

export default function StepHabits({ values, errors, onChange }) {
  return (
    <div className="space-y-4">
      <SliderField
        label="Average Daily Study Hours"
        value={values.study_hours_daily}
        min={0}
        max={12}
        step={0.1}
        unitSuffix=" hrs"
        softWarning={
          values.study_hours_daily > 8.6
            ? "This value is quite high compared to the model's training data — the estimate will still be processed, but accuracy may be slightly reduced."
            : null
        }
        error={errors.study_hours_daily}
        onChange={(v) => onChange("study_hours_daily", v)}
      />

      <SliderField
        label="Daily Revision Hours"
        value={values.revision_hours}
        min={0}
        max={8}
        step={0.1}
        unitSuffix=" hrs"
        helperText="Time you spend reviewing or revisiting course material each day."
        softWarning={
          values.revision_hours > 5.9
            ? "This value is quite high compared to the model's training data — the estimate will still be processed, but accuracy may be slightly reduced."
            : null
        }
        error={errors.revision_hours}
        onChange={(v) => onChange("revision_hours", v)}
      />

      <SliderField
        label="Online Course Hours per Week"
        value={values.online_course_hours}
        min={0}
        max={20}
        step={0.5}
        unitSuffix=" hrs"
        helperText="Total time spent on online courses or e-learning each week."
        softWarning={
          values.online_course_hours > 18.4
            ? "This value is quite high compared to the model's training data — the estimate will still be processed, but accuracy may be slightly reduced."
            : null
        }
        error={errors.online_course_hours}
        onChange={(v) => onChange("online_course_hours", v)}
      />
    </div>
  );
}
