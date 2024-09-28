const GenderCheckbox = () => {
  return (
    <>
      <div className="flex gap-5 ">
        <div className="flex gap-3">
          <label htmlFor="male">Male</label>
          <input type="radio" name="male" id="male" />
        </div>

        <div className="flex gap-3">
          <label htmlFor="female">Female</label>
          <input type="radio" name="male" id="female" />
        </div>
      </div>
    </>
  );
};

export default GenderCheckbox;
