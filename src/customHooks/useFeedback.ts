import { useState } from "react";
import { validateEmail } from "../helpers/helpers";
import { FeedbackInterface, PersonInterface } from "../types/types";

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackInterface>({
    nameMessage: "",
    emailMessage: "",
    phoneMessage: "",
    ready: false,
  });

  const validator = (value: PersonInterface) => {
    switch (true) {
      case value.name === "":
        setFeedback({
          ...feedback,
          nameMessage: "Name is required",
          ready: false,
        });
        break;
      case !validateEmail(value.email):
        setFeedback({
          ...feedback,
          emailMessage: "Email has an invalid format",
          ready: false,
        });
        break;
      case value.phone === "":
        setFeedback({
          ...feedback,
          phoneMessage: "Phone is required",
          ready: false,
        });
        break;
      default:
        setFeedback({
          nameMessage: "",
          emailMessage: "",
          phoneMessage: "",
          ready: true,
        });
        break;
    }
  };

  return { feedback, validator };
};
