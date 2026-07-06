import SliderField from "./SliderField";

export default function StepLifestyle({ values, errors, onChange }) {
  return (
    <div className="space-y-4">
      <SliderField
        label="Non-Study Screen Time per Day"
        value={values.screen_time}
        min={1}
        max={14}
        step={0.1}
        unitSuffix=" hrs"
        helperText="Time spent looking at screens outside of studying (social media, entertainment, etc)."
        error={errors.screen_time}
        onChange={(v) => onChange("screen_time", v)}
      />

      <SliderField
        label="Recent Stress Level"
        value={values.mental_stress}
        min={0}
        max={10}
        step={1}
        endLabels={["Very Relaxed", "Very Stressed"]}
        error={errors.mental_stress}
        onChange={(v) => onChange("mental_stress", v)}
      />

      <SliderField
        label="Digital Literacy"
        value={values.digital_literacy}
        min={0}
        max={10}
        step={1}
        endLabels={["Beginner", "Very Proficient"]}
        error={errors.digital_literacy}
        onChange={(v) => onChange("digital_literacy", v)}
      />
    </div>
  );
}
