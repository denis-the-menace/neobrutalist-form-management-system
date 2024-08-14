import { useState } from "react";

export default function RadioButtonGroup({ buttons, onChange }) {
  const [selected, setSelected] = useState("");

  const handleChange = (value) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="radio-button-group transition ease duration-300">
      {buttons.map((button) => (
        <RadioButton
          key={button.value}
          label={button.label}
          value={button.value}
          selectedValue={selected}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}

function RadioButton({ label, value, selectedValue, onChange }) {
  return (
    <div className="radio-button" onClick={() => onChange(value)}>
      <input
        type="radio"
        name="btn"
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange(value)}
        className="radio-button__input"
      />
      <div className="radio-button__button">
        <span className="radio-button__label capitalize">{label}</span>
      </div>
    </div>
  );
}
