const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex gap-5">
      {/* Male Radio Button */}
      <div className="flex gap-3">
        <label
          htmlFor="male"
          className={`${selectedGender === "male" ? "selected" : ""}`}
        >
          Male
        </label>
        <input
          type="radio"
          name="gender" 
          id="male"
          value="male"
          checked={selectedGender === "male"}
          onChange={() => onCheckboxChange("male")} // Trigger parent state update
        />
      </div>

      {/* Female Radio Button */}
      <div className="flex gap-3">
        <label
          htmlFor="female"
          className={`${selectedGender === "male" ? "selected" : ""}`}
        >
          Female
        </label>
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          checked={selectedGender === "female"}
          onChange={() => onCheckboxChange("female")} // Trigger parent state update
        />
      </div>
    </div>
  );
};

export default GenderCheckbox;
