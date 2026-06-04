import React, { useState } from "react";
import { useForm } from "react-hook-form";
const ROLES = ["Frontend", "Backend", "AI Engineer"];

const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    getValues,
  } = useForm({ defaultValues: { name: "hitesh" }, mode: "onTouched" });

  function submit(data) {
    return new Promise((res) => console.log("submitted", data));
  }

  if (isSubmitSuccessful) {
    return (
      <div>
        <h1>Form submitted successfully</h1>
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <label>
          Full name
          <input {...register("name", { required: "name is required" })} />
          {errors.name && <span>{errors.name.message}</span>}
        </label>
        <label>
          email
          <input {...register("email", { required: "email is required" })} />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting...." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default HookForm;
