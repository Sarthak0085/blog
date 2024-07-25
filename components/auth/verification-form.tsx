"use client";

import { verification } from "@/actions/verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const VerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    console.log(token);
    if (success || error) return;

    if (!token) {
      setError("Token is Missing!");
      return;
    }

    verification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error as string);
      })
      .catch(() => {
        setError("Something Went Wrong");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming Your Verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full mb-5">
        {!success && !error && <BeatLoader />}
      </div>
      <div className="flex items-center justify-center w-full">
        {!success && <FormError message={error} />}
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};
