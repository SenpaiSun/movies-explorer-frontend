import './FilterCheckbox.css'
import React from 'react'

export default function FilterCheckbox() {
  const [isChecked, setIsChecked] = React.useState(
    localStorage.getItem("isChecked") === "true"
  );

  const handleToggle = () => {
    setIsChecked(!isChecked);
    localStorage.setItem("isChecked", !isChecked);
  };

  React.useEffect(() => {
    localStorage.setItem("isChecked", isChecked);
  }, [isChecked]);

  return (
    <label className="toggle-shorts">
      <input
        className="toggle-shorts__button"
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className="toggle-shorts__slider"></span>
    </label>
  );
}